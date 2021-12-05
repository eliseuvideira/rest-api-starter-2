import http from "http";
import { Application } from "express";

export interface ServerProps {
  app: Application;
  port: number;
  before?: (server: http.Server) => Promise<void>;
  after?: (server: http.Server) => Promise<void>;
}

export const server = async ({ app, port, before, after }: ServerProps) => {
  const handle = app;

  const server = http.createServer(handle);

  if (before) {
    await before(server);
  }

  await new Promise<void>((resolve, reject) => {
    server.on("error", reject);

    server.on("listening", resolve);

    server.listen(port);
  });

  if (after) {
    await after(server);
  }

  return server;
};
