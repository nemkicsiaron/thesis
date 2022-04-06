-- CreateTable
CREATE TABLE "Category" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Post" (
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "published" BOOLEAN DEFAULT false,
    "description" TEXT,
    "price" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    CONSTRAINT "Post_category_fkey" FOREIGN KEY ("category") REFERENCES "Category" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Post_signature_key" ON "Post"("signature");
