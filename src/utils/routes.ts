import { Application } from "express";
import fs from "fs";
import path from "path";

export const routes = async (app: Application) => {
  const directory = path.join(__dirname, "..", "routes");
  const routes = await fs.promises.readdir(directory);

  for (const route of routes) {
    const router = await import(path.join(directory, route));

    for (const key of Object.keys(router)) {
      app.use(router[key]);
    }
  }
};
