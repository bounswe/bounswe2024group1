package com.group1.programminglanguagesforum.DTOs.Responses;
import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetProgrammingLanguageTagResponseDto extends GetTagDetailsResponseDto {
    private String logoImage;
    private String author;
    private String inceptionYear;
    private String fileExtension;
    private String officialWebsite;
    private String stackExchangeTag;
}
