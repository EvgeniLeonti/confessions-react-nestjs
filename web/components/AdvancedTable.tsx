import MUIDataTable from "mui-datatables";
import {
  useDraftConfessionMutation,
  useGetAdminConfessionsQuery,
  usePatchConfessionMutation,
  usePublishConfessionMutation
} from "../store/api";
import {useDispatch} from "react-redux";
import {FormControlLabel, Switch, TextField} from "@mui/material";
import {pushNotification} from "../store/toast.state";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {LoadingButton} from "@mui/lab";
import EditableConfessionContent from "./EditableConfessionContent";


export default function DataTable() {
  const { data: result, error, isLoading } = useGetAdminConfessionsQuery();
  const [publishConfession, {isLoading: isPublishLoading}] = usePublishConfessionMutation();
  const [draftConfession, {isLoading: isDraftLoading}] = useDraftConfessionMutation();
  const dispatch = useDispatch();

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        filter: true,
        setCellProps: () => ({ style: { width: "100px" } }),
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography variant="body2">{value.substring(16)}...</Typography>
        )
      }
    },
    {
      name: "createdAt",
      label: "Created At",
      options: {
        filter: true,
        setCellProps: () => ({ style: { width: "200px" } }),

        customBodyRender: (value, tableMeta, updateValue) => (
            <Typography variant="body2">{new Date(value).toLocaleString()}</Typography>
          )
      }
    },
    {
      name: "content",
      label: "Content",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const id = tableMeta.rowData[0];

          return (
            <EditableConfessionContent id={id} value={value} updateValue={updateValue}/>
          )
        },
      },

    },
    {
      name: "published",
      label: "Published",
      options: {
        filter: true,
        filterType: 'dropdown',

        setCellProps: () => ({ style: { width: "100px" } }),
        customBodyRender: (value, tableMeta, updateValue) => {

          // console.log('value', value);
          // console.log('tableMeta', tableMeta);
          // console.log('updateValue', updateValue);

          const confessionId = tableMeta.rowData[0];
          return (
            <FormControlLabel
              label={value ? "Yes" : "No"}
              value={value ? "Yes" : "No"}
              control={
                <Switch color="primary" checked={value} value={value ? "Yes" : "No"} />
              }
              onChange={event => {
                // console.log('event checked', event?.target?.checked);
                switch (event?.target?.checked) {
                  case true:
                    publishConfession({id: confessionId}).then(() => {
                      dispatch(pushNotification({message: 'successfully set as published', options: { variant: 'success' } }));
                    });
                    break;
                  case false:
                    draftConfession({id: confessionId}).then(() => {
                      dispatch(pushNotification({message: 'successfully set as draft', options: { variant: 'success' } }));
                    });
                    break;
                }
                // updateValue(event.target.value === "Yes" ? false : true);
              }}
            />
          );

        }
      }
    }
  ];

  const data = result?.items || [];

  const options = {
    filter: true,
    filterType: 'textField',
    responsive: 'standard'
  };

  return (
    <MUIDataTable title={"Confessions list"} data={data} columns={columns} options={options} />
  );
}
