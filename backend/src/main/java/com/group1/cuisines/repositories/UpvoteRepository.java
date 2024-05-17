package com.group1.cuisines.repositories;

import com.group1.cuisines.entities.Upvote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UpvoteRepository extends JpaRepository<Upvote,Integer> {
    Optional<Upvote> findByCommentIdAndUserId(Integer commentId, Integer userId);
}
