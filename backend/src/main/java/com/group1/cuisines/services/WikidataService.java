package com.group1.cuisines.services;
import com.group1.cuisines.entities.Dish;
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

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

@Service
public class WikidataService {

    private final WebClient webClient;
    private static final Logger logger = LoggerFactory.getLogger(WikidataService.class);
    public WikidataService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://query.wikidata.org/sparql").build();
    }

    public ArrayList<Dish> retrieveDishAndCuisineData(String parameter) {
        String sparqlQuery = "PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n" +
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
                "} LIMIT 5000"; // Limited to 500 for testing result

        QueryExecution queryExecution = QueryExecutionFactory.sparqlService("https://query.wikidata.org/sparql", sparqlQuery);
        // Execute the query
        ResultSet results = queryExecution.execSelect();
        logger.debug("executed");
        ArrayList<Dish> dishes = new ArrayList<>();
        // Process the results
        StringBuilder resultBuilder = new StringBuilder();
        while (results.hasNext()) {
            QuerySolution soln = results.nextSolution();
            // Access variables in the result
            String dishLabel = soln.get("dishLabel").toString();
            if (dishLabel.toLowerCase().contains(parameter.toLowerCase())) {
                String dish = soln.get("dish").toString();


                String image = soln.get("image").toString();
                String countryOfOriginLabel = soln.get("countryOfOriginLabel").toString();
                dishes.add(Dish.builder()
                        .dishId(dish)
                        .dishLabel(dishLabel)
                        .image(image)
                        .countryOfOriginLabel(countryOfOriginLabel)
                        .build());
                logger.info("Dish: {}, Dish Label: {}, Image: {}, Country of Origin: {}", dish, dishLabel, image, countryOfOriginLabel);
                resultBuilder.append("Dish: ").append(dish).append(", Dish Label: ").append(dishLabel)
                        .append(", Image: ").append(image).append(", Country of Origin: ").append(countryOfOriginLabel)
                        .append("\n");
            }
        }

        // Close the query execution
        queryExecution.close();
        logger.info("Query executed successfully!");
        return dishes;

    }

    @Scheduled(fixedRate = 300000,initialDelay = 5000)
    public Mono<String> retrieveDishAndCuisineData() {
        String sparqlQuery = "PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n" +
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
        Mono<String> mono =  Mono.fromCallable(() -> {
            QueryExecution queryExecution = QueryExecutionFactory.sparqlService("https://query.wikidata.org/sparql", sparqlQuery);
            // Execute the query
            ResultSet results = queryExecution.execSelect();
            logger.debug("executed");

            // Process the results
            while (results.hasNext()) {
                QuerySolution soln = results.nextSolution();
                // Access variables in the result
                String dish = soln.get("dish").toString();
                String dishLabel = soln.get("dishLabel").toString();
                String image = soln.get("image").toString();
                String countryOfOriginLabel = soln.get("countryOfOriginLabel").toString();
                logger.info("Dish: {}, Dish Label: {}, Image: {}, Country of Origin: {}", dish, dishLabel, image, countryOfOriginLabel);
            }

            // Close the query execution
            queryExecution.close();
            logger.info("Query executed successfully!");
            return "Query executed successfully!";
        })
                ;
        mono.subscribe();
        return mono;



    }


}
