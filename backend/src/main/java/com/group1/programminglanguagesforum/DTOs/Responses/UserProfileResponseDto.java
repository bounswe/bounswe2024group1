package com.group1.programminglanguagesforum.DTOs.Responses;
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
    private int reputationPoints;
}
