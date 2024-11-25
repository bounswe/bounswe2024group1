package com.group1.programminglanguagesforum.Entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

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

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_TAGS",
            joinColumns = @JoinColumn(name = "tag_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> followers = new HashSet<>();

    public Tag(String wikidataId, String tagName, String tagDescription) {
        this.wikidataId = wikidataId;
        this.tagName = tagName;
        this.tagDescription = tagDescription;
    }


}
