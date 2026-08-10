/*
  Warnings:

  - A unique constraint covering the columns `[requestId]` on the table `fuelings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "fuelings_requestId_key" ON "fuelings"("requestId");
