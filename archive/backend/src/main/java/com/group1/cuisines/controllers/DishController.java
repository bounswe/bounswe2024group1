package com.group1.cuisines.controllers;

import com.group1.cuisines.dao.response.ErrorResponse;
import com.group1.cuisines.dao.response.SuccessResponse;
import com.group1.cuisines.dto.DishDto;
import com.group1.cuisines.services.DishService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dishes")
@RequiredArgsConstructor
public class DishController {

    @Autowired
    private DishService dishService;

    @GetMapping("/{dishId}")
    public ResponseEntity<?> getDishById(@PathVariable String dishId) {
        DishDto dishDto = dishService.getDishById(dishId);
        if (dishDto != null) {
            return ResponseEntity.ok(new SuccessResponse<>(200, dishDto, "Dish fetched successfully"));
        } else {
            return ResponseEntity.ok(new ErrorResponse(400, "Dish not found"));
        }
    }
}
