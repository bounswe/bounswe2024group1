package com.group1.programminglanguagesforum.DTOs.Responses;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

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
    @Builder.Default
    private List<TagDto> tags= new ArrayList<>();
    private String updatedAt;
    private AuthorDto author;
    @Builder.Default
    private Long rating = 0L;
    @Builder.Default
    private Long answerCount = 0L;
    @Builder.Default
    private boolean bookmarked = false;

}
