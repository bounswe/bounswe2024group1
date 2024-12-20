# TagsApi

All URIs are relative to *http://localhost:5173/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createTag**](TagsApi.md#createTag) | **POST** /tags | Create a new tag |
| [**followTag**](TagsApi.md#followTag) | **POST** /tags/{tagId}/follow | Follow a tag |
| [**getTagDetails**](TagsApi.md#getTagDetails) | **GET** /tags/{tagId} | Get tag details |
| [**unfollowTag**](TagsApi.md#unfollowTag) | **DELETE** /tags/{tagId}/follow | Unfollow a tag |


<a name="createTag"></a>
# **createTag**
> createTag_201_response createTag(NewTag)

Create a new tag

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **NewTag** | [**NewTag**](../Models/NewTag.md)|  | |

### Return type

[**createTag_201_response**](../Models/createTag_201_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="followTag"></a>
# **followTag**
> followTag(tagId)

Follow a tag

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **tagId** | **Integer**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getTagDetails"></a>
# **getTagDetails**
> createTag_201_response getTagDetails(tagId)

Get tag details

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **tagId** | **Integer**|  | [default to null] |

### Return type

[**createTag_201_response**](../Models/createTag_201_response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="unfollowTag"></a>
# **unfollowTag**
> unfollowTag(tagId)

Unfollow a tag

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **tagId** | **Integer**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

