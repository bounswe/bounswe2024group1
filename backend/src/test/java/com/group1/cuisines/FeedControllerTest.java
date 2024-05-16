package com.group1.cuisines;

import com.group1.cuisines.controllers.FeedController;
import com.group1.cuisines.dao.response.SuccessResponse;
import com.group1.cuisines.dto.RecipeDetailsDto;
import com.group1.cuisines.services.RecipeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class FeedControllerTest {

    @Mock
    private RecipeService recipeService;

    @InjectMocks
    private FeedController feedController;

    @Mock
    private Authentication authentication;

    @Mock
    private SecurityContext securityContext;

    @BeforeEach
    void setup() {
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void testGetFeedInvalidType() {
        ResponseEntity<?> response = feedController.getFeed("invalidType", null);
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Invalid type parameter.", response.getBody());
    }

    @Test
    void testGetFeedFollowingUnauthenticated() {
        lenient().when(securityContext.getAuthentication()).thenReturn(null);

        ResponseEntity<?> response = feedController.getFeed("following", null);
        SuccessResponse<?> successResponse = (SuccessResponse<?>) response.getBody();
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(400, successResponse.getStatus());
        assertEquals("No content available. Please log in and follow other users !.", successResponse.getMessage());
        assertEquals(Collections.emptyList(), successResponse.getData());
    }

    @Test
    void testGetFeedFollowingAuthenticated() {
        lenient().when(securityContext.getAuthentication()).thenReturn(authentication);
        lenient().when(authentication.isAuthenticated()).thenReturn(true);
        lenient().when(authentication.getName()).thenReturn("testUser");

        List<RecipeDetailsDto> recipes = Collections.singletonList(new RecipeDetailsDto());
        when(recipeService.getRecipesByType("following", "testUser")).thenReturn(recipes);

        ResponseEntity<?> response = feedController.getFeed("following", authentication);
        SuccessResponse<?> successResponse = (SuccessResponse<?>) response.getBody();
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(200, successResponse.getStatus());
        assertEquals("Recipes fetched successfully from followed users.", successResponse.getMessage());
        assertEquals(recipes, successResponse.getData());
    }

    @Test
    void testGetFeedExplore() {
        List<RecipeDetailsDto> recipes = Collections.singletonList(new RecipeDetailsDto());
        when(recipeService.getRecipesByType("explore", null)).thenReturn(recipes);

        ResponseEntity<?> response = feedController.getFeed("explore", null);
        SuccessResponse<?> successResponse = (SuccessResponse<?>) response.getBody();
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(200, successResponse.getStatus());
        assertEquals("Recipes fetched successfully.", successResponse.getMessage());
        assertEquals(recipes, successResponse.getData());
    }
}
