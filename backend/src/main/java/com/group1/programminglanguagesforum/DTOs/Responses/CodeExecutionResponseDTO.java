package com.group1.programminglanguagesforum.DTOs.Responses;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CodeExecutionResponseDTO {
    private String status;
    private String output;
    private Double executionTime; // in seconds
}
