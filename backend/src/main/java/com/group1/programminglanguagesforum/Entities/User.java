package com.group1.programminglanguagesforum.Entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name="USERS")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    @Column(unique = true)
    private String username;

    private String lastName;
    @Column(unique = true)
    private String email;

    private String password;
    private String country;

    @ManyToMany
    @JoinTable(
            name = "USER_FOLLOWERS",
            joinColumns = @JoinColumn(name = "follower_id"),
            inverseJoinColumns = @JoinColumn(name = "followed_id")
    )
    @Builder.Default
    private Set<User> followers = new HashSet<>();
    @Builder.Default
    @ManyToMany(mappedBy = "followers")
    private Set<User> following = new HashSet<>();

    @Builder.Default
    private int followerCount = 0;

    @Builder.Default
    private int followingCount = 0;
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
