# AnswersApi

All URIs are relative to *http://localhost:5173/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createAnswer**](AnswersApi.md#createAnswer) | **POST** /questions/{questionId}/answers | Create a new answer |
| [**deleteAnswer**](AnswersApi.md#deleteAnswer) | **DELETE** /answers/{answerId} | Delete an answer |
| [**downvoteAnswer**](AnswersApi.md#downvoteAnswer) | **POST** /answers/{answerId}/downvote | Downvote an answer |
| [**getQuestionAnswers**](AnswersApi.md#getQuestionAnswers) | **GET** /questions/{questionId}/answers | Get answers for a question |
| [**updateAnswer**](AnswersApi.md#updateAnswer) | **PUT** /answers/{answerId} | Update an answer |
| [**upvoteAnswer**](AnswersApi.md#upvoteAnswer) | **POST** /answers/{answerId}/upvote | Upvote an answer |


<a name="createAnswer"></a>
# **createAnswer**
> createAnswer_201_response createAnswer(questionId, NewAnswer)

Create a new answer

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **questionId** | **Integer**|  | [default to null] |
| **NewAnswer** | [**NewAnswer**](../Models/NewAnswer.md)|  | |

### Return type

[**createAnswer_201_response**](../Models/createAnswer_201_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="deleteAnswer"></a>
# **deleteAnswer**
> deleteAnswer(answerId)

Delete an answer

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **answerId** | **Integer**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="downvoteAnswer"></a>
# **downvoteAnswer**
> downvoteAnswer(answerId)

Downvote an answer

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **answerId** | **Integer**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getQuestionAnswers"></a>
# **getQuestionAnswers**
> getQuestionAnswers_200_response getQuestionAnswers(questionId)

Get answers for a question

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **questionId** | **Integer**|  | [default to null] |

### Return type

[**getQuestionAnswers_200_response**](../Models/getQuestionAnswers_200_response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="updateAnswer"></a>
# **updateAnswer**
> createAnswer_201_response updateAnswer(answerId, UpdateAnswer)

Update an answer

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **answerId** | **Integer**|  | [default to null] |
| **UpdateAnswer** | [**UpdateAnswer**](../Models/UpdateAnswer.md)|  | |

### Return type

[**createAnswer_201_response**](../Models/createAnswer_201_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="upvoteAnswer"></a>
# **upvoteAnswer**
> upvoteAnswer(answerId)

Upvote an answer

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **answerId** | **Integer**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

