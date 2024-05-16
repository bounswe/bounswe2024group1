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
    private String description;
    private String image;
    private String countries;
    private String ingredients;
    private String foodTypes;
    private String cuisines;

    public DishDto(Dish dish) {
        this.id = dish.getId();
        this.name = dish.getName();
        this.description = dish.getDescription();
        this.image = dish.getImage();
        this.countries = dish.getCountries();
        this.ingredients = dish.getIngredients();
        this.foodTypes = dish.getFoodTypes();
        if (!dish.getCuisines().isEmpty()) {
            this.cuisines = dish.getCuisines().get(0).getName();
        }
    }

}