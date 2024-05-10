package com.group1.cuisines.controllers;

import com.group1.cuisines.dao.response.ApiResponse;
import com.group1.cuisines.entities.Cuisine;
import com.group1.cuisines.repositories.CuisineRepository;
import com.group1.cuisines.services.CuisineService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/cuisines")
@RequiredArgsConstructor
public class CuisineController {
    @Autowired
    private CuisineService cuisineService;
    private final CuisineRepository cuisineRepository;

    @GetMapping("/{cuisineId}")
    public ResponseEntity<?> getCuisineDetails(
            @PathVariable String cuisineId,
            @RequestParam(defaultValue = "false") boolean includeDishes) {

        Cuisine cuisine = cuisineService.getCuisineById(cuisineId, includeDishes);
        if (cuisine == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cuisine);
    }
}
