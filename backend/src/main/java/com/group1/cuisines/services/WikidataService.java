package com.group1.cuisines.services;

import com.group1.cuisines.entities.Dish;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
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
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriUtils;
import reactor.core.publisher.Mono;

@Service
public class WikidataService {

    private final WebClient webClient;
    private static final Logger logger = LoggerFactory.getLogger(
        WikidataService.class
    );

    public WikidataService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
            .baseUrl("https://query.wikidata.org/sparql")
            .build();
    }

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
            LIMIT 5000
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
                String dish = soln.get("dish").toString();
                String image = soln.get("imageS").toString();

                if (dishLabel.contains("@en")) {
                    dishLabel = dishLabel.substring(
                        0,
                        dishLabel.indexOf("@en")
                    );
                }

                dishes.add(
                    Dish.builder()
                        .id(dish)
                        .name(dishLabel)
                        .description(description)
                        .image(image)
                        .countries(countries)
                        .ingredients(ingredients)
                        .foodTypes(foodTypes)
                        .cuisines(cuisines)
                        .build()
                );
            }
        }

        // Close the query execution
        queryExecution.close();

        logger.info("Query executed successfully!");
        return dishes;
    }

    @Scheduled(fixedRate = 3000000, initialDelay = 5000)
    public Mono<String> retrieveDishAndCuisineData() {
        String sparqlQuery =
            "PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n" +
            "PREFIX wd: <http://www.wikidata.org/entity/>\n" +
            "PREFIX wikibase: <http://wikiba.se/ontology#>\n" +
            "PREFIX bd: <http://www.bigdata.com/rdf#>\n" +
            "SELECT ?dish ?dishLabel ?image ?countryOfOriginLabel WHERE { " +
            "?dish wdt:P31 wd:Q746549; " +
            "wdt:P18 ?image; " +
            "wdt:P495 ?countryOfOrigin; " +
            "wdt:P361 ?cuisine; " +
            "wdt:P186 ?ingredient. " +
            "SERVICE wikibase:label { bd:serviceParam wikibase:language \"en\". } " +
            "} LIMIT 500"; // Limited to 500 for testing result

        // Return a Mono for asynchronous processing
        Mono<String> mono = Mono.fromCallable(() -> {
            QueryExecution queryExecution = QueryExecutionFactory.sparqlService(
                "https://query.wikidata.org/sparql",
                sparqlQuery
            );
            // Execute the query
            ResultSet results = queryExecution.execSelect();

            // Process the results
            while (results.hasNext()) {
                QuerySolution soln = results.nextSolution();
                // Access variables in the result
                String dish = soln.get("dish").toString();
                String dishLabel = soln.get("dishLabel").toString();
                String image = soln.get("image").toString();
                String countryOfOriginLabel = soln
                    .get("countryOfOriginLabel")
                    .toString();
                logger.info(
                    "Dish: {}, Dish Label: {}, Image: {}, Country of Origin: {}",
                    dish,
                    dishLabel,
                    image,
                    countryOfOriginLabel
                );
            }

            // Close the query execution
            queryExecution.close();
            logger.info("Query executed successfully!");
            return "Query executed successfully!";
        });
        mono.subscribe();
        return mono;
    }
}
