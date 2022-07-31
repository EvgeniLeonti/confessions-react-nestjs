/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {Box, Container} from "@mui/material";
import {useNavigate} from "../core";
import BasicCard from "../components/BasicCard";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useGetConfessionsQuery} from "../store/api";
import Typography from "@mui/material/Typography";
import * as React from "react";
import ConfessionContent from "../components/ConfessionContent";

function Home(): JSX.Element {

  const { data, error, isLoading } = useGetConfessionsQuery();


  return (
    <Container sx={{ marginTop: (x) => x.spacing(3), marginBottom: (x) => x.spacing(10) }} maxWidth="sm">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          {data.items.map(item => <>
            <BasicCard secondary={new Date(item.createdAt).toLocaleString()}>
              <ConfessionContent text={item.content} />
            </BasicCard>
            <br /></>)}

        </>
      ) : null}

    </Container>
  );
}

export default Home;
export type Home = typeof Home;
