package com.group1.cuisines.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DishResponseDto {
    private String id;
    private String name;
    private String image;
    private String description;
    private String countries;
    private String ingredients;
    private String foodTypes;
    private String cuisines;
}
