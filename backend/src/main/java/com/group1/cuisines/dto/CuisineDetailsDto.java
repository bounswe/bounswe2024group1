package com.group1.cuisines.dto;
import lombok.*;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CuisineDetailsDto {
    private String id;
    private String name;
   // private String description;
    //private String image;
   // private Boolean isSelfFollowing;
    private List<DishDto> dishes;
}
