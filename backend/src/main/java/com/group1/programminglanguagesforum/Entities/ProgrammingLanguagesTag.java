package com.group1.programminglanguagesforum.Entities;

import jakarta.persistence.Entity;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class ProgrammingLanguagesTag extends Tag{
    private String logoImage;
    private String author;
    private String inceptionYear;
    private String fileExtension;
    private String officialWebsite;
    private String stackExchangeTag;
}
