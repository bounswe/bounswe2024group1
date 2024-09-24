package com.group1.cuisines;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.group1.cuisines.controllers.AuthenticationController;
import com.group1.cuisines.dao.request.SignInRequest;
import com.group1.cuisines.dao.request.SignUpRequest;
import com.group1.cuisines.dao.response.ApiResponse;
import com.group1.cuisines.dao.response.AuthenticationTokenResponse;
import com.group1.cuisines.services.AuthenticationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class AuthenticationControllerTest {

    @InjectMocks
    AuthenticationController authenticationController;

    @Mock
    AuthenticationService authenticationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void shouldReturnSuccessOnValidSignin() {
        SignInRequest signInRequest = new SignInRequest("testUser", "testPassword");
        ApiResponse<AuthenticationTokenResponse> apiResponse = new ApiResponse<>(200, "Success", new AuthenticationTokenResponse("token"));
        when(authenticationService.signin(signInRequest)).thenReturn(apiResponse);

        ResponseEntity<ApiResponse<AuthenticationTokenResponse>> responseEntity = authenticationController.signin(signInRequest);

        assertEquals(HttpStatus.OK.value(), responseEntity.getStatusCodeValue(), "Status code does not match expected value on successful signin");
        assertEquals(apiResponse, responseEntity.getBody(), "Response body does not match expected value on successful signin");
    }

    @Test
    public void shouldReturnFailureOnInvalidSignin() {
        SignInRequest signInRequest = new SignInRequest("testUser", "wrongPassword");
        ApiResponse<AuthenticationTokenResponse> apiResponse = new ApiResponse<>(401, "Invalid email/username or password.", null);
        when(authenticationService.signin(signInRequest)).thenReturn(apiResponse);

        ResponseEntity<ApiResponse<AuthenticationTokenResponse>> responseEntity = authenticationController.signin(signInRequest);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), responseEntity.getStatusCodeValue(), "Status code does not match expected value on failed signin");
        assertEquals(apiResponse, responseEntity.getBody(), "Response body does not match expected value on failed signin");
    }

    @Test
    public void shouldReturnSuccessOnValidSignup() {
        SignUpRequest signUpRequest = SignUpRequest.builder()
                .email("newUser@gmail.com")
                .username("newUser")
                .country("USA")
                .bio("Bio of the new user")
                .password("newPassword")
                .firstName("New")
                .lastName("User")
                .build();
        ApiResponse<AuthenticationTokenResponse> apiResponse = new ApiResponse<>(201, "User registered successfully.", new AuthenticationTokenResponse("token"));
        when(authenticationService.signup(signUpRequest)).thenReturn(apiResponse);

        ResponseEntity<ApiResponse<AuthenticationTokenResponse>> responseEntity = authenticationController.signup(signUpRequest);

        assertEquals(HttpStatus.CREATED.value(), responseEntity.getStatusCodeValue(), "Status code does not match expected value on successful signup");
        assertEquals(apiResponse, responseEntity.getBody(), "Response body does not match expected value on successful signup");
    }

    @Test
    public void shouldReturnFailureOnInvalidSignup() {
        SignUpRequest signUpRequest = SignUpRequest.builder()
                .email("newUser@gmail.com")
                .username("newUser")
                .country("USA")
                .bio("Bio of the new user")
                .password("newPassword")
                .firstName("New")
                .lastName("User")
                .build();
        ApiResponse<AuthenticationTokenResponse> apiResponse = new ApiResponse<>(409, "Email or username already exists.", null);
        when(authenticationService.signup(signUpRequest)).thenReturn(apiResponse);

        ResponseEntity<ApiResponse<AuthenticationTokenResponse>> responseEntity = authenticationController.signup(signUpRequest);

        assertEquals(HttpStatus.CONFLICT.value(), responseEntity.getStatusCodeValue(), "Status code does not match expected value on failed signup");
        assertEquals(apiResponse, responseEntity.getBody(), "Response body does not match expected value on failed signup");
    }
}
