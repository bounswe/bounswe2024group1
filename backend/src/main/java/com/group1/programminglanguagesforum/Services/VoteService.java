package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Responses.QuestionDeleteDownvoteResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.QuestionDeleteUpvoteResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.QuestionDownvoteResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.QuestionUpvoteResponseDto;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Entities.Vote;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Repositories.QuestionRepository;
import com.group1.programminglanguagesforum.Repositories.VoteRepository;
import lombok.RequiredArgsConstructor;

import java.util.NoSuchElementException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VoteService {
        private final VoteRepository voteRepository;
        private final UserContextService userContextService;
        private final QuestionRepository questionRepository;

        public QuestionUpvoteResponseDto upvoteQuestion(Long questionId) throws UnauthorizedAccessException {
                User user = userContextService.getCurrentUser();
                Vote vote = new Vote();
                Question question = questionRepository.findById(questionId).orElseThrow();
                question.setLikeCount(question.getLikeCount()+1);
                vote.setQuestion(question);
                vote.setUser(user);
                vote.setUpvote(true);
                voteRepository.save(vote);
                return QuestionUpvoteResponseDto.builder()
                                .questionId(questionId)
                                .upvoteCount(question.getUpvoteCount())
                                .build();
        }

        public QuestionDownvoteResponseDto downvoteQuestion(Long questionId) throws UnauthorizedAccessException {
                User user = userContextService.getCurrentUser();
                Vote vote = new Vote();
                Question question = questionRepository.findById(questionId).orElseThrow();
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

}
