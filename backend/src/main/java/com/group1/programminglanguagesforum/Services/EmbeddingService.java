package com.group1.programminglanguagesforum.Services;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.ai.ollama.OllamaEmbeddingModel;
import org.springframework.ai.ollama.api.OllamaApi;
import org.springframework.ai.ollama.api.OllamaModel;
import org.springframework.ai.ollama.api.OllamaOptions;
import org.springframework.ai.ollama.management.ModelManagementOptions;
import io.micrometer.observation.ObservationRegistry;


@Service
public class EmbeddingService {

    private OllamaApi ollamaApi = new OllamaApi();
    private ObservationRegistry observationRegistery = ObservationRegistry.create();

    private final OllamaEmbeddingModel embeddingModel = new OllamaEmbeddingModel(ollamaApi,
    OllamaOptions.builder()
        .withModel(OllamaModel.MISTRAL.id())
        .build(),
    observationRegistery,
    ModelManagementOptions.builder().build()
        );

    public float[] getVectorEmbedding(String text) {
        return embeddingModel.embed(List.of(text)).iterator().next();
    }
}
