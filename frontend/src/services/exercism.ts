import * as reactQuery from "@tanstack/react-query";
const SERVER_URL = "https://exercism.mmtf.workers.dev";

interface SearchResult {
  slug: string;
  track: string;
  difficulty: string;
  blurb: string;
  title: string;
  self_link: string;
  similarity_score: number;
}

interface SearchParams {
  difficulty?: string;
  text?: string;
  track?: string;
}

export type ExercismSearchError = {
  message: string;
};

export type ExercismSearchResponse = {
  results: SearchResult[];
  filters_applied: {
    track: string;
    difficulty: string;
  };
  total_matches: number;
  shown_matches: number;
};

export type ExercismSearchVariables = {
  params: SearchParams;
};

export const fetchExercismSearch = async (
  variables: ExercismSearchVariables,
  signal?: AbortSignal,
): Promise<ExercismSearchResponse> => {
  const response = await fetch(`${SERVER_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(variables.params),
    signal,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

export const useExercismSearch = <TData = ExercismSearchResponse>(
  variables: ExercismSearchVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<
      ExercismSearchResponse,
      ExercismSearchError,
      TData
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return reactQuery.useQuery<
    ExercismSearchResponse,
    ExercismSearchError,
    TData
  >({
    queryKey: ["exercism", "search", variables.params],
    queryFn: ({ signal }) => fetchExercismSearch(variables, signal),
    ...options,
  });
};

export const convertTagToTrack = (tag: string) => {
  return tag
    .toLowerCase() // Python -> python
    .replace(/ /g, "-") // Common Lisp -> common-lisp
    .replace(/#/g, "") // C# -> csharp
    .replace(/\+/g, "p"); // C++ -> cpp
};
