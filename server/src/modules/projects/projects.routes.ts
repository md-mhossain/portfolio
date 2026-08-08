import { Router } from "express";
import { projectsController } from "./projects.controller";
import {
  createProjectSchema,
  projectIdSchema,
  projectQuerySchema,
  projectSlugSchema,
  updateProjectSchema,
} from "./projects.schemas";
import { validate } from "../../middleware/validate";
import { authenticate, requireAdmin } from "../../middleware/auth";

const projectsRouter = Router();

// Public routes
projectsRouter.get(
  "/",
  validate({ query: projectQuerySchema }),
  projectsController.listPublic,
);
projectsRouter.get(
  "/slug/:slug",
  validate({ params: projectSlugSchema }),
  projectsController.getBySlug,
);

// Protected admin routes
projectsRouter.use(authenticate, requireAdmin);

projectsRouter.get(
  "/admin",
  validate({ query: projectQuerySchema }),
  projectsController.list,
);
projectsRouter.get("/admin/stats", projectsController.stats);
projectsRouter.get(
  "/admin/:id",
  validate({ params: projectIdSchema }),
  projectsController.getById,
);
projectsRouter.post(
  "/",
  validate({ body: createProjectSchema }),
  projectsController.create,
);
projectsRouter.patch(
  "/:id",
  validate({ params: projectIdSchema, body: updateProjectSchema }),
  projectsController.update,
);
projectsRouter.delete(
  "/:id",
  validate({ params: projectIdSchema }),
  projectsController.delete,
);

export default projectsRouter;
