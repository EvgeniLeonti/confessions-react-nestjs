/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {Container, Typography} from "@mui/material";
import * as React from "react";
import AdminConfessionsTable from "../components/AdminConfessionsTable";
import ConfessionsTable from "../components/confession/Table";
import AdvancedTable from "../components/AdvancedTable";


function Admin(): JSX.Element {

  return (
    <Container
      maxWidth="lg"
      sx={{ marginTop: (x) => x.spacing(3), marginBottom: (x) => x.spacing(10) }}
    >
      <Typography
        sx={{ marginBottom: (theme) => theme.spacing(2) }}
        children="Admin"
        variant="h2"
      />

      {/*<AdminConfessionsTable />*/}
      {/*<ConfessionsTable />*/}
      <AdvancedTable />

    </Container>
  );
}

export default Admin;
export type Admin = typeof Admin;
