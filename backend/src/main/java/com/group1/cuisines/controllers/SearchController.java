package com.group1.cuisines.controllers;

import com.group1.cuisines.dao.response.ApiResponse;
import com.group1.cuisines.dao.response.ErrorResponse;
import com.group1.cuisines.dao.response.SuccessResponse;
import com.group1.cuisines.dto.DishResponseDto;
import com.group1.cuisines.dto.UserDto;
import com.group1.cuisines.entities.Dish;
import com.group1.cuisines.entities.User;
import com.group1.cuisines.services.SearchService;
import com.group1.cuisines.services.UserService;
import com.group1.cuisines.services.WikidataService;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {

    private final WikidataService wikidataService;
    private final SearchService searchService;
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<?> searchUsers(@RequestParam(required = false) String q) {
        List<User> users = userService.searchUsers(q);
        if (users.isEmpty()) {
            // Return a custom message with a "No Content" status when no users are found
            return ResponseEntity.ok(new ErrorResponse(204,"No users found"));
        }
        return ResponseEntity.ok(new SuccessResponse<>(200, users.stream().map(user -> new UserDto(
            user.getId(),
            user.getUsername(),
            user.getFirstName(),
            user.getLastName(),
            user.getFollowerCount(),
            user.getFollowingCount(),
            user.getRecipeCount()
        )).collect(Collectors.toList()), "Users fetched successfully"));

    }

    @GetMapping("/dishes")
    public ApiResponse<List<DishResponseDto>> searchDishes(@RequestParam(required = false) String q,
                                                           @RequestParam(required = false) String cuisine,
                                                           @RequestParam(required = false) String foodType) {
        return new ApiResponse<>(
            200,
            "Search completed",
                searchService.searchDishes(q, cuisine, foodType));

    }
}
