/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { DarkMode, LightMode, Language } from "@mui/icons-material";
import { IconButton, IconButtonProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useToggleTheme } from "../core";

function LanguageButton(props: LanguageButtonProps): JSX.Element {
  const { ...other } = props;
  const toggleTheme = useToggleTheme();
  const theme = useTheme();

  return (
    <IconButton {...other}><Language /></IconButton>
  );
}

type LanguageButtonProps = Omit<IconButtonProps, "children">;

export { LanguageButton };
