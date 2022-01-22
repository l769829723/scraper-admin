import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Grid,
  AppBar,
  Button,
  Toolbar,
  Container,
  IconButton,
  Typography,
  CssBaseline,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    minHeight: drawerWidth,
  },
}));

function MainLayout(props) {
  const { title, children, ...rest } = props;
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='absolute'
        // className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={rest.handleClickMenu}
            className={clsx(
              classes.menuButton
              // open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            {title}
          </Typography>
          <Button color='inherit' onClick={rest.handleClickUser}>
            {rest?.user ? "退出" : "登陆"}
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Box display='flex' flexGrow={1}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box className={fixedHeightPaper}>
                  <Box pt={1} {...rest}>
                    {children}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box display='flex' justifyContent='center'>
            <Typography variant='body2' color='text.secondary'>
              &copy; 2021 {title} all reserved
            </Typography>
          </Box>
        </Container>
      </main>
    </div>
  );
}

MainLayout.propTypes = {
  title: PropTypes.string,
  handleClickMenu: PropTypes.func,
  handleClickUser: PropTypes.func,
};

MainLayout.defaultProps = {
  title: "Main",
  handleClickMenu: () => {},
  handleClickUser: () => {},
};

export default MainLayout;
