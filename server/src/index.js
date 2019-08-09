import Hapi from "@hapi/hapi";
import routes from "./routes";

/**
 * Server config and startup
 */

const port = 3001;
const host = "localhost";

const init = async () => {
  const server = Hapi.server({
    port,
    host
  });

  /** inject all routes into server object */
  server.route(routes);

  /** Start server */
  await server.start();
  console.log("Server running on %ss", server.info.uri);
};

/**  Catch any uncaught exceptions */
process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

/** Initialize and start server */
init();
