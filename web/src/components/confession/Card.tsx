import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ConfessionContent from "./Content";
import {Box, Button, CardActions, Collapse, IconButtonProps} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import {styled, useTheme} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import ConfessionReactions from "./Reactions";
import ConfessionComments from "./Comments";
import {useGetCommentsCountQuery} from "../../store/confession-api";
import {useHistory} from "../../core";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <Button {...other} startIcon={<CommentIcon />} />;
})(({ theme, expand }) => ({
  // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  // marginLeft: 'auto',
  // transition: theme.transitions.create('transform', {
  //   duration: theme.transitions.duration.shortest,
  // }),
}));

export default function ConfessionCard(props) {
  const {standalone, confession, sx} = props;
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
      key={`confession-card-${id}-${commentsCount}`}
    >
      <CardContent sx={{paddingBottom: 0}} onClick={() => history.push(`/confession/${confession.id}`)}>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {new Date(createdAt).toLocaleString()}
        </Typography>
        <ConfessionContent confession={props.confession}/>
      </CardContent>
      <CardContent sx={{padding: 0}}>
        <ConfessionReactions confession={props.confession} sx={{marginBottom: '15px'}}/>
      </CardContent>
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
              variant={expanded ? 'outlined' : 'contained'}
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              {/*<ExpandMoreIcon />*/}
              {/*<CommentIcon />*/}
                {t('comment.list')} ({commentsCount?.count || 0})
            </ExpandMore>


            {/*<Button variant="outlined" startIcon={<CommentIcon />}>*/}
            {/*  {t('comment')}*/}
            {/*</Button>*/}




          </div>

          {/*<ConfessionReactions confession={props.confession}/>*/}
          <div>

            <Button
              aria-label="share"
              startIcon={<ShareIcon />}
              variant='contained'
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
