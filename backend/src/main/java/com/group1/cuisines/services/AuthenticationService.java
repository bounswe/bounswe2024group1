package com.group1.cuisines.services;

import com.group1.cuisines.dao.request.SignInRequest;
import com.group1.cuisines.dao.request.SignUpRequest;
import com.group1.cuisines.dao.response.AuthenticationTokenResponse;
import com.group1.cuisines.entities.User;
import com.group1.cuisines.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final JwtService jwtService;

    private final UserRepository userRepository;

    public AuthenticationTokenResponse signup(SignUpRequest request) {
        User user = User.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user);
        return AuthenticationTokenResponse.builder()
                .token(token)
                .build();

    }

    public AuthenticationTokenResponse signin(SignInRequest request) {
        return null;
    }
}
