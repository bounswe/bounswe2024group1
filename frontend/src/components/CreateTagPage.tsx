import { CreateTagForm } from "@/components/CreateTagForm"; // Import the CreateTagForm component
import { useNavigate } from "react-router-dom";

export default function CreateTagPage() {
  const navigate = useNavigate();
  return (
    <div className="container py-8">
      <h1 className="mb-4 text-2xl font-bold">Create a New Tag</h1>

      <CreateTagForm
        onCreateSuccess={(tag) => {
          // Logic to handle post-create actions (e.g., show success message, refresh list, etc.)
          console.log("Tag created successfully!", tag);
          navigate(`/tag/${tag.tagId}`);
        }}
      />
    </div>
  );
}
