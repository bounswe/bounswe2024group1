package com.group1.programminglanguagesforum.DTOs.Responses;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateAnswerResponseDto {
    private Long id;
    private String content;
    private AuthorDto author;
    private String createdAt;
    private String updatedAt;
    @Builder.Default
    private Long rating = 0L;
}
