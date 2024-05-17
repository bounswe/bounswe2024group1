package com.group1.cuisines;

import com.group1.cuisines.controllers.DishController;
import com.group1.cuisines.dao.response.ErrorResponse;
import com.group1.cuisines.dao.response.SuccessResponse;
import com.group1.cuisines.dto.DishDto;
import com.group1.cuisines.services.DishService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DishControllerTest {

    @InjectMocks
    private DishController dishController;

    @Mock
    private DishService dishService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetDishById_Found() {
        String dishId = "test-id";
        DishDto mockDish = DishDto.builder()
                .id(dishId)
                .name("Test Dish")
                .description("Delicious dish")
                .image("./image.jpg")
                .countries("USA")
                .ingredients("Ingredients")
                .foodTypes("Type")
                .cuisines("Cuisine")
                .build();

        when(dishService.getDishById(dishId)).thenReturn(mockDish);

        SuccessResponse<DishDto> response = (SuccessResponse<DishDto>) dishController.getDishById(dishId).getBody();

        DishDto actualDish = response.getData();

        assertEquals(200, response.getStatus());
        assertEquals(mockDish, actualDish);
    }

    @Test
    public void testGetDishById_NotFound() {
        String dishId = "test-id";
        when(dishService.getDishById(dishId)).thenReturn(null);

        ErrorResponse response = (ErrorResponse) dishController.getDishById(dishId).getBody();

        assertEquals(400, response.getStatus());
    }

}
