import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCreateQuestion, useSearchTags } from "@/services/api/programmingForumComponents";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const newQuestionSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Max 200 characters"),
  content: z.string().min(1, "Content is required").max(100000, "Max 100,000 characters"),
  tags: z
    .array(z.object({ id: z.string(), name: z.string() }))
    .min(1, "At least one tag is required"),
  difficulty: z.enum(["Easy", "Medium", "Hard"], "Select a difficulty level"),
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

  const { handleSubmit, control, setValue } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "tags" });
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [availableTags, setAvailableTags] = useState<{ id: string; name: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  const tagId = params.get("tagId");

  const { data: tagSearchData } = useSearchTags(
    { queryParams: { q: searchQuery, pageSize: 20 } },
    { enabled: !!searchQuery }
  );

  useEffect(() => {
    if (tagSearchData?.data?.items) {
      setAvailableTags(
        tagSearchData.data.items.filter(
          (tag) =>
            !fields.some((selectedTag) => selectedTag.id === tag.id) // Remove already selected tags from availableTags
        )
      );
    }
  }, [tagSearchData, fields]);

  const { mutateAsync } = useCreateQuestion({
    onSuccess: (data) => {
      const newQuestion = data.data;

      // Redirect to the new question page
      navigate(`/question/${newQuestion.id}`);

      // Update the user's profile with the new question
      queryClient.setQueryData(["getUserProfile", { userId: newQuestion.author.id }], (oldData: any) => {
        if (!oldData) return;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            questions: [...oldData.data.questions, newQuestion],
          },
        };
      });

      // Update the questions in the tags associated with this question
      newQuestion.tags.forEach((tag: { id: string }) => {
        queryClient.setQueryData(["getTagDetails", { tagId: tag.id }], (oldData: any) => {
          if (!oldData) return;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              questions: [...oldData.data.questions, newQuestion],
            },
          };
        });
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
    <Form {...form}>
      <form
        onSubmit={handleSubmit(async (values) => {
          const tagIds = values.tags.map((tag) => tag.id);
          await mutateAsync({ body: { ...values, tags: tagIds } });
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
                <Textarea placeholder="Describe your question..." {...field} />
              </FormControl>
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
        <div className="flex flex-wrap gap-2 mt-2">
          {fields.map((tag, index) => (
            <div
              key={tag.id}
              className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded"
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
  );
}
