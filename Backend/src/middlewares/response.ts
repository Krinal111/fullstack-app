import { NextFunction, Request, Response } from "express";

/**
 * Middleware function to intercept every route's response and check for errors.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
export const errorInterceptorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Save the original send function
  const originalSend = res.send;

  // Override the send function
  res.send = function (body): Response<unknown, Record<string, unknown>> {
    if (
      JSON.parse(body).status === false &&
      JSON.parse(body).statusCode === 500
    ) {
      body = JSON.stringify({
        ...JSON.parse(body),
        message: JSON.parse(body).message || "Server error",
      });
    }
    return originalSend.call(this, body);
  };
  next();
};
