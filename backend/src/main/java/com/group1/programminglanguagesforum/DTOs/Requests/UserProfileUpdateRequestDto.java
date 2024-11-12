package com.group1.programminglanguagesforum.DTOs.Requests;

import com.group1.programminglanguagesforum.Entities.ExperienceLevel;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileUpdateRequestDto {
    private String bio;
    private String country;
    private ExperienceLevel experienceLevel;
}
