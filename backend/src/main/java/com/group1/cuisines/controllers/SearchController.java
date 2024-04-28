package com.group1.cuisines.controllers;

import com.group1.cuisines.entities.Dish;
import com.group1.cuisines.services.WikidataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {
    private final WikidataService wikidataService;
    @GetMapping("/dishes/{parameter}")
    public ArrayList<Dish> searchDishes(@PathVariable String parameter) {
        return wikidataService.retrieveDishAndCuisineData(parameter);
    }
}
