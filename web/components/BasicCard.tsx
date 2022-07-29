import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Content from "./Content";

export default function BasicCard(props) {

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {props.secondary && <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{props.secondary}</Typography>}
        {/*<Typography variant="h5" component="div">*/}
        {/*  be{bull}nev{bull}o{bull}lent*/}
        {/*</Typography>*/}
        {/*<Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
        {/*  adjective*/}
        {/*</Typography>*/}


        {/*{props.primary && <Typography sx={{ mb: 1.5 }} variant="body2" >{props.primary}</Typography>}*/}
        {props.primary && <Content text={props.primary} />}
        {props.children}
      </CardContent>
      {/*<CardActions>*/}
      {/*  <Button size="small">Learn More</Button>*/}
      {/*</CardActions>*/}
    </Card>
  );
}
