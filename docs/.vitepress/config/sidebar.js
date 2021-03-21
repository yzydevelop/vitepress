module.exports = {
  "/note/": [
    {
      text: "笔记记录",
      collapsable: false,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: [
        { text: "CRM升级日志", link: "/note/" },
        { text: "开始使用Nest.js", link: "/note/html/nestjs" },
        { text: "Jenkins教程", link: "/note/html/jenkins" },
      ],
    },
  ],
  "/open_source/": [
    {
      text: "我的开源",
      collapsable: false,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: [{ text: "buildservice", link: "/open_source/" }],
    },
  ],
};
