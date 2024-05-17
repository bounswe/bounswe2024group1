package com.group1.cuisines.entities;

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
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    @Column(unique = true)
    private String username;

    private String lastName;
    @Column(unique = true)
    private String email;

    private String password;
    private String Bio;
    private String gender;
    private String profilePicture;

    @ManyToMany
    @JoinTable(
            name = "user_followers",
            joinColumns = @JoinColumn(name = "follower_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> followers = new HashSet<>();

    @ManyToMany(mappedBy = "followers")
    private Set<User> following = new HashSet<>();

    @Builder.Default
    private int followerCount = 0;

    @Builder.Default
    private int followingCount = 0;

    @Builder.Default
    private int recipeCount = 0;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Recipe> recipes = new HashSet<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Bookmark> bookmarks = new HashSet<>();






    private String country;
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
    public String getBio() {
        return Bio;
    }

    public String getCountry() {
        return country;
    }
    public String getEmail() {
        return email;
    }

    @Override
    public String getUsername() {
        return username;
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
