-- CreateTable
CREATE TABLE "Bike" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "store" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "priceAsString" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "link" TEXT NOT NULL
);
