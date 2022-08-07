import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import {Badge, Box} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {
  useCreateReactionMutation,
  useDeleteReactionMutation,
  useGetReactionsSummaryQuery
} from "../../store/confession-api";

export default function ConfessionReactions(props) {
  const {id, content, createdAt, reactions} = props.confession;

  const [createReactionMutation, {isLoading: isCreateReactionLoading}] = useCreateReactionMutation();
  const [deleteReactionMutation, {isLoading: isDeleteReactionLoading}] = useDeleteReactionMutation();
  const { data, error, isLoading } = useGetReactionsSummaryQuery({id});
  const theme = useTheme();
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [summary, setSummary] = useState(null);


  useEffect(() => {
    setSummary(data);
  }, [data]);

  useEffect(() => {
    if (!selectedReaction) {
      setSelectedReaction(summary?.myReaction?.name);
    }
  }, [summary])

  const onReactionClickHandler = (name) => {
      const currentMyReaction = summary?.myReaction?.name;
      setSelectedReaction(name);

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
      }
      else {
        createReactionMutation({id, name})
      }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {summary?.count && Object.values(summary?.count).map(({name, emoji, count}) => {
        return (<Badge key={`${id}-${name}-reaction-count`} badgeContent={count} sx={{
          '& .MuiBadge-badge': {
            right: '50%',
            // top: selectedReaction === name ? 15 : 10,
            top: selectedReaction === name ? '90%' : '100%',
            // left: '0.5rem',
            // border: `2px solid ${theme.palette.background.paper}`,
            // padding: '0 4px',
          },
        }}>
          <Typography
            sx={{
              cursor: 'pointer',
              padding: '1rem',
              fontSize: selectedReaction === name ? '36px' : '24px',
              // transform: activeReaction === name ? 'scale(1.2)' : 'scale(1)',
              transition: theme.transitions.create(['background-color', 'transform'], {
                duration: theme.transitions.duration.standard,
              }),
              '&:hover': {
                transform: 'scale(1.5)',
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

  )
}
