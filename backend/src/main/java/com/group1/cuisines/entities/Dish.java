package com.group1.cuisines.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder.Default;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Dish {
    private String id;
    private String name;
    private String image;
    private String country;
    private String ingredients;
}
