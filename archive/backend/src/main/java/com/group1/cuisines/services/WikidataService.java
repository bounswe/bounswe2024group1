package com.group1.cuisines.services;

import com.group1.cuisines.entities.Cuisine;
import com.group1.cuisines.entities.Dish;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import com.group1.cuisines.repositories.CuisineRepository;
import com.group1.cuisines.repositories.DishRepository;
import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriUtils;
import reactor.core.publisher.Mono;

@Service
public class WikidataService {
    private final DishRepository dishRepository;
    private final CuisineRepository cuisineRepository;

    private final WebClient webClient;
    private static final Logger logger = LoggerFactory.getLogger(
        WikidataService.class
    );

    public WikidataService(WebClient.Builder webClientBuilder, DishRepository dishRepository, CuisineRepository cuisineRepository) {
        this.webClient = webClientBuilder
            .baseUrl("https://query.wikidata.org/sparql")
            .build();
        this.dishRepository=dishRepository;
        this.cuisineRepository=cuisineRepository;

    }
    @Transactional

    public ArrayList<Dish> retrieveDishAndCuisineData(String parameter) {
        String lowerCaseParam = parameter.toLowerCase();
        String sparqlQuery =
                """
                PREFIX wdt: <http://www.wikidata.org/prop/direct/>
                PREFIX wd: <http://www.wikidata.org/entity/>
                PREFIX wikibase: <http://wikiba.se/ontology#>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                PREFIX schema: <http://schema.org/>
            
                SELECT DISTINCT ?dish (SAMPLE(?dishLabel) AS ?dishLabelS) (SAMPLE(?description) AS ?descriptionS) (SAMPLE(?image) AS ?imageS)
                                (GROUP_CONCAT(DISTINCT ?countryOfOriginLabel; SEPARATOR = ", ") AS ?countryOfOrigins)
                                (GROUP_CONCAT(DISTINCT ?cuisineLabel; SEPARATOR = ", ") AS ?cuisines)
                                (GROUP_CONCAT(DISTINCT ?ingredientLabel; SEPARATOR = ", ") AS ?ingredients)
                                (GROUP_CONCAT(DISTINCT ?foodTypeLabel; SEPARATOR = ", ") AS ?foodTypes)
                                (SAMPLE(?cuisine) AS ?cuisineID)  # Include cuisine ID directly
                WHERE {
                  ?dish wdt:P31 wd:Q746549;
                        wdt:P18 ?image;
            
                  OPTIONAL {
                    ?dish wdt:P495 ?countryOfOrigin.
                    ?countryOfOrigin rdfs:label ?countryOfOriginLabel.
                    FILTER((LANG(?countryOfOriginLabel)) = "en")
                  }
            
                  OPTIONAL {
                    ?dish schema:description ?description.
                    FILTER((LANG(?description)) = "en")
                  }
            
                  OPTIONAL {
                    ?dish rdfs:label ?dishLabel.
                    FILTER((LANG(?dishLabel)) = "en")
                  }
            
                  OPTIONAL {
                    ?dish wdt:P361 ?cuisine.
                    ?cuisine rdfs:label ?cuisineLabel.
                    FILTER((LANG(?cuisineLabel)) = "en")
                  }
            
                  OPTIONAL {
                    ?dish wdt:P186 ?ingredient.
                    ?ingredient rdfs:label ?ingredientLabel.
                    FILTER((LANG(?ingredientLabel)) = "en")
                  }
            
                  OPTIONAL {
                    ?dish wdt:P279 ?foodType.
                    ?foodType rdfs:label ?foodTypeLabel.
                    FILTER((LANG(?foodTypeLabel)) = "en")
                  }
                }
                GROUP BY ?dish
                HAVING (BOUND(?dishLabelS))
                """;


        QueryExecution queryExecution = QueryExecutionFactory.sparqlService(
            "https://query.wikidata.org/sparql",
            sparqlQuery
        );

        // Execute the query
        ResultSet results = queryExecution.execSelect();

        ArrayList<Dish> dishes = new ArrayList<>();

        while (results.hasNext()) {
            QuerySolution soln = results.nextSolution();
            // Access variables in the result
            String dishLabel = soln.get("dishLabelS").toString();
            String description = soln.contains("descriptionS")
                ? soln.get("descriptionS").toString().replace("@en", "")
                : "";
            String cuisineId = null;
            if ( soln.get("cuisineID") != null) {
                String cuisineIdField = soln.get("cuisineID").toString();
                cuisineId = cuisineIdField.substring(cuisineIdField.lastIndexOf('/') + 1);
            }
            String countries = soln.get("countryOfOrigins").toString();
            String cuisines = soln.get("cuisines").toString();
            String ingredients = soln.get("ingredients").toString();
            String foodTypes = soln.get("foodTypes").toString();

            // match search
            if (
                dishLabel.toLowerCase().contains(lowerCaseParam) ||
                countries.toLowerCase().contains(lowerCaseParam) ||
                cuisines.toLowerCase().contains(lowerCaseParam) ||
                ingredients.toLowerCase().contains(lowerCaseParam) ||
                foodTypes.toLowerCase().contains(lowerCaseParam) ||
                parameter.isEmpty()
            ) {
                String dishField = soln.get("dish").toString();
                String dish = dishField.substring(dishField.lastIndexOf("/")+1);


                String image = soln.get("imageS").toString();

                if (dishLabel.contains("@en")) {
                    dishLabel = dishLabel.substring(
                        0,
                        dishLabel.indexOf("@en")
                    );
                }
                Dish dishData = Dish.builder()
                        .id(dish)
                        .name(dishLabel)
                        .description(description)
                        .image(image)
                        .countries(countries)
                        .ingredients(ingredients)
                        .foodTypes(foodTypes)
                        .cuisines(new ArrayList<Cuisine>())
                        .build();
                Set<Cuisine> cuisineSet = new HashSet<>();
                if(dishRepository.findById(dish).isPresent()){
                    dishData = dishRepository.findById(dish).get();
                    dishData.setName(dishLabel);
                    dishData.setDescription(description);
                    dishData.setImage(image);
                    dishData.setCountries(countries);
                    dishData.setIngredients(ingredients);
                    dishData.setFoodTypes(foodTypes);

                }



                // Assume that ?cuisine provides the ID and ?cuisineLabel provides the name
                if (cuisineId != null && soln.get("cuisines") != null){

                    String cuisineName = soln.get("cuisines").toString().replaceAll("@en", "");
                    Cuisine cuisine = new Cuisine();

                    cuisine.setId(cuisineId);
                    cuisine.setName(cuisineName);
                    Optional<Cuisine> existingCuisine = cuisineRepository.findById(cuisineId);
                    if (existingCuisine.isPresent()) {
                        cuisine = existingCuisine.get();
                    }
                    cuisine.setId(cuisineId);
                    cuisine.setName(cuisineName);
                    cuisine.getDishes().add(dishData);
                    dishData.getCuisines().add(cuisine);

                    cuisineRepository.save(cuisine);
                }

                dishRepository.save(dishData);

                dishes.add(
                    Dish.builder()
                        .id(dish)
                        .name(dishLabel)
                        .description(description)
                        .image(image)
                        .countries(countries)
                        .ingredients(ingredients)
                        .foodTypes(foodTypes)
                        .build()
                );
            }
        }

        // Close the query execution
        queryExecution.close();

        logger.info("Query executed successfully!");
        return dishes;
    }


}
