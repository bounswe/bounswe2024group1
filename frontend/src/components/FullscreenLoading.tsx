import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

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
    <div
      className={clsx(
        "flex h-screen w-screen items-center justify-center",
        overlay && "fixed inset-0 z-20 bg-white bg-opacity-70",
      )}
    >
      <Loader2
        className="h-16 w-16 animate-spin text-primary"
      />
      {!takingLong && (
        <div className="ml-4 text-lg font-normal duration-500 animate-in fade-in">
          Loading...
        </div>
      )}
      {takingLong && (
        <div className="ml-4 text-lg font-normal duration-500 animate-in fade-in">
          This is taking a while...
        </div>
      )}
    </div>
  );
};
