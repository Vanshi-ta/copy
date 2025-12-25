import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ChevronLeft, Share2, Bookmark } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: {
      author: true
    }
  });

  if (!post) {
    return notFound();
  }

  return (
    <article className="min-h-screen bg-white pb-24 pt-16">
      
      {/* Navigation & Actions */}
      <div className="container max-w-4xl mx-auto px-4 mb-8 flex justify-between items-center">
         <Link href="/blog" className="flex items-center text-muted-foreground hover:text-foreground transition-colors gap-1 group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Blog</span>
         </Link>
         <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="opacity-60 hover:opacity-100">
               <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
               <Bookmark className="w-4 h-4" />
            </Button>
         </div>
      </div>

      {/* Header Section */}
      <div className="container max-w-4xl mx-auto px-4 text-center space-y-6 mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
             <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">
                {post.category}
             </span>
             {post.readTime && (
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                   • {post.readTime} min read
                </span>
             )}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              {post.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground pt-4">
               <div className="flex items-center gap-2">
                   <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                        {/* Placeholder for author image if not available */}
                        <div className="absolute inset-0 bg-linear-to-br from-purple-400 to-blue-400" />
                   </div>
                   <div className="flex flex-col text-left">
                       <span className="font-semibold text-foreground">{post.author.name}</span>
                       <span className="text-xs">Author</span>
                   </div>
               </div>
               <div className="w-px h-8 bg-border" />
               <div className="flex flex-col text-left">
                     <span className="font-semibold text-foreground">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</span>
                     <span className="text-xs">Published</span>
               </div>
          </div>
      </div>

      {/* Featured Image */}
      {post.imageUrl && (
        <div className="container max-w-5xl mx-auto px-4 mb-16">
           <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-sm border border-border/50">
               <Image 
                 src={post.imageUrl} 
                 alt={post.title} 
                 fill 
                 className="object-cover"
                 priority
               />
           </div>
        </div>
      )}

      {/* Content Section */}
      <div className="container max-w-[720px] mx-auto px-6">
        <div 
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-7 prose-p:my-6 prose-a:underline prose-img:rounded-xl prose-img:shadow-sm text-foreground/90"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
        
        {/* Footer / Tags (Placeholder) */}
        <div className="mt-16 pt-8 border-t border-border">
           <p className="text-center text-muted-foreground text-sm italic">
              Thanks for reading!
           </p>
        </div>
      </div>
    </article>
  );
}
