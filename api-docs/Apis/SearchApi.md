# SearchApi

All URIs are relative to *http://localhost:5173/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**searchQuestions**](SearchApi.md#searchQuestions) | **GET** /search/questions | Search questions |
| [**searchTags**](SearchApi.md#searchTags) | **GET** /search/tags | Search tags |
| [**searchUsers**](SearchApi.md#searchUsers) | **GET** /search/users | Search users |


<a name="searchQuestions"></a>
# **searchQuestions**
> searchQuestions_200_response searchQuestions(q, tags, difficulty, page, pageSize)

Search questions

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **q** | **String**| Search query | [default to null] |
| **tags** | **String**| Comma-separated list of tag IDs | [optional] [default to null] |
| **difficulty** | [**DifficultyLevel**](../Models/.md)| Filter by difficulty level | [optional] [default to null] [enum: EASY, MEDIUM, HARD] |
| **page** | **Integer**| Page number | [optional] [default to 1] |
| **pageSize** | **Integer**| Number of items per page | [optional] [default to 20] |

### Return type

[**searchQuestions_200_response**](../Models/searchQuestions_200_response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="searchTags"></a>
# **searchTags**
> searchTags_200_response searchTags(q, page, pageSize)

Search tags

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **q** | **String**| Search query | [default to null] |
| **page** | **Integer**| Page number | [optional] [default to 1] |
| **pageSize** | **Integer**| Number of items per page | [optional] [default to 20] |

### Return type

[**searchTags_200_response**](../Models/searchTags_200_response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="searchUsers"></a>
# **searchUsers**
> searchUsers_200_response searchUsers(q, page, pageSize)

Search users

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **q** | **String**| Search query | [default to null] |
| **page** | **Integer**| Page number | [optional] [default to 1] |
| **pageSize** | **Integer**| Number of items per page | [optional] [default to 20] |

### Return type

[**searchUsers_200_response**](../Models/searchUsers_200_response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

