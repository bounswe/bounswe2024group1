import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useGetBookmarkers, GetBookmarkersResponse } from "@/services/api/semanticBrowseComponents";
import { Profile } from "./Profile";

export function Bookmarkers({ recipeId }: { recipeId: number }) {
    const { data: bookmarksData, isLoading, error } = useGetBookmarkers<GetBookmarkersResponse>({
        pathParams: { recipeId }
    });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Bookmarkers</Button>
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
