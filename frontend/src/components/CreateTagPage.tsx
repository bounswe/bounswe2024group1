import { CreateTagForm } from "@/components/CreateTagForm"; // Import the CreateTagForm component

export default function CreateTagPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Create a New Tag</h1>

      <CreateTagForm
        onCreateSuccess={() => {
          // Logic to handle post-create actions (e.g., show success message, refresh list, etc.)
          console.log("Tag created successfully!");
        }}
      />
    </div>
  );
}