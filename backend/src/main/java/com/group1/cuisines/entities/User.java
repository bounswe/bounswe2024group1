package com.group1.cuisines.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
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
    @Builder.Default
    private int followingCount = 0;

    @Builder.Default
    private int followerCount = 0;

    @Builder.Default
    private int recipeCount = 0;

    private String country;

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
