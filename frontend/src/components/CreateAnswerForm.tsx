import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateAnswer } from "@/services/api/programmingForumComponents";
import { queryKeyFn } from "@/services/api/programmingForumContext";
import { useQueryClient } from "@tanstack/react-query";
import { Info, Pen } from "lucide-react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { ContentWithSnippets } from "./ContentWithSnippets";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface CreateAnswerFormProps {
  questionId: number;
}

export function CreateAnswerForm({ questionId }: CreateAnswerFormProps) {
  const [content, setContent] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const { mutateAsync: createAnswer, isPending } = useCreateAnswer();
  const client = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createAnswer({
        pathParams: { questionId },
        body: { content },
      });
      setContent("");
      client.invalidateQueries({
        queryKey: queryKeyFn({
          path: "/questions/{questionId}",
          operationId: "getQuestionDetails",
          variables: { pathParams: { questionId } },
        }),
      });
      // Optionally refresh the answers list or show success message
    } catch (error) {
      console.error("Failed to create answer:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Pen className="h-4 w-4" />
        <h2 className="p-0 text-xl font-bold">Write an Answer</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Info about Answer Format"
            >
              <Info className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="prose">
              <h4 className="font-medium">Writing Answers</h4>
              <p className="text-sm text-muted-foreground">
                We use Markdown for formatting answers. You can use standard
                Markdown syntax for headers, lists, links, etc. For a basic
                reference, you can check{" "}
                <a href="https://commonmark.org/help/" target="_blank">
                  CommonMark
                </a>
                .
              </p>

              <h4 className="font-medium">Code Execution</h4>
              <p className="text-sm text-muted-foreground">
                To create executable code blocks, use triple backticks with
                language-exec:
              </p>
              <SyntaxHighlighter
                language="javascript"
                className="not-prose mt-1"
                children={`\`\`\`javascript-exec\nconsole.log("Hello, world!, This is executable!");\n\`\`\``}
              />

              <h4 className="font-medium">Linking</h4>
              <p className="text-sm text-muted-foreground">
                Link to tags using: <code>[tag name](#tag-123)</code>
                <br />
                Link to questions using: <code>[question title](#q-456)</code>
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

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
