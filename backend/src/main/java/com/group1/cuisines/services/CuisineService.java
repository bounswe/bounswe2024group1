package com.group1.cuisines.services;

import com.group1.cuisines.entities.Cuisine;
import com.group1.cuisines.repositories.CuisineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CuisineService {

    @Autowired
    private CuisineRepository cuisineRepository;

    public Cuisine getCuisineById(String cuisineId, boolean includeDishes) {
        return cuisineRepository.findById(cuisineId)
                .map(cuisine -> {
                    if (!includeDishes) {
                        cuisine.setDishes(null);  // Clear the dishes if not required
                    }
                    return cuisine;
                })
                .orElse(null);
    }
}
