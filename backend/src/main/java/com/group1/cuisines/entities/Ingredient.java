package com.group1.cuisines.entities;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ingredients")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String amount; // E.g. grams, cups, etc.
    @ManyToOne
    @JoinColumn(name = "recipe_id") // This column in the Ingredient table will hold the foreign key to the Recipe
    private Recipe recipe; // This is the 'recipe' field expected by the 'mappedBy' attribute
}
