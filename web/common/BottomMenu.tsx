/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {AppBarProps, BottomNavigation, BottomNavigationAction, Paper,} from "@mui/material";
import * as React from "react";
import {useHistory} from "../core";
import HomeIcon from "@mui/icons-material/Home";
import HomeRoute from "../routes/Home.route";
import AddIcon from "@mui/icons-material/Add";
import ConfessRoute from "../routes/Confess.route";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsRoute from "../routes/Settings.route";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

type AppToolbarProps = AppBarProps;

export function BottomMenu(props: AppToolbarProps): JSX.Element {
  const history = useHistory();
  const authState = useSelector((state: RootState) => state.auth);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={history.location.pathname}
        onChange={(event, newValue) => history.push(newValue)}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} value={HomeRoute.path}/>
        <BottomNavigationAction label="Confess" icon={<AddIcon />} value={ConfessRoute.path}/>
        {authState.user && <BottomNavigationAction label="Profile" icon={<AccountBoxIcon />} value="/profile"/>}
        {authState.user?.role === 'ADMIN' && <BottomNavigationAction label="Admin" icon={<AdminPanelSettingsIcon />} value='/admin'/>}

      </BottomNavigation>
    </Paper>
  );
}




