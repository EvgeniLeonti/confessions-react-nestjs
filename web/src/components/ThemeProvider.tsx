/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { detectTheme, saveTheme, ToggleThemeContext } from "../core/theme";
import * as theme from "../theme";
import i18n from "../i18n/i18n";

import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Create rtl cache
const cacheLtr = createCache({
  key: 'muiltr'
});
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

function StyleProvider(props: ThemeProviderProps) {
  return <CacheProvider value={i18n.dir() === "ltr" ? cacheLtr : cacheRtl}>{props.children}</CacheProvider>;
}

function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  const detectedTheme = detectTheme();
  detectedTheme.direction = i18n.dir();

  // detectedTheme.TextField.variant = "outlined";

  detectedTheme.components = {
    ...detectedTheme.components,
    MuiCssBaseline: {
      styleOverrides: `
        .grecaptcha-badge { opacity:0;}
      `,
    }
  }

  document.getElementById('root')?.setAttribute('dir', i18n.dir());
  // document.body.dir = i18n.dir();

  const [value, setValue] = React.useState(detectedTheme);

  const toggleTheme = React.useCallback(() => {
    setValue(({ palette }) => {
      if (palette.mode === theme.light.palette.mode) {
        saveTheme(theme.dark.palette.mode);
        return theme.dark;
      } else {
        saveTheme(theme.light.palette.mode);
        return theme.light;
      }
    });
  }, []);

  return (
    <StyleProvider>
      <MuiThemeProvider theme={value}>
        <ToggleThemeContext.Provider value={toggleTheme}>
          {props.children}
        </ToggleThemeContext.Provider>
      </MuiThemeProvider>
    </StyleProvider>
  );
}

type ThemeProviderProps = {
  children: React.ReactNode;
};

export { ThemeProvider, ToggleThemeContext };
