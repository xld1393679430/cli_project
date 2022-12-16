import Command from "@lerna-cli-xld/command";
import { log } from "@lerna-cli-xld/utils";
import createTemplate from "./createTemplate.js";
import downloadTemplate from './downloadTemplate.js'

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

  async action([name, opts]) {
    log.info("init action", name, opts);
    // 1,选择项目模板，生成项目信息
    const selectedTemplate = await createTemplate(name, opts);
    // 2, 项目模板下载
    downloadTemplate(selectedTemplate)
    // 3,
    // 4,
  }
}

function Init(instance) {
  return new InitCommand(instance);
}

export default Init;
