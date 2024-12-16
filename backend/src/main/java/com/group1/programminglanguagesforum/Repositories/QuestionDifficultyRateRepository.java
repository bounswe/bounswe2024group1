package com.group1.programminglanguagesforum.Repositories;

import com.group1.programminglanguagesforum.Entities.DifficultyLevel;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.QuestionDifficultyRate;
import com.group1.programminglanguagesforum.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface QuestionDifficultyRateRepository extends JpaRepository<QuestionDifficultyRate, Long> {

    Optional<QuestionDifficultyRate> findByQuestionAndUser(Question question, User user);

    long countByDifficultyAndQuestion(DifficultyLevel difficultyLevel, Question question);
}
