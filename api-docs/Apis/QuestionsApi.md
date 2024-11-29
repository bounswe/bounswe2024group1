# QuestionsApi

All URIs are relative to *http://localhost:5173/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**bookmarkQuestion**](QuestionsApi.md#bookmarkQuestion) | **POST** /questions/{questionId}/bookmark | Bookmark a question |
| [**createQuestion**](QuestionsApi.md#createQuestion) | **POST** /questions | Create a new question |
| [**deleteQuestion**](QuestionsApi.md#deleteQuestion) | **DELETE** /questions/{questionId} | Delete a question |
| [**downvoteQuestion**](QuestionsApi.md#downvoteQuestion) | **POST** /questions/{questionId}/downvote | Downvote a question |
| [**getQuestionDetails**](QuestionsApi.md#getQuestionDetails) | **GET** /questions/{questionId} | Get question details |
| [**removeQuestionBookmark**](QuestionsApi.md#removeQuestionBookmark) | **DELETE** /questions/{questionId}/bookmark | Remove bookmark from a question |
| [**updateQuestion**](QuestionsApi.md#updateQuestion) | **PUT** /questions/{questionId} | Update a question |
| [**upvoteQuestion**](QuestionsApi.md#upvoteQuestion) | **POST** /questions/{questionId}/upvote | Upvote a question |


<a name="bookmarkQuestion"></a>
# **bookmarkQuestion**
> bookmarkQuestion(questionId)

Bookmark a question

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **questionId** | **Integer**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="createQuestion"></a>
# **createQuestion**
> createQuestion_201_response createQuestion(NewQuestion)

Create a new question

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **NewQuestion** | [**NewQuestion**](../Models/NewQuestion.md)|  | |

### Return type

[**createQuestion_201_response**](../Models/createQuestion_201_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="deleteQuestion"></a>
# **deleteQuestion**
> deleteQuestion(questionId)

Delete a question

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **questionId** | **Integer**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="downvoteQuestion"></a>
# **downvoteQuestion**
> downvoteQuestion(questionId)

Downvote a question

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **questionId** | **Integer**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getQuestionDetails"></a>
# **getQuestionDetails**
> createQuestion_201_response getQuestionDetails(questionId)

Get question details

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **questionId** | **Integer**|  | [default to null] |

### Return type

[**createQuestion_201_response**](../Models/createQuestion_201_response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="removeQuestionBookmark"></a>
# **removeQuestionBookmark**
> removeQuestionBookmark(questionId)

Remove bookmark from a question

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **questionId** | **Integer**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="updateQuestion"></a>
# **updateQuestion**
> createQuestion_201_response updateQuestion(questionId, UpdateQuestion)

Update a question

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **questionId** | **Integer**|  | [default to null] |
| **UpdateQuestion** | [**UpdateQuestion**](../Models/UpdateQuestion.md)|  | |

### Return type

[**createQuestion_201_response**](../Models/createQuestion_201_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="upvoteQuestion"></a>
# **upvoteQuestion**
> upvoteQuestion(questionId)

Upvote a question

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **questionId** | **Integer**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

