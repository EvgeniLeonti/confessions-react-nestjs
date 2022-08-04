import React, {useEffect} from "react";
import {ReactionBarSelector} from "@charkour/react-reactions";
import {Box, IconButton, Popover, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import i18n from "../i18n/i18n";
import {useWindowScroll} from 'react-use';
import {useCreateReactionMutation} from "../store/confession-api";
import {useDispatch} from "react-redux";

const selectedToEmoji = {
  'happy': '😆',
  'sad': '😢',
  'angry': '😡',
  'love': '❤️',
  'satisfaction': '👍',
  'surprise': '😮',
};
function ReactionsCTA(props: {confession: any}) {
  const { confession } = props;
  const [createReactionMutation, {isLoading: isCreateReactionLoading}] = useCreateReactionMutation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState<string | null>(null);
  const {y} = useWindowScroll();

  const dispatch = useDispatch();


  useEffect(() => {
    if (anchorEl) {
      setAnchorEl(null);
    }
  }, [y])

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

  function handleReactionSelect(reaction: string) {
    console.log('reaction selected', reaction)
    setSelected(reaction);
    handleClose();

    createReactionMutation({id: confession.id, name: reaction}).then(() => {
      // dispatch(pushNotification({message: 'comment sent', options: { variant: 'success' } }))
      // reset()
    });
  }

  const id = `${confession.id}-react-menu`;
  const horizontal = i18n.dir() === 'rtl' ? 'right' : 'left';

  const containerRef = React.useRef();

  return (
    <Box ref={containerRef} >

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
        container={containerRef.current}
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
           onSelect={handleReactionSelect}
          />
        </div>
      </Popover>
    </Box>
  );
}

export default ReactionsCTA;
