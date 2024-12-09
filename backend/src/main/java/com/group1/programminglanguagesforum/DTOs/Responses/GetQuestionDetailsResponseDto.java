package com.group1.programminglanguagesforum.DTOs.Responses;

import com.group1.programminglanguagesforum.Entities.DifficultyLevel;
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
    private DifficultyLevel difficulty;
    private Integer selfVoted;
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
    @Builder.Default
    private DifficultyLevel  selfDifficultyVote =null;
    private Long easyCount;
    private Long mediumCount;
    private Long hardCount;

}
