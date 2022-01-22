import React from "react";
import * as request from "./request";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Link, Grid, Typography, Paper } from "@mui/material";
import { Card, Header } from "../../components";

function JobDetail({ title, project }) {
  const { state } = useLocation();
  const log = request.useLogOutput();

  React.useEffect(() => {
    const { id, category } = state || {};
    if (id && category) {
      log.get(project, category, id);
    }
  }, [state]);

  return (
    <Box mt={5}>
      <Grid container>
        <Grid item xs={12}>
          <Header.MainTitle
            title={title}
            extra={
              <Link component={RouterLink} to='/'>
                返回列表
              </Link>
            }
          />
        </Grid>

        <Grid item xs={12}>
          <Grid item>
            <Card.Description items={state}>
              <Paper variant='outlined'>
                <Box
                  color='text.primary'
                  bgcolor='background.default'
                  borderRadius={2}
                  p={1}
                >
                  {!log.loading ? (
                    <Typography variant='body1' component='div'>
                      <Box>{log.data}</Box>
                    </Typography>
                  ) : (
                    "Loading ..."
                  )}
                </Box>
              </Paper>
            </Card.Description>
            {/* <Card>
              <CardContent>
                <Grid container justifyContent='space-around'>
                  {Object.keys(state).map((key, index) => (
                    <Grid key={key} item>
                      <Box>
                        <Typography variant='button' component='div'>
                          <Box fontWeight={600} color='text.secondary'>
                            {key}
                          </Box>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant='body1' component='div'>
                          <Box color='text.secondary'>{state[key]}</Box>
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Paper variant='outlined'>
                  <Box
                    color='text.primary'
                    bgcolor='background.default'
                    borderRadius={2}
                    p={1}
                  >
                    {!log.loading ? (
                      <Typography variant='body1' component='div'>
                        <Box>{log.data}</Box>
                      </Typography>
                    ) : (
                      "Loading ..."
                    )}
                  </Box>
                </Paper>
              </CardContent>
            </Card> */}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default JobDetail;
