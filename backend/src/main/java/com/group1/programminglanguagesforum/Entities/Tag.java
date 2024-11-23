package com.group1.programminglanguagesforum.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "TAGS")
@Inheritance(strategy = InheritanceType.JOINED)
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String wikidataId;
    private String tagName;
    private String tagDescription;

    @ManyToMany(mappedBy = "followedTags")
    private Set<User> followers = new HashSet<>();

    public Tag(String wikidataId, String tagName, String tagDescription) {
        this.wikidataId = wikidataId;
        this.tagName = tagName;
        this.tagDescription = tagDescription;
    }

}
