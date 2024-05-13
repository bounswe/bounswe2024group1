package com.group1.cuisines.services;

import com.group1.cuisines.dto.*;
import com.group1.cuisines.entities.*;
import com.group1.cuisines.repositories.*;
import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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
    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private CommentRepository commentRepository;




    public List<RecipeDto> findRecipes(String sort, String dishId, String cuisineId) {
        List<Recipe> recipes = recipeRepository.findByDishIdAndCuisineIdWithSort(dishId, cuisineId, sort);

        return recipes.stream()
                .map(recipe -> new RecipeDto(
                        recipe.getId(),
                        recipe.getTitle(),
                        recipe.getInstructions(),
                        recipe.getPreparationTime(),
                        recipe.getCookingTime(),
                        recipe.getServingSize(),
                        recipe.getAverageRating(),
                        recipe.getTitle()))
                .collect(Collectors.toList());
    }

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
        user.get().setRecipeCount(user.get().getRecipeCount() + 1);


            return RecipeDetailDto.builder()
                    .id(recipe.getId())
                    .title(recipe.getTitle())
                    .instructions(recipe.getInstructions())
                    .preparationTime(recipe.getPreparationTime())
                    .cookingTime(recipe.getCookingTime())
                    .dishName(recipe.getDish().getName())
                    .build();

    }

    public boolean deleteRecipe(Integer id, String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()){
            return false;
        }
        Optional<Recipe> recipe = recipeRepository.findById(id);
        if (recipe.isEmpty()){
            return false;
        }
        if (recipe.get().getUser().getId() != user.get().getId()){
            return false;
        }
        user.get().setRecipeCount(user.get().getRecipeCount() - 1);
        recipeRepository.delete(recipe.get());

        return true;
    }

    public boolean rateRecipe(Integer recipeId, String username, Integer ratingValue) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()){
            return false;
        }
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);

        if (user.isPresent() && recipe != null && ratingValue >= 1 && ratingValue <= 5) {
            Rating existingRating = ratingRepository.findByRecipeIdAndUserId(recipeId, user.get().getId());
            if (existingRating != null) {
                return false; // Indicates that the user has already rated
            }
            Rating rating = new Rating();
            rating.setUser(user.get());
            rating.setRecipe(recipe);
            rating.setRatingValue(ratingValue);
            ratingRepository.save(rating);
            double newAverage = recipeRepository.findAverageByRecipeId(recipeId);
            recipe.setAverageRating(newAverage);
            recipeRepository.save(recipe);
            return true;
        }
        return false;
    }

    public boolean bookmarkRecipe(Integer recipeId, String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null){
            return false;
        }
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
        if (recipe == null){
            return false;
        }
        if (bookmarkRepository.findByUserIdAndRecipeId(user.getId(), recipeId).isPresent()){
            return false;
        }

        Bookmark bookmark = Bookmark.builder()
                .user(user)
                .recipe(recipe)
                .build();
        bookmarkRepository.save(bookmark);

        return true;
    }

    public List<User> getWhoBookmarked(Integer recipeId) {
        return bookmarkRepository.findByRecipeId(recipeId).stream().map(Bookmark::getUser).toList();
    }


    public List<CommentsDto> getCommentsByRecipeId(Integer recipeId) {
        return commentRepository.findByRecipeId(recipeId).stream()
                .map(comment -> CommentsDto.builder()
                        .id(comment.getId())
                        .userId(comment.getUser().getId())
                        .recipeId(comment.getRecipe().getId())
                        .text(comment.getText())
                        .createdDate(comment.getCreatedDate())
                        .upvoteCount(comment.getUpvotes() != null ? comment.getUpvotes().size() : 0)
                        .build())
                .collect(Collectors.toList());
    }

    public RecipeDetailsDto getRecipeById(Integer recipeId) {
        Optional<Recipe> recipe = recipeRepository.findById(recipeId);


        if (recipe.isPresent()) {
            CuisineDto cuisineDto = new CuisineDto();
            Recipe r = recipe.get();
            if (r.getDish() != null && !r.getDish().getCuisines().isEmpty()) {

                    cuisineDto.setId(r.getDish().getCuisines().get(0).getId());
                    cuisineDto.setName(r.getDish().getCuisines().get(0).getName());

            }
            else if(r.getDish() != null && r.getDish().getCuisines().isEmpty()){
                cuisineDto.setId("No cuisine Id from wikidata");
                cuisineDto.setName("No cuisine name from wikidata");
            }
            // Conversion from Recipe entity to RecipeDetailsDto
            return new RecipeDetailsDto(
                    r.getId(),
                    r.getTitle(),

                    r.getInstructions(),
                    r.getIngredients().stream().map(ingredient -> new IngredientsDto( ingredient.getName())).collect(Collectors.toList()),

                    r.getCookingTime(),
                    r.getServingSize(),
                    cuisineDto,

                    new DishDto(r.getDish().getId(), r.getDish().getName(), r.getDish().getImage()),
                    r.getAverageRating(),
                    new AuthorDto(r.getUser().getId(), r.getUser().getFirstName() , r.getUser().getUsername(), r.getUser().getFollowers().size(), r.getUser().getRecipeCount())

            );
        }
        return null;
    }

    public List<RecipeDetailsDto> getRecipesByType(String type, @Nullable String username) {
        if ("explore".equals(type)) {
            return recipeRepository.findAll().stream()
                    .map(this::convertToRecipeDto)
                    .collect(Collectors.toList());
        } else if ("following".equals(type) && username != null) {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            return user.getFollowing().stream()
                    .flatMap(followingUser -> followingUser.getRecipes().stream())
                    .map(this::convertToRecipeDto)
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();  // Return an empty list if username is null or other conditions are not met
    }

    private RecipeDetailsDto convertToRecipeDto(Recipe r) {
        CuisineDto cuisineDto = new CuisineDto();
        if (r.getDish() != null && !r.getDish().getCuisines().isEmpty()) {

            cuisineDto.setId(r.getDish().getCuisines().get(0).getId());
            cuisineDto.setName(r.getDish().getCuisines().get(0).getName());

        }
        else if(r.getDish() != null && r.getDish().getCuisines().isEmpty()){
            cuisineDto.setId("No cuisine Id from wikidata");
            cuisineDto.setName("No cuisine name from wikidata");
        }
        // Conversion logic here
        return new RecipeDetailsDto(
                r.getId(),
                r.getTitle(),

                r.getInstructions(),
                r.getIngredients().stream().map(ingredient -> new IngredientsDto( ingredient.getName())).collect(Collectors.toList()),

                r.getCookingTime(),
                r.getServingSize(),
                cuisineDto,

                new DishDto(r.getDish().getId(), r.getDish().getName(), r.getDish().getImage()),
                r.getAverageRating(),
                new AuthorDto(r.getUser().getId(), r.getUser().getFirstName() , r.getUser().getUsername(), r.getUser().getFollowers().size(), r.getUser().getRecipeCount())

        );
    }
}
