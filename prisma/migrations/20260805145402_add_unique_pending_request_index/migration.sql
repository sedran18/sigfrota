-- CreateIndex
DROP INDEX IF EXISTS "unique_pending_request_per_vehicle";

CREATE UNIQUE INDEX "unique_pending_request_per_vehicle" 
ON "fueling_requests"("vehicleId") 
WHERE "status" = 'PENDING';
