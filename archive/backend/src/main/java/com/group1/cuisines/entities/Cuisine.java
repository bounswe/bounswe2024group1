package com.group1.cuisines.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.net.URL;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cuisines")
public class Cuisine {
    @Id
    private String id;
    private String name;
    private String description;
    private URL wikipediaLink;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "cuisine_dish",
            joinColumns = @JoinColumn(name = "cuisine_id"),
            inverseJoinColumns = @JoinColumn(name = "dish_id")
    )

    private Set<Dish> dishes = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cuisine cuisine = (Cuisine) o;
        return id != null && id.equals(cuisine.id);
    }

    @Override
    public int hashCode() {
        return 31;
    }
    @Override
    public String toString() {
        return "Cuisine{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", dishes=" +  +
                '}';
    }

}
