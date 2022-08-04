/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {Container} from "@mui/material";
import * as React from "react";
import {useTranslation} from 'react-i18next';
import InfiniteScroll from "../components/InfiniteScroll";

function Home(): JSX.Element {
  const { t } = useTranslation();


  return (
    <Container sx={{ marginTop: (x) => x.spacing(3), marginBottom: (x) => x.spacing(10) }} maxWidth="sm">
      <InfiniteScroll />
    </Container>
  );
}

export default Home;
export type Home = typeof Home;
