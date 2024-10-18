package com.group1.programminglanguagesforum.Config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.programminglanguagesforum.Repositories.UserRepository;
import com.group1.programminglanguagesforum.Services.CustomUserDetailsService;
import com.group1.programminglanguagesforum.Services.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
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
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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
    ) throws ServletException, IOException{
        try {
            final String authorizationHeader = request.getHeader("Authorization");
            final String jwt;
            final String userEmail;
            if (StringUtils.isEmpty(authorizationHeader) || !org.springframework.util.StringUtils.startsWithIgnoreCase(authorizationHeader, "Bearer ")) {
                logger.info("No JWT token found in request headers");
                filterChain.doFilter(request, response);
                return;
            }
            jwt = authorizationHeader.substring(7);
            userEmail = jwtAuthenticationService.extractEmail(jwt);
            if (StringUtils.isNotEmpty(userEmail)) {
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(userEmail);

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
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("status", HttpServletResponse.SC_UNAUTHORIZED);
            responseData.put("message", "Token has expired");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write(objectMapper.writeValueAsString(responseData));
            return;
        }
        filterChain.doFilter(request, response);
    }
}
