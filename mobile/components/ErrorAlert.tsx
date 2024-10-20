import { renderError } from "@/services/api/programmingForumFetcher";
import { View } from "react-native";
import { Alert, AlertIcon, AlertText } from "./ui/alert";
export default function ErrorAlert<
  T extends Parameters<typeof renderError>[0],
>({ error }: { error: T }) {
  return (
    <View className="container flex flex-col gap-2 py-8">
      <Alert variant="outline" action="error">
        <AlertIcon className="h-4 w-4" />
        <AlertText>{renderError(error)}</AlertText>
      </Alert>
    </View>
  );
}
