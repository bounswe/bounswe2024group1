package com.group1.programminglanguagesforum.Config;

import com.group1.programminglanguagesforum.DTOs.Responses.SelfProfileResponseDto;
import com.group1.programminglanguagesforum.Entities.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Define a PropertyMap to skip certain fields
        modelMapper.addMappings(new PropertyMap<SelfProfileResponseDto, User>() {
            @Override
            protected void configure() {
                skip(destination.getPassword());
                skip(destination.getFollowers());
                skip(destination.getFollowing());
            }
        });

        return modelMapper;
    }
}
