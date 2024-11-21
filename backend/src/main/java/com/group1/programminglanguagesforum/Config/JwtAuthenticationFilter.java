package com.group1.programminglanguagesforum.Config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.Repositories.UserRepository;
import com.group1.programminglanguagesforum.Services.CustomUserDetailsService;
import com.group1.programminglanguagesforum.Services.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final UserRepository userRepository;
    private final JwtService jwtAuthenticationService;
    private final CustomUserDetailsService customUserDetailsService;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            final String authorizationHeader = request.getHeader("Authorization");
            final String jwt;
            final String username;
            if (StringUtils.isEmpty(authorizationHeader) || !org.springframework.util.StringUtils.startsWithIgnoreCase(authorizationHeader, "Bearer ")) {
                logger.info("No JWT token found in request headers");
                System.out.println("Request: " + request.getMethod() + " " + request.getRequestURI());
                filterChain.doFilter(request, response);
                System.out.println("Response Status: " + response.getStatus());
                return;
            }
            jwt = authorizationHeader.substring(7);
            username = jwtAuthenticationService.extractUsername(jwt);
            if (StringUtils.isNotEmpty(username)) {
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

                // Authenticate the user if the token is valid
                if (jwtAuthenticationService.isTokenValid(jwt, userDetails)) {
                    SecurityContext context =
                            SecurityContextHolder.createEmptyContext();
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    context.setAuthentication(authToken);
                    SecurityContextHolder.setContext(context);
                }
            }


        } catch (ExpiredJwtException e) {
            GenericApiResponse<Void> genericApiResponse = GenericApiResponse.<Void>builder()
                    .status(HttpServletResponse.SC_UNAUTHORIZED)
                    .message("Token has expired")
                    .error(
                            ErrorResponse.builder()
                                    .errorMessage("Token has expired")
                                    .stackTrace(Arrays.toString(e.getStackTrace()))
                                    .build()
                    )
                    .build();

            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write(objectMapper.writeValueAsString(genericApiResponse));
            return;
        }
        catch (JwtException | UsernameNotFoundException e) {
            GenericApiResponse<Void> genericApiResponse = GenericApiResponse.<Void>builder()
                    .status(HttpServletResponse.SC_UNAUTHORIZED)
                    .message("Invalid token")
                    .error(
                            ErrorResponse.builder()
                                    .errorMessage("Invalid token")
                                    .stackTrace(Arrays.toString(e.getStackTrace()))
                                    .build()
                    )
                    .build();

            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write(objectMapper.writeValueAsString(genericApiResponse));
            return;
        }
        filterChain.doFilter(request, response);
    }
}
