import { TagList } from "@/components/TagList";
import { Divider, Text, VStack } from "@/components/ui";
import { QuestionListSearch } from "./QuestionsList";

export const Feed = () => {

  return (
    <VStack className="gap-8">
      <Text className="text-2xl font-bold">Tags</Text>
      <TagList searchQueryParams="" pagesize={3} />
      <Divider />
      <Text className="text-2xl font-bold">Latest Questions</Text>
      <QuestionListSearch pageSize={3} />
    </VStack>
  );
};
