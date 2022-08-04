import {AppBarProps, BottomNavigation, BottomNavigationAction, Paper,} from "@mui/material";
import * as React from "react";
import {useHistory} from "../core";
import HomeIcon from "@mui/icons-material/Home";
import HomeRoute from "../routes/Home.route";
import AddIcon from "@mui/icons-material/Add";
import ConfessRoute from "../routes/Confess.route";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useTranslation} from "react-i18next";

type AppToolbarProps = AppBarProps;

export function BottomMenu(props: AppToolbarProps): JSX.Element {
  const history = useHistory();
  const { t } = useTranslation();
  const authState = useSelector((state: RootState) => state.auth);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={history.location.pathname}
        onChange={(event, newValue) => history.push(newValue)}
      >
        <BottomNavigationAction label={t('menu.home')} icon={<HomeIcon />} value={HomeRoute.path}/>
        <BottomNavigationAction label={t('menu.confess')} icon={<AddIcon />} value={ConfessRoute.path}/>
        {authState.user && <BottomNavigationAction label={t('menu.profile')} icon={<AccountBoxIcon />} value="/profile"/>}
        {authState.user?.role === 'ADMIN' && <BottomNavigationAction label={t('menu.admin')} icon={<AdminPanelSettingsIcon />} value='/admin'/>}

      </BottomNavigation>
    </Paper>
  );
}




