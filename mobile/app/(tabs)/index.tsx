import { Image, Text } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Button, ButtonText } from "@/components/ui";
import useAuthStore from "@/services/auth";
import { router } from "expo-router";

export default function HomeScreen() {
  const auth = useAuthStore();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          className="h-[178px] w-[500px] absolute left-0 bottom-0 "
        />
      }
    >
      <Text className="text-2xl ml-4 font-bold">Welcome to React Native!</Text>
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
    </ParallaxScrollView>
  );
}
