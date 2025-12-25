"use client";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Clock, Eye, Calendar } from "lucide-react";

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  href: string;
  views: number;
  readTime?: number;
  rating?: number;
  className?: string;
  // Optional new fields for enhanced UI
  author?: {
    name: string;
    imageUrl?: string;
  };
  createdAt?: string;
  summary?: string;
}

interface GridSectionProps {
  title: string;
  description: string;
  backgroundLabel?: string;
  backgroundPosition?: "left" | "right";
  posts?: BlogPost[];
  className?: string;
  onPostClick?: (post: BlogPost) => void;
}

import { useRouter } from "next/navigation";

export const Component = ({
  title,
  description,
  posts = [],
  className,
  onPostClick,
}: GridSectionProps) => {
  const router = useRouter();

  const handlePostClick = (post: BlogPost) => {
    if (onPostClick) {
      onPostClick(post);
    } else {
      router.push(post.href);
    }
  };

  // Featured post is the first one
  const regularPosts = posts;

  return (
    <section className={cn("py-20 px-4 md:px-8 max-w-7xl mx-auto", className)}>
      
      {/* Header Section */}
      <div className="mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground mb-4">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-12">
        
        
        {/* Regular Posts Grid */}
        <div className="flex flex-col divide-y divide-border">
           {regularPosts.map((post) => (
              <div
                  key={post.id}
                  onClick={() => handlePostClick(post)}
                  className="py-10 cursor-pointer hover:bg-muted/30 transition px-2"
               >
                  <div className="space-y-3 max-w-3xl">
                     <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight text-foreground hover:underline">
                        {post.title}
                     </h2>

                     <p className="text-muted-foreground text-base leading-relaxed">
                        {post.summary ||
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                     </p>

                     <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>{post.author?.name || "Anonymous"}</span>
                        <span>·</span>
                        <span>{post.createdAt || "Dec 16, 2024"}</span>
                     </div>
                  </div>
               </div>
           ))}
        </div>

      </div>
    </section>
  );
};