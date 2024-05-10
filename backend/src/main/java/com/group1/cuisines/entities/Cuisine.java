package com.group1.cuisines.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;


@Data
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

    private List<Dish> dishes = new ArrayList<>();

    @Override
    public String toString() {
        return "Cuisine{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", dishes=" +  +
                '}';
    }

}
