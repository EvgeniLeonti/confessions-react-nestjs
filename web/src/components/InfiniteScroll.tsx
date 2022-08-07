import React, {useCallback, useState} from 'react';
import * as Scroller from 'react-infinite-scroller';
import {useTranslation} from "react-i18next";

function InfiniteScroll<Type>(props: any) {
  const {renderItem, useWindow, useLazyGetQuery, triggerParams, limit, key} = props;

  const { t } = useTranslation();
  const [items, setItems] = useState<Type[]>([]);
  const [after, setAfter] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [fetching, setFetching] = useState(false);

  const [trigger, result, lastPromiseInfo] =
    useLazyGetQuery();

  const fetchItems = useCallback(
    async () => {
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
    [items, fetching]
  );


  return (
    <>
      {result?.isError && <div>Error: {result.error.status}</div>}
      {!result?.isError && items && <Scroller
        loadMore={fetchItems}
        hasMore={hasMore}
        loader={<div key={key} className="loader">{t('loading')}</div>}
        useWindow={useWindow}
      >
        {items.map(item => renderItem(item))}
      </Scroller>}
    </>

  );
}


export default InfiniteScroll;
