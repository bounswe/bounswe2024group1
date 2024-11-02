package com.group1.programminglanguagesforum.DTOs.Responses;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkQuestionResponseDto {
    private Long id;
    private String title;
    private Long upvoteCount;
    private Long downvoteCount;
}
