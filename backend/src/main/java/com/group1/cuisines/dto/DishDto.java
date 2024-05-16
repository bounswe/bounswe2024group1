package com.group1.cuisines.dto;
import com.group1.cuisines.entities.Dish;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DishDto {
    private String id;
    private String name;
    private String image;

    public DishDto(Dish dish) {
        this.id = dish.getId();
        this.name = dish.getName();
        this.image = dish.getImage();
    }

}