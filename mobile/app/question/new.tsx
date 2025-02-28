import { ContentWithSnippets } from "@/components/ContentWithSnippets";
import ErrorAlert from "@/components/ErrorAlert";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { PostingGuide } from "@/components/PostingGuide";
import {
  Button,
  ButtonText,
  HStack,
  Icon,
  Popover,
  PopoverBackdrop,
  PopoverContent,
  ScrollView,
  Text,
  Textarea,
  TextareaInput,
  View,
  VStack,
} from "@/components/ui";
import { Input, InputField } from "@/components/ui/input";
import {
  useCreateQuestion,
  useSearchTags,
} from "@/services/api/programmingForumComponents";
import {
  DifficultyLevel,
  TagSummary,
} from "@/services/api/programmingForumSchemas";
import useAuthStore from "@/services/auth";
import { useLocalSearchParams, useRouter } from "expo-router";
import { InfoIcon, X } from "lucide-react-native";
import { useState } from "react";

export default function NewQuestionPage() {
  const { tagId } = useLocalSearchParams<{ tagId: string }>();
  const { mutateAsync: createQuestion, status, error } = useCreateQuestion();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const contentLength = content.length;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagSummary[]>([]);

  const [difficulty, setDifficulty] = useState<DifficultyLevel>("EASY");
  const difficultyOptions = ["EASY", "MEDIUM", "HARD"];

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

  const {
    data: searchResult,
    isLoading,
    error: searchError,
  } = useSearchTags(
    {
      queryParams: { q: searchQuery },
    },
    { enabled: !!searchQuery }
  );

  const tags = (searchResult?.data as { items?: TagSummary[] })?.items || [];

  // Handle tag selection or deselection
  const handleTagSelection = (tag: TagSummary) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((otherTag) => otherTag.id !== tag.id)
        : [...prevSelectedTags, tag]
    );
  };

  // Handle removing a selected tag directly
  const handleRemoveTag = (tag: TagSummary) => {
    setSelectedTags(selectedTags.filter((otherTag) => otherTag.id !== tag.id));
  };

  const handleSubmit = async () => {
    if (!title || !content || selectedTags.length === 0) {
      alert("All fields are required.");
      return;
    }

    try {
      console.log("Creating question...");
      console.log("Title:", title);
      console.log("Content:", content);
      console.log("Difficulty:", difficulty);
      console.log(
        "Selected Tags:",
        selectedTags.map((tag) => tag.name)
      );

      const data = await createQuestion({
        body: {
          title,
          content,
          difficulty,
          tagIds: selectedTags
            .map((tag) => Number(tag.id))
            .filter((id): id is number => id !== undefined),
        },
      });
      alert("Question created successfully!");
      router.replace(`/question/${data.data.id}`);
    } catch (e) {
      console.error("Failed to create question:", e);
    }
  };

  if (status === "pending") {
    return <FullscreenLoading overlay />;
  }

  return (
    <ScrollView style={{ padding: 32, flex: 1, marginVertical: 16 }}>
      <VStack style={{ gap: 16, flex: 1 }}>
        <Button onPress={() => router.back()} style={{ alignSelf: "flex-start" }} variant={"outline"} size="sm">
          <Icon as={X} />
        </Button>
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
          <HStack className="flex items-center justify-between">
            <Text style={{ fontSize: 16 }}>Content</Text>
            <Popover
              trigger={(triggerProps) => {
                return (
                  <Button {...triggerProps} size="sm" variant="outline">
                    <Icon as={InfoIcon} />
                  </Button>
                )
              }}
              onOpen={() => console.log("Popover opened")}
            >
              <PopoverBackdrop />
              <PopoverContent className="w-full max-w-sm p-4 rounded-lg bg-white shadow-lg">
                <PostingGuide />
              </PopoverContent>
            </Popover>
          </HStack>
          <HStack className="flex items-center gap-4">
            <Button onPress={() => setPreview(!preview)} variant="outline" size="sm">
              <ButtonText>{preview ? "Edit" : "Preview"}</ButtonText>
            </Button>
            <Button onPress={() => setContent(content + "```javascript-exec\n```\n")} variant="outline" size="sm">
              <ButtonText>Add Code</ButtonText>
            </Button>
          </HStack>

          { preview ? (
            <ContentWithSnippets content={content} />
          ) : (
            <Textarea>
              <TextareaInput
                placeholder="Describe your question"
                value={content}
                onChangeText={setContent}
                size="md"
                style={{
                  textAlignVertical: "top",
                }}
              />
            </Textarea>
          )}
          
          <Text style={{ fontSize: 12, color: "#888" }}>
            {contentLength} characters
          </Text>
        </VStack>

        {searchError && <ErrorAlert error={searchError} />}

        {/* Tag Search Input */}
        <VStack style={{ gap: 8 }}>
          <Text style={{ fontSize: 16 }}>Search Tags</Text>
          <Input>
            <InputField
              placeholder="Search for tags"
              value={searchQuery}
              onChangeText={setSearchQuery}
              variant="outline"
              size="md"
            />
          </Input>
        </VStack>

        {/* Display selected tags */}
        <Text style={{ fontSize: 16 }}>
          {selectedTags.length > 0 ? `Selected tags:` : "No tags selected"}
        </Text>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 8 }}
        >
          {selectedTags.map((tag) => (
            <HStack
              key={tag.name}
              style={{
                backgroundColor: "#E0E0E0",
                borderRadius: 16,
                padding: 4,
                marginRight: 8,
                marginBottom: 8,
              }}
            >
              <Button
                onPress={() => handleRemoveTag(tag)}
                variant="solid"
                style={{ padding: 0 }}
              >
                <ButtonText style={{ marginRight: 8 }}>{tag.name}</ButtonText>
                <Icon as={X} size="sm" />
              </Button>
            </HStack>
          ))}
        </View>

        {/* Tag List */}
        {
          <View style={{ marginVertical: 8 }}>
            <Text style={{ fontSize: 16 }}>Matching Tags</Text>
            <VStack style={{ gap: 8 }}>
              {tags.map((tag) => (
                <Button
                  key={tag.id}
                  onPress={() => handleTagSelection(tag)}
                  variant={selectedTags.includes(tag) ? "solid" : "outline"}
                >
                  <ButtonText>{tag.name}</ButtonText>
                </Button>
              ))}
            </VStack>
          </View>
        }

        {/* Difficulty Selector */}
        <VStack style={{ gap: 8 }}>
          <Text style={{ fontSize: 16 }}>Difficulty</Text>
          {difficultyOptions.map((option) => (
            <HStack
              key={option}
              style={{
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <Button
                onPress={() => setDifficulty(option as DifficultyLevel)}
                variant={difficulty === option ? "solid" : "outline"}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                }}
              >
                <ButtonText style={{ fontSize: 14 }}>{option}</ButtonText>
              </Button>
            </HStack>
          ))}
        </VStack>

        {/* Submit Button */}
        <HStack style={{ justifyContent: "flex-end" }}>
          <Button onPress={handleSubmit} variant="solid">
            <ButtonText>Submit</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
}
