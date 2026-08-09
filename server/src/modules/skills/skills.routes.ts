import { Router } from "express";
import { skillsController } from "./skills.controller.js";
import {
  createSkillSchema,
  skillIdSchema,
  skillQuerySchema,
  updateSkillSchema,
} from "./skills.schemas.js";
import { validate } from "../../middleware/validate.js";
import { authenticate, requireAdmin } from "../../middleware/auth.js";

const skillsRouter = Router();

// Public route
skillsRouter.get(
  "/",
  validate({ query: skillQuerySchema }),
  skillsController.list,
);

// Protected admin routes
skillsRouter.use(authenticate, requireAdmin);

skillsRouter.post(
  "/",
  validate({ body: createSkillSchema }),
  skillsController.create,
);
skillsRouter.get(
  "/:id",
  validate({ params: skillIdSchema }),
  skillsController.getById,
);
skillsRouter.patch(
  "/:id",
  validate({ params: skillIdSchema, body: updateSkillSchema }),
  skillsController.update,
);
skillsRouter.delete(
  "/:id",
  validate({ params: skillIdSchema }),
  skillsController.delete,
);

export default skillsRouter;
