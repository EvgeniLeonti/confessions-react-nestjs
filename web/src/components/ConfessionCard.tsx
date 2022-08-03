import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ConfessionContent from "./ConfessionContent";
import {
  Badge,
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
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import {styled, useTheme} from "@mui/material/styles";
import {LoadingButton} from "@mui/lab";
import {
  useCreateCommentMutation, useCreateReactionMutation, useDeleteReactionMutation,
  useGetCommentsQuery,
  useGetConfessionsQuery,
  useGetReactionsSummaryQuery
} from "../store/confession-api";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {object, string, TypeOf} from 'zod';
import {pushNotification} from "../store/toast.state";
import {useDispatch} from "react-redux";
import ReactionsCTA from "./ReactionsCTA";
import {useEffect, useState} from "react";

const ALL_REACTIONS = [
  {name: 'like', emoji: '👍'},
  {name: 'dislike', emoji: '👎'},
  {name: 'laugh', emoji: '😂'},
  {name: 'love', emoji: '❤️'},
  {name: 'sad', emoji: '😢'},
  {name: 'angry', emoji: '😠'},
  {name: 'surprise', emoji: '😮'},
];

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

function ConfessionReactions(props) {
  const {id, content, createdAt, reactions} = props.confession;

  const [createReactionMutation, {isLoading: isCreateReactionLoading}] = useCreateReactionMutation();
  const [deleteReactionMutation, {isLoading: isDeleteReactionLoading}] = useDeleteReactionMutation();
  const { data, error, isLoading } = useGetReactionsSummaryQuery({id});
  const theme = useTheme();
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [summary, setSummary] = useState(null);


  useEffect(() => {
    setSummary(data);
  }, [data]);

  useEffect(() => {
    if (!selectedReaction) {
      setSelectedReaction(summary?.myReaction?.name);
    }
  }, [summary])

  const onReactionClickHandler = (name) => {
      const currentMyReaction = summary?.myReaction?.name;
      setSelectedReaction(name);



      console.log('summary', summary)
      console.log('currentMyReaction', currentMyReaction)
      console.log('summary.count[currentMyReaction]', summary.count)
      setSummary({
        ...summary,
        count: {
          ...summary.count,
          [name]: {
            ...summary.count[name],
            count: summary.count[name].count + 1,
          },
          ...currentMyReaction && summary.count[currentMyReaction] &&{
            [currentMyReaction]: {
              ...summary.count[currentMyReaction],
              count: summary.count[currentMyReaction].count - 1,
            }
          },
        },
        myReaction: currentMyReaction === name ? null : {name},
      });

      // console.log('currentMyReaction', currentMyReaction)
      // console.log('name', name)
      if (currentMyReaction === name) {
        deleteReactionMutation({id, name})
      }
      else {
        createReactionMutation({id, name})
      }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {summary?.count && Object.values(summary?.count).map(({name, emoji, count}) => {
        return (<Badge key={`${id}-${name}-reaction-count`} badgeContent={count} color="primary" sx={{
          '& .MuiBadge-badge': {
            right: '50%',
            top: selectedReaction === name ? 15 : 10,
            border: `2px solid ${theme.palette.background.paper}`,
            // padding: '0 4px',
          },
        }}>
          <Typography
            sx={{
              cursor: 'pointer',
              padding: '1rem',
              fontSize: selectedReaction === name ? '36px' : '24px',
              // transform: activeReaction === name ? 'scale(1.2)' : 'scale(1)',
              transition: theme.transitions.create(['background-color', 'transform'], {
                duration: theme.transitions.duration.standard,
              }),
              '&:hover': {
                transform: 'scale(1.5)',
                // fontSize: '36px'
              },
              // '&:active': {
              //   transform: 'scale(2)',
              //   // fontSize: '36px'
              // },
            }}

                      onClick={() => onReactionClickHandler(name)}
                      // onMouseEnter={() => setHoveringReaction(name)}
                      // onMouseLeave={() => setHoveringReaction(null)}
          >
            {emoji}
          </Typography>
        </Badge>)
      })}
    </Box>

  )
}
export default function ConfessionCard(props) {
  const {id, content, createdAt, reactions} = props.confession;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{minWidth: 275}}>
      <CardContent sx={{paddingBottom: 0}}>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {new Date(createdAt).toLocaleString()}
        </Typography>
        <ConfessionContent text={content}/>
      </CardContent>
      {/*<CardContent>*/}
      {/*  <ConfessionReactions confession={props.confession}/>*/}
      {/*</CardContent>*/}
      <CardActions>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{width: '100%'}}
        >
          {/*<ReactionsCTA confession={props.confession}/>*/}
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

          <ConfessionReactions confession={props.confession}/>
          <div>
            {/*<IconButton aria-label="add to favorites">*/}
            {/*  <FavoriteIcon/>*/}
            {/*</IconButton>*/}
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
