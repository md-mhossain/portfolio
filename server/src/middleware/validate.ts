import type {NextFunction, Request, Response} from "express";
import { ZodError, type ZodSchema, type ZodIssue } from "zod";
import { ValidationError } from "../shared/errors.js";

/**
 * Validates request body/query/params against a Zod schema and
 * replaces the validated values on the request object.
 */
export function validate(schema: {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schema.params) {
        req.params = schema.params.parse(req.params) as Request["params"];
      }
      if (schema.query) {
        req.query = schema.query.parse(req.query) as Request["query"];
      }
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }
      return next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const details = error.issues.map((issue: ZodIssue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        return next(new ValidationError("Validation failed.", details));
      }
      return next(error);
    }
  };
}
