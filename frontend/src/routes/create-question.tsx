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
import { MultiSelect } from "@/components/multi-select";
import {
  useCreateQuestion,
  useSearchTags,
} from "@/services/api/programmingForumComponents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Schema validation for the form
const newQuestionSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Max 200 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(100000, "Max 100,000 characters"),
  tags: z
    .array(z.object({ id: z.string(), name: z.string() }))
    .min(1, "At least one tag is required"),
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
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
      difficulty: "Easy",
    },
  });

  const { handleSubmit, control } = form;
  const queryClient = useQueryClient();

  const [availableTags, setAvailableTags] = useState<
    { id: string; name: string }[]
  >([]);

  const { data: tagSearchData } = useSearchTags(
    { queryParams: { q: "", pageSize: 1000 } }, 
    { enabled: true }
  );

  useEffect(() => {
    if (tagSearchData?.data?.items) {
      setAvailableTags(tagSearchData.data.items);
    }
  }, [tagSearchData]);

  const { mutateAsync } = useCreateQuestion({
    onSuccess: (data) => {
      const newQuestion = data.data;

      queryClient.invalidateQueries(["getUserProfile"]);
      queryClient.invalidateQueries(["getTagDetails"]);
    },
  });

  return (
    <div className="container flex flex-col gap-4 py-16">
      <h1>Create a new question</h1>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(async (values) => {
            const tagIds = values.tags.map((tag) => tag.id);
            await mutateAsync({
              body: { ...values, tagIds: tagIds.map(Number) },
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
                      value: tag.id,
                      label: tag.name,
                    }))}
                    value={field.value.map((tag) => tag.id)} // Bind selected values correctly
                    onValueChange={(selectedIds) => {
                      // Map selected IDs back to tag objects
                      const selectedTags = selectedIds
                        .map((id) =>
                          availableTags.find((tag) => tag.id === id)
                        )
                        .filter(Boolean); 
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
                <FormControl>
                  <select
                    className="border border-gray-300 rounded px-4 py-2"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
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
