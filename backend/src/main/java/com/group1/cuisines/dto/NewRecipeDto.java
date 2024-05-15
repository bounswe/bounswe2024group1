package com.group1.cuisines.dto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewRecipeDto {
    private String title;
    private String instructions;
    private int preparationTime;
    private int cookingTime;
    private int servingSize;
    private String dishId;
    private List<IngredientsDto> ingredients;
}
