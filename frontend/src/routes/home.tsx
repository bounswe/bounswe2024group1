import { AnswerCard } from "@/components/AnswerCard";
import { QuestionCard } from "@/components/QuestionCard";

export function IndexRoute() {
  return (
    <>
      <div className="container flex flex-col gap-2 py-8">
        <h1 className="mb-4 text-4xl font-bold">
          Welcome to Programming Languages Forum
        </h1>
        <div className="grid grid-cols-3 gap-4">
          <QuestionCard
            id="q123"
            title="Is there any algorithm to check memory safety and data races..."
            content="I am aware of the question regarding combining AddressSanitizer and ThreadSanitizer. I am asking about this from the theoretical computer science point of..."
            votes={4}
            answerCount={2}
            author={{
              id: "u1",
              name: "John Doe",
              profilePicture: "https://placehold.co/400x400",
            }}
          />

          <AnswerCard
            id="a456"
            title="Is there any algorithm to check memory safety and data races..."
            content="Valgrind memcheck, DRD and Helgrind all detect errors in this code. For DRD I recommend using --tool=drd --fair-sched=yes --check-stack-var=yes..."
            votes={1}
            author={{
              id: "u2",
              name: "Jane Smith",
              profilePicture: "https://placehold.co/400x400",
            }}
          />
        </div>
      </div>
    </>
  );
}
