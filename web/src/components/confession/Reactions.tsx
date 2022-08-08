import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import {Badge, Box, Button, Popover} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {
  useCreateReactionMutation,
  useDeleteReactionMutation,
  useGetReactionsSummaryQuery
} from "../../store/confession-api";
import {useTranslation} from "react-i18next";
import AddReactionIcon from '@mui/icons-material/AddReaction';

export default function ConfessionReactions(props) {
  const {id, content, createdAt, reactions} = props.confession;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const [createReactionMutation, {isLoading: isCreateReactionLoading}] = useCreateReactionMutation();
  const [deleteReactionMutation, {isLoading: isDeleteReactionLoading}] = useDeleteReactionMutation();
  const { data, error, isLoading } = useGetReactionsSummaryQuery({id});
  const theme = useTheme();
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [summary, setSummary] = useState(null);
  const currentMyReaction = summary?.myReaction?.name;
  const {t} = useTranslation();

  useEffect(() => {
    setSummary(data);
  }, [data]);

  useEffect(() => {
    if (!selectedReaction) {
      setSelectedReaction(summary?.myReaction?.name);
    }
  }, [summary])

  const onReactionClickHandler = (name) => {
    // console.log('onReactionClickHandler', name)
      setSelectedReaction(name);
      setAnchorEl(null);


      setSummary({
        ...summary,
        count: {
          ...summary.count,
          [name]: {
            ...summary.count[name],
            count: summary.count[name].count + 1,
          },
          ...currentMyReaction && summary.count[currentMyReaction] &&{
            [currentMyReaction]: {
              ...summary.count[currentMyReaction],
              count: summary.count[currentMyReaction].count - 1,
            }
          },
        },
        myReaction: currentMyReaction === name ? null : {name},
      });

      // console.log('currentMyReaction', currentMyReaction)
      // console.log('name', name)
      if (currentMyReaction === name) {
        deleteReactionMutation({id, name})
        setSelectedReaction(null);
      }
      else {
        createReactionMutation({id, name})
      }
  }

  const selectedEmoji = summary?.count?.[selectedReaction]?.emoji;

  return (
    <>
        <Typography
          aria-describedby={`${id}-reactions-popover`}
          onClick={handleClick}
          aria-label="react"
          component="span"
          display="flex"

          sx={{
            alignSelf: 'bottom',
            padding: theme.spacing(0, 1, 0, 1),
            cursor: 'pointer',
            fontSize: '24px',
          }}
        >
          {selectedEmoji ? selectedEmoji : <AddReactionIcon />}
        </Typography>

      <Popover
        elevation={1}
        id={`${id}-reactions-popover`}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}

      >
        <Box display="flex" justifyContent="center" alignItems="center" sx={{padding: theme.spacing(1)}}>
          {summary?.count && Object.values(summary?.count).map(({name, emoji, count}) => {
            return (<Badge key={`${id}-${name}-reaction-count`} badgeContent={count} sx={{
              '& .MuiBadge-badge': {
                right: '50%',
                marginTop: '10px',
                // top: selectedReaction === name ? 15 : 10,
                // top: selectedReaction === name ? '90%' : '100%',

                // left: '0.5rem',
                // border: `2px solid ${theme.palette.background.paper}`,
                backgroundColor: `${theme.palette.background.paper}`,
                // padding: '0 4px',
              },
            }}>
              <Typography
                component="span"
                sx={{
                  cursor: 'pointer',
                  margin: '10px',
                  // fontSize: selectedReaction === name ? '36px' : '24px',
                  fontSize: '24px',
                  transform: selectedReaction === name ? 'scale(1.7)' : null,
                  // opacity: selectedReaction === name ? '100%' : '50%',
                  // transform: activeReaction === name ? 'scale(1.2)' : 'scale(1)',
                  transition: theme.transitions.create(['background-color', 'transform'], {
                    duration: theme.transitions.duration.standard,
                  }),
                  '&:hover': {
                    transform: 'scale(1.7)',
                    // padding: '0 10px 0 10px',
                    // fontSize: '36px'
                  },
                  // '&:active': {
                  //   transform: 'scale(2)',
                  //   // fontSize: '36px'
                  // },
                }}

                onClick={() => onReactionClickHandler(name)}
                // onMouseEnter={() => setHoveringReaction(name)}
                // onMouseLeave={() => setHoveringReaction(null)}
              >
                {emoji}
              </Typography>
            </Badge>)
          })}
        </Box>

      </Popover>
    </>

  )
}
