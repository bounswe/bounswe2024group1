import { SearchQuestionsList } from "@/components/SearchQuestionsList";
import { SearchTagsList } from "@/components/SearchTagsList";
import { useSearchParams } from "react-router-dom";

export const Search = () => {
  const [params] = useSearchParams();
  const type: string = params.get("type") ?? "tags";

  if (type === "questions") {
    return <SearchQuestionsList />;
  } else if (type === "tags") {
    return <SearchTagsList />;
  }
};
