import path from "node:path";
import { pathExistsSync } from "path-exists";
import fse from "fs-extra";
import ora from "ora";
import ejs from "ejs";
import glob from "glob";
import { log, printErrorLog } from "@lerna-cli-xld/utils";

function getCacheFilePath(targetPath, template) {
  return path.resolve(targetPath, "node_modules", template.npmName, "template");
}

function copyFile(targetPath, template, installDir) {
  const originFile = getCacheFilePath(targetPath, template);
  const fileList = fse.readdirSync(originFile);
  const spinner = ora("正在拷贝模板文件...").start();
  try {
    fileList.map((file) => {
      fse.copySync(`${originFile}/${file}`, `${installDir}/${file}`);
    });
    spinner.stop();
    log.success("拷贝成功");
  } catch (error) {
    spinner.stop();
    log.error("拷贝失败!!! " + error.message);
  }
}

function ejsRender(installDir, name) {
  glob(
    "**",
    {
      cwd: installDir,
      nodir: true,
      ignore: [
        "**/public/**",
        "**/node_modules/**"
      ],
    },
    (err, files) => {
      files.forEach((file) => {
        const filePath = path.join(installDir, file);
        ejs.renderFile(
          filePath,
          {
            data: {
              name,
            }
          },
          (err, result) => {
            if (!err) {
              fse.writeFileSync(filePath, result);
            } else {
              printErrorLog(err);
            }
          }
        );
      });
    }
  );
}

export default function installTemplate(selectedTemplate, opts) {
  const { targetPath, name, template } = selectedTemplate;
  const { force = false } = opts;
  const rootDir = process.cwd();

  fse.ensureDirSync(targetPath);

  const installDir = path.resolve(`${rootDir}/${name}`);
  if (pathExistsSync(installDir)) {
    if (!force) {
      throw new Error(`当前目录已存在${name}文件`);
    } else {
      fse.removeSync(installDir);
      fse.ensureDirSync(installDir);
    }
  } else {
    fse.ensureDirSync(installDir);
  }

  copyFile(targetPath, template, installDir);

  ejsRender(installDir, name);
}
