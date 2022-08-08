import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box, Button, CardActions, Collapse} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import {useTranslation} from "react-i18next";
import ConfessionReactions from "./Reactions";
import ConfessionComments from "./Comments";
import {useGetCommentsCountQuery} from "../../store/confession-api";
import {useHistory} from "../../core";
import PrettyTime from "../PrettyTime";
import PrettyText from "../PrettyText";
import {useTheme} from "@mui/material/styles";


export default function ConfessionCard(props) {
  const {standalone, confession, sx, style, uniqueId} = props;
  const history = useHistory();
  const theme = useTheme();
  const {id, content, createdAt, reactions} = confession;
  const {data: commentsCount, error, isLoading} = useGetCommentsCountQuery({id});
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

      <CardContent sx={{paddingBottom: 0}} onClick={() => history.push(`/confession/${confession.id}`)}>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {t('published')} <PrettyTime date={createdAt} />
        </Typography>
        <PrettyText text={props.confession.content}/>
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

          <div>
            <Button
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="comments"
            >
              {t('comment.list')} ({commentsCount?.count || 0})
            </Button>
          </div>

          <div>
            <ConfessionReactions confession={props.confession}/>
          </div>

          <div>
            <Button
              aria-label="share"
              startIcon={<ShareIcon />}
              color="secondary"
            >
              {t('share')}
            </Button>
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
