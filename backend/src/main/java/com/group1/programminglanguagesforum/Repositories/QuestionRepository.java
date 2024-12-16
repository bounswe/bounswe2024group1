package com.group1.programminglanguagesforum.Repositories;

import com.group1.programminglanguagesforum.Entities.DifficultyLevel;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query("SELECT q FROM Question q JOIN q.tags t WHERE t.id = :tagId order by q.likeCount desc ")
    List<Question> findQuestionsByTagId(@Param("tagId") Long tagId);

    @Query("SELECT DISTINCT q FROM Question q " +
            "LEFT JOIN q.tags t " +
            "WHERE (:query IS NULL OR " +
            "      LOWER(q.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "      LOWER(q.questionBody) LIKE LOWER(CONCAT('%', :query, '%'))) " +
            "AND (:tagIds IS NULL OR t.id IN :tagIds) " +
            "AND (:difficulty IS NULL OR q.difficulty = :difficulty)")
    Page<Question> searchQuestions(
            @Param("query") String query,
            @Param("tagIds") List<Long> tagIds,
            @Param("difficulty") DifficultyLevel difficulty,
            Pageable pageable);

    @Query("SELECT DISTINCT q FROM Question q " +
           "LEFT JOIN q.tags t " +
           "WHERE (:query IS NULL OR " +
           "      LOWER(q.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "      LOWER(q.questionBody) LIKE LOWER(CONCAT('%', :query, '%'))) " +
           "AND (:tagIds IS NULL OR t.id IN :tagIds) " +
           "AND (:difficulty IS NULL OR q.difficulty = :difficulty) " +
           "ORDER BY " +
           "    CASE WHEN :authorIds IS NOT NULL AND q.askedBy.id IN :authorIds THEN 1 ELSE 0 END DESC")
    Page<Question> searchQuestionsByRecommended(
            @Param("query") String query,
            @Param("authorIds") List<Long> authorIds,
            @Param("tagIds") List<Long> tagIds,
            @Param("difficulty") DifficultyLevel difficulty,
            Pageable pageable);

    @Query("SELECT q FROM Question q WHERE q.askedBy.id = :author")
    List<Question> findByAuthorId(@Param("author") Long authorId);

    @Query("SELECT q.askedBy FROM Question q WHERE q.id = :id")
    Optional<User> findQuestionOwner(@Param("id") Long questionId);
}

