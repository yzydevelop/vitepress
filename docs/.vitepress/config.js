module.exports = {
  base: "/", //基础路径
  title: "yzydeveloper",
  description: "VitePress 体验版",
  markdown: {
    lineNumbers: true,
  },
  base: "./",
  themeConfig: {
    lastUpdated: "更新时间",
    nav: require("./config/nav"),
    sidebar: require("./config/sider"),
  },
};
