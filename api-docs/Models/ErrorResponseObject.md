# ErrorResponseObject
## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
| **status** | **BigDecimal** | Internal status code of the response. An HTTP 200 response with an internal 500 status code is an error response. Prioritize the inner status over the HTTP status. | [default to null] |
| **error** | [**Error**](Error.md) |  | [optional] [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

