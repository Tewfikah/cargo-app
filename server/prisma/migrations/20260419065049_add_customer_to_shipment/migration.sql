-- AlterTable
ALTER TABLE "Shipment" ADD COLUMN     "customerId" TEXT;

-- CreateIndex
CREATE INDEX "Shipment_driverId_idx" ON "Shipment"("driverId");

-- CreateIndex
CREATE INDEX "Shipment_customerId_idx" ON "Shipment"("customerId");

-- CreateIndex
CREATE INDEX "Vehicle_driverId_idx" ON "Vehicle"("driverId");

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
