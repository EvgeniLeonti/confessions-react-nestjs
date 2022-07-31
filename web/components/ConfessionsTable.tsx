import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useDraftConfessionMutation, useGetAdminConfessionsQuery, usePublishConfessionMutation} from "../store/api";
import {useDispatch} from "react-redux";
import {pushNotification} from "../store/toast.state";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import ConfessionContent from "./ConfessionContent";

interface Data {
  id: string;
  createdAt: string;
  content: string;
  published: boolean;
}



export default function ConfessionsTable(props: any) {
  const { data, error, isLoading } = useGetAdminConfessionsQuery();
  const [publishConfession, {isLoading: isPublishLoading}] = usePublishConfessionMutation();
  const [draftConfession, {isLoading: isDraftLoading}] = useDraftConfessionMutation();
  const dispatch = useDispatch();

  const rows = data?.items || [];

  function Row(props: { row: Data }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            {row.id}
          </TableCell>
          <TableCell align="center" width="200px">{new Date(row.createdAt).toLocaleString()}</TableCell>
          <TableCell align="center">
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {row.content}
            </Typography>
          </TableCell>
          <TableCell align="center">{row.published && "√"}</TableCell>

          <TableCell
            align="center"
            width="150px"
            align="center"
          >

            <IconButton aria-label="approve" color="primary" disabled={row.published}
                        onClick={() => {
                          if (row.id) {
                            publishConfession({id: row.id}).then(() => {
                              dispatch(pushNotification({message: 'successfully set as published', options: { variant: 'success' } }));
                            });
                          }
                        }}>
              <DoneIcon/>
            </IconButton>

            <IconButton aria-label="reject" color="secondary" disabled={!row.published}
                        onClick={() => {
                          if (row.id) {
                            draftConfession({id: row.id}).then(() => {
                              dispatch(pushNotification({message: 'successfully set as draft', options: { variant: 'success' } }));
                            });
                          }
                        }}>
              <ClearIcon/>
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  content
                </Typography>


                <Typography>
                  <ConfessionContent text={row.content} />
                </Typography>
                {/*<Table size="small" aria-label="purchases">*/}
                {/*  <TableHead>*/}
                {/*    <TableRow>*/}
                {/*      <TableCell>Date</TableCell>*/}
                {/*      <TableCell>Customer</TableCell>*/}
                {/*      <TableCell align="right">Amount</TableCell>*/}
                {/*      <TableCell align="right">Total price ($)</TableCell>*/}
                {/*    </TableRow>*/}
                {/*  </TableHead>*/}
                {/*  <TableBody>*/}
                {/*    {row.history.map((historyRow) => (*/}
                {/*      <TableRow key={historyRow.date}>*/}
                {/*        <TableCell component="th" scope="row">*/}
                {/*          {historyRow.date}*/}
                {/*        </TableCell>*/}
                {/*        <TableCell>{historyRow.customerId}</TableCell>*/}
                {/*        <TableCell align="right">{historyRow.amount}</TableCell>*/}
                {/*        <TableCell align="right">*/}
                {/*          {Math.round(historyRow.amount * row.price * 100) / 100}*/}
                {/*        </TableCell>*/}
                {/*      </TableRow>*/}
                {/*    ))}*/}
                {/*  </TableBody>*/}
                {/*</Table>*/}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">id</TableCell>
            <TableCell align="center">created at</TableCell>
            <TableCell align="center">content</TableCell>
            <TableCell align="center">published</TableCell>
            <TableCell align="center">actions</TableCell>
            {/*<TableCell align="right">Fat&nbsp;(g)</TableCell>*/}
            {/*<TableCell align="right">Carbs&nbsp;(g)</TableCell>*/}
            {/*<TableCell align="right">Protein&nbsp;(g)</TableCell>*/}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
