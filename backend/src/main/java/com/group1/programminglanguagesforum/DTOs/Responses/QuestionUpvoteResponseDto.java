package com.group1.programminglanguagesforum.DTOs.Responses;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionUpvoteResponseDto {
    private Long questionId;
    private Long upvoteCount;
}
