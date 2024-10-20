package com.group1.programminglanguagesforum.DTOs.Responses;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ErrorResponse {
    private String errorMessage;
    private String stackTrace;

}
