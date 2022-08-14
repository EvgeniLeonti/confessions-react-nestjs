import React, {useCallback, useState} from 'react';
import * as Scroller from 'react-infinite-scroller';
import {useTranslation} from "react-i18next";
import {Stack} from "@mui/material";
import {Skeleton} from "@mui/lab";

function InfiniteScroll<Type>(props: any) {
  const {renderItem, useWindow, useLazyGetQuery, triggerParams, limit, uniqueId, renderNoResults} = props;

  const { t } = useTranslation();
  const [items, setItems] = useState<Type[]>([]);
  const [after, setAfter] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [fetching, setFetching] = useState(false);

  const [trigger, result, lastPromiseInfo] =
    useLazyGetQuery();

  const fetchItems = useCallback(
    async () => {
      // console.log('fetching', fetching)
      // console.log('result', result)

      if (fetching) {
        return;
      }

      setFetching(true);

      try {
        // const result = await fetchData(LIMIT, after, null);
        const result = await trigger({
          ...triggerParams,
          limit,
          after,
        });
        if (!result.data) {
          return;
        }
        const { items: newItems, pageInfo } = result.data;


        setItems([...items, ...newItems]);

        if (pageInfo.hasNextPage) {
          setAfter(pageInfo.endCursor);
          setHasMore(true);
        } else {
          setAfter(null);
          setHasMore(false);

        }
      } finally {
        setFetching(false);
      }
    },
    [items, fetching, after],
  );


  return (
    <>
      {/*{fetching && <div>{t('loading')}</div>}*/}

      {/*{result?.isError && <div>Error: {result.error.status}</div>}*/}
      {result?.status === "fulfilled" && items && items.length === 0 && renderNoResults && renderNoResults()}
      {!result?.isError && items && <Scroller
        loadMore={fetchItems}
        hasMore={hasMore}
        loader={    <Stack spacing={1}>
          <Skeleton variant="text" />
          {/*<Skeleton variant="circular" width={40} height={40} />*/}
          <Skeleton variant="rectangular" height={118} />
          {/*<Skeleton variant="text" />*/}
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Stack>}
        useWindow={useWindow}
      >
        {items.map(item => <div key={`${uniqueId}-${item.id}-${item.createdAt}`}>{renderItem(item)}</div>)}
      </Scroller>}
    </>

  );
}


export default InfiniteScroll;
