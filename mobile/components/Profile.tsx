import { UserSummary } from "@/services/api/programmingForumSchemas";
import useAuthStore from "@/services/auth";
import { Link } from "expo-router";
import FollowButton from "./FollowButton";
import { Text, View } from "./ui";

interface ProfileProps {
  profile: UserSummary;
}

export const Profile = ({ profile }: ProfileProps) => {
  const { selfProfile } = useAuthStore();

  return (
    <View className="flex items-center justify-between">
      <Link href={`/users/${profile.id}`} className="flex items-center gap-5">
        <Text className="text-lg font-medium text-gray-900">
          {profile.username}
        </Text>
      </Link>
      {profile.id !== selfProfile?.id && <FollowButton profile={profile} />}
    </View>
  );
};
