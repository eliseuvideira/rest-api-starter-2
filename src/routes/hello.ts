import { hello, helloUsername } from "../endpoints/hello";
import { router2 } from "../functions/router";

export const routes = router2([
  {
    path: "/hello",
    method: "GET",
    handlers: [hello],
    docs: {
      tag: "Hello",
      summary: "Hello World",
      responses: [
        {
          status: "200",
          contentType: "application/json",
          schema: "String",
        },
      ],
    },
  },
  {
    path: "/hello/:username",
    method: "GET",
    handlers: [helloUsername],
  },
]);
