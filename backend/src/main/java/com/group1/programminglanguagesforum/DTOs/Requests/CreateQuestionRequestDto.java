package com.group1.programminglanguagesforum.DTOs.Requests;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateQuestionRequestDto {
    private String title;
    private String content;
    private List<Long> tagIds;

}
