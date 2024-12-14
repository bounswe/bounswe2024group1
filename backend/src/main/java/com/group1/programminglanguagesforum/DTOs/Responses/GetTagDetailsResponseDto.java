package com.group1.programminglanguagesforum.DTOs.Responses;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetTagDetailsResponseDto {
    private Long tagId;
    private String name;
    private String description;
    @Builder.Default
    private Long questionCount = 0L;
    @Builder.Default
    private Long followerCount = 0L;
    @Builder.Default
    private Boolean following = false;
    private String tagType;
    @Builder.Default
    private List<QuestionSummaryDto> relatedQuestions = null;
}
