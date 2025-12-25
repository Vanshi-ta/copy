import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Building Modern Web Applications with React",
          content: "Full guide on React...",
          published: true,
          category: "Web Development",
          imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
          views: 2180,
          readTime: 8,
          rating: 5,
        },
        {
          title: "Advanced TypeScript Patterns",
          content: "Deep dive into TS...",
          published: true,
          category: "Programming",
          imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
          views: 1456,
          readTime: 12,
          rating: 4,
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    posts: {
      create: [
        {
          title: "Design System Best Practices",
          content: "How to build scalable UI...",
          published: true,
          category: "UI/UX Design",
          imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=2070&auto=format&fit=crop",
          views: 987,
          readTime: 6,
          rating: 4,
        },
      ],
    },
  },
];

export async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();