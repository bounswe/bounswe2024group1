import ErrorAlert from "@/components/ErrorAlert";
import FollowButton from "@/components/FollowButton";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { QuestionCard } from "@/components/QuestionCard";
import {
  Button,
  ButtonText,
  HStack,
  Image,
  Input,
  InputField,
  ScrollView,
  Text,
  Textarea,
  TextareaInput,
  VStack,
} from "@/components/ui";
import {
  useGetUserProfile,
  useUpdateUserProfile,
} from "@/services/api/programmingForumComponents";
import useAuthStore from "@/services/auth";
import { Link } from "expo-router";
import { Plus } from "lucide-react-native";
import { useEffect, useState } from "react";

export default function Profile() {
  return <UserProfile userId="me" />;
}

export function UserProfile({ userId }: { userId: string }) {
  const { selfProfile, fetchProfile } = useAuthStore();
  const me = userId === "me" || userId === selfProfile?.id?.toString();
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"questions" | "answers">(
    "questions"
  );

  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (!me) {
      setEditing(false);
    }
  }, [me]);

  const { isLoading, data, error, refetch } = useGetUserProfile(
    {
      pathParams: {
        userId: me ? ("me" as unknown as number) : parseInt(userId || "0"),
      },
    },
    {
      enabled: me || !isNaN(Number(userId)),
    }
  );

  const { mutateAsync, isPending } = useUpdateUserProfile({
    onSuccess: () => {
      fetchProfile();
      refetch().then(() => {
        setEditing(false);
      });
    },
    onError: () => {
      setEditing(false);
    },
  });

  useEffect(() => {
    if (data?.data) {
      setCountry(data.data.country || "");
      setBio(data.data.bio || "");
    }
  }, [data?.data]);

  if (!me && isNaN(Number(userId))) {
    return <Text>Invalid user id</Text>;
  }
  if (isLoading) {
    return <FullscreenLoading overlay />;
  }
  if (error) {
    return <ErrorAlert error={error} />;
  }

  const profile = data!.data;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 16 }}>
      <VStack space="md" className="px-4">
        <Text className="text-2xl font-bold">
          {me ? "My profile" : "Profile"}
        </Text>

        <HStack space="lg" className="items-center justify-between py-4">
          <Image
            source={{
              uri: "https://placehold.co/640x640",
            }}
            alt={`Profile picture of ${profile.username}`}
            style={{ width: 96, height: 96, borderRadius: 48 }}
          />
          <HStack space="md" className="flex-1 justify-around">
            <VStack className="items-center">
              <Text className="font-bold">{profile.questionCount}</Text>
              <Text className="text-sm text-gray-700">Questions</Text>
            </VStack>
            <VStack className="items-center">
              <Text className="font-bold">{profile.answerCount}</Text>
              <Text className="text-sm text-gray-700">Answers</Text>
            </VStack>
            <VStack className="items-center">
              <Text className="font-bold">{profile.followersCount}</Text>
              <Text className="text-sm text-gray-700">Followers</Text>
            </VStack>
            <VStack className="items-center">
              <Text className="font-bold">{profile.followingCount}</Text>
              <Text className="text-sm text-gray-700">Following</Text>
            </VStack>
          </HStack>
        </HStack>

        <VStack space="sm">
          {editing ? (
            <>
              <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  value={country}
                  onChangeText={setCountry}
                  placeholder="Country"
                />
              </Input>
              <Textarea>
                <TextareaInput
                  autoComplete="off"
                  value={bio}
                  onChangeText={setBio}
                  placeholder="Bio"
                />
              </Textarea>
            </>
          ) : (
            <>
              <Text className="text-xl font-bold">{profile.username}</Text>
              <Text
                className={!profile.bio ? "text-gray-500" : "text-gray-800"}
              >
                {profile.bio ?? "Empty bio."}
              </Text>
            </>
          )}

          {me ? (
            editing ? (
              <Button
                isDisabled={isPending}
                onPress={() => {
                  mutateAsync({
                    pathParams: {
                      userId: profile.id ?? 0,
                    },
                    body: {
                      ...profile,
                      country,
                      bio,
                    },
                  });
                }}
              >
                <ButtonText>{isPending ? "Saving..." : "Save"}</ButtonText>
              </Button>
            ) : (
              <Button variant="outline" onPress={() => setEditing(true)}>
                <ButtonText>Edit profile</ButtonText>
              </Button>
            )
          ) : (
            data?.data && <FollowButton profile={data?.data} />
          )}
        </VStack>

        <HStack space="md">
          <Button
            variant={activeTab === "questions" ? "solid" : "outline"}
            onPress={() => setActiveTab("questions")}
          >
            <ButtonText>Questions</ButtonText>
          </Button>
          <Button
            variant={activeTab === "answers" ? "solid" : "outline"}
            onPress={() => setActiveTab("answers")}
          >
            <ButtonText>Answers</ButtonText>
          </Button>
        </HStack>

        {activeTab === "questions" ? (
          <VStack space="md">
            <HStack space="md" className="items-center">
              <Text className="text-xl font-bold">Questions</Text>
              {me && (
                <Link href="/question/new" asChild>
                  <Button
                    size="sm"
                    style={{ borderRadius: 9999, backgroundColor: "#ef4444" }}
                  >
                    <Plus color="white" />
                  </Button>
                </Link>
              )}
            </HStack>
            <VStack space="md">
              {profile?.questions?.map((question) => (
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
            </VStack>
          </VStack>
        ) : (
          <VStack space="md">
            <Text className="text-xl font-bold">Answers</Text>
            <VStack space="md">
              {profile?.answers?.map((answer) => (
                <QuestionCard
                  key={answer.id}
                  id={String(answer.question?.id)}
                  title={answer.question?.title || ""}
                  content={answer.content}
                  votes={answer.rating}
                  answerCount={0}
                  author={answer.author}
                />
              ))}
            </VStack>
          </VStack>
        )}
      </VStack>
    </ScrollView>
  );
}
