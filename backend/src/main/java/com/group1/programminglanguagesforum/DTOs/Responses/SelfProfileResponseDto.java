package com.group1.programminglanguagesforum.DTOs.Responses;
import com.group1.programminglanguagesforum.Entities.ExperienceLevel;
import com.group1.programminglanguagesforum.Entities.TagType;
import lombok.*;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SelfProfileResponseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String bio;
    private String country;
    private Long answerCount;
    private int followersCount;
    private int followingCount;
    private Long reputationPoints;
    private Long questionCount;
    private ExperienceLevel experienceLevel;
    private List<QuestionSummaryDto> questions;
    private List<GetAnswerDtoForProfile> answers;
    private List<FollowedTags> followedTags;
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class FollowedTags {

        private Long id;
        private String name;
        private TagType tagType;
        private String description;

    }
}
