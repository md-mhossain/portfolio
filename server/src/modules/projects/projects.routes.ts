import { Router } from "express";
import { projectsController } from "./projects.controller.js";
import {
  createProjectSchema,
  projectIdSchema,
  projectQuerySchema, projectSlugSchema,
  // projectSlugSchema,
  updateProjectSchema,
} from "./projects.schemas.js";
import { validate } from "../../middleware/validate.js";
import { authenticate, requireAdmin } from "../../middleware/auth.js";

const projectsRouter = Router();

/**
 * Public Routes
 */
projectsRouter.get(
    "/",
    validate({ query: projectQuerySchema }),
    projectsController.listPublic,
);

/**
 * Protected Admin Routes
 */
projectsRouter.get(
    "/admin",
    authenticate,
    requireAdmin,
    validate({ query: projectQuerySchema }),
    projectsController.list,
);

projectsRouter.get(
    "/admin/stats",
    authenticate,
    requireAdmin,
    projectsController.stats,
);

projectsRouter.get(
    "/admin/:id",
    authenticate,
    requireAdmin,
    validate({ params: projectIdSchema }),
    projectsController.getById,
);

projectsRouter.post(
    "/",
    authenticate,
    requireAdmin,
    validate({ body: createProjectSchema }),
    projectsController.create,
);

projectsRouter.patch(
    "/:id",
    authenticate,
    requireAdmin,
    validate({
      params: projectIdSchema,
      body: updateProjectSchema,
    }),
    projectsController.update,
);

projectsRouter.delete(
    "/:id",
    authenticate,
    requireAdmin,
    validate({ params: projectIdSchema }),
    projectsController.delete,
);

/**
 * Public Slug Route
 * MUST BE LAST
 */
projectsRouter.get(
    "/:slug",
    validate({ params: projectSlugSchema }),
    projectsController.getBySlug,
);

export default projectsRouter;