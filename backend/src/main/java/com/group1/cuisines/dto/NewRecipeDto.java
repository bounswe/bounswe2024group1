package com.group1.cuisines.dto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewRecipeDto {
    private String name;
    private String description;
    private String instructions;
    private int prepTime;
    private int cookTime;
    private int servingSize;
    private String dishId;
    private List<IngredientsDto> ingredients;
    private List<String> allergens;
}
