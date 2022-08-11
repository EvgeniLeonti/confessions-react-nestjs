import * as React from "react";
import {Confession} from "../types/confession";
import {useLazyGetConfessionsQuery} from "../store/confession-api";
import ConfessionCard from "../components/confession/Card";
import InfiniteScroll2 from "../components/InfiniteScroll2";
import InfiniteScroll3 from "../components/InfiniteScroll3";
import {Container} from "@mui/material";

function Home(): JSX.Element {
  const ConfessionsInfiniteScroll = InfiniteScroll2<Confession>;



  return (
      <InfiniteScroll2
        renderItem={(item: Confession) => <><ConfessionCard confession={item} /><br /></>}
        useLazyGetQuery={useLazyGetConfessionsQuery}
        limit={10}
        useWindow={true}
        uniqueId={'posts-infinite-scroll'}
      />

  );
}

export default Home;
export type Home = typeof Home;
