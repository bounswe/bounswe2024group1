package com.group1.programminglanguagesforum.DTOs.Responses;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetQuestionWithTagDto {
    private Long id;
    private String title;
    private String content;
    @Builder.Default
    private Long likeCount = 0L;
    @Builder.Default
    private Long commentCount = 0L;
    @Builder.Default
    private Boolean following = false;
    private String createdAt;
    private String updatedAt;
}
