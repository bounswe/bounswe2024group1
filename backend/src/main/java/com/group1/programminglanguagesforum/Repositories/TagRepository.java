package com.group1.programminglanguagesforum.Repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.group1.programminglanguagesforum.Entities.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findAllByIdIn(List<Long> ids);

    @Query("SELECT t FROM Tag t " +
            "LEFT JOIN Question q ON t MEMBER OF q.tags " +
            "WHERE LOWER(t.tagName) LIKE LOWER(CONCAT('%', :tagName, '%')) " +
            "GROUP BY t.id " +
            "ORDER BY COUNT(q.id) DESC")
    Page<Tag> findTagsByTagNameContainingIgnoreCase(String tagName, Pageable pageable);

    @Query("SELECT t FROM Tag t JOIN t.followers u WHERE u.id = :userId")
    List<Tag> findTagByFollowers(@Param("userId") Long userId);
}
