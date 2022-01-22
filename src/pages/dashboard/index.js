import React from "react";
import { Box, Grid, Button } from "@mui/material";
import Overview from "./Overview";
import JobTable from "./JobTable";
import * as config from "./config";
import * as request from "./request";
import * as View from "../../views";
import { RefreshTwoTone } from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";
import JobDetail from "./JobDetail";

/**
 * TODO:
 * 1. delete job
 * 2. create job
 */

const Dashboard = ({ context }) => {
  const status = request.useStatus();
  const projects = request.useProjects();

  const [currentProject, setCurrentProject] = React.useState("default");

  const jobs = React.useMemo(() => {
    const records = [];
    const { running, pending, finished } = status.data || {};
    if (running && pending && finished) {
      running?.forEach((job) => {
        records.push({
          id: job.id,
          category: job.spider,
          status: "running",
          startAt: job.start_time,
        });
      });
      pending?.forEach((job) => {
        records.push({
          id: job.id,
          category: job.spider,
          status: "pending",
          startAt: job.start_time,
        });
      });
      finished?.forEach((job) => {
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
      setCurrentProject(value);
      status.get(value);
    }
  };

  React.useEffect(() => {
    // 更新当前tab,并且获取数据
    if (projects.data && projects.data.length) {
      const projectName = projects.data[0];
      handleTabChange(projectName);
      setCurrentProject(projectName);
    }
  }, [projects.data]);

  React.useEffect(() => {
    // 初始化加载数据
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
        extra={
          <Button
            size='small'
            variant='outlined'
            startIcon={<RefreshTwoTone />}
            onClick={() => status.get(currentProject)}
          >
            Refresh
          </Button>
        }
      />

      <Routes>
        <Route
          path='/'
          element={
            <Grid container>
              <Grid item xs={12}>
                <Box pt={5} pb={1}>
                  <JobTable
                    title='任务列表'
                    project={currentProject}
                    loading={status.loading}
                    rows={jobs}
                    columns={config.columns}
                  />
                </Box>
              </Grid>
            </Grid>
          }
        />
        <Route
          path='/job/:id'
          element={<JobDetail title='任务详细信息' project={currentProject} />}
        />
      </Routes>
    </View.AppLayout>
  );
};

export default Dashboard;
