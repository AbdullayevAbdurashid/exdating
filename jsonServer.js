const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("./fakeDB/db.json");
const middlewares = jsonServer.defaults();
const PORT = 3333;

server.use(middlewares);
server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

process.on("message", function ({ isBuildComplete }) {
  const exitCode = isBuildComplete === true ? 0 : 1;
  console.log("JSONServer will terminate with code: ", exitCode);
  process.exit(exitCode);
});
