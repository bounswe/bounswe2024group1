package com.group1.programminglanguagesforum.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    @Lob // Use this annotation to specify that this field can hold a large amount of
         // text
    @Column(name = "answer_body", columnDefinition = "BLOB")
    private String answerBody;
    @ManyToOne(fetch = FetchType.LAZY) // Fetch lazily for better performance
    @JoinColumn(name = "user_id", nullable = false) // Foreign key column
    private User answeredBy; // Field to hold the User who answered
    @OneToMany(mappedBy = "answer", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Vote> votes = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY) // Link answer to a question
    @JoinColumn(name = "question_id", nullable = false) // Foreign key column
    private Question question;
    @Column(name = "CREATED_AT")
    private String createdAt;

    @Column(name = "UPDATED_AT")
    private String updatedAt;

    public Long getUpvoteCount() {
        return votes.stream().filter(Vote::isUpvote).count();
    }

    public Long getDownvoteCount() {
        return votes.stream().filter(vote -> !vote.isUpvote()).count();
    }

    public Long getVoteDifference() {
        return Math.max(this.getUpvoteCount() - this.getDownvoteCount(), 0);
    }

    public Integer getRating() {
        return (int)(this.getUpvoteCount() - this.getDownvoteCount());
    }

    @PrePersist
    public void prePersist() {
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        createdAt = formatter.format(date);
        updatedAt = formatter.format(date);
    }
    @PreUpdate
    public void preUpdate() {
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        updatedAt = formatter.format(date);
    }

}
