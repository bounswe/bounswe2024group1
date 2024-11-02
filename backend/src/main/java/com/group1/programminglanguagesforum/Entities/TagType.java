package com.group1.programminglanguagesforum.Entities;


public enum TagType {
    PROGRAMMING_LANGUAGE("Programming Language"),
    PROGRAMMING_PARADIGM("Programming Paradigm"),
    COMPUTER_SCIENCE_TOPIC("Computer Science Topic"),
    SOFTWARE_LIBRARY("Software Library"),
    USER_DEFINED("User Defined");

    private final String value;

    TagType(String value) {
        this.value = value;
    }
    @Override
    public String toString() {
        return this.value;
    }
}
