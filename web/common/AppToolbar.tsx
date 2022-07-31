/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { ArrowDropDown, NotificationsNone } from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  Avatar,
  Button,
  Chip,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { config, useAuth, useNavigate, useToggleTheme } from "../core";
import { NotificationsMenu, UserMenu } from "../menus";
import { ThemeButton } from "./ThemeButton";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {LanguageButton} from "./LanguageButton";
import {LanguageMenu} from "../menus/LanguageMenu";
import {useTranslation} from "react-i18next";

type AppToolbarProps = AppBarProps;

export function AppToolbar(props: AppToolbarProps): JSX.Element {
  const { t } = useTranslation();
  const { sx, ...other } = props;
  const menuAnchorRef = React.createRef<HTMLButtonElement>();
  const languageMenuAnchorRef = React.createRef<HTMLButtonElement>();
  const toggleTheme = useToggleTheme();
  const { ...auth } = useAuth();
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);

  const me = authState.accessToken;

  const [anchorEl, setAnchorEl] = React.useState({
    userMenu: null as HTMLElement | null,
    languageMenu: null as HTMLElement | null,
    notifications: null as HTMLElement | null,
  });

  function openNotificationsMenu() {
    console.log('openNotificationsMenu', menuAnchorRef.current)

    setAnchorEl((x) => ({ ...x, notifications: menuAnchorRef.current }));
  }

  function closeNotificationsMenu() {
    console.log('closeNotificationsMenu', menuAnchorRef.current)

    setAnchorEl((x) => ({ ...x, notifications: null }));
  }

  function openUserMenu() {
    setAnchorEl((x) => ({ ...x, userMenu: menuAnchorRef.current }));
  }

  function closeUserMenu() {
    setAnchorEl((x) => ({ ...x, userMenu: null }));
  }

  function openLanguageMenu() {
    console.log('openLanguageMenu', languageMenuAnchorRef.current)
    setAnchorEl((x) => ({ ...x, languageMenu: languageMenuAnchorRef.current }));
  }

  function closeLanguageMenu() {
    console.log('closeLanguageMenu', languageMenuAnchorRef.current)

    setAnchorEl((x) => ({ ...x, languageMenu: null }));
  }

  function signIn(event: React.MouseEvent): void {
    event.preventDefault();
    auth.signIn();
  }

  return (
    <AppBar
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, ...sx }}
      color="default"
      elevation={1}
      {...other}
    >
      <Toolbar>
        {/* App name / logo */}

        <Typography variant="h1" sx={{ fontSize: "1.5rem", fontWeight: 500 }}>
          <Link color="inherit" underline="none" href="/" onClick={navigate}>
            {t('app.name')}
          </Link>
        </Typography>

        <span style={{ flexGrow: 1 }} />

        <ThemeButton sx={{
          'margin-inline-start': (x) => x.spacing(1),
          'margin-inline-end': (x) => x.spacing(1),
        }} />

        <IconButton
          ref={languageMenuAnchorRef}
          sx={{
            'margin-inline-end': (x) => x.spacing(2),
            width: 40,
            height: 40,
          }}
          children={<LanguageButton />}
          onClick={() => {
            console.log('sd')
            openLanguageMenu();
            // openNotificationsMenu();
          }}
        />

        {/*<IconButton*/}
        {/*  sx={{*/}
        {/*    marginLeft: (x) => x.spacing(1),*/}
        {/*    backgroundColor: (x) =>*/}
        {/*      x.palette.mode === "light"*/}
        {/*        ? x.palette.grey[300]*/}
        {/*        : x.palette.grey[700],*/}
        {/*    width: 40,*/}
        {/*    height: 40,*/}
        {/*  }}*/}
        {/*  children={<LanguageButton />}*/}
        {/*  onClick={openNotificationsMenu}*/}
        {/*/>*/}




        {/*{authState.accessToken ? 'logged-in' : 'logged-out'}*/}
        {/*{me && (*/}
        {/*  <Chip*/}
        {/*    sx={{*/}
        {/*      height: 40,*/}
        {/*      borderRadius: 20,*/}
        {/*      fontWeight: 600,*/}
        {/*      backgroundColor: (x) =>*/}
        {/*        x.palette.mode === "light"*/}
        {/*          ? x.palette.grey[300]*/}
        {/*          : x.palette.grey[700],*/}
        {/*      ".MuiChip-avatar": { width: 32, height: 32 },*/}
        {/*    }}*/}
        {/*    component="a"*/}
        {/*    avatar={*/}
        {/*      <Avatar*/}
        {/*        alt={me?.name ?? ""}*/}
        {/*        src="https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png"*/}
        {/*      />*/}
        {/*    }*/}
        {/*    label={me.email}*/}
        {/*    onClick={navigate}*/}
        {/*  />*/}
        {/*)}*/}
        {me && (
          <IconButton
            sx={{
              marginLeft: (x) => x.spacing(1),
              backgroundColor: (x) =>
                x.palette.mode === "light"
                  ? x.palette.grey[300]
                  : x.palette.grey[700],
              width: 40,
              height: 40,
            }}
            children={<NotificationsNone />}
            onClick={openNotificationsMenu}
          />
        )}
        {me && (
          <IconButton
            ref={menuAnchorRef}
            sx={{
              marginLeft: (x) => x.spacing(1),
              backgroundColor: (x) =>
                x.palette.mode === "light"
                  ? x.palette.grey[300]
                  : x.palette.grey[700],
              width: 40,
              height: 40,
            }}
            children={<ArrowDropDown />}
            onClick={openUserMenu}
          />
        )}
        {!me && (
          // <Button
          //   variant="outlined"
          //   href="/login"
          //   color="primary"
          //   onClick={signIn}
          //   children="Log in / Register"
          // />
          <Button
            variant="outlined"
            href="/login"
            color="primary"
            children="Log in"
          />
        )}
      </Toolbar>

      {/* Pop-up menus */}

      <NotificationsMenu
        anchorEl={anchorEl.notifications}
        onClose={closeNotificationsMenu}
        PaperProps={{ sx: { marginTop: "8px" } }}
      />
      <LanguageMenu
        anchorEl={anchorEl.languageMenu}
        onClose={closeLanguageMenu}
        PaperProps={{ sx: { marginTop: "8px" } }}
      />
      <UserMenu
        anchorEl={anchorEl.userMenu}
        onClose={closeUserMenu}
        PaperProps={{ sx: { marginTop: "8px" } }}
        onChangeTheme={toggleTheme}
      />

    </AppBar>
  );
}

