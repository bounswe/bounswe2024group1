package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Responses.GenericApiResponse;
import com.group1.programminglanguagesforum.DTOs.Responses.SelfProfileResponseDto;
import com.group1.programminglanguagesforum.Entities.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserContextService {
    private final ModelMapper modelMapper;
    public GenericApiResponse<SelfProfileResponseDto> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal() == null || authentication.getPrincipal().equals("anonymousUser")) {
            return GenericApiResponse.<SelfProfileResponseDto>builder()
                    .status(401)
                    .message("Unauthorized access to this resource")
                    .build();
        }
        Object principal = authentication.getPrincipal();

        if (principal instanceof User user) { // Cast the principal to User
            SelfProfileResponseDto selfProfileResponseDto = modelMapper.map(user, SelfProfileResponseDto.class);
            return GenericApiResponse.<SelfProfileResponseDto>builder()
                    .status(200)
                    .message("User retrieved successfully")
                    .data(selfProfileResponseDto)
                    .build();
        } else {
            return GenericApiResponse.<SelfProfileResponseDto>builder()
                    .status(500)
                    .message("Unexpected authentication principal type")
                    .build();
        }
    }
}
