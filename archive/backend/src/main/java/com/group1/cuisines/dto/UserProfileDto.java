package com.group1.cuisines.dto;
import  lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
    private Integer id;
    private String username;
    private String name;
    private String bio;
    private boolean selfFollowing;
    private Integer followersCount;
    private Integer followingCount;
    private String gender;
    private String profilePicture;
   // private List<String> diets;
    private Integer recipeCount;
    private List<BookmarkDto> bookmarks;
    private List<RecipeDetailsDto> recipes;
}
