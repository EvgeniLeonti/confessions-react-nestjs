import {Stack} from "@mui/material";
import {Skeleton} from "@mui/lab";
import React from "react";

export default function ConfessionLoading (props: any) {
  return <>
    <Stack spacing={1}>
      <Skeleton variant="text" />
      {/*<Skeleton variant="circular" width={40} height={40} />*/}
      <Skeleton variant="rectangular" height={118} />
      {/*<Skeleton variant="text" />*/}
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Stack>
  </>

}
