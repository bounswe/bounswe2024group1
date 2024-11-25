
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
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { userId = "" } = useParams<{ userId: string }>();
  const { selfProfile, fetchProfile } = useAuthStore();
  const me = userId === "me" || userId === selfProfile?.id?.toString();
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("BEGINNER");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("questions");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleProfilePictureUpload = async () => {
    if (!profilePicture) return;

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    try {
      await fetch("/api/v1/users/me/upload-profile-picture", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      });
    } catch (err) {
      console.error("Failed to upload profile picture:", err);
    }
  };

  const { isLoading, data, error, refetch } = useGetUserProfile(
    {
      pathParams: {
        userId: me ? ("me" as unknown as number) : parseInt(userId),
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
    <div className="container bg-white py-16">
      <div className="flex flex-col gap-4 px-4 py-2">
        <div className="mb-4 flex items-center justify-between">
          <h1>{me ? "My profile" : "Profile"}</h1>
        </div>
        <div className="flex items-center justify-between space-x-8 py-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              alt={`Profile picture of ${profile.username}`}
              src={preview || profile.profilePicture || "https://placehold.co/640x640"}
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
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {editing ? (
              <>
                <Input
                  defaultValue={profile.bio}
                  maxLength={200}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-2"
                />
                <Input
                  defaultValue={profile.country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-2"
                />
                <select
                  defaultValue={profile.experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="mt-2"
                >
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                </select>
                <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2" />
              </>
            ) : (
              <>
                <h2>{profile.username}</h2>
                <p className={cn("text-sm", !profile.bio ? "text-gray-500" : "text-gray-800")}>
                  {profile.bio || "Empty bio."}
                </p>
              </>
            )}
          </div>
          {me ? (
            editing ? (
              <Button
                disabled={isPending}
                onClick={() => {
                  mutateAsync({
                    pathParams: { userId: profile.id ?? 0 },
                    body: { bio, country, experienceLevel },
                  });
                  handleProfilePictureUpload();
                }}
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            ) : (
              <Button onClick={() => setEditing(true)} variant="outline">
                Edit profile
              </Button>
            )
          ) : (
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
            <div className="grid grid-cols-3 gap-4">
              {profile.questions?.map((question) => (
                <QuestionCard key={question.id} {...question} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="answers">
            <div className="grid grid-cols-3 gap-4">
              {profile.answers?.map((answer) => (
                <AnswerCard key={answer.id} {...answer} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
