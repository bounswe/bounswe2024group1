package com.group1.programminglanguagesforum.DTOs.Requests;

import com.group1.programminglanguagesforum.Entities.DifficultyLevel;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DifficultyLevelRequestDto {
    private DifficultyLevel difficulty;
}
