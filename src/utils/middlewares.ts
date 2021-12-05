import { Application } from "express";
import cors from "cors";
import logger from "morgan";
import { routes } from "./routes";
import { errors } from "./errors";

export const middlewares = async (app: Application) => {
  app.use(cors());
  app.use(logger("combined"));

  await routes(app);

  await errors(app);
};
