package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Requests.UserProfileUpdateRequestDto;
import com.group1.programminglanguagesforum.Entities.ExperienceLevel;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Exceptions.UserNotFoundException;
import com.group1.programminglanguagesforum.Repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserContextService userContextService;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getUserById_ShouldReturnUser_WhenUserExists() {
        User user = new User();
        user.setId(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        Optional<User> result = userService.getUserById(1L);

        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getId());
    }

    @Test
    void getUserById_ShouldReturnEmpty_WhenUserDoesNotExist() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<User> result = userService.getUserById(1L);

        assertFalse(result.isPresent());
    }

    @Test
    void updateUser_ShouldUpdateUser_WhenUserExists() throws UserNotFoundException {
        User user = new User();
        user.setId(1L);
        UserProfileUpdateRequestDto updateRequest = new UserProfileUpdateRequestDto("New Bio", "USA", ExperienceLevel.ADVANCED);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);

        User updatedUser = userService.updateUser(user, updateRequest);

        assertEquals("New Bio", updatedUser.getBio());
        assertEquals("USA", updatedUser.getCountry());
        assertEquals("Advanced", updatedUser.getExperienceLevel().toString());
    }

    @Test
    void updateUser_ShouldThrowUserNotFoundException_WhenUserDoesNotExist() {
        User user = new User();
        user.setId(1L);
        UserProfileUpdateRequestDto updateRequest = new UserProfileUpdateRequestDto("New Bio", "USA", ExperienceLevel.ADVANCED);

        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.updateUser(user, updateRequest));
    }

    @Test
    void followUser_ShouldFollowUser_WhenUserExists() throws UserNotFoundException {
        User currentUser = new User();
        currentUser.setId(1L);
        User userToFollow = new User();
        userToFollow.setId(2L);

        when(userRepository.findById(2L)).thenReturn(Optional.of(userToFollow));
        when(userRepository.save(any(User.class))).thenReturn(userToFollow);

        User result = userService.followUser(currentUser, 2L);

        assertTrue(currentUser.getFollowing().contains(userToFollow));
        assertTrue(userToFollow.getFollowers().contains(currentUser));
        assertEquals(1, currentUser.getFollowingCount());
        assertEquals(1, userToFollow.getFollowersCount());
    }

    @Test
    void followUser_ShouldThrowUserNotFoundException_WhenUserDoesNotExist() {
        User currentUser = new User();
        currentUser.setId(1L);

        when(userRepository.findById(2L)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.followUser(currentUser, 2L));
    }

    @Test
    void unfollowUser_ShouldUnfollowUser_WhenUserExists() throws UserNotFoundException {
        User currentUser = new User();
        currentUser.setId(1L);
        User userToUnfollow = new User();
        userToUnfollow.setId(2L);
        currentUser.getFollowing().add(userToUnfollow);
        userToUnfollow.getFollowers().add(currentUser);
        currentUser.setFollowingCount(1);
        userToUnfollow.setFollowersCount(1);

        when(userRepository.findById(2L)).thenReturn(Optional.of(userToUnfollow));
        when(userRepository.save(any(User.class))).thenReturn(userToUnfollow);

        User result = userService.unfollowUser(currentUser, 2L);

        assertFalse(currentUser.getFollowing().contains(userToUnfollow));
        assertFalse(userToUnfollow.getFollowers().contains(currentUser));
        assertEquals(0, currentUser.getFollowingCount());
        assertEquals(0, userToUnfollow.getFollowersCount());
    }

    @Test
    void unfollowUser_ShouldThrowUserNotFoundException_WhenUserDoesNotExist() {
        User currentUser = new User();
        currentUser.setId(1L);

        when(userRepository.findById(2L)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.unfollowUser(currentUser, 2L));
    }

    @Test
    void selfFollowing_ShouldReturnTrue_WhenUserIsFollowing() throws UnauthorizedAccessException {
        User currentUser = new User();
        User userToCheck = new User();
        currentUser.getFollowing().add(userToCheck);

        when(userContextService.getCurrentUser()).thenReturn(currentUser);

        assertTrue(userService.selfFollowing(userToCheck));
    }

    @Test
    void selfFollowing_ShouldReturnFalse_WhenUserIsNotFollowing() throws UnauthorizedAccessException {
        User currentUser = new User();
        User userToCheck = new User();

        when(userContextService.getCurrentUser()).thenReturn(currentUser);

        assertFalse(userService.selfFollowing(userToCheck));
    }

    @Test
    void selfFollowing_ShouldReturnFalse_WhenUnauthorizedAccessExceptionOccurs() throws UnauthorizedAccessException {
        User userToCheck = new User();

        when(userContextService.getCurrentUser()).thenThrow(UnauthorizedAccessException.class);

        assertFalse(userService.selfFollowing(userToCheck));
    }

    @Test
    void getFollowers_ShouldReturnFollowersList() {
        User user = new User();
        user.setId(41L);

        User follower1 = new User();
        follower1.setId(1L);
        follower1.setUsername("username1");
        follower1.setEmail("email1");
        follower1.setFirstName("Follower1");

        User follower2 = new User();
        follower2.setId(2L);
        follower2.setUsername("username2");
        follower2.setEmail("email2");
        follower2.setFirstName("Follower2");

        user.getFollowers().add(follower1);
        user.getFollowers().add(follower2);

        List<User> followers = userService.getFollowers(user);

        assertEquals(2, followers.size());
        assertTrue(followers.contains(follower1));
        assertTrue(followers.contains(follower2));
    }
}
