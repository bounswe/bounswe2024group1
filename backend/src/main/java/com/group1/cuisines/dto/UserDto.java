package com.group1.cuisines.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class UserDto {
    private Integer id;
    private String username;
    private String firstName;
    private String lastName;
    private boolean selfFollowing;
    private int followerCount;
    private int followingCount;
    private int recipeCount;
}
