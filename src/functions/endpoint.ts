import {
  NextFunction as ExpressNextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
  RequestHandler as ExpressRequestHandler,
} from "express";
import { ReadStream } from "fs";
import { Readable } from "stream";

export type RequestHandlerResponse<T> = {
  status: number;
  headers?: Record<string, any>;
  body: T;
};

export interface EndpointArgs<Params, Query, Body> {
  params: Params;
  query: Query;
  body: Body;
}

export interface EndpointContext {
  req: ExpressRequest;
  res: ExpressResponse;
  next: ExpressNextFunction;
}

export type RequestHandler<Body, ArgsParams, ArgsQuery, ArgsBody> = (
  args: EndpointArgs<ArgsParams, ArgsQuery, ArgsBody>,
  ctx: EndpointContext,
) => Promise<RequestHandlerResponse<Body>>;

export const endpoint =
  <
    Body,
    Args extends Partial<
      EndpointArgs<ArgsParams, ArgsQuery, ArgsBody>
    > = Record<string, never>,
    ArgsParams = Args["params"],
    ArgsQuery = Args["query"],
    ArgsBody = Args["body"],
  >(
    handler: RequestHandler<Body, ArgsParams, ArgsQuery, ArgsBody>,
  ): ExpressRequestHandler =>
  async (req, res, next) => {
    try {
      const values = await handler(
        {
          params: (req.params as any) || {},
          query: (req.query as any) || {},
          body: req.body || {},
        },
        { req, res, next },
      );

      if (values.headers) {
        const keys = Object.keys(values.headers);

        for (const key of keys) {
          res.header(key, values.headers[key]);
        }
      }

      res.status(values.status);

      if (
        values.body instanceof ReadStream ||
        values.body instanceof Readable
      ) {
        values.body.pipe(res);
        return;
      }

      res.json(values.body);
    } catch (err) {
      next(err);
    }
  };
