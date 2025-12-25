
import prisma from "@/lib/prisma";
import { Component as BlogPostsGrid } from "@/components/ui/blog-posts";
import Navbar from "@/components/public/landing/navbar";

export default async function Blog() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { views: 'desc' },
    include: {
        author: {
            select: { name: true }
        }
    }
  });

  const formattedPosts = posts.map(post => ({
    id: post.id,
    title: post.title,
    category: post.category,
    imageUrl: post.imageUrl || "https://images.unsplash.com/photo-1499750310159-5b5fafef6c3e?q=80&w=2070&auto=format&fit=crop",
    href: `/blog/${post.id}`,
    views: post.views,
    readTime: post.readTime || undefined,
    rating: post.rating || undefined,
    author: {
        name: post.author.name || "Anonymous",
        // We can add author image if schema supported it, for now placeholder handled by component
    },
    createdAt: "Dec 16, 2024" // Placeholder as schema lacks createdAt
  }));

  return (
  <div className="bg-white">
    <Navbar />
    <main className="max-w-4xl mx-auto px-6 py-16">
      <BlogPostsGrid
        title="Blog"
        description="Thoughts, guides, and stories."
        posts={formattedPosts}
      />
    </main>
  </div>
  );
}