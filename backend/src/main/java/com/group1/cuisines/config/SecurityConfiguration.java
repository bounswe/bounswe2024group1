package com.group1.cuisines.config;

import com.group1.cuisines.services.JwtService;
import com.group1.cuisines.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
        throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable) // Disable CSRF
            .authorizeHttpRequests(request ->
                request
                    .requestMatchers("/api/v1/auth/**")
                    .permitAll() // Permit all requests to "/api/v1/auth"
                        .requestMatchers("/api/v2/test").authenticated()
                    .requestMatchers(("GET"), "/**")
                    .permitAll() // Permit all GET requests
                    .requestMatchers("/api/v1/admin/**")
                    .hasRole("ADMIN") // Require ADMIN role for "/api/v1/resources"
                        .requestMatchers(HttpMethod.POST,"/**")
                    .authenticated()
                        .requestMatchers("/feed?type=following").authenticated()
                        .requestMatchers(HttpMethod.DELETE,"/**").authenticated()) // Require authentication for all other requests
            .sessionManagement(
                manager ->
                    manager.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS
                    )
            ) // Set session creation policy to STATELESS
            .authenticationProvider(authenticationProvider()); // Set authentication provider
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    } // Password encoder

    @Bean
    public AuthenticationProvider authenticationProvider() { // Authentication provider
        DaoAuthenticationProvider authProvider =
            new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(jwtAuthenticationFilter.userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
        AuthenticationConfiguration config
    ) throws Exception { // Authentication manager
        return config.getAuthenticationManager();
    }
}
