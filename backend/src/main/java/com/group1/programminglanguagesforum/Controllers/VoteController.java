package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.DTOs.Responses.*;
import com.group1.programminglanguagesforum.Exceptions.ExceptionResponseHandler;
import com.group1.programminglanguagesforum.Exceptions.QuestionAlreadyVotedException;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Services.VoteService;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        catch (QuestionAlreadyVotedException e){
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<QuestionUpvoteResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                    UserProfileResponseDto.class,
                    e.getMessage(),
                    HttpStatus.BAD_REQUEST.value(),
                    errorResponse
            );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
        }
    }

    @PostMapping (EndpointConstants.QuestionEndpoints.QUESTION_DOWNVOTE)
    public  ResponseEntity<GenericApiResponse<QuestionDownvoteResponseDto>> downvoteQuestion(@PathVariable(name = "id") Long questionId) {
        try {
            QuestionDownvoteResponseDto response = voteService.downvoteQuestion(questionId);
            GenericApiResponse<QuestionDownvoteResponseDto> genericApiResponse =
                    ApiResponseBuilder.buildSuccessResponse(
                            response.getClass(),
                            "Question downvoted successfully",
                            HttpStatus.OK.value(),
                            response
                    );
            return buildResponse(genericApiResponse, HttpStatus.OK);

        } catch (UnauthorizedAccessException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<QuestionDownvoteResponseDto> response = ApiResponseBuilder.buildErrorResponse(
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
            GenericApiResponse<QuestionDownvoteResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                    UserProfileResponseDto.class,
                    e.getMessage(),
                    HttpStatus.NOT_FOUND.value(),
                    errorResponse
            );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
        }
        catch (QuestionAlreadyVotedException e){
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<QuestionDownvoteResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                    UserProfileResponseDto.class,
                    e.getMessage(),
                    HttpStatus.BAD_REQUEST.value(),
                    errorResponse
            );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
        }
    }

    @DeleteMapping(EndpointConstants.QuestionEndpoints.QUESTION_DELETE_UPVOTE)
    public ResponseEntity<GenericApiResponse<QuestionDeleteUpvoteResponseDto>> removeUpvote(@PathVariable(name = "id") Long questionId) {
        try {
            QuestionDeleteUpvoteResponseDto response = voteService.removeUpvote(questionId);
            GenericApiResponse<QuestionDeleteUpvoteResponseDto> genericApiResponse =
                    ApiResponseBuilder.buildSuccessResponse(
                            response.getClass(),
                            "Question upvote removed successfully",
                            HttpStatus.OK.value(),
                            response
                    );
            return buildResponse(genericApiResponse, HttpStatus.OK);

        } catch (UnauthorizedAccessException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<QuestionDeleteUpvoteResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                    QuestionDeleteUpvoteResponseDto.class,
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
            GenericApiResponse<QuestionDeleteUpvoteResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                    QuestionDeleteUpvoteResponseDto.class,
                    e.getMessage(),
                    HttpStatus.NOT_FOUND.value(),
                    errorResponse
            );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
        }
    }

    @DeleteMapping(EndpointConstants.QuestionEndpoints.QUESTION_DELETE_DOWNVOTE)
    public ResponseEntity<GenericApiResponse<QuestionDeleteDownvoteResponseDto>> removeDownvote(@PathVariable(name = "id") Long questionId) {
        try {
            QuestionDeleteDownvoteResponseDto response = voteService.removeDownvote(questionId);
            GenericApiResponse<QuestionDeleteDownvoteResponseDto> genericApiResponse =
                    ApiResponseBuilder.buildSuccessResponse(
                            response.getClass(),
                            "Question downvote removed successfully",
                            HttpStatus.OK.value(),
                            response
                    );
            return buildResponse(genericApiResponse, HttpStatus.OK);

        } catch (UnauthorizedAccessException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<QuestionDeleteDownvoteResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                    QuestionDeleteDownvoteResponseDto.class,
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
            GenericApiResponse<QuestionDeleteDownvoteResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                    QuestionDeleteDownvoteResponseDto.class,
                    e.getMessage(),
                    HttpStatus.NOT_FOUND.value(),
                    errorResponse
            );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
        }
    }

    @PostMapping(EndpointConstants.AnswerEndpoints.ANSWER_UPVOTE)
    public ResponseEntity<GenericApiResponse<AnswerVoteResponseDTO>> upvoteAnswer(@PathVariable(name = "id") Long answerId) {
        try {
            AnswerVoteResponseDTO response = voteService.upvoteAnswer(answerId);
            GenericApiResponse<AnswerVoteResponseDTO> genericApiResponse =
                    ApiResponseBuilder.buildSuccessResponse(
                            response.getClass(),
                            "Answer upvoted successfully",
                            HttpStatus.OK.value(),
                            response
                    );
            return buildResponse(genericApiResponse, HttpStatus.OK);

        } catch (UnauthorizedAccessException e) {
            return ExceptionResponseHandler.UnauthorizedAccessException(e);
        } catch (Exception e) {
            return ExceptionResponseHandler.Exception(e);
        }
    }

    @PostMapping(EndpointConstants.AnswerEndpoints.ANSWER_DOWNVOTE)
    public ResponseEntity<GenericApiResponse<AnswerVoteResponseDTO>> downvoteAnswer(@PathVariable(name = "id") Long answerId) {
        try {
            AnswerVoteResponseDTO response = voteService.downvoteAnswer(answerId);
            GenericApiResponse<AnswerVoteResponseDTO> genericApiResponse =
                    ApiResponseBuilder.buildSuccessResponse(
                            response.getClass(),
                            "Answer downvoted successfully",
                            HttpStatus.OK.value(),
                            response
                    );
            return buildResponse(genericApiResponse, HttpStatus.OK);

        } catch (UnauthorizedAccessException e) {
            return ExceptionResponseHandler.UnauthorizedAccessException(e);
        } catch (Exception e) {
            return ExceptionResponseHandler.Exception(e);
        }
    }

}
