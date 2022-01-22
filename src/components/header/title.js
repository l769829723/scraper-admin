import React from "react";
import { Box, Grid, Typography } from "@mui/material";

function MainTitle({ title, extra }) {
  return (
    <Grid item xs={12}>
      <Grid container justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Typography variant='h5' color='text.primary'>
            <Box fontWeight={500} py={1}>
              {title}
            </Box>
          </Typography>
        </Grid>
        <Grid item>{extra}</Grid>
      </Grid>
    </Grid>
  );
}

export default MainTitle;
