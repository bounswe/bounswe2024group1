package com.group1.programminglanguagesforum.DTOs.Responses;

import com.group1.programminglanguagesforum.Entities.ExperienceLevel;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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
    private Long reputationPoints;
    private ExperienceLevel experienceLevel;
    @Builder.Default
    private List<SelfProfileResponseDto.FollowedTags> followedTags = new ArrayList<>();
    private Long questionCount;
    private List<QuestionSummaryDto> questions;
    private List<GetAnswerDtoForProfile> answers;
}
