import {useLocation} from "../core";
import {useTranslation} from "react-i18next";
import {useGetConfessionQuery, useLazyGetConfessionsQuery} from "../store/confession-api";
import ConfessionCard from "../components/confession/Card";
import * as React from "react";
import {Container, Typography} from "@mui/material";
import InfiniteScroll from "../components/InfiniteScroll";
import {useTheme} from "@mui/material/styles";
import {useEffect} from "react";
import i18n from "../i18n/i18n";

const Confession = () => {
  const theme = useTheme();
  const location = useLocation();
  const [, , id] = location.pathname.split('/');
  const { data, error, isLoading } = useGetConfessionQuery({id});
  const { t } = useTranslation();
  const ConfessionsInfiniteScroll = InfiniteScroll<Confession>;

  useEffect(() => {
    // todo think about better solution
    // console.log('data', data);
    if (!data) {
      return
    }
    if (data.language && data.language !== i18n.language) {
      console.log('changine language from', i18n.language, 'to', data.language);
      const lng = data.language;
      const prevLng = i18n.language;
      i18n.changeLanguage(lng).then(() => {
        if (prevLng !== lng) {
          history.go(0); // todo invalidate get posts cache
        }
      });
      document.body.dir = i18n.dir() || 'ltr';
      theme.direction = i18n.dir() || 'ltr';
    }
  }, [data])
  return (
    <Container sx={{ marginTop: (x) => x.spacing(3), marginBottom: (x) => x.spacing(10) }} maxWidth="sm">
      {data && <ConfessionCard sx={{ marginBottom: (x) => x.spacing(3) }} confession={data} standalone />}

      {data && <Typography
        sx={{ marginTop: (theme) => theme.spacing(3), marginBottom: (theme) => theme.spacing(2) }}
        children={t('confession.more')}
        variant="h3"
        />}

      <ConfessionsInfiniteScroll
        renderItem={(item) => <><ConfessionCard confession={item} /><br /></>}
        useLazyGetQuery={useLazyGetConfessionsQuery}
        limit={5}
        useWindow={true}
        uniqueId={`posts-infinite-scroll-confession-${id}-context`}
        triggerParams={{exclude: [id]}}
      />

    </Container>
  );
};

export default Confession;
export type Confession = typeof Confession;


