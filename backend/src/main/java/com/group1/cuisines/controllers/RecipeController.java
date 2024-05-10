package com.group1.cuisines.controllers;
import com.group1.cuisines.dto.NewRecipeDto;
import com.group1.cuisines.dto.RecipeDetailDto;
import com.group1.cuisines.services.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/v1")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

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



}
