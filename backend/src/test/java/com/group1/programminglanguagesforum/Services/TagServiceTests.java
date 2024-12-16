package com.group1.programminglanguagesforum.Services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import com.group1.programminglanguagesforum.DTOs.Requests.CreateTagRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.GetQuestionWithTagDto;
import com.group1.programminglanguagesforum.DTOs.Responses.GetTagDetailsResponseDto;
import com.group1.programminglanguagesforum.Entities.DifficultyLevel;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.Tag;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Repositories.QuestionRepository;
import com.group1.programminglanguagesforum.Repositories.TagRepository;

class TagServiceTest {

    @InjectMocks
    private TagService tagService;

    @Mock
    private TagRepository tagRepository;

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private ModelMapper modelMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAllByIdIn() {
        List<Long> tagIds = Arrays.asList(1L, 2L, 3L);
        List<Tag> mockTags = Arrays.asList(
                new Tag(null, "Tag1", "Description1"),
                new Tag(null, "Tag2", "Description2"),
                new Tag(null, "Tag3", "Description3"));

        when(tagRepository.findAllByIdIn(tagIds)).thenReturn(mockTags);

        List<Tag> result = tagService.findAllByIdIn(tagIds);

        assertNotNull(result);
        assertEquals(3, result.size());
        verify(tagRepository, times(1)).findAllByIdIn(tagIds);
    }

    @Test
    void testCreateTag() {
        CreateTagRequestDto requestDto = CreateTagRequestDto.builder()
                .name("New Tag")
                .description("Tag description")
                .build();

        // Mock the Tag returned by the repository save method
        Tag savedTag = new Tag(1L, null, "New Tag", "Tag description", null);

        // Mock tagRepository behavior
        when(tagRepository.save(any(Tag.class))).thenReturn(savedTag);

        // Call the service method
        GetTagDetailsResponseDto response = tagService.createTag(requestDto);

        // Assertions
        assertNotNull(response);
        assertEquals(1L, response.getTagId());
        assertEquals("New Tag", response.getName());
        assertEquals("Tag description", response.getDescription());
        assertEquals("User Defined", response.getTagType()); // Adjusted to match the actual value

        // Verify the save method was called
        verify(tagRepository, times(1)).save(any(Tag.class));
    }

    @Test
    void testGetTagDetails_Success() {
        Long tagId = 1L;
        Date mockDate = new Date();

        // Create a mock user with all required fields
        User mockUser = User.builder()
                .id(1L)
                .username("testUser")
                .email("test@example.com") // Add required email
                .firstName("Test")
                .lastName("User")
                .reputationPoints(0L)
                .build();

        Tag mockTag = new Tag(1L, null, "Tag1", "Description1", new HashSet<>());

        Question q1 = Question.builder()
                .id(1L)
                .title("Question1")
                .questionBody("Body1")
                .difficulty(DifficultyLevel.EASY)
                .likeCount(0L)
                .commentCount(0L)
                .createdAt(mockDate)
                .updatedAt(mockDate)
                .askedBy(mockUser)
                .build();

        Question q2 = Question.builder()
                .id(2L)
                .title("Question2")
                .questionBody("Body2")
                .difficulty(DifficultyLevel.MEDIUM)
                .likeCount(0L)
                .commentCount(0L)
                .createdAt(mockDate)
                .updatedAt(mockDate)
                .askedBy(mockUser)
                .build();

        List<Question> mockQuestions = Arrays.asList(q1, q2);

        when(tagRepository.findById(tagId)).thenReturn(Optional.of(mockTag));
        when(questionRepository.findQuestionsByTagId(tagId)).thenReturn(mockQuestions);
        when(questionRepository.findQuestionsByDifficultyAndTagId(DifficultyLevel.EASY, tagId)).thenReturn(mockQuestions);

        // Mocking modelMapper behavior
        when(modelMapper.map(any(Question.class), eq(GetQuestionWithTagDto.class)))
                .thenAnswer(invocation -> {
                    Question question = invocation.getArgument(0);
                    return GetQuestionWithTagDto.builder()
                            .id(question.getId())
                            .title(question.getTitle())
                            .build();
                });

        GetTagDetailsResponseDto response = tagService.getTagDetails(tagId);

        assertNotNull(response);
        assertEquals(tagId, response.getTagId());
        assertEquals("Tag1", response.getName());
        assertEquals("Description1", response.getDescription());
        assertEquals(2, response.getRelatedQuestions().size());
        verify(tagRepository, times(1)).findById(tagId);
        verify(questionRepository, times(1)).findQuestionsByDifficultyAndTagId(DifficultyLevel.EASY, tagId);
    }

    @Test
    void testGetTagDetails_TagNotFound() {
        Long tagId = 1L;

        when(tagRepository.findById(tagId)).thenReturn(Optional.empty());

        Exception exception = assertThrows(NoSuchElementException.class, () -> {
            tagService.getTagDetails(tagId);
        });

        assertEquals("Tag not found", exception.getMessage());
        verify(tagRepository, times(1)).findById(tagId);
        verify(questionRepository, never()).findQuestionsByTagId(tagId);
    }
}
