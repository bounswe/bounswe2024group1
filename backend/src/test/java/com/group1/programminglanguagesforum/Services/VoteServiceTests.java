package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Responses.*;
import com.group1.programminglanguagesforum.Entities.*;
import com.group1.programminglanguagesforum.Exceptions.QuestionAlreadyVotedException;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Repositories.AnswerRepository;
import com.group1.programminglanguagesforum.Repositories.QuestionRepository;
import com.group1.programminglanguagesforum.Repositories.VoteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class VoteServiceTest {

    @InjectMocks
    private VoteService voteService;

    @Mock
    private VoteRepository voteRepository;

    @Mock
    private UserContextService userContextService;

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private AnswerRepository answerRepository;

    private User mockUser;
    private Question mockQuestion;
    private Answer mockAnswer;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        mockUser = new User();
        mockUser.setId(1L);

        mockQuestion = new Question();
        mockQuestion.setId(1L);
        mockQuestion.setLikeCount(0L);
        mockQuestion.setVotes(new ArrayList<>()); // Initialize votes list

        mockAnswer = new Answer();
        mockAnswer.setId(1L);
        mockAnswer.setLikeCount(0L);
        mockAnswer.setDislikeCount(0L);
        mockAnswer.setVotes(new ArrayList<>()); // Initialize votes list
    }

    @Test
    void testUpvoteQuestion() throws UnauthorizedAccessException, QuestionAlreadyVotedException {
        // Arrange
        when(userContextService.getCurrentUser()).thenReturn(mockUser);
        when(questionRepository.findById(1L)).thenReturn(Optional.of(mockQuestion));

        // Mock vote saving
        doAnswer(invocation -> {
            Vote vote = invocation.getArgument(0);
            mockQuestion.getVotes().add(vote); // Simulate adding vote to the question
            return vote;
        }).when(voteRepository).save(any(Vote.class));

        // Act
        QuestionUpvoteResponseDto response = voteService.upvoteQuestion(1L);

        // Assert
        assertNotNull(response, "Response should not be null");
        assertEquals(1L, response.getQuestionId(), "Question ID should match");
        assertEquals(1L, response.getUpvoteCount(), "Upvote count should increment by 1");
        assertEquals(1L, mockQuestion.getLikeCount(), "Like count should be updated in the question");
        assertEquals(1, mockQuestion.getVotes().size(), "Votes list should contain one vote");

        verify(voteRepository, times(1)).save(any(Vote.class));
    }

    @Test
    void testDownvoteQuestion() throws UnauthorizedAccessException, QuestionAlreadyVotedException {
        // Arrange
        when(userContextService.getCurrentUser()).thenReturn(mockUser);
        when(questionRepository.findById(1L)).thenReturn(Optional.of(mockQuestion));

        // Mock vote saving
        doAnswer(invocation -> {
            Vote vote = invocation.getArgument(0);
            mockQuestion.getVotes().add(vote); // Simulate adding vote to the question
            return vote;
        }).when(voteRepository).save(any(Vote.class));

        // Act
        QuestionDownvoteResponseDto response = voteService.downvoteQuestion(1L);

        // Assert
        assertNotNull(response, "Response should not be null");
        assertEquals(1L, response.getQuestionId(), "Question ID should match");
        assertEquals(1L, response.getDownvoteCount(), "Downvote count should increment by 1");
        assertEquals(1, mockQuestion.getVotes().size(), "Votes list should contain one vote");

        verify(voteRepository, times(1)).save(any(Vote.class));
    }

    @Test
    void testRemoveUpvote() throws UnauthorizedAccessException {
        Vote mockVote = new Vote(1L, mockUser, true, mockQuestion, null);
        when(userContextService.getCurrentUser()).thenReturn(mockUser);
        when(questionRepository.findById(1L)).thenReturn(Optional.of(mockQuestion));
        when(voteRepository.findByUserAndQuestionAndIsUpvote(mockUser, mockQuestion, true))
                .thenReturn(Optional.of(mockVote));

        QuestionDeleteUpvoteResponseDto response = voteService.removeUpvote(1L);

        assertNotNull(response, "Response should not be null");
        assertEquals(1L, response.getQuestionId(), "Question ID should match");
        assertEquals(0L, mockQuestion.getLikeCount(), "Like count should decrement after removal");

        verify(voteRepository, times(1)).delete(mockVote);
    }

    // @Test
    // void testUpvoteAnswer() throws Exception {
    // when(userContextService.getCurrentUser()).thenReturn(mockUser);
    // when(answerRepository.findById(1L)).thenReturn(Optional.of(mockAnswer));
    // when(voteRepository.findByUserAndAnswer(mockUser,
    // mockAnswer)).thenReturn(Optional.empty());

    // AnswerVoteResponseDTO response = voteService.upvoteAnswer(1L);

    // assertNotNull(response);
    // assertEquals(1L, response.getAnswerId());
    // assertEquals(1L, response.getUpvoteCount()); // Assuming upvote increments by
    // 1

    // verify(voteRepository, times(1)).save(any(Vote.class));
    // assertEquals(1L, mockAnswer.getLikeCount());
    // }

    // @Test
    // void testDownvoteAnswer() throws Exception {
    // when(userContextService.getCurrentUser()).thenReturn(mockUser);
    // when(answerRepository.findById(1L)).thenReturn(Optional.of(mockAnswer));
    // when(voteRepository.findByUserAndAnswer(mockUser,
    // mockAnswer)).thenReturn(Optional.empty());

    // AnswerVoteResponseDTO response = voteService.downvoteAnswer(1L);

    // assertNotNull(response);
    // assertEquals(1L, response.getAnswerId());
    // assertEquals(1L, response.getDownvoteCount()); // Assuming downvote
    // increments by 1

    // verify(voteRepository, times(1)).save(any(Vote.class));
    // assertEquals(1L, mockAnswer.getDislikeCount());
    // }

    // @Test
    // void testUpvoteAnswerAlreadyVoted() throws UnauthorizedAccessException {
    // Vote mockVote = new Vote(1L, mockUser, true, null, mockAnswer);
    // when(userContextService.getCurrentUser()).thenReturn(mockUser);
    // when(answerRepository.findById(1L)).thenReturn(Optional.of(mockAnswer));
    // when(voteRepository.findByUserAndAnswer(mockUser,
    // mockAnswer)).thenReturn(Optional.of(mockVote));

    // Exception exception = assertThrows(Exception.class, () ->
    // voteService.upvoteAnswer(1L));
    // assertEquals("User has already voted this answer", exception.getMessage());
    // verify(voteRepository, never()).save(any(Vote.class));
    // }
}
