import {string} from 'zod';
import * as React from 'react';
import {useLoginMutation} from "../store/confession-api";
import LANG from "../lang";
import GenericForm from "./GenericForm";
import {useDispatch, useSelector} from "react-redux";
import {AuthState, setAccessToken, setRefreshToken} from "../store/auth.state";
import {useEffect} from "react";
import {RootState} from "../store/store";
import {useHistory} from "../core";
import {useTranslation} from "react-i18next";

const Login = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <GenericForm
      useMutation={useLoginMutation}
      lang={{
        TITLE: t('login.submission.title'),
        SUCCESS: t('login.submission.success'),
        FAILURE: t('login.submission.failure'),
        SUBMIT: t('login.submission.submit'),
      }}
      fields={[
        {
          type: 'email', name: 'email', label: t('login.submission.email'),
          schema: string().nonempty('Email is required').email('Email is invalid'),
        },
        {
          type: 'password', name: 'password', label: t('login.submission.password'),
          schema: string()
            .nonempty('Password is required')
            .min(8, t('login.submission.password.min').replace('{min}', '8'))
            .max(32, t('login.submission.password.min').replace('{min}', '32'))
        },
      ]}
      buildPayload={(input) => {
        return {
          email: input.email,
          password: input.password,
        }
      }}
      onSuccess={(data) => {
        dispatch(setAccessToken(data.accessToken));
        dispatch(setRefreshToken(data.refreshToken));
        history.push("/");
      }}
    />
  );
};

export default Login;

