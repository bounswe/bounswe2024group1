package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Requests.CreateTagRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.*;
import com.group1.programminglanguagesforum.Entities.*;
import com.group1.programminglanguagesforum.Repositories.QuestionRepository;
import com.group1.programminglanguagesforum.Repositories.TagRepository;
import com.group1.programminglanguagesforum.Repositories.UserRepository;

import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;
    private final ModelMapper modelMapper;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

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

    public GetTagDetailsResponseDto getTagDetails(Long tagId) {
        Optional<Tag> tag = tagRepository.findById(tagId);
        if (tag.isEmpty()) {
            throw new NoSuchElementException("Tag not found");
        }
        Tag tagEntity = tag.get();
        TagType tagType = getTagType(tagEntity);
        List<Question> questions = questionRepository.findQuestionsByTagId(tagId);
        List<GetQuestionWithTagDto> relatedQuestions = questions.stream()
                .map(question -> modelMapper.map(question, GetQuestionWithTagDto.class))
                .toList();
        Long questionCount = (long) questions.size();

        if (tagType == TagType.PROGRAMMING_LANGUAGE) {
            ProgrammingLanguagesTag languageTag = (ProgrammingLanguagesTag) tagEntity;
            GetProgrammingLanguageTagResponseDto responseDto = modelMapper.map(languageTag,
                    GetProgrammingLanguageTagResponseDto.class);
            responseDto.setTagType(tagType.toString());
            responseDto.setRelatedQuestions(relatedQuestions);
            responseDto.setQuestionCount(questionCount);
            return responseDto;
        } else if (tagType == TagType.PROGRAMMING_PARADIGM) {
            ProgrammingParadigmTag paradigmTag = (ProgrammingParadigmTag) tagEntity;
            GetProgrammingParadigmResponseDto responseDto = modelMapper.map(paradigmTag,
                    GetProgrammingParadigmResponseDto.class);
            responseDto.setTagType(tagType.toString());
            responseDto.setRelatedQuestions(relatedQuestions);
            responseDto.setQuestionCount(questionCount);
            return responseDto;
        }

        return GetTagDetailsResponseDto.builder()
                .tagId(tagEntity.getId())
                .name(tagEntity.getTagName())
                .description(tagEntity.getTagDescription())
                .tagType(getTagType(tagEntity).toString())
                .relatedQuestions(relatedQuestions)
                .questionCount(questionCount)

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
