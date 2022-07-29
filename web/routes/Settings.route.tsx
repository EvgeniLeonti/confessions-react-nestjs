/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { type Route } from "../core";
import { type Settings } from "../pages/Admin";

export default {
  path: "/settings",
  component: () => import(/* webpackChunkName: "settings" */ "../pages/Admin"),
  response: () => ({
    title: "Account Settings",
  }),
} as Route<Settings>;
