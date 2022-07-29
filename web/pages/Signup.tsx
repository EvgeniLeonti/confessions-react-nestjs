import {string} from 'zod';
import * as React from 'react';
import {useSignupMutation} from "../store/api";
import LANG from "../lang";
import GenericForm from "./GenericForm";

const Signup = () => {
  return (
    <GenericForm
      useMutation={useSignupMutation}
      lang={LANG.AUTH.SIGNUP}
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
        {
          type: 'password', name: 'passwordConfirm', label: 'Password confirm',
          schema: string().nonempty('Please confirm your password')
        },
      ]}
      refine={{
        check: (data) => data.password === data.passwordConfirm,
        message: { path: ['passwordConfirm'], message: 'Passwords do not match'},
      }}
      buildPayload={(input) => {
        return {
          email: input.email,
          password: input.password,
        }
      }}
    />
  );
};

export default Signup;

