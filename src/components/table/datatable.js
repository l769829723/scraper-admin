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
} from "@mui/material";
import { Header } from "../../components";

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
  const [searchValue, setSearchValue] = React.useState("");

  const filteredRows = React.useMemo(() => {
    if (rows && rows.length) {
      if (searchValue !== "") {
        return rows.filter((row) =>
          JSON.stringify(row).toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      return rows;
    }
    return [];
  }, [rows, searchValue]);

  return (
    <Box>
      <Header.MainTitle
        title={title}
        extra={
          <Grid container alignItems='flex-end' spacing={2}>
            <Grid item>
              <TextField
                size='small'
                id='search-table'
                label='搜索'
                variant='outlined'
                placeholder='输入字符'
                onChange={({ target }) => setSearchValue(target.value.trim())}
              />
            </Grid>

            <Grid item>{headerButtons}</Grid>
          </Grid>
        }
      />
      <TableContainer component={Paper}>
        <Table>
          {description ? <caption>{description}</caption> : null}
          <TableHead>
            <TableRow>
              {columns?.map((col, index) => (
                <TableCell align='left' key={`col-${index}`}>
                  <Typography variant='body1' component='div'>
                    <Box p={1} fontWeight={600} color='text.primary'>
                      {col.title}
                    </Box>
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!loading ? (
            filteredRows?.length ? (
              <TableBody>
                {filteredRows.map((row, rowIndex) => (
                  <TableRow key={`row-${rowIndex}`}>
                    {columns.map((col, colIndex) => (
                      <TableCell
                        component={colIndex === 0 ? "th" : "td"}
                        scope='row'
                        key={`row-${rowIndex}-col-${colIndex}`}
                      >
                        {!col.render ? (
                          <Typography variant='body2' component='div'>
                            <Box p={1} fontWeight={500} color='text.primary'>
                              {row[col.index]}
                            </Box>
                          </Typography>
                        ) : (
                          col.render(row[col?.index], row)
                        )}
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
