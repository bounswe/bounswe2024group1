package com.group1.programminglanguagesforum.Repositories;

import com.group1.programminglanguagesforum.Entities.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

}
