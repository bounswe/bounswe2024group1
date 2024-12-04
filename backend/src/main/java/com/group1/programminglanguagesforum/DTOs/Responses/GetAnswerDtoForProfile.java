package com.group1.programminglanguagesforum.DTOs.Responses;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetAnswerDtoForProfile {
    private Long id;
    private String content;
    private AuthorDto author;
    private String createdAt;
    private String updatedAt;
    private Long upvoteCount;
    private Long downvoteCount;
    private boolean selfAnswer;
    private Integer selfVoted;
    @Builder
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
   public static class QuesitonInfoForAnswer {
        private Long id;
        private String title;
    }
    private QuesitonInfoForAnswer question;

}
