package com.group1.programminglanguagesforum.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
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
    private String answerDate;
    @ManyToOne(fetch = FetchType.LAZY) // Fetch lazily for better performance
    @JoinColumn(name = "user_id", nullable = false) // Foreign key column
    private User answeredBy; // Field to hold the User who answered
    @OneToMany(mappedBy = "answer", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Vote> votes = new ArrayList<>();

    public Long getUpvoteCount() {
        return votes.stream().filter(Vote::isUpvote).count();
    }

    public Long getDownvoteCount() {
        return votes.stream().filter(vote -> !vote.isUpvote()).count();
    }

}
