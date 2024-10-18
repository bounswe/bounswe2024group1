package com.group1.programminglanguagesforum.Config;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.Exceptions.CustomAccessDeniedHandler;
import com.group1.programminglanguagesforum.Exceptions.CustomAuthenticationEntryPoint;
import com.group1.programminglanguagesforum.Services.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
import org.springframework.web.cors.CorsConfigurationSource;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final CorsConfigurationSource corsConfigurationSource;
    private final JwtAuthenticationFilter JwtAuthenticationFilter;
    private final CustomUserDetailsService customUserDetailsService;
    private static final String API_BASE = "/api/v1";

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .authorizeHttpRequests(
                        req -> req.requestMatchers("GET", API_BASE + EndpointConstants.UserEndpoints.USER_ME).authenticated()
                                .requestMatchers("GET", "/**").permitAll()
                                .requestMatchers("POST", API_BASE + EndpointConstants.AuthenticationEndpoints.SIGNUP).permitAll()
                                .requestMatchers("POST", API_BASE + EndpointConstants.AuthenticationEndpoints.SIGNIN).permitAll()
                                .requestMatchers("POST,PUT,DELETE").authenticated()
                                .anyRequest().authenticated()
                )
                .sessionManagement(
                        session -> session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                ).authenticationProvider(authenticationProvider())
        ;
        httpSecurity.exceptionHandling(
                exceptionHandling -> exceptionHandling
                        .accessDeniedHandler(new CustomAccessDeniedHandler())
                        .authenticationEntryPoint(new CustomAuthenticationEntryPoint())


        );
        System.out.println("Configuring SecurityFilterChain...");


        httpSecurity.addFilterBefore(JwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();


    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    } // Password encoder

    @Bean
    public AuthenticationProvider authenticationProvider() { // Authentication provider
        DaoAuthenticationProvider authProvider =
                new DaoAuthenticationProvider();
        authProvider.setPasswordEncoder(passwordEncoder());
        authProvider.setUserDetailsService(customUserDetailsService);
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception { // Authentication manager
        return config.getAuthenticationManager();
    }


}