import { Router } from "express";
import { prisma } from "../prisma.js";

const router = Router();

// GET /api/admin/shipments?limit=10&status=PENDING&q=addis
router.get("/", async (req, res) => {
  const { limit, status, q } = req.query;

  const take = limit ? Math.min(Number(limit) || 50, 200) : 50;
  const where = {};

  if (status && status !== "ALL") {
    where.status = String(status).toUpperCase();
  }

  const query = String(q || "").trim();
  if (query) {
    where.OR = [
      { shipmentNo: { contains: query, mode: "insensitive" } },
      { client: { contains: query, mode: "insensitive" } },
      { origin: { contains: query, mode: "insensitive" } },
      { destination: { contains: query, mode: "insensitive" } },
    ];
  }

  const data = await prisma.shipment.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take,
  });

  res.json({ ok: true, data });
});

// POST /api/admin/shipments
router.post("/", async (req, res) => {
  const {
    shipmentNo,
    client,
    origin,
    destination,
    status,
    eta,
    driverName,
  } = req.body || {};

  if (!shipmentNo || !client || !origin || !destination) {
    return res.status(400).json({
      ok: false,
      message: "shipmentNo, client, origin, destination are required",
    });
  }

  const created = await prisma.shipment.create({
    data: {
      shipmentNo: String(shipmentNo).trim(),
      client: String(client).trim(),
      origin: String(origin).trim(),
      destination: String(destination).trim(),
      status: status ? String(status).toUpperCase() : "PENDING",
      eta: eta || null,
      driverName: driverName || null,
    },
  });

  res.status(201).json({ ok: true, data: created });
});

// PATCH /api/admin/shipments/:id
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { client, origin, destination, status, eta, driverName } = req.body || {};

    const updated = await prisma.shipment.update({
      where: { id },
      data: {
        client: client ?? undefined,
        origin: origin ?? undefined,
        destination: destination ?? undefined,
        eta: eta ?? undefined,
        driverName: driverName ?? undefined,
        status: status ? String(status).toUpperCase() : undefined,
      },
    });

    res.json({ ok: true, data: updated });
  } catch {
    res.status(404).json({ ok: false, message: "Shipment not found" });
  }
});

// DELETE /api/admin/shipments/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.shipment.delete({ where: { id } });
    res.json({ ok: true, data: deleted });
  } catch {
    res.status(404).json({ ok: false, message: "Shipment not found" });
  }
});

export default router;