/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

/**
 * Web application settings where some of the values are bing replaced
 * with environment specific values. See `*.env` files.
 */
const config = {
  /**
   * Web application settings
   */
  app: {
    name: "Confessions",
    // env: process.env.APP_ENV as "local" | "test" | "production",
  },
  /**
   * GraphQL API and authentication endpoint(s)
   * https://github.com/kriasoft/relay-starter-kit
   */
  api: {
    origin: 'https://6pnry5fzb5.execute-api.eu-west-1.amazonaws.com/dev',
    // origin: 'http://localhost:4000',
  },

  /**
   * Google Analytics (v4)
   * https://developers.google.com/analytics/devguides/collection/ga4
   */
  // gtag: {
  //   trackingID: process.env.GA_MEASUREMENT_ID,
  //   anonymizeIP: true,
  // },
} as const;

export default config;
export type Config = typeof config;
