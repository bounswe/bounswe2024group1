package com.group1.cuisines.repositories;

import com.group1.cuisines.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;



@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    // Method to find all comments for a given recipe by its ID
    List<Comment> findByRecipeId(Integer recipeId);

}