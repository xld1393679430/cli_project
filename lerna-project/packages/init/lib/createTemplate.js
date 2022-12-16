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
    version: "latest",
  },
  {
    name: "React项目模板",
    value: "react-template",
    npmName: "@xld_template/react-template",
    version: "latest",
  },
  {
    name: "Vue-Element-Admin项目模板",
    value: "vue-element-admin-template",
    npmName: "@xld_template/vue-element-admin-template",
    version: "latest",
  },
];

const TEMP_HOME = ".lerna-cli-xld";

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
        return true;
      }
      return "项目名称必须输入";
    },
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
function makeTargetPath() {
  return path.resolve(`${homedir()}/${TEMP_HOME}`, "addTemplate");
}

export default async function createTemplate(name, opts) {
  const { type = null, template = null } = opts;
  let addType; // 项目类型
  let addName; // 项目名称
  let addTemplate; // 项目模板
  if (type) {
    addType = type;
  } else {
    addType = await getAddType();
  }

  if (addType === ADD_TYPE_PROJECT) {
    if (name) {
      addName = name;
    } else {
      addName = await getAddName(name);
    }

    if (template) {
      addTemplate = ADD_TEMPLATE.find((tp) => tp.value === template);
    } else {
      const tp = await getAddTemplate();
      addTemplate = ADD_TEMPLATE.find((_) => _.value === tp);
    }

    if (!addTemplate) {
      throw new Error("创建的项目模板不存在");
    }

    const targetPath = makeTargetPath();
    return {
      targetPath,
      type: addType,
      name: addName,
      template: addTemplate,
    };
  } else {
    throw new Error("创建的项目类型不支持");
  }
}
