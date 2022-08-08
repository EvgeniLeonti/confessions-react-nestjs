import {Container, Typography} from "@mui/material";
import * as React from "react";
import InfiniteScroll from "../components/InfiniteScroll";
import {Confession} from "../types/confession";
import {useLazyGetConfessionsQuery} from "../store/confession-api";
import ConfessionCard from "../components/confession/Card";
import {useLocation} from "../core";
import {useTranslation} from "react-i18next";

function Search(): JSX.Element {
  const { t } = useTranslation();
  const location = useLocation();

  const [, query] = location.search.split("q=");
  const ConfessionsInfiniteScroll = InfiniteScroll<Confession>;

  return (
    <Container sx={{ marginTop: (x) => x.spacing(3), marginBottom: (x) => x.spacing(10) }} maxWidth="sm">
      {query && <Typography
        sx={{ marginTop: (theme) => theme.spacing(3), marginBottom: (theme) => theme.spacing(2) }}
        children={`${t('search.results.for')} ${decodeURIComponent(query)}`}
        variant="h3"
      />}

      <ConfessionsInfiniteScroll
        renderItem={(item: Confession) => <><ConfessionCard confession={item} query={query} /><br /></>}
        renderNoResults={() => <Typography children={t('search.no-results')} variant="h4" />}
        useLazyGetQuery={useLazyGetConfessionsQuery}
        limit={5}
        useWindow={true}
        uniqueId={'posts-search-infinite-scroll'}
        key={`posts-search-infinite-scroll-${query}`}
        triggerParams={{query}}
      />
    </Container>
  );
}

export default Search;
export type Search = typeof Search;
