package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.DTOs.Responses.BookmarkQuestionResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Services.BookmarkService;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
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
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<BookmarkQuestionResponseDto> genericApiResponse = ApiResponseBuilder.buildErrorResponse(
                    BookmarkQuestionResponseDto.class,
                    "An error occurred while bookmarking the question",
                    HttpStatus.NOT_FOUND.value(),
                    errorResponse
            );
            return buildResponse(genericApiResponse, HttpStatus.NOT_FOUND);
        } catch (UnauthorizedAccessException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<BookmarkQuestionResponseDto> response = ApiResponseBuilder
                    .buildErrorResponse(BookmarkQuestionResponseDto.class, e.getMessage(), 401, errorResponse);
            return buildResponse(response, HttpStatus.UNAUTHORIZED);

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
        }
        catch (NoSuchElementException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<BookmarkQuestionResponseDto> genericApiResponse = ApiResponseBuilder.buildErrorResponse(
                    BookmarkQuestionResponseDto.class,
                    "An error occurred while deleting the bookmark",
                    HttpStatus.NOT_FOUND.value(),
                    errorResponse
            );
            return buildResponse(genericApiResponse, HttpStatus.NOT_FOUND);
        } catch (UnauthorizedAccessException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<BookmarkQuestionResponseDto> response = ApiResponseBuilder
                    .buildErrorResponse(BookmarkQuestionResponseDto.class, e.getMessage(), 401, errorResponse);
            return buildResponse(response, HttpStatus.UNAUTHORIZED);
        }
    }
}
