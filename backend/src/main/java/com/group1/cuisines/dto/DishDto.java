package com.group1.cuisines.dto;
import lombok.*;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DishDto {
    private String id;
    private String name;
    private String image;
}