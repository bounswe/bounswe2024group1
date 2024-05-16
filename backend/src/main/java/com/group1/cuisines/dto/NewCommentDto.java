package com.group1.cuisines.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewCommentDto {
    private Integer recipeId;
    private String text;
}
