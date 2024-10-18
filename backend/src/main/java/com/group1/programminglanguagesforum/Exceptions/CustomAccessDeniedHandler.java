package com.group1.programminglanguagesforum.Exceptions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
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
        System.out.println("Access Denied: " + exc.getMessage());
        GenericApiResponse<Void> genericApiResponse = GenericApiResponse.<Void>builder()
                .status(HttpServletResponse.SC_UNAUTHORIZED)
                .message("Unauthorized access to the resource. Please log in.")
                .error(
                        ErrorResponse.builder()
                                .errorMessage("Unauthorized access to the resource. Please log in.")
                                .stackTrace(Arrays.toString(exc.getStackTrace()))
                                .build()
                )
                .build();

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(objectMapper.writeValueAsString(genericApiResponse));
    }
}
