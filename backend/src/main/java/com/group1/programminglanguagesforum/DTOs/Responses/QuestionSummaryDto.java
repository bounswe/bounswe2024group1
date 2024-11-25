package com.group1.programminglanguagesforum.DTOs.Responses;

import com.group1.programminglanguagesforum.Entities.DifficultyLevel;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionSummaryDto {
    private Long id;
    private String title;
    private String content;
    private DifficultyLevel difficulty;
    private Long upvoteCount;
    private Long downvoteCount;
    private Long answerCount;
    private String createdAt;
    private AuthorDto author;
    private List<TagDto> tags;
}
