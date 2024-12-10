import { ScrollView, Text } from "react-native";

import { Button, ButtonText, VStack } from "@/components/ui";
import useAuthStore from "@/services/auth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Feed } from "@/components/Feed";

export default function HomeScreen() {
  const auth = useAuthStore();
  return (
    <ScrollView>
      <VStack space="lg" className="container px-4 py-6">
        <Ionicons name="code-slash" size={178} color="#A1CEDC" />
        <Text className="text-2xl ml-4 font-bold">
          Welcome to Programming Languages Forum!
        </Text>
        <Text className="text-lg ml-4 font-bold">
          Here you can find information about programming languages, libraries,
          frameworks, and more! Login to start exploring!
        </Text>
        {!auth.token && (
          <>
            <Button
              onPress={() => {
                router.push("/login");
              }}
            >
              <ButtonText>Login</ButtonText>
            </Button>
            <Button
              onPress={() => {
                router.push("/signup");
              }}
            >
              <ButtonText>Signup</ButtonText>
            </Button>
          </>
        )}
        {auth.token && (
          <Button
            onPress={() => {
              router.push("/logout");
            }}
          >
            <ButtonText>Logout</ButtonText>
          </Button>
        )}
        <Feed />
      </VStack>
    </ScrollView>
  );
}
