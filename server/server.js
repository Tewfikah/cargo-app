import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

import { prisma } from "./src/prisma.js";
import adminVehiclesRoutes from "./src/routes/admin.vehicles.routes.js";
import adminShipmentsRoutes from "./src/routes/admin.shipments.routes.js";
import adminUsersRoutes from "./src/routes/admin.users.routes.js";
import userShipmentsRoutes from "./src/routes/user.shipments.routes.js";
import userRequestsRoutes from "./src/routes/user.requests.routes.js";
import adminRequestsRoutes from "./src/routes/admin.requests.routes.js";
import adminDriversRoutes from "./src/routes/admin.drivers.routes.js";
dotenv.config();

const app = express();

// --------------------
// Middleware
// --------------------

// ✅ Robust origin parsing (supports comma list + removes quotes)
const normalizeOrigin = (v) => String(v || "").trim().replace(/\/$/, "");
const stripQuotes = (v) => String(v || "").trim().replace(/^['"]|['"]$/g, "");

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((x) => normalizeOrigin(stripQuotes(x)))
  .filter(Boolean);

// Debug print (so we KNOW what the server is allowing)
console.log("✅ CORS allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, cb) => {
      // allow requests with no origin (Postman, curl)
      if (!origin) return cb(null, true);

      const incoming = normalizeOrigin(origin);

      if (allowedOrigins.includes(incoming)) return cb(null, true);

      return cb(new Error("CORS blocked: " + incoming));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Rate limit for contact form
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: "Too many messages. Please try again later." },
});

// --------------------
// Helpers
// --------------------
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

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
    req.user = payload; // { sub, role, email }
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

const requireCustomer = (req, res, next) => {
  if (req.user?.role !== "CUSTOMER") {
    return res.status(403).json({ ok: false, message: "Customer only" });
  }
  return next();
};

// --------------------
// Admin routers (protected)
// --------------------
app.use("/api/admin/vehicles", requireAuth, requireAdmin, adminVehiclesRoutes);
app.use("/api/admin/shipments", requireAuth, requireAdmin, adminShipmentsRoutes);
app.use("/api/admin/users", requireAuth, requireAdmin, adminUsersRoutes);
app.use("/api/admin/drivers", requireAuth, requireAdmin, adminDriversRoutes);
// --------------------
// User routers (protected)
// --------------------
app.use("/api/user/shipments", requireAuth, requireCustomer, userShipmentsRoutes);
app.use("/api/user/requests", requireAuth, requireCustomer, userRequestsRoutes);
app.use("/api/admin/requests", requireAuth, requireAdmin, adminRequestsRoutes);

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

    const emailLower = String(email).toLowerCase().trim();

    if (ADMIN_EMAIL && emailLower === ADMIN_EMAIL.toLowerCase()) {
      return res.status(403).json({
        ok: false,
        message: "Admin accounts cannot be created from public registration.",
      });
    }

    const existing = await prisma.user.findUnique({
      where: { email: emailLower },
    });

    if (existing) {
      return res
        .status(409)
        .json({ ok: false, message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);

    const user = await prisma.user.create({
      data: {
        name: String(name).trim(),
        email: emailLower,
        passwordHash,
        role: "CUSTOMER",
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

    const emailLower = String(email).toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: emailLower },
    });

    if (!user) {
      return res
        .status(401)
        .json({ ok: false, message: "Invalid email or password" });
    }

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) {
      return res
        .status(401)
        .json({ ok: false, message: "Invalid email or password" });
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
      return res
        .status(400)
        .json({ ok: false, message: "All fields are required" });
    }

    const msg = await prisma.message.create({
      data: {
        name: String(name).trim(),
        email: String(email).toLowerCase().trim(),
        subject: String(subject).trim(),
        message: String(message).trim(),
        read: false,
      },
    });

    return res
      .status(201)
      .json({ ok: true, message: "Message received", data: msg });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// --------------------
// Admin: messages (protected)
// --------------------
app.get("/api/admin/messages", requireAuth, requireAdmin, async (_req, res) => {
  const data = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
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
// Start
// --------------------
const PORT = process.env.PORT || 5000;

async function start() {
  await prisma.$connect();
  console.log("✅ Prisma connected (Supabase/Postgres)");

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