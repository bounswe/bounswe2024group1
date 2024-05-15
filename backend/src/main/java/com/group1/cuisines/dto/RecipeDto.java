package com.group1.cuisines.dto;

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
    private int preparationTime;
    private int cookingTime;
    private int servingSize;
    private double averageRating;
    private String dishName;




}
