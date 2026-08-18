import { Router } from "express";
import { blogsController } from "./blogs.controller.js";
import {
  blogIdSchema,
  blogQuerySchema,
  // blogSlugSchema,
  createBlogSchema,
  updateBlogSchema,
} from "./blogs.schemas.js";

import { validate } from "../../middleware/validate.js";
import { authenticate, requireAdmin } from "../../middleware/auth.js";

const blogsRouter = Router();


// Public routes
blogsRouter.get(
  "/",
  validate({ query: blogQuerySchema }),
  blogsController.listPublic,
);

// Protected routes

blogsRouter.get("/admin/stats", blogsController.stats);

blogsRouter.get(
  "/admin",
  validate({ query: blogQuerySchema }),
  authenticate,
  requireAdmin,
  blogsController.list,
);

blogsRouter.get(
  "/admin/:id",
  validate({ params: blogIdSchema }),
  authenticate,
  requireAdmin,
  blogsController.getById,
);

blogsRouter.post(
  "/",
  validate({ body: createBlogSchema }),
  authenticate,
  requireAdmin,
  blogsController.create,
);

blogsRouter.patch(
  "/:id",
  validate({ params: blogIdSchema, body: updateBlogSchema }),
  authenticate,
  requireAdmin,
  blogsController.update,
);

blogsRouter.delete(
  "/:id",
  validate({ params: blogIdSchema }),
  authenticate,
  requireAdmin,
  blogsController.delete,
);

blogsRouter.get("/:slug", blogsController.getBySlug);

export default blogsRouter;
