# FeedApi

All URIs are relative to *http://localhost:5173/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getUserFeed**](FeedApi.md#getUserFeed) | **GET** /feed | Get user feed |


<a name="getUserFeed"></a>
# **getUserFeed**
> searchQuestions_200_response getUserFeed(type, page, pageSize)

Get user feed

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **type** | **String**| Feed type | [default to null] [enum: recent, topRated, recommended] |
| **page** | **Integer**| Page number | [optional] [default to 1] |
| **pageSize** | **Integer**| Number of items per page | [optional] [default to 20] |

### Return type

[**searchQuestions_200_response**](../Models/searchQuestions_200_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

