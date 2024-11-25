package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Requests.CreateQuestionRequestDto;
import com.group1.programminglanguagesforum.DTOs.Requests.UpdateQuestionRequestDto;
import com.group1.programminglanguagesforum.DTOs.Responses.AuthorDto;
import com.group1.programminglanguagesforum.DTOs.Responses.CreateQuestionResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.GetQuestionDetailsResponseDto;
import com.group1.programminglanguagesforum.DTOs.Responses.QuestionSummaryDto;
import com.group1.programminglanguagesforum.DTOs.Responses.TagDto;
import com.group1.programminglanguagesforum.Entities.DifficultyLevel;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.Tag;
import com.group1.programminglanguagesforum.Entities.User;
import com.group1.programminglanguagesforum.Entities.QuestionEmbedding;
import com.group1.programminglanguagesforum.Exceptions.UnauthorizedAccessException;
import com.group1.programminglanguagesforum.Repositories.BookmarkRepository;
import com.group1.programminglanguagesforum.Repositories.QuestionRepository;
import com.group1.programminglanguagesforum.Repositories.EmbeddingRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionService {
        private final QuestionRepository questionRepository;
        private final UserContextService userContextService;
        private final TagService tagService;
        private final BookmarkRepository bookmarkRepository;
        private final EmbeddingRepository embeddingRepository;
        private final EmbeddingService embeddingService;

        public Optional<Question> findById(Long id) {
                return questionRepository.findById(id);
        }

        public CreateQuestionResponseDto createQuestion(CreateQuestionRequestDto dto)
                        throws UnauthorizedAccessException {
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

                createAndStoreEmbedding(question.getId(), question.getTitle(), question.getQuestionBody());

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
                                                .name(question.getAskedBy().getFirstName() + " "
                                                                + question.getAskedBy().getLastName())
                                                .build())
                                .createdAt(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(question.getCreatedAt()))
                                .updatedAt(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(question.getUpdatedAt()))
                                .upvoteCount(question.getUpvoteCount())
                                .downvoteCount(question.getDownvoteCount())
                                .build();

        }

        public Page<Question> searchQuestions(
                        String query,
                        String tagIdsStr,
                        DifficultyLevel difficulty,
                        int page,
                        int pageSize) {

                List<Long> tagIds = null;
                if (tagIdsStr != null && !tagIdsStr.isEmpty()) {
                        tagIds = Arrays.stream(tagIdsStr.split(","))
                                        .map(Long::parseLong)
                                        .collect(Collectors.toList());
                }

                PageRequest pageable = PageRequest.of(page - 1, pageSize);
                return questionRepository.searchQuestions(query, tagIds, difficulty, pageable);
        }

        public QuestionSummaryDto mapToQuestionSummary(Question question) {
                return QuestionSummaryDto.builder()
                                .id(question.getId())
                                .title(question.getTitle())
                                .content(question.getQuestionBody())
                                .difficulty(question.getDifficulty())
                                .upvoteCount(question.getUpvoteCount())
                                .downvoteCount(question.getDownvoteCount())
                                .answerCount((long) question.getAnswers().size())
                                .createdAt(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(question.getCreatedAt()))
                                .author(AuthorDto.builder()
                                                .id(question.getAskedBy().getId())
                                                .username(question.getAskedBy().getUsername())
                                                .name(question.getAskedBy().getFirstName() + " "
                                                                + question.getAskedBy().getLastName())
                                                .reputationPoints(question.getAskedBy().getReputationPoints())
                                                .build())
                                .tags(question.getTags().stream()
                                                .map(tag -> TagDto.builder()
                                                                .id(tag.getId())
                                                                .name(tag.getTagName())
                                                                .build())
                                                .collect(Collectors.toList()))
                                .build();
        }

        public void createAndStoreEmbedding(Long id, String title, String questionBody) {
                String text = title + " " + questionBody;
                float[] embedding = embeddingService.getVectorEmbedding(text);
                QuestionEmbedding questionEmbedding = new QuestionEmbedding();
                questionEmbedding.setId(id);
                questionEmbedding.setText(text);
                questionEmbedding.setEmbedding(embedding);
                embeddingRepository.save(questionEmbedding);
        }
}
