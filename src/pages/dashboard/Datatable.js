import React from "react";

import {
  Box,
  Grid,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TextField,
  Typography,
  TableContainer,
  Divider,
} from "@mui/material";

function TablePlaceholder({ title, description }) {
  return (
    <Box p={5}>
      <Typography variant='h6' component='h6' textAlign='center'>
        <Box color='text.secondary'>{title}</Box>
      </Typography>
      {description ? (
        <Typography>
          <Box>{description}</Box>
        </Typography>
      ) : null}
    </Box>
  );
}

function Datatable({
  title,
  loading,
  columns,
  rows,
  description,
  headerButtons,
}) {
  return (
    <Box>
      <Grid container justifyContent='space-between'>
        <Grid item>
          {title ? (
            <Typography variant='h5' color='text.secondary'>
              <Box py={1}>{title}</Box>
            </Typography>
          ) : null}
        </Grid>
        <Grid item>
          <Grid container alignItems='middle' spacing={2}>
            <Grid item>
              <TextField
                size='small'
                id='search-table'
                label='搜索'
                variant='outlined'
                placeholder='输入字符'
              />
            </Grid>

            <Grid item>{headerButtons}</Grid>
          </Grid>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          {description ? (
            <caption>A basic table example with a caption</caption>
          ) : null}
          <TableHead>
            <TableRow>
              {columns?.map((col, index) => (
                <TableCell align='left' key={`col-${index}`}>
                  <Typography variant='body1' component='div'>
                    <Box p={1} fontWeight={600} color='text.secondary'>
                      {col.title}
                    </Box>
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!loading ? (
            rows?.length ? (
              <TableBody>
                {rows.map((row, rowIndex) => (
                  <TableRow key={`row-${rowIndex}`}>
                    {columns.map((col, colIndex) => (
                      <TableCell
                        component={colIndex === 0 ? "th" : "td"}
                        scope='row'
                        key={`row-${rowIndex}-col-${colIndex}`}
                      >
                        <Typography variant='body2' component='div'>
                          <Box p={1} fontWeight={500} color='text.secondary'>
                            {!col.render
                              ? row[col.index]
                              : col.render(row[col?.index])}
                          </Box>
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TablePlaceholder title='没有可以显示的数据' />
            )
          ) : (
            <TablePlaceholder title='正在加载 ...' />
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Datatable;
