package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.DTOs.Requests.UserProfileUpdateRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.SelfProfileResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.UserProfileResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.UserSummaryDto;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Exceptions.UserNotFoundException;
import com.group1.programminglanguagesforum.Services.UserContextService;
import com.group1.programminglanguagesforum.Services.UserService;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
                        SelfProfileResponseDto selfProfileResponseDto = modelMapper.map(user,
                                        SelfProfileResponseDto.class);
                        GenericApiResponse<SelfProfileResponseDto> response = ApiResponseBuilder.buildSuccessResponse(
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
                                        errorResponse);
                        return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
                }
        }

        @GetMapping(value = EndpointConstants.UserEndpoints.USER_ID)
        public ResponseEntity<GenericApiResponse<UserProfileResponseDto>> getUserById(
                        @PathVariable(name = "id") Long id) {
                Optional<User> user = userService.getUserById(id);
                if (user.isPresent()) {
                        UserProfileResponseDto userProfileResponseDto = modelMapper.map(user.get(),
                                        UserProfileResponseDto.class);
                        userProfileResponseDto.setSelfFollowing(userService.selfFollowing(user.get()));

                        GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildSuccessResponse(
                                        userProfileResponseDto.getClass(),
                                        "User retrieved successfully",
                                        HttpStatus.OK.value(),
                                        userProfileResponseDto);
                        return buildResponse(response, HttpStatus.valueOf(response.getStatus()));

                } else {
                        ErrorResponse errorResponse = ErrorResponse.builder()
                                        .errorMessage("User not found")
                                        .build();
                        GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                                        UserProfileResponseDto.class,
                                        "User not found",
                                        HttpStatus.NOT_FOUND.value(),
                                        errorResponse);
                        return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
                }

        }

        @PutMapping(value = EndpointConstants.UserEndpoints.USER_ID)
        public ResponseEntity<GenericApiResponse<UserProfileResponseDto>> updateUser(@PathVariable(name = "id") Long id,
                        @RequestBody UserProfileUpdateRequestDto userProfileUpdateRequestDto) {
                try {
                        User user = userContextService.getCurrentUser();
                        if (user.getId().equals(id)) {
                                User updatedUser = userService.updateUser(user, userProfileUpdateRequestDto);
                                UserProfileResponseDto updatedUserProfileResponseDto = modelMapper.map(updatedUser,
                                                UserProfileResponseDto.class);
                                GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder
                                                .buildSuccessResponse(
                                                                updatedUserProfileResponseDto.getClass(),
                                                                "User updated successfully",
                                                                HttpStatus.OK.value(),
                                                                updatedUserProfileResponseDto);
                                return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
                        } else {
                                ErrorResponse errorResponse = ErrorResponse.builder()
                                                .errorMessage("Unauthorized access")
                                                .build();
                                GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder
                                                .buildErrorResponse(
                                                                UserProfileResponseDto.class,
                                                                "Unauthorized access",
                                                                HttpStatus.UNAUTHORIZED.value(),
                                                                errorResponse);
                                return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
                        }
                } catch (UserNotFoundException e) {
                        ErrorResponse errorResponse = ErrorResponse.builder()
                                        .errorMessage(e.getMessage())
                                        .stackTrace(Arrays.toString(e.getStackTrace()))
                                        .build();
                        GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                                        UserProfileResponseDto.class,
                                        e.getMessage(),
                                        HttpStatus.NOT_FOUND.value(),
                                        errorResponse);
                        return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
                } catch (UnauthorizedAccessException e) {
                        ErrorResponse errorResponse = ErrorResponse.builder()
                                        .errorMessage(e.getMessage())
                                        .stackTrace(Arrays.toString(e.getStackTrace()))
                                        .build();
                        GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                                        UserProfileResponseDto.class,
                                        e.getMessage(),
                                        HttpStatus.UNAUTHORIZED.value(),
                                        errorResponse);
                        return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
                }
        }

        @PostMapping(value = EndpointConstants.UserEndpoints.USER_FOLLOW)
        public ResponseEntity<GenericApiResponse<UserProfileResponseDto>> followUser(
                        @PathVariable(name = "id") Long id) {
                try {
                        User user = userContextService.getCurrentUser();
                        User followedUser = userService.followUser(user, id);
                        UserProfileResponseDto updatedUserProfileResponseDto = modelMapper.map(followedUser,
                                        UserProfileResponseDto.class);
                        updatedUserProfileResponseDto.setSelfFollowing(userService.selfFollowing(followedUser));

                        GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildSuccessResponse(
                                        updatedUserProfileResponseDto.getClass(),
                                        "User followed successfully",
                                        HttpStatus.OK.value(),
                                        updatedUserProfileResponseDto

                        );
                        return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
                } catch (UnauthorizedAccessException e) {
                        ErrorResponse errorResponse = ErrorResponse.builder()
                                        .errorMessage(e.getMessage())
                                        .stackTrace(Arrays.toString(e.getStackTrace()))
                                        .build();
                        GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                                        UserProfileResponseDto.class,
                                        e.getMessage(),
                                        HttpStatus.UNAUTHORIZED.value(),
                                        errorResponse);
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
                                        errorResponse);
                        return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
                }

        }

        @DeleteMapping(value = EndpointConstants.UserEndpoints.USER_UNFOLLOW)
        public ResponseEntity<GenericApiResponse<UserProfileResponseDto>> unfollowUser(
                        @PathVariable(name = "id") Long id) {
                try {
                        User user = userContextService.getCurrentUser();
                        User unfollowedUser = userService.unfollowUser(user, id);
                        UserProfileResponseDto updatedUserProfileResponseDto = modelMapper.map(unfollowedUser,
                                        UserProfileResponseDto.class);
                        updatedUserProfileResponseDto.setSelfFollowing(userService.selfFollowing(unfollowedUser));

                        GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildSuccessResponse(
                                        updatedUserProfileResponseDto.getClass(),
                                        "User unfollowed successfully",
                                        HttpStatus.OK.value(),
                                        updatedUserProfileResponseDto

                        );
                        return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
                } catch (UnauthorizedAccessException e) {
                        ErrorResponse errorResponse = ErrorResponse.builder()
                                        .errorMessage(e.getMessage())
                                        .stackTrace(Arrays.toString(e.getStackTrace()))
                                        .build();
                        GenericApiResponse<UserProfileResponseDto> response = ApiResponseBuilder.buildErrorResponse(
                                        UserProfileResponseDto.class,
                                        e.getMessage(),
                                        HttpStatus.UNAUTHORIZED.value(),
                                        errorResponse);
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
                                        errorResponse);
                        return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
                }
        }

        @GetMapping(value = EndpointConstants.UserEndpoints.USER_FOLLOWERS)
        public ResponseEntity<GenericApiResponse<List<UserSummaryDto>>> getFollowers(
                        @PathVariable(name = "id") Long id) {
                try {
                        User user = userService.getUserById(id)
                                        .orElseThrow(() -> new UserNotFoundException("User not found"));
                        List<UserSummaryDto> followers = userService.getFollowers(user).stream()
                                        .map(u -> modelMapper.map(u, UserSummaryDto.class))
                                        .toList();
                        return buildResponse(
                                        ApiResponseBuilder.buildSuccessResponse(
                                                        followers.getClass(),
                                                        "Followers retrieved successfully",
                                                        HttpStatus.OK.value(),
                                                        followers),
                                        HttpStatus.OK);
                } catch (UserNotFoundException e) {
                        return buildResponse(
                                        ApiResponseBuilder.buildErrorResponse(
                                                        List.class,
                                                        e.getMessage(),
                                                        HttpStatus.NOT_FOUND.value(),
                                                        ErrorResponse.builder().errorMessage(e.getMessage()).build()),
                                        HttpStatus.NOT_FOUND);
                }
        }

        @GetMapping(value = EndpointConstants.SearchEndpoints.SEARCH_USERS)
        public ResponseEntity<GenericApiResponse<Map<String, Object>>> searchUsers(
                        @RequestParam("q") String query,
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "20") int pageSize) {
                try {
                        Page<User> userPage = userService.searchUsers(query, page, pageSize);
                        List<UserSummaryDto> userSummaries = userPage.getContent().stream()
                                        .map(user -> modelMapper.map(user, UserSummaryDto.class))
                                        .toList();

                        Map<String, Object> response = new HashMap<>();
                        response.put("items", userSummaries);
                        response.put("totalItems", userPage.getTotalElements());
                        response.put("currentPage", userPage.getNumber());
                        response.put("totalPages", userPage.getTotalPages());

                        return buildResponse(
                                        ApiResponseBuilder.buildSuccessResponse(
                                                        Map.class,
                                                        "Users retrieved successfully",
                                                        HttpStatus.OK.value(),
                                                        response),
                                        HttpStatus.OK);
                } catch (Exception e) {
                        ErrorResponse errorResponse = ErrorResponse.builder()
                                        .errorMessage("Error searching users: " + e.getMessage())
                                        .stackTrace(Arrays.toString(e.getStackTrace()))
                                        .build();

                        return buildResponse(
                                        ApiResponseBuilder.buildErrorResponse(
                                                        Map.class,
                                                        "Error searching users",
                                                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                                                        errorResponse),
                                        HttpStatus.INTERNAL_SERVER_ERROR);
                }
        }
}
