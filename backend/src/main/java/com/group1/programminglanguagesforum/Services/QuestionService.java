package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Requests.CreateQuestionRequestDto;
import com.group1.programminglanguagesforum.DTOs.Requests.UpdateQuestionRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.AuthorDto;
import com.group1.programminglanguagesforum.DTOs.Responses.CreateQuestionResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.GetQuestionDetailsResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.TagDto;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.Tag;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Repositories.BookmarkRepository;
import com.group1.programminglanguagesforum.Repositories.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final UserContextService userContextService;
    private final TagService tagService;
    private final BookmarkRepository bookmarkRepository;

    public Optional<Question> findById(Long id) {
        return questionRepository.findById(id);
    }

    public CreateQuestionResponseDto createQuestion(CreateQuestionRequestDto dto) throws UnauthorizedAccessException {
        List<Long> tagIds = dto.getTagIds();
        Set<Tag> existingTags = new HashSet<>(tagService.findAllByIdIn(tagIds));
        User currentUser = userContextService.getCurrentUser();
        Date date = new Date();
        Question question = Question.builder()
                .title(dto.getTitle())
                .questionBody(dto.getContent())
                .difficulty(dto.getDifficulty())
                .askedBy(currentUser)
                .createdAt(date)
                .updatedAt(date)
                .likeCount(0L)
                .commentCount(0L)
                .tags(existingTags)
                .votes(new ArrayList<>())
                .build();
        questionRepository.save(question);
        List<TagDto> tags = existingTags.stream().map(tag -> TagDto.builder()
                .id(tag.getId())
                .name(tag.getTagName())
                .build()).toList();


        return CreateQuestionResponseDto.builder()
                .id(question.getId())
                .title(question.getTitle())
                .content(question.getQuestionBody())
                .difficulty(question.getDifficulty())
                .tags(tags)
                .author(AuthorDto.builder()
                        .id(currentUser.getId())
                        .username(currentUser.getUsername())
                        .reputationPoints(currentUser.getReputationPoints())
                        .name(currentUser.getFirstName() + " " + currentUser.getLastName())
                        .build())
                .createdAt(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(question.getCreatedAt()))
                .updatedAt(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(question.getUpdatedAt()))
                .upvoteCount(0L)
                .downvoteCount(0L)
                .build();


    }

    public GetQuestionDetailsResponseDto getQuestion(Long id) throws NoSuchElementException {
        Optional<Question> questionOptional = questionRepository.findById(id);
        if (questionOptional.isEmpty()) {
            throw new NoSuchElementException("Question not found");
        }
        Question question = questionOptional.get();
        boolean selfQuestion;
        try {
            User currentUser = userContextService.getCurrentUser();
            selfQuestion = currentUser.getId().equals(question.getAskedBy().getId());
        } catch (UnauthorizedAccessException e) {
            selfQuestion = false;
        }

        boolean isBookmarked;
        try {
            isBookmarked = isBookmarked(id);
        } catch (UnauthorizedAccessException e) {
            isBookmarked = false;
        }

        return GetQuestionDetailsResponseDto.builder()
                .id(question.getId())
                .title(question.getTitle())
                .content(question.getQuestionBody())
                .likeCount(question.getUpvoteCount())
                .dislikeCount(question.getDownvoteCount())
                .commentCount(question.getCommentCount())
                .selfQuestion(selfQuestion)
                .createdAt(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(question.getCreatedAt()))
                .updatedAt(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(question.getUpdatedAt()))
                .author(AuthorDto.builder()
                        .id(question.getAskedBy().getId())
                        .username(question.getAskedBy().getUsername())
                        .reputationPoints(question.getAskedBy().getReputationPoints())
                        .name(question.getAskedBy().getFirstName() + " " + question.getAskedBy().getLastName())
                        .build())
                .rating(0L)
                .tags(question.getTags().stream().map(tag -> TagDto.builder()
                        .id(tag.getId())
                        .name(tag.getTagName())
                        .build()).toList())
                .answerCount((long) question.getAnswers().size())
                .bookmarked(isBookmarked)
                .build();

    }

    private boolean isBookmarked(Long questionId) throws UnauthorizedAccessException {
        User user = userContextService.getCurrentUser();
        Question question = findById(questionId).orElseThrow();
        return bookmarkRepository.existsByUserAndQuestion(user, question);
    }

    public String deleteQuestion(Long id) {
        Optional<Question> questionOptional = questionRepository.findById(id);
        if (questionOptional.isEmpty()) {
            throw new NoSuchElementException("Question not found");
        }
        Question question = questionOptional.get();
        questionRepository.delete(question);
        return "Question deleted successfully";
    }


    public CreateQuestionResponseDto updateQuestion(Long id, UpdateQuestionRequestDto dto) {
        Optional<Question> questionOptional = questionRepository.findById(id);
        if (questionOptional.isEmpty()) {
            throw new NoSuchElementException("Question not found");
        }
        Date date = new Date();
        Question question = questionOptional.get();
        List<Long> tagIds = dto.getTags();
        Set<Tag> existingTags = new HashSet<>(tagService.findAllByIdIn(tagIds));
        question.setTitle(dto.getTitle());
        question.setQuestionBody(dto.getContent());
        question.setTags(existingTags);
        question.setUpdatedAt(date);
        questionRepository.save(question);
        List<TagDto> tags = existingTags.stream().map(tag -> TagDto.builder()
                .id(tag.getId())
                .name(tag.getTagName())
                .build()).toList();
        return CreateQuestionResponseDto.builder()
                .id(question.getId())
                .title(question.getTitle())
                .content(question.getQuestionBody())
                .tags(tags)
                .author(AuthorDto.builder()
                        .id(question.getAskedBy().getId())
                        .username(question.getAskedBy().getUsername())
                        .reputationPoints(question.getAskedBy().getReputationPoints())
                        .name(question.getAskedBy().getFirstName() + " " + question.getAskedBy().getLastName())
                        .build())
                .createdAt(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(question.getCreatedAt()))
                .updatedAt(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(question.getUpdatedAt()))
                .upvoteCount(question.getUpvoteCount())
                .downvoteCount(question.getDownvoteCount())
                .build();



    }
}
