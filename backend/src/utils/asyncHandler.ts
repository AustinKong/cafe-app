import type { RequestHandler } from "express";

/**
 * Wraps an async route handler and forwards any thrown errors to the Express error handler.
 */
function asyncHandler<T extends RequestHandler>(fn: T): RequestHandler {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default asyncHandler;