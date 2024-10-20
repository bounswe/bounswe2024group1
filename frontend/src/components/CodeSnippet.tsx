import { Button } from "@/components/ui/button";
import { useExecuteCode } from "@/services/api/programmingForumComponents";
import { CodeExecution } from "@/services/api/programmingForumSchemas";
import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeSnippetProps {
  code: string;
  language: string;
}

const languageUserFriendlyName = {
  python3: "Python",
  "python3-exec": "Python",
  c: "C",
  csharp: "C#",
  cpp: "C++",
  go: "Go",
  java: "Java",
  javascript: "JavaScript",
} satisfies Record<string, string>;

export const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language }) => {
  const executeCode = useExecuteCode();

  const handleExecute = () => {
    const execution: CodeExecution = {
      code,
      language: language as CodeExecution["language"],
    };
    executeCode.mutate({ body: execution });
  };

  return (
    <div className="not-prose relative flex flex-col gap-2 overflow-hidden rounded-xl border border-gray-400 bg-gray-100 p-4">
      <h4 className="text-sm font-bold">
        {languageUserFriendlyName[
          language as keyof typeof languageUserFriendlyName
        ] ?? "Unknown"}{" "}
        Code Snippet
      </h4>
      <SyntaxHighlighter language={language} style={docco}>
        {code}
      </SyntaxHighlighter>
      <Button
        className="self-start"
        onClick={handleExecute}
        disabled={executeCode.isPending}
      >
        {executeCode.isPending ? "Executing..." : "Execute"}
      </Button>
      {executeCode.isSuccess && (
        <div className="mt-2 rounded border border-green-300 bg-green-100 p-2">
          <h4 className="mb-4 text-sm font-bold">Output:</h4>
          <pre className="bg-green-50 p-1">{executeCode.data.data.output}</pre>
        </div>
      )}
      {executeCode.isError && (
        <div className="mt-2 rounded border border-red-300 bg-red-100 p-2">
          <h4 className="font-bold">Error:</h4>
          <pre>{executeCode.error.payload.error?.errorMessage}</pre>
        </div>
      )}
    </div>
  );
};
