import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /api/admin/vehicles
router.get("/", async (req, res) => {
  const data = await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });
  res.json({ ok: true, data });
});

// POST /api/admin/vehicles
router.post("/", async (req, res) => {
  const { vehicleNo, type, status, driverName, lastSeen } = req.body || {};
  if (!vehicleNo || !type) {
    return res.status(400).json({ ok: false, message: "vehicleNo and type are required" });
  }

  const created = await prisma.vehicle.create({
    data: {
      vehicleNo,
      type,
      status: status || "AVAILABLE",
      driverName: driverName || null,
      lastSeen: lastSeen || "Just now",
    },
  });

  res.status(201).json({ ok: true, data: created });
});

// PATCH /api/admin/vehicles/:id
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type, status, driverName, lastSeen } = req.body || {};

    const updated = await prisma.vehicle.update({
      where: { id },
      data: {
        type: type ?? undefined,
        status: status ?? undefined,
        driverName: driverName ?? undefined,
        lastSeen: lastSeen ?? undefined,
      },
    });

    res.json({ ok: true, data: updated });
  } catch {
    res.status(404).json({ ok: false, message: "Vehicle not found" });
  }
});

// DELETE /api/admin/vehicles/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.vehicle.delete({ where: { id } });
    res.json({ ok: true, data: deleted });
  } catch {
    res.status(404).json({ ok: false, message: "Vehicle not found" });
  }
});

export default router;