package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Requests.CreateQuestionRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.CreateQuestionResponseDto;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.Tag;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Repositories.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class QuestionServiceTest {

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private UserContextService userContextService;

    @Mock
    private TagService tagService;

    @InjectMocks
    private QuestionService questionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void findById_ShouldReturnQuestion_WhenFound() {
        Long questionId = 1L;
        Question question = new Question();
        question.setId(questionId);

        when(questionRepository.findById(questionId)).thenReturn(Optional.of(question));

        Optional<Question> result = questionService.findById(questionId);

        assertTrue(result.isPresent());
        assertEquals(questionId, result.get().getId());
        verify(questionRepository, times(1)).findById(questionId);
    }

    @Test
    void findById_ShouldReturnEmpty_WhenNotFound() {
        Long questionId = 1L;

        when(questionRepository.findById(questionId)).thenReturn(Optional.empty());

        Optional<Question> result = questionService.findById(questionId);

        assertTrue(result.isEmpty());
        verify(questionRepository, times(1)).findById(questionId);
    }

    @Test
    void createQuestion_ShouldSaveQuestion_WhenValidRequest() throws UnauthorizedAccessException {
        CreateQuestionRequestDto requestDto = new CreateQuestionRequestDto();
        requestDto.setTitle("Test Title");
        requestDto.setContent("Test Content");
        requestDto.setTagIds(Arrays.asList(1L, 2L));

        User currentUser = new User();
        currentUser.setId(1L);
        currentUser.setUsername("testuser");
        currentUser.setFirstName("Test");
        currentUser.setLastName("User");
        currentUser.setReputationPoints(100L);

        Tag tag1 = new Tag();
        tag1.setId(1L);
        tag1.setTagName("Java");

        Tag tag2 = new Tag();
        tag2.setId(2L);
        tag2.setTagName("Spring");

        when(userContextService.getCurrentUser()).thenReturn(currentUser);
        when(tagService.findAllByIdIn(requestDto.getTagIds())).thenReturn(Arrays.asList(tag1, tag2));
        when(questionRepository.save(any(Question.class))).thenAnswer(invocation -> invocation.getArgument(0));

        CreateQuestionResponseDto responseDto = questionService.createQuestion(requestDto);

        assertNotNull(responseDto);
        assertEquals("Test Title", responseDto.getTitle());
        assertEquals("Test Content", responseDto.getContent());
        assertEquals(2, responseDto.getTags().size());
        verify(userContextService, times(1)).getCurrentUser();
        verify(tagService, times(1)).findAllByIdIn(requestDto.getTagIds());
        verify(questionRepository, times(1)).save(any(Question.class));
    }
}