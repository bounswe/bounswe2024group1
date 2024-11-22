import clsx from "clsx";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Text, View } from "./ui";

export const FullscreenLoading = ({
  overlay = false,
}: {
  overlay?: boolean;
}) => {
  const [takingLong, setTakingLong] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTakingLong(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View
      className={clsx(
        "flex h-screen w-screen items-center justify-center",
        overlay && "fixed inset-0 z-20 bg-white bg-opacity-70"
      )}
    >
      <ActivityIndicator size="large" />
      {takingLong && (
        <View className="ml-4 text-lg font-normal duration-500 animate-in fade-in">
          <Text>This is taking a while...</Text>
        </View>
      )}
    </View>
  );
};
