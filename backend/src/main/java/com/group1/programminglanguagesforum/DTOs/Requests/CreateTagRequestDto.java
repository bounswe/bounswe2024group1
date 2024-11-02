package com.group1.programminglanguagesforum.DTOs.Requests;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateTagRequestDto {
    @NonNull
    private String name;
    @NonNull
    private String description;
}
