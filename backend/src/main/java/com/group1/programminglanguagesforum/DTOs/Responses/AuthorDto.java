package com.group1.programminglanguagesforum.DTOs.Responses;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthorDto {
    private Long id;
    private String username;
    private Long reputationPoints;
    private String profilePicture;
    private String name;
}
