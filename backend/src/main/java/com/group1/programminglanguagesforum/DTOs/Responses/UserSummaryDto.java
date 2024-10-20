package com.group1.programminglanguagesforum.DTOs.Responses;

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
    // add profile picture
}
