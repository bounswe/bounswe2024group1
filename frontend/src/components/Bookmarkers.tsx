import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useGetBookmarkers, GetBookmarkersResponse } from "@/services/api/semanticBrowseComponents";
import { Profile } from "./Profile";
import { ChevronRight } from "lucide-react";

export function Bookmarkers({ recipeId }: { recipeId: number }) {
    const { data: bookmarksData} = useGetBookmarkers<GetBookmarkersResponse>({
        pathParams: { recipeId }
    });
  return (
    <Dialog>
      <DialogTrigger asChild>
      <span className="flex cursor-pointer items-center text-sm text-gray-600">
          See bookmarkers <ChevronRight className="h-4 w-4" />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bookmarkers</DialogTitle>
        </DialogHeader>

        {bookmarksData && (
          <div className="grid gap-4 py-4">
            {bookmarksData.data.map((user) => (
              <Profile key={user.id} profile={user} />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
