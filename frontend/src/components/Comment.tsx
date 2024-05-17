import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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



const addCommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
});

type AddCommentFormData = z.infer<typeof addCommentSchema>;

export const AddComment = ({
  user: { username, profilePicture },
}: {
  user: UserSummary;
}) => {
  const form = useForm<AddCommentFormData>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      content: "",
    },
  });

  const { handleSubmit, control, formState: { isSubmitting } } = form;

  const onSubmit = (data: AddCommentFormData) => {
    // TODO: fix after backend is fixed
    console.log(data);
  };

  return (
    <div className="flex flex-col self-stretch">
      <Card className="flex flex-1 flex-col bg-gray-100 pt-16">
        <CardHeader className="py-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <img
                src={profilePicture}
                alt="Author"
                className="mr-2 h-16 w-16 rounded-full"
              />
              <p className="text-lg font-medium text-gray-900">
                {username}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-2">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField
                control={control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Enter your comment here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isSubmitting}
                type="submit"
                className="btn btn-primary self-end"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
