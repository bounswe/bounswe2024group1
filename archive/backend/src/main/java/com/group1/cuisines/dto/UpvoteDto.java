package com.group1.cuisines.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.group1.cuisines.entities.Ingredient;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class UpvoteDto {
    private Integer id;
    private AuthorDto author;
    private Integer recipeId;
    private Integer upvoteCount;
    private String content;
    private LocalDateTime createdAt;
}
