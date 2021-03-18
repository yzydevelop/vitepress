module.exports = {
  "/basic/": [
    {
      text: "HTML CSS",
      collapsable: false,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: [
        { text: "items01", link: "/basic/" },
        { text: "items02", link: "/basic/html/article" },
      ],
    },
  ],
  "/buildservice/": [
    {
      text: "构建脚本",
      collapsable: false,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: [{ text: "buildservice", link: "/buildservice/" }],
    },
  ],
};
