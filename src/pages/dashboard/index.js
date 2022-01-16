import React from "react";
import { Box, Grid, Button } from "@mui/material";
import Overview from "./Overview";
import Datatable from "./Datatable";
import * as config from "./config";
import * as request from "./request";
import * as View from "../../views";

/**
 * TODO:
 * 1. auto refresh
 * 2. show logs
 */

const Dashboard = ({ context }) => {
  const status = request.useStatus();
  const projects = request.useProjects();

  const jobs = React.useMemo(() => {
    const records = [];
    const { running, pending, finished } = status.data || {};
    if (running && pending && finished) {
      running?.foreach((job) => {
        records.push({
          id: job.id,
          category: job.spider,
          status: "running",
          startAt: job.start_time,
        });
      });
      pending?.foreach((job) => {
        records.push({
          id: job.id,
          category: job.spider,
          status: "pending",
          startAt: job.start_time,
        });
      });
      finished?.foreach((job) => {
        records.push({
          id: job.id,
          category: job.spider,
          status: "finished",
          startAt: job.start_time,
        });
      });
    }
    return records;
  }, [status]);

  const handleTabChange = (value) => {
    if (projects.data && projects.data.length) {
      status.get(value);
    }
  };

  React.useEffect(() => {
    if (projects.data && projects.data.length) {
      handleTabChange(projects.data[0]);
    }
  }, [projects.data]);

  React.useEffect(() => {
    projects.get();
  }, []);

  return (
    <View.AppLayout context={context} pageId='Dashboard'>
      <Overview
        title='概览'
        projects={projects?.data}
        running={status?.data?.running?.length}
        pending={status?.data?.pending?.length}
        finished={status?.data?.finished?.length}
        onTabChange={handleTabChange}
      />

      <Grid container>
        <Grid item xs={12}>
          <Box pt={5} pb={1}>
            <Datatable
              title='任务列表'
              loading={status.loading}
              rows={jobs}
              columns={config.columns}
              headerButtons={[
                <Button variant='outlined' color='info'>
                  创建任务
                </Button>,
              ]}
            />
          </Box>
        </Grid>
      </Grid>
    </View.AppLayout>
  );
};

export default Dashboard;
