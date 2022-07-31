/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {Link, ListItemIcon, ListItemText, Menu, MenuItem, MenuProps,} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import * as React from "react";
import i18n from "../i18n/i18n";
import {useTranslation} from "react-i18next";
import {pushNotification} from "../store/toast.state";
import {useDispatch} from "react-redux";

type LanguageMenuProps = Omit<
  MenuProps,
  "id" | "role" | "open" | "anchorOrigin" | "transformOrigin"
> & {
  closeMenu: () => void;
};

export function LanguageMenu(props: LanguageMenuProps): JSX.Element {
  const { t } = useTranslation();
  const { closeMenu, PaperProps, MenuListProps, ...other } = props;
  const theme = useTheme();
  const dispatch = useDispatch();


  function changeLanguage(lng: string) {
    const prevLng = i18n.language;
    i18n.changeLanguage(lng)
    document.body.dir = i18n.dir() || 'ltr';
    theme.direction = i18n.dir() || 'ltr';
    closeMenu();

    if (prevLng !== lng) {
      dispatch(pushNotification({message: t(`language.change.success`), options: { variant: 'success' } }))
    }
  }

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
  ]

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

    </Menu>

  );
}
