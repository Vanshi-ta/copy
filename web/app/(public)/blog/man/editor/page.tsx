import TiptapEditor from "@/components/editor/tiptap-editor";

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Create New Blog Post</h1>
        <TiptapEditor />
      </div>
    </div>
  );
}
