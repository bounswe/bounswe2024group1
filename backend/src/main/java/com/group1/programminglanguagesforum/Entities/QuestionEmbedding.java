package com.group1.programminglanguagesforum.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.persistence.Entity;
import lombok.*;

import java.util.List;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Document
public class QuestionEmbedding {
    @Id
    private Long id;
    @Field("text")
    private String text;
    @Field("embedding")
    private float[] embedding;
}