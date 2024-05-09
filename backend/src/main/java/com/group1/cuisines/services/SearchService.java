package com.group1.cuisines.services;

import com.group1.cuisines.entities.Dish;
import com.group1.cuisines.repositories.DishRepository;
import com.group1.cuisines.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final DishRepository dishRepository;
    public List<Dish> searchDishes(String query, String cuisine, String foodType) {
        List<Dish> dishes = dishRepository.findAll();

        // Filter by dish name
        if (query != null && !query.isEmpty()) {
            dishes = dishRepository.findByNameContainingIgnoreCase(query);
        }

        // Filter by cuisine name
        if (cuisine != null && !cuisine.isEmpty()) {
            List<Dish> dishesByCuisine = dishRepository.findByCuisinesName(cuisine);
            dishes = dishes.stream()
                    .filter(dishesByCuisine::contains)
                    .collect(Collectors.toList());
        }

        // Filter by food type
        if (foodType != null && !foodType.isEmpty()) {
            dishes = dishes.stream()
                    .filter(d -> d.getFoodTypes() != null && d.getFoodTypes().contains(foodType))
                    .collect(Collectors.toList());
        }

        return dishes;
    }


}
