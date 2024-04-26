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

import java.util.Optional;

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

}
