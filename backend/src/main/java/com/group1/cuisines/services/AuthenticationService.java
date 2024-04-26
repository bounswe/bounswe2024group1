package com.group1.cuisines.services;

import com.group1.cuisines.dao.request.SignInRequest;
import com.group1.cuisines.dao.request.SignUpRequest;
import com.group1.cuisines.dao.response.ApiResponse;
import com.group1.cuisines.dao.response.AuthenticationTokenResponse;
import com.group1.cuisines.entities.User;
import com.group1.cuisines.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final JwtService jwtService;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public ApiResponse<AuthenticationTokenResponse> signup(SignUpRequest request) {
        if(userRepository.existsByEmailOrUsername(request.getEmail(), request.getUserName())) {
            return new ApiResponse<>(409, "Email or username already exists.", null);
        }
        User user = User.builder()
                .email(request.getEmail())
                .username(request.getUserName())
                .country(request.getCountry())
                .Bio(request.getBio())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .build();


        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return new ApiResponse<>(200, "User registered successfully.", AuthenticationTokenResponse.builder()

                .token(token)
                .build());

    }

    public ApiResponse<AuthenticationTokenResponse>  signin(SignInRequest request) {
        try{
            User user = userRepository.findByEmailOrUsername(request.getUsernameOremail(), request.getUsernameOremail())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsernameOremail(), request.getPassword()));
            String token = jwtService.generateToken(user);
            return new ApiResponse<>(200, "User logged in successfully.", AuthenticationTokenResponse.builder()

                    .token(token)
                    .build());
        } catch (Exception e) {
            return new ApiResponse<>(401, "Invalid email or password.", null);
        }
    }
}
