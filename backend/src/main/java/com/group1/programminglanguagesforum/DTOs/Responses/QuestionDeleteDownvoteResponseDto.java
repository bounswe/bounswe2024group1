package com.group1.programminglanguagesforum.DTOs.Responses;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDeleteDownvoteResponseDto {
    private Long questionId;
    private Long upvoteCount;
    private Long downvoteCount;
}
