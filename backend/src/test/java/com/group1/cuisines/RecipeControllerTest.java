package com.group1.cuisines;

import com.group1.cuisines.controllers.RecipeController;
import com.group1.cuisines.dao.response.ErrorResponse;
import com.group1.cuisines.dao.response.SuccessResponse;
import com.group1.cuisines.dto.*;
import com.group1.cuisines.entities.User;
import com.group1.cuisines.services.AuthenticationService;
import com.group1.cuisines.services.RecipeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class RecipeControllerTest {

    @Mock
    private RecipeService recipeService;

    @Mock
    private AuthenticationService authenticationService;

    @InjectMocks
    private RecipeController recipeController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetRecipeById_Success() {
        RecipeDetailsDto recipeDetails = new RecipeDetailsDto();
        when(recipeService.getRecipeById(1)).thenReturn(recipeDetails);

        ResponseEntity<?> response = recipeController.getRecipeById(1);
        SuccessResponse<?> successResponse = (SuccessResponse<?>) response.getBody();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assert successResponse != null;
        assertEquals(recipeDetails, successResponse.getData());
        assertEquals("Recipe fetched successfully", successResponse.getMessage());
    }

    @Test
    void testGetRecipeById_NotFound() {
        when(recipeService.getRecipeById(1)).thenReturn(null);

        ResponseEntity<?> response = recipeController.getRecipeById(1);
        ErrorResponse errorResponse = (ErrorResponse) response.getBody();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assert errorResponse != null;
        assertEquals(200, errorResponse.getStatus());
    }

    @Test
    void testGetRecipes() {
        List<RecipeDto> recipes = Collections.singletonList(new RecipeDto());
        when(recipeService.findRecipes(null, null, null)).thenReturn(recipes);

        ResponseEntity<?> response = recipeController.getRecipes(null, null, null);
        SuccessResponse<?> successResponse = (SuccessResponse<?>) response.getBody();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assert successResponse != null;
        assertEquals(recipes, successResponse.getData());
        assertEquals("Recipes fetched successfully", successResponse.getMessage());
    }

    @Test
    void testCreateRecipe_Unauthenticated() throws Exception {
        when(authenticationService.getUser()).thenReturn(Optional.empty());

        NewRecipeDto newRecipe = new NewRecipeDto();
        ResponseEntity<?> response = recipeController.createRecipe(newRecipe);

        ErrorResponse errorResponse = (ErrorResponse) response.getBody();
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assert errorResponse != null;
        assertEquals(401, errorResponse.getStatus());
        assertEquals("Authentication required", errorResponse.getMessage());
    }

    @Test
    void testCreateRecipe_Success() throws Exception {
        User user = User.builder().username("testUser").build();
        when(authenticationService.getUser()).thenReturn(Optional.of(user));

        NewRecipeDto newRecipe = new NewRecipeDto();
        RecipeDetailDto recipeDetails = new RecipeDetailDto();
        when(recipeService.createRecipe(newRecipe, "testUser")).thenReturn(recipeDetails);

        ResponseEntity<?> response = recipeController.createRecipe(newRecipe);
        SuccessResponse<?> successResponse = (SuccessResponse<?>) response.getBody();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assert successResponse != null;
        assertEquals(recipeDetails, successResponse.getData());
        assertEquals("Recipe created successfully", successResponse.getMessage());
    }

    @Test
    void testDeleteRecipe_Unauthenticated() {
        when(authenticationService.getUser()).thenReturn(Optional.empty());

        ResponseEntity<?> response = recipeController.deleteRecipe(1);
        ErrorResponse errorResponse = (ErrorResponse) response.getBody();

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assert errorResponse != null;
        assertEquals(401, errorResponse.getStatus());
        assertEquals("Authentication required", errorResponse.getMessage());
    }

    @Test
    void testDeleteRecipe_Success() {
        User user = User.builder().username("testUser").build();
        when(authenticationService.getUser()).thenReturn(Optional.of(user));
        when(recipeService.deleteRecipe(1, "testUser")).thenReturn(true);

        ResponseEntity<?> response = recipeController.deleteRecipe(1);
        SuccessResponse<?> successResponse = (SuccessResponse<?>) response.getBody();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assert successResponse != null;
        assertEquals("Recipe deleted successfully", successResponse.getMessage());
    }
}
