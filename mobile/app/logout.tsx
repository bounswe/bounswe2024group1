import { Text } from "@/components/ui";
import { signout } from "@/services/auth";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function Logout() {
  const nvg = useNavigation();

  useEffect(() => {
    signout().then(() => {
      nvg.navigate("login" as never);
    });
  }, []);
  return <Text>Logout</Text>;
}
