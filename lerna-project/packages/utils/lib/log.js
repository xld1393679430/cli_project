import log from "npmlog";
import isDebug from "./isDebug.js";

if (isDebug()) {
  log.level = "verbose"; // 这个没有生效
} else {
  log.level = "info";
}

// log.heading = ":::lerna-cli-xld:::"

export default log;