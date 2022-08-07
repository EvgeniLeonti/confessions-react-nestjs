import HomeRoute from "./Home.route";
import ConfessionRoutes from "./Confession.route";
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
  ConfessionRoutes,
  ProfileRoute,
  HomeRoute,
  createNew,
  settings,
  ...LegalRoutes,
  AdminRoute,
] as const;
