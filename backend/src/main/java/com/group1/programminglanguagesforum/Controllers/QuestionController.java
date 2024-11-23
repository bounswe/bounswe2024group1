package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.DTOs.Requests.CreateQuestionRequestDto;
import com.group1.programminglanguagesforum.DTOs.Requests.UpdateQuestionRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.CreateQuestionResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.Exceptions.ExceptionResponseHandler;
import com.group1.programminglanguagesforum.DTOs.Responses.GetQuestionDetailsResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.QuestionSummaryDto;
import com.group1.programminglanguagesforum.Entities.DifficultyLevel;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Services.QuestionService;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class QuestionController extends BaseController {
    private final QuestionService questionService;

    @PostMapping(value = EndpointConstants.QuestionEndpoints.BASE_PATH)
    public ResponseEntity<GenericApiResponse<CreateQuestionResponseDto>> createQuestion(
            @RequestBody CreateQuestionRequestDto dto) {
        try {
            GenericApiResponse<CreateQuestionResponseDto> response = ApiResponseBuilder.buildSuccessResponse(
                    CreateQuestionResponseDto.class, "Question created successfully", 200,
                    questionService.createQuestion(dto));
            return buildResponse(response, org.springframework.http.HttpStatus.OK);
        } catch (UnauthorizedAccessException e) {
            return ExceptionResponseHandler.UnauthorizedAccessException(e);
        }
    }

    @GetMapping(value = EndpointConstants.QuestionEndpoints.QUESTION_ID)
    public ResponseEntity<GenericApiResponse<GetQuestionDetailsResponseDto>> getQuestion(
            @PathVariable(value = "id") Long id) {
        try {
            GenericApiResponse<GetQuestionDetailsResponseDto> response = ApiResponseBuilder.buildSuccessResponse(
                    GetQuestionDetailsResponseDto.class, "Question created successfully", 200,
                    questionService.getQuestion(id));
            return buildResponse(response, org.springframework.http.HttpStatus.OK);

        } catch (UnauthorizedAccessException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<GetQuestionDetailsResponseDto> response = ApiResponseBuilder
                    .buildErrorResponse(GetQuestionDetailsResponseDto.class, e.getMessage(), 401, errorResponse);
            return buildResponse(response, org.springframework.http.HttpStatus.UNAUTHORIZED);

        }
    }

    @DeleteMapping(value = EndpointConstants.QuestionEndpoints.QUESTION_ID)
    public ResponseEntity<GenericApiResponse<String>> deleteQuestion(@PathVariable(value = "id") Long id) {
        try {

            GenericApiResponse<String> response = ApiResponseBuilder.buildSuccessResponse(String.class,
                    "Question deleted successfully", 200, questionService.deleteQuestion(id));
            return buildResponse(response, org.springframework.http.HttpStatus.OK);
        } catch (NoSuchElementException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<String> response = ApiResponseBuilder.buildErrorResponse(String.class, e.getMessage(),
                    404, errorResponse);
            return buildResponse(response, org.springframework.http.HttpStatus.NOT_FOUND);
        }

    }

    @PutMapping(value = EndpointConstants.QuestionEndpoints.QUESTION_ID)
    public ResponseEntity<GenericApiResponse<CreateQuestionResponseDto>> updateQuestion(
            @PathVariable(value = "id") Long id, @RequestBody UpdateQuestionRequestDto dto) {
        try {
            GenericApiResponse<CreateQuestionResponseDto> response = ApiResponseBuilder.buildSuccessResponse(
                    CreateQuestionResponseDto.class, "Question updated successfully", 200,
                    questionService.updateQuestion(id, dto));
            return buildResponse(response, org.springframework.http.HttpStatus.OK);
        } catch (NoSuchElementException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<CreateQuestionResponseDto> response = ApiResponseBuilder
                    .buildErrorResponse(CreateQuestionResponseDto.class, e.getMessage(), 404, errorResponse);
            return buildResponse(response, org.springframework.http.HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = EndpointConstants.SearchEndpoints.SEARCH_QUESTIONS)
    public ResponseEntity<GenericApiResponse<Map<String, Object>>> searchQuestions(
            @RequestParam("q") String query,
            @RequestParam(required = false) String tags,
            @RequestParam(required = false) DifficultyLevel difficulty,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize) {

        Page<Question> questionPage = questionService.searchQuestions(query, tags, difficulty, page, pageSize);

        List<QuestionSummaryDto> questionSummaries = questionPage.getContent().stream()
                .map(questionService::mapToQuestionSummary)
                .toList();

        Map<String, Object> response = new HashMap<>();
        response.put("items", questionSummaries);
        response.put("totalItems", questionPage.getTotalElements());
        response.put("currentPage", page);
        response.put("totalPages", questionPage.getTotalPages());

        return buildResponse(
                ApiResponseBuilder.buildSuccessResponse(
                        Map.class,
                        "Questions retrieved successfully",
                        HttpStatus.OK.value(),
                        response),
                HttpStatus.OK);
    }

}
