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
  Popover,
  PopoverBackdrop,
  PopoverContent,
} from "@/components/ui";
import { X, InfoIcon } from "lucide-react-native";
import { ContentWithSnippets } from "@/components/ContentWithSnippets";
import { PostingGuide } from "@/components/PostingGuide";

export default function NewAnswerPage() {
  const { questionId } = useLocalSearchParams<{ questionId: string }>();
  const { mutateAsync: createAnswer, status, error } = useCreateAnswer();
  const router = useRouter();

  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
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
      <HStack className="flex items-center justify-between">
        <Text style={{ fontSize: 20 }}>Write your answer</Text>
        <Popover
          trigger={(triggerProps) => {
            return (
              <Button {...triggerProps} size="sm" variant="outline">
                <Icon as={InfoIcon} />
              </Button>
            )
          }}
        >
          <PopoverBackdrop />
          <PopoverContent className="w-full max-w-sm p-4 rounded-lg bg-white shadow-lg">
            <PostingGuide />
          </PopoverContent>
        </Popover>
      </HStack>
      <HStack style={{ gap: 16 }}>
        <Button onPress={() => setPreview(!preview)} variant="outline" size="sm">
          <ButtonText>{preview ? "Edit" : "Preview"}</ButtonText>
        </Button>
        <Button onPress={() => setContent(content + "```javascript-exec\n```\n")} variant="outline" size="sm">
          <ButtonText>Add Code</ButtonText>
        </Button>
      </HStack>
      {preview ? ( 
        <ContentWithSnippets content={content} />
        ) : (
          <Textarea>
            <TextareaInput
              value={content}
              onChangeText={setContent}
              placeholder="Write your answer here..."
              maxLength={1000}
            />
          </Textarea>
        )
      }
      
      <Text>{contentLength} / 1000</Text>
      <Button onPress={handleSubmit} disabled={contentLength === 0} style={{ alignSelf: "flex-end" }}>
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );

}