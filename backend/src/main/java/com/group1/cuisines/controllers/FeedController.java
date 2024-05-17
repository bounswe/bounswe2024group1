package com.group1.cuisines.controllers;

import com.group1.cuisines.dao.response.SuccessResponse;
import com.group1.cuisines.dto.RecipeDetailsDto;
import com.group1.cuisines.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class FeedController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/feed")
    public ResponseEntity<?> getFeed(@RequestParam String type, Authentication authentication) {
        if (!"explore".equals(type) && !"following".equals(type)) {
            return ResponseEntity.badRequest().body("Invalid type parameter.");
        }

        if ("following".equals(type)) {
            if (authentication == null || !authentication.isAuthenticated()) {
                // Return an empty set and a message for unauthenticated users
                return ResponseEntity.ok(new SuccessResponse<>(400,Collections.emptyList(), "No content available. Please log in and follow other users !."));
            }
            // Fetch following users' recipes for authenticated users
            String username = authentication.getName();
            List<RecipeDetailsDto> recipes = recipeService.getRecipesByType(type, username);
            return ResponseEntity.ok(new SuccessResponse<>(200,recipes, "Recipes fetched successfully from followed users."));
        }

        // For 'explore', accessible to everyone
        List<RecipeDetailsDto> recipes = recipeService.getRecipesByType(type, null);
        return ResponseEntity.ok(new SuccessResponse<>(200,recipes, "Recipes fetched successfully."));
    }
}
