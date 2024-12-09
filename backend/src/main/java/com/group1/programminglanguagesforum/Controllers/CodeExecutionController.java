package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.DTOs.Requests.CodeExecutionRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.CodeExecutionResponseDTO;
import com.group1.programminglanguagesforum.DTOs.Responses.ErrorResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.Services.CodeExecutionService;
import com.group1.programminglanguagesforum.Util.ApiResponseBuilder;
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
public class CodeExecutionController extends BaseController {

    private final CodeExecutionService codeExecutionService;

    @PostMapping(value = "/execute-code")
    public ResponseEntity<GenericApiResponse<CodeExecutionResponseDTO>> executeCode(
            @RequestBody CodeExecutionRequestDto requestDto
    ) {
        try {
            CodeExecutionResponseDTO responseDTO = codeExecutionService.executeCode(requestDto.getCode(), requestDto.getLanguage(), requestDto.getInput());
            int status = responseDTO.getStatus().equals("Accepted") ? HttpStatus.OK.value() : HttpStatus.INTERNAL_SERVER_ERROR.value();
            if (status == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
                throw new Exception(responseDTO.getStatus());
            }
            GenericApiResponse<CodeExecutionResponseDTO> response =
                    ApiResponseBuilder.buildSuccessResponse(
                            responseDTO.getClass(),
                            "Code executed successfully",
                            HttpStatus.OK.value(),
                            responseDTO
                    );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
        }
        catch (Exception e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .errorMessage(e.getMessage())
                    .build();
            GenericApiResponse<CodeExecutionResponseDTO> response =
                    ApiResponseBuilder.buildErrorResponse(
                            CodeExecutionResponseDTO.class,
                            e.getMessage(),
                            HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            errorResponse
                    );
            return buildResponse(response, HttpStatus.valueOf(response.getStatus()));
        }
    }

}
