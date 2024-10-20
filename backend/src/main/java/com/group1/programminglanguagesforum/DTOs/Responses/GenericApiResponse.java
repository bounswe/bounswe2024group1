package com.group1.programminglanguagesforum.DTOs.Responses;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GenericApiResponse<T> {
    private int status;
    private String message;
    private T data;
    @Builder.Default
    private ErrorResponse error = null;
}
