package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Requests.CreateAnswerRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.AuthorDto;
import com.group1.programminglanguagesforum.DTOs.Responses.CreateAnswerResponseDto;
import com.group1.programminglanguagesforum.Entities.Answer;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Repositories.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final UserContextService userContextService;
    private final QuestionService questionService;

    public CreateAnswerResponseDto createAnswer(Long questionId, CreateAnswerRequestDto createAnswerRequestDto) throws UnauthorizedAccessException {
        User currentUser = userContextService.getCurrentUser();
        Question question = questionService.findById(questionId).orElseThrow();
        Answer answer = Answer.builder()
                .answerBody(createAnswerRequestDto.getContent())
                .answeredBy(currentUser)
                .question(question)
                .build();
        answerRepository.save(answer);
        return CreateAnswerResponseDto.builder()
                .id(answer.getId())
                .content(answer.getAnswerBody())
                .author(
                        AuthorDto.builder()
                                .id(currentUser.getId())
                                .username(currentUser.getUsername())
                                .reputationPoints(currentUser.getReputationPoints())
                                .name(currentUser.getFirstName() + " " + currentUser.getLastName())
                                .build()
                )
                .createdAt(answer.getCreatedAt())
                .updatedAt(answer.getUpdatedAt())
                .build();

    }

    public void deleteAnswer(Long answerId) throws UnauthorizedAccessException {
        Answer answer = answerRepository.findById(answerId).orElseThrow();
        answerRepository.delete(answer);
    }

    public CreateAnswerResponseDto updateAnswer(Long answerId, CreateAnswerRequestDto createAnswerRequestDto) {
        Answer answer = answerRepository.findById(answerId).orElseThrow();
        answer.setAnswerBody(createAnswerRequestDto.getContent());
        answerRepository.save(answer);
        return CreateAnswerResponseDto.builder()
                .id(answer.getId())
                .content(answer.getAnswerBody())
                .author(
                        AuthorDto.builder()
                                .id(answer.getAnsweredBy().getId())
                                .username(answer.getAnsweredBy().getUsername())
                                .reputationPoints(answer.getAnsweredBy().getReputationPoints())
                                .name(answer.getAnsweredBy().getFirstName() + " " + answer.getAnsweredBy().getLastName())
                                .build()
                )
                .createdAt(answer.getCreatedAt())
                .updatedAt(answer.getUpdatedAt())
                .build();
    }
}
