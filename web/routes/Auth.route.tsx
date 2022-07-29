/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {type Route} from "../core";
import {type Signup} from "../pages/Signup";
import {type Login} from "../pages/Login";

export default [
  {
    path: "/register",
    component: () => import(/* webpackChunkName: "settings" */ "../pages/Signup"),
    response: () => ({
      title: "Signup",
    }),
  } as Route<Signup>,
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "settings" */ "../pages/Login"),
    response: () => ({
      title: "Login",
    }),
  } as Route<Login>,
]
