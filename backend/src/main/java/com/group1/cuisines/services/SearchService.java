package com.group1.cuisines.services;

import com.group1.cuisines.dto.DishDto;
import com.group1.cuisines.dto.DishResponseDto;
import com.group1.cuisines.entities.Dish;
import com.group1.cuisines.exceptions.ResourceNotFoundException;
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
    public List<DishResponseDto> searchDishes(String query, String cuisine, String foodType) {
        List<Dish> dishes = dishRepository.findAll();

        // Filter by dish name
        if (query != null && !query.isEmpty()) {
            dishes = dishRepository.findByNameContainingIgnoreCase(query);
            if (dishes.isEmpty()) {
                throw new ResourceNotFoundException("No dishes found with the given name query.");
            }
        }

        // Filter by cuisine name
        if (cuisine != null && !cuisine.isEmpty()) {
            List<Dish> dishesByCuisine = dishRepository.findByCuisinesName(cuisine);
            if (dishesByCuisine.isEmpty()) {
                throw new ResourceNotFoundException("No dishes found with the given cuisine.");
            }
            dishes = dishes.stream()
                    .filter(dishesByCuisine::contains)
                    .collect(Collectors.toList());
        }

        // Filter by food type
        if (foodType != null && !foodType.isEmpty()) {
            dishes = dishes.stream()
                    .filter(d -> d.getFoodTypes() != null && d.getFoodTypes().contains(foodType))
                    .collect(Collectors.toList());

            if (dishes.isEmpty()) {
                throw new ResourceNotFoundException("No dishes found with the given food type.");
            }
        }

        // Map to DishResponseDto
        return dishes.stream()
                .map(d -> new DishResponseDto(
                        d.getId(),
                        d.getName(),
                        d.getImage(),
                        d.getDescription(),
                        d.getCountries(),
                        d.getIngredients(),
                        d.getFoodTypes(),
                        d.getCuisines().isEmpty() ? null : d.getCuisines().get(0).getName()
                ))
                .collect(Collectors.toList());
    }


}
