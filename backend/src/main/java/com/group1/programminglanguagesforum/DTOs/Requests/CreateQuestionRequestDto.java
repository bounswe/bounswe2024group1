package com.group1.programminglanguagesforum.DTOs.Requests;
import lombok.*;

import java.util.List;

import com.group1.programminglanguagesforum.Entities.ExperienceLevel;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateQuestionRequestDto {
    private String title;
    private String content;
    private ExperienceLevel difficulty;
    private List<Long> tagIds;

}
