-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'General',
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "rating" INTEGER,
ADD COLUMN     "readTime" INTEGER,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
