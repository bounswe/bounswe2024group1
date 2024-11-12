package com.group1.programminglanguagesforum.DTOs.Requests;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequestDto {
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String country;
    private String experienceLevel;
}
