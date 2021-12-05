import { server } from "./functions/server";
import { app } from "./utils/app";
import { middlewares } from "./utils/middlewares";

const PORT = +process.env.PORT || 3000;

server({
  app,
  port: PORT,
  before: async () => {
    await middlewares(app);
  },
  after: async () => {
    console.log(`🚀 http://localhost:${PORT}`);
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
