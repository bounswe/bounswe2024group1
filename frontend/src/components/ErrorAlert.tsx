import { renderError } from "@/services/api/programmingForumFetcher";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function ErrorAlert<
  T extends Parameters<typeof renderError>[0],
>({ error }: { error: T }) {
  return (
    <div className="container flex flex-col gap-2 py-8">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{renderError(error)}</AlertDescription>
      </Alert>
    </div>
  );
}
