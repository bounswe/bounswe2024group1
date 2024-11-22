import ErrorAlert from "@/components/ErrorAlert";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { Button, HStack, Text, View, VStack } from "@/components/ui";
import { Input, InputField } from "@/components/ui/input";
import { useCreateQuestion } from "@/services/api/programmingForumComponents";
import useAuthStore from "@/services/auth";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

export default function NewQuestionPage() {
  const { tagId } = useLocalSearchParams<{ tagId: string }>();
  const { mutateAsync: createQuestion, status, error } = useCreateQuestion();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = useAuthStore((state) => state.token);

  if (!token) {
    return (
      <ErrorAlert
        error={{
          status: 403,
          payload: { message: "You must be logged in to create a question." },
        }}
      />
    );
  }

  const handleSubmit = async () => {
    if (!title || !content || !tagId) {
      alert("All fields are required.");
      return;
    }

    try {
      console.log("Creating question...");
      console.log("Title:", title);
      console.log("Content:", content);
      console.log("Tag ID:", tagId);

      await createQuestion({
        body: {
          title,
          content,
          tagIds: [Number(tagId)],
          difficultyLevel: "EASY",
        },
      });
      alert("Question created successfully!");

      router.push(`/tags/${tagId}`);
    } catch (e) {
      console.error("Failed to create question:", e);
    }
  };

  if (status === "pending") {
    return <FullscreenLoading overlay />;
  }

  return (
    <View style={{ padding: 32, flex: 1, marginVertical: 32 }}>
      <VStack style={{ gap: 16, flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Create New Question
        </Text>

        {error && <ErrorAlert error={error} />}

        {/* Title Input */}
        <VStack style={{ gap: 8 }}>
          <Text style={{ fontSize: 16 }}>Title</Text>
          <Input>
            <InputField
              placeholder="Enter question title"
              value={title}
              onChangeText={setTitle}
              variant="outline"
              size="md"
            />
          </Input>
        </VStack>

        {/* Content Input */}
        <VStack style={{ gap: 8, flex: 1 }}>
          <Text style={{ fontSize: 16 }}>Content</Text>
          <Input>
            <InputField
              placeholder="Describe your question"
              value={content}
              onChangeText={setContent}
              variant="outline"
              size="md"
              multiline
              numberOfLines={6}
              style={{
                textAlignVertical: "top",
                paddingTop: 8,
                flex: 1,
              }}
            />
          </Input>
        </VStack>

        {/* Submit Button */}
        <HStack style={{ justifyContent: "flex-end" }}>
          <Button onPress={handleSubmit} variant="solid">
            <Text>Submit</Text>
          </Button>
        </HStack>
      </VStack>
    </View>
  );
}
