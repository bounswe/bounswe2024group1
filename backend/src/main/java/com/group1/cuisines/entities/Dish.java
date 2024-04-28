package com.group1.cuisines.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Dish {
    private String dishId;
    private String dishLabel;
    private String image;
    private String countryOfOriginLabel;
}
