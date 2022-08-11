import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import {Badge, Box, IconButton, Popover} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {
  useCreateReactionMutation,
  useDeleteReactionMutation,
  useGetReactionsSummaryQuery
} from "../../store/confession-api";
import {useTranslation} from "react-i18next";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import {Confession} from "../../types/confession";
import ShareIcon from "@mui/icons-material/Share";
import {
  FacebookIcon,
  FacebookShareButton, FacebookShareCount, TelegramIcon, TelegramShareButton, TwitterIcon,
  TwitterShareButton, WhatsappIcon,
  WhatsappShareButton

} from "react-share";
import {config} from "../../core";

export default function ConfessionShare(props: { confession: Confession }) {
  const {id} = props.confession;
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
  const [summary, setSummary] = useState<{myReaction: {name: string}}|null>(null);
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
      {selectedEmoji ? <Typography
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
        {selectedEmoji}
        </Typography> :
        <IconButton
          aria-label="share"
          aria-describedby={`${id}-share-popover`}
          onClick={handleClick}
        >
        <ShareIcon />
        </IconButton>
      }

      <Popover
        elevation={1}
        id={`${id}-share-popover`}
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

          <WhatsappShareButton style={{padding: theme.spacing(1, 1, 0, 1)}} url={`${config.app.baseUrl}/confessions/${id}`}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <TelegramShareButton style={{padding: theme.spacing(1, 1, 0, 1)}} url={`${config.app.baseUrl}/confessions/${id}`}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <FacebookShareButton style={{padding: theme.spacing(1, 1, 0, 1)}} url={`${config.app.baseUrl}/confessions/${id}`}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton style={{padding: theme.spacing(1, 1, 0, 1)}} url={`${config.app.baseUrl}/confessions/${id}`}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </Box>

      </Popover>
    </>

  )
}
