package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.DTOs.Requests.UserProfileUpdateRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.SelfProfileResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.UserProfileResponseDto;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Exceptions.UserNotFoundException;
import com.group1.programminglanguagesforum.Services.UserContextService;
import com.group1.programminglanguagesforum.Services.UserService;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController extends BaseController {
    private final UserContextService userContextService;
    private final UserService userService;
    private final ModelMapper modelMapper;

    @GetMapping(value = EndpointConstants.UserEndpoints.USER_ME)
    public ResponseEntity<GenericApiResponse<SelfProfileResponseDto>> getUser() {

        try {
            User user = userContextService.getCurrentUser();
            SelfProfileResponseDto selfProfileResponseDto = modelMapper.map(user, SelfProfileResponseDto.class);
            GenericApiResponse<SelfProfileResponseDto> response =
                    ApiResponseBuilder.buildSuccessResponse(
                            selfProfileResponseDto.getClass(),
                            "User retrieved successfully",
                            HttpStatus.OK.value(),
                            selfProfileResponseDto


                    );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
        } catch (UnauthorizedAccessException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<SelfProfileResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                    SelfProfileResponseDto.class,
                    e.getMessage(),
                    HttpStatus.UNAUTHORIZED.value(),
                    errorResponse
            );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
        }
    }

    @GetMapping(value = EndpointConstants.UserEndpoints.USER_ID)
    public ResponseEntity<GenericApiResponse<UserProfileResponseDto>> getUserById(@PathVariable(name = "id") Long id) {
            Optional<User> user = userService.getUserById(id);
            if (user.isPresent()) {
                UserProfileResponseDto userProfileResponseDto = modelMapper.map(user.get(), UserProfileResponseDto.class);
                GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildSuccessResponse(
                        userProfileResponseDto.getClass(),
                        "User retrieved successfully",
                        HttpStatus.OK.value(),
                        userProfileResponseDto
                );
                return buildResponse(response, HttpStatus.valueOf(response.getStatus()));

            }
            else{
                ErrorResponse errorResponse = ErrorResponse.builder()
                        .errorMessage("User not found")
                        .build();
                GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                        UserProfileResponseDto.class,
                        "User not found",
                        HttpStatus.NOT_FOUND.value(),
                        errorResponse
                );
                return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
            }



    }
    @PutMapping(value = EndpointConstants.UserEndpoints.USER_ID)
    public ResponseEntity<GenericApiResponse<UserProfileResponseDto>> updateUser(@PathVariable(name = "id") Long id, @RequestBody UserProfileUpdateRequestDto userProfileUpdateRequestDto) {
        try {
            User user = userContextService.getCurrentUser();
            if (user.getId().equals(id)) {
                User updatedUser = userService.updateUser(user, userProfileUpdateRequestDto);
                UserProfileResponseDto updatedUserProfileResponseDto = modelMapper.map(updatedUser, UserProfileResponseDto.class);
                GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildSuccessResponse(
                        updatedUserProfileResponseDto.getClass(),
                        "User updated successfully",
                        HttpStatus.OK.value(),
                        updatedUserProfileResponseDto
                );
                return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
            } else {
                ErrorResponse errorResponse = ErrorResponse.builder()
                        .errorMessage("Unauthorized access")
                        .build();
                GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                        UserProfileResponseDto.class,
                        "Unauthorized access",
                        HttpStatus.UNAUTHORIZED.value(),
                        errorResponse
                );
                return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
            }
        }
        catch (UserNotFoundException e){
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                    UserProfileResponseDto.class,
                    e.getMessage(),
                    HttpStatus.NOT_FOUND.value(),
                    errorResponse
            );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
        }
        catch (UnauthorizedAccessException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                    UserProfileResponseDto.class,
                    e.getMessage(),
                    HttpStatus.UNAUTHORIZED.value(),
                    errorResponse
            );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
        }
    }
    @PostMapping(value = EndpointConstants.UserEndpoints.USER_FOLLOW)
    public ResponseEntity<GenericApiResponse<UserProfileResponseDto>> followUser(@PathVariable(name = "id")Long id){
        try{
            User user = userContextService.getCurrentUser();
            User followedUser = userService.followUser(user, id);
            UserProfileResponseDto updatedUserProfileResponseDto = modelMapper.map(followedUser, UserProfileResponseDto.class);
            GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildSuccessResponse(
                    updatedUserProfileResponseDto.getClass(),
                    "User followed successfully",
                    HttpStatus.OK.value(),
                    updatedUserProfileResponseDto

            );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
        } catch (UnauthorizedAccessException  e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                    UserProfileResponseDto.class,
                    e.getMessage(),
                    HttpStatus.UNAUTHORIZED.value(),
                    errorResponse
            );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
        } catch (UserNotFoundException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                    UserProfileResponseDto.class,
                    e.getMessage(),
                    HttpStatus.NOT_FOUND.value(),
                    errorResponse
            );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
        }


    }

}

