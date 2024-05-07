package com.group1.cuisines.repositories;

import com.group1.cuisines.entities.Cuisine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuisineRepository extends JpaRepository<Cuisine,String> {
}
