import React from "react";
import { View } from "react-native";
import { CodeSnippet } from "./CodeSnippet";
import { Text } from "./ui";
interface ContentWithSnippetsProps {
  content: string;
}

export const ContentWithSnippets: React.FC<ContentWithSnippetsProps> = ({
  content,
}) => {
  const parseContent = (text: string) => {
    const codeBlockRegex = /```(\w+(?:-exec)?)\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: text.slice(lastIndex, match.index),
        });
      }

      const [, lang, code] = match;
      if (lang.endsWith("-exec")) {
        parts.push({
          type: "code",
          language: lang.replace("-exec", ""),
          code: code.trim(),
        });
      } else {
        parts.push({ type: "text", content: match[0] });
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({ type: "text", content: text.slice(lastIndex) });
    }

    return parts;
  };

  const renderedContent = React.useMemo(() => {
    return parseContent(content).map((part, index) => {
      if (part.type === "code" && part.language) {
        return (
          <CodeSnippet key={index} code={part.code} language={part.language} />
        );
      }
      return (
        <Text className="font-mono" key={index}>
          {part.code}
        </Text>
      );
      return <Text key={index}>{part.content}</Text>;
    });
  }, [content]);

  return <View className="prose whitespace-pre-wrap">{renderedContent}</View>;
};
