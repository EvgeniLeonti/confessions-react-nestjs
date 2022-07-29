import {string} from 'zod';
import * as React from 'react';
import {useLoginMutation} from "../store/api";
import LANG from "../lang";
import GenericForm from "./GenericForm";
import {useDispatch, useSelector} from "react-redux";
import {AuthState, setAccessToken, setRefreshToken} from "../store/auth.state";
import {useEffect} from "react";
import {RootState} from "../store/store";
import {useHistory} from "../core";

const Login = () => {
  const history = useHistory();

  const { accessToken } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('store.accessToken', accessToken);
  }, [accessToken]);
  return (
    <GenericForm
      useMutation={useLoginMutation}
      lang={LANG.AUTH.LOGIN}
      fields={[
        {
          type: 'email', name: 'email', label: 'Email',
          schema: string().nonempty('Email is required').email('Email is invalid'),
        },
        {
          type: 'password', name: 'password', label: 'Password',
          schema: string()
            .nonempty('Password is required')
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters')
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

