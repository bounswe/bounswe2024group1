import ErrorAlert from "@/components/ErrorAlert";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { QuestionList } from "@/components/QuestionsList";
import {
  Button,
  ButtonGroup,
  ButtonText,
  HStack,
  Icon,
  Image,
  ScrollView,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectTrigger,
  Text,
  View,
  VStack,
} from "@/components/ui";
import { useGetTagDetails } from "@/services/api/programmingForumComponents";
import { DifficultyLevel } from "@/services/api/programmingForumSchemas";
import useAuthStore from "@/services/auth";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon, ChevronDownIcon, Plus } from "lucide-react-native";
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
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel>();

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

  return (
    <VStack className="flex-1 px-2 my-8 mt-8">
      <HStack className="flex items-center justify-between">
        <Button
          onPress={() => router.back()}
          className="self-start mt-4 ml-2"
          variant={"outline"}
          size="sm"
        >
          <Icon as={ArrowLeftIcon} />
        </Button>
      </HStack>
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
                <Link href={`/question/new?tagIds=${tag.tagId}`} asChild>
                  <Button
                    size="md"
                    style={{ borderRadius: 9999, backgroundColor: "#ef4444" }}
                  >
                    <Icon as={Plus} color="white" />
                  </Button>
                </Link>
              )}
            </HStack>
            <HStack className="flex items-center justify-between">
              <ButtonGroup className="flex items-center gap-2">
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

              <Select
                className="w-1/3 ml-auto"
                selectedValue={difficultyFilter}
                onValueChange={(value) => setDifficultyFilter(value as DifficultyLevel)}
              >
                <SelectTrigger variant="outline" size="md">
                  <SelectInput placeholder="Difficulty" />
                  <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="All" value="" />
                    <SelectItem label="Easy" value="EASY" />
                    <SelectItem label="Medium" value="MEDIUM" />
                    <SelectItem label="Hard" value="HARD" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </HStack>


            <QuestionList 
              searchQueryParams=""
              tagFilter={tag.tagId}
              {...(difficultyFilter ? { difficultyFilter } : {})}
              sortBy={tab === "top-rated" ? "TOP_RATED" : "RECENT"}
             />
          </VStack>
        </View>
      </ScrollView>
    </VStack>
  );
}
