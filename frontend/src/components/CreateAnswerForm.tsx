import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateAnswer } from "@/services/api/programmingForumComponents";
import { useState } from "react";
import { ContentWithSnippets } from "./ContentWithSnippets";

interface CreateAnswerFormProps {
  questionId: number;
}

export function CreateAnswerForm({ questionId }: CreateAnswerFormProps) {
  const [content, setContent] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const { mutateAsync: createAnswer, isPending } = useCreateAnswer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createAnswer({
        pathParams: { questionId },
        body: { content },
      });
      setContent("");
      // Optionally refresh the answers list or show success message
    } catch (error) {
      console.error("Failed to create answer:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Your Answer</h2>

      <div className="flex gap-2">
        <Button
          type="button"
          variant={isPreviewMode ? "outline" : "default"}
          onClick={() => setIsPreviewMode(false)}
        >
          Write
        </Button>
        <Button
          type="button"
          variant={isPreviewMode ? "default" : "outline"}
          onClick={() => setIsPreviewMode(true)}
        >
          Preview
        </Button>
      </div>

      {isPreviewMode ? (
        <div className="min-h-[200px] rounded-lg border border-gray-300 bg-white p-4">
          <ContentWithSnippets content={content} />
        </div>
      ) : (
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your answer here... Use ```language-exec for executable code blocks"
          className="min-h-[200px]"
        />
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending || !content.trim()}>
          {isPending ? "Posting..." : "Post Answer"}
        </Button>
      </div>
    </form>
  );
}
