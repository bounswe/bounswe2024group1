package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.DTOs.Requests.CreateTagRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GetTagDetailsResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.TagDto;
import com.group1.programminglanguagesforum.DTOs.Responses.TagSearchResponseDto;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Exceptions.ExceptionResponseHandler;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Services.TagService;
import com.group1.programminglanguagesforum.Services.UserContextService;
import com.group1.programminglanguagesforum.Services.UserService;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;

import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.NoSuchElementException;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class TagController extends BaseController {
    
    private final TagService tagService;
    private final UserContextService userContextService;
    private final UserService userService;

    @GetMapping(value = EndpointConstants.TagEndpoints.SEARCH)
    public ResponseEntity<GenericApiResponse<TagSearchResponseDto>> tagSearch(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,  // Page index starts at 0
            @RequestParam(defaultValue = "20") int pageSize) {

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("tagName").ascending());
        Page<GetTagDetailsResponseDto> tagsPage = tagService.searchTags(q, pageable);

        TagSearchResponseDto responseData = TagSearchResponseDto.builder()
                .items(tagsPage.getContent())
                .totalItems(tagsPage.getTotalElements())
                .currentPage(tagsPage.getNumber())
                .totalPages(tagsPage.getTotalPages())
                .build();

        GenericApiResponse<TagSearchResponseDto> response = GenericApiResponse.<TagSearchResponseDto>builder()
                .status(200)
                .message("Tags retrieved successfully")
                .data(responseData)
                .build();

        return buildResponse(response, HttpStatus.OK);
    }

    @GetMapping(value = EndpointConstants.TagEndpoints.TAG_ID)
    public ResponseEntity<GenericApiResponse<GetTagDetailsResponseDto>> getTagDetails(@PathVariable(value = "id") Long tagId) {
        try {
            GetTagDetailsResponseDto tagDetails = tagService.getTagDetails(tagId);
            GenericApiResponse<GetTagDetailsResponseDto> response = GenericApiResponse.<GetTagDetailsResponseDto>builder()
                    .status(200)
                    .message("Tag details retrieved successfully")
                    .data(tagDetails)
                    .build();
            ApiResponseBuilder.buildSuccessResponse(GetTagDetailsResponseDto.class, "Tag details retrieved successfully", 200, tagDetails);
            return buildResponse(response, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<GetTagDetailsResponseDto> response = GenericApiResponse.<GetTagDetailsResponseDto>builder()
                    .status(404)
                    .message("Tag not found")
                    .error(errorResponse)
                    .data(null)
                    .build();
            ApiResponseBuilder.buildErrorResponse(GetTagDetailsResponseDto.class, "Tag not found", 404, errorResponse);
            return buildResponse(response, HttpStatus.NOT_FOUND);


        }


    }
    @PostMapping(value = EndpointConstants.TagEndpoints.BASE_PATH)
    public ResponseEntity<GenericApiResponse<GetTagDetailsResponseDto>> createTag(@RequestBody CreateTagRequestDto dto){
        try{
            User user = userContextService.getCurrentUser();
            if(userService.calculateReputation(user) < 50){
                return ExceptionResponseHandler.IllegalArgumentException(
                        new IllegalArgumentException("User does not have enough reputation to create a tag which should be at least 50")
                );
            }

            GetTagDetailsResponseDto tagDetails = tagService.createTag(dto);
            GenericApiResponse<GetTagDetailsResponseDto> response = GenericApiResponse.<GetTagDetailsResponseDto>builder()
                    .status(201)
                    .message("Tag created successfully")
                    .data(tagDetails)
                    .build();
            ApiResponseBuilder.buildSuccessResponse(GetTagDetailsResponseDto.class, "Tag created successfully", 201, tagDetails);
            return buildResponse(response, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .stackTrace(Arrays.toString(e.getStackTrace()))
                    .build();
            GenericApiResponse<GetTagDetailsResponseDto> response = GenericApiResponse.<GetTagDetailsResponseDto>builder()
                    .status(400)
                    .message("Invalid tag type")
                    .error(errorResponse)
                    .data(null)
                    .build();
            ApiResponseBuilder.buildErrorResponse(GetTagDetailsResponseDto.class, "Invalid tag type", 400, errorResponse);
            return buildResponse(response, HttpStatus.BAD_REQUEST);
        } catch (UnauthorizedAccessException e) {
            return ExceptionResponseHandler.UnauthorizedAccessException(e);
        }

    }

    @PostMapping(value = EndpointConstants.TagEndpoints.TAG_FOLLOW)
    public ResponseEntity<GenericApiResponse<TagDto>> postMethodName(@PathVariable(value = "id") Long tagId) {
        try {
            User user = userContextService.getCurrentUser();
            TagDto tagDto = tagService.followTag(user, tagId);
            GenericApiResponse<TagDto> response = ApiResponseBuilder.buildSuccessResponse(TagDto.class, "Tag followed successfully", 200, tagDto);
            return buildResponse(response, HttpStatus.OK);
            
        } catch (UnauthorizedAccessException e) {
            return ExceptionResponseHandler.UnauthorizedAccessException(e);
        } catch (NoSuchElementException e) {
            return ExceptionResponseHandler.NoSuchElementException(e);
        } catch (EntityExistsException e) {
            return ExceptionResponseHandler.EntityExistsException(e);
        }
    }

    @DeleteMapping(value = EndpointConstants.TagEndpoints.TAG_FOLLOW)
    public ResponseEntity<GenericApiResponse<TagDto>> deleteMethodName(@PathVariable(value = "id") Long tagId) {
        try {
            User user = userContextService.getCurrentUser();
            TagDto tagDto = tagService.unfollowTag(user, tagId);
            GenericApiResponse<TagDto> response = ApiResponseBuilder.buildSuccessResponse(TagDto.class, "Tag unfollowed successfully", 200, tagDto);
            return buildResponse(response, HttpStatus.OK);
            
        } catch (UnauthorizedAccessException e) {
            return ExceptionResponseHandler.UnauthorizedAccessException(e);
        } catch (NoSuchElementException e) {
            return ExceptionResponseHandler.NoSuchElementException(e);
        }
    }
    
}
