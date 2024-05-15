import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserSummary } from "@/services/api/semanticBrowseSchemas";

interface Comment {
  author: UserSummary;
  upvoteCount: number;
  content: string;
  createdAt: string;
}

export const Comment = ({
  comment: { author, upvoteCount, content, createdAt },
}: {
  comment: Comment;
}) => {
  return (
    <div className="flex flex-col self-stretch ">
      <Card className="flex flex-1 flex-col bg-gray-100 pt-16">
        <CardHeader className="py-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <img
                src={author.profilePicture}
                alt="Author"
                className="mr-2 h-16 w-16 rounded-full"
              />
              <p className="text-lg font-medium text-gray-900">
                {author.username}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm text-gray-500">{createdAt}</p>
              <p className="text-sm text-gray-500">{upvoteCount} Upvotes</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-2">
          <p className="text-sm text-gray-500">{content} </p>
        </CardContent>
      </Card>
    </div>
  );
};
