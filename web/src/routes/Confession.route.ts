import {type Route} from "../core";
import {type Confession} from "../pages/Confession";

export default {
  path: "/confession/:id",
  component: () => import(/* webpackChunkName: "home" */ "../pages/Confession"),
  response: () => ({
    title: "Confessions",
    description: "Confess about your secrets and get anonymous feedback. Read confessions from other people.",
  }),
} as Route<Confession>;
