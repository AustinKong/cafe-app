import type { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

function errorHandler(err: Error, req: Request, res: Response, _: NextFunction) {
  console.error(err);

  // Client errors (<500) are thrown as they are
  if (err instanceof ApiError && err.statusCode < 500) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...(err.details && { details: err.details })
    });
  }

  // All unknown errors (500+) are thrown as internal server errors
  return res.status(500).json({
    message: "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  })
}

export default errorHandler;