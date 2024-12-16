import ErrorAlert from "@/components/ErrorAlert";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { QuestionList } from "@/components/QuestionsList";
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
    <VStack className="flex-1 px-4 my-8">
      <Button
        onPress={() => router.back()}
        className="self-start my-3"
        variant={"outline"}
        size="sm"
      >
        <Icon as={ArrowLeftIcon} />
      </Button>
      {questions.length == 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-500">
            No bookmarked questions found.
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerClassName="py-8 flex-grow">
          <View className="px-4 gap-4">
            <HStack className="items-center justify-between">
              <Text className="text-2xl font-bold">Bookmarked Questions</Text>
            </HStack>

            <QuestionList 
              questions={ questions as QuestionSummary[] }
            />

          </View>
        </ScrollView>
      )}
    </VStack>
  );

}
