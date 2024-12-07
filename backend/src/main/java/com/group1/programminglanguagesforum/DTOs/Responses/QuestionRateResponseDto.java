package com.group1.programminglanguagesforum.DTOs.Responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionRateResponseDto {
    private Long questionId;
    private Long easyCount;
    private Long mediumCount;
    private Long hardCount;
    private Long totalCount;
}
