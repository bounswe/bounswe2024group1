import Plus from "@/assets/Icon/General/Plus.svg?react";
import { AnswerCard } from "@/components/AnswerCard";
import ErrorAlert from "@/components/ErrorAlert";
import FollowButton from "@/components/FollowButton";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { QuestionCard } from "@/components/QuestionCard";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  useGetUserProfile,
  useUpdateUserProfile,
} from "@/services/api/programmingForumComponents";
import useAuthStore from "@/services/auth";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import placeholderProfile from "@/assets/placeholder_profile.png";

export default function Profile() {
  const { userId = "" } = useParams<{ userId: string }>();
  const { selfProfile, fetchProfile } = useAuthStore();
  const me = userId === "me" || userId === selfProfile?.id?.toString();
  const [editing, setEditing] = useState(false);

  const countryRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);

  const [activeTab, setActiveTab] = useState("questions");

  useEffect(() => {
    if (!me) {
      setEditing(false);
    }
  }, [me]);

  const { isLoading, data, error, refetch } = useGetUserProfile(
    {
      pathParams: {
        userId: me ? ("me" as unknown as number) : parseInt(userId),
      },
    },
    {
      enabled: me || !isNaN(Number(userId)),
    },
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

  if (!me && isNaN(Number(userId))) {
    return <h1>Invalid user id</h1>;
  }
  if (isLoading) {
    return <FullscreenLoading overlay />;
  }
  if (error) {
    return <ErrorAlert error={error} />;
  }

  const profile = data!.data;
  return (
    <div key="1" className="container bg-white py-16">
      <div className="flex flex-col gap-4 px-4 py-2">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="">{me ? "My profile" : "Profile"}</h1>
        </div>
        <div className="flex items-center justify-between space-x-8 py-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              alt={`Profile picture of ${profile.username}`}
              src={placeholderProfile}
            />
          </Avatar>
          <div className="flex space-x-4 text-center">
            <div>
              <div className="font-bold">{profile.questionCount}</div>
              <div className="text-sm text-gray-700">Questions</div>
            </div>
            <div>
              <div className="font-bold">{profile.answerCount}</div>
              <div className="text-sm text-gray-700">Answers</div>
            </div>
            <div>
              <div className="font-bold">{profile.followersCount}</div>
              <div className="text-sm text-gray-700">Followers</div>
            </div>
            <div>
              <div className="font-bold">{profile.followingCount}</div>
              <div className="text-sm text-gray-700">Following</div>
            </div>
            <div>
              <div className="font-bold">{profile.reputationPoints}</div>
              <div className="text-sm text-gray-700">Reputation Points</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col ">
            {editing ? (
              <Input
                defaultValue={profile.country}
                ref={countryRef}
                placeholder="Country"
                className="mt-2"
              />
            ) : (
              <h2 className="">{profile.username}</h2>
            )}
            {editing ? (
              <Textarea
                defaultValue={profile.bio}
                ref={bioRef}
                placeholder="Bio"
                className="mt-2"
              />
            ) : (
              <p
                className={cn(
                  "text-sm",
                  !profile.bio ? "text-gray-500" : "text-gray-800",
                )}
              >
                {profile.bio ?? "Empty bio."}
              </p>
            )}
          </div>
          {me ? (
            editing ? (
              <Button
                disabled={isPending}
                onClick={() => {
                  mutateAsync({
                    pathParams: {
                      userId: profile.id ?? 0, //CHECK!!
                    },
                    body: {
                      ...profile,
                      country: countryRef.current?.value ?? "",
                      bio: bioRef.current?.value ?? "",
                    },
                  });
                }}
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            ) : (
              <div className="flex gap-4 justify-center items-center">
                <Button onClick={() => setEditing(true)} variant="outline">
                  Edit Profile
                </Button>
                <Button asChild variant="outline">
                  <Link to="/bookmarks">Bookmarks</Link>
                </Button>
              </div>
            )
          ) : (
            data?.data && (
              <FollowButton
                profile={{
                  id: parseInt(userId),
                  selfFollowing: profile.selfFollowing,
                }}
              />
            )
          )}
        </div>
        {profile.followedTags && profile.followedTags.length > 0 ? (
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-2">
                <span>Followed tags: </span>
                {profile.followedTags
                  ?.map((s) => (
                    <Link to={`/tag/${s.id}`} key={s.name}>
                      <Badge>{s.name}</Badge>
                    </Link>
                  ))
                  .slice(0, 3)}
                {profile.followedTags?.length > 3 && (
                  <span>+ {profile.followedTags?.length - 3} more</span>
                )}
              </span>
            </div>
          </div>
        ) : (
          <div>No followed tags to show. Follow tags to personalize your feed.</div>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-4 px-4 py-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="answers">Answers</TabsTrigger>
          </TabsList>

          <TabsContent value="questions">
            <div className="flex items-center gap-4 py-4">
              <h3>Questions</h3>
              {me && (
                <Button
                  asChild
                  size="icon"
                  className="rounded-full bg-red-500 text-white"
                >
                  <Link to="/questions/new" aria-label="Create New Question">
                    <Plus />
                  </Link>
                </Button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {profile?.questions?.map((question) => (
                <QuestionCard
                  difficulty={question.difficulty}
                  key={question.id}
                  id={question.id}
                  title={question.title}
                  content={question.content ?? ""}
                  votes={question.upvoteCount}
                  answerCount={question.answerCount}
                  author={question.author}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="answers">
            <div className="flex items-center gap-4 py-4">
              <h3>Answers</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {profile?.answers?.map((answer) => (
                <AnswerCard
                  key={answer.id}
                  id={answer.id}
                  content={answer.content}
                  title={answer.question!.title!}
                  questionId={answer.question!.id}
                  votes={answer.rating}
                  author={answer.author}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
