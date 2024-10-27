package com.group1.programminglanguagesforum.DTOs.Requests;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CodeExecutionRequestDto {
    private String code;
    private String language;
    private String input;
}
