import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Divider, List, ListItem, ListItemText, TextField} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {LoadingButton} from "@mui/lab";
import {useCreateCommentMutation, useGetCommentsQuery} from "../../store/confession-api";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {object, string, TypeOf} from 'zod';
import {pushNotification} from "../../store/toast.state";
import {useDispatch} from "react-redux";

export default function ConfessionComments(props) {
  const { confession } = props;
  const [createCommentMutation, {isLoading: isCreateCommentLoading}] = useCreateCommentMutation();
  const { data, error, isLoading } = useGetCommentsQuery({id: confession.id});
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const schema = object({
    content: string()
      .nonempty(t('confession.submission.content.required'))
  });
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<TypeOf<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = (result) => {
    createCommentMutation({id: confession.id, content: result.content}).then(() => {
      dispatch(pushNotification({message: t('comment.submission.success'), options: { variant: 'success' } }))
      reset()
    });
  }


  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitHandler)}
        style={{width: '100%'}}
      >
        <TextField
          // autoFocus
          // multiline
          label="Write a comment"
          fullWidth
          required
          type="text"
          size='small'
          sx={{
            '& fieldset': {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          }}
          // error={!!errors.content} // todo fix
          // helperText={errors.content ? error.content.message : ''} // todo fix
          {...register('content')}
        />
        <LoadingButton
          variant='contained'
          type='submit'
          size='small'
          sx={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            textTransform: "lowercase",
          }}
          loading={isCreateCommentLoading}
        >
          {t('comment.submission.submit')}
        </LoadingButton>
      </Box>

      {/* comments list */}
      <List sx={{
        width: '100%',
        maxHeight: 300,
        overflow: "hidden",
        overflowY: "scroll",
      }}>
        {error ? (
          <><div>Oh no, there was an error: {JSON.stringify(error)}</div></>
        ) : isLoading ? (
          <>{t('loading')}</>
        ) : data?.items ? (
          <>
            {data.items.map(comment =>
              <>
                <ListItem sx={{
                  // padding: 0,
                }}>
                  <ListItemText
                    primary={comment.content}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Anonymous
                        </Typography>
                        {` at ${new Date(comment.createdAt).toLocaleString()}`}
                      </>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </>
            )}

          </>
        ) : null}

      </List>

    </>
  )
}
