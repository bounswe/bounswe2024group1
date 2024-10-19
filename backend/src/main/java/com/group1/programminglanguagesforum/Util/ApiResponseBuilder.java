package com.group1.programminglanguagesforum.Util;

import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import lombok.Builder;

import java.lang.reflect.Type;

@Builder
public class ApiResponseBuilder {
    public static <T> GenericApiResponse<T> buildSuccessResponse(Type T, String message, int status, T data) {
        return GenericApiResponse.<T>builder()
                .status(status)
                .message(message)
                .data(data)
                .build();
    }

    public static <T> GenericApiResponse<T> buildErrorResponse(Type T, String message, int status, ErrorResponse errorResponse) {
        return GenericApiResponse.<T>builder()
                .status(status)
                .message(message)
                .error(
                        errorResponse
                )
                .build();
    }
}
