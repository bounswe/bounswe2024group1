package com.group1.cuisines.repositories;

import com.group1.cuisines.entities.Upvote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UpvoteRepository extends JpaRepository<Upvote,Integer> {
}