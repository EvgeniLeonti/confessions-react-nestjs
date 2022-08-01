import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ConfessionContent from "./ConfessionContent";
import {
  Box,
  CardActions,
  Collapse,
  Divider,
  IconButton,
  IconButtonProps,
  List,
  ListItem,
  ListItemText,
  TextField
} from "@mui/material";
import {ReactionBarSelector} from "@charkour/react-reactions";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import {styled} from "@mui/material/styles";
import {LoadingButton} from "@mui/lab";
import {useCreateCommentMutation, useGetCommentsQuery} from "../store/confession-api";
import {useTranslation} from "react-i18next";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {object, string, TypeOf} from 'zod';
import {pushNotification} from "../store/toast.state";
import {useDispatch} from "react-redux";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ConfessionComments(props) {
  const { confession } = props;
  const [createCommentMutation, {isLoading: isCreateCommentLoading}] = useCreateCommentMutation();
  const { data, error, isLoading } = useGetCommentsQuery({id: confession.id});
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
    console.log('result', result)
    createCommentMutation({id: confession.id, content: result.content}).then(() => {
      dispatch(pushNotification({message: 'comment sent', options: { variant: 'success' } }))
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
          autoFocus
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
          send
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
                <ListItem>
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

export default function ConfessionCard(props) {
  const {id, content, createdAt} = props.confession;
  const [expanded, setExpanded] = React.useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  return (
    <Card sx={{minWidth: 275}}>
      <CardContent>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {new Date(createdAt).toLocaleString()}
        </Typography>
        <ConfessionContent text={content}/>
      </CardContent>
      <CardActions>
        <Box
          display="flex"
          justifyContent="space-between"
          style={{width: '100%'}}
        >
          <div>
            <ReactionBarSelector style={{backgroundColor: 'unset !important'}} iconSize={24}
                                 onSelect={(reaction) => {
                                   console.log('reaction selected', reaction)
                                 }}
            />

          </div>

          <div>


            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              {/*<ExpandMoreIcon />*/}
              <CommentIcon />
            </ExpandMore>



          </div>
          <div>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon/>
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon/>
            </IconButton>
          </div>

        </Box>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ConfessionComments confession={props.confession}/>
        </CardContent>
      </Collapse>

    </Card>
  );
}
