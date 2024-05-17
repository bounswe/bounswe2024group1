package com.group1.cuisines.services;

import com.group1.cuisines.dto.CuisineDetailsDto;
import com.group1.cuisines.dto.DishDto;
import com.group1.cuisines.entities.Cuisine;
import com.group1.cuisines.entities.Dish;
import com.group1.cuisines.repositories.CuisineRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CuisineService {

    @Autowired
    private CuisineRepository cuisineRepository;

    public CuisineDetailsDto getCuisineById(String cuisineId, boolean includeDishes) {
        Cuisine cuisine = cuisineRepository.findById(cuisineId)
                .orElseThrow(() -> new EntityNotFoundException("Cuisine not found"));

        CuisineDetailsDto detailsDto = new CuisineDetailsDto(
                cuisine.getId(),
                cuisine.getName(),
               // cuisine.getDescription(),


                includeDishes ? convertDishes(cuisine.getDishes()) : new ArrayList<>()
        );
        return detailsDto;
    }

    private List<DishDto> convertDishes(Set<Dish> dishes) {
        return dishes.stream()
                .map(DishDto::new)
                .collect(Collectors.toList());
    }
}
