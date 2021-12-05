import { hello, helloUsername } from "../endpoints/hello";
import { Router, router } from "../functions/router";

export const routes = router(
  Router.get("/hello", hello),

  Router.get("/hello/:username", helloUsername),
);
