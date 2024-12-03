# AuthApi

All URIs are relative to *http://localhost:5173/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**login**](AuthApi.md#login) | **POST** /auth/login | User login |
| [**logout**](AuthApi.md#logout) | **POST** /auth/logout | User logout |
| [**resetPassword**](AuthApi.md#resetPassword) | **POST** /auth/reset-password | Reset user&#39;s password |
| [**signUp**](AuthApi.md#signUp) | **POST** /auth/signup | Register a new user |
| [**verifyEmail**](AuthApi.md#verifyEmail) | **POST** /auth/verify-email | Verify user&#39;s email |


<a name="login"></a>
# **login**
> signUp_201_response login(UserLogin)

User login

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **UserLogin** | [**UserLogin**](../Models/UserLogin.md)|  | |

### Return type

[**signUp_201_response**](../Models/signUp_201_response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="logout"></a>
# **logout**
> logout()

User logout

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="resetPassword"></a>
# **resetPassword**
> resetPassword(resetPassword\_request)

Reset user&#39;s password

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **resetPassword\_request** | [**resetPassword_request**](../Models/resetPassword_request.md)|  | |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="signUp"></a>
# **signUp**
> signUp_201_response signUp(UserRegistration)

Register a new user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **UserRegistration** | [**UserRegistration**](../Models/UserRegistration.md)|  | |

### Return type

[**signUp_201_response**](../Models/signUp_201_response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="verifyEmail"></a>
# **verifyEmail**
> verifyEmail(verifyEmail\_request)

Verify user&#39;s email

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **verifyEmail\_request** | [**verifyEmail_request**](../Models/verifyEmail_request.md)|  | |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

