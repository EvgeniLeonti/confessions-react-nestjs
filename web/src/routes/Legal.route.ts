/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { type Route } from "../core";
import { type Privacy } from "../pages/LegalPrivacy";
import { type Terms } from "../pages/LegalTerms";

export default [
  {
    path: "/privacy",
    component: () => import(/* webpackChunkName: "legal" */ "../pages/LegalPrivacy"),
    response: () => ({
      title: "Privacy Policy",
    }),
  } as Route<Privacy>,

  {
    path: "/terms",
    component: () => import(/* webpackChunkName: "legal" */ "../pages/LegalTerms"),
    response: () => ({
      title: "Terms of Use",
    }),
  } as Route<Terms>,
];
