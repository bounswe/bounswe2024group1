package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Responses.QuestionRateResponseDto;
import com.group1.programminglanguagesforum.Entities.DifficultyLevel;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.QuestionDifficultyRate;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Repositories.QuestionDifficultyRateRepository;
import com.group1.programminglanguagesforum.Repositories.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionDifficultyRateService {
    private final QuestionDifficultyRateRepository questionDifficultyRateRepository;
    private final UserContextService userContextService;
    private final QuestionRepository questionRepository;


    public QuestionRateResponseDto rateQuestion(Long id, DifficultyLevel difficultyLevel) throws UnauthorizedAccessException {
       Question question = questionRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Question not found"));
        User user = userContextService.getCurrentUser();
        Optional<QuestionDifficultyRate> questionDifficultyRateOptional = getQuestionDifficultyRate(question, user);
        QuestionDifficultyRate questionDifficultyRate = questionDifficultyRateOptional.orElseGet(() -> {
            QuestionDifficultyRate newQuestionDifficultyRate = new QuestionDifficultyRate();
            newQuestionDifficultyRate.setQuestion(question);
            newQuestionDifficultyRate.setUser(user);
            return newQuestionDifficultyRate;
        });
        questionDifficultyRate.setDifficulty(difficultyLevel);
        questionDifficultyRateRepository.save(questionDifficultyRate);
        QuestionRateCounts result = getResult();
        return QuestionRateResponseDto.builder()
                .questionId(id)
                .easyCount(result.easyCount())
                .mediumCount(result.mediumCount())
                .hardCount(result.hardCount())
                .totalCount(result.easyCount() + result.mediumCount() + result.hardCount())
                .build();



    }

    public Optional<QuestionDifficultyRate> getQuestionDifficultyRate(Question question, User user) {
        return questionDifficultyRateRepository.findByQuestionAndUser(question, user);
    }

    @NonNull
    public QuestionRateCounts getResult() {
        long easyCount = questionDifficultyRateRepository.countByDifficulty(DifficultyLevel.EASY);
        long mediumCount = questionDifficultyRateRepository.countByDifficulty(DifficultyLevel.MEDIUM);
        long hardCount = questionDifficultyRateRepository.countByDifficulty(DifficultyLevel.HARD);
        return new QuestionRateCounts(easyCount, mediumCount, hardCount);
    }

    public record QuestionRateCounts(long easyCount, long mediumCount, long hardCount) {
    }
}
