package com.group1.programminglanguagesforum.Constants;

public  class EndpointConstants {

    public static final String TEST = "/test";

    public static class AuthenticationEndpoints {
        public static final String  BASE_PATH = "/auth";
        public static final String SIGNIN = BASE_PATH + "/login";
        public static final String SIGNUP = BASE_PATH +"/signup";
    }
    public static class UserEndpoints {
        public static final String  BASE_PATH = "/users";
        public static final String USER_ME = BASE_PATH + "/me";
        public static final String USER_ID = BASE_PATH + "/{id}";
        public static final String USER_FOLLOW = BASE_PATH + "/{id}/follow";
        public static final String USER_UNFOLLOW = BASE_PATH + "/{id}/unfollow";
        public static final String USER_FOLLOWERS = BASE_PATH + "/{id}/followers";
    }

    public static class QuestionEndpoints {
        public static final String BASE_PATH = "/questions";
        public static final String QUESTION_ID = BASE_PATH + "/{id}";
        public static final String QUESTION_UPVOTE = QUESTION_ID + "/upvote";
        public static final String QUESTION_DOWNVOTE = QUESTION_ID + "/downvote";
        public static final String QUESTION_DELETE_UPVOTE = QUESTION_ID + "/deleteUpvote";
        public static final String QUESTION_DELETE_DOWNVOTE = QUESTION_ID + "/deleteDownvote";
    }

    public static class SparqlEndpoints {
        public static final String  BASE_PATH = "https://query.wikidata.org/sparql";
    }
    public static class TagEndpoints {
        public static final String  BASE_PATH = "/tags";
        public static final String TAG_ID = BASE_PATH + "/{id}";
    }
    public static class BookmarkEndpoints {
        public static final String  BASE_PATH = "/questions/{questionId}/bookmarks";
    }
}
