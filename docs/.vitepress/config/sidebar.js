module.exports = {
  "/note/": [
    {
      text: "笔记记录",
      collapsable: false,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: [
        { text: "开始使用Nest.js", link: "/note/" },
        { text: "CRM升级日志", link: "/note/html/upgrade_log" },
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
  "/grocery_store/": [
    {
      text: "杂货铺",
      collapsable: false,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: [{ text: "前端架构师", link: "/grocery_store/" }],
    },
  ],
};
