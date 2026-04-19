import { Router } from "express";
import { prisma } from "../prisma.js";

const router = Router();

/**
 * GET /api/admin/shipments
 * Admin-only (protected in server.js)
 *
 * Optional query:
 *  - limit=50 (max 200)
 *  - status=PENDING|IN_TRANSIT|DELIVERED|DELAYED|ALL
 *  - q=search text (shipmentNo/client/origin/destination)
 */
router.get("/", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit || 50), 200);
    const status = String(req.query.status || "ALL").toUpperCase();
    const q = String(req.query.q || "").trim();

    const where = {};

    if (status !== "ALL") where.status = status;

    if (q) {
      where.OR = [
        { shipmentNo: { contains: q, mode: "insensitive" } },
        { client: { contains: q, mode: "insensitive" } },
        { origin: { contains: q, mode: "insensitive" } },
        { destination: { contains: q, mode: "insensitive" } },
      ];
    }

    const data = await prisma.shipment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return res.json({ ok: true, data });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

/**
 * PATCH /api/admin/shipments/:id
 * Admin-only: update shipment fields
 *
 * body (any of them):
 *  - status: PENDING | IN_TRANSIT | DELIVERED | DELAYED
 *  - eta: string | null
 *
 * ✅ professional assignment:
 *  - driverId: DRIVER user id | null
 *    (server will set driverName automatically)
 *
 * NOTE: driverName is still accepted for backward compatibility,
 * but if you send driverName we will clear driverId to avoid mismatch.
 */
router.patch("/:id", async (req, res) => {
  try {
    const id = String(req.params.id || "");
    const { status, eta, driverId, driverName } = req.body || {};

    const data = {};

    // status
    if (status !== undefined) {
      const s = String(status).toUpperCase();
      const allowed = ["PENDING", "IN_TRANSIT", "DELIVERED", "DELAYED"];
      if (!allowed.includes(s)) {
        return res.status(400).json({
          ok: false,
          message: `Invalid status. Allowed: ${allowed.join(", ")}`,
        });
      }
      data.status = s;
    }

    // eta
    if (eta !== undefined) {
      if (eta === null || eta === "") data.eta = null;
      else data.eta = String(eta).trim();
    }

    // ✅ driver assignment by driverId (recommended)
    if (driverId !== undefined) {
      // Unassign
      if (driverId === null || driverId === "" || driverId === "Unassigned") {
        data.driverId = null;
        data.driverName = null;
      } else {
        const did = String(driverId).trim();

        const driver = await prisma.user.findUnique({
          where: { id: did },
          select: { id: true, name: true, role: true, status: true },
        });

        if (!driver) {
          return res.status(400).json({ ok: false, message: "Driver not found" });
        }
        if (driver.role !== "DRIVER") {
          return res.status(400).json({ ok: false, message: "User is not a DRIVER" });
        }
        if (driver.status && driver.status !== "ACTIVE") {
          return res.status(400).json({ ok: false, message: "Driver is not ACTIVE" });
        }

        data.driverId = driver.id;
        data.driverName = driver.name; // keep display field synced
      }
    } else if (driverName !== undefined) {
      // Backward compatible mode (not recommended):
      // set driverName text and clear driverId to avoid mismatch
      if (driverName === null || driverName === "" || driverName === "Unassigned") {
        data.driverId = null;
        data.driverName = null;
      } else {
        data.driverId = null;
        data.driverName = String(driverName).trim();
      }
    }

    const updated = await prisma.shipment.update({
      where: { id },
      data,
    });

    return res.json({ ok: true, data: updated });
  } catch (e) {
    console.error(e);
    return res.status(404).json({ ok: false, message: "Shipment not found" });
  }
});

export default router;