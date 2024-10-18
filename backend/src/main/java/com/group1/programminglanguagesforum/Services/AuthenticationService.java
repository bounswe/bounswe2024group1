package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Requests.SigninRequestDto;
import com.group1.programminglanguagesforum.DTOs.Requests.SignupRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.SigninResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.SignupResponseDto;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Repositories.UserRepository;
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
            return GenericApiResponse.<SignupResponseDto>builder()
                    .status(HttpStatus.CONFLICT.value())
                    .message("Username or email already exists")
                    .error(
                            ErrorResponse.builder()
                                    .errorMessage("Username or email already exists")
                                    .build()
                    )
                    .build();
        }
        User user = User.builder()
                .email(requestDto.getEmail())
                .username(requestDto.getUsername())
                .country(requestDto.getCountry())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .firstName(requestDto.getFirstName())
                .lastName(requestDto.getLastName())
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return GenericApiResponse.<SignupResponseDto>builder()
                .status(HttpStatus.CREATED.value())
                .message("User created successfully")
                .data(SignupResponseDto.builder().token(token).build())
                .build()
                ;

    }

    public GenericApiResponse<SigninResponseDto> signin(SigninRequestDto request) {
        Optional<User> userOptional = userRepository
                .findByUsernameOrEmail(
                        request.getUsernameOrEmail(),
                        request.getUsernameOrEmail()
                );
        if (userOptional.isEmpty()) {
            return GenericApiResponse.<SigninResponseDto>builder()
                    .status(HttpStatus.UNAUTHORIZED.value())
                    .message("Invalid email/username or password.")
                    .error(
                            ErrorResponse.builder()
                                    .errorMessage("Invalid email/username or password.")
                                    .build()
                    )
                    .build();
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
            return GenericApiResponse.<SigninResponseDto>builder()
                    .status(HttpStatus.UNAUTHORIZED.value())
                    .message("Invalid email/username or password.")
                    .error(
                            ErrorResponse.builder()
                                    .errorMessage("Invalid email/username or password.")
                                    .build()
                    )
                    .build();
        }
        String token = jwtService.generateToken(user);
        return GenericApiResponse.<SigninResponseDto>builder()
                .status(HttpStatus.OK.value())
                .message("User logged in successfully.")
                .data(
                        SigninResponseDto.builder()
                                .token(token)
                                .build()
                )
                .build();


    }
}
