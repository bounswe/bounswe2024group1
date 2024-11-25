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
@Getter
@Setter
@Document
public class QuestionEmbedding {
    @Id
    private Long id;
    @Field("tagIds")
    private List<Long> tagIds;
    @Field("embedding")
    private float[] embedding;
}