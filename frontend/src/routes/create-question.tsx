import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  GetUserProfileResponse,
  useCreateQuestion,
  useSearchTags,
} from "@/services/api/programmingForumComponents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

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
  const { fields, append, remove } = useFieldArray({ control, name: "tags" });
  const navigate = useNavigate();
  const [availableTags, setAvailableTags] = useState<
    { id: string; name: string }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  const { data: tagSearchData } = useSearchTags(
    { queryParams: { q: searchQuery, pageSize: 20 } },
    { enabled: !!searchQuery },
  );

  useEffect(() => {
    if (tagSearchData?.data?.items) {
      setAvailableTags(
        tagSearchData.data.items.filter(
          (tag) => !fields.some((selectedTag) => selectedTag.id === tag.id), // Remove already selected tags from availableTags
        ),
      );
    }
  }, [tagSearchData, fields]);

  const { mutateAsync } = useCreateQuestion({
    onSuccess: (data) => {
      const newQuestion = data.data;

      // Redirect to the new question page
      navigate(`/question/${newQuestion.id}`);

      // Update the user's profile with the new question
      queryClient.setQueryData(
        ["getUserProfile", { userId: newQuestion.author.id }],
        (oldData: GetUserProfileResponse) => {
          if (!oldData) return;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              questions: [...(oldData.data.questions || []), newQuestion],
            },
          };
        },
      );

      // Update the questions in the tags associated with this question
      newQuestion.tags.forEach((tag: { id?: string }) => {
        queryClient.setQueryData(
          ["getTagDetails", { tagId: tag.id }],
          (oldData: GetUserProfileResponse) => {
            if (!oldData) return;
            return {
              ...oldData,
              data: {
                ...oldData.data,
                questions: [...(oldData.data.questions || []), newQuestion],
              },
            };
          },
        );
      });
    },
  });

  const handleTagSelect = (tagId: string) => {
    const selectedTag = availableTags.find((tag) => tag.id === tagId);
    if (selectedTag) {
      append(selectedTag);
      setSearchQuery(""); // Reset search query
      setAvailableTags((prev) => prev.filter((tag) => tag.id !== tagId)); // Remove the selected tag from available
    }
  };

  const handleTagRemove = (index: number) => {
    const removedTag = fields[index];
    remove(index);
    setAvailableTags((prev) => [...prev, removedTag]); // Re-add the removed tag to availableTags
  };

  return (
    <div className="container flex flex-col gap-4 self-stretch justify-self-stretch py-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <h1>Create a new question</h1>
        </div>
      </div>
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
          {/* Difficulty Level */}
          <FormField
            control={control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger aria-label="Difficulty level select box">
                      <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EASY">Easy</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HARD">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Please select the difficulty level of your question
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <FormItem>
            <FormControl>
              <Input
                placeholder="Search for a tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </FormControl>
            <Select onValueChange={handleTagSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select or add tags..." />
              </SelectTrigger>
              <SelectContent>
                {availableTags.map((tag) => (
                  <SelectItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>

          {/* Selected Tags */}
          <div className="mt-2 flex flex-wrap gap-2">
            {fields.map((tag, index) => (
              <div
                key={tag.id}
                className="flex items-center gap-2 rounded bg-gray-200 px-3 py-1"
              >
                {tag.name}
                <Button
                  type="button"
                  onClick={() => handleTagRemove(index)}
                  className="text-red-500"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>

          {/* Difficulty */}
          <FormField
            control={control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
