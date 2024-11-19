package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Requests.SigninRequestDto;
import com.group1.programminglanguagesforum.DTOs.Requests.SignupRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.SigninResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.SignupResponseDto;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Repositories.UserRepository;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void signup_ShouldReturnSuccessResponse_WhenUserIsCreatedSuccessfully() {
        SignupRequestDto requestDto = new SignupRequestDto("testUser", "test@example.com", "password", "John", "Doe", "USA", "BEGINNER");

        when(userRepository.findByUsernameOrEmail(anyString(), anyString())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(jwtService.generateToken(any(User.class))).thenReturn("generatedToken");

        GenericApiResponse<SignupResponseDto> response = authenticationService.signup(requestDto);

        assertEquals(HttpStatus.CREATED.value(), response.getStatus());
        assertEquals("User created successfully", response.getMessage());
        assertNotNull(response.getData());
        assertEquals("generatedToken", response.getData().getToken());
    }

    @Test
    void signup_ShouldReturnErrorResponse_WhenUsernameOrEmailAlreadyExists() {
        SignupRequestDto requestDto = new SignupRequestDto("testUser", "test@example.com", "password", "John", "Doe", "USA", "BEGINNER");

        when(userRepository.findByUsernameOrEmail(anyString(), anyString())).thenReturn(Optional.of(new User()));

        GenericApiResponse<SignupResponseDto> response = authenticationService.signup(requestDto);

        assertEquals(HttpStatus.CONFLICT.value(), response.getStatus());
        assertEquals("Username or email already exists", response.getMessage());
        assertNull(response.getData());
    }

    @Test
    void signin_ShouldReturnSuccessResponse_WhenCredentialsAreValid() {
        SigninRequestDto requestDto = new SigninRequestDto("testUser", "password");
        User user = new User();
        user.setUsername("testUser");
        user.setPassword("encodedPassword");

        when(userRepository.findByUsernameOrEmail(anyString(), anyString())).thenReturn(Optional.of(user));
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(null);
        when(jwtService.generateToken(any(User.class))).thenReturn("generatedToken");

        GenericApiResponse<SigninResponseDto> response = authenticationService.signin(requestDto);

        assertEquals(HttpStatus.OK.value(), response.getStatus());
        assertEquals("User logged in successfully.", response.getMessage());
        assertNotNull(response.getData());
        assertEquals("generatedToken", response.getData().getToken());
    }

    @Test
    void signin_ShouldReturnErrorResponse_WhenUserDoesNotExist() {
        SigninRequestDto requestDto = new SigninRequestDto("testUser", "password");

        when(userRepository.findByUsernameOrEmail(anyString(), anyString())).thenReturn(Optional.empty());

        GenericApiResponse<SigninResponseDto> response = authenticationService.signin(requestDto);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.getStatus());
        assertEquals("Invalid email/username or password.", response.getMessage());
        assertNull(response.getData());
    }

    @Test
    void signin_ShouldReturnErrorResponse_WhenAuthenticationFails() {
        SigninRequestDto requestDto = new SigninRequestDto("testUser", "wrongPassword");
        User user = new User();
        user.setUsername("testUser");

        when(userRepository.findByUsernameOrEmail(anyString(), anyString())).thenReturn(Optional.of(user));
        doThrow(BadCredentialsException.class).when(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));

        GenericApiResponse<SigninResponseDto> response = authenticationService.signin(requestDto);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.getStatus());
        assertEquals("Invalid email/username or password.", response.getMessage());
        assertNull(response.getData());
    }
}
