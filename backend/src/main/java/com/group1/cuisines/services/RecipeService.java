package com.group1.cuisines.services;

import com.group1.cuisines.dto.*;
import com.group1.cuisines.entities.*;
import com.group1.cuisines.repositories.*;
import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class RecipeService {
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private IngredientsRepository ingredientRepository;

    @Autowired
    private RecipeRepository recipeRepository;
    @Autowired
    private DishRepository dishRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private BookmarkRepository bookmarkRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UpvoteRepository upvoteRepository;



    public List<RecipeDetailsDto> findRecipes(String sort, String dishId, String cuisineId) {
        List<Recipe> recipes = recipeRepository.findByDishIdAndCuisineIdWithSort(dishId, cuisineId, sort);

        return recipes.stream()
                .map(this::convertToRecipeDetailsDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public RecipeDetailsDto createRecipe(NewRecipeDto newRecipe, String username) throws Exception {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()){
            throw new IllegalStateException("User not found");
        }
        Dish dish;
        if (newRecipe.getDishId() == null) {
            dish = null;
        } else {
            dish = dishRepository.findById(newRecipe.getDishId()).orElse(null);
        }

        Recipe recipe = Recipe.builder()
                .name(newRecipe.getName())
                .description(newRecipe.getDescription())
                .instructions(newRecipe.getInstructions())
                .allergens(newRecipe.getAllergens())
                .prepTime(newRecipe.getPrepTime())
                .cookTime(newRecipe.getCookTime())
                .servingSize(newRecipe.getServingSize())
                .dish(dish)
                .user(user.get())
                .build();



        // Handle ingredients
        for (IngredientsDto ingredientDto : newRecipe.getIngredients()) {
            Ingredient ingredient = Ingredient.builder()
                    .name(ingredientDto.getName())
                    .amount(ingredientDto.getAmount())
                    .recipe(recipe) // Link ingredient to the recipe
                    .build();
            ingredientRepository.save(ingredient);
            recipe.getIngredients().add(ingredient);
        }
        recipe = recipeRepository.save(recipe);
        user.get().setRecipeCount(user.get().getRecipeCount() + 1);

        return convertToRecipeDetailsDto(recipe);

    }

    public boolean deleteRecipe(Integer id, String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()){
            return false;
        }
        Optional<Recipe> recipe = recipeRepository.findById(id);
        if (recipe.isEmpty()){
            return false;
        }
        if (recipe.get().getUser().getId() != user.get().getId()){
            return false;
        }
        user.get().setRecipeCount(user.get().getRecipeCount() - 1);
        recipeRepository.delete(recipe.get());

        return true;
    }

    public boolean rateRecipe(Integer recipeId, String username, Integer ratingValue) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()){
            return false;
        }
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);

        if (user.isPresent() && recipe != null && ratingValue >= 1 && ratingValue <= 5) {
            Rating existingRating = ratingRepository.findByRecipeIdAndUserId(recipeId, user.get().getId()).orElse(null);
            if (existingRating != null) {
                existingRating.setRatingValue(ratingValue);
                ratingRepository.save(existingRating);
            } else {
                Rating rating = new Rating();
                rating.setUser(user.get());
                rating.setRecipe(recipe);
                rating.setRatingValue(ratingValue);
                ratingRepository.save(rating);
            }
            double newAverage = recipeRepository.findAverageByRecipeId(recipeId);
            recipe.setAverageRating(newAverage);
            recipeRepository.save(recipe);
            return true;
        }
        return false;
    }

    public boolean bookmarkRecipe(Integer recipeId, String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null){
            return false;
        }
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
        if (recipe == null){
            return false;
        }
        if (bookmarkRepository.findByUserIdAndRecipeId(user.getId(), recipeId).isPresent()){
            return false;
        }

        Bookmark bookmark = Bookmark.builder()
                .user(user)
                .recipe(recipe)
                .build();
        bookmarkRepository.save(bookmark);

        return true;
    }

    public List<UserDto> getWhoBookmarked(Integer recipeId) {
        return bookmarkRepository.findByRecipeId(recipeId).stream()
                .map(bookmark -> UserDto.builder()
                        .id(bookmark.getUser().getId())
                        .username(bookmark.getUser().getUsername())
                        .firstName(bookmark.getUser().getFirstName())
                        .lastName(bookmark.getUser().getLastName())
                        .recipeCount(bookmark.getUser().getRecipeCount())
                        .followerCount(bookmark.getUser().getFollowers().size())
                        .followingCount(bookmark.getUser().getFollowing().size())
                        .selfFollowing(bookmark.getUser().getFollowing().contains(bookmark.getUser()))
                        .build())
                .collect(Collectors.toList());
    }

    public boolean deleteBookmark(Integer recipeId, String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null){
            return false;
        }
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
        if (recipe == null){
            return false;
        }
        Optional<Bookmark> bookmark = bookmarkRepository.findByUserIdAndRecipeId(user.getId(), recipeId);
        if (bookmark.isEmpty()){
            return false;
        }
        bookmarkRepository.delete(bookmark.get());
        return true;
    }


    public List<CommentsDto> getCommentsByRecipeId(Integer recipeId) {

        return commentRepository.findByRecipeId(recipeId).stream()
                .map(this::convertToCommentsDto)
                .collect(Collectors.toList());
    }

    private CommentsDto convertToCommentsDto(Comment comment) {
        return CommentsDto.builder()
                .id(comment.getId())
                .author(new AuthorDto(comment.getUser().getId(), comment.getUser().getFirstName(), comment.getUser().getUsername(),
                        comment.getUser().getFollowing().size(), comment.getUser().getFollowers().size(), comment.getUser().getRecipeCount()))
                .recipeId(comment.getRecipe().getId())
                .content(comment.getText())
                .createdAt(comment.getCreatedDate())
                .upvoteCount(comment.getUpvoteCount())
                .hasSelfUpvoted(authenticationService.getUser().map(user -> upvoteRepository.findByCommentIdAndUserId(comment.getId(), user.getId()).isPresent()).orElse(false))
                .build();
    }

    @Transactional
    public CommentsDto addComment(Integer recipeId,NewCommentDto newComment, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalStateException("User not found"));
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new IllegalStateException("Recipe not found"));

        Comment comment = Comment.builder()
                .user(user)
                .recipe(recipe)
                .text(newComment.getComment())
                .createdDate(LocalDateTime.now())
                .build();
        comment = commentRepository.save(comment);

        return CommentsDto.builder()
                .id(comment.getId())
                .author(new AuthorDto(user.getId(), user.getFirstName(), user.getUsername(), user.getFollowing().size(), user.getFollowers().size(), user.getRecipeCount()))
                .recipeId(recipe.getId())
                .content(comment.getText())
                .createdAt(comment.getCreatedDate())
                .upvoteCount(0)
                .build();
    }

    public RecipeDetailsDto getRecipeById(Integer recipeId) {
        Optional<Recipe> recipe = recipeRepository.findById(recipeId);
        return recipe.map(this::convertToRecipeDetailsDto).orElse(null);
    }

    public List<RecipeDetailsDto> getRecipesByType(String type, @Nullable String username) {
        if ("explore".equals(type)) {
            return recipeRepository.findAll().stream()
                    .map(this::convertToRecipeDetailsDto)
                    .collect(Collectors.toList());
        } else if ("following".equals(type) && username != null) {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            return user.getFollowing().stream()
                    .flatMap(followingUser -> followingUser.getRecipes().stream())
                    .map(this::convertToRecipeDetailsDto)
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();  // Return an empty list if username is null or other conditions are not met
    }

    public RecipeDetailsDto convertToRecipeDetailsDto(Recipe r) {
        CuisineDto cuisineDto = new CuisineDto();
        if (r.getDish() != null && !r.getDish().getCuisines().isEmpty()) {

            cuisineDto.setId(r.getDish().getCuisines().get(0).getId());
            cuisineDto.setName(r.getDish().getCuisines().get(0).getName());

        }
        else if(r.getDish() != null && r.getDish().getCuisines().isEmpty()){
            cuisineDto.setId("No cuisine Id from wikidata");
            cuisineDto.setName("No cuisine name from wikidata");
        }
        else {
            cuisineDto.setId("No dish Id from wikidata");
            cuisineDto.setName("No dish name from wikidata");
        }

        Optional<User> user = authenticationService.getUser();

        Integer userRating = user.map(User::getId)
                .flatMap(userId -> ratingRepository.findByRecipeIdAndUserId(r.getId(), userId))
                .map(Rating::getRatingValue)
                .orElse(null);

        Boolean selfBookmarked = user.map(User::getId)
                .map(userId -> bookmarkRepository.findByUserIdAndRecipeId(userId, r.getId()).isPresent())
                .orElse(false);

        DishDto dish = null;
        if (r.getDish() != null) {
            dish = new DishDto(r.getDish());
        }

        // Conversion logic here
        return RecipeDetailsDto.builder()
                .id(r.getId())
                .name(r.getName())
                .description(r.getDescription())
                .instructions(r.getInstructions())
                .ingredients(r.getIngredients().stream().map(IngredientsDto::new).collect(Collectors.toList()))
                .allergens(r.getAllergens())
                .cookTime(r.getCookTime())
                .prepTime(r.getPrepTime())
                .servingSize(r.getServingSize())
                .cuisine(cuisineDto)
                .dish(dish)
                .avgRating(r.getAverageRating())
                .ratingsCount(r.getRatings().size())
                .selfRating(userRating)
                .selfBookmarked(selfBookmarked)
                .author(new AuthorDto(r.getUser().getId(), r.getUser().getFirstName() , r.getUser().getUsername(), r.getUser().getFollowing().size(), r.getUser().getFollowers().size(), r.getUser().getRecipeCount()))
                .build();
    }

    @Transactional
    public CommentsDto deleteUpvote(Integer commentId, Integer recipeId, String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return null;
        }

        Optional<Upvote> upvote = upvoteRepository.findByCommentIdAndUserId(commentId, user.getId());
        if (upvote.isEmpty()) {
            return null;
        }

        Comment comment = commentRepository.findById(commentId).orElse(null);
        if (comment == null) {
            return null;
        }

        // Proceed to delete the upvote
        upvoteRepository.delete(upvote.get());
        comment.setUpvoteCount(comment.getUpvoteCount() - 1);
        commentRepository.save(comment);

        return convertToCommentsDto(comment);
    }


    @Transactional
    public UpvoteDto upvote(Integer commentId, String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            throw new IllegalStateException("User not found");
        }

        Comment comment = commentRepository.findById(commentId).orElse(null);
        if (comment == null) {
            throw new IllegalStateException("Comment not found");
        }

        Optional<Upvote> existingUpvote = upvoteRepository.findByCommentIdAndUserId(commentId, user.getId());
        if (existingUpvote.isPresent()) {
            return null;
        }

        Upvote upvote = Upvote.builder()
                .user(user)
                .comment(comment)
                .createdDate(LocalDateTime.now())
                .build();

        upvoteRepository.save(upvote);

        comment.setUpvoteCount(comment.getUpvoteCount()+1);
        comment.getUpvotes().add(upvote);
        commentRepository.save(comment);
        return new UpvoteDto().builder()
                .id(upvote.getId())
                .author(new AuthorDto(comment.getUser().getId(), comment.getUser().getFirstName()+ " " + comment.getUser().getLastName(),
                        comment.getUser().getUsername(), comment.getUser().getFollowers().size(),
                        comment.getUser().getFollowing().size(), comment.getUser().getRecipeCount()))
                .recipeId(comment.getRecipe().getId())
                .upvoteCount(comment.getUpvoteCount())
                .content(comment.getText())
                .createdAt(upvote.getCreatedDate())
                .build();

    }

}
