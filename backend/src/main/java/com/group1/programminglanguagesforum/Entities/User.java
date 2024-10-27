package com.group1.programminglanguagesforum.Entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "USERS")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    @Column(unique = true)
    @NonNull
    private String username;

    private String lastName;
    @Column(unique = true)
    @NonNull
    private String email;
    @Builder.Default
    private String bio = "";

    private String password;
    private String country;
    @Builder.Default
    private Long answerCount = 0L;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "USER_FOLLOWERS",
            joinColumns = @JoinColumn(name = "followed_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id")
    )
    private Set<User> followers = new HashSet<>();
    @ManyToMany(mappedBy = "followers", fetch = FetchType.EAGER)
    private Set<User> following = new HashSet<>();

    @Builder.Default
    private int followersCount = 0;

    @Builder.Default
    private int followingCount = 0;
    @Builder.Default
    private int reputationPoints = 0;
    @OneToMany(mappedBy = "askedBy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();


    @Override
    public int hashCode() {
        return Objects.hash(id);  // Use only the ID for hashCode
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        User other = (User) obj;
        return Objects.equals(id, other.id);  // Compare only IDs for equality
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
