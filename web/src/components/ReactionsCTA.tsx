import React from "react";
import {ReactionBarSelector} from "@charkour/react-reactions";
import {IconButton, Popover, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import i18n from "../i18n/i18n";


const selectedToEmoji = {
  'happy': '😆',
  'sad': '😢',
  'angry': '😡',
  'love': '❤️',
  'satisfaction': '👍',
  'surprise': '😮',
}
function ReactionsCTA(props: {confession: any}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

  function handleClick(event: { currentTarget: React.SetStateAction<null>; }) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }
  function handleMouseOver(event: { currentTarget: React.SetStateAction<null>; }) {
    return handleClick(event);
  }

  function handleClose() {
    setAnchorEl(null);
  }


  const id = `${props.confession.id}-react-menu`;
  const horizontal = i18n.dir() === 'rtl' ? 'right' : 'left';


  return (
    <div>

      {!selected && (<IconButton aria-describedby={id}
                                       onClick={handleClick}
                                       onMouseOver={handleMouseOver}
      >
        <FavoriteIcon/>
      </IconButton>)}

      {selected && (<Typography style={{cursor: 'pointer', fontSize: '24px', padding: '0 8px 0 8px'}} aria-describedby={id} onClick={handleClick}>
        <>{selectedToEmoji[selected]}</>

      </Typography>)}



      <Popover
        id={id}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{vertical: 'center', horizontal}}
        transformOrigin={{vertical: 'center', horizontal}}
        PaperProps={{
          elevation: 0,
          style: {
            backgroundColor: 'red !important',
            overflow: 'visible',
          }
        }}

      >
        <div onMouseLeave={handleClose}>
          <ReactionBarSelector
          style={{
            backgroundColor: 'unset !important',
            // borderRadius: 0,
            // boxShadow: 'unset !important',
          }}
           iconSize={24}
           onSelect={(reaction) => {
             console.log('reaction selected', reaction)
             setSelected(reaction);
             handleClose();
           }}
          />
        </div>
      </Popover>
    </div>
  );
}

export default ReactionsCTA;
