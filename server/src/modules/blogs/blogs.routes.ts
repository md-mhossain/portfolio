import { Router } from "express";
import { blogsController } from "./blogs.controller.js";
import {
  blogIdSchema,
  blogQuerySchema,
  // blogSlugSchema,
  createBlogSchema,
  updateBlogSchema,
} from "./blogs.schemas";
import { validate } from "../../middleware/validate";
import { authenticate, requireAdmin } from "../../middleware/auth";

const blogsRouter = Router();

// Public routes
// blogsRouter.get('/', validate({ query: blogQuerySchema }), blogsController.listPublic);
// blogsRouter.get(
//   '/slug/:slug',
//   validate({ params: blogSlugSchema }),
//   blogsController.getBySlug,
// );

// Protected admin routes
// blogsRouter.use(authenticate, requireAdmin);

// blogsRouter.get('/admin', validate({ query: blogQuerySchema }), blogsController.list);
// blogsRouter.get('/admin/stats', blogsController.stats);
// blogsRouter.get('/admin/:id', validate({ params: blogIdSchema }), blogsController.getById);
// blogsRouter.post('/', validate({ body: createBlogSchema }), blogsController.create);
// blogsRouter.patch(
//   '/:id',
//   validate({ params: blogIdSchema, body: updateBlogSchema }),
//   blogsController.update,
// );
// blogsRouter.delete('/:id', validate({ params: blogIdSchema }), blogsController.delete);

// Public routes
blogsRouter.get(
  "/",
  validate({ query: blogQuerySchema }),
  blogsController.listPublic,
);
blogsRouter.get("/slug/:slug", blogsController.getBySlug);

// Protected routes
blogsRouter.use(authenticate, requireAdmin);

blogsRouter.get("/admin/stats", blogsController.stats);

blogsRouter.get(
  "/admin",
  validate({ query: blogQuerySchema }),
  blogsController.list,
);

blogsRouter.get(
  "/admin/:id",
  validate({ params: blogIdSchema }),
  blogsController.getById,
);

blogsRouter.post(
  "/",
  validate({ body: createBlogSchema }),
  blogsController.create,
);

blogsRouter.patch(
  "/:id",
  validate({ params: blogIdSchema, body: updateBlogSchema }),
  blogsController.update,
);

blogsRouter.delete(
  "/:id",
  validate({ params: blogIdSchema }),
  blogsController.delete,
);

export default blogsRouter;
