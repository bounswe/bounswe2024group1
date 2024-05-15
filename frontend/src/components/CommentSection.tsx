import { Comment } from "./Comment";
import { FullscreenLoading } from "./FullscreenLoading";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetCommentsForRecipe } from "../services/api/semanticBrowseComponents";
import { renderError } from "../services/api/semanticBrowseFetcher";


export const Comments = ({recipeId}: {recipeId : number}) => {
  const navigate = useNavigate();
  const { data: commentData, isLoading, error } = useGetCommentsForRecipe({
    pathParams: { recipeId },
  });

  if (isLoading) {
    return <FullscreenLoading overlay />;
  }

  if (error) {
    return (
      <div className="container flex flex-col gap-2 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{renderError(error)}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container flex flex-col gap-2 py-8">
      <div className="flex justify-between items-center">
        <ArrowLeft className="cursor-pointer h-6 w-6 text-gray-700" onClick={() => navigate("/")} />
        <h1 className="text-2xl font-bold mx-auto">Comments</h1>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-8">
        {commentData?.data?.reverse().map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
};
