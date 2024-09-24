package com.group1.cuisines.controllers;

import com.group1.cuisines.dao.response.ErrorResponse;
import com.group1.cuisines.dao.response.SuccessResponse;
import com.group1.cuisines.dto.UserDto;
import com.group1.cuisines.dto.UserProfileDto;
import com.group1.cuisines.dto.UserUpdateFormDto;
import com.group1.cuisines.entities.User;
import com.group1.cuisines.repositories.UserRepository;
import com.group1.cuisines.services.UserService;
import com.sun.security.auth.UserPrincipal;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;


    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Integer userId, Authentication authentication) {
        String currentUsername = authentication != null ? authentication.getName() : null;
        try {
            UserProfileDto userProfile = userService.getUserProfileById(userId, currentUsername);
            return ResponseEntity.ok(new SuccessResponse<>(200, userProfile, "User profile fetched successfully"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.ok(new ErrorResponse(204, "User not found"));
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Integer userId, @RequestBody UserUpdateFormDto userUpdateFormDto) {
        if (userId == null || userUpdateFormDto == null) {
            return ResponseEntity.ok(new ErrorResponse(204,"Invalid user data"));
        }
        try {
            UserProfileDto updatedUser = userService.updateUserProfile(userId, userUpdateFormDto);
            return ResponseEntity.ok(new SuccessResponse<>(200, updatedUser, "User updated successfully"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.ok(new ErrorResponse(204, "User not found"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserDetails(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            User user = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
            if (user != null) {
                UserProfileDto userProfile = userService.getUserProfileById(user.getId(), userDetails.getUsername());
                return ResponseEntity.ok(new SuccessResponse<>(200, userProfile, "User profile fetched successfully"));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(401,"Authentication required")  );
    }

    @DeleteMapping("/{userId}/follow")
    public ResponseEntity<?> unfollowUser(@PathVariable Integer userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication.getPrincipal()=="anonymousUser"){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(401,"Authentication required")  );
        }

        String username = authentication.getName();
        Integer followerId = userRepository.findUserIdByUsername(username);



        if (followerId == null || userId == null) {
            return ResponseEntity.ok(new ErrorResponse(204,"Invalid user data"));
        }
        if (userId.equals(followerId)) {
            return ResponseEntity.badRequest().body(new ErrorResponse(400, "Cannot unfollow yourself"));
        }

        boolean result = userService.unfollowUser(userId, followerId);
        if (!result) {

            return ResponseEntity.ok(new ErrorResponse(209,"Follow relationship does not exist"));
        }

        UserProfileDto followedUserDto = userService.getUserProfileDtoById(userId);

        if (followedUserDto == null) {
            return ResponseEntity.ok(new ErrorResponse(404, "User not found"));
        }
        followedUserDto.setSelfFollowing(false);
        return ResponseEntity.ok(new SuccessResponse<>(200,followedUserDto,"Unfollowed successfully"));
    }

    @PostMapping("/{userId}/follow")
    public ResponseEntity<?> followUser(@PathVariable Integer userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication.getPrincipal()=="anonymousUser"){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(401,"Authentication required")  );

        }

        String username = authentication.getName();

        Integer followerId = userRepository.findUserIdByUsername(username);



        if (followerId == null || userId == null) {

            return ResponseEntity.ok(new ErrorResponse(204,"Invalid user data"));
        }
        if (userId.equals(followerId)) {
            return ResponseEntity.badRequest().body(new ErrorResponse(400, "Cannot follow yourself"));
        }

        boolean result = userService.followUser(userId, followerId);
        if (!result) {

            return ResponseEntity.ok(new ErrorResponse(209,"Already following"));
        }
        UserProfileDto followedUserDto = userService.getUserProfileDtoById(userId);
        if (followedUserDto == null) {
            return ResponseEntity.ok(new ErrorResponse(404, "User not found"));
        }
        followedUserDto.setSelfFollowing(true);

        return ResponseEntity.ok(new SuccessResponse<>(200,followedUserDto,"Followed successfully"));
    }
    @GetMapping("/{userId}/following")
    public ResponseEntity<?> getUserFollowing(@PathVariable Integer userId) {
        // Validate the provided user ID
        if (userId == null) {

            return ResponseEntity.ok(new ErrorResponse(204,"Invalid user ID provided")  );
        }
        if(userRepository.findById(userId).isEmpty()){
            return ResponseEntity.ok(new ErrorResponse(204,"User not found")  );
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer currentUserId = null;
        if (authentication.getPrincipal()!="anonymousUser" && authentication != null && authentication.isAuthenticated()) {
            currentUserId = ((User) authentication.getPrincipal()).getId();
        }
        else{
            currentUserId=null;
        }

        Set<User> following = userService.getUserFollowing(userId);
        if (following.isEmpty()) {
            return ResponseEntity.ok(new ErrorResponse(204,"User is not following anyone"));
        } else {
            Integer finalCurrentUserId = currentUserId;
            Set<UserDto> followingDto = following.stream()
                    .map(user -> UserDto.builder()
                            .id(user.getId())
                            .username(user.getUsername())
                            .firstName(user.getFirstName())
                            .lastName(user.getLastName())
                            .selfFollowing(userService.isFollowing(finalCurrentUserId, user.getId()))
                            .followerCount(user.getFollowerCount())
                            .followingCount(user.getFollowingCount())
                            .recipeCount(user.getRecipeCount())
                            .build())
                    .collect(Collectors.toSet());
            return ResponseEntity.ok(new SuccessResponse<>(200,followingDto, "User following fetched successfully"));
        }
    }
    @GetMapping("/{userId}/followers")
    public ResponseEntity<?> getUserFollowers(@PathVariable Integer userId) {
        // Validate the provided user ID
        if (userId == null) {

            return ResponseEntity.ok(new ErrorResponse(204,"Invalid user ID provided")  );
        }
        if(userRepository.findById(userId).isEmpty()){
            return ResponseEntity.ok(new ErrorResponse(204,"User not found")  );
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer currentUserId = null;
        if (authentication.getPrincipal()!="anonymousUser" && authentication != null && authentication.isAuthenticated()) {
            currentUserId = ((User) authentication.getPrincipal()).getId();
        }
        else{
            currentUserId=null;
        }



        Set<User> followers = userService.getUserFollower(userId);
        if (followers.isEmpty()) {
            return ResponseEntity.ok(new ErrorResponse(204,"User is not followed by anyone"));
        } else {
            Integer finalCurrentUserId = currentUserId;
            Set<UserDto> followingDto = followers.stream()
                    .map(user -> UserDto.builder()
                            .id(user.getId())
                            .username(user.getUsername())
                            .firstName(user.getFirstName())
                            .lastName(user.getLastName())
                            .selfFollowing(userService.isFollowing(finalCurrentUserId, user.getId()))
                            .followerCount(user.getFollowerCount())
                            .followingCount(user.getFollowingCount())
                            .recipeCount(user.getRecipeCount())
                            .build())
                    .collect(Collectors.toSet());
            return ResponseEntity.ok(new SuccessResponse<>(200,followingDto, "User followers fetched successfully"));
        }
    }


}
