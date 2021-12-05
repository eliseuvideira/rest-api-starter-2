import {
  NextFunction as ExpressNextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
  RequestHandler as ExpressRequestHandler,
} from "express";
import { ReadStream } from "fs";
import { Readable } from "stream";

export type Stream = Readable | ReadStream;

export type RequestHandlerResponse<T> = {
  status: number;
  headers?: Record<string, any>;
  body: T | Stream;
};

export type ExpressRequestMinimal = Omit<
  ExpressRequest,
  "params" | "query" | "body"
>;

export interface Request<Params, Query, Body> extends ExpressRequestMinimal {
  params: Params;
  query: Query;
  body: Body;
}

export type RequestHandler<ResBody, ReqParams, ReqQuery, ReqBody> = (
  req: Request<ReqParams, ReqQuery, ReqBody>,
  res: ExpressResponse,
  next: ExpressNextFunction,
) => Promise<RequestHandlerResponse<ResBody>>;

export const endpoint =
  <
    ResBody,
    ReqParams = Record<string, string>,
    ReqQuery = Record<string, string>,
    ReqBody = Record<string, any>,
  >(
    handler: RequestHandler<ResBody, ReqParams, ReqQuery, ReqBody>,
  ): ExpressRequestHandler =>
  async (req, res, next) => {
    try {
      const values = await handler(req as any, res, next);

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
