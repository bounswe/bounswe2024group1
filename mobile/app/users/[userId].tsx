import UserProfile from "@/components/UserProfile";
import { useLocalSearchParams } from "expo-router";

export default function ProfilePage() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  return <UserProfile userId={userId} />;
}