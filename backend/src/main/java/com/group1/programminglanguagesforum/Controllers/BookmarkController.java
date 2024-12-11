package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.DTOs.Responses.BookmarkQuestionResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.QuestionSummaryDto;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Exceptions.ExceptionResponseHandler;
import com.group1.programminglanguagesforum.Services.BookmarkService;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;

import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;

@RequestMapping("api/v1")
@RestController
@RequiredArgsConstructor
public class BookmarkController extends BaseController {
    private final BookmarkService bookmarkService;

    @PostMapping(value = EndpointConstants.BookmarkEndpoints.BASE_PATH)
    public ResponseEntity<GenericApiResponse<BookmarkQuestionResponseDto>> bookmarkQuestion(@PathVariable Long questionId) {
        try {
            BookmarkQuestionResponseDto bookmarkQuestionResponseDto = bookmarkService.bookmarkQuestion(questionId);
            GenericApiResponse<BookmarkQuestionResponseDto> genericApiResponse = ApiResponseBuilder.buildSuccessResponse(
                    BookmarkQuestionResponseDto.class,
                    "Question bookmarked successfully",
                    200,
                    bookmarkQuestionResponseDto
            );
            return buildResponse(genericApiResponse, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return ExceptionResponseHandler.NoSuchElementException(e);
        } catch (UnauthorizedAccessException e) {
            return ExceptionResponseHandler.UnauthorizedAccessException(e);
        } catch (EntityExistsException e) {
            return ExceptionResponseHandler.EntityExistsException(e);
        }
    }

    @DeleteMapping(value = EndpointConstants.BookmarkEndpoints.BOOKMARK_DELETE)
    public ResponseEntity<GenericApiResponse<BookmarkQuestionResponseDto>> removeBookmark(@PathVariable Long questionId) {
        try {
            BookmarkQuestionResponseDto bookmarkQuestionResponseDto = bookmarkService.removeBookmark(questionId);
            GenericApiResponse<BookmarkQuestionResponseDto> genericApiResponse = ApiResponseBuilder.buildSuccessResponse(
                    BookmarkQuestionResponseDto.class,
                    "Question bookmark deleted successfully",
                    200,
                    bookmarkQuestionResponseDto
            );
            return buildResponse(genericApiResponse, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return ExceptionResponseHandler.NoSuchElementException(e);
        } catch (UnauthorizedAccessException e) {
            return ExceptionResponseHandler.UnauthorizedAccessException(e);
        }
    }

    @GetMapping(value = EndpointConstants.BookmarkEndpoints.BOOKMARK_GET)
    public ResponseEntity<GenericApiResponse<List<QuestionSummaryDto>>> getBookmarkedQuestions() {
        try {
            List<QuestionSummaryDto> bookmarkedQuestions = bookmarkService.getBookmarkedQuestions();
            GenericApiResponse<List<QuestionSummaryDto>> genericApiResponse = ApiResponseBuilder.buildSuccessResponse(
                    QuestionSummaryDto.class,
                    "Bookmarked questions retrieved successfully",
                    200,
                    bookmarkedQuestions
            );
            return buildResponse(genericApiResponse, HttpStatus.OK);
        } catch (UnauthorizedAccessException e) {
            return ExceptionResponseHandler.UnauthorizedAccessException(e);
        } 
    }
    
}
