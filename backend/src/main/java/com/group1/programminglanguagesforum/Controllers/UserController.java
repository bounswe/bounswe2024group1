package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.SelfProfileResponseDto;
import com.group1.programminglanguagesforum.Services.UserContextService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController extends BaseController {
    private final UserContextService userContextService;

    @GetMapping(value = EndpointConstants.UserEndpoints.USER_ME)
    public ResponseEntity<GenericApiResponse<SelfProfileResponseDto>> getUser() {
        GenericApiResponse<SelfProfileResponseDto> response = userContextService.getCurrentUser();
        return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
    }


}
