import { MultiSelect } from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateQuestion,
  useSearchTags,
} from "@/services/api/programmingForumComponents";
import { Info } from "lucide-react";
import { queryKeyFn } from "@/services/api/programmingForumContext";
import { TagDetails } from "@/services/api/programmingForumSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SyntaxHighlighter from "react-syntax-highlighter";
import { ContentWithSnippets } from "@/components/ContentWithSnippets";

// Schema validation for the form
const newQuestionSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Max 200 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(100000, "Max 100,000 characters"),
  tags: z
    .array(z.object({ tagId: z.number(), name: z.string() }))
    .min(1, "At least one tag is required"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"], {
    errorMap: () => ({ message: "Select a difficulty level" }),
  }),
});

type NewQuestion = z.infer<typeof newQuestionSchema>;

export default function QuestionCreationPage() {
  const [params] = useSearchParams();

  const tagIds = params.get("tagIds");
  const form = useForm<NewQuestion>({
    resolver: zodResolver(newQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: tagIds
        ? tagIds.split(",").map((id) => ({ tagId: Number(id) }))
        : [],
      difficulty: "EASY",
    },
  });
  console.log("tagIds", tagIds);
  console.log("form.getValues(tags)", form.getValues("tags"));

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const { handleSubmit, control } = form;
  const queryClient = useQueryClient();

  const [availableTags, setAvailableTags] = useState<
    { tagId: string; name: string }[]
  >([]);

  const { data: tagSearchData } = useSearchTags(
    { queryParams: { q: "", pageSize: 1000 } },
    { enabled: true },
  );

  useEffect(() => {
    if (tagSearchData?.data) {
      const availableTags = (tagSearchData.data as { items: TagDetails[] })
        .items;
      setAvailableTags(availableTags);

      if (tagIds && form.getValues("tags").some((tag) => !tag.name)) {
        const currentVals = form.getValues("tags");
        console.log("currentVals", currentVals);
        form.setValue(
          "tags",
          currentVals
            .map((tag) => ({
              ...tag,
              name:
                availableTags.find((t) => Number(t.tagId) === Number(tag.tagId))
                  ?.name || "",
            }))
            .filter((tag) => tag.name),
        );
        console.log("form.getValues(tags)", form.getValues("tags"));
      }
    }
  }, [tagSearchData]);

  const navigate = useNavigate();

  const { mutateAsync } = useCreateQuestion({
    onSuccess: (result) => {
      queryClient.invalidateQueries(
        queryKeyFn({
          path: "/users/me",
          operationId: "getMe",
          variables: {},
        }) as unknown as InvalidateQueryFilters,
      );

      navigate(`/question/${result.data.id}`);
    },
  });

  return (
    <div className="container flex flex-col gap-4 py-16">
      <div className="flex items-center gap-2">
      <h1>Create a new question</h1>
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
              <h4 className="font-medium">Writing Questions</h4>
              <p className="text-sm text-muted-foreground">
                We use Markdown for formatting questions. You can use standard
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


      <Form {...form}>
        <form
          onSubmit={handleSubmit(async (values) => {
            const tagIds = values.tags.map((tag) => tag.tagId);
            await mutateAsync({
              body: {
                ...values,
                tagIds: tagIds.map(Number),
              },
            });
          })}
          className="flex flex-col gap-6"
        >
          {/* Title */}
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter question title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content */}
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

          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                {isPreviewMode ? (
                  <div className="min-h-[200px] rounded-lg border border-gray-300 bg-white p-4">
                    <ContentWithSnippets content={field.value} />
                  </div>
                ) : (
                  <Textarea 
                    placeholder="Describe your question..."
                    {...field}
                  />
                )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <FormField
            control={control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MultiSelect
                    options={availableTags
                      .map((tag) => ({
                        value: String(tag.tagId),
                        label: tag.name || "Loading...",
                      }))
                      .concat(
                        field.value
                          .filter((tag) => !tag.name)
                          .map((tag) => ({
                            value: String(tag.tagId),
                            label: tag.name || "Loading...",
                          })),
                      )}
                    defaultValue={field.value.map((tag) => String(tag.tagId))}
                    value={field.value.map((tag) => String(tag.tagId))} // Bind selected values correctly
                    onValueChange={(selectedIds) => {
                      // Map selected IDs back to tag objects
                      const selectedTags = selectedIds
                        .map((id) =>
                          availableTags.find(
                            (tag) => Number(tag.tagId) === Number(id),
                          ),
                        )
                        .filter(Boolean);
                      console.log(selectedTags);
                      field.onChange(selectedTags);
                    }}
                    placeholder="Select Tags"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Difficulty */}
          <FormField
            control={control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <label htmlFor="difficulty-select" className="font-semibold mb-2 block">
                  Difficulty Level
                </label>
                <FormControl>
                  <select
                    id="difficulty-select"
                    className="rounded border border-gray-300 px-4 py-2"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>  
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
