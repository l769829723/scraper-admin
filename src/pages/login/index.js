import React from "react";
import {
  Grid,
  Box,
  TextField,
  FormControl,
  Button,
  CardContent,
  Typography,
} from "@mui/material";
import Action from "./action";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
  },
}));

const LoginPage = ({ setContext }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setContext(Action.LOGIN_USER, { [username]: password });
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <Box
        display='flex'
        alignItems='center'
        alignContent='center'
        className={classes.root}
      >
        <Grid container justifyContent='center'>
          <Grid item xs={10} md={3} lg={2}>
            <Box mb={30}>
              <CardContent>
                <Box px={5}>
                  <Typography variant='h6' component='h6'>
                    <Box py={2} color='text.secondary'>
                      欢迎! 请验证身份.
                    </Box>
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          required
                          size='small'
                          id='input-username'
                          label='用户名'
                          variant='outlined'
                          placeholder='输入用户名'
                          onChange={({ target }) =>
                            setUsername(target.value.trim())
                          }
                          value={username}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          required
                          size='small'
                          id='input-password'
                          label='密码'
                          variant='outlined'
                          type='password'
                          placeholder='输入密码'
                          onChange={({ target }) =>
                            setPassword(target.value.trim())
                          }
                          value={password}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Button
                          color='primary'
                          variant='contained'
                          type='submit'
                        >
                          提交
                        </Button>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default LoginPage;
