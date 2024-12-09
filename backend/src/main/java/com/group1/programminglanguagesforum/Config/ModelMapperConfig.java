package com.group1.programminglanguagesforum.Config;

import com.group1.programminglanguagesforum.DTOs.Responses.*;
import com.group1.programminglanguagesforum.Entities.ProgrammingLanguagesTag;
import com.group1.programminglanguagesforum.Entities.ProgrammingParadigmTag;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.text.SimpleDateFormat;

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
        modelMapper.addMappings(new PropertyMap<User, SelfProfileResponseDto>() {
            @Override
            protected void configure() {
                skip(destination.getQuestions());
                skip(destination.getAnswers());
                map(source.getReputationPoints(), destination.getReputationPoints());
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
        modelMapper.addMappings(new PropertyMap <User,UserProfileResponseDto>() {
            @Override
            protected void configure() {
                skip(destination.getFollowedTags());
                map(source.getReputationPoints(), destination.getReputationPoints());

            }
        });
        modelMapper.addMappings(new PropertyMap<Question, GetQuestionWithTagDto>() {
            @Override
            protected void configure() {
                map(source.getQuestionBody(), destination.getContent());
            }
        });
        modelMapper.addMappings(new PropertyMap< GetQuestionWithTagDto,Question>() {
            @Override
            protected void configure() {
                skip(destination.getTags());
                skip(destination.getVotes());
                skip(destination.getAskedBy());
                map(source.getContent(), destination.getQuestionBody());
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

        modelMapper.addMappings(new PropertyMap<User, AuthorDto>() {
            @Override
            protected void configure() {
                map(source.getId(), destination.getId());
                map(source.getUsername(), destination.getUsername());
                map(source.getReputationPoints(), destination.getReputationPoints());
        
                using(context -> {
                    User user = (User) context.getSource();
                    String firstName = user.getFirstName() != null ? user.getFirstName() : "";
                    String lastName = user.getLastName() != null ? user.getLastName() : "";
                    return (firstName + " " + lastName).trim();
                }).map(source, destination.getName());
        
                map().setProfilePicture(null); // Set a default value for profile picture
            }
        });
        

        modelMapper.addMappings(new PropertyMap<Question, QuestionSummaryDto>() {
            @Override
            protected void configure() {
                map(source.getId(), destination.getId());
                map(source.getTitle(), destination.getTitle());
                map(source.getQuestionBody(), destination.getContent());
                map(source.getDifficulty(), destination.getDifficulty());
                map(source.getUpvoteCount(), destination.getUpvoteCount());
                map(source.getDownvoteCount(), destination.getDownvoteCount());
                map(source.getCommentCount(), destination.getAnswerCount());
                using(context -> modelMapper.map(context.getSource(), AuthorDto.class))
                    .map(source.getAskedBy(), destination.getAuthor());
                map(source.getTags(), destination.getTags());

            }
        });

        modelMapper.addMappings(new PropertyMap<Question, BookmarkQuestionResponseDto>() {
            @Override
            protected void configure() {
                map(source.getId(), destination.getId());
                map(source.getTitle(), destination.getTitle());
                map(source.getUpvoteCount(), destination.getUpvoteCount());
                map(source.getDownvoteCount(), destination.getDownvoteCount());
            }
        });



        return modelMapper;
    }
}
