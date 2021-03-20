module.exports = {
  // 网页中的rem=实际像素*0.0625
  title: "ONE PIECE",
  description: "ONE PIECE",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/images/favicon.ico",
      },
    ],
  ],
  themeConfig: {
    logo: "/images/favicon.ico",
    nav: require("./config/nav"),
    sidebar: require("./config/sidebar"),
    smoothScroll: true,
  },
};
