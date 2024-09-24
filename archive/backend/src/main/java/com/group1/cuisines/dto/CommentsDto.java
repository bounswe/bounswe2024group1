package com.group1.cuisines.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentsDto {
    private Integer id;
    private AuthorDto author;
    private Integer recipeId;
    private Integer upvoteCount;
    private String content;
    private Boolean hasSelfUpvoted;
    private LocalDateTime createdAt;
}
