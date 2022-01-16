import theme from "./theme";

export default {
  theme,
  app: {
    name: "Scraper Admin",
    version: "0.0.1",
  },
  apiHost: "localhost",
  api: {
    schema: "https",
    host: "localhost",
  },
  navs: [
    {
      icon: "Dashboard",
      title: "首页面板",
      path: "/",
    },
    {
      icon: "Settings",
      title: "系统配置",
      path: "/setting",
    },
  ],
};
