package com.group1.programminglanguagesforum.Entities;

public enum DifficultyLevel {
    EASY("EASY"),
    MEDIUM("MEDIUM"),
    HARD("HARD");
    private final String value;

    DifficultyLevel(String value) {
        this.value = value;
    }


    @Override
    public String toString() {
        return this.value;
    }

    public static DifficultyLevel fromValue(String value) {
        for (DifficultyLevel level : DifficultyLevel.values()) {
            if (level.value.equalsIgnoreCase(value)) { // Ignore case if needed
                return level;
            }
        }
        return null;
    }
}
