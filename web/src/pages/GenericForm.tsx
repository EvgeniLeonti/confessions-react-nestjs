import {Box, Container, TextareaAutosize, TextField, Typography,} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {object, TypeOf} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import * as React from 'react';
import {LoadingButton} from '@mui/lab';
import {pushNotification} from "../store/toast.state";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {RootState} from "../store/store";
import {setRecaptchaToken} from "../store/auth.state";


const GenericForm = (props: any) => {
  const authState = useSelector((state: RootState) => state.auth);

  const useMutation = props.useMutation; // e.g. useSignupMutation
  const lang = props.lang; // e.g. LANG.AUTH.SIGNUP = { TITLE: '', SUCCESS: '', FAILURE: '' }
  const fields = props.fields; // e.g. [{type: 'email' name: 'email', label: 'Email'}, {name: 'password', label: 'Password'}]
  const refine = props.refine;
  const buildPayload = props.buildPayload;
  const onSuccess = props.onSuccess;

  // form schema and validations
  let schema = object(fields.reduce((acc, field) => {
    acc[field.name] = field.schema;
    return acc;
  }, {}));

  if (refine) {
    schema = schema.refine(refine.check, refine.message);
  }

  const { executeRecaptcha } = useGoogleReCaptcha();

  // recaptcha start

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha('yourAction');
    // Do whatever you want with the token
    // console.log('do something with the token', token);
    dispatch(setRecaptchaToken(token));
  }, [executeRecaptcha]);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  // useEffect(() => {
  //   handleReCaptchaVerify();
  // }, [handleReCaptchaVerify]);

  // recaptcha start


  type MutationInputType = TypeOf<typeof schema>;

  const [mutation, {isLoading}] = useMutation();

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

    handleReCaptchaVerify();


    mutation(buildPayload(values)).then(result => {
      if (result.error) {
        return;
      }

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
          {fields.map(({type, name, label, multiline, rows, maxRows, textarea}, index) => {
            return (
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
                maxRows={maxRows}
                InputProps={textarea && {
                  inputComponent: TextareaAutosize,
                  inputProps: {
                    minRows: rows,
                  },
                }}
              />
            )
          })}

        <Typography variant="body2" gutterBottom>
          This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank">Terms of Service</a> apply.
        </Typography>

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

