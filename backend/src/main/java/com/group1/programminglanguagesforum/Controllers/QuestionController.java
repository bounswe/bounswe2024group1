package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.DTOs.Requests.CreateQuestionRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.CreateQuestionResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GetQuestionDetailsResponseDto;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Services.QuestionService;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class QuestionController extends BaseController {
    private final QuestionService questionService;

    @PostMapping(value = EndpointConstants.QuestionEndpoints.BASE_PATH)
    public ResponseEntity<GenericApiResponse<CreateQuestionResponseDto>> createQuestion(@RequestBody CreateQuestionRequestDto dto) {
        try {
            GenericApiResponse<CreateQuestionResponseDto> response = ApiResponseBuilder.buildSuccessResponse(CreateQuestionResponseDto.class, "Question created successfully", 200, questionService.createQuestion(dto));
            return buildResponse(response, org.springframework.http.HttpStatus.OK);
        } catch (UnauthorizedAccessException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<CreateQuestionResponseDto> response = ApiResponseBuilder.buildErrorResponse(CreateQuestionResponseDto.class, e.getMessage(), 401, errorResponse);
            return buildResponse(response, org.springframework.http.HttpStatus.UNAUTHORIZED);

        }
    }
    @GetMapping(value = EndpointConstants.QuestionEndpoints.QUESTION_ID)
    public ResponseEntity<GenericApiResponse<GetQuestionDetailsResponseDto>> getQuestion(@PathVariable(value = "id") Long id) {
        try {
            GenericApiResponse<GetQuestionDetailsResponseDto> response = ApiResponseBuilder.buildSuccessResponse(GetQuestionDetailsResponseDto.class, "Question created successfully", 200, questionService.getQuestion(id));
            return buildResponse(response, org.springframework.http.HttpStatus.OK);

        } catch (UnauthorizedAccessException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<GetQuestionDetailsResponseDto> response = ApiResponseBuilder.buildErrorResponse(GetQuestionDetailsResponseDto.class, e.getMessage(), 401, errorResponse);
            return buildResponse(response, org.springframework.http.HttpStatus.UNAUTHORIZED);

        }
    }











}
