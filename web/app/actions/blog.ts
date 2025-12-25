"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(data: {
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  authorId: number; 
}) {
  try {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        imageUrl: data.imageUrl,
        published: true, // Auto-publish for now
        authorId: data.authorId,
      },
    });

    revalidatePath("/blog");
    return { success: true, postId: post.id };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { success: false, error: "Failed to create post" };
  }
}
