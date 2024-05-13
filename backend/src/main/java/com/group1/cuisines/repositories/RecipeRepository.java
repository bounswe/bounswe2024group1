package com.group1.cuisines.repositories;

import com.group1.cuisines.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {




    @Query("SELECT r FROM Recipe r WHERE " +
            "(:dishId IS NULL OR r.dish.id = :dishId) AND " +
            "(:cuisineId IS NULL OR EXISTS (SELECT d FROM Dish d JOIN d.cuisines c WHERE d = r.dish AND c.id = :cuisineId)) " +
            "ORDER BY CASE WHEN :sort = 'recent' THEN r.createdAt ELSE r.averageRating END DESC")
    List<Recipe> findByDishIdAndCuisineIdWithSort(
            @Param("dishId") String dishId,
            @Param("cuisineId") String cuisineId,
            @Param("sort") String sort);

    // Fetch recipes by dishId and cuisineId
    @Query("SELECT r FROM Recipe r JOIN r.dish d JOIN d.cuisines c WHERE d.id = :dishId AND c.id = :cuisineId ORDER BY r.createdAt DESC")
    List<Recipe> findByDishIdAndCuisineIdOrderByCreatedAtDesc(String dishId, String cuisineId);

    @Query("SELECT r FROM Recipe r JOIN r.dish d JOIN d.cuisines c WHERE d.id = :dishId AND c.id = :cuisineId ORDER BY r.averageRating DESC")
    List<Recipe> findByDishIdAndCuisineIdOrderByAverageRatingDesc(String dishId, String cuisineId);
    @Query("SELECT r FROM Recipe r JOIN r.dish d JOIN d.cuisines c WHERE d.id = :dishId AND c.id = :cuisineId")
    List<Recipe> findByDishIdAndCuisineId(String dishId, String cuisineId);
    @Query("SELECT AVG(r.ratingValue) FROM Rating r WHERE r.recipe.id = :recipeId")
    Double findAverageByRecipeId(Integer recipeId);
}
