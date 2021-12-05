import { Application, ErrorRequestHandler, RequestHandler } from "express";
import { HttpError, isHttpError } from "./HttpError";

export const notFound: RequestHandler = (req, res, next) => {
  next(new HttpError(404, "Resource not found"));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const exception: ErrorRequestHandler = (err, req, res, next) => {
  const status = isHttpError(err) ? err.status : 500;
  let message: string = err.message;
  if (status === 500) {
    console.error(err);
    if (process.env.NODE_ENV === "production") {
      message = "Internal server error";
    }
  }
  res.status(status).json({ message });
};

export const errors = async (app: Application) => {
  app.use(notFound);
  app.use(exception);
};
