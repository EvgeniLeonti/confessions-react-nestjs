/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import * as React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useSnackbar} from "notistack";
import {clearNotifications} from "../store/toast.state";
import {ClientJS} from 'clientjs'
import {setClientJs} from "../store/app.state";

export function Wrapper(props: { children: any }): JSX.Element {
  const {notifications} = useSelector((state: RootState) => state.toast);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();


  useEffect(() => {
    if (notifications.length === 0) {
      return;
    }


    notifications.forEach(notification => {
      enqueueSnackbar(notification.message, notification.options);
    })

    dispatch(clearNotifications());


    // enqueueSnackbar(result?.error?.data?.message || lang.FAILURE, { variant: 'error' });


  }, [notifications])

  useEffect(() => {
    (async () => {
      const client = new ClientJS();
      const fingerprint = client.getFingerprint().toString();
      // console.log('client getBrowserData', client.getBrowserData());
      dispatch(setClientJs({fingerprint}));

    })().catch((error) => {
      console.log('error', error)
    })
  })

  return (
    <>
      {props.children}
    </>
  );
}

