package com.group1.cuisines.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
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
    @Column(length = 1000)
    private String image;
    private String countries;
    @Column(length = 1000)
    private String ingredients;
    private String foodTypes;

    @JsonIgnore
    @ManyToMany(mappedBy = "dishes")
    private List<Cuisine> cuisines = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Dish dish = (Dish) o;
        return id != null && id.equals(dish.id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Dish{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", cuisines=" + cuisines +
                '}';
    }

}
