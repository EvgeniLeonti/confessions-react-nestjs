import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Divider, List, ListItem, ListItemText, TextareaAutosize, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useCreateCommentMutation, useGetCommentsQuery} from "../../store/confession-api";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {object, string, TypeOf} from 'zod';
import {pushNotification} from "../../store/toast.state";
import {useDispatch} from "react-redux";
import InfiniteScroll from "../InfiniteScroll";
import PrettyTime from "../PrettyTime";
import {useTheme} from "@mui/material/styles";
import PrettyText from "../PrettyText";
import {useCallback, useEffect} from "react";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {setRecaptchaToken} from "../../store/auth.state";

export default function ConfessionComments(props) {
  const { confession, standalone } = props;
  const [createCommentMutation, {isLoading: isCreateCommentLoading, isSuccess: isCreateCommentSuccess}] = useCreateCommentMutation();
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

  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha('submit_comment');
    return token;
  }, [executeRecaptcha]);

  const onSubmitHandler = async (result) => {
    const recaptchaResult = await handleReCaptchaVerify();

    if (recaptchaResult) {
      dispatch(setRecaptchaToken(recaptchaResult));
    }

    createCommentMutation({id: confession.id, content: result.content})
  }


  useEffect(() => {
    // console.log('isSubmitSuccessful', isSubmitSuccessful)
    if (isCreateCommentSuccess) {
      dispatch(pushNotification({message: t('comment.submission.success'), options: { variant: 'success' } }))
      reset()
    }
  }, [isCreateCommentSuccess])




  // const CommentsInfiniteScroll = InfiniteScroll<any>;


  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitHandler)}
        style={{width: '100%', marginBottom: theme.spacing(1)}}
      >
        <TextField
          // autoFocus
          // multiline
          label={t('comment.submission.placeholder')}
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
          InputProps={{
            inputComponent: TextareaAutosize,
          }}
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
        maxHeight: standalone ? 500 : 300,
        // overflow: "hidden",
        overflowY: "scroll",
        padding: 0,
      }}>
        {/*<CommentsInfiniteScroll*/}
        {/*  renderItem={(comment) =>*/}
        {/*    <>*/}
        {/*      <ListItem>*/}
        {/*        <ListItemText*/}
        {/*          primary={comment.content}*/}
        {/*          secondary={*/}
        {/*            <>*/}
        {/*              <Typography*/}
        {/*                sx={{ display: 'inline' }}*/}
        {/*                component="span"*/}
        {/*                variant="body2"*/}
        {/*                color="text.primary"*/}
        {/*              >*/}
        {/*                {t('anonymous')}*/}
        {/*              </Typography>*/}
        {/*              {` ${t('at')} ${new Date(comment.createdAt).toLocaleString()}`}*/}
        {/*            </>*/}
        {/*          }*/}
        {/*        />*/}
        {/*      </ListItem>*/}
        {/*      <Divider component="li" />*/}
        {/*    </>*/}
        {/*}*/}
        {/*  useLazyGetQuery={useLazyGetCommentsQuery}*/}
        {/*  triggerParams={ {id: confession.id} }*/}
        {/*  limit={5}*/}
        {/*  useWindow={false}*/}
        {/*  key={`confession-${confession.id}-comments-infinite-scroll`}*/}
        {/*/>*/}



        {error ? (
          <><div>Oh no, there was an error: {JSON.stringify(error)}</div></>
        ) : Array.isArray(data?.items) ? (
          <>
            {data.items.length === 0 && <div style={{marginBottom: theme.spacing(1)}}>{t('no-comments-yet')}</div>}
            {data.items.length > 0 && data.items.map((comment, index) => <div key={`comment-${comment.id}-${index}`}>
                <ListItem style={{padding: theme.spacing(1)}}>
                  <ListItemText
                    primary={<PrettyText text={comment.content} variant="body2" />}
                    secondary={
                      <>
                        {' - '}
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                          color="text.primary"
                        >
                          {t('anonymous')}
                        </Typography>
                        {' '}
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <PrettyTime date={comment.createdAt} />
                        </Typography>

                      </>
                    }
                  />
                </ListItem>
                { index === data.items.length - 1  ? null : <Divider component="li" />}
              </div>)}

          </>
        ) : null}

      </List>

    </>
  )
}
