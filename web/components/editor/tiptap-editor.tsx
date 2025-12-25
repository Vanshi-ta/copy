"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useState } from 'react';
import { createPost } from '@/app/actions/blog';
import { useRouter } from 'next/navigation';
import { Bold, Italic, List, ListOrdered, Image as ImageIcon, Link as LinkIcon, Heading1, Heading2, Quote } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const TiptapEditor = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [coverImage, setCoverImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      LinkExtension.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Write your story...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[300px]"
      }
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    
    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const handlePublish = async () => {
    if (!title) return alert("Please add a title");
    
    setIsSubmitting(true);
    const content = editor.getHTML();
    
    // Hardcoded authorId for now (e.g., Alice from seed)
    // In a real app, this would come from auth session
    const result = await createPost({
      title,
      content,
      category,
      imageUrl: coverImage || undefined,
      authorId: 1 
    });

    if (result.success) {
      router.push(`/blog/${result.postId}`);
    } else {
      alert("Failed to publish");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="space-y-4">
        <Input 
          type="text" 
          placeholder="Post Title" 
          className="text-4xl font-bold border-none px-0 h-auto placeholder:text-gray-300 focus-visible:ring-0"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <div className="flex gap-4">
           <Input 
             placeholder="Cover Image URL" 
             value={coverImage}
             onChange={(e) => setCoverImage(e.target.value)}
           />
           <select 
             className="border rounded-md px-3 py-2 bg-transparent"
             value={category}
             onChange={(e) => setCategory(e.target.value)}
           >
             <option value="General">General</option>
             <option value="Tech">Tech</option>
             <option value="Lifestyle">Lifestyle</option>
             <option value="Design">Design</option>
           </select>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white dark:bg-black">
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 dark:bg-gray-900 sticky top-0 z-10 flex-wrap">
           <Button variant="ghost" size="icon-sm" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''}>
             <Bold className="w-4 h-4" />
           </Button>
           <Button variant="ghost" size="icon-sm" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''}>
             <Italic className="w-4 h-4" />
           </Button>
           <div className="w-px h-6 bg-gray-300 mx-2" />
           <Button variant="ghost" size="icon-sm" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-gray-700' : ''}>
             <Heading1 className="w-4 h-4" />
           </Button>
           <Button variant="ghost" size="icon-sm" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-700' : ''}>
             <Heading2 className="w-4 h-4" />
           </Button>
           <div className="w-px h-6 bg-gray-300 mx-2" />
           <Button variant="ghost" size="icon-sm" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : ''}>
             <List className="w-4 h-4" />
           </Button>
           <Button variant="ghost" size="icon-sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700' : ''}>
             <ListOrdered className="w-4 h-4" />
           </Button>
           <Button variant="ghost" size="icon-sm" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'bg-gray-200 dark:bg-gray-700' : ''}>
             <Quote className="w-4 h-4" />
           </Button>
           <div className="w-px h-6 bg-gray-300 mx-2" />
           <Button variant="ghost" size="icon-sm" onClick={setLink} className={editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : ''}>
             <LinkIcon className="w-4 h-4" />
           </Button>
           <Button variant="ghost" size="icon-sm" onClick={addImage}>
             <ImageIcon className="w-4 h-4" />
           </Button>
        </div>

        {/* Editor Content */}
        <div className="p-4 min-h-[500px]">
           <EditorContent editor={editor} />
        </div>
      </div>

      <div className="flex justify-end">
         <Button onClick={handlePublish} disabled={isSubmitting} className="px-8">
            {isSubmitting ? "Publishing..." : "Publish"}
         </Button>
      </div>
    </div>
  );
};

export default TiptapEditor;
