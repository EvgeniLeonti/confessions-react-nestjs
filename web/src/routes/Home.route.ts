/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {type Route} from "../core";
import {type Home} from "../pages/Home";

export default {
  path: "/",
  component: () => import(/* webpackChunkName: "home" */ "../pages/Home"),
  response: () => ({
    title: "Confessions",
    description: "Confess about your secrets and get anonymous feedback. Read confessions from other people.",
  }),
} as Route<Home>;
