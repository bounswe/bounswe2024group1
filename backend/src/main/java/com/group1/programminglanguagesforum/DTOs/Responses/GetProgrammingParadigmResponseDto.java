package com.group1.programminglanguagesforum.DTOs.Responses;
import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetProgrammingParadigmResponseDto extends GetTagDetailsResponseDto {
    private String stackExchangeTag;
}
