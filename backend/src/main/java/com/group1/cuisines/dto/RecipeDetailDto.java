package com.group1.cuisines.dto;
import com.group1.cuisines.entities.Recipe;
import lombok.*;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDetailDto {
    private Integer id;
    private String title;
    private String instructions;
    private int prepTime;
    private int cookTime;
    private int ratingsCount;
    private String dishName;

    public RecipeDetailDto(Recipe recipe) {
        this.id = recipe.getId();
        this.title = recipe.getTitle();
        this.instructions = recipe.getInstructions();
        this.prepTime = recipe.getPrepTime();
        this.cookTime = recipe.getCookTime();
        this.ratingsCount = recipe.getRatings().size();
        this.dishName = recipe.getDish().getName();
    }

}
