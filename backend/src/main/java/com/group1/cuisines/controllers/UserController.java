package com.group1.cuisines.controllers;

import com.group1.cuisines.entities.User;
import com.group1.cuisines.repositories.UserRepository;
import com.group1.cuisines.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getUserDetails(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails instanceof com.group1.cuisines.entities.User) {
            User user = (User) userDetails;
            Map<String, String> userInfo = new HashMap<>();
            userInfo.put("username", user.getUsername());
            userInfo.put("email", user.getEmail());
            userInfo.put("bio", user.getBio());
            userInfo.put("country", user.getCountry());

            return ResponseEntity.ok(userInfo);
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not authenticated");
    }

    @PostMapping("/{userId}/follow")
    public ResponseEntity<?> followUser(@PathVariable Integer userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication.getPrincipal()=="anonymousUser"){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication required.");
        }

        String username = authentication.getName();

        Integer followerId = userRepository.findUserIdByUsername(username);


        if (followerId == null || userId == null) {
            return ResponseEntity.badRequest().body("Invalid user data");
        }

        boolean result = userService.followUser(userId, followerId);
        if (!result) {
            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body("Already following");
        }
        return ResponseEntity.ok().body("Followed successfully");
    }
    @PostMapping("/{userId}/unfollow")
    public ResponseEntity<?> unfollowUser(@PathVariable Integer userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication.getPrincipal()=="anonymousUser"){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication required.");
        }

        String username = authentication.getName();
        Integer followerId = userRepository.findUserIdByUsername(username);


        if (followerId == null || userId == null) {
            return ResponseEntity.badRequest().body("Invalid user data.");
        }

        boolean result = userService.unfollowUser(userId, followerId);
        if (!result) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Follow relationship does not exist.");
        }
        return ResponseEntity.ok().body("Unfollowed successfully.");
    }

}
