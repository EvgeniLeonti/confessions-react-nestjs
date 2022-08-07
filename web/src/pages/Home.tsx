/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {Container} from "@mui/material";
import * as React from "react";
import InfiniteScroll from "../components/InfiniteScroll";
import {Confession} from "../types/confession";
import {useLazyGetConfessionsQuery} from "../store/confession-api";
import ConfessionCard from "../components/confession/Card";

function Home(): JSX.Element {
  const ConfessionsInfiniteScroll = InfiniteScroll<Confession>;

  return (
    <Container sx={{ marginTop: (x) => x.spacing(3), marginBottom: (x) => x.spacing(10) }} maxWidth="sm">
      <ConfessionsInfiniteScroll
        renderItem={(item) => <><ConfessionCard confession={item} /><br /></>}
        useLazyGetQuery={useLazyGetConfessionsQuery}
        limit={5}
        useWindow={true}
        key={'posts-infinite-scroll'}
      />
    </Container>
  );
}

export default Home;
export type Home = typeof Home;
