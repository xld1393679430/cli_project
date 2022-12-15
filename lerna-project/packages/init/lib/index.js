import Command from "@lerna-cli-xld/command";
import { log } from "@lerna-cli-xld/utils";

class InitCommand extends Command {
  get command() {
    return "init [name]";
  }

  get description() {
    return "init project";
  }

  get options() {
    return [["-f, --force", "是否强制更新", false]];
  }

  action([name, opts]) {
    log.info("init action", name, opts);
    new Promise((resolve) => {
      resolve()
    }).then(() => {
      throw new Error("Error from Promise")
    })
  }
}

function Init(instance) {
  return new InitCommand(instance);
}

export default Init;
