import { useState } from "react";

export function IndexRoute() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button
        className="rounded-lg"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button>
    </>
  );
}
