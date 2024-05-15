package com.group1.cuisines.controllers;
import com.group1.cuisines.dao.response.SuccessResponse;
import com.group1.cuisines.dto.*;
import com.group1.cuisines.entities.Comment;
import com.group1.cuisines.entities.User;
import com.group1.cuisines.services.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;


    @GetMapping("/recipes/{recipeId}")
    public ResponseEntity<?> getRecipeById(@PathVariable Integer recipeId) {
        RecipeDetailsDto recipeDetails = recipeService.getRecipeById(recipeId);
        if (recipeDetails != null) {
            return ResponseEntity.ok(new SuccessResponse<>(200,recipeDetails, "Recipe fetched successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recipe not found");
        }
    }


    @GetMapping("/recipes")
    public ResponseEntity<List<RecipeDto>> getRecipes(@RequestParam(required = false) String sort,
                                                      @RequestParam(required = false) String dishId,
                                                      @RequestParam(required = false) String cuisineId) {
        List<RecipeDto> recipes = recipeService.findRecipes(sort, dishId, cuisineId);
        return ResponseEntity.ok(recipes);
    }



    @PostMapping("/recipes")
    public ResponseEntity<?> createRecipe(@RequestBody NewRecipeDto newRecipe) throws Exception{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Check if the user is authenticated
        if (authentication == null || authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication required.");
        }

        String username = authentication.getName();
        RecipeDetailDto recipeDetails = recipeService.createRecipe(newRecipe, username);
        if (recipeDetails != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(recipeDetails);
        } else {
            return ResponseEntity.badRequest().body("Failed to create recipe");
        }
    }
    @DeleteMapping("/recipes/{id}")
    public ResponseEntity<?> deleteRecipe(@PathVariable Integer id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Check if the user is authenticated
        if (authentication == null || authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication required.");
        }

        String username = authentication.getName();
        if (recipeService.deleteRecipe(id, username)) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Recipe deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to delete recipe");
        }
    }
    @PostMapping("/recipes/{recipeId}/rating")
    public ResponseEntity<?> rateRecipe(@PathVariable Integer recipeId, @RequestBody RatingDto ratingDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication required.");
        }

        String username = authentication.getName(); // Assuming the username can be obtained like this
        boolean success = recipeService.rateRecipe(recipeId, username, ratingDto.getRating());

        if (success) {
            return ResponseEntity.ok().body("Rating added successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to add rating");
        }
    }

    @PostMapping("/recipes/{recipeId}/bookmarks")
    public ResponseEntity<?> bookmarkRecipe(@PathVariable Integer recipeId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication required.");
        }

        String username = authentication.getName(); // Assuming the username can be obtained like this
        boolean success = recipeService.bookmarkRecipe(recipeId, username);

        if (success) {
            return ResponseEntity.ok().body("Recipe bookmarked successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to bookmark recipe");
        }
    }

    @GetMapping("/recipes/{recipeId}/bookmarks")
    public ResponseEntity<?> getBookmarks(@PathVariable Integer recipeId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication required.");
        }

        List<User> whoBookmarked = recipeService.getWhoBookmarked(recipeId);
        return ResponseEntity.ok().body(whoBookmarked);
    }

    @GetMapping("/recipes/{recipeId}/comments")
    public ResponseEntity<?> getComments(@PathVariable Integer recipeId) {
        List<CommentsDto> commentsDto = recipeService.getCommentsByRecipeId(recipeId);
        if (commentsDto.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No comments found for this recipe.");
        }
        return ResponseEntity.ok(commentsDto);
    }


}
