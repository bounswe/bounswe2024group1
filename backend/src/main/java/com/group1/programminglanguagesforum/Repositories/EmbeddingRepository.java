package com.group1.programminglanguagesforum.Repositories;

import com.group1.programminglanguagesforum.Entities.QuestionEmbedding;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackages = "com.group1.programminglanguagesforum.Repositories.mongodb")
public interface EmbeddingRepository extends MongoRepository<QuestionEmbedding,Long> {

}
