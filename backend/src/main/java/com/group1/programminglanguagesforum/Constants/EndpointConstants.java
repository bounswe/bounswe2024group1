package com.group1.programminglanguagesforum.Constants;

public  class EndpointConstants {
    public static class AuthenticationEndpoints {
        public static final String  BASE_PATH = "/auth";
        public static final String SIGNIN = BASE_PATH + "/login";
        public static final String SIGNUP = BASE_PATH +"/signup";
    }
    public static class UserEndpoints {
        public static final String  BASE_PATH = "/user";
        public static final String USER_ME = BASE_PATH + "/me";
        public static final String USER_ID = BASE_PATH + "{id}";
    }
}
