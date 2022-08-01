import {usePatchConfessionMutation} from "../store/confession-api";
import {Box, Button, TextField} from "@mui/material";
import * as React from "react";
import {LoadingButton} from "@mui/lab";
import Typography from "@mui/material/Typography";
import i18n from "../i18n/i18n";

export default function EditableConfessionContent(props: any) {
  const { id, value, updateValue } = props;
  const [patchConfession, {isLoading: isPatchLoading}] = usePatchConfessionMutation();
  const [lastValue, setLastValue] = React.useState(value);
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <>
      {/*{isFullContent ? (<ConfessionContent value={value}/>) : (<ConfessionPreview value={value}/>)}*/}
      {isEditing ? (
          <>
            <TextField fullWidth value={lastValue} type='text' multiline rows={6} onChange={event => {
              console.log('updateValue with', event.target.value)
              updateValue(event.target.value)
              setLastValue(event.target.value)
            }}/>



            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 0,
                m: 1,
              }}
            >

              <LoadingButton
                variant='contained'
                type='submit'
                loading={isPatchLoading}

                onClick={() => patchConfession({id, content: value})}
              >
                Update
              </LoadingButton>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => setIsEditing(false)}
              >
                Collapse
              </Button>


            </Box>




          </>
      ) : <Typography
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '1',
          WebkitBoxOrient: 'vertical',
          textAlign: i18n.dir() === 'rtl' ? 'right' : 'left',
        }}
        style={{cursor: 'pointer'}}
        onClick={() => setIsEditing(!isEditing)}
      >
        {lastValue}
      </Typography>}
    </>
  );
}
