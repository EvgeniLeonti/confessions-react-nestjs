/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {CssBaseline, Toolbar} from "@mui/material";
import {Action, Update} from "history";
import * as React from "react";
import {History, HistoryContext, LocationContext} from "../core/history";
import type {RouterResponse} from "../core/router";
import {resolveRoute} from "../core/router";
import {AppToolbar} from "./AppToolbar";
import {ErrorPage} from "./ErrorPage";
import {ThemeProvider} from "./ThemeProvider";
import {BottomMenu} from "./BottomMenu";
import {Wrapper} from "./Wrapper";
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import config from "../core/config";
import LogRocket from 'logrocket';
LogRocket.init('ohquht/confessions');

class App extends React.Component<AppProps> {
  state = {
    route: undefined as RouterResponse | undefined,
    location: this.props.history.location,
    action: Action.Pop,
    error: undefined as Error | undefined,
  };

  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error };
  }

  dispose?: () => void;

  componentDidMount(): void {
    const { history } = this.props;
    this.dispose = history.listen(this.renderPath);
    this.renderPath({ location: history.location, action: Action.Pop });
  }

  componentDidUpdate(): void {
    if (this.state.route?.title) {
      self.document.title = this.state.route.title;
    }

    if (this.state.action === Action.Push) {
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount(): void {
    if (this.dispose) this.dispose();
  }

  componentDidCatch(error: Error, errorInfo: unknown): void {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  renderPath = async (ctx: Update): Promise<void> => {
    resolveRoute({
      path: ctx.location.pathname,
      query: new URLSearchParams(ctx.location.search),
    }).then((route) => {
      if (route.error) console.error(route.error);
      this.setState({
        route,
        location: ctx.location,
        action: ctx.action,
        error: route.error,
      });
    });
  };

  render(): JSX.Element {
    const { history } = this.props;
    const { route, location, error } = this.state;


    if (error) {
      return (
        <ThemeProvider>
          <ErrorPage error={error} history={history} />;
        </ThemeProvider>
      );
    }

    return (
      <GoogleReCaptchaProvider
        reCaptchaKey={config.recaptcha.siteKey}
        language="[optional_language]"
        // useRecaptchaNet="[optional_boolean_value]"
        // useEnterprise="[optional_boolean_value]"
        scriptProps={{
          async: false, // optional, default to false,
          defer: false, // optional, default to false
          appendTo: 'head', // optional, default to "head", can be "head" or "body",
          nonce: undefined // optional, default undefined
        }}
        // container={{ // optional to render inside custom element
        //   element: "[required_id_or_htmlelement]",
        //   parameters: {
        //     badge: '[inline|bottomright|bottomleft]', // optional, default undefined
        //     theme: 'dark', // optional, default undefined
        //   }
        // }}
      >
        <ThemeProvider>
          <HistoryContext.Provider value={history}>
            <LocationContext.Provider value={location}>
              <Wrapper>
                <CssBaseline />
                <AppToolbar />
                <Toolbar />
                {route?.component
                  ? React.createElement(route.component, route.props)
                  : null}
                <BottomMenu />
              </Wrapper>
            </LocationContext.Provider>
          </HistoryContext.Provider>
        </ThemeProvider>
      </GoogleReCaptchaProvider>
    );
  }
}

type AppProps = {
  history: History;
};

export { App };
