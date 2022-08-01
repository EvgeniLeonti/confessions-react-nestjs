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
  const [comment, setComment] = React.useState<string>('');

  const postComment = () => {
    createCommentMutation({id: confession.id, content: comment}).then(() => {
      setComment('');
    });
  }


    return (
      <>

        <Box
          display="flex"
          justifyContent="space-between"
          style={{width: '100%'}}
        >
          <TextField
            autoFocus
            label="Write a comment"
            fullWidth
            required
            type="text"
            size='small'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{
              '& fieldset': {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            }}
          />
          <LoadingButton
            variant='contained'
            type='submit'
            size='small'
            disabled={!comment}
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              textTransform: "lowercase",
            }}
            onClick={postComment}
            loading={isCreateCommentLoading}
          >
            send
          </LoadingButton>
        </Box>

        <List sx={{ width: '100%' }}>
          {error ? (
            <><div>Oh no, there was an error: {JSON.stringify(error)}</div></>
          ) : isLoading ? (
            <>{t('loading')}</>
          ) : data ? (
            <>
              {(data.items || []).map(comment =>
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
                          {" at 07/02/2023"}
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
