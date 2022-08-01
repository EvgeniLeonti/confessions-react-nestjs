/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {Box, Container} from "@mui/material";
import BasicCard from "../components/BasicCard";
import {useGetMeQuery} from "../store/confession-api";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

function Profile(): JSX.Element {
  const { data, error, isLoading } = useGetMeQuery();
  const authState = useSelector((state: RootState) => state.auth);

  return (
    <Box>
      <Container sx={{ py: "20vh" }} maxWidth="sm">
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <BasicCard primary={data.email}>
              <Typography variant="subtitle2">
                <strong>role</strong>: {data.role}
              </Typography>
              <Typography variant="subtitle2">
                <strong>created at</strong>: {new Date(data.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="subtitle2">
                <strong>access expiration</strong>: {new Date(authState.user.exp * 1000).toLocaleString()}
              </Typography>
            </BasicCard>

          </>
        ) : null}

      </Container>

      {/*<Fab color="primary" aria-label="add">*/}
      {/*  <AddIcon />*/}
      {/*</Fab>*/}


    </Box>
  );
}

export default Profile;
export type Profile = typeof Profile;
