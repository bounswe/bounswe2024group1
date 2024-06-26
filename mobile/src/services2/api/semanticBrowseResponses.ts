/**
 * Generated by @openapi-codegen
 *
 * @version 1.0.3
 */
import type * as Schemas from "./semanticBrowseSchemas";

export type OkResponse = Schemas.SuccessResponseObject;

/**
 * OK
 */
export type CreatedResponse = {
  /**
   * Internal status code of the response. An HTTP 200 response with an internal 500 status code is an error response. Prioritize the inner status over the HTTP status.
   *
   * @example 200
   * @example 201
   */
  status: 200 | 201;
  data: Record<string, any> | any[];
};

/**
 * Response with errors
 */
export type BadRequestResponse = {
  /**
   * Internal status code of the response. An HTTP 200 response with an internal 500 status code is an error response. Prioritize the inner status over the HTTP status.
   *
   * @example 400
   * @example 401
   * @example 403
   * @example 404
   * @example 409
   * @example 500
   */
  status: 400 | 401 | 403 | 404 | 409 | 500;
  errors: Schemas.ApiError[];
};

/**
 * Response with errors
 */
export type UnauthorizedResponse = {
  /**
   * Internal status code of the response. An HTTP 200 response with an internal 500 status code is an error response. Prioritize the inner status over the HTTP status.
   *
   * @example 400
   * @example 401
   * @example 403
   * @example 404
   * @example 409
   * @example 500
   */
  status: 400 | 401 | 403 | 404 | 409 | 500;
  errors: Schemas.ApiError[];
};

/**
 * Response with errors
 */
export type ForbiddenResponse = {
  /**
   * Internal status code of the response. An HTTP 200 response with an internal 500 status code is an error response. Prioritize the inner status over the HTTP status.
   *
   * @example 400
   * @example 401
   * @example 403
   * @example 404
   * @example 409
   * @example 500
   */
  status: 400 | 401 | 403 | 404 | 409 | 500;
  errors: Schemas.ApiError[];
};

/**
 * Response with errors
 */
export type NotFoundResponse = {
  /**
   * Internal status code of the response. An HTTP 200 response with an internal 500 status code is an error response. Prioritize the inner status over the HTTP status.
   *
   * @example 400
   * @example 401
   * @example 403
   * @example 404
   * @example 409
   * @example 500
   */
  status: 400 | 401 | 403 | 404 | 409 | 500;
  errors: Schemas.ApiError[];
};

/**
 * Response with errors
 */
export type ConflictResponse = {
  /**
   * Internal status code of the response. An HTTP 200 response with an internal 500 status code is an error response. Prioritize the inner status over the HTTP status.
   *
   * @example 400
   * @example 401
   * @example 403
   * @example 404
   * @example 409
   * @example 500
   */
  status: 400 | 401 | 403 | 404 | 409 | 500;
  errors: Schemas.ApiError[];
};

export type InternalServerErrorResponse = {
  /**
   * @example 500
   */
  status?: number;
  errors?: Schemas.ApiError[];
};
