package com.group1.cuisines.controllers;

import com.group1.cuisines.entities.User;
import com.group1.cuisines.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

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

}
