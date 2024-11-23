package com.group1.programminglanguagesforum.Repositories;

import com.group1.programminglanguagesforum.Entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
     Optional<User> findByUsernameOrEmail(String usernameOrEmail, String usernameOrEmail1);

     @Query("SELECT DISTINCT u FROM User u WHERE " +
               "LOWER(u.username) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
               "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
               "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :query, '%'))")
     Page<User> searchUsers(String query, Pageable pageable);
}
