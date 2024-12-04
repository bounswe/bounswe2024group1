package com.group1.programminglanguagesforum.Repositories;

import com.group1.programminglanguagesforum.Entities.Answer;
import com.group1.programminglanguagesforum.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {

    @Query("SELECT a FROM Answer a WHERE a.answeredBy.id = :userId")
    List<Answer> findByAnsweredBy(Long userId);
}
