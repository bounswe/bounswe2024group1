package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Responses.BookmarkQuestionResponseDto;
import com.group1.programminglanguagesforum.Entities.Bookmark;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Repositories.BookmarkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;
    private final UserContextService userContextService;
    private final QuestionService questionService;
    public BookmarkQuestionResponseDto bookmarkQuestion(Long questionId) throws UnauthorizedAccessException {
        User user = userContextService.getCurrentUser();
        Optional<Question> question = questionService.findById(questionId);
        Question questionEntity = question.orElseThrow();
        Bookmark bookmark = Bookmark.builder()
                .user(user)
                .question(questionEntity)
                .bookmarked_at(new Date())
                .build();
        bookmarkRepository.save(bookmark);
        return BookmarkQuestionResponseDto.builder()
                .id(questionEntity.getId())
                .title(questionEntity.getTitle())
                .upvoteCount(questionEntity.getUpvoteCount())
                .downvoteCount(questionEntity.getDownvoteCount())
                .build();


    }
}
