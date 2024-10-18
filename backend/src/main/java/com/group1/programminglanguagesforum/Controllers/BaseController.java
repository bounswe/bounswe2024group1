package com.group1.programminglanguagesforum.Controllers;

import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class BaseController {
    protected <T> ResponseEntity<GenericApiResponse<T>> buildResponse(GenericApiResponse<T> response,HttpStatus status) {
        return new ResponseEntity<>(
                response,
                status
        );
    }

}
