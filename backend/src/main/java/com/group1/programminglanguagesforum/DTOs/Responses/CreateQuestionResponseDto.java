package com.group1.programminglanguagesforum.DTOs.Responses;
import lombok.*;

import java.util.List;

import com.group1.programminglanguagesforum.Entities.DifficultyLevel;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateQuestionResponseDto {

    private Long id;
    private String title;
    private String content;
    private DifficultyLevel difficulty;
    private AuthorDto author;
    private String createdAt;
    private String updatedAt;
    private List<TagDto> tags;
    private Long upvoteCount;
    private Long downvoteCount;



}
