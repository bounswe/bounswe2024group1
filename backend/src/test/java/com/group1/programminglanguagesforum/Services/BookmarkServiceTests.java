package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Responses.BookmarkQuestionResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.QuestionSummaryDto;
import com.group1.programminglanguagesforum.Entities.Bookmark;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Repositories.BookmarkRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;


class BookmarkServiceTest {

    @InjectMocks
    private BookmarkService bookmarkService;

    @Mock
    private BookmarkRepository bookmarkRepository;

    @Mock
    private UserContextService userContextService;

    @Mock
    private QuestionService questionService;

    @Spy
    private ModelMapper modelMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testBookmarkQuestionSuccess() throws UnauthorizedAccessException {
        Long questionId = 1L;
        User user = new User();
        user.setId(1L);

        Question question = new Question();
        question.setId(questionId);
        question.setTitle("Test Question");

        when(userContextService.getCurrentUser()).thenReturn(user);
        when(questionService.findById(questionId)).thenReturn(Optional.of(question));

        BookmarkQuestionResponseDto response = bookmarkService.bookmarkQuestion(questionId);

        assertEquals(questionId, response.getId());
        assertEquals("Test Question", response.getTitle());
        assertEquals(0, response.getUpvoteCount());
        assertEquals(0, response.getDownvoteCount());

        verify(bookmarkRepository, times(1)).save(any(Bookmark.class));
    }

    @Test
    void testBookmarkQuestionNotFound() throws UnauthorizedAccessException {
        Long questionId = 1L;
        User user = new User();
        user.setId(1L);

        when(userContextService.getCurrentUser()).thenReturn(user);
        when(questionService.findById(questionId)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> bookmarkService.bookmarkQuestion(questionId));

        verify(bookmarkRepository, never()).save(any(Bookmark.class));
    }

    @Test
    void testBookmarkQuestionUnauthorized() throws UnauthorizedAccessException {
        Long questionId = 1L;

        when(userContextService.getCurrentUser()).thenThrow(new UnauthorizedAccessException("Unauthorized access"));

        assertThrows(UnauthorizedAccessException.class, () -> bookmarkService.bookmarkQuestion(questionId));

        verify(bookmarkRepository, never()).save(any(Bookmark.class));
    }

    @Test 
    void testGetBookmarkedQuestionsSuccess() throws UnauthorizedAccessException {
        User user = new User();
        user.setId(1L);

        Question question = new Question();
        question.setId(1L);
        question.setTitle("Test Question");

        Bookmark bookmark = new Bookmark();
        bookmark.setUser(user);
        bookmark.setQuestion(question);

        when(userContextService.getCurrentUser()).thenReturn(user);
        when(bookmarkRepository.findByUser(user)).thenReturn(List.of(bookmark));

        List<QuestionSummaryDto> response = bookmarkService.getBookmarkedQuestions();

        assertEquals(1, response.size());
        assertEquals(1L, response.get(0).getId());
        assertEquals("Test Question", response.get(0).getTitle());

        verify(bookmarkRepository, times(1)).findByUser(user);
    }
    
}
