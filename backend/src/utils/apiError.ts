/**
 * Represents an HTTP error that can be thrown in request handling.
 */
class ApiError extends Error {
  details: object | null;
  statusCode: number;

  constructor(statusCode: number, message: string, details: object | null = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;