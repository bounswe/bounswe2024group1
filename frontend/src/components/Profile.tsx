import { UserSummary } from "@/services/api/programmingForumSchemas";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import useAuthStore from "@/services/auth";

interface ProfileProps {
  profile: UserSummary;
}

export const Profile = ({ profile }: ProfileProps) => {
  const { selfProfile } = useAuthStore();

  return (
    <div className="flex items-center justify-between">
      <Link to={`/users/${profile.id}`} className="flex items-center gap-5">
        <span className="text-lg font-medium text-gray-900">
          {profile.username}
        </span>
      </Link>
      {profile.id !== selfProfile?.id && <FollowButton profile={profile} />}
    </div>
  );
};
