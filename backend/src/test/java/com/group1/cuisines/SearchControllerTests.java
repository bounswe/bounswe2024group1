package com.group1.cuisines;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.group1.cuisines.controllers.SearchController;
import com.group1.cuisines.dao.response.ApiResponse;
import com.group1.cuisines.dao.response.ErrorResponse;
import com.group1.cuisines.dao.response.SuccessResponse;
import com.group1.cuisines.dto.DishResponseDto;
import com.group1.cuisines.dto.UserDto;
import com.group1.cuisines.entities.User;
import com.group1.cuisines.services.SearchService;
import com.group1.cuisines.services.UserService;
import com.group1.cuisines.services.WikidataService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

public class SearchControllerTests {

    @InjectMocks
    SearchController searchController;

    @Mock
    WikidataService wikidataService;

    @Mock
    SearchService searchService;

    @Mock
    UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSearchUsers_NoUsersFound() {
        when(userService.searchUsers("test")).thenReturn(new ArrayList<>());

        ResponseEntity<?> responseEntity = searchController.searchUsers("test");

        assertEquals(HttpStatus.OK.value(), responseEntity.getStatusCodeValue(), "Status code does not match expected value on no users found");
        ErrorResponse errorResponse = (ErrorResponse) responseEntity.getBody();
        assertEquals(204, errorResponse.getStatus(), "Response code does not match expected value on no users found");
        assertEquals("No users found", errorResponse.getMessage(), "Response message does not match expected value on no users found");
    }

    @Test
    public void testSearchUsers_UsersFound() {
        List<User> users = new ArrayList<>();
        User user = new User();
        user.setId(1);
        user.setUsername("testuser");
        user.setFirstName("Test");
        user.setLastName("User");
        user.setFollowerCount(10);
        user.setFollowingCount(5);
        user.setRecipeCount(3);
        users.add(user);

        when(userService.searchUsers("test")).thenReturn(users);
        when(userService.isFollowing(null, 1)).thenReturn(false);

        ResponseEntity<?> responseEntity = searchController.searchUsers("test");

        assertEquals(HttpStatus.OK.value(), responseEntity.getStatusCodeValue(), "Status code does not match expected value on users found");
        SuccessResponse<List<UserDto>> successResponse = (SuccessResponse<List<UserDto>>) responseEntity.getBody();
        assertEquals(200, successResponse.getStatus(), "Response code does not match expected value on users found");
        assertEquals("Users fetched successfully", successResponse.getMessage(), "Response message does not match expected value on users found");

        UserDto userDto = successResponse.getData().get(0);
        assertEquals(1, userDto.getId(), "User ID does not match expected value");
        assertEquals("testuser", userDto.getUsername(), "Username does not match expected value");
        assertEquals("Test", userDto.getFirstName(), "First name does not match expected value");
        assertEquals("User", userDto.getLastName(), "Last name does not match expected value");
        assertEquals(false, userDto.isSelfFollowing(), "Following status does not match expected value");
        assertEquals(10, userDto.getFollowerCount(), "Follower count does not match expected value");
        assertEquals(5, userDto.getFollowingCount(), "Following count does not match expected value");
        assertEquals(3, userDto.getRecipeCount(), "Recipe count does not match expected value");
    }

    @Test
    public void testSearchDishes() {
        List<DishResponseDto> dishes = new ArrayList<>();
        DishResponseDto dish = new DishResponseDto();
        dish.setId("1"); // Set ID as String
        dish.setName("Pasta");
        dishes.add(dish);

        when(searchService.searchDishes("pasta", null, null)).thenReturn(dishes);

        ApiResponse<List<DishResponseDto>> response = searchController.searchDishes("pasta", null, null);

        assertEquals(200, response.getStatus(), "Response code does not match expected value on search dishes");
        assertEquals("Search completed", response.getMessage(), "Response message does not match expected value on search dishes");

        DishResponseDto responseDish = response.getData().get(0);
        assertEquals("1", responseDish.getId(), "Dish ID does not match expected value");
        assertEquals("Pasta", responseDish.getName(), "Dish name does not match expected value");
    }
}
