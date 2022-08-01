/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {type Route} from "../core";
import {type Confess} from "../pages/Confess";

export default {
  path: "/confess",
  component: () => import(/* webpackChunkName: "settings" */ "../pages/Confess"),
  response: () => ({
    title: "Confess",
  }),
} as Route<Confess>;
