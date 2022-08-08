import HomeRoute from "./Home.route";
import ConfessionRoutes from "./Confession.route";
import LegalRoutes from "./Legal.route";
import AuthRoutes from "./Auth.route";
import CreateRoute from "./Confess.route";
import SettingsRoute from "./Settings.route";
import ContactRoute from "./Contact.route";
import SearchRoute from "./Search.route";
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
  CreateRoute,
  SettingsRoute,
  ContactRoute,
  SearchRoute,
  ...LegalRoutes,
  AdminRoute,
] as const;
