# Documentation for Programming Languages Forum

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *http://localhost:5173/api/v1*

| Class | Method | HTTP request | Description |
|------------ | ------------- | ------------- | -------------|
| *AnswersApi* | [**createAnswer**](Apis/AnswersApi.md#createanswer) | **POST** /questions/{questionId}/answers | Create a new answer |
*AnswersApi* | [**deleteAnswer**](Apis/AnswersApi.md#deleteanswer) | **DELETE** /answers/{answerId} | Delete an answer |
*AnswersApi* | [**downvoteAnswer**](Apis/AnswersApi.md#downvoteanswer) | **POST** /answers/{answerId}/downvote | Downvote an answer |
*AnswersApi* | [**getQuestionAnswers**](Apis/AnswersApi.md#getquestionanswers) | **GET** /questions/{questionId}/answers | Get answers for a question |
*AnswersApi* | [**updateAnswer**](Apis/AnswersApi.md#updateanswer) | **PUT** /answers/{answerId} | Update an answer |
*AnswersApi* | [**upvoteAnswer**](Apis/AnswersApi.md#upvoteanswer) | **POST** /answers/{answerId}/upvote | Upvote an answer |
| *AuthApi* | [**login**](Apis/AuthApi.md#login) | **POST** /auth/login | User login |
*AuthApi* | [**logout**](Apis/AuthApi.md#logout) | **POST** /auth/logout | User logout |
*AuthApi* | [**resetPassword**](Apis/AuthApi.md#resetpassword) | **POST** /auth/reset-password | Reset user's password |
*AuthApi* | [**signUp**](Apis/AuthApi.md#signup) | **POST** /auth/signup | Register a new user |
*AuthApi* | [**verifyEmail**](Apis/AuthApi.md#verifyemail) | **POST** /auth/verify-email | Verify user's email |
| *CodeExecutionApi* | [**executeCode**](Apis/CodeExecutionApi.md#executecode) | **POST** /execute-code | Execute a code snippet |
| *FeedApi* | [**getUserFeed**](Apis/FeedApi.md#getuserfeed) | **GET** /feed | Get user feed |
| *QuestionsApi* | [**bookmarkQuestion**](Apis/QuestionsApi.md#bookmarkquestion) | **POST** /questions/{questionId}/bookmarks | Bookmark a question |
*QuestionsApi* | [**createQuestion**](Apis/QuestionsApi.md#createquestion) | **POST** /questions | Create a new question |
*QuestionsApi* | [**deleteQuestion**](Apis/QuestionsApi.md#deletequestion) | **DELETE** /questions/{questionId} | Delete a question |
*QuestionsApi* | [**downvoteQuestion**](Apis/QuestionsApi.md#downvotequestion) | **POST** /questions/{questionId}/downvote | Downvote a question |
*QuestionsApi* | [**getBookmarkedQuestions**](Apis/QuestionsApi.md#getbookmarkedquestions) | **GET** /questions/bookmarked | Get bookmarked questions |
*QuestionsApi* | [**getQuestionDetails**](Apis/QuestionsApi.md#getquestiondetails) | **GET** /questions/{questionId} | Get question details |
*QuestionsApi* | [**rateQuestion**](Apis/QuestionsApi.md#ratequestion) | **POST** /questions/{id}/vote-difficulty | Rate a question's level of difficulty. |
*QuestionsApi* | [**removeQuestionBookmark**](Apis/QuestionsApi.md#removequestionbookmark) | **DELETE** /questions/{questionId}/bookmarks | Remove bookmark from a question |
*QuestionsApi* | [**updateQuestion**](Apis/QuestionsApi.md#updatequestion) | **PUT** /questions/{questionId} | Update a question |
*QuestionsApi* | [**upvoteQuestion**](Apis/QuestionsApi.md#upvotequestion) | **POST** /questions/{questionId}/upvote | Upvote a question |
| *SearchApi* | [**searchQuestions**](Apis/SearchApi.md#searchquestions) | **GET** /search/questions | Search questions |
*SearchApi* | [**searchTags**](Apis/SearchApi.md#searchtags) | **GET** /search/tags | Search tags |
*SearchApi* | [**searchUsers**](Apis/SearchApi.md#searchusers) | **GET** /search/users | Search users |
| *TagsApi* | [**createTag**](Apis/TagsApi.md#createtag) | **POST** /tags | Create a new tag |
*TagsApi* | [**followTag**](Apis/TagsApi.md#followtag) | **POST** /tags/{tagId}/follow | Follow a tag |
*TagsApi* | [**getTagDetails**](Apis/TagsApi.md#gettagdetails) | **GET** /tags/{tagId} | Get tag details |
*TagsApi* | [**unfollowTag**](Apis/TagsApi.md#unfollowtag) | **DELETE** /tags/{tagId}/follow | Unfollow a tag |
| *UserApi* | [**getMe**](Apis/UserApi.md#getme) | **GET** /users/me | Get own profile |
| *UsersApi* | [**followUser**](Apis/UsersApi.md#followuser) | **POST** /users/{userId}/follow | Follow a user |
*UsersApi* | [**getUserFollowers**](Apis/UsersApi.md#getuserfollowers) | **GET** /users/{userId}/followers | Get user's followers |
*UsersApi* | [**getUserFollowing**](Apis/UsersApi.md#getuserfollowing) | **GET** /users/{userId}/following | Get users being followed |
*UsersApi* | [**getUserProfile**](Apis/UsersApi.md#getuserprofile) | **GET** /users/{userId} | Get user profile |
*UsersApi* | [**unfollowUser**](Apis/UsersApi.md#unfollowuser) | **DELETE** /users/{userId}/unfollow | Unfollow a user |
*UsersApi* | [**updateUserProfile**](Apis/UsersApi.md#updateuserprofile) | **PUT** /users/{userId} | Update user profile |


<a name="documentation-for-models"></a>
## Documentation for Models

 - [AnswerDetails](./Models/AnswerDetails.md)
 - [AuthToken](./Models/AuthToken.md)
 - [CodeExecution](./Models/CodeExecution.md)
 - [DifficultyLevel](./Models/DifficultyLevel.md)
 - [DifficultyLevelRequestDto](./Models/DifficultyLevelRequestDto.md)
 - [Error](./Models/Error.md)
 - [ErrorResponseObject](./Models/ErrorResponseObject.md)
 - [ExecutionResult](./Models/ExecutionResult.md)
 - [ExperienceLevel](./Models/ExperienceLevel.md)
 - [NewAnswer](./Models/NewAnswer.md)
 - [NewQuestion](./Models/NewQuestion.md)
 - [NewTag](./Models/NewTag.md)
 - [Profile](./Models/Profile.md)
 - [QuestionDetails](./Models/QuestionDetails.md)
 - [QuestionRateResponseDto](./Models/QuestionRateResponseDto.md)
 - [QuestionSummary](./Models/QuestionSummary.md)
 - [SuccessResponseObject](./Models/SuccessResponseObject.md)
 - [SuccessResponseObject_data](./Models/SuccessResponseObject_data.md)
 - [TagDetails](./Models/TagDetails.md)
 - [TagSummary](./Models/TagSummary.md)
 - [TagType](./Models/TagType.md)
 - [UpdateAnswer](./Models/UpdateAnswer.md)
 - [UpdateProfile](./Models/UpdateProfile.md)
 - [UpdateQuestion](./Models/UpdateQuestion.md)
 - [UserLogin](./Models/UserLogin.md)
 - [UserProfile](./Models/UserProfile.md)
 - [UserProfileUpdate](./Models/UserProfileUpdate.md)
 - [UserRegistration](./Models/UserRegistration.md)
 - [UserSummary](./Models/UserSummary.md)
 - [createAnswer_201_response](./Models/createAnswer_201_response.md)
 - [createQuestion_201_response](./Models/createQuestion_201_response.md)
 - [createTag_201_response](./Models/createTag_201_response.md)
 - [executeCode_200_response](./Models/executeCode_200_response.md)
 - [getBookmarkedQuestions_200_response](./Models/getBookmarkedQuestions_200_response.md)
 - [getQuestionAnswers_200_response](./Models/getQuestionAnswers_200_response.md)
 - [getQuestionAnswers_200_response_allOf_data](./Models/getQuestionAnswers_200_response_allOf_data.md)
 - [getUserFollowers_200_response](./Models/getUserFollowers_200_response.md)
 - [getUserProfile_200_response](./Models/getUserProfile_200_response.md)
 - [rateQuestion_200_response](./Models/rateQuestion_200_response.md)
 - [resetPassword_request](./Models/resetPassword_request.md)
 - [searchQuestions_200_response](./Models/searchQuestions_200_response.md)
 - [searchQuestions_200_response_allOf_data](./Models/searchQuestions_200_response_allOf_data.md)
 - [searchTags_200_response](./Models/searchTags_200_response.md)
 - [searchTags_200_response_allOf_data](./Models/searchTags_200_response_allOf_data.md)
 - [searchUsers_200_response](./Models/searchUsers_200_response.md)
 - [searchUsers_200_response_allOf_data](./Models/searchUsers_200_response_allOf_data.md)
 - [signUp_201_response](./Models/signUp_201_response.md)
 - [verifyEmail_request](./Models/verifyEmail_request.md)


<a name="documentation-for-authorization"></a>
## Documentation for Authorization

<a name="bearerAuth"></a>
### bearerAuth

- **Type**: HTTP Bearer Token authentication (JWT)

