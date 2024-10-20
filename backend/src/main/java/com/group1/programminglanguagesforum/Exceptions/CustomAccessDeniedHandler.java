package com.group1.programminglanguagesforum.Exceptions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException exc) throws IOException, ServletException {
        ObjectMapper objectMapper = new ObjectMapper();
        GenericApiResponse<Void> genericApiResponse = ApiResponseBuilder.buildErrorResponse(Void.class, "Unauthorized access to the resource. Please log in.", HttpServletResponse.SC_UNAUTHORIZED, ErrorResponse.builder()
                .errorMessage("Unauthorized access to the resource. Please log in.")
                .stackTrace(Arrays.toString(exc.getStackTrace()))
                .build());

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(objectMapper.writeValueAsString(genericApiResponse));
    }
}
