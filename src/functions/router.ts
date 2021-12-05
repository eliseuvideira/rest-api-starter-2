import { RequestHandler, Router as ExpressRouter } from "express";

export type Method = "get" | "post" | "put" | "patch" | "delete";

export type RouterHandler = (router: ExpressRouter) => ExpressRouter;

export const handler =
  (method: Method) =>
  (path: string, ...handlers: RequestHandler[]): RouterHandler =>
  (router: ExpressRouter) =>
    router[method](path, ...handlers);

export const Router = {
  get: handler("get"),
  post: handler("post"),
  put: handler("put"),
  patch: handler("patch"),
  delete: handler("delete"),
};

export const router = (...routes: RouterHandler[]) => {
  const router = ExpressRouter();

  for (const route of routes) {
    route(router);
  }

  return router;
};
