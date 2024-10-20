import clsx from "clsx";
import { Loader2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
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
        overlay && "fixed inset-0 z-20 bg-white bg-opacity-70",
      )}
    >
      <Loader2
        aria-label="Loading"
        className="h-16 w-16 animate-spin text-primary"
      />
      {takingLong && (
        <View className="ml-4 text-lg font-normal duration-500 animate-in fade-in">
          This is taking a while...
        </View>
      )}
    </View>
  );
};
