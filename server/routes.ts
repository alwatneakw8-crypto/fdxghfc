import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, store: "dukhoon" });
  });

  app.get("/api/products", async (req, res, next) => {
    try {
      const category =
        typeof req.query.category === "string" ? req.query.category : undefined;
      const search =
        typeof req.query.search === "string" ? req.query.search : undefined;
      const featured = req.query.featured === "true";

      const products = await storage.getProducts({
        category,
        search,
        featured,
      });
      res.json(products);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/products/:id", async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "معرف المنتج غير صالح" });
      }
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "المنتج غير موجود" });
      }
      res.json(product);
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/orders", async (req, res, next) => {
    try {
      const parsed = insertOrderSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: fromError(parsed.error).toString(),
        });
      }

      const order = await storage.createOrder(parsed.data);
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/orders/:id", async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "رقم الطلب غير صالح" });
      }
      const order = await storage.getOrder(id);
      if (!order) {
        return res.status(404).json({ message: "الطلب غير موجود" });
      }
      res.json(order);
    } catch (err) {
      next(err);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
