package com.group1.cuisines.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.cuisines.dao.response.ErrorResponse;
import com.group1.cuisines.entities.User;
import com.group1.cuisines.repositories.UserRepository;
import com.group1.cuisines.services.JwtService;
import com.group1.cuisines.services.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final ObjectMapper objectMapper;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            final String authHeader = request.getHeader("Authorization");
            final String jwt;
            final String userEmail;

            if (
                    StringUtils.isEmpty(authHeader) ||
                            !org.springframework.util.StringUtils.startsWithIgnoreCase(
                                    authHeader,
                                    "Bearer "
                            )
            ) {
                logger.info("No JWT token found in request headers");
                filterChain.doFilter(request, response);
                return;
            }
            jwt = authHeader.substring(7);
            userEmail = jwtService.extractUsername(jwt);
            if (
                    StringUtils.isNotEmpty(userEmail) &&
                            SecurityContextHolder.getContext().getAuthentication() == null
            ) {
                UserDetails userDetails = userDetailsService().loadUserByUsername(userEmail);
                if (jwtService.isTokenValid(jwt, userDetails)) {
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
        }
        catch (ExpiredJwtException e ){
            logger.info("JWT token has expired");
            ErrorResponse errorResponse = new ErrorResponse(HttpServletResponse.SC_UNAUTHORIZED, "JWT token has expired");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
            return;

        }
        filterChain.doFilter(request, response);
    }

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {

            @Override
            public UserDetails loadUserByUsername(String usernameOrEmail) {
                logger.debug("Attempting to find user by email or username: {}", usernameOrEmail);

                User user = userRepository.findByEmailOrUsername(usernameOrEmail, usernameOrEmail)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found with username or email : " + usernameOrEmail));

                return user;
            }

        };
    }
}
