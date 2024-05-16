package com.group1.cuisines;
import com.group1.cuisines.controllers.CuisineController;
import com.group1.cuisines.dao.response.ErrorResponse;
import com.group1.cuisines.dao.response.SuccessResponse;
import com.group1.cuisines.dto.CuisineDetailsDto;
import com.group1.cuisines.services.CuisineService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import jakarta.persistence.EntityNotFoundException;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@ExtendWith(MockitoExtension.class)
public class CuisineControllerTest {

    @Mock
    private CuisineService cuisineService;

    @InjectMocks
    private CuisineController cuisineController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void testGetCuisineByIdNotFound() {
        String cuisineId = "testCuisineId";
        when(cuisineService.getCuisineById(eq(cuisineId), anyBoolean())).thenThrow(new EntityNotFoundException("Cuisine not found"));

        ResponseEntity<?> response = cuisineController.getCuisineById(cuisineId, false);

        assertEquals(204, ((ErrorResponse) response.getBody()).getStatus());
        assertEquals("Cuisine not found", ((ErrorResponse) response.getBody()).getMessage());
    }

    @Test
    void testGetCuisineByIdFound() {
        String cuisineId = "testCuisineId";
        CuisineDetailsDto cuisineDetailsDto = new CuisineDetailsDto(cuisineId, "Test Cuisine", new ArrayList<>());
        when(cuisineService.getCuisineById(eq(cuisineId), anyBoolean())).thenReturn(cuisineDetailsDto);

        ResponseEntity<?> response = cuisineController.getCuisineById(cuisineId, false);

        assertEquals(200, ((SuccessResponse<?>) response.getBody()).getStatus());
        assertEquals("Cuisine details fetched successfully", ((SuccessResponse<?>) response.getBody()).getMessage());
        assertEquals(cuisineDetailsDto, ((SuccessResponse<?>) response.getBody()).getData());
    }
}