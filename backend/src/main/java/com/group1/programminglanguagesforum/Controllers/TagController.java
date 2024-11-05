package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.DTOs.Requests.CreateTagRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GetTagDetailsResponseDto;
import com.group1.programminglanguagesforum.Services.TagService;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class TagController extends BaseController {
    private final TagService tagService;
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
        }

    }
}
