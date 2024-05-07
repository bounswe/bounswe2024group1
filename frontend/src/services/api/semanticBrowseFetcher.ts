import { SemanticBrowseContext } from "./semanticBrowseContext";
import {
  ApiResponse,
  ErrorResponseObject,
  SuccessResponseObject,
} from "./semanticBrowseSchemas";

const baseUrl = "/api/v1";

export type ErrorWrapper<TError> =
  | TError
  | { status: "unknown"; payload: ErrorResponseObject };

export type FetchError = ErrorWrapper<{
  status: number | "unknown";
  payload: ErrorResponseObject;
}>;

export type SemanticBrowseFetcherOptions<
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
} & SemanticBrowseContext["fetcherOptions"];

type CleanupInnerData<TData extends SuccessResponseObject> =
  // remove inner record<string, any>
  {
    status: TData["status"];
    data: Extract<TData["data"], unknown[]> extends never
      ? TData["data"]
      : Extract<TData["data"], unknown[]>;
  };

export async function semanticBrowseFetch<
  TData extends SuccessResponseObject,
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
}: SemanticBrowseFetcherOptions<
  TBody,
  THeaders,
  TQueryParams,
  TPathParams
>): Promise<CleanupInnerData<TData>> {
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
          payload: (await response.json()) as ErrorResponseObject,
        } as ErrorWrapper<TError>;
      } catch (e) {
        error = {
          status: "unknown",
          payload: {
            status: 500,
            errors: [
              {
                message:
                  e instanceof Error
                    ? `Unexpected error (${e.message})`
                    : "Unexpected error",
              },
            ],
          },
        };
      }

      throw error;
    }

    if (response.headers.get("content-type")?.includes("json")) {
      const data: ApiResponse = await response.json();
      if (data.status >= 400) {
        throw {
          status: data.status,
          payload: data,
        };
      }

      return data as CleanupInnerData<TData>;
    } else {
      // if it is not a json response, assume it is a blob and cast it to TData
      return (await response.blob()) as unknown as CleanupInnerData<TData>;
    }
  } catch (e) {
    if (e instanceof Error) {
      const errorObject: ErrorResponseObject = {
        status: 500,
        errors: [
          {
            message:
              e instanceof Error
                ? `Network error (${e.message})`
                : "Network error",
          },
        ],
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

export const renderError = (
  error: ErrorWrapper<{ status: unknown; payload: ErrorResponseObject }>,
): string => {
  if (!("errors" in error.payload)) {
    return error.payload?.["message"] ?? "Unknown error";
  }
  const errors = error.payload.errors;

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

export const getFieldErrors = (
  error: ErrorWrapper<{ status: unknown; payload: ErrorResponseObject }>,
): Record<string, string> => {
  if (!("errors" in error.payload)) {
    return {};
  }
  const errors = error.payload.errors;

  const fieldErrors = errors.filter((e) => !!e.field);
  return fieldErrors.reduce(
    (acc, item) => {
      if (item.field! in acc) {
        acc[item.field!] += "\n" + item.message;
      } else {
        acc[item.field!] = item.message;
      }

      return acc;
    },
    {} as Record<string, string>,
  );
};
