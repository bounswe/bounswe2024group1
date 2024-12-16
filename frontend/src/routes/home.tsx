import { Feed } from "./feed";

export function IndexRoute() {
  return (
    <>
      <div className="container flex flex-col gap-2 py-8">
        <h1 className="mb-4 text-4xl font-bold">
          Welcome to the Programming Languages Forum
        </h1>
        <Feed />
      </div>
    </>
  );
}
