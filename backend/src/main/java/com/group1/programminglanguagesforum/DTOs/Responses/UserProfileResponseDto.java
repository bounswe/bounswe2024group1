package com.group1.programminglanguagesforum.DTOs.Responses;
import com.group1.programminglanguagesforum.Entities.ExperienceLevel;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserProfileResponseDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String bio;
    private String country;
    private Long answerCount;
    private int followersCount;
    private int followingCount;
    private boolean selfFollowing;
    private int reputationPoints;
    private ExperienceLevel experienceLevel;
}
