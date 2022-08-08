import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActions} from "@mui/material";
import PrettyText from "./PrettyText";

export default function BasicCard(props) {
  const {cardActions} = props;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {props.secondary && <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{props.secondary}</Typography>}
        {props.primary && <PrettyText text={props.primary} />}
        {props.children}
      </CardContent>
      {cardActions && <CardActions>
        {cardActions}
      </CardActions>}

    </Card>
  );
}
