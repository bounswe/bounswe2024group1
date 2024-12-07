import ErrorAlert from "@/components/ErrorAlert";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { QuestionCard } from "@/components/QuestionCard";
import {
  Button,
  HStack,
  Icon,
  ScrollView,
  Text,
  View,
  VStack,
} from "@/components/ui";
import { useGetBookmarkedQuestions } from "@/services/api/programmingForumComponents";
import { QuestionSummary } from "@/services/api/programmingForumSchemas";
import useAuthStore from "@/services/auth";
import { router } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";

export default function BookmarkedQuestionsPage() {
  const auth = useAuthStore();

  const { data, isLoading, error } = useGetBookmarkedQuestions({});

  const questions = data?.data || [];

  if (isLoading) {
  return <FullscreenLoading overlay />;
  }

  if (error) {
  return <ErrorAlert error={error} />;
  }


  return (
    <VStack style={{ flex: 1, padding: 16, marginVertical: 32 }}>
      <Button onPress={() => router.back()} style={{ alignSelf: "flex-start", marginVertical: 12 }} variant={"outline"} size="sm">
        <Icon as={ArrowLeftIcon} />
      </Button>
      {questions.length == 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18, color: "gray" }}>No bookmarked questions found.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingVertical: 32, flexGrow: 1 }}>
          <View style={{ paddingHorizontal: 16, gap: 16 }}>
          <HStack
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Text className="text-2xl font-bold">Bookmarked Questions</Text>
          </HStack>

          <VStack style={{ marginTop: 16, gap: 16 }}>

            <View style={{ gap: 16 }}>
            {
              questions
                .sort((a: QuestionSummary, b: QuestionSummary) => a.createdAt < b.createdAt ? 1 : -1)
                .map((question: QuestionSummary) => (
                <QuestionCard
                  key={question.id}
                  id={String(question.id)}
                  title={question.title}
                  content={question.content}
                  votes={question.likeCount}
                  answerCount={question.commentCount}
                  author={question.author}
                />
                ))}
            </View>
          </VStack>
          </View>
        </ScrollView>
      )}
    </VStack>
  );
}
