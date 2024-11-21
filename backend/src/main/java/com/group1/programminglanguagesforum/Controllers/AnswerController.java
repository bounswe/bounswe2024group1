package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.DTOs.Requests.CreateAnswerRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.CreateAnswerResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Services.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class AnswerController extends BaseController {
    private final AnswerService answerService;
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

}
