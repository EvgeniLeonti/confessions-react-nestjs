import {useLocation} from "../core";
import {useTranslation} from "react-i18next";
import {useGetConfessionQuery, useLazyGetConfessionsQuery} from "../store/confession-api";
import ConfessionCard from "../components/confession/Card";
import * as React from "react";
import {Container, Typography} from "@mui/material";
import InfiniteScroll from "../components/InfiniteScroll";
import {useTheme} from "@mui/material/styles";

const Confession = () => {
  const theme = useTheme();
  const location = useLocation();
  const [, , id] = location.pathname.split('/');
  const { data, error, isLoading } = useGetConfessionQuery({id});
  const { t } = useTranslation();
  const ConfessionsInfiniteScroll = InfiniteScroll<Confession>;

  return (
    <Container sx={{ marginTop: (x) => x.spacing(3), marginBottom: (x) => x.spacing(10) }} maxWidth="sm">
      {data && <ConfessionCard sx={{ marginBottom: (x) => x.spacing(3) }} confession={data} standalone />}

      <Typography
        sx={{ marginTop: (theme) => theme.spacing(3), marginBottom: (theme) => theme.spacing(2) }}
        children={t('confession.more')}
        variant="h3"
      />

      <ConfessionsInfiniteScroll
        renderItem={(item) => <><ConfessionCard confession={item} /><br /></>}
        useLazyGetQuery={useLazyGetConfessionsQuery}
        limit={5}
        useWindow={true}
        key={`posts-infinite-scroll-confession-${id}-context`}
        triggerParams={{exclude: [id]}}
      />

    </Container>
  );
};

export default Confession;
export type Confession = typeof Confession;


