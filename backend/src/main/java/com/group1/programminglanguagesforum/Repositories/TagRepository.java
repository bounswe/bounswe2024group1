package com.group1.programminglanguagesforum.Repositories;


import com.group1.programminglanguagesforum.Entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag,Long> {
}
