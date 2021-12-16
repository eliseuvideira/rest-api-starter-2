import { RequestHandler, Router as ExpressRouter } from "express";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const parse = (
  method: Method,
): "get" | "post" | "put" | "patch" | "delete" => {
  switch (method) {
    case "GET":
      return "get";
    case "POST":
      return "post";
    case "PUT":
      return "put";
    case "PATCH":
      return "patch";
    case "DELETE":
      return "delete";
  }
};

export type RouterHandler = (router: ExpressRouter) => ExpressRouter;

export const handler =
  (
    method: Method,
    path: string,
    ...handlers: RequestHandler[]
  ): RouterHandler =>
  (router: ExpressRouter) =>
    router[parse(method)](path, ...handlers);

export const router = (...routes: RouterHandler[]) => {
  const router = ExpressRouter();

  for (const route of routes) {
    route(router);
  }

  return router;
};

export interface Router2Props {
  path: string;
  method: Method;
  handlers: RequestHandler[];
  docs?: {
    tag: string;
    summary: string;
    responses: {
      status: "200" | "201" | "204" | "default";
      contentType: "application/json";
      schema: string;
    }[];
  };
}

export const router2 = (routes: Router2Props[]) => {
  const router = ExpressRouter();

  for (const route of routes) {
    const setHandler = handler(route.method, route.path, ...route.handlers);

    setHandler(router);
  }

  return router;
};
