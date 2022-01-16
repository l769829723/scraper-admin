import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as View from "../views";
import Action from "../store/action";
import * as Api from "../api";

const SettingPage = ({ context, setContext }) => {
  const [host, setHost] = React.useState("localhost");
  const [schema, setSchema] = React.useState("https");
  const schemaOptions = ["http", "https"];
  const navigate = useNavigate();

  const { status, message, loading } = Api.useDetection();

  const handleChangeSchema = ({ target }) => {
    setSchema(target.value);
  };

  const handleSaveConfig = () => {
    setContext(Action.SET_API_HOST, { schema, host });
    navigate("/");
  };

  React.useEffect(() => {
    if (context.api) {
      if (context.api.host) {
        setHost(context.api.host);
      }
      if (context.api.schema) {
        setSchema(context.api.schema);
      }
    }
  }, [context]);

  return (
    <View.AppLayout pageId='Setting'>
      {status === "ERROR" ? <Alert severity='error'>{message}</Alert> : null}
      <Paper elevation={0}>
        <Box p={5}>
          <Grid container spacing={1}>
            <Grid xs={12} md={2} item>
              <FormControl fullWidth>
                <InputLabel htmlFor='schema-option'>Schema</InputLabel>
                <Select
                  size='small'
                  labelId='schema-option'
                  id='schema-option'
                  value={schema}
                  label='Schema'
                  onChange={handleChangeSchema}
                >
                  {schemaOptions.map((schemaName, index) => (
                    <MenuItem key={index} value={schemaName}>
                      {schemaName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={9} item>
              <FormControl fullWidth>
                <TextField
                  size='small'
                  id='hostname-option'
                  label='Hostname'
                  variant='outlined'
                  onChange={({ target }) => setHost(target.value.trim())}
                  value={host}
                />
              </FormControl>
            </Grid>
            <Grid xs={12} md={1} item>
              <Grid container justifyContent='flex-end'>
                <Button
                  variant='contained'
                  onClick={handleSaveConfig}
                  disabled={loading}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </View.AppLayout>
  );
};

export default SettingPage;
