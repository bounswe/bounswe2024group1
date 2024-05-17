package com.group1.cuisines.repositories;

import com.group1.cuisines.entities.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating,Integer> {
    Optional<Rating> findByRecipeIdAndUserId(Integer recipeId, Integer userId);

}
