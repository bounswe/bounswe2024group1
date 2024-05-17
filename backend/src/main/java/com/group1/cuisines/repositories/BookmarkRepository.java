package com.group1.cuisines.repositories;

import com.group1.cuisines.entities.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark,Integer> {
    List<Bookmark> findByUserId(Integer userId);
    List<Bookmark> findByRecipeId(Integer recipeId);
    Optional<Bookmark> findByUserIdAndRecipeId(Integer userId, Integer recipeId);

}


