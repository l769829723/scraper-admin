import clsx from "clsx";
import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as Icon from "@mui/icons-material";
import { Layout } from "../components";
import { Context } from "../store";
import Action from "../pages/login/action";
import { makeStyles } from "@mui/styles";

/**
 * TODO:
 * 1. Revamp side bar
 */

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
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
}));

const renderIcon = (name) => {
  const IconComponent = Icon[name];
  return <IconComponent />;
};

const AppLayout = ({ children, pageId }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [context, setContext] = Context.useContext();

  const [drawerOpened, setDrawerOpened] = React.useState(false);

  const appName = React.useMemo(() => {
    return (context.app && context.app.name) || "";
  }, [context.app]);

  const navs = React.useMemo(() => {
    return context.navs || [];
  }, [context.navs]);

  const handleToggleDrawer = () => {
    setDrawerOpened(!drawerOpened);
  };

  const handleChangeUser = () => {
    if (context?.credential) {
      setContext(Action.LOGIN_USER, null);
    }
    navigate("/login");
  };

  React.useEffect(() => {
    if (appName) {
      document.title = appName;
    }
    if (appName && pageId) {
      document.title = `${pageId} - ${appName}`;
    }
  }, [appName, pageId]);

  return (
    <Layout.Main
      title={appName}
      menus={navs}
      user={context.credential}
      handleClickUser={handleChangeUser}
      handleClickMenu={handleToggleDrawer}
    >
      <React.Fragment key='left'>
        <Drawer
          anchor='left'
          open={drawerOpened}
          onClose={() => setDrawerOpened(false)}
          classes={{
            paper: clsx(
              classes.drawerPaper,
              !drawerOpened && classes.drawerPaperClose
            ),
          }}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleToggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Box role='presentation'>
            <List>
              {navs.map((item, index) => (
                <ListItemButton component={Link} to={item.path} key={index}>
                  <ListItemIcon>
                    {item.icon ? renderIcon(item.icon) : null}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
      <Box p={5}>{children}</Box>
    </Layout.Main>
  );
};

export default AppLayout;
