import React, {useState} from "react";
import useVirtual from "react-cool-virtual";
import {useTheme} from "@mui/material/styles";
import {Container, Stack} from "@mui/material";
import {Skeleton} from "@mui/lab";


function InfiniteScroll2<Type>(props: any) {
  const {renderItem, useWindow, useLazyGetQuery, triggerParams, limit, uniqueId, renderNoResults, height} = props;
  const [comments, setComments] = useState([]);
  const [loadIndexMap, setLoadIndexMap] = useState<any>({});
  const { outerRef, innerRef, items } = useVirtual({
    itemCount: 44, // todo
    // Estimated item size (with padding)
    itemSize: 10,
    // The number of items that you want to load/or pre-load, it will trigger the `loadMore` callback
    // when the user scrolls within every items, e.g. 1 - 5, 6 - 10, and so on (default = 15)
    loadMoreCount: limit,
    // Provide the loaded state of a batch items to the callback for telling the hook
    // whether the `loadMore` should be triggered or not
    isItemLoaded: (loadIndex) => isItemLoaded(loadIndex),
    // We can fetch the data through the callback, it's invoked when more items need to be loaded
    loadMore: (e) => loadData(e)
  });
  const [trigger, result, lastPromiseInfo] = useLazyGetQuery();

  const theme = useTheme();
  const [loadingMap, setLoadingMap] = useState<any>({});

  const isItemLoaded = (loadIndex) => {
    // return loadIndexMap[loadIndex];
    //
    // const isLoaded = !!loadIndexMap[loadIndex.toString()];
    const isLoaded = loadingMap[loadIndex];
    console.log('isItemLoaded', 'loadIndex', loadIndex, 'isLoaded', isLoaded)
    return isLoaded
  };

  const loadData = async ({ loadIndex }) => {
    console.log('loadData', loadIndex);
    console.log('loadIndexMap', loadIndexMap);

    // const currentIndexState = Object.values(loadIndexMap).find(i => i === loadIndex);
    // console.log('currentIndexState', currentIndexState);

    // if (!!currentIndexState?.after && currentIndexState.after === loadIndexMap[loadIndex]?.endCursor) {
    //   console.log('kaki')
    // }



    // if (loadIndexMap[loadIndex]?.startCursor || loadIndexMap[loadIndex]?.endCursor) {
    //   console.log('stop 1', loadIndexMap);
    //
    //   return;
    // }

    let after;

    if (loadIndexMap[loadIndex - 1]) {
      after = loadIndexMap[loadIndex - 1].endCursor;
    }



    // if (loadIndex > 0) {
    //   if (!loadIndexMap[loadIndex - 1]) {
    //     console.log('recurse')
    //     setTimeout(() => loadData({ loadIndex }), 1000);
    //     return;
    //   }
    // }



    console.log('trigger', 'after', after);
    setLoadingMap(initiatedMap => ({...initiatedMap, [loadIndex]: true}));


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

      setComments((prev) => {
        const newComments = [...prev, ...newItems];
        newComments.sort((c1, c2) => c1.id > c2.id ? -1 : 1);
        // const duplicates = newComments.reduce((prev, curr) => {
        //   if (newComments.filter((item) => item.id === curr.id).length > 1) {
        //     prev.push(curr);
        //     // debugger
        //   }
        //   return prev;
        // }, []);
        // console.log('duplicates', duplicates)
        return newComments;
      });




      setLoadIndexMap(prev => ({...prev, [loadIndex.toString()]: {loadIndex, startCursor: pageInfo.startCursor, endCursor: pageInfo.endCursor}}));

      // if (pageInfo.hasNextPage) {
      //   // setAfter(pageInfo.endCursor);
      //   setHasMore(true);
      // } else {
      //   // setAfter(null);
      //   setHasMore(false);
      //
      // }



      // // Simulating a slow network
      // await sleep(2000);
      //
      // const { data: comments } = await axios(
      //   `https://jsonplaceholder.typicode.com/comments?postId=${loadIndex + 1}`
      // );
      //
      // setComments((prevComments) => {
      //   return [...prevComments, ...comments];
      // });
    } catch (err) {
      // If there's an error set the state back to `false`

      setLoadIndexMap(prev => ({...prev, [loadIndex]: null}));
      setLoadingMap(initiatedMap => ({...initiatedMap, [loadIndex]: false}));


      // Then try again
      loadData({ loadIndex });
    }

  };

  return (
    <div
      className="outer"
      style={{
        // backgroundColor: 'red',
        width: '100%',
        // height: "100%",
        height: '100vh',
        overflow: "auto",
        padding: 0,
        margin: 0,
        position: 'fixed',
        padding: theme.spacing(10, 0, 10, 0),
        top: 0,
        left: 0,

    }}
      ref={outerRef}
    >
      <Container
        // style={{backgroundColor: 'red'}}
        // style={{position: ''}}

        sx={{ marginTop: (x) => x.spacing(3), marginBottom: (x) => x.spacing(10) }} maxWidth="sm">

        <div ref={innerRef}>
          {items.map(({ index, measureRef }) => (
            <div
              key={comments[index]?.id || `fb-${index}`}
              style={{ minHeight: "40px" }}
              ref={measureRef} // Used to measure the unknown item size
            >
              {comments[index]
                ? renderItem(comments[index])
                : <Stack spacing={1}>
                    <Skeleton variant="text" />
                    {/*<Skeleton variant="circular" width={40} height={40} />*/}
                    <Skeleton variant="rectangular" height={118} />
                    {/*<Skeleton variant="text" />*/}
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                  <br />
                  <br />
                  <br />
                  <br />
                </Stack>}
            </div>
          ))}
        </div>
      </Container>


    </div>
  );
}

export default InfiniteScroll2;
