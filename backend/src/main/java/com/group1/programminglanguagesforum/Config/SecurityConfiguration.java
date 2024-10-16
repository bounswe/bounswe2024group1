package com.group1.programminglanguagesforum.Config;

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
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final CorsConfigurationSource corsConfigurationSource ;
    public SecurityConfiguration(CorsConfigurationSource corsConfigurationSource){
        this.corsConfigurationSource = corsConfigurationSource;
    }
    // TODO : JWT Filter will be implemented and added here
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(cors->cors.configurationSource(corsConfigurationSource))
                .authorizeHttpRequests(
                        req->req.requestMatchers("GET","/users/me").authenticated()
                                .requestMatchers("GET","/**").permitAll()
                                .requestMatchers("POST,PUT,DELETE").authenticated()
                                .anyRequest().authenticated()
                ).sessionManagement(
                session->session.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS
                )
                ).authenticationProvider(authenticationProvider())
                ;
        // TODO : jwt filter will be added before the UsernamePasswordAuthenticationFilter.class
        return httpSecurity.build();


    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    } // Password encoder
    // TODO : UserDetailsService will be implemented and imported here
    @Bean
    public AuthenticationProvider authenticationProvider() { // Authentication provider
        DaoAuthenticationProvider authProvider =
                new DaoAuthenticationProvider();
        authProvider.setPasswordEncoder(passwordEncoder());
        authProvider.setUserDetailsService(username -> null);
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception { // Authentication manager
        return config.getAuthenticationManager();
    }


}