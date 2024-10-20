import { FieldValues, UseFormSetError } from "react-hook-form";

import * as Constants from "expo-constants";
import { z } from "zod";
import { temporaryMocks } from "../temporaryMocks";
import { ProgrammingForumContext } from "./programmingForumContext";
import {
  ErrorResponseObject,
  SuccessResponseObject,
} from "./programmingForumSchemas";
// in expo, only localhost for dev
const baseUrl =
  process.env.NODE_ENV === "development"
    ? `http://${new URL(Constants.default.experienceUrl).hostname}:5173/api/v1`
    : "https://programming-languages-forum-ahwzj.ondigitalocean.app/api/v1";

console.log(baseUrl);

const USE_TEMPORARY_MOCKS = true;

export type ErrorWrapper<TError> =
  | TError
  | { status: "unknown"; payload: ErrorResponseObject };

export type FetchError = ErrorWrapper<{
  status: number | "unknown";
  payload: ErrorResponseObject;
}>;

export type ProgrammingForumFetcherOptions<
  TBody,
  THeaders,
  TQueryParams,
  TPathParams,
> = {
  url: string;
  method: string;
  body?: TBody;
  headers?: THeaders;
  queryParams?: TQueryParams;
  pathParams?: TPathParams;
  signal?: AbortSignal;
} & ProgrammingForumContext["fetcherOptions"];

export async function programmingForumFetch<
  TData extends SuccessResponseObject | void,
  TError extends { status: number | "unknown"; payload: ErrorResponseObject },
  // eslint-disable-next-line
  TBody extends any | FormData | undefined | null,
  THeaders extends Record<string, string>,
  TQueryParams extends Record<string, string | number | boolean>,
  TPathParams extends Record<string, string | number>,
>({
  url,
  method,
  body,
  headers,
  pathParams,
  queryParams,
  signal,
}: ProgrammingForumFetcherOptions<
  TBody,
  THeaders,
  TQueryParams,
  TPathParams
>): Promise<TData> {
  if (USE_TEMPORARY_MOCKS && url in temporaryMocks) {
    const mock = temporaryMocks[url as keyof typeof temporaryMocks];

    if (typeof mock === "function") {
      return mock(body as unknown) as unknown as TData;
    }

    return mock.payload as unknown as TData;
  }

  try {
    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...headers,
    };

    /**
     * As the fetch API is being used, when multipart/form-data is specified
     * the Content-Type header must be deleted so that the browser can set
     * the correct boundary.
     * https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects#sending_files_using_a_formdata_object
     */
    if (
      requestHeaders["Content-Type"]
        .toLowerCase()
        .includes("multipart/form-data")
    ) {
      delete requestHeaders["Content-Type"];
    }

    const response = await fetch(
      `${baseUrl}${resolveUrl(url, queryParams, pathParams)}`,
      {
        signal,
        method: method.toUpperCase(),
        body: body
          ? body instanceof FormData
            ? body
            : JSON.stringify(body)
          : undefined,
        headers: requestHeaders,
      },
    );
    if (!response.ok) {
      let error: ErrorWrapper<TError>;
      try {
        error = {
          status: response.status,
          payload: (await response
            .json()
            .catch(() =>
              response.text().then((text) => ({
                status: response.status,
                errors: [{ message: text }],
              })),
            )
            .catch(() => ({
              status: "unknown",
              error: {
                errorMessage: "Could not parse response",
              },
            }))) as ErrorResponseObject,
        } as ErrorWrapper<TError>;
      } catch (e) {
        error = {
          status: "unknown",
          payload: {
            status: 500,
            error: {
              errorMessage:
                e instanceof Error
                  ? `Unexpected error (${e.message})`
                  : "Unexpected error",
            },
          },
        };
      }

      throw error;
    }

    if (response.headers.get("content-type")?.includes("json")) {
      const data = await response.json();
      if (data.status >= 400) {
        throw {
          status: data.status,
          payload: data,
        };
      }

      return data as TData;
    } else {
      // if it is not a json response, assume it is a blob and cast it to TData
      return (await response.blob()) as unknown as TData;
    }
  } catch (e) {
    if (e instanceof Error) {
      const errorObject: ErrorWrapper<TError> = {
        status: "unknown",
        payload: {
          status: 500,
          error: {
            errorMessage:
              e instanceof Error
                ? `Network error (${e.message})`
                : "Network error",
          },
        },
      };
      throw errorObject;
    } else throw e;
  }
}

const resolveUrl = (
  url: string,
  queryParams: Record<string, string | number | boolean> = {},
  pathParams: Record<string, string | number> = {},
) => {
  let query = new URLSearchParams(
    queryParams as Record<string, string>,
  ).toString();
  if (query) query = `?${query}`;
  return (
    url.replace(/\{\w*\}/g, (key) => String(pathParams[key.slice(1, -1)])) +
    query
  );
};

export const errorSchema = z.object({
  status: z.number().or(z.literal("unknown")),
  payload: z.object({
    status: z.number(),
    error: z.object({
      errorMessage: z.string().optional(),
      stackTrace: z.string(),
    }),
    message: z.string().optional(),
  }),
});

export const renderError = (likelyError: unknown): string => {
  const error = errorSchema.safeParse(likelyError);
  if (!error.success) {
    return "Unknown error";
  }
  return error.data.payload.error.errorMessage ?? "Unknown error";
};

export const setFormErrors = <T extends FieldValues>(
  error: FetchError,
  setError: UseFormSetError<T>,
) => {
  const hasGeneralError = !!error?.payload?.error?.errorMessage;
  if (hasGeneralError) {
    setError("root.serverError", {
      message: error?.payload?.error?.errorMessage,
    });
  }
};
