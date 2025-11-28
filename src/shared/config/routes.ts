export const APP_ROUTE = {
  root: (path: string | "") => path,
  home: () => APP_ROUTE.root("/"),
  auth: {
    login: () => APP_ROUTE.root("/login"),
    register: () => APP_ROUTE.root("/register"),
  },
  blog: {
    create: () => APP_ROUTE.root("/create-post"),
    show: (slug: string) => APP_ROUTE.root(`/blog/${slug}`),
  },
    profile: () => APP_ROUTE.root("/profile"),
    rules: () => APP_ROUTE.root("/rules")
};