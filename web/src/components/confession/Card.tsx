import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Badge, Box, Button, CardActions, Collapse, IconButton} from "@mui/material";
import {useTranslation} from "react-i18next";
import ConfessionReactions from "./Reactions";
import ConfessionComments from "./Comments";
import {useGetCommentsCountQuery} from "../../store/confession-api";
import {useHistory} from "../../core";
import PrettyTime from "../PrettyTime";
import PrettyText from "../PrettyText";
import {useTheme} from "@mui/material/styles";
import LinkIcon from '@mui/icons-material/Link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {Confession} from "../../types/confession";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
interface Props {
  confession: Confession;
  standalone: boolean;
  sx?: any;
  style?: any;
  uniqueId?: string;
  query?: string;
}

export default function ConfessionCard(props: Props): JSX.Element {
  const {standalone, confession, sx, style, uniqueId, query} = props;
  const history = useHistory();
  const theme = useTheme();
  const {id, createdAt} = confession;
  const {data: commentsCount} = useGetCommentsCountQuery({id});
  const [expanded, setExpanded] = React.useState(standalone);

  const {t} = useTranslation();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // console.log('ConfessionCard key', `confession-card-${id}-${commentsCount}`);
  return (
    <Card
      sx={{...sx, minWidth: 275}}
      style={style}
      key={`${uniqueId}-${commentsCount}`}
    >

      <CardContent sx={{padding: theme.spacing(2, 2, 0, 2)}}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{width: '100%'}}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <AccessTimeIcon/>
            <Typography style={{padding: theme.spacing(0, 1, 0, 1)}} variant="body2" color="text.secondary">
              {' '} <PrettyTime date={createdAt} />
            </Typography>
          </Box>


          <IconButton aria-label="link" onClick={() => history.push(`/confession/${confession.id}`)}>
            <LinkIcon  />
          </IconButton>

        </Box>
      </CardContent>
      <CardContent sx={{paddingBottom: 0}}>
        <PrettyText text={props.confession.content} query={query}/>
      </CardContent>
      {/*<CardContent sx={{padding: 0}}>*/}
      {/*  <ConfessionReactions confession={props.confession} sx={{marginBottom: '15px'}}/>*/}
      {/*</CardContent>*/}
      <CardActions>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{width: '100%'}}
        >

          {/*reactions*/}
          <div>
            <ConfessionReactions confession={props.confession}/>
          </div>

          {/*comments*/}
          <div style={{height: 'auto'}}>
            <Badge badgeContent={commentsCount?.count || 0} color="primary">
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="comments"
              >

                <CommentIcon/>
              </IconButton>
            </Badge>
          </div>

          {/*share*/}
          <div>
            <Badge badgeContent={commentsCount?.count || 0} color="primary">
              <IconButton
                aria-label="share"
                color="secondary"
              >

                <ShareIcon />
              </IconButton>
            </Badge>
          </div>



        </Box>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{paddingBottom: theme.spacing(1)}}>
          <ConfessionComments confession={props.confession} standalone={standalone}/>
        </CardContent>
      </Collapse>

    </Card>
  );
}
