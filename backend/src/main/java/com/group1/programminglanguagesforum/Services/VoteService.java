package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Responses.AnswerVoteResponseDTO;
import com.group1.programminglanguagesforum.DTOs.Responses.QuestionDeleteDownvoteResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.QuestionDeleteUpvoteResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.QuestionDownvoteResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.QuestionUpvoteResponseDto;
import com.group1.programminglanguagesforum.Entities.Answer;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Entities.Vote;
import com.group1.programminglanguagesforum.Exceptions.QuestionAlreadyVotedException;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Repositories.AnswerRepository;
import com.group1.programminglanguagesforum.Repositories.QuestionRepository;
import com.group1.programminglanguagesforum.Repositories.VoteRepository;
import lombok.RequiredArgsConstructor;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VoteService {
    private final VoteRepository voteRepository;
    private final UserContextService userContextService;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    public QuestionUpvoteResponseDto upvoteQuestion(Long questionId) throws UnauthorizedAccessException, QuestionAlreadyVotedException {
        User user = userContextService.getCurrentUser();
        Vote vote = new Vote();
        Question question = questionRepository.findById(questionId).orElseThrow();
        Optional<Vote> existingVote = voteRepository.findByUserAndQuestionAndIsUpvote(user, question, true);
        Optional<Vote> existingDownvote = voteRepository.findByUserAndQuestionAndIsUpvote(user, question, false);
        if (existingVote.isPresent()) {
            voteRepository.delete(existingVote.get());
            question.setLikeCount(question.getUpvoteCount());
            throw new QuestionAlreadyVotedException("Question already upvoted");
        }
        existingDownvote.ifPresent(voteRepository::delete);
        question.setLikeCount(question.getLikeCount() + 1);
        vote.setQuestion(question);
        vote.setUser(user);
        vote.setUpvote(true);
        voteRepository.save(vote);

        return QuestionUpvoteResponseDto.builder()
                .questionId(questionId)
                .upvoteCount(question.getUpvoteCount())
                .build();
    }

    public QuestionDownvoteResponseDto downvoteQuestion(Long questionId) throws UnauthorizedAccessException, QuestionAlreadyVotedException {
        User user = userContextService.getCurrentUser();
        Vote vote = new Vote();
        Question question = questionRepository.findById(questionId).orElseThrow();
        Optional<Vote> existingVote = voteRepository.findByUserAndQuestionAndIsUpvote(user, question, false);
        Optional<Vote> existingUpvote = voteRepository.findByUserAndQuestionAndIsUpvote(user, question, true);
        if (existingVote.isPresent()) {
            voteRepository.delete(existingVote.get());
            question.setLikeCount(question.getUpvoteCount());
            throw new QuestionAlreadyVotedException("Question already downvoted");
        }
        existingUpvote.ifPresent(voteRepository::delete);
        vote.setQuestion(question);
        vote.setUser(user);
        vote.setUpvote(false);
        voteRepository.save(vote);
        return QuestionDownvoteResponseDto.builder()
                .questionId(questionId)
                .downvoteCount(question.getDownvoteCount())
                .build();
    }

    public QuestionDeleteUpvoteResponseDto removeUpvote(Long questionId) throws UnauthorizedAccessException {
        User user = userContextService.getCurrentUser();
        Question question = questionRepository.findById(questionId).orElseThrow();

        Vote vote = voteRepository.findByUserAndQuestionAndIsUpvote(user, question, true)
                .orElseThrow(NoSuchElementException::new);
        voteRepository.delete(vote);

        return QuestionDeleteUpvoteResponseDto.builder()
                .questionId(questionId)
                .upvoteCount(question.getUpvoteCount())
                .downvoteCount(question.getDownvoteCount())
                .build();
    }

    public QuestionDeleteDownvoteResponseDto removeDownvote(Long questionId) throws UnauthorizedAccessException {
        User user = userContextService.getCurrentUser();
        Question question = questionRepository.findById(questionId).orElseThrow();

        Vote vote = voteRepository.findByUserAndQuestionAndIsUpvote(user, question, true)
                .orElseThrow(NoSuchElementException::new);
        voteRepository.delete(vote);

        return QuestionDeleteDownvoteResponseDto.builder()
                .questionId(questionId)
                .upvoteCount(question.getUpvoteCount())
                .downvoteCount(question.getDownvoteCount())
                .build();
    }

    public AnswerVoteResponseDTO upvoteAnswer(Long answerId) throws Exception {
        User user = userContextService.getCurrentUser();
        Answer answer = answerRepository.findById(answerId).orElseThrow();
        Optional<Vote> existingVote = voteRepository.findByUserAndAnswerAndIsUpvote(user, answer, true);
        Optional<Vote> existingDownvote = voteRepository.findByUserAndAnswerAndIsUpvote(user, answer, false);


        if (existingVote.isPresent()) {
            throw new Exception("User has already upvoted this answer");
        }
        existingDownvote.ifPresent(voteRepository::delete);

        answer.setLikeCount(answer.getLikeCount() + 1);

        Vote vote = new Vote();
        vote.setAnswer(answer);
        vote.setUser(user);
        vote.setUpvote(true);
        voteRepository.save(vote);

        return AnswerVoteResponseDTO.builder()
                .answerId(answerId)
                .upvoteCount(answer.getUpvoteCount())
                .downvoteCount(answer.getDownvoteCount())
                .build();
    }

    public AnswerVoteResponseDTO downvoteAnswer(Long answerId) throws Exception {
        User user = userContextService.getCurrentUser();
        Answer answer = answerRepository.findById(answerId).orElseThrow();
        Optional<Vote> existingVote = voteRepository.findByUserAndAnswerAndIsUpvote(user, answer, false);
        Optional<Vote> existingUpvote = voteRepository.findByUserAndAnswerAndIsUpvote(user, answer, true);

        if (existingVote.isPresent()) {
            throw new Exception("User has already downvoted this answer");
        }
        existingUpvote.ifPresent(voteRepository::delete);

        answer.setDislikeCount(answer.getDislikeCount() + 1);

        Vote vote = new Vote();
        vote.setAnswer(answer);
        vote.setUser(user);
        vote.setUpvote(false);
        voteRepository.save(vote);

        return AnswerVoteResponseDTO.builder()
                .answerId(answerId)
                .upvoteCount(answer.getUpvoteCount())
                .downvoteCount(answer.getDownvoteCount())
                .build();
    }

}
