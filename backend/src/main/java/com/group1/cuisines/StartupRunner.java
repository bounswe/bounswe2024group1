package com.group1.cuisines;

import com.group1.cuisines.entities.Dish;
import com.group1.cuisines.services.WikidataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class StartupRunner implements CommandLineRunner {
    @Autowired
    private WikidataService wikidataService;

    private static final Logger logger = LoggerFactory.getLogger(
            WikidataService.class
    );
    public StartupRunner() {
        logger.info("com.group1.cuisines.StartupRunner created");
    }


    @Override
    public void run(String... args) throws Exception {
        ArrayList<Dish> dishes = wikidataService.retrieveDishAndCuisineData("");
        // You can handle the dishes list here or just check if everything works
        logger.info("Data is stored successfully!");
    }
}
