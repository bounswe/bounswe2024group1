package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Responses.*;
import com.group1.programminglanguagesforum.Entities.ProgrammingLanguagesTag;
import com.group1.programminglanguagesforum.Entities.ProgrammingParadigmTag;
import com.group1.programminglanguagesforum.Entities.Tag;
import com.group1.programminglanguagesforum.Entities.TagType;
import com.group1.programminglanguagesforum.Repositories.TagRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;
    private final ModelMapper modelMapper;

    public List<Tag> findAllByIdIn(List<Long> tagIds) {
        return tagRepository.findAllByIdIn(tagIds);
    }
    private TagType getTagType(Tag tag) {
        if (tag instanceof ProgrammingLanguagesTag) {
            return TagType.PROGRAMMING_LANGUAGE;
        } else if (tag instanceof ProgrammingParadigmTag) {
            return TagType.PROGRAMMING_PARADIGM;
        } else {
            throw new IllegalArgumentException("Unknown tag type");
        }
    }
    public GetTagDetailsResponseDto getTagDetails(Long tagId) {
        Optional<Tag> tag = tagRepository.findById(tagId);
        if (tag.isEmpty()) {
            throw new NoSuchElementException("Tag not found");
        }
        Tag tagEntity = tag.get();
        TagType tagType = getTagType(tagEntity);

        if (tagType == TagType.PROGRAMMING_LANGUAGE) {
            ProgrammingLanguagesTag languageTag = (ProgrammingLanguagesTag) tagEntity;
            GetProgrammingLanguageTagResponseDto responseDto = modelMapper.map(languageTag, GetProgrammingLanguageTagResponseDto.class);
            responseDto.setTagType(tagType.toString());
            return responseDto;
        }
        else if (tagType == TagType.PROGRAMMING_PARADIGM) {
            ProgrammingParadigmTag paradigmTag = (ProgrammingParadigmTag) tagEntity;
            GetProgrammingParadigmResponseDto responseDto = modelMapper.map(paradigmTag, GetProgrammingParadigmResponseDto.class);
            responseDto.setTagType(tagType.toString());
            return responseDto;
        }


        return GetTagDetailsResponseDto.builder()
                .tagId(tagEntity.getId())
                .name(tagEntity.getTagName())
                .description(tagEntity.getTagDescription())
                .tagType(getTagType(tagEntity).toString())

                .build();


    }

}
