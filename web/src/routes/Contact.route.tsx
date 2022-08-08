import {type Route} from "../core";
import {type Settings} from "../pages/Admin";

export default {
  path: "/contact",
  component: () => import(/* webpackChunkName: "settings" */ "../pages/Contact"),
  response: () => ({
    title: "Contact",
  }),
} as Route<Settings>;
