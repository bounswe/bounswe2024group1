package com.group1.programminglanguagesforum.Entities;

import jakarta.persistence.*;
import lombok.*;

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
    private String description;
    private String questionBody;
    @Builder.Default
    private Long likeCount =0L;
    @Builder.Default
    private Long commentCount = 0L;
    @Column(name = "CREATED_AT")
    private String date;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User askedBy;
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "question_tags",  // Name of the join table
            joinColumns = @JoinColumn(name = "question_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Vote> votes;
    public Long getUpvoteCount() {
        return votes.stream().filter(Vote::isUpvote).count();
    }
    public Long getDownvoteCount() {
        return votes.stream().filter(vote -> !vote.isUpvote()).count();
    }


}