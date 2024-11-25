package com.group1.programminglanguagesforum.DTOs.Responses;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetAnswersResponseDto {
    private List<AnswerResponseDto> items;
    private int totalItems;
    @Builder
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AnswerResponseDto {
        private Long id;
        private String content;
        private AuthorDto author;
        private String createdAt;
        private String updatedAt;
        private Long upvoteCount;
        private Long downvoteCount;
        private boolean selfAnswer;
        private Integer selfVoted;
    }

}
