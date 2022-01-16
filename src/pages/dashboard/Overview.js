import React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Overview = ({
  title,
  projects,
  running,
  pending,
  finished,
  onTabChange,
}) => {
  const [tabKey, setTabKey] = React.useState("default");

  const handleToggleTab = (e, value) => {
    setTabKey(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };

  React.useEffect(() => {
    if (projects && projects.length) {
      setTabKey(projects[0]);
    }
  }, [projects]);

  return (
    <Box>
      <Box>
        <Box py={1}>
          <Typography variant='h5' color='text.secondary'>
            <Box>{title}</Box>
          </Typography>
        </Box>
        <Paper square>
          <Tabs
            value={tabKey}
            indicatorColor='primary'
            textColor='secondary'
            onChange={handleToggleTab}
          >
            {projects?.map((tab) => (
              <Tab key={`t-${tab}`} label={tab} value={tab} />
            ))}
            <Tab label='default' value='default' />
          </Tabs>
        </Paper>
      </Box>
      <Paper square elevation={1}>
        <Box py={1} px={3}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography
                align='center'
                variant='body1'
                color='text.primary'
                component='div'
              >
                <Box fontWeight={600}>运行中</Box>
              </Typography>
              <Typography
                align='center'
                variant='h4'
                component='div'
                color='text.secondary'
              >
                <Box fontWeight={600}>
                  {running !== undefined
                    ? `${running} / ${finished || 0}`
                    : "--"}
                </Box>
              </Typography>
              <Typography
                align='center'
                variant='body2'
                component='div'
                color='text.secondary'
              >
                {running !== undefined ? `正在运行${running}个任务` : null}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                align='center'
                variant='body1'
                color='text.primary'
                component='div'
              >
                <Box fontWeight={600}>准备运行</Box>
              </Typography>
              <Typography
                align='center'
                variant='h4'
                component='div'
                color='text.secondary'
              >
                <Box fontWeight={600}>
                  {pending !== undefined ? pending : "--"}
                </Box>
              </Typography>
              <Typography
                align='center'
                variant='body2'
                component='div'
                color='text.secondary'
              >
                {pending !== undefined ? `等待运行${pending}个任务` : null}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                align='center'
                variant='body1'
                color='text.primary'
                component='div'
              >
                <Box fontWeight={600}>已完成</Box>
              </Typography>
              <Typography
                align='center'
                variant='h4'
                component='div'
                color='text.secondary'
              >
                <Box fontWeight={600}>
                  {finished !== undefined ? finished : "--"}
                </Box>
              </Typography>
              <Typography
                align='center'
                variant='body2'
                component='div'
                color='text.secondary'
              >
                {finished !== undefined ? `已完成${finished}个任务` : null}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Overview;
