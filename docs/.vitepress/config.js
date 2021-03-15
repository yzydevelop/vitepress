const nav = require("./config/nav/");
const sidebar = require("./config/sider/");
module.exports = {
  base: "/", //基础路径
  dest: "./dist", //打包输出目录
  title: "yzydeveloper",
  description: "VitePress 体验版",
  markdown: {
    lineNumbers: true,
  },
  base: "./",
  themeConfig: {
    lastUpdated: "更新时间",
    nav,
    sidebar,
  },
};
