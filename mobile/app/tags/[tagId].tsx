import ErrorAlert from "@/components/ErrorAlert";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { QuestionCard } from "@/components/QuestionCard";
import {
  Button,
  ButtonGroup,
  ButtonText,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from "@/components/ui";
import { useGetTagDetails } from "@/services/api/programmingForumComponents";
import useAuthStore from "@/services/auth";
import { Link, useLocalSearchParams } from "expo-router";
import { Plus } from "lucide-react-native";
import { useState } from "react";

export default function TagPage() {
  const { tagId } = useLocalSearchParams<{ tagId: string }>();

  const { data, isLoading, error } = useGetTagDetails(
    {
      pathParams: { tagId: tagId! },
    },
    {
      enabled: !!tagId,
    }
  );

  const tag = data?.data;
  const token = useAuthStore((s) => s.token);
  const [tab, setTab] = useState<"top-rated" | "recent">("top-rated");

  const highlightedQuestions = tag?.relatedQuestions;

  if (isLoading) {
    return <FullscreenLoading overlay />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!tag) {
    return (
      <ErrorAlert
        error={{
          status: 404,
          payload: { status: 404, message: "Tag not found." },
        }}
      />
    );
  }

  // TODO: fix this when backend catches up
  const questions = tag?.relatedQuestions || [];

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 32, flexGrow: 1 }}>
      <View style={{ paddingHorizontal: 16, gap: 16 }}>
        <HStack
          style={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Text className="text-2xl font-bold">{tag.name}</Text>
        </HStack>
        <Image
          source={{ uri: tag?.logoImage || "https://placehold.co/400x300" }}
          alt={tag.name}
          style={{
            height: 192,
            width: "100%",
            borderRadius: 24,
            resizeMode: "contain",
          }}
        />
        <Text>{tag.description}</Text>

        <VStack style={{ marginTop: 16, gap: 16 }}>
          <HStack style={{ alignItems: "center", gap: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Questions</Text>
            {!!token && (
              <Link href={`/question/new?tagId=${tag.tagId}`} asChild>
                <Button
                  size="md"
                  style={{ borderRadius: 9999, backgroundColor: "#ef4444" }}
                >
                  <Icon as={Plus} color="white" />
                </Button>
              </Link>
            )}
          </HStack>
          <ButtonGroup>
            <Button
              variant={tab === "top-rated" ? "solid" : "outline"}
              onPress={() => setTab("top-rated")}
            >
              <ButtonText>Top-Rated</ButtonText>
            </Button>
            <Button
              variant={tab === "recent" ? "solid" : "outline"}
              onPress={() => setTab("recent")}
            >
              <ButtonText>Recent</ButtonText>
            </Button>
          </ButtonGroup>

          {highlightedQuestions?.map((question) => (
            <QuestionCard
              key={question.id}
              id={String(question.id)}
              title={question.title}
              content={question.questionBody}
              votes={question.likeCount}
              answerCount={question.commentCount}
              author={question.author}
              highlighted={true}
            />
          ))}

          {tab === "top-rated" ? (
            <View style={{ gap: 16 }}>
              {questions &&
                questions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    id={String(question.id)}
                    title={question.title}
                    content={question.questionBody}
                    votes={question.likeCount}
                    answerCount={question.commentCount}
                    author={question.author}
                  />
                ))}
            </View>
          ) : (
            <View style={{ gap: 16 }}>
              {questions &&
                questions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    id={String(question.id)}
                    title={question.title}
                    content={question.questionBody}
                    votes={question.likeCount}
                    answerCount={question.commentCount}
                    author={question.author}
                  />
                ))}
            </View>
          )}
        </VStack>
      </View>
    </ScrollView>
  );
}
