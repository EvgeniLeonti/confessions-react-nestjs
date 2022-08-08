/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {ArrowDropDown, Language, NotificationsNone} from "@mui/icons-material";
import {AppBar, AppBarProps, Button, IconButton, InputBase, Link, TextField, Toolbar, Typography,} from "@mui/material";
import * as React from "react";
import {useAuth, useHistory, useNavigate, useToggleTheme} from "../core";
import {NotificationsMenu, UserMenu} from "../menus";
import {ThemeButton} from "./ThemeButton";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {LanguageMenu} from "../menus/LanguageMenu";
import {useTranslation} from "react-i18next";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import i18n from "../i18n/i18n";
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
  const history = useHistory();

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

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: 'auto',


  }));

  const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '0',
      '&:focus': {
        width: '20ch',
      },
    },
  }));

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

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder={t('search.placeholder')}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => {
              // console.log(e.target.value)
              // history.push(`/search?q=${e.target.value}`)
            }}
            onKeyDown={(e) => {
              if(e.keyCode == 13){
                history.push(`/search?q=${e.target.value}`)
              }
            }}
          />
          {/*{i18n.dir() === 'rtl' ? <ArrowLeftIcon /> : <ArrowRightIcon />}*/}
        </Search>

        <ThemeButton sx={{
          marginInlineStart: (x) => x.spacing(1),
          marginInlineEnd: (x) => x.spacing(1),
        }} />

        <IconButton
          ref={languageMenuAnchorRef}
          children={<Language />}
          onClick={() => openLanguageMenu()}
        />

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

