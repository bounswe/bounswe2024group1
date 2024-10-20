package com.group1.programminglanguagesforum.DTOs.Requests;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileUpdateRequestDto {
    private String bio;
    private String country;
}
