package com.group1.programminglanguagesforum.Entities;

import jakarta.persistence.*;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "answers")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Builder.Default
    private Long likeCount = 0L;
    @Builder.Default
    private Long dislikeCount = 0L;
    @Lob // Use this annotation to specify that this field can hold a large amount of text
    @Column(name = "answer_body", columnDefinition = "BLOB")
    private String answerBody;
    private String answerDate;
    @ManyToOne(fetch = FetchType.LAZY)  // Fetch lazily for better performance
    @JoinColumn(name = "user_id", nullable = false)  // Foreign key column
    private User answeredBy;  // Field to hold the User who answered


}
