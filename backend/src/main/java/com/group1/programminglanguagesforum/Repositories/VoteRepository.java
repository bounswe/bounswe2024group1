package com.group1.programminglanguagesforum.Repositories;

import com.group1.programminglanguagesforum.Entities.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote,Long> {
}
