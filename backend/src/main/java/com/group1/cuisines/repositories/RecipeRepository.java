package com.group1.cuisines.repositories;

import com.group1.cuisines.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe,Integer> {
    @Query("SELECT AVG(r.ratingValue) FROM Rating r WHERE r.recipe.id = :recipeId")
    Double findAverageByRecipeId(Integer recipeId);
}
