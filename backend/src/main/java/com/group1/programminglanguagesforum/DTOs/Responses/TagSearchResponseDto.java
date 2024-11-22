package com.group1.programminglanguagesforum.DTOs.Responses;
import lombok.*;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TagSearchResponseDto {
    private List<GetTagDetailsResponseDto> items;
    private long totalItems;
    private int currentPage;
    private int totalPages;

}
