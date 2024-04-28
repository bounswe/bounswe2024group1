package com.group1.cuisines.controllers;

import com.group1.cuisines.entities.Dish;
import com.group1.cuisines.services.WikidataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {
    private final WikidataService wikidataService;
    @GetMapping("/dishes")
    public ArrayList<Dish> searchDishes(@RequestParam String q) {
        return wikidataService.retrieveDishAndCuisineData(q);
    }
}
