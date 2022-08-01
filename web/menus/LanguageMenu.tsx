/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {Link, ListItemIcon, ListItemText, Menu, MenuItem, MenuProps, Switch,} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import * as React from "react";
import i18n from "../i18n/i18n";
import {useTranslation} from "react-i18next";
import {pushNotification} from "../store/toast.state";
import {useDispatch} from "react-redux";
import {setLanguage} from "../store/app.state";
import {useAuth, useHistory, useNavigate} from "../core";
import {unsetAccessToken} from "../store/auth.state";
import {Brightness4, Settings} from "@mui/icons-material";
import {Logout} from "../icons";

type LanguageMenuProps = Omit<
  MenuProps,
  "id" | "role" | "open" | "anchorOrigin" | "transformOrigin"
> & {
  closeMenu: () => void;
};

export function LanguageMenu(props: LanguageMenuProps): JSX.Element {
  const { onChangeTheme, PaperProps, MenuListProps, ...other } = props;
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const history = useHistory();
  const theme = useTheme();
  const auth = useAuth();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>): void {
    props.onClose?.(event, "backdropClick");
    navigate(event);
  }

  function changeLanguage(lng: string) {
    const prevLng = i18n.language;
    i18n.changeLanguage(lng).then(() => {
      if (prevLng !== lng) {
        history.go(0); // todo invalidate get posts cache
        // dispatch(pushNotification({message: t(`language.change.success`), options: { variant: 'success' } }))
      }
    });
    document.body.dir = i18n.dir() || 'ltr';
    theme.direction = i18n.dir() || 'ltr';
    // onClose();


  }

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
  ];

  return (
    <Menu
      id="language-menu"
      role="menu"
      open={Boolean(props.anchorEl)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{ ...PaperProps, sx: { ...PaperProps?.sx, width: 320 } }}
      MenuListProps={{ ...MenuListProps, dense: true }}
      {...other}
    >
      {languages.map(({code, name, flag}) => (
        <MenuItem selected={i18n.language === code} component={Link} onClick={() => changeLanguage(code)}>
          <ListItemIcon sx={{ minWidth: 40 }} children={<div>{flag}</div>} />
          <ListItemText primary={name} />
        </MenuItem>
      ))}



      {/*<MenuItem onClick={signOut}>*/}
      {/*  <ListItemIcon sx={{ minWidth: 40 }} children={<Logout />} />*/}
      {/*  <ListItemText primary="Log Out" />*/}
      {/*</MenuItem>*/}

      {/* Copyright and links to legal documents */}


    </Menu>
  );
}
