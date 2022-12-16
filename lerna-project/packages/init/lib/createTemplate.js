import { homedir } from "node:os";
import path from "node:path";
import { log, makeList, makeInput } from "@lerna-cli-xld/utils";

const ADD_TYPE_PROJECT = "project";
const ADD_TYPE_PAGE = "page";
const ADD_TYPE = [
  {
    name: "项目",
    value: ADD_TYPE_PROJECT,
  },
  {
    name: "页面",
    value: ADD_TYPE_PAGE,
  },
];
const ADD_TEMPLATE = [
  {
    name: "Vue项目模板",
    value: "vue-template",
    npmName: "@xld_template/vue-template",
    version: "1.0.0",
  },
  {
    name: "React项目模板",
    value: "react-template",
    npmName: "@xld_template/react-template",
    version: "1.0.1",
  },
];

const TEMP_HOME = ".cli-immoc";

// 获取创建类型
function getAddType() {
  return makeList({
    choices: ADD_TYPE,
    message: "请选择初始化类型",
    defaultValue: ADD_TYPE_PROJECT,
  });
}

// 获取项目名称
function getAddName(name) {
  return makeInput({
    message: "请输入项目名称",
    defaultValue: name,
    validate(v) {
        if (v.length > 0) {
          return true
        }
        return "项目名称必须输入"
    }
  });
}

// 获取项目模板
function getAddTemplate() {
  return makeList({
    choices: ADD_TEMPLATE,
    message: "请选择项目模板",
  });
}

// 模板安装的目录
function makeTargetPath(name) {
  return path.resolve(`${homedir()}/Project-${name.toUpperCase()}`, "addTemplate");
}

export default async function createTemplate(name, opts) {
  const addType = await getAddType();
  if (addType === ADD_TYPE_PROJECT) {
    const addName = await getAddName(name);
    const addTemplate = await getAddTemplate();
    const selectedTemplate = ADD_TEMPLATE.find((_) => _.value === addTemplate);

    const targetPath = makeTargetPath(name);
    return {
      type: addType,
      name: addName,
      targetPath,
      template: selectedTemplate,
    };
  }
}
