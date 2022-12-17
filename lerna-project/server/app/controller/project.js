/* eslint-disable quotes */
const { Controller } = require("egg");

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

class ProjectController extends Controller {
  async template() {
    const { ctx } = this;
    ctx.body = ADD_TEMPLATE;
  }
}

module.exports = ProjectController;
