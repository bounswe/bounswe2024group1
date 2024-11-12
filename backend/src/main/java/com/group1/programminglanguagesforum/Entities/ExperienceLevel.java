package com.group1.programminglanguagesforum.Entities;

public enum ExperienceLevel {
    BEGINNER("Beginner"),
    INTERMEDIATE("Intermediate"),
    ADVANCED("Advanced");
    private final String value;

    ExperienceLevel(String value) {
        this.value = value;
    }


    @Override
    public String toString() {
        return this.value;
    }

    public static ExperienceLevel fromValue(String value) {
        for (ExperienceLevel level : ExperienceLevel.values()) {
            if (level.value.equalsIgnoreCase(value)) { // Ignore case if needed
                return level;
            }
        }
        return null;
    }
}
