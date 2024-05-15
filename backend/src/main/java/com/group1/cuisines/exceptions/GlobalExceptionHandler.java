package com.group1.cuisines.exceptions;

import com.group1.cuisines.dao.response.ApiResponse;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleException(Exception e) {
        ApiResponse<String> response = new ApiResponse<>(500, "An unexpected error occurred: " + e.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<String>> handleResourceNotFoundException(ResourceNotFoundException e) {
        ApiResponse<String> response = new ApiResponse<>(400, e.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }


}