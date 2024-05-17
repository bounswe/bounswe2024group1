package com.group1.cuisines.controllers;
import com.group1.cuisines.dao.response.ErrorResponse;
import com.group1.cuisines.dao.response.SuccessResponse;
import com.group1.cuisines.dto.*;
import com.group1.cuisines.entities.Comment;
import com.group1.cuisines.entities.User;
import com.group1.cuisines.services.AuthenticationService;
import com.group1.cuisines.services.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;
    @Autowired
    private AuthenticationService authenticationService;


    @GetMapping("/recipes/{recipeId}")
    public ResponseEntity<?> getRecipeById(@PathVariable Integer recipeId) {
        RecipeDetailsDto recipeDetails = recipeService.getRecipeById(recipeId);
        if (recipeDetails != null) {
            return ResponseEntity.ok(new SuccessResponse<>(200, recipeDetails, "Recipe fetched successfully"));
        } else {
            return ResponseEntity.ok(new ErrorResponse(200, ""));
        }
    }


    @GetMapping("/recipes")
    public ResponseEntity<?> getRecipes(@RequestParam(required = false) String sort,
                                                      @RequestParam(required = false) String dishId,
                                                      @RequestParam(required = false) String cuisineId) {
        List<RecipeDetailsDto> recipes = recipeService.findRecipes(sort, dishId, cuisineId);
        return ResponseEntity.ok(new SuccessResponse<>(200, recipes, "Recipes fetched successfully"));
    }



    @PostMapping("/recipes")
    public ResponseEntity<?> createRecipe(@RequestBody NewRecipeDto newRecipe) throws Exception{
        String username = authenticationService.getUser().map(User::getUsername).orElse(null);

        // Check if the user is authenticated
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(401, "Authentication required"));
        }

        RecipeDetailsDto recipeDetails = recipeService.createRecipe(newRecipe, username);
        if (recipeDetails != null) {
            return ResponseEntity.ok(new SuccessResponse<>(201, recipeDetails, "Recipe created successfully"));
        } else {
            return ResponseEntity.ok(new ErrorResponse(400, "Failed to create recipe"));
        }
    }
    @DeleteMapping("/recipes/{id}")
    public ResponseEntity<?> deleteRecipe(@PathVariable Integer id) {
        String username = authenticationService.getUser().map(User::getUsername).orElse(null);

        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(401, "Authentication required"));
        }

        if (recipeService.deleteRecipe(id, username)) {
            return ResponseEntity.ok(new SuccessResponse<>(200, "", "Recipe deleted successfully"));
        } else {
            return ResponseEntity.ok(new ErrorResponse(400, "Failed to delete recipe"));
        }
    }
    @PostMapping("/recipes/{recipeId}/rating")
    public ResponseEntity<?> rateRecipe(@PathVariable Integer recipeId, @RequestBody RatingDto ratingDto) {
        String username = authenticationService.getUser().map(User::getUsername).orElse(null);
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(401, "Authentication required"));
        }

        boolean success = recipeService.rateRecipe(recipeId, username, ratingDto.getRating());

        if (success) {
            return ResponseEntity.ok(new SuccessResponse<>(200, "", "Rating added successfully"));
        } else {
            return ResponseEntity.ok(new ErrorResponse(400, "Failed to add rating"));
        }
    }

    @PostMapping("/recipes/{recipeId}/bookmarks")
    public ResponseEntity<?> bookmarkRecipe(@PathVariable Integer recipeId) {
        String username = authenticationService.getUser().map(User::getUsername).orElse(null);
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(401, "Authentication required"));
        }

        boolean success = recipeService.bookmarkRecipe(recipeId, username);

        if (success) {
            return ResponseEntity.ok(new SuccessResponse<>(200, "", "Recipe bookmarked successfully"));
        }
        return ResponseEntity.ok(new ErrorResponse(400, "Failed to bookmark recipe"));
    }

    @GetMapping("/recipes/{recipeId}/bookmarks")
    public ResponseEntity<?> getBookmarks(@PathVariable Integer recipeId) {
        String username = authenticationService.getUser().map(User::getUsername).orElse(null);
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(401, "Authentication required"));
        }

        List<UserDto> whoBookmarked = recipeService.getWhoBookmarked(recipeId);
        return ResponseEntity.ok(new SuccessResponse<>(200, whoBookmarked, "Bookmarks fetched successfully"));
    }

    @DeleteMapping("/recipes/{recipeId}/bookmarks")
    public ResponseEntity<?> deleteBookmark(@PathVariable Integer recipeId) {
        String username = authenticationService.getUser().map(User::getUsername).orElse(null);
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(401, "Authentication required"));
        }

        boolean success = recipeService.deleteBookmark(recipeId, username);

        if (success) {
            return ResponseEntity.ok(new SuccessResponse<>(200, "", "Bookmark deleted successfully"));
        }
        return ResponseEntity.ok(new ErrorResponse(400, "Failed to delete bookmark"));
    }

    @GetMapping("/recipes/{recipeId}/comments")
    public ResponseEntity<?> getComments(@PathVariable Integer recipeId) {
        List<CommentsDto> commentsDto = recipeService.getCommentsByRecipeId(recipeId);
        if (commentsDto.isEmpty()) {
            return ResponseEntity.ok(new ErrorResponse(204, "No comments found"));
        }
        return ResponseEntity.ok(new SuccessResponse<>(200, commentsDto, "Comments fetched successfully"));
    }

    @PostMapping("/recipes/{recipeId}/comments")
    public ResponseEntity<?> createComment(@PathVariable Integer recipeId, @RequestBody NewCommentDto newCommentDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(401, "Authentication required"));
        }

        String username = authentication.getName();

        try {
            CommentsDto commentsDto = recipeService.addComment(recipeId,newCommentDto, username);
            return ResponseEntity.status(HttpStatus.CREATED).body(new SuccessResponse<>(201, commentsDto, "Comment added successfully"));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(400, "Failed to add comment: " + e.getMessage()));
        }
    }


    @DeleteMapping("/recipes/{recipeId}/comments/{commentId}/upvote")
    public ResponseEntity<?> deleteUpvote(@PathVariable Integer commentId, @PathVariable Integer recipeId) {
        String username = authenticationService.getUser().map(User::getUsername).orElse(null);
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(401, "Authentication required"));
        }

        CommentsDto commentsDto = recipeService.deleteUpvote(commentId, recipeId, username);
        if (commentsDto != null) {
            return ResponseEntity.ok(new SuccessResponse<>(200, commentsDto, "Upvote removed successfully"));
        } else {
            return ResponseEntity.ok(new ErrorResponse(400, "Failed to remove upvote"));
        }
    }

        @PostMapping("/recipes/{recipeId}/comments/{commentId}/upvote")
        public ResponseEntity<?> upvoteComment(@PathVariable Integer recipeId, @PathVariable Integer commentId) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || authentication.getPrincipal().equals("anonymousUser")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(401, "Authentication required"));
            }

            String username = authentication.getName();
            try {
                UpvoteDto upvoteDto = recipeService.upvote(commentId, username);
                if(upvoteDto != null)

                    return ResponseEntity.ok(new SuccessResponse<>(200, upvoteDto, "Comment upvoted successfully"));
                else {
                    return ResponseEntity.ok(new ErrorResponse(400, "Failed to upvote comment: "));
                }

            } catch (IllegalStateException e) {
                return ResponseEntity.ok(new ErrorResponse(400, "Failed to upvote comment: " ));
            }
        }
}
