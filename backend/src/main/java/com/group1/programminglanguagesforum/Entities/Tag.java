package com.group1.programminglanguagesforum.Entities;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "TAGS")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String wikidataId;
    private String tagName;
    private String tagDescription;

}