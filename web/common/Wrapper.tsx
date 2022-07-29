/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useSnackbar} from "notistack";
import {useEffect} from "react";
import {clearNotifications} from "../store/toast.state";

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


  return (
    <>
      {props.children}
    </>
  );
}

