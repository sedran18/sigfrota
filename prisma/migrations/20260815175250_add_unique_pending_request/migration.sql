-- This is an empty migration.
CREATE UNIQUE INDEX "unique_pending_request_per_vehicle" 
ON "fueling_requests" ("vehicle_id") 
WHERE "status" = 'PENDING';