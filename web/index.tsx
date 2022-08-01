/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import history from "history/browser";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./src/common";
import {store} from "./src/store/store";
import { SnackbarProvider } from 'notistack';

const root = createRoot(document.getElementById("root") as HTMLElement);
const data = (document.getElementById("data") as HTMLScriptElement).text;

// TODO: Initialize local store (Relay, Apollo, Redux, etc.)
// const store = createRelay({ data: JSON.parse(data) });

// Render the top-level React component
root.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3} anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}>
      <App history={history} />
    </SnackbarProvider>
  </Provider>
);
