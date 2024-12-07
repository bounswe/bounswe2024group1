package com.group1.programminglanguagesforum.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "QUESTION_DIFFICULTY_RATE")
public class QuestionDifficultyRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @Enumerated(EnumType.STRING)
    private DifficultyLevel difficulty;
    @Temporal(TemporalType.TIMESTAMP)
    private Date rated_at;


    @PrePersist
    protected void onCreate() {
        rated_at = new Date();
    }
}
