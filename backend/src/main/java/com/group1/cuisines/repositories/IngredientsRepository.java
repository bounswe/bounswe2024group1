package com.group1.cuisines.repositories;

import com.group1.cuisines.entities.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientsRepository extends JpaRepository<Ingredient,Integer> {
}
