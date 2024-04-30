package com.group1.cuisines.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Dish {

    private String id;
    private String name;
    private String description;
    private String image;
    private String countries;
    private String ingredients;
    private String foodTypes;
    private String cuisines;
}
