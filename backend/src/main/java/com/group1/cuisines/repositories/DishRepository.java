package com.group1.cuisines.repositories;

import com.group1.cuisines.entities.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DishRepository extends JpaRepository<Dish,String> {
    @Query("SELECT d FROM Dish d WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Dish> findByNameContainingIgnoreCase(String name);
    @Query("SELECT d FROM Dish d JOIN d.cuisines c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :cuisineName, '%'))")
    List<Dish> findByCuisinesName(@Param("cuisineName") String cuisineName);
    List<Dish> findByFoodTypesContainingIgnoreCase(String foodType);

    @Query("SELECT d FROM Dish d JOIN d.cuisines c WHERE c.id = :cuisineId")
    List<Dish> findByCuisineId(@Param("cuisineId") String cuisineId);

}
