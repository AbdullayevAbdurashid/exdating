const { spawn } = require("child_process");
const fork = require("child_process").fork;

jsonServer = fork("./jsonServer.js");

const nextjsBuild = spawn(`yarn`, ["build-next"], { stdio: "inherit" });

nextjsBuild.on("close", (code) => {
  console.log("nextjsBuild closed with Code:", code);
  code === 0 && closeJSONServer(true);
});
nextjsBuild.on("error", (code) => {
  console.log("nextjsBuild error with code:", code);
  closeJSONServer(false);
});

function closeJSONServer(isBuildComplete) {
  console.log("Nextjs build is complete with status:", isBuildComplete);
  jsonServer.send({ isBuildComplete });
}
