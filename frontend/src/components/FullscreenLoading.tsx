import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export const FullscreenLoading = () => {
  const [takingLong, setTakingLong] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTakingLong(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
      {takingLong && (
        <div className="ml-4 text-lg font-normal">
          This is taking a while...
        </div>
      )}
    </div>
  );
};
