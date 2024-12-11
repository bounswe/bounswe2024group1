package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Responses.BookmarkQuestionResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.QuestionSummaryDto;
import com.group1.programminglanguagesforum.Entities.Bookmark;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Repositories.BookmarkRepository;

import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;
    private final UserContextService userContextService;
    private final QuestionService questionService;
    private final ModelMapper modelMapper;

    public BookmarkQuestionResponseDto bookmarkQuestion(Long questionId) throws UnauthorizedAccessException {
        User user = userContextService.getCurrentUser();
        
        Optional<Question> question = questionService.findById(questionId);
        Question questionEntity = question.orElseThrow(() -> new NoSuchElementException("Question not found"));

        bookmarkRepository.findByUserAndQuestion(user, questionEntity).ifPresent(bookmark -> {
            throw new EntityExistsException("Question already bookmarked");
        });
        
        Bookmark bookmark = Bookmark.builder()
                .user(user)
                .question(questionEntity)
                .bookmarked_at(new Date())
                .build();

        bookmarkRepository.save(bookmark);

        return modelMapper.map(questionEntity, BookmarkQuestionResponseDto.class);
    }

    public BookmarkQuestionResponseDto removeBookmark(Long questionId) throws UnauthorizedAccessException {
        User user = userContextService.getCurrentUser();
        Question question = questionService.findById(questionId).orElseThrow(() -> new NoSuchElementException("Question not found"));
        Bookmark bookmark = bookmarkRepository.findByUserAndQuestion(user, question).orElseThrow(() -> new NoSuchElementException("Bookmark not found"));

        bookmarkRepository.delete(bookmark);

        return modelMapper.map(question, BookmarkQuestionResponseDto.class);
    }

    public List<QuestionSummaryDto> getBookmarkedQuestions() throws UnauthorizedAccessException {
        User user = userContextService.getCurrentUser();
        
        List<Bookmark> bookmarks = bookmarkRepository.findByUser(user);
        
        return bookmarks.stream()
            .map(bookmark -> modelMapper.map(bookmark.getQuestion(), QuestionSummaryDto.class))
            .toList();
    }

}
