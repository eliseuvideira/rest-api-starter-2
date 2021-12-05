import { Readable } from "stream";
import { endpoint } from "../functions/endpoint";
import { Router, router } from "../functions/router";

export const routes = router(
  Router.get(
    "/",
    endpoint(async () => {
      return {
        status: 200,
        body: {
          hello: "Hello World!",
        },
      };
    }),
  ),
  Router.get(
    "/hello",
    endpoint<Readable>(async () => {
      return {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
        body: Readable.from("Hello World!"),
      };
    }),
  ),
);
