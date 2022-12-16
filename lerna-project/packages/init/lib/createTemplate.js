import { log, makeList } from '@lerna-cli-xld/utils'

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
    npmName: "@xld_template/vue-template",
    version: "1.0.0",
  },
  {
    name: "React项目模板",
    npmName: "@xld_template/react-template",
    version: "1.0.1",
  },
];

// 获取创建类型
function getAddType() {
	return makeList({
		choices: ADD_TYPE,
		message: "请选择初始化类型",
		defaultValue: ADD_TYPE_PROJECT,
	})
}

export default async function createTemplate(name, opts) {	
	const addType = await getAddType()
	console.log("----addType----", addType)
}
