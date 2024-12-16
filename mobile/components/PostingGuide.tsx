import {
  Text,
  View,
  ScrollView,
} from "@/components/ui";
import { openURL } from "expo-linking";

export const PostingGuide = () => {
  return (
    <View className="w-11/12 max-h-96 bg-white rounded-lg p-4 shadow-md">
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        {/* Writing Answers Section */}
        <Text className="text-lg font-bold mb-2">Writing Answers</Text>
        <Text className="text-sm text-gray-600 mb-4">
          We use Markdown for formatting answers. You can use standard Markdown
          syntax for headers, lists, links, etc. For a basic reference, you can
          check{" "}
          <Text
            className="text-blue-500 underline"
            onPress={() => openURL("https://commonmark.org/help/")}
          >
            CommonMark
          </Text>
          .
        </Text>

        {/* Code Execution Section */}
        <Text className="text-lg font-bold mb-2">Code Execution</Text>
        <Text className="text-sm text-gray-600 mb-2">
          To create executable code blocks, use triple backticks with
          language-exec:
        </Text>
        <ScrollView horizontal className="bg-gray-100 rounded-md p-3 mb-4">
          <Text className="font-mono text-sm text-gray-800">
            {`\`\`\`javascript-exec\nconsole.log("Hello, world!, This is executable!");\`\`\``}
          </Text>
        </ScrollView>

        {/* Linking Section */}
        <Text className="text-lg font-bold mb-2">Linking</Text>
        <Text className="text-sm text-gray-600">
          Link to tags using:{" "}
          <Text className="bg-gray-100 rounded px-1 font-mono">
            [tag name](#tag-123)
          </Text>
          {"\n"}
          Link to questions using:{" "}
          <Text className="bg-gray-100 rounded px-1 font-mono">
            [question title](#q-456)
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};
