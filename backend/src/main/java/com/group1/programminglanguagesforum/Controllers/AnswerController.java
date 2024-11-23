package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.DTOs.Requests.CreateAnswerRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.CreateAnswerResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GetAnswersResponseDto;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Services.AnswerService;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class AnswerController extends BaseController {
    private final AnswerService answerService;

    @PutMapping(value= EndpointConstants.AnswerEndpoints.ANSWER_ID)
    public ResponseEntity<GenericApiResponse<CreateAnswerResponseDto>> updateAnswer(
            @PathVariable(value = "id") Long answerId,
            @RequestBody CreateAnswerRequestDto createAnswerRequestDto) throws UnauthorizedAccessException {
        CreateAnswerResponseDto response = answerService.updateAnswer(answerId, createAnswerRequestDto);
        GenericApiResponse<CreateAnswerResponseDto> apiResponse = GenericApiResponse.<CreateAnswerResponseDto>builder()
                .status(200)
                .message("Answer updated successfully")
                .data(response)
                .build();
        return buildResponse(apiResponse, HttpStatus.OK);
    }
    @PostMapping(value= EndpointConstants.QuestionEndpoints.QUESTION_ANSWERS)
    public ResponseEntity<GenericApiResponse<CreateAnswerResponseDto>> createAnswer(
            @PathVariable(value = "questionId") Long questionId,
            @RequestBody CreateAnswerRequestDto createAnswerRequestDto) throws UnauthorizedAccessException {
        CreateAnswerResponseDto response = answerService.createAnswer(questionId, createAnswerRequestDto);
        GenericApiResponse<CreateAnswerResponseDto> apiResponse = GenericApiResponse.<CreateAnswerResponseDto>builder()
                .status(201)
                .message("Answer created successfully")
                .data(response)
                .build();
        return buildResponse(apiResponse, HttpStatus.CREATED);
    }
    @DeleteMapping(value= EndpointConstants.AnswerEndpoints.ANSWER_ID)
    public ResponseEntity<GenericApiResponse<String>> deleteAnswer(@PathVariable(value = "id") Long answerId) throws UnauthorizedAccessException {
        try {
            answerService.deleteAnswer(answerId);
            GenericApiResponse<String> apiResponse = GenericApiResponse.<String>builder()
                    .status(200)
                    .message("Answer deleted successfully")
                    .data("Answer deleted successfully")
                    .build();
            return buildResponse(apiResponse, HttpStatus.OK);
        }
      catch (Exception e){
          ErrorResponse errorResponse = ErrorResponse.builder()
                  .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                  .build();
          ApiResponseBuilder.buildErrorResponse(String.class, "An error occurred", 500, errorResponse);
            return buildResponse(ApiResponseBuilder.buildErrorResponse(String.class, "An error occurred", 500, errorResponse), HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    @GetMapping(value=EndpointConstants.QuestionEndpoints.QUESTION_ANSWERS)
    public ResponseEntity<GenericApiResponse<GetAnswersResponseDto>>getAnswersForQuestion(@PathVariable(value = "questionId") Long questionId) throws UnauthorizedAccessException {
        GetAnswersResponseDto response = answerService.getAnswersForQuestion(questionId);
        GenericApiResponse<GetAnswersResponseDto> apiResponse = GenericApiResponse.<GetAnswersResponseDto>builder()
                .status(200)
                .message("Answers retrieved successfully")
                .data(response)
                .build();
        return buildResponse(apiResponse, HttpStatus.OK);
    }
}
