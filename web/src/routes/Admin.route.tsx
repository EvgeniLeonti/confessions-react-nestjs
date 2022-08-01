/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {type Route} from "../core";
import {type Admin} from "../pages/Admin";

export default {
  path: "/admin",
  component: () => import(/* webpackChunkName: "home" */ "../pages/Admin"),
  response: () => ({
    title: "Admin",
    description: "Web application built with React",
  }),
} as Route<Admin>;
