import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from "@/hooks/useColorScheme";
import { queryClient } from "@/services/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    SystemUI.setBackgroundColorAsync("white");
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider>
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <Slot />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}
