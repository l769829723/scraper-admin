import React from "react";
import { Card, Grid, CardContent, Box, Typography } from "@mui/material";

function Description({ children, items }) {
  return (
    <Card>
      <CardContent>
        <Grid container justifyContent='space-around'>
          {Object.keys(items).map((key, index) => (
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
                  <Box color='text.secondary'>{items[key]}</Box>
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        {children}
      </CardContent>
    </Card>
  );
}

export default Description;
