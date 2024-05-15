package com.group1.cuisines.dto;

import com.group1.cuisines.entities.Recipe;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDto {
    private Integer id;
    private String title;
    private String instructions;
    private int prepTime;
    private int cookTime;
    private int servingSize;
    private int ratingsCount;
    private double averageRating;
    private String dishName;

    public RecipeDto(Recipe recipe) {
        this.id = recipe.getId();
        this.title = recipe.getTitle();
        this.instructions = recipe.getInstructions();
        this.prepTime = recipe.getPrepTime();
        this.cookTime = recipe.getCookTime();
        this.servingSize = recipe.getServingSize();
        this.ratingsCount = recipe.getRatings().size();
        this.averageRating = recipe.getAverageRating();
        this.dishName = recipe.getDish().getName();
    }

}
