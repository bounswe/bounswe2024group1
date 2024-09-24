package com.group1.cuisines.services;

import com.group1.cuisines.dto.DishDto;
import com.group1.cuisines.repositories.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DishService {

    @Autowired
    private DishRepository dishRepository;

    public DishDto getDishById(String dishId) {
        return dishRepository.findById(dishId).map(DishDto::new).orElse(null);
    }

}
