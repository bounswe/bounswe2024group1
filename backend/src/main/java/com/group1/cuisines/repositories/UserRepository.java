package com.group1.cuisines.repositories;

import com.group1.cuisines.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE " +
            "LOWER(u.username) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<User> findByUsernameOrFirstNameOrLastNameContainingIgnoreCase(@Param("searchTerm") String searchTerm);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    @Query("SELECT u.id FROM User u WHERE u.username = :username")
    Integer findUserIdByUsername(@Param("username") String username);
    Optional<User> findByEmailOrUsername(String email, String username);
    boolean existsByEmailOrUsername(String email, String username);

}
