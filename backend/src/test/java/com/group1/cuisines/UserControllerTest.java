package com.group1.cuisines;

import com.group1.cuisines.controllers.UserController;
import com.group1.cuisines.dao.response.ErrorResponse;
import com.group1.cuisines.dao.response.SuccessResponse;
import com.group1.cuisines.dto.UserDto;
import com.group1.cuisines.dto.UserProfileDto;
import com.group1.cuisines.entities.User;
import com.group1.cuisines.repositories.UserRepository;
import com.group1.cuisines.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;
import java.util.Set;
import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private Authentication authentication;

    @Mock
    private UserDetails userDetails;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetUserById_UserFound() {
        Integer userId = 1;
        String currentUsername = "testUser";
        UserProfileDto userProfileDto = new UserProfileDto();
        when(authentication.getName()).thenReturn(currentUsername);
        when(userService.getUserProfileById(userId, currentUsername)).thenReturn(userProfileDto);

        ResponseEntity<?> response = userController.getUserById(userId, authentication);

        assertEquals(200, ((SuccessResponse<?>) response.getBody()).getStatus());
        verify(userService).getUserProfileById(userId, currentUsername);
    }

    @Test
    void testGetUserById_UserNotFound() {
        Integer userId = 1;
        String currentUsername = "testUser";
        when(authentication.getName()).thenReturn(currentUsername);
        when(userService.getUserProfileById(userId, currentUsername)).thenThrow(new EntityNotFoundException());

        ResponseEntity<?> response = userController.getUserById(userId, authentication);

        assertEquals(204, ((ErrorResponse) response.getBody()).getStatus());
        verify(userService).getUserProfileById(userId, currentUsername);
    }

    @Test
    void testGetUserDetails_UserFound() {
        String username = "testUser";
        User user = new User();
        user.setId(1);
        when(userDetails.getUsername()).thenReturn(username);
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        UserProfileDto userProfileDto = new UserProfileDto();
        when(userService.getUserProfileById(user.getId(), username)).thenReturn(userProfileDto);

        ResponseEntity<?> response = userController.getUserDetails(userDetails);

        assertEquals(200, ((SuccessResponse<?>) response.getBody()).getStatus());
        verify(userRepository).findByUsername(username);
        verify(userService).getUserProfileById(user.getId(), username);
    }

    @Test
    void testGetUserDetails_UserNotFound() {
        String username = "testUser";
        when(userDetails.getUsername()).thenReturn(username);
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        ResponseEntity<?> response = userController.getUserDetails(userDetails);

        assertEquals(401, ((ErrorResponse) response.getBody()).getStatus());
        verify(userRepository).findByUsername(username);
    }

    @Test
    void testUnfollowUser_Success() {
        Integer userId = 2;
        String username = "testUser";
        Integer followerId = 1;
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(username);
        when(userRepository.findUserIdByUsername(username)).thenReturn(followerId);
        when(userService.unfollowUser(userId, followerId)).thenReturn(true);
        UserProfileDto userProfileDto = new UserProfileDto();
        when(userService.getUserProfileDtoById(userId)).thenReturn(userProfileDto);

        SecurityContextHolder.setContext(securityContext);

        ResponseEntity<?> response = userController.unfollowUser(userId);

        assertEquals(200, ((SuccessResponse<?>) response.getBody()).getStatus());
        verify(userRepository).findUserIdByUsername(username);
        verify(userService).unfollowUser(userId, followerId);
        verify(userService).getUserProfileDtoById(userId);
    }

    @Test
    void testUnfollowUser_UserNotFound() {
        Integer userId = 2;
        String username = "testUser";
        Integer followerId = 1;
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(username);
        when(userRepository.findUserIdByUsername(username)).thenReturn(followerId);
        when(userService.unfollowUser(userId, followerId)).thenReturn(false);

        SecurityContextHolder.setContext(securityContext);

        ResponseEntity<?> response = userController.unfollowUser(userId);

        assertEquals(209, ((ErrorResponse) response.getBody()).getStatus());
        verify(userRepository).findUserIdByUsername(username);
        verify(userService).unfollowUser(userId, followerId);
    }

    @Test
    void testFollowUser_Success() {
        Integer userId = 2;
        String username = "testUser";
        Integer followerId = 1;
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(username);
        when(userRepository.findUserIdByUsername(username)).thenReturn(followerId);
        when(userService.followUser(userId, followerId)).thenReturn(true);
        UserProfileDto userProfileDto = new UserProfileDto();
        when(userService.getUserProfileDtoById(userId)).thenReturn(userProfileDto);

        SecurityContextHolder.setContext(securityContext);

        ResponseEntity<?> response = userController.followUser(userId);

        assertEquals(200, ((SuccessResponse<?>) response.getBody()).getStatus());
        verify(userRepository).findUserIdByUsername(username);
        verify(userService).followUser(userId, followerId);
        verify(userService).getUserProfileDtoById(userId);
    }

    @Test
    void testFollowUser_AlreadyFollowing() {
        Integer userId = 2;
        String username = "testUser";
        Integer followerId = 1;
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(username);
        when(userRepository.findUserIdByUsername(username)).thenReturn(followerId);
        when(userService.followUser(userId, followerId)).thenReturn(false);

        SecurityContextHolder.setContext(securityContext);

        ResponseEntity<?> response = userController.followUser(userId);

        assertEquals(209, ((ErrorResponse) response.getBody()).getStatus());
        verify(userRepository).findUserIdByUsername(username);
        verify(userService).followUser(userId, followerId);
    }

    @Test
    void testGetUserFollowing_Success() {
        Integer userId = 1;
        Set<User> followingUsers = new HashSet<>();
        User user = new User();
        user.setId(2);
        followingUsers.add(user);

        when(userService.getUserFollowing(userId)).thenReturn(followingUsers);
        when(userRepository.findById(userId)).thenReturn(Optional.of(new User()));

        ResponseEntity<?> response = userController.getUserFollowing(userId);

        assertEquals(200, ((SuccessResponse<?>) response.getBody()).getStatus());
        verify(userService).getUserFollowing(userId);
    }

    @Test
    void testGetUserFollowers_Success() {
        Integer userId = 1;
        Set<User> followerUsers = new HashSet<>();
        User user = new User();
        user.setId(2);
        followerUsers.add(user);

        when(userService.getUserFollower(userId)).thenReturn(followerUsers);
        when(userRepository.findById(userId)).thenReturn(Optional.of(new User()));

        ResponseEntity<?> response = userController.getUserFollowers(userId);

        assertEquals(200, ((SuccessResponse<?>) response.getBody()).getStatus());
        verify(userService).getUserFollower(userId);
    }

}
