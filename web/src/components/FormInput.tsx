import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type IFormInputProps = {
  name: string;
} & TextFieldProps;

const FormInput: FC<iforminputprops> = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <controller control={control} name={name} defaultvalue="" render={({ field })=> (
      <TextField
        {...otherProps}
        {...field}
        error={!!errors[name]}
        helperText={errors[name] ? errors[name].message : ''}
      />
    )}
    />
  );
};

export default FormInput;
