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
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <section className={cn("py-20 px-4 md:px-8 max-w-7xl mx-auto", className)}>
      
      {/* Header Section */}
      <div className="mb-16 space-y-4">
        <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tighter text-foreground mb-6">
          {title}
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-12">
        
        {/* Featured Post Layout */}
        {featuredPost && (
           <div 
             onClick={() => handlePostClick(featuredPost)}
             className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center cursor-pointer"
           >
              <div className="relative overflow-hidden rounded-2xl aspect-4/3 lg:aspect-16/10 w-full bg-gray-100 dark:bg-gray-800">
                 <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${featuredPost.imageUrl})` }}
                 />
              </div>
              
              <div className="flex flex-col justify-center space-y-6 lg:pr-10">
                 <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {featuredPost.category}
                    </span>
                    {featuredPost.readTime && (
                       <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime} min read
                       </span>
                    )}
                 </div>
                 
                 <h3 className="text-3xl md:text-4xl font-sans font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                    {featuredPost.title}
                 </h3>
                 
                 <p className="text-lg text-muted-foreground line-clamp-3 leading-relaxed">
                    {featuredPost.summary || "Dive deep into the details of this topic. Discover insights, trends, and expert analysis that will help you stay ahead in the rapidly evolving landscape."}
                 </p>

                 <div className="flex items-center gap-4 text-sm font-medium text-gray-900 dark:text-gray-100 pt-4">
                    {featuredPost.author && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                           {/* Placeholder avatar if none provided */}
                           {featuredPost.author.imageUrl ? (
                             <img src={featuredPost.author.imageUrl} alt={featuredPost.author.name} className="w-full h-full object-cover" />
                           ) : ( 
                             <div className="w-full h-full bg-linear-to-br from-purple-400 to-blue-400" />
                           )}
                        </div>
                        <span>{featuredPost.author.name}</span>
                      </div>
                    )}
                    
                    <span className="text-gray-400">•</span>
                    
                    <button className="flex items-center gap-1 group/btn text-blue-600">
                       Read Article <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                 </div>
              </div>
           </div>
        )}

        {/* Divider */}
        {posts.length > 1 && <div className="h-px bg-gray-200 dark:bg-gray-800 w-full my-8" />}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
           {regularPosts.map((post) => (
              <div 
                key={post.id} 
                className="group cursor-pointer flex flex-col gap-4"
                onClick={() => handlePostClick(post)}
              >
                 <div className="relative overflow-hidden rounded-xl aspect-3/2 bg-gray-100 dark:bg-gray-800 mb-2">
                    <div 
                       className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                       style={{ backgroundImage: `url(${post.imageUrl})` }}
                    />
                    <div className="absolute top-4 left-4">
                       <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-white/90 text-black backdrop-blur-sm shadow-sm">
                          {post.category}
                       </span>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium uppercase tracking-wider">
                       <span>{post.createdAt || "Oct 24, 2024"}</span>
                       <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views}</span>
                       </div>
                    </div>

                    <h4 className="text-xl font-sans font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                       {post.title}
                    </h4>

                    {post.summary && (
                      <p className="text-base text-muted-foreground line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>
                    )}
                 </div>
              </div>
           ))}
        </div>

      </div>
    </section>
  );
};