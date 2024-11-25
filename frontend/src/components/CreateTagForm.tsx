import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useCreateTag } from "@/services/api/programmingForumComponents";
import { useState } from "react";

interface CreateTagFormProps {
  onCreateSuccess?: () => void; // Optional callback for successful tag creation
}

export function CreateTagForm({ onCreateSuccess }: CreateTagFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutateAsync: createTag, isPending } = useCreateTag();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    try {
      await createTag({
        body: { name, description },
      });
      setName("");
      setDescription("");
      if (onCreateSuccess) onCreateSuccess();
      // Optionally refresh the tag list or show a success message
    } catch (error) {
      console.error("Failed to create tag:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tag name"
        className="min-w-[200px]"
        required
      />

      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Tag description"
        className="min-h-[100px]"
        required
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isPending || !name.trim() || !description.trim()}
        >
          {isPending ? "Creating..." : "Create Tag"}
        </Button>
      </div>
    </form>
  );
}
