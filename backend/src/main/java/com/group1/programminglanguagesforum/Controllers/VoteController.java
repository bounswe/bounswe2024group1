package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.QuestionUpvoteResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.UserProfileResponseDto;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Services.VoteService;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class VoteController extends BaseController {
    private final VoteService voteService;

    @PostMapping(EndpointConstants.QuestionEndpoints.QUESTION_UPVOTE)
    public ResponseEntity<GenericApiResponse<QuestionUpvoteResponseDto>> upvoteQuestion(@PathVariable(name = "id") Long questionId) {
        try {
            QuestionUpvoteResponseDto response = voteService.upvoteQuestion(questionId);
            GenericApiResponse<QuestionUpvoteResponseDto> genericApiResponse =
                    ApiResponseBuilder.buildSuccessResponse(
                            response.getClass(),
                            "Question upvoted successfully",
                            HttpStatus.OK.value(),
                            response
                    );
            return buildResponse(genericApiResponse, HttpStatus.OK);

        } catch (UnauthorizedAccessException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<QuestionUpvoteResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                    UserProfileResponseDto.class,
                    e.getMessage(),
                    HttpStatus.UNAUTHORIZED.value(),
                    errorResponse
            );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));

        } catch (NoSuchElementException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<QuestionUpvoteResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                    UserProfileResponseDto.class,
                    e.getMessage(),
                    HttpStatus.NOT_FOUND.value(),
                    errorResponse
            );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
        }
    }
}
