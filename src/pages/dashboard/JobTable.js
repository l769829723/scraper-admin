import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { DeleteOutlineTwoTone, FileOpenTwoTone } from "@mui/icons-material";
import { Table } from "../../components";
import * as request from "./request";

function Datatable({
  title,
  project,
  loading,
  columns,
  rows,
  description,
  buttons,
}) {
  const navigate = useNavigate();

  const log = request.useLogOutput();

  const [dialogOpened, setDialogOpened] = React.useState(false);

  const handleCreateJob = () => {
    setDialogOpened(true);
  };

  const handleDeleteJob = React.useCallback(({ id }) => {
    console.log("payload: ", id);
    // log.get(project, category, id).then(() => {
    //   setOpenLog(true);
    // });
  }, []);

  const jobColumns = React.useMemo(() => {
    if (columns && columns.length) {
      return columns.concat([
        {
          title: "操作",
          index: "action",
          render: (text, record) => (
            <Grid container spacing={1} alignItems='center'>
              <Grid item>
                <IconButton
                  size='small'
                  color='primary'
                  onClick={() =>
                    navigate(`/job/${record.id}`, { state: record })
                  }
                >
                  <FileOpenTwoTone />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  size='small'
                  color='error'
                  onClick={() => handleDeleteJob(record)}
                >
                  <DeleteOutlineTwoTone />
                </IconButton>
              </Grid>
            </Grid>
          ),
        },
      ]);
    }
  }, [columns, project, log]);

  return (
    <Box>
      <Dialog
        open={dialogOpened}
        onClose={() => {}}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"是否继续提交?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            正在对 {project} 项目提交一个新的任务. 如继续请点击确定,
            否则点击取消.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size='small' onClick={() => setDialogOpened(false)}>
            取消
          </Button>
          <Button
            size='small'
            variant='contained'
            onClick={() => setDialogOpened(false)}
            autoFocus
          >
            继续
          </Button>
        </DialogActions>
      </Dialog>
      <Table.Datatable
        title={title}
        loading={loading}
        rows={rows}
        columns={jobColumns}
        description={description}
        headerButtons={
          <Button color='primary' variant='outlined' onClick={handleCreateJob}>
            创建任务
          </Button>
        }
      />
    </Box>
  );
}

export default Datatable;
