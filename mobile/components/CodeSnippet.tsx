import { Text } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { useExecuteCode } from "@/services/api/programmingForumComponents";
import { CodeExecution } from "@/services/api/programmingForumSchemas";
import React from "react";
import { View } from "react-native";
// import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
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
    <View className="not-prose relative flex flex-col gap-2 overflow-hidden rounded-xl border border-gray-400 bg-gray-100 p-4">
      <Text className="text-sm font-bold">
        {languageUserFriendlyName[
          language as keyof typeof languageUserFriendlyName
        ] ?? "Unknown"}{" "}
        Code Snippet
      </Text>
      <Text className="font-mono">{code}</Text>
      {/* <SyntaxHighlighter language={language} style={docco}>
        {code}
      </SyntaxHighlighter> */}
      <Button
        className="self-start"
        onPress={handleExecute}
        disabled={executeCode.isPending}
      >
        {executeCode.isPending ? "Executing..." : "Execute"}
      </Button>
      {executeCode.isSuccess && (
        <View className="mt-2 rounded border border-green-300 bg-green-100 p-2">
          <Text className="mb-4 text-sm font-bold">Output:</Text>
          <Text className="bg-green-50 p-1 font-mono">
            {executeCode.data.data.output}
          </Text>
        </View>
      )}
      {executeCode.isError && (
        <View className="mt-2 rounded border border-red-300 bg-red-100 p-2">
          <Text className="font-bold">Error:</Text>
          <Text className="bg-red-50 p-1 font-mono">
            {executeCode.error.payload.error?.errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};
