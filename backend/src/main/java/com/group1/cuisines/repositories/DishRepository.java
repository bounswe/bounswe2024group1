package com.group1.cuisines.repositories;

import com.group1.cuisines.entities.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DishRepository extends JpaRepository<Dish,String> {

}
