package com.group1.programminglanguagesforum.Services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.group1.programminglanguagesforum.DTOs.Requests.CreateTagRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.GetProgrammingLanguageTagResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.GetProgrammingParadigmResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.GetTagDetailsResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.QuestionSummaryDto;
import com.group1.programminglanguagesforum.DTOs.Responses.SelfProfileResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.TagDto;
import com.group1.programminglanguagesforum.Entities.ComputerScienceTermTag;
import com.group1.programminglanguagesforum.Entities.DifficultyLevel;
import com.group1.programminglanguagesforum.Entities.ProgrammingLanguagesTag;
import com.group1.programminglanguagesforum.Entities.ProgrammingParadigmTag;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.SoftwareLibraryTag;
import com.group1.programminglanguagesforum.Entities.Tag;
import com.group1.programminglanguagesforum.Entities.TagType;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Repositories.QuestionRepository;
import com.group1.programminglanguagesforum.Repositories.TagRepository;
import com.group1.programminglanguagesforum.Repositories.UserRepository;

import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    private final ModelMapper modelMapper;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final UserContextService userContextService;

    public List<Tag> findAllByIdIn(List<Long> tagIds) {
        return tagRepository.findAllByIdIn(tagIds);
    }

    private TagType getTagType(Tag tag) {
        if (tag instanceof ProgrammingLanguagesTag) {
            return TagType.PROGRAMMING_LANGUAGE;
        } else if (tag instanceof ProgrammingParadigmTag) {
            return TagType.PROGRAMMING_PARADIGM;
        } else if (tag instanceof SoftwareLibraryTag) {
            return TagType.SOFTWARE_LIBRARY;
        } else if (tag instanceof ComputerScienceTermTag) {
            return TagType.COMPUTER_SCIENCE_TOPIC;
        } else if (tag != null) {

            return TagType.USER_DEFINED;
        } else {
            throw new IllegalArgumentException("Unknown tag type");
        }

    }

    public GetTagDetailsResponseDto createTag(CreateTagRequestDto dto) {
        Tag tag = new Tag(null, dto.getName(), dto.getDescription());
        Tag savedTag = tagRepository.save(tag); // Use the returned Tag object with the generated ID
        return GetTagDetailsResponseDto.builder()
                .tagId(savedTag.getId()) // Use savedTag.getId() to get the correct ID
                .name(savedTag.getTagName())
                .description(savedTag.getTagDescription())
                .tagType(TagType.USER_DEFINED.toString())
                .build();
    }

    public boolean isTagFollowed(User user, Long tagId) {
        return user.getFollowedTags().stream().anyMatch(t -> t.getId().equals(tagId));
    }

    public GetTagDetailsResponseDto getTagDetails(Long tagId) {
        Optional<Tag> tag = tagRepository.findById(tagId);
        if (tag.isEmpty()) {
            throw new NoSuchElementException("Tag not found");
        }
        Tag tagEntity = tag.get();
        TagType tagType = getTagType(tagEntity);
        List<Question> questions = questionRepository.findQuestionsByDifficultyAndTagId(DifficultyLevel.EASY, tagId);
        List<QuestionSummaryDto> relatedQuestions = questions.stream()
                .map(QuestionService::mapToQuestionSummary)
                .toList();
        Long questionCount = (long) questions.size();

        boolean following = false;
        try {
            // userContextService is null when testing
            if (userContextService != null && userContextService.getCurrentUser() != null) {
                following = isTagFollowed(userContextService.getCurrentUser(), tagId);
            }
        } catch (UnauthorizedAccessException e) {
            following = false;
        }

        Long followerCount = (long) tagEntity.getFollowers().size();

        if (tagType == TagType.PROGRAMMING_LANGUAGE) {
            ProgrammingLanguagesTag languageTag = (ProgrammingLanguagesTag) tagEntity;
            GetProgrammingLanguageTagResponseDto responseDto = modelMapper.map(languageTag,
                    GetProgrammingLanguageTagResponseDto.class);
            responseDto.setTagType(tagType.toString());
            responseDto.setRelatedQuestions(relatedQuestions);
            responseDto.setQuestionCount(questionCount);
            responseDto.setFollowerCount(followerCount);
            responseDto.setFollowing(following);
            return responseDto;
        } else if (tagType == TagType.PROGRAMMING_PARADIGM) {
            ProgrammingParadigmTag paradigmTag = (ProgrammingParadigmTag) tagEntity;
            GetProgrammingParadigmResponseDto responseDto = modelMapper.map(paradigmTag,
                    GetProgrammingParadigmResponseDto.class);
            responseDto.setTagType(tagType.toString());
            responseDto.setRelatedQuestions(relatedQuestions);
            responseDto.setQuestionCount(questionCount);
            responseDto.setFollowerCount(followerCount);
            responseDto.setFollowing(following);
            return responseDto;
        }

        return GetTagDetailsResponseDto.builder()
                .tagId(tagEntity.getId())
                .name(tagEntity.getTagName())
                .description(tagEntity.getTagDescription())
                .tagType(getTagType(tagEntity).toString())
                .relatedQuestions(relatedQuestions)
                .questionCount(questionCount)
                .followerCount(followerCount)
                .following(following)
                .build();

    }

    public List<SelfProfileResponseDto.FollowedTags> getFollowedTags(Long userId) {
        return tagRepository.findTagByFollowers(userId).stream()
                .map(tag -> SelfProfileResponseDto.FollowedTags.builder()
                .id(tag.getId())
                .name(tag.getTagName())
                .tagType(getTagType(tag))
                .description(tag.getTagDescription())
                .build())
                .toList();
    }

    public Page<GetTagDetailsResponseDto> searchTags(String q, Pageable pageable) {
        Page<Tag> tags = tagRepository.findTagsByTagNameContainingIgnoreCase(q, pageable);
        return tags.map(tag -> GetTagDetailsResponseDto.builder()
                .tagId(tag.getId())
                .questionCount((long) questionRepository.findQuestionsByTagId(tag.getId()).size())
                .followerCount((long) tag.getFollowers().size())
                .name(tag.getTagName())
                .description(tag.getTagDescription())
                .tagType(getTagType(tag).toString())
                .build());
    }

    public TagDto followTag(User user, Long tagId) {

        Optional<Tag> tag = tagRepository.findById(tagId);
        if (tag.isEmpty()) {
            throw new NoSuchElementException("Tag not found");
        }

        Tag tagEntity = tag.get();

        if (user.getFollowedTags().stream().anyMatch(t -> t.getId().equals(tagId))) {
            throw new EntityExistsException("User already follows this tag");
        }

        user.getFollowedTags().add(tagEntity);
        userRepository.save(user);

        return TagDto.builder()
                .id(tagEntity.getId())
                .name(tagEntity.getTagName())
                .build();
    }

    public TagDto unfollowTag(User user, Long tagId) {

        Optional<Tag> tag = tagRepository.findById(tagId);
        if (tag.isEmpty()) {
            throw new NoSuchElementException("Tag not found");
        }

        Tag tagEntity = tag.get();

        if (!user.getFollowedTags().stream().anyMatch(t -> t.getId().equals(tagId))) {
            throw new NoSuchElementException("User does not follow this tag");
        }

        user.getFollowedTags().removeIf(t -> t.getId().equals(tagId));
        userRepository.save(user);

        return TagDto.builder()
                .id(tagEntity.getId())
                .name(tagEntity.getTagName())
                .build();
    }

}
