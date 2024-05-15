package com.group1.cuisines.services;

import com.group1.cuisines.dto.*;
import com.group1.cuisines.entities.Bookmark;
import com.group1.cuisines.entities.Recipe;
import com.group1.cuisines.entities.User;
import com.group1.cuisines.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    @Autowired
    private final RecipeService recipeService;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public List<User> searchUsers(String searchTerm) {

        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return userRepository.findAll(); // Return all users if no search term is provided
        }
        return userRepository.findByUsernameOrFirstNameOrLastNameContainingIgnoreCase(searchTerm);
    }

    public boolean followUser(Integer userId, Integer followerId) {
        if (userId.equals(followerId)) {
            return false; // Prevent users from following themselves
        }

        User userToBeFollowed = userRepository.findById(userId).orElse(null);
        User followingUser = userRepository.findById(followerId).orElse(null);

        if (userToBeFollowed != null && followingUser != null) {
            // Check if the follow relationship already exists
            if (!followingUser.getFollowing().contains(userToBeFollowed)) {
                followingUser.getFollowing().add(userToBeFollowed);
                userToBeFollowed.getFollowers().add(followingUser); // Ensure bidirectional relationship

                userToBeFollowed.setFollowerCount(userToBeFollowed.getFollowerCount() + 1);
                followingUser.setFollowingCount(followingUser.getFollowingCount() + 1);

                userRepository.save(userToBeFollowed);
                userRepository.save(followingUser);
                return true;
            }
        }
        return false;
    }
    public boolean isFollowing(Integer followerId, Integer followedId) {
        if (followerId == null || followedId == null) {
            return false;
        }
        User follower = userRepository.findById(followerId).orElse(null);
        User followed = userRepository.findById(followedId).orElse(null);
        if (follower != null && followed != null) {
            return follower.getFollowing().contains(followed);
        }
        return false;
    }
    public Set<User> getUserFollowing(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return user.getFollowing(); // Assuming getFollowing() returns a Set<User>
        }
        return Collections.emptySet();
    }
    public boolean unfollowUser(Integer userId, Integer followerId) {
        if (userId.equals(followerId)) {
            return false; // Prevent users from unfollowing themselves
        }

        User userToBeUnfollowed = userRepository.findById(userId).orElse(null);
        User followingUser = userRepository.findById(followerId).orElse(null);

        if (userToBeUnfollowed != null && followingUser != null) {
            // Check if the follow relationship exists
            if (followingUser.getFollowing().contains(userToBeUnfollowed)) {
                followingUser.getFollowing().remove(userToBeUnfollowed);
                userToBeUnfollowed.getFollowers().remove(followingUser);

                userToBeUnfollowed.setFollowerCount(userToBeUnfollowed.getFollowerCount() - 1);
                followingUser.setFollowingCount(followingUser.getFollowingCount() - 1);

                userRepository.save(userToBeUnfollowed);
                userRepository.save(followingUser);
                return true;
            }
        }
        return false;
    }

    public Set<User> getUserFollower(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return user.getFollowers(); // Assuming getFollowing() returns a Set<User>
        }
        return Collections.emptySet();
    }

    public UserProfileDto getUserProfileById(Integer userId, String currentUsername) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        Integer currentUserId = userRepository.findUserIdByUsername(currentUsername);

        boolean isSelf = user.getUsername().equals(currentUsername);

        UserProfileDto profile = new UserProfileDto();
        profile.setId(user.getId());
        profile.setUsername(user.getUsername());
        profile.setName(user.getFirstName() + " " + user.getLastName());
        profile.setBio(user.getBio());
        profile.setSelfFollowing(isFollowing(currentUserId, userId));
        profile.setFollowersCount(user.getFollowers().size());
        profile.setFollowingCount(user.getFollowing().size());
        profile.setRecipeCount(user.getRecipes().size());
        profile.setRecipes(user.getRecipes().stream()
                .map(recipeService::convertToRecipeDetailsDto)
                .collect(Collectors.toList()));

        if (isSelf) {
            profile.setBookmarks(user.getBookmarks().stream()
                    .map(this::convertToBookmarkDto)
                    .collect(Collectors.toList()));
        } else {
            profile.setBookmarks(Collections.emptyList());
        }

        return profile;
    }

    private BookmarkDto convertToBookmarkDto(Bookmark bookmark) {

        Recipe recipe = bookmark.getRecipe();
        CuisineDto cuisineDto = new CuisineDto();
        if (recipe.getDish() != null && !recipe.getDish().getCuisines().isEmpty()) {

            cuisineDto.setId(recipe.getDish().getCuisines().get(0).getId());
            cuisineDto.setName(recipe.getDish().getCuisines().get(0).getName());

        }
        else if(recipe.getDish() != null && recipe.getDish().getCuisines().isEmpty()){
            cuisineDto.setId("No cuisine Id from wikidata");
            cuisineDto.setName("No cuisine name from wikidata");
        }
        return new BookmarkDto(
                recipe.getId(),
                recipe.getTitle(),
                recipe.getInstructions(),
                recipe.getIngredients().stream()
                        .map(IngredientsDto::new)
                        .collect(Collectors.toList()),
                recipe.getServingSize(),
                recipe.getCookingTime(),
                //recipe.getImages(),
                cuisineDto,
                new DishDto(recipe.getDish().getId(), recipe.getDish().getName(), recipe.getDish().getImage()),
                recipe.getAverageRating(),
                new AuthorDto(recipe.getUser().getId(), recipe.getUser().getUsername(), recipe.getUser().getFirstName(),
                      recipe.getUser().getFollowerCount(),  recipe.getUser().getFollowingCount(),recipe.getUser().getRecipeCount())
        );
    }

    public UserProfileDto getUserProfileDtoById(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return null;
        }
        // Map the User entity to UserProfileDto, possibly using ModelMapper or manual mapping
        UserProfileDto profile = new UserProfileDto();
        profile.setId(user.getId());
        profile.setUsername(user.getUsername());
        profile.setName(user.getFirstName() + " " + user.getLastName());
        profile.setBio(user.getBio());

        profile.setFollowersCount(user.getFollowers().size());
        profile.setFollowingCount(user.getFollowing().size());
        profile.setRecipeCount(user.getRecipes().size());
        profile.setRecipes(user.getRecipes().stream()
                .map(recipeService::convertToRecipeDetailsDto)
                .collect(Collectors.toList()));
        return profile;
    }
}
