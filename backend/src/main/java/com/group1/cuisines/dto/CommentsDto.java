package com.group1.cuisines.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentsDto {
    private Integer id;
    private Integer userId;
    private Integer recipeId;
    private String text;
    private LocalDateTime createdDate;
    private int upvoteCount;
}
