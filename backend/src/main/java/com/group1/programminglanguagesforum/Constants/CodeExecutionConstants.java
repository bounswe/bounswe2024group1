package com.group1.programminglanguagesforum.Constants;

import java.util.Map;

public class CodeExecutionConstants {

    public static final String JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";
    public static final String JUDGE0_SUBMISSIONS_URL = JUDGE0_API_URL + "/submissions";
    public static final String JUDGE0_API_KEY = "35e73d1355msh7eea11025c31207p1d0295jsn248174274d82";
    public static Map<String, Integer> JUDGE0_LANGUAGE_IDS = Map.of(
            "c", 50,
            "c#", 51,
            "cpp", 54,
            "go", 60,
            "java", 62,
            "javascript", 63,
            "python", 71
    );

}

