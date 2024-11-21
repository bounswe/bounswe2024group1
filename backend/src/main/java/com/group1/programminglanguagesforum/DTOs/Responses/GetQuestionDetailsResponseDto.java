package com.group1.programminglanguagesforum.DTOs.Responses;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetQuestionDetailsResponseDto {
    private Long id;
    private String title;
    private String content;
    private Long likeCount;
    private Long dislikeCount;
    private Long commentCount;
    private Boolean selfQuestion;
    private String createdAt;
    private String updatedAt;
    private AuthorDto author;
    @Builder.Default
    private Long rating = 0L;
    @Builder.Default
    private Long answerCount = 0L;
    @Builder.Default
    private boolean bookmarked = false;

}
