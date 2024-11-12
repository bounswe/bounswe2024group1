package com.group1.programminglanguagesforum.DTOs.Responses;

import com.group1.programminglanguagesforum.Entities.ExperienceLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserSummaryDto {
    private Long id;
    private String username;
    private int reputationPoints;
    private ExperienceLevel experienceLevel;
    // add profile picture
}
