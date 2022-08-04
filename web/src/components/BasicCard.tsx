import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ConfessionContent from "./confession/Content";
import {CardActions} from "@mui/material";

export default function BasicCard(props) {
  const {cardActions} = props;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {props.secondary && <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{props.secondary}</Typography>}
        {props.primary && <ConfessionContent text={props.primary} />}
        {props.children}
      </CardContent>
      {cardActions && <CardActions>
        {cardActions}
      </CardActions>}

    </Card>
  );
}
