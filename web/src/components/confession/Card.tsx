import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ConfessionContent from "./Content";
import {Box, Button, CardActions, Collapse, IconButtonProps} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import {useTranslation} from "react-i18next";
import ConfessionReactions from "./Reactions";
import ConfessionComments from "./Comments";
import {useGetCommentsCountQuery} from "../../store/confession-api";
import {useHistory} from "../../core";


export default function ConfessionCard(props) {
  const {standalone, confession, sx} = props;
  const history = useHistory();
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
      key={`confession-card-${id}-${commentsCount}`}
    >
      <CardContent sx={{paddingBottom: 0}} onClick={() => history.push(`/confession/${confession.id}`)}>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {new Date(createdAt).toLocaleString()}
        </Typography>
        <ConfessionContent confession={props.confession}/>
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
            <ConfessionReactions confession={props.confession}/>
          </div>
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
        <CardContent>
          <ConfessionComments confession={props.confession} standalone={standalone}/>
        </CardContent>
      </Collapse>

    </Card>
  );
}
