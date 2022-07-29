/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import HomeRoute from "./Home.route";
import LegalRoutes from "./Legal.route";
import AuthRoutes from "./Auth.route";
import createNew from "./Confess.route";
import settings from "./Settings.route";
import ProfileRoute from "./Profile.route";
import AdminRoute from "./Admin.route";

/**
 * Exports the list of application routes
 */
export default [
  ...AuthRoutes,
  ProfileRoute,
  HomeRoute,
  createNew,
  settings,
  ...LegalRoutes,
  AdminRoute,
] as const;
