package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Requests.SigninRequestDto;
import com.group1.programminglanguagesforum.DTOs.Requests.SignupRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.SigninResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.SignupResponseDto;
import com.group1.programminglanguagesforum.Entities.ExperienceLevel;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Repositories.UserRepository;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public GenericApiResponse<SignupResponseDto> signup(SignupRequestDto requestDto) {
        if (userRepository.findByUsernameOrEmail(requestDto.getUsername(), requestDto.getEmail()).isPresent()) {
            return ApiResponseBuilder.buildErrorResponse(
                    SignupResponseDto.class,
                    "Username or email already exists",
                    HttpStatus.CONFLICT.value(),
                    ErrorResponse.builder()
                            .errorMessage("Username or email already exists")
                            .build()
            );
        }
        User user = User.builder()
                .email(requestDto.getEmail())
                .username(requestDto.getUsername())
                .country(requestDto.getCountry())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .firstName(requestDto.getFirstName())
                .lastName(requestDto.getLastName())
                .experienceLevel(ExperienceLevel.fromValue(requestDto.getExperienceLevel()))
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return ApiResponseBuilder.buildSuccessResponse(
                SignupResponseDto.class,
                "User created successfully",
                HttpStatus.CREATED.value(),
                SignupResponseDto.builder()
                        .token(token)
                        .build()
        );

    }

    public GenericApiResponse<SigninResponseDto> signin(SigninRequestDto request) {
        Optional<User> userOptional = userRepository
                .findByUsernameOrEmail(
                        request.getUsernameOrEmail(),
                        request.getUsernameOrEmail()
                );
        if (userOptional.isEmpty()) {
            return ApiResponseBuilder.buildErrorResponse(
                    SigninResponseDto.class,
                    "Invalid email/username or password.",
                    HttpStatus.UNAUTHORIZED.value(),
                    ErrorResponse.builder()
                            .errorMessage("Invalid email/username or password.")
                            .build()
            );
        }
        User user = userOptional.get();
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsernameOrEmail(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            return ApiResponseBuilder.buildErrorResponse(
                    SigninResponseDto.class,
                    "Invalid email/username or password.",
                    HttpStatus.UNAUTHORIZED.value(),
                    ErrorResponse.builder()
                            .errorMessage("Invalid email/username or password.")
                            .build()
            );
        }
        String token = jwtService.generateToken(user);
        return ApiResponseBuilder.buildSuccessResponse(
                SigninResponseDto.class,
                "User logged in successfully.",
                HttpStatus.OK.value(),
                SigninResponseDto.builder()
                        .token(token)
                        .build()
        );


    }
}
