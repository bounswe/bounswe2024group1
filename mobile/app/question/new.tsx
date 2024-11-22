import { Input, InputField } from "@/components/ui/input";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import ErrorAlert from "@/components/ErrorAlert";
import { useCreateQuestion, useSearchTags } from "@/services/api/programmingForumComponents";
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
} from "@/components/ui";
import { X } from "lucide-react-native";
import { EASY, MEDIUM, HARD, DifficultyLevel, TagSummary } from "@/services/api/programmingForumSchemas";

export default function NewQuestionPage() {
  const { tagId } = useLocalSearchParams<{ tagId: string }>();
  const { mutateAsync: createQuestion, status, error } = useCreateQuestion();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const contentLength = content.length;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagSummary[]>([]);

  const [difficulty, setDifficulty] = useState<DifficultyLevel>(EASY);
  const difficultyOptions = [EASY, MEDIUM, HARD];

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

  const { data: searchResult, isLoading, error: searchError } = useSearchTags(
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
      console.log("Selected Tags:", selectedTags.map((tag) => tag.name));

      await createQuestion({
        body: { title, content, difficulty, tagIds: selectedTags.map((tag) => tag.id).filter((id): id is number => id !== undefined) },
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
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Create New Question</Text>
        
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
          <Text style={{ fontSize: 12, color: '#888' }}>
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
          {selectedTags.length > 0
            ? `Selected tags:`
            : "No tags selected"}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 8 }}>
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
        { (
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
        )}

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
    </View>
  );
}
