/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {Container} from "@mui/material";
import {useGetConfessionsQuery} from "../store/confession-api";
import * as React from "react";
import {useTranslation} from 'react-i18next';
import ConfessionCard from "../components/ConfessionCard";

function Home(): JSX.Element {
  const { data, error, isLoading } = useGetConfessionsQuery({limit: 10});
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
