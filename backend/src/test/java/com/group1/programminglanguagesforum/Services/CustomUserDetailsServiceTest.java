package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class CustomUserDetailsServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CustomUserDetailsService customUserDetailsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void loadUserByUsername_ShouldReturnUserDetails_WhenUserExists() {
        User user = new User();
        user.setId(1L);
        user.setUsername("testUser");
        user.setEmail("test@example.com");
        user.setPassword("password");

        when(userRepository.findByUsernameOrEmail(anyString(), anyString())).thenReturn(Optional.of(user));

        UserDetails userDetails = customUserDetailsService.loadUserByUsername("testUser");

        assertNotNull(userDetails);
        assertEquals("testUser", userDetails.getUsername());
        assertEquals("password", userDetails.getPassword());
    }

    @Test
    void loadUserByUsername_ShouldThrowUsernameNotFoundException_WhenUserDoesNotExist() {
        when(userRepository.findByUsernameOrEmail(anyString(), anyString())).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> customUserDetailsService.loadUserByUsername("nonExistentUser"));
    }
}
