# UsersApi

All URIs are relative to *http://localhost:5173/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**followUser**](UsersApi.md#followUser) | **POST** /users/{userId}/follow | Follow a user |
| [**getUserFollowers**](UsersApi.md#getUserFollowers) | **GET** /users/{userId}/followers | Get user&#39;s followers |
| [**getUserFollowing**](UsersApi.md#getUserFollowing) | **GET** /users/{userId}/following | Get users being followed |
| [**getUserProfile**](UsersApi.md#getUserProfile) | **GET** /users/{userId} | Get user profile |
| [**unfollowUser**](UsersApi.md#unfollowUser) | **DELETE** /users/{userId}/unfollow | Unfollow a user |
| [**updateUserProfile**](UsersApi.md#updateUserProfile) | **PUT** /users/{userId} | Update user profile |


<a name="followUser"></a>
# **followUser**
> followUser(userId)

Follow a user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | **Integer**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getUserFollowers"></a>
# **getUserFollowers**
> getUserFollowers_200_response getUserFollowers(userId)

Get user&#39;s followers

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | **Integer**|  | [default to null] |

### Return type

[**getUserFollowers_200_response**](../Models/getUserFollowers_200_response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getUserFollowing"></a>
# **getUserFollowing**
> getUserFollowers_200_response getUserFollowing(userId)

Get users being followed

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | **Integer**|  | [default to null] |

### Return type

[**getUserFollowers_200_response**](../Models/getUserFollowers_200_response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getUserProfile"></a>
# **getUserProfile**
> getUserProfile_200_response getUserProfile(userId)

Get user profile

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | **Integer**|  | [default to null] |

### Return type

[**getUserProfile_200_response**](../Models/getUserProfile_200_response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="unfollowUser"></a>
# **unfollowUser**
> unfollowUser(userId)

Unfollow a user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | **Integer**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="updateUserProfile"></a>
# **updateUserProfile**
> getUserProfile_200_response updateUserProfile(userId, UserProfileUpdate)

Update user profile

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | **Integer**|  | [default to null] |
| **UserProfileUpdate** | [**UserProfileUpdate**](../Models/UserProfileUpdate.md)|  | |

### Return type

[**getUserProfile_200_response**](../Models/getUserProfile_200_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

