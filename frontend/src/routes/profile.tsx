import {
    useGetUserProfile,
    useUpdateUserProfile,
  } from "@/services/api/programmingForumComponents";
  import { Link, useParams } from "react-router-dom";
  import { Button } from "@/components/ui/button";
  import { AvatarImage, Avatar } from "@/components/ui/avatar";
  import Plus from "@/assets/Icon/General/Plus.svg?react";
  import { FullscreenLoading } from "@/components/FullscreenLoading";
  import ErrorAlert from "@/components/ErrorAlert";
  import { cn } from "@/lib/utils";
  import { QuestionCard } from "@/components/QuestionCard";
  import { AnswerCard } from "@/components/AnswerCard";
  import useAuthStore from "@/services/auth";
  import FollowButton from "@/components/FollowButton";
  import { useEffect, useRef, useState } from "react";
  import { Input } from "@/components/ui/input";
  import { Tabs, TabsList, TabsTrigger,TabsContent } from "@/components/ui/tabs";

  import { Textarea } from "@/components/ui/textarea";
  
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
                alt="Profile picture"
                src="https://placehold.co/640x640"
              />
            </Avatar>
            <div className="flex space-x-4 text-center">
              <div>
                <div className="font-bold">{profile.questionCount}</div>
                <div className="text-sm text-gray-500">Questions</div>
              </div>
              <div>
                <div className="font-bold">{profile.answerCount}</div>
                <div className="text-sm text-gray-500">Answers</div>
              </div>
              <div>
                <div className="font-bold">{profile.followersCount}</div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
              <div>
                <div className="font-bold">{profile.followingCount}</div>
                <div className="text-sm text-gray-500">Following</div>
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
                    !profile.bio ? "text-gray-300" : "text-gray-600",
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
              ) : null
            ) : (
              // <Button onClick={() => setEditing(true)} variant="outline">
              //   Edit profile
              // </Button>
              data?.data && <FollowButton profile={data?.data} />
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 px-4 py-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="answers">Answers</TabsTrigger>
            </TabsList>

            <TabsContent value="questions">
              <div className="flex items-center gap-4">
                <h3>Questions</h3>
                {me && (
                  <Button
                    asChild
                    size="icon"
                    className="rounded-full bg-red-500 text-white"
                  >
                    <Link to="/questions/new">
                      <Plus />
                    </Link>
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {(profile as any)?.questions?.map((question: any) => (
                  <QuestionCard
                    key={question.id}
                    id={question.id}
                    title={question.title}
                    content={question.content}
                    votes={question.votes}
                    answerCount={question.answerCount}
                    author={question.author}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="answers">
              <div className="flex items-center gap-4">
                <h3>Answers</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {(profile as any)?.answers?.map((answer: any) => (
                  <AnswerCard
                    key={answer.id}
                    id={answer.id}
                    content={answer.content}
                    title={answer.title}
                    votes={answer.votes}
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
  