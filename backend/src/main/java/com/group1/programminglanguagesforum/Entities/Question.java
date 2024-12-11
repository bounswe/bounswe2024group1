package com.group1.programminglanguagesforum.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(name = "QUESTION_BODY", columnDefinition = "BLOB")
    private String questionBody;
    @Builder.Default
    private DifficultyLevel difficulty = DifficultyLevel.EASY;
    @Builder.Default
    private Long likeCount = 0L;
    @Builder.Default
    private Long commentCount = 0L;
    @Column(name = "CREATED_AT")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "UPDATED_AT")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User askedBy;
    @ManyToMany( fetch = FetchType.EAGER)
    @JoinTable(name = "question_tags", // Name of the join table
            joinColumns = @JoinColumn(name = "question_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    @Builder.Default
    private Set<Tag> tags = new HashSet<>();
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Vote> votes = new ArrayList<>();

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Answer> answers = new ArrayList<>(); // Mapping to Answer

    public Long getUpvoteCount() {
        return votes.stream().filter(Vote::isUpvote).count();
    }

    public Long getDownvoteCount() {
        return votes.stream().filter(vote -> !vote.isUpvote()).count();
    }
    public Long getVoteDifference() {
        return Math.max(getUpvoteCount() - getDownvoteCount(), 0);
    }

}
