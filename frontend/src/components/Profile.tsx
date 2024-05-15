import { Button } from "@/components/ui/button";
import { UserSummary } from "@/services/api/semanticBrowseSchemas";
import { Link } from "react-router-dom";

interface ProfileProps {
  profile: UserSummary;
}

export const Profile = ({ profile }: ProfileProps) => {
  return (
    <div className="flex items-center justify-between">
      <Link to={`/users/${profile.id}`} className="flex items-center gap-5">
        <img
          src={profile.profilePicture}
          alt="Author"
          className="mr-2 h-10 w-10 rounded-full"
        />
        <span className="text-lg font-medium text-gray-900">
          {profile.username}
        </span>
      </Link>
      <Button> Follow </Button>
    </div>
  );
};
