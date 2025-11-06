import type { Request as ExpressRequest, Response as ExpressResponse, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import ApiError from "../utils/apiError";

type ValidatorSchema = {
  body?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  cookies?: z.ZodTypeAny;
};

type ValidatedOf<S extends ValidatorSchema> = {
  [K in keyof S]: z.infer<S[K]>;
};

/**
 * Middleware to validate request parts using Zod schemas.
 * 
 * This middleware can validate different parts of the incoming request:
 * - `req.body`   → validated data is stored in `res.locals.body`
 * - `req.params` → validated data is stored in `res.locals.params`
 * - `req.query`  → validated data is stored in `res.locals.query`
 * - `req.cookies`→ validated data is stored in `res.locals.cookies`
 *
 * Returns 400 with details on validation failure, passes through on success.
 */
export function validateRequest({
  body,
  params,
  query,
  cookies
}: ValidatorSchema): RequestHandler {

  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated: Record<string, unknown> = {};

      if (body) {
        const result = body.safeParse(req.body);
        if (!result.success) {
          const details = z.treeifyError(result.error);
          return next(new ApiError(400, "Body validation failed", details));
        }
        validated.body = result.data;
      }

      if (params) {
        const result = params.safeParse(req.params);
        if (!result.success) {
          const details = z.treeifyError(result.error);
          return next(new ApiError(400, "URL params validation failed", details));
        }
        validated.params = result.data;
      }

      if (query) {
        const result = query.safeParse(req.query);
        if (!result.success) {
          const details = z.treeifyError(result.error);
          return next(new ApiError(400, "Query validation failed", details));
        }
        validated.query = result.data;
      }

      if (cookies) {
        const result = cookies.safeParse(req.cookies);
        if (!result.success) {
          const details = z.treeifyError(result.error);
          return next(new ApiError(400, "Cookie validation failed", details));
        }
        validated.cookies = result.data;
      }

      res.locals = validated;
      return next();
    } catch (err: unknown) {
      const details = { errors: [err instanceof Error ? err.message : "Unknown error"] };
      return next(new ApiError(500, "Internal server error", details));
    }
  };
}

/**
 * Extracts validated request data (params, body, query, cookies) from `res.locals`
 * with full TypeScript support.
 *
 * This is intended to be used together with the `validateRequest` middleware,
 * which populates `res.locals` with parsed data based on a Zod schema.
 *
 * @template S - A `ValidatorSchema` object containing optional Zod schemas
 *               for `params`, `body`, `query`, and `cookies`.
 *
 * @param res - The Express response object. Must be passed through the
 *              `validateRequest(schema)` middleware before use.
 * @param _schema - The schema definition used in `validateRequest`. This
 *                  parameter is only used for type inference and does not
 *                  affect runtime behavior.
 *
 * @returns A fully typed object containing the validated data. Its shape
 *          matches the provided schema: e.g. if you pass `{ params: z.object(...) }`,
 *          then `result.params` will have the inferred type of that Zod object.
 *
 * @example
 * const getByIdSchema = {
 *   params: z.object({ id: z.string().uuid() })
 * } as const;
 *
 * router.get(
 *   "/:id",
 *   validateRequest(getByIdSchema),
 *   (req, res) => {
 *     const { params } = extractTypedLocals(res, getByIdSchema);
 *     // params.id is strongly typed as a UUID string
 *   }
 * );
 */
export function extractTypedLocals<const S extends ValidatorSchema>(
  res: Response,
  _schema: S
): ValidatedOf<S> {
  return res.locals as ValidatedOf<S>;
}

export type Response = ExpressResponse & {
  locals: Record<string, unknown>;
}

export type Request = ExpressRequest;
