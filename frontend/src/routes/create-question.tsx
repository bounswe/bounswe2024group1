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
import { queryKeyFn } from "@/services/api/programmingForumContext";
import { TagDetails } from "@/services/api/programmingForumSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

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
  difficultyLevel: z.enum(["EASY", "MEDIUM", "HARD"], {
    errorMap: () => ({ message: "Select a difficulty level" }),
  }),
});

type NewQuestion = z.infer<typeof newQuestionSchema>;

export default function QuestionCreationPage() {
  const form = useForm<NewQuestion>({
    resolver: zodResolver(newQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      difficultyLevel: "EASY",
    },
  });

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
      setAvailableTags((tagSearchData.data as { items: TagDetails[] }).items);
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
        }) as any,
      );

      navigate(`/question/${result.data.id}`);
    },
  });

  return (
    <div className="container flex flex-col gap-4 py-16">
      <h1>Create a new question</h1>
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
          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Describe your question..."
                    {...field}
                  />
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
                    options={availableTags.map((tag) => ({
                      value: tag.tagId,
                      label: tag.name,
                    }))}
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
            name="difficultyLevel"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <select
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
