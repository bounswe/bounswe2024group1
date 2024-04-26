package com.group1.cuisines.controllers;

import com.group1.cuisines.dao.request.SignInRequest;
import com.group1.cuisines.dao.request.SignUpRequest;
import com.group1.cuisines.dao.response.ApiResponse;
import com.group1.cuisines.dao.response.AuthenticationTokenResponse;
import com.group1.cuisines.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService; // Authentication service

    @PostMapping("/signup") // Sign up endpoint
    public ResponseEntity<ApiResponse<AuthenticationTokenResponse>> signup(@RequestBody SignUpRequest request) {

        return ResponseEntity.ok(authenticationService.signup(request)); // Return response
    }

    @PostMapping("/signin") // Sign in endpoint
    public ResponseEntity<ApiResponse<AuthenticationTokenResponse>> signin(@RequestBody SignInRequest request) {
        return ResponseEntity.ok(authenticationService.signin(request)); // Return response
    }
}
