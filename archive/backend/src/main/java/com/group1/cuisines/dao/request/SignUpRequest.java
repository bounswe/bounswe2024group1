package com.group1.cuisines.dao.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {

    private String email;
    private String username;
    private String country;

    private String bio;
    private String password;
    private String firstName;
    private String lastName;
}
