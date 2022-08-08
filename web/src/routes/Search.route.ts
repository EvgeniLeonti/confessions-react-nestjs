import {type Route} from "../core";
import {type Search} from "../pages/Search";

export default {
  path: "/search",
  component: () => import(/* webpackChunkName: "home" */ "../pages/Search"),
  response: () => ({
    title: "Search",
  }),
} as Route<Search>;
