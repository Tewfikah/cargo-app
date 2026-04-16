import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// --------------------
// Middleware
// --------------------
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);
app.use(express.json());



const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // max 5 requests per IP per 10 minutes
  standardHeaders: true, // return rate limit info in headers
  legacyHeaders: false,
  message: { ok: false, message: "Too many messages. Please try again later." },
});

// --------------------
// Helpers
// --------------------
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

const getRoleByEmail = (email) => {
  return email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "ADMIN" : "CUSTOMER";
};

const createToken = (user) => {
  return jwt.sign(
    { sub: user.id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ ok: false, message: "Missing token" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { sub, role, email, iat, exp }
    return next();
  } catch {
    return res.status(401).json({ ok: false, message: "Invalid token" });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({ ok: false, message: "Admin only" });
  }
  return next();
};

// --------------------
// Health
// --------------------
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "API working" });
});

// --------------------
// Auth (Prisma + Postgres)
// --------------------
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ ok: false, message: "name, email, password are required" });
    }

    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return res.status(409).json({ ok: false, message: "Email already registered" });
    }

    const role = getRoleByEmail(email);
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        role,
      },
      select: { id: true, name: true, email: true, role: true },
    });

    const accessToken = createToken(user);
    return res.status(201).json({ ok: true, accessToken, user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(400)
        .json({ ok: false, message: "email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({ ok: false, message: "Invalid email or password" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ ok: false, message: "Invalid email or password" });
    }

    const accessToken = createToken(user);

    return res.json({
      ok: true,
      accessToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// --------------------
// Contact: create message (Prisma)
// --------------------
app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ ok: false, message: "All fields are required" });
    }

    const msg = await prisma.message.create({
      data: {
        name,
        email: email.toLowerCase(),
        subject,
        message,
        read: false,
      },
    });

    return res.status(201).json({ ok: true, message: "Message received", data: msg });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// --------------------
// Admin: messages (protected)
// --------------------
app.get("/api/admin/messages", requireAuth, requireAdmin, async (_req, res) => {
  const data = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });
  return res.json({ ok: true, data });
});

app.patch("/api/admin/messages/:id/read", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const msg = await prisma.message.update({
      where: { id },
      data: { read: true },
    });
    return res.json({ ok: true, data: msg });
  } catch {
    return res.status(404).json({ ok: false, message: "Message not found" });
  }
});

app.delete("/api/admin/messages/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.message.delete({ where: { id } });
    return res.json({ ok: true, data: deleted });
  } catch {
    return res.status(404).json({ ok: false, message: "Message not found" });
  }
});

// --------------------
// Demo endpoints (still in-memory for now)
// --------------------
const vehicleLocations = [
  { id: "veh_1", name: "Truck A", lat: 9.03, lng: 38.74, status: "IN_TRANSIT", updatedAt: new Date().toISOString() },
  { id: "veh_2", name: "Truck B", lat: 8.98, lng: 38.79, status: "DELIVERING", updatedAt: new Date().toISOString() },
  { id: "veh_3", name: "Truck C", lat: 9.05, lng: 38.76, status: "IDLE", updatedAt: new Date().toISOString() },
];

app.get("/api/admin/vehicles/locations", requireAuth, requireAdmin, (req, res) => {
  return res.json({ ok: true, data: vehicleLocations });
});

app.get("/api/admin/analytics/quick", requireAuth, requireAdmin, (req, res) => {
  return res.json({
    ok: true,
    data: {
      kpis: {
        todayDeliveries: { value: 24, delta: "+8%", trend: "up" },
        avgEta: { value: "1h 22m", delta: "-3%", trend: "up" },
        fuelAvg: { value: 105, delta: "+2%", trend: "down" },
      },
    },
  });
});

// --------------------
// Start
// --------------------
const PORT = process.env.PORT || 5000;

async function start() {
  // quick check: make sure Prisma can connect
  await prisma.$connect();
  console.log("✅ Prisma connected (Supabase/Postgres)");

  // Optional: seed admin if not exists
  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    const adminEmail = ADMIN_EMAIL.toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

    if (!existing) {
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await prisma.user.create({
        data: {
          name: "Admin",
          email: adminEmail,
          passwordHash,
          role: "ADMIN",
        },
      });
      console.log("✅ Seeded admin user:", adminEmail);
    }
  }

  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});