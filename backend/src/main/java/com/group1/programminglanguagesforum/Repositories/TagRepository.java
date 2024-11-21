package com.group1.programminglanguagesforum.Repositories;


import com.group1.programminglanguagesforum.Entities.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag,Long> {
    List<Tag> findAllByIdIn(List<Long> ids);

    Page<Tag> findTagsByTagNameContainingIgnoreCase(String tagName, Pageable pageable);
}
