package com.group1.cuisines.dto;
import com.group1.cuisines.entities.Ingredient;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IngredientsDto {
    private String name;
    private String description;
    private String amount;

    public IngredientsDto(Ingredient ingredient) {
        this.name = ingredient.getName();
        this.description = ingredient.getDescription();
        this.amount = ingredient.getAmount();
    }

}
