package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Requests.UserProfileUpdateRequestDto;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Exceptions.UserNotFoundException;
import com.group1.programminglanguagesforum.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserContextService userContextService;

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    public User updateUser(User user, UserProfileUpdateRequestDto userProfileUpdateRequestDto) throws UserNotFoundException {
        Optional<User> userOptional = userRepository.findById(user.getId());
        if (userOptional.isEmpty()) {
           throw new UserNotFoundException("User not found");
        }
        user.setBio(userProfileUpdateRequestDto.getBio());
        user.setCountry(userProfileUpdateRequestDto.getCountry());
        return userRepository.save(user);
    }
    @Transactional
    public User followUser(User user, Long id) throws UserNotFoundException {
        Optional<User> userToFollowOptional = userRepository.findById(id);
        if (userToFollowOptional.isEmpty()) {
            throw new UserNotFoundException("User not found");
        }
        if(user.getId().equals(id)) {
            throw new UserNotFoundException("You can't follow yourself");
        }
        User userToFollow = userToFollowOptional.get();
        user.getFollowing().add(userToFollow);
        user.setFollowingCount(user.getFollowingCount() + 1);
        userRepository.save(user);
        userToFollow.getFollowers().add(user);
        userToFollow.setFollowersCount(userToFollow.getFollowersCount() + 1);
        return userRepository.save(userToFollow);
    }
    @Transactional
    public User unfollowUser(User user, Long id) throws UserNotFoundException {
        Optional<User> userToUnfollowOptional = userRepository.findById(id);
        if (userToUnfollowOptional.isEmpty()) {
            throw new UserNotFoundException("User not found");
        }
        User userToUnfollow = userToUnfollowOptional.get();
        user.getFollowing().remove(userToUnfollow);
        user.setFollowingCount(user.getFollowingCount() - 1);
        userRepository.save(user);
        userToUnfollow.getFollowers().remove(user);
        userToUnfollow.setFollowersCount(userToUnfollow.getFollowersCount() - 1);
        return userRepository.save(userToUnfollow);
    }

    public boolean selfFollowing(User userToCheck) {
        try {
            return userContextService.getCurrentUser().getFollowing().contains(userToCheck);
        } catch (UnauthorizedAccessException e) {
            return false;
        }
    }

    public List<User> getFollowers(User user) {
        return user.getFollowers().stream().toList();
    }

}
