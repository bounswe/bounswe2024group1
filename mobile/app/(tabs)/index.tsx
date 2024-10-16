import { Image, Text } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function HomeScreen() {
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
    </ParallaxScrollView>
  );
}
