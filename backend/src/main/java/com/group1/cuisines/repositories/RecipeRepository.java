package com.group1.cuisines.repositories;

import com.group1.cuisines.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe,Integer> {
    @Query("SELECT AVG(r.ratingValue) FROM Rating r WHERE r.recipe.id = :recipeId")
    Double findAverageByRecipeId(Integer recipeId);
    // Method to add a comment to a recipe by a user with the given username and comment and return a boolean value to indicate success
    boolean addComment(Integer recipeId, String username, String comment);
}
