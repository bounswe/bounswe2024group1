import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { CodeSnippet } from "./CodeSnippet";
import CustomAnchor from "./CustomAnchor";

interface ContentWithSnippetsProps {
  content: string;
}

export const ContentWithSnippets: React.FC<ContentWithSnippetsProps> = ({
  content,
}) => {
  const parseContent = (text: string) => {
    const codeBlockRegex = /```(\w+(?:-exec)?)\n([\s\S]*?)```/g;
    const parts: {
      type: "text" | "code";
      content: string;
      language?: string;
    }[] = [];
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
          content: code.trim(),
          language: lang.replace("-exec", ""),
        });
      } else {
        parts.push({
          type: "text",
          content: match[0],
        });
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex),
      });
    }

    return parts;
  };

  const renderedContent = React.useMemo(() => {
    return parseContent(content).map((part, index) => {
      if (part.type === "code" && part.language) {
        return (
          <CodeSnippet
            key={index}
            code={part.content}
            language={part.language}
          />
        );
      }
      return (
        <ReactMarkdown
          key={index}
          components={
            {
              a: CustomAnchor,
            } as Components
          }
        >
          {part.content}
        </ReactMarkdown>
      );
    });
  }, [content]);

  return <div className="prose max-w-full">{renderedContent}</div>;
};
