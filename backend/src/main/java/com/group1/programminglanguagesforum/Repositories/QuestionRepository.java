package com.group1.programminglanguagesforum.Repositories;

import com.group1.programminglanguagesforum.Entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question,Long> {
    @Query("SELECT q FROM Question q JOIN q.tags t WHERE t.id = :tagId order by q.likeCount desc ")
    List<Question> findQuestionsByTagId(@Param("tagId") Long tagId);
}
