"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  href: string;
  views: number;
  readTime?: number;
  rating?: number;
  author?: {
    name: string;
  };
  createdAt?: string;
  summary?: string;
}

interface GridSectionProps {
  title: string;
  description: string;
  posts?: BlogPost[];
  className?: string;
  onPostClick?: (post: BlogPost) => void;
}

/* -------------------- */
/* Dummy fallback posts */
/* -------------------- */
const DUMMY_POSTS: BlogPost[] = [
  {
    id: 1001,
    title: "How modern logistics platforms scale to millions of deliveries",
    category: "Operations",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    href: "#",
    views: 1200,
    summary:
      "A behind-the-scenes look at how large-scale delivery platforms handle routing, capacity planning, and last-mile efficiency.",
    author: { name: "Team Move" },
    createdAt: "Jan 12, 2025",
  },
  {
    id: 1002,
    title: "What makes a great moving experience for customers?",
    category: "Product",
    imageUrl:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop",
    href: "#",
    views: 980,
    summary:
      "From transparent pricing to real-time updates, we break down the core principles behind delightful moving experiences.",
    author: { name: "Move Design" },
    createdAt: "Jan 08, 2025",
  },
  {
    id: 1003,
    title: "Designing trust in on-demand service platforms",
    category: "Design",
    imageUrl:
      "https://images.unsplash.com/photo-1556155092-8707de31f9c4?q=80&w=800&auto=format&fit=crop",
    href: "#",
    views: 760,
    summary:
      "Trust is not a feature. It is designed. Learn how UI, micro-copy, and transparency shape user confidence.",
    author: { name: "Move UX" },
    createdAt: "Jan 02, 2025",
  },
];

export const Component = ({
  title,
  description,
  posts = [],
  className,
  onPostClick,
}: GridSectionProps) => {
  const router = useRouter();

  const finalPosts = posts.length >= 3 ? posts : DUMMY_POSTS;

  const handlePostClick = (post: BlogPost) => {
    if (onPostClick) onPostClick(post);
    else if (post.href !== "#") router.push(post.href);
  };

  return (
    <section className={cn("py-16 max-w-4xl mx-auto", className)}>
      {/* Header */}
      <div className="mb-12 space-y-3">
        <h1 className="text-4xl font-serif font-bold">{title}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>

      {/* Posts */}
      <div className="divide-y">
        {finalPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => handlePostClick(post)}
            className="py-8 cursor-pointer hover:bg-muted/30 transition"
          >
            <div className="flex gap-6 items-start">
              {/* Text */}
              <div className="flex-1 space-y-2">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {post.category}
                </span>

                <h2 className="text-2xl font-serif font-bold leading-snug">
                  {post.title}
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  {post.summary}
                </p>

                <div className="text-xs text-muted-foreground flex gap-2">
                  <span>{post.author?.name || "Anonymous"}</span>
                  <span>·</span>
                  <span>{post.createdAt}</span>
                </div>
              </div>

              {/* Image */}
              <div className="hidden sm:block w-40 h-28 rounded-md overflow-hidden shrink-0 bg-gray-100">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
export default Component;
