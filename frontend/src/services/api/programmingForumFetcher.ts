import { FieldValues, UseFormSetError } from "react-hook-form";

import { z } from "zod";
import { ProgrammingForumContext } from "./programmingForumContext";
import {
  ErrorResponseObject,
  SuccessResponseObject,
} from "./programmingForumSchemas";

const baseUrl = "/api/v1";

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

    const response = await window.fetch(
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
      const errorObject: ErrorWrapper<ErrorResponseObject> = {
        status: 500,
        error: {
          errorMessage:
            e instanceof Error
              ? `Network error (${e.message})`
              : "Network error",
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
    errors: z
      .array(
        z.object({
          field: z.string().optional(),
          message: z.string(),
        }),
      )
      .optional(),
    message: z.string().optional(),
  }),
});

export const renderError = (
  unknownError: unknown,
  excludeFieldErrors: boolean = false,
): string => {
  if (!errorSchema.safeParse(unknownError).success) {
    return "Unknown error";
  }
  const error = errorSchema.parse(unknownError);
  if (!("errors" in error.payload)) {
    return error.payload?.["message"] ?? "Unknown error";
  }
  const errors = excludeFieldErrors
    ? error.payload.errors!.filter((e) => !e.field)
    : error.payload.errors!;

  const fieldErrors = errors
    .filter((e) => !!e.field)
    .map((e) => e.field + ": " + e.message);
  const generalErrors = errors.filter((e) => !e.field).map((e) => e.message);

  const renderedString =
    errors.length > 0
      ? generalErrors.join("\n") +
        (fieldErrors.length
          ? "\n\nField errors:\n" + fieldErrors.join("\n")
          : "")
      : "Unknown error.";

  return renderedString.trim();
};

export const setFormErrors = <T extends FieldValues>(
  error: FetchError,
  setError: UseFormSetError<T>,
) => {
  const hasGeneralError = !!error?.payload?.error?.errorMessage;
  if (hasGeneralError) {
    setError("root.serverError", {
      message: error.payload.error?.errorMessage,
    });
  }
};