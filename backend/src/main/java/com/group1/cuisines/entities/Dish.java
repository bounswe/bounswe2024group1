package com.group1.cuisines.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dishes")
public class Dish {
    @Id
    private String id;
    private String name;
    private String description;
    private String image;
    private String countries;
    private String ingredients;
    private String foodTypes;
    private String cuisine;


    @ManyToMany(mappedBy = "dishes")
    private List<Cuisine> cuisines;
}
