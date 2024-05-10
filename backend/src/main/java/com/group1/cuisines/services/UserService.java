package com.group1.cuisines.services;

import com.group1.cuisines.entities.User;
import com.group1.cuisines.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {

            @Override
            public UserDetails loadUserByUsername(String usernameOrEmail) {
                logger.debug("Attempting to find user by email or username: {}", usernameOrEmail);

                User user = userRepository.findByEmailOrUsername(usernameOrEmail, usernameOrEmail)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found with username or email : " + usernameOrEmail));

                return user;
            }

        };
    }

    public List<User> searchUsers(String searchTerm) {

        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return userRepository.findAll(); // Return all users if no search term is provided
        }
        return userRepository.findByUsernameOrFirstNameOrLastNameContainingIgnoreCase(searchTerm);
    }

    public boolean followUser(Integer userId, Integer followerId) {
        if (userId.equals(followerId)) {
            return false; // Prevent users from following themselves
        }

        User userToBeFollowed = userRepository.findById(userId).orElse(null);
        User followingUser = userRepository.findById(followerId).orElse(null);

        if (userToBeFollowed != null && followingUser != null) {
            // Check if the follow relationship already exists
            if (!followingUser.getFollowing().contains(userToBeFollowed)) {
                followingUser.getFollowing().add(userToBeFollowed);
                userToBeFollowed.getFollowers().add(followingUser); // Ensure bidirectional relationship

                userToBeFollowed.setFollowerCount(userToBeFollowed.getFollowerCount() + 1);
                followingUser.setFollowingCount(followingUser.getFollowingCount() + 1);

                userRepository.save(userToBeFollowed);
                userRepository.save(followingUser);
                return true;
            }
        }
        return false;
    }
    public Set<User> getUserFollowing(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return user.getFollowing(); // Assuming getFollowing() returns a Set<User>
        }
        return Collections.emptySet();
    }
    public boolean unfollowUser(Integer userId, Integer followerId) {
        if (userId.equals(followerId)) {
            return false; // Prevent users from unfollowing themselves
        }

        User userToBeUnfollowed = userRepository.findById(userId).orElse(null);
        User followingUser = userRepository.findById(followerId).orElse(null);

        if (userToBeUnfollowed != null && followingUser != null) {
            // Check if the follow relationship exists
            if (followingUser.getFollowing().contains(userToBeUnfollowed)) {
                followingUser.getFollowing().remove(userToBeUnfollowed);
                userToBeUnfollowed.getFollowers().remove(followingUser);

                userToBeUnfollowed.setFollowerCount(userToBeUnfollowed.getFollowerCount() - 1);
                followingUser.setFollowingCount(followingUser.getFollowingCount() - 1);

                userRepository.save(userToBeUnfollowed);
                userRepository.save(followingUser);
                return true;
            }
        }
        return false;
    }

    public Set<User> getUserFollower(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return user.getFollowers(); // Assuming getFollowing() returns a Set<User>
        }
        return Collections.emptySet();
    }
}
