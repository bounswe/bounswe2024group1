package com.group1.programminglanguagesforum.Entities;
import jakarta.persistence.Entity;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class SoftwareLibraryTag extends Tag{
    private String logoImage;
    private String officialWebsite;
    private String stackExchangeTag;
}
