package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Requests.UserProfileUpdateRequestDto;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Exceptions.UserNotFoundException;
import com.group1.programminglanguagesforum.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
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
}
