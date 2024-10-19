package com.group1.programminglanguagesforum.Exceptions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        ObjectMapper objectMapper = new ObjectMapper();
        GenericApiResponse<Void> genericApiResponse = GenericApiResponse.<Void>builder()
                .status(HttpServletResponse.SC_UNAUTHORIZED)
                .message("Unauthorized access. Please log in.")
                .error(
                        ErrorResponse.builder()
                                .errorMessage("Unauthorized access. Please log in.")
                                .stackTrace(authException.getMessage())
                                .build()
                )
                .build();

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(objectMapper.writeValueAsString(genericApiResponse));
    }
}
