package com.group1.cuisines.dto;

import java.util.List;

import com.group1.cuisines.entities.Ingredient;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDetailsDto {
    private Integer id;
    private String name;
   // private String description;
    private String instructions;
    private List<IngredientsDto> ingredients;
    //private List<String> images;
    private Integer cookTime;
    private Integer servingSize;
   // private List<String> allergens;
    private CuisineDto cuisine;
    private DishDto dish;
    private Double avgRating;

    private AuthorDto author;



}