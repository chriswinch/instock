-- CreateTable
CREATE TABLE "Bike" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "store" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "priceAsString" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Bike_pkey" PRIMARY KEY ("id")
);
