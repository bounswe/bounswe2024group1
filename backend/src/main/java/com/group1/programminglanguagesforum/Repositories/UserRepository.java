package com.group1.programminglanguagesforum.Repositories;

import com.group1.programminglanguagesforum.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
     Optional<User> findByUsernameOrEmail(String usernameOrEmail, String usernameOrEmail1);
}
