package com.group1.programminglanguagesforum.Repositories;

import java.util.List;
import java.util.Optional;
import com.group1.programminglanguagesforum.Entities.Bookmark;
import com.group1.programminglanguagesforum.Entities.Question;
import com.group1.programminglanguagesforum.Entities.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Optional<Bookmark> findByUserAndQuestion(User user, Question Question);

    boolean existsByUserAndQuestion(User user, Question question);

    List<Bookmark> findByUser(User user);
    
}
