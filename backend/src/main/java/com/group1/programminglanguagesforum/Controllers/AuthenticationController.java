package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.DTOs.Requests.SigninRequestDto;
import com.group1.programminglanguagesforum.DTOs.Requests.SignupRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.SigninResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.SignupResponseDto;
import com.group1.programminglanguagesforum.Services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class AuthenticationController extends BaseController {
    private final AuthenticationService authenticationService;

    @PostMapping(value = EndpointConstants.AuthenticationEndpoints.SIGNUP)
    public ResponseEntity<GenericApiResponse<SignupResponseDto>> signup(
            @RequestBody SignupRequestDto requestDto
    ) {
        GenericApiResponse<SignupResponseDto> response = authenticationService.signup(requestDto);
        return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
    }

    @PostMapping(value = EndpointConstants.AuthenticationEndpoints.SIGNIN)
    public ResponseEntity<GenericApiResponse<SigninResponseDto>> signin(
            @RequestBody SigninRequestDto requestDto
    ) {
        GenericApiResponse<SigninResponseDto> response = authenticationService.signin(requestDto);
        return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
    }
}
