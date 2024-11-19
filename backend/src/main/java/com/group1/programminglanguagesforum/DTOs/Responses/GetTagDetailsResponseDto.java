package com.group1.programminglanguagesforum.DTOs.Responses;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

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
    private List<GetQuestionWithTagDto> relatedQuestions = null ;
}
