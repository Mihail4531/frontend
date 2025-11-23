import { API_URL } from "@/lib/constants";

export const API_ROUTE = {
  root: (url: string = "") => API_URL + url,

  auth: {
    register: () => API_ROUTE.root("/register"),
    login: () => API_ROUTE.root("/login"),
    logout: () => API_ROUTE.root("/logout"),
  },

  user: {
    me: () => API_ROUTE.root("/me"),
  },

  profile: {
    show: () => API_ROUTE.root("/profile"),
    update: () => API_ROUTE.root("/profile"),
  },
  posts: {
    index: () => API_ROUTE.root("/posts"),
    show: (slug: string) => API_ROUTE.root(`/posts/${slug}`),
    create: () => API_ROUTE.root("/posts"),
  },
};
