import { printErrorLog } from "@lerna-cli-xld/utils";

process.on("uncaughtException", (e) => printErrorLog(e, "uncaughtException"));

process.on("unhandledRejection", (e) => printErrorLog(e, "unhandledRejection"));
