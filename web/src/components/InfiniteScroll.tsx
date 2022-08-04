import React, {useCallback, useState} from 'react';
import * as Scroller from 'react-infinite-scroller';
import Card from "./confession/Card";
import {useLazyGetConfessionsQuery} from "../store/confession-api";
import {useTranslation} from "react-i18next";
import {Confession} from "../types/confession";
import {ConfessionsResult} from "../types/list-result";

const LIMIT = 5;

const InfiniteScroll = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState<Confession[]>([]);
  const [after, setAfter] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [fetching, setFetching] = useState(false);

  const [trigger, result, lastPromiseInfo] =
    useLazyGetConfessionsQuery();

  const fetchItems = useCallback(
    async () => {
      if (fetching) {
        return;
      }


      setFetching(true);

      try {
        // const result = await fetchData(LIMIT, after, null);
        const result = await trigger({
          limit: LIMIT,
          after,
        });

        if (!result.data) {
          return;
        }
        const { items: newItems, pageInfo } = result.data as ConfessionsResult;

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
    [result]
  );


  return (
    <>
      {result?.isError && <div>Error: {result.error.status}</div>}
      {!result?.isError && items && <Scroller
        loadMore={fetchItems}
        hasMore={hasMore}
        loader={<div key="loader" className="loader">{t('loading')}</div>}
      >
        {items.map(item => (
          <>
            <Card key={item.id} confession={item} />
            <br />
          </>
        ))}
      </Scroller>}
    </>

  );
};


export default InfiniteScroll;
