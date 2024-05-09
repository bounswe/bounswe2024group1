package com.group1.cuisines.controllers;

import com.group1.cuisines.dao.response.ApiResponse;
import com.group1.cuisines.entities.Dish;
import com.group1.cuisines.services.SearchService;
import com.group1.cuisines.services.WikidataService;
import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {

    private final WikidataService wikidataService;
    private final SearchService searchService;

    @GetMapping("/dishes")
    public ApiResponse<List<Dish>> searchDishes(@RequestParam(required = false) String q,
                                                @RequestParam(required = false) String cuisine,
                                                @RequestParam(required = false) String foodType) {
        return new ApiResponse<>(
            200,
            "Search completed",
                searchService.searchDishes(q, cuisine, foodType));

    }
}
