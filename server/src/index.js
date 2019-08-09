/**
 * Server config and startup
 */
import Hapi from "@hapi/hapi";
import routes from "./routes";

/** Config options */
const port = 3001;
const host = "localhost";

/**  Initialize server */
const init = async () => {
  const server = Hapi.server({
    port,
    host
  });

  /** inject all routes into server object */
  server.route(routes);

  await server.start();
  console.log("Server running on %ss", server.info.uri);
};

/**  Catch any uncaught exceptions */
process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

/** Start server */
init();
