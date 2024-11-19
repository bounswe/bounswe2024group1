package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.DTOs.Responses.CodeExecutionResponseDTO;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static com.group1.programminglanguagesforum.Constants.CodeExecutionConstants.*;

@Service
@RequiredArgsConstructor
public class CodeExecutionService {

    public CodeExecutionResponseDTO executeCode(String code, String language, String input) throws IOException, InterruptedException {
        JSONObject response = sendRequest(code, language, input);

        return CodeExecutionResponseDTO.builder()
                .status(response.getJSONObject("status").getString("description"))
                .output(response.optString("stdout"))
                .executionTime(Double.parseDouble(response.getString("time")))
                .build();
    }

    private JSONObject sendRequest(String code, String language, String input) throws IOException, InterruptedException {

        JSONObject body = new JSONObject();
        body.put("language_id", JUDGE0_LANGUAGE_IDS.get(language));
        body.put("source_code", code);
        body.put("stdin", input);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(JUDGE0_SUBMISSIONS_URL + "?base64_encoded=false&wait=true&fields=*"))
                .header("x-rapidapi-key", JUDGE0_API_KEY)
                .header("x-rapidapi-host", "judge0-ce.p.rapidapi.com")
                .header("Content-Type", "application/json")
                .method("POST", HttpRequest.BodyPublishers.ofString(body.toString()))
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        return new JSONObject(response.body());
    }

}
