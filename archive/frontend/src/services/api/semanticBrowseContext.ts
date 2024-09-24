import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { QueryOperation } from "./semanticBrowseComponents";
import useAuthStore from "../auth";

export type SemanticBrowseContext = {
  fetcherOptions: {
    /**
     * Headers to inject in the fetcher
     */
    headers?: object;
    /**
     * Query params to inject in the fetcher
     */
    queryParams?: object;
  };
  queryOptions: {
    /**
     * Set this to `false` to disable automatic refetching when the query mounts or changes query keys.
     * Defaults to `true`.
     */
    enabled?: boolean;
  };
  /**
   * Query key manager.
   */
  queryKeyFn: (operation: QueryOperation) => QueryKey;
};

/**
 * Context injected into every react-query hook wrappers
 *
 * @param queryOptions options from the useQuery wrapper
 */
export function useSemanticBrowseContext<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  // eslint-disable-next-line
  _queryOptions?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >,
): SemanticBrowseContext {
  const token = useAuthStore((s) => s.token);
  return {
    fetcherOptions: {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    },
    queryOptions: {},
    queryKeyFn,
  };
}

export const queryKeyFn = (operation: QueryOperation) => {
  const queryKey: unknown[] = hasPathParams(operation)
    ? operation.path
        .split("/")
        .filter(Boolean)
        .map((i) => resolvePathParam(i, operation.variables.pathParams))
    : operation.path.split("/").filter(Boolean);

  if (hasQueryParams(operation)) {
    queryKey.push(operation.variables.queryParams);
  }

  if (hasBody(operation)) {
    queryKey.push(operation.variables.body);
  }

  return queryKey;
};
// Helpers
const resolvePathParam = (key: string, pathParams: Record<string, string>) => {
  if (key.startsWith("{") && key.endsWith("}")) {
    return pathParams[key.slice(1, -1)];
  }
  return key;
};

const hasPathParams = (
  operation: QueryOperation,
): operation is QueryOperation & {
  variables: { pathParams: Record<string, string> };
} => {
  return (
    "pathParams" in operation.variables &&
    Boolean(operation.variables.pathParams)
  );
};

const hasBody = (
  operation: QueryOperation,
): operation is QueryOperation & {
  variables: { body: Record<string, unknown> };
} => {
  return "body" in operation.variables && Boolean(operation.variables.body);
};

const hasQueryParams = (
  operation: QueryOperation,
): operation is QueryOperation & {
  variables: { queryParams: Record<string, unknown> };
} => {
  return (
    "queryParams" in operation.variables &&
    Boolean(operation.variables.queryParams)
  );
};
