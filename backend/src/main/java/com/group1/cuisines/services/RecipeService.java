package com.group1.cuisines.services;

import com.group1.cuisines.dto.IngredientsDto;
import com.group1.cuisines.dto.NewRecipeDto;
import com.group1.cuisines.dto.RecipeDetailDto;
import com.group1.cuisines.entities.Dish;
import com.group1.cuisines.entities.Ingredient;
import com.group1.cuisines.entities.Recipe;
import com.group1.cuisines.entities.User;
import com.group1.cuisines.repositories.DishRepository;
import com.group1.cuisines.repositories.IngredientsRepository;
import com.group1.cuisines.repositories.RecipeRepository;
import com.group1.cuisines.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class RecipeService {
    @Autowired
    private IngredientsRepository ingredientRepository;

    @Autowired
    private RecipeRepository recipeRepository;
    @Autowired
    private DishRepository dishRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public RecipeDetailDto createRecipe(NewRecipeDto newRecipe, String username) throws Exception {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()){
            throw new IllegalStateException("User not found");
        }
        Dish dish = dishRepository.findById(newRecipe.getDishId()).orElseThrow(
                () -> new Exception("Dish with ID " + newRecipe.getDishId() + " not found")
        );

        Recipe recipe = Recipe.builder()
                .title(newRecipe.getTitle())
                .instructions(newRecipe.getInstructions())
                .preparationTime(newRecipe.getPreparationTime())
                .cookingTime(newRecipe.getCookingTime())
                .servingSize(newRecipe.getServingSize())
                .dish(dish)
                .user(user.get())
                .build();



        // Handle ingredients
        for (IngredientsDto ingredientDto : newRecipe.getIngredients()) {
            Ingredient ingredient = Ingredient.builder()
                    .name(ingredientDto.getName())
                    .recipe(recipe) // Link ingredient to the recipe
                    .build();
            ingredientRepository.save(ingredient);
            recipe.getIngredients().add(ingredient);
        }
        recipe = recipeRepository.save(recipe);


            return RecipeDetailDto.builder()
                    .id(recipe.getId())
                    .title(recipe.getTitle())
                    .instructions(recipe.getInstructions())
                    .preparationTime(recipe.getPreparationTime())
                    .cookingTime(recipe.getCookingTime())
                    .dishName(recipe.getDish().getName())
                    .build();

    }
}
