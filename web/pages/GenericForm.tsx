import {Alert, Box, Container, TextField, Typography,} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {object, string, TypeOf} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import * as React from 'react';
import {useState} from 'react';
import {LoadingButton} from '@mui/lab';
import {useSignupMutation} from "../store/api";
import LANG from "../lang";
import {useSnackbar} from "notistack";
import {pushNotification} from "../store/toast.state";
import {useDispatch} from "react-redux";

// const registerSchema = object({
//   // name: string()
//   //   .nonempty('Name is required')
//   //   .max(32, 'Name must be less than 100 characters'),
//   email: string().nonempty('Email is required').email('Email is invalid'),
//   password: string()
//     .nonempty('Password is required')
//     .min(8, 'Password must be more than 8 characters')
//     .max(32, 'Password must be less than 32 characters'),
//   passwordConfirm: string().nonempty('Please confirm your password'),
//   // terms: literal(true, {
//   //   invalid_type_error: 'Accept Terms is required',
//   // }),
// }).refine((data) => data.password === data.passwordConfirm, {
//   path: ['passwordConfirm'],
//   message: 'Passwords do not match',
// });
//
// type RegisterInput = TypeOf<typeof registerSchema>;


const GenericForm = (props: any) => {
  const useMutation = props.useMutation; // e.g. useSignupMutation
  const lang = props.lang; // e.g. LANG.AUTH.SIGNUP = { TITLE: '', SUCCESS: '', FAILURE: '' }
  const fields = props.fields; // e.g. [{type: 'email' name: 'email', label: 'Email'}, {name: 'password', label: 'Password'}]
  const refine = props.refine;
  const buildPayload = props.buildPayload;
  const onSuccess = props.onSuccess;

  let schema = object(fields.reduce((acc, field) => {
    acc[field.name] = field.schema;
    return acc;
  }, {}));

  if (refine) {
    schema = schema.refine(refine.check, refine.message);
  }


  type MutationInputType = TypeOf<typeof schema>;

  const [mutation, {isLoading}] = useMutation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<MutationInputType>({
    resolver: zodResolver(schema),
  });


  const onSubmitHandler: SubmitHandler<MutationInputType> = (values) => {
    mutation(buildPayload(values)).then(result => {
      if (result.error) {
        // enqueueSnackbar(result?.error?.data?.message || lang.FAILURE, { variant: 'error' });
        // setAlert({severity: 'warning', message: result?.error?.data?.message || lang.FAILURE});
        return;
      }

      setSuccess(true);
      // enqueueSnackbar(lang.SUCCESS, { variant: 'success' });
      // setAlert({severity: 'success', message: lang.SUCCESS});

      dispatch(pushNotification({message: lang.SUCCESS, options: { variant: 'success' } }))

      if (onSuccess) {
        onSuccess(result.data);
      }
    })
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ marginTop: (x) => x.spacing(3), marginBottom: (x) => x.spacing(3) }}
    >
      <Typography
        sx={{ marginBottom: (theme) => theme.spacing(2) }}
        children={lang.TITLE}
        variant="h2"
      />
      <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
          {fields.map(({type, name, label, multiline, rows}, index) => (
            <TextField
              key={`field-${name}-${index}`}
              sx={{ mb: 3 }}
              label={label}
              fullWidth
              required
              type={type}
              error={!!errors[name]}
              helperText={errors[name] ? errors[name].message : ''}
              {...register(name)}
              multiline={multiline}
              rows={rows}
            />
          ))}

          <LoadingButton
            variant='contained'
            fullWidth
            type='submit'
            loading={isLoading}
            sx={{ py: '0.8rem', mt: '1rem' }}
          >
            {lang.SUBMIT}
          </LoadingButton>
      </Box>
    </Container>

  );
};

export default GenericForm;
export type GenericForm = typeof GenericForm;

