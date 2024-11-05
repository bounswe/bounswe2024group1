package com.group1.programminglanguagesforum.Repositories;

import com.group1.programminglanguagesforum.Entities.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {
}
