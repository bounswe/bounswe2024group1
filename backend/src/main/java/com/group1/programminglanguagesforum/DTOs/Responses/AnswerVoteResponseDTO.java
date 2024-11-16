package com.group1.programminglanguagesforum.DTOs.Responses;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerVoteResponseDTO {
    private Long answerId;
    private Long upvoteCount;
    private Long downvoteCount;
}
