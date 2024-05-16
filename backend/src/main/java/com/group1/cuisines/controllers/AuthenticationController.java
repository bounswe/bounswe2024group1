package com.group1.cuisines.controllers;

import com.group1.cuisines.dao.request.SignInRequest;
import com.group1.cuisines.dao.request.SignUpRequest;
import com.group1.cuisines.dao.response.ApiResponse;
import com.group1.cuisines.dao.response.AuthenticationTokenResponse;
import com.group1.cuisines.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService; // Authentication service

    @PostMapping("/signup") // Sign up endpoint
    public ResponseEntity<ApiResponse<AuthenticationTokenResponse>> signup(
        @RequestBody SignUpRequest request
    ) {
        ApiResponse<AuthenticationTokenResponse> response = authenticationService.signup(request);

        if (response.getStatus() == 409) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } else if (response.getStatus() == 400) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
    }

    @PostMapping("/login") // Sign in endpoint
    public ResponseEntity<ApiResponse<AuthenticationTokenResponse>> signin(
        @RequestBody SignInRequest request
    ) {
        ApiResponse<AuthenticationTokenResponse> response = authenticationService.signin(request);

        if (response.getStatus() == 401) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }
}
