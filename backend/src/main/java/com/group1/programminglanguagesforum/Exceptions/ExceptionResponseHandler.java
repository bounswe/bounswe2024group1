package com.group1.programminglanguagesforum.Exceptions;

import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.UserProfileResponseDto;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;

import jakarta.persistence.EntityExistsException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.NoSuchElementException;

public class ExceptionResponseHandler {

    public static <T> ResponseEntity<GenericApiResponse<T>> Exception(Exception e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .errorMessage(e.getMessage())
                .stackTrace(Arrays.toString(e.getStackTrace()))
                .build();

        GenericApiResponse<T> response = ApiResponseBuilder.buildErrorResponse(
                UserProfileResponseDto.class,
                e.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                errorResponse
        );

        return new ResponseEntity<>(
                response,
                HttpStatus.valueOf(response.getStatus())
        );
    }

    public static <T> ResponseEntity<GenericApiResponse<T>> UnauthorizedAccessException(UnauthorizedAccessException e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .errorMessage(e.getMessage())
                .stackTrace(Arrays.toString(e.getStackTrace()))
                .build();

        GenericApiResponse<T> response = ApiResponseBuilder.buildErrorResponse(
                UserProfileResponseDto.class,
                e.getMessage(),
                HttpStatus.UNAUTHORIZED.value(),
                errorResponse
        );

        return new ResponseEntity<>(
                response,
                HttpStatus.valueOf(response.getStatus())
        );
    }

    public static <T> ResponseEntity<GenericApiResponse<T>> UserNotFoundException(UserNotFoundException e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .errorMessage(e.getMessage())
                .stackTrace(Arrays.toString(e.getStackTrace()))
                .build();

        GenericApiResponse<T> response = ApiResponseBuilder.buildErrorResponse(
                UserProfileResponseDto.class,
                e.getMessage(),
                HttpStatus.NOT_FOUND.value(),
                errorResponse
        );

        return new ResponseEntity<>(
                response,
                HttpStatus.valueOf(response.getStatus())
        );
    }

    public static <T> ResponseEntity<GenericApiResponse<T>> NoSuchElementException(NoSuchElementException e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .errorMessage(e.getMessage())
                .stackTrace(Arrays.toString(e.getStackTrace()))
                .build();

        GenericApiResponse<T> response = ApiResponseBuilder.buildErrorResponse(
                UserProfileResponseDto.class,
                e.getMessage(),
                HttpStatus.NOT_FOUND.value(),
                errorResponse
        );

        return new ResponseEntity<>(
                response,
                HttpStatus.valueOf(response.getStatus())
        );

    }

    public static <T> ResponseEntity<GenericApiResponse<T>> IllegalArgumentException(IllegalArgumentException e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .errorMessage(e.getMessage())
                .stackTrace(Arrays.toString(e.getStackTrace()))
                .build();

        GenericApiResponse<T> response = ApiResponseBuilder.buildErrorResponse(
                UserProfileResponseDto.class,
                e.getMessage(),
                HttpStatus.BAD_REQUEST.value(),
                errorResponse
        );

        return new ResponseEntity<>(
                response,
                HttpStatus.valueOf(response.getStatus())
        );
    }

    public static <T> ResponseEntity<GenericApiResponse<T>> EntityExistsException(EntityExistsException e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .errorMessage(e.getMessage())
                .stackTrace(Arrays.toString(e.getStackTrace()))
                .build();

        GenericApiResponse<T> response = ApiResponseBuilder.buildErrorResponse(
                UserProfileResponseDto.class,
                e.getMessage(),
                HttpStatus.BAD_REQUEST.value(),
                errorResponse
        );

        return new ResponseEntity<>(
                response,
                HttpStatus.valueOf(response.getStatus())
        );
    }
    
}
