package com.group1.programminglanguagesforum.Repositories;

import com.group1.programminglanguagesforum.Entities.Answer;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Entities.Vote;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote,Long> {
    Optional<Vote> findByUserAndQuestionAndIsUpvote(User user, Question question, boolean isUpvote);
    Optional<Vote> findByUserAndAnswer(User user, Answer answer);
    Optional<Vote> findByUserAndQuestion(User user, Question question);
    Optional<Vote> findByUserAndAnswerAndIsUpvote(User user, Answer answer, boolean b);
}
