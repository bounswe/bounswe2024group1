import { Input, InputField } from "@/components/ui/input";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import ErrorAlert from "@/components/ErrorAlert";
import { useCreateAnswer, useCreateQuestion, useSearchTags } from "@/services/api/programmingForumComponents";
import { useLocalSearchParams, useRouter } from "expo-router";
import useAuthStore from "@/services/auth";
import { useState } from "react";
import {
  Button,
  ButtonText,
  HStack,
  Text,
  View,
  VStack,
  Icon,
  Textarea,
  TextareaInput,
} from "@/components/ui";
import { X } from "lucide-react-native";

export default function NewAnswerPage() {
  const { questionId } = useLocalSearchParams<{ questionId: string }>();
  const { mutateAsync: createAnswer, status, error } = useCreateAnswer();
  const router = useRouter();

  const [content, setContent] = useState("");
  const contentLength = content.length;
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return (
      <ErrorAlert
        error={{
          status: 403,
          payload: { message: "You must be logged in to create an answer." },
        }}
      />
    );
  }

  const handleSubmit = async () => {
    const response = await createAnswer({
      body: {
        content,
      },
      pathParams: {
        questionId: Number(questionId),
      },
    });

    if (response.status === 201) {
      console.log("Answer created successfully");
      router.push(`/question/${questionId}`);
    } else {
      console.error("Failed to create answer");
      console.error(response);
    }

  };

  if (status === "pending") {
    return <FullscreenLoading overlay />;
  }

  return (
    <VStack style={{ gap: 16, flex: 1, padding: 32, marginVertical: 24 }}>
      <Button onPress={() => router.back()} style={{ alignSelf: "flex-start" }} variant={"outline"} size="sm">
        <Icon as={X} />
      </Button>
      <View style={{ gap: 16 }} />
      <Text style={{ fontSize: 20 }}>Write your answer</Text>
      <Textarea>
        <TextareaInput
          value={content}
          onChangeText={setContent}
          placeholder="Write your answer here..."
          maxLength={1000}
        />
      </Textarea>
      <Text>{contentLength} / 1000</Text>
      <Button onPress={handleSubmit} disabled={contentLength === 0} style={{ alignSelf: "flex-end" }}>
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );

}