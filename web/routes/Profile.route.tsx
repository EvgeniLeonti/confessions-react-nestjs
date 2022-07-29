/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {type Route} from "../core";
import {type Profile} from "../pages/Profile";

export default {
  path: "/profile",
  component: () => import(/* webpackChunkName: "home" */ "../pages/Profile"),
  response: () => ({
    title: "Profile",
    description: "Web application built with React",
  }),
} as Route<Profile>;
