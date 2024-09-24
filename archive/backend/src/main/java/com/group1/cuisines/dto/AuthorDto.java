package com.group1.cuisines.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthorDto {
    private Integer id;
    private String name;
    private String username;
    private Integer followersCount;
    private Integer followingCount;
    private Integer recipesCount;

}
