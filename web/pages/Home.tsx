/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {Box, Container, IconButton} from "@mui/material";
import {useNavigate} from "../core";
import BasicCard from "../components/BasicCard";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useGetConfessionsQuery} from "../store/api";
import Typography from "@mui/material/Typography";
import * as React from "react";
import ConfessionContent from "../components/ConfessionContent";
import { useTranslation } from 'react-i18next';
import {
  FacebookSelector,
  FacebookCounter,
  ReactionBarSelector,
  ReactionCounter,
  GithubCounter
} from "@charkour/react-reactions";

import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ConfessionCard from "../components/ConfessionCard";

function Home(): JSX.Element {
  const { data, error, isLoading } = useGetConfessionsQuery();
  const { t } = useTranslation();


  return (
    <Container sx={{ marginTop: (x) => x.spacing(3), marginBottom: (x) => x.spacing(10) }} maxWidth="sm">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>{t('loading')}</>
      ) : data ? (
        <>
          {data.items.map(confession => <>
            <ConfessionCard confession={confession} />
            <br /></>)}

        </>
      ) : null}

    </Container>
  );
}

export default Home;
export type Home = typeof Home;
