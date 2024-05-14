package com.group1.cuisines.controllers;

import com.group1.cuisines.dao.response.ApiResponse;
import com.group1.cuisines.dao.response.ErrorResponse;
import com.group1.cuisines.dao.response.SuccessResponse;
import com.group1.cuisines.dto.CuisineDetailsDto;
import com.group1.cuisines.entities.Cuisine;
import com.group1.cuisines.repositories.CuisineRepository;
import com.group1.cuisines.services.CuisineService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/cuisines")
@RequiredArgsConstructor
public class CuisineController {
    @Autowired
    private CuisineService cuisineService;
    private final CuisineRepository cuisineRepository;

    @GetMapping("/{cuisineId}")
    public ResponseEntity<?> getCuisineById(@PathVariable String cuisineId, @RequestParam(required = false) Boolean includeDishes) {
        try {
            CuisineDetailsDto cuisineDetails = cuisineService.getCuisineById(cuisineId, Boolean.TRUE.equals(includeDishes));
            return ResponseEntity.ok(new SuccessResponse<>(200,cuisineDetails, "Cuisine details fetched successfully"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.ok(new ErrorResponse(204,"Cuisine not found"));
        }
    }
}
