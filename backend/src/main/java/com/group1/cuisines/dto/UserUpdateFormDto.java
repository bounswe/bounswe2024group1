package com.group1.cuisines.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateFormDto {
    private String username;
    private String firstName;
    private String lastName;
    private String bio;
    private String gender;
    private String profilePicture;
}
