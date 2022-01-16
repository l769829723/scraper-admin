import React from "react";
import {
  Grid,
  Box,
  TextField,
  FormControl,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Action from "./action";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setContext }) => {
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
        style={{ width: "100vw", height: "100vh" }}
      >
        <Grid container justifyContent='center'>
          <Grid item xs={6}>
            <Box mb={30}>
              <Card>
                <CardContent>
                  <Box px={2}>
                    <Typography variant='h6' component='h6'>
                      <Box py={2} color='text.secondary'>
                        欢迎! 请提交身份信息.
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
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default LoginPage;
