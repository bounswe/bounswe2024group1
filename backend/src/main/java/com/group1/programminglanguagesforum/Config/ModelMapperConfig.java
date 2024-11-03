package com.group1.programminglanguagesforum.Config;

import com.group1.programminglanguagesforum.DTOs.Responses.GetProgrammingLanguageTagResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.GetProgrammingParadigmResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.SelfProfileResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.UserProfileResponseDto;
import com.group1.programminglanguagesforum.Entities.ProgrammingLanguagesTag;
import com.group1.programminglanguagesforum.Entities.ProgrammingParadigmTag;
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
        modelMapper.addMappings(new PropertyMap <UserProfileResponseDto,User>() {
            @Override
            protected void configure() {
                skip(destination.getPassword());
                skip(destination.getFollowers());
                skip(destination.getFollowing());

            }
        });
        modelMapper.addMappings(new PropertyMap<ProgrammingLanguagesTag, GetProgrammingLanguageTagResponseDto>() {
            @Override
            protected void configure() {
                map(source.getId(), destination.getTagId());
                map(source.getTagName(), destination.getName());
                map(source.getTagDescription(), destination.getDescription());
                map(source.getLogoImage(), destination.getLogoImage());
                map(source.getAuthor(), destination.getAuthor());
                map(source.getInceptionYear(), destination.getInceptionYear());
                map(source.getFileExtension(), destination.getFileExtension());
                map(source.getOfficialWebsite(), destination.getOfficialWebsite());
                map(source.getStackExchangeTag(), destination.getStackExchangeTag());
            }
        });

        // Map ProgrammingParadigmTag to GetProgrammingParadigmResponseDto
        modelMapper.addMappings(new PropertyMap<ProgrammingParadigmTag, GetProgrammingParadigmResponseDto>() {
            @Override
            protected void configure() {
                map(source.getId(), destination.getTagId());
                map(source.getTagName(), destination.getName());
                map(source.getTagDescription(), destination.getDescription());
                map(source.getStackExchangeTag(), destination.getStackExchangeTag());
            }
        });

        return modelMapper;
    }
}
