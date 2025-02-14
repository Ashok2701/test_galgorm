import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const drawerWidth = 72;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100%)`,
    marginLeft: drawerWidth,
    backgroundColor: "#424B4D",
  },
  typography: {
    fontWeight: "bold",
    fontSize: 18
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between"
  },
  home: {
    height: 40,
    width: 90,
    backgroundColor: "#7CC246",
    borderRadius: 8,
    marginRight: 8,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  rightIcon1: {
    height: 40,
    width: 90,
    backgroundColor: "#7CC246",
    borderRadius: 8,
    marginRight: 8,
    color: 'white',
    textAlign: 'center',
    paddingTop: 10,
    fontWeight: 'bold'
  },
  rightIcon2: {
    height: 40,
    width: 90,
    backgroundColor: "#7CC246",
    borderRadius: 8,
    marginRight: 8,
    color: 'white',
    textAlign: 'center',
    paddingTop: 10,
    fontWeight: 'bold'
  },
  rightIconsWrapper: {
    display: "flex"
  }
}));
const Appbar = (props) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar classes={{ root: classes.toolBar }}>
        {/* <Typography variant="h6" noWrap className={classes.typography}>
        REPORTS
        </Typography> */}
        <div className={classes.rightIconsWrapper}>
          {/* <Link className={classes.home} to='/reportsHome'>
            ROUTE PLANNER
          </Link> */}
          <Link className={classes.rightIcon2} to='/'>
            CALENDAR
          </Link>
          <Link className={classes.rightIcon1} to='/maps'>
            MAPS
          </Link>
        </div >
      </Toolbar>
    </AppBar>
  )
}

export default Appbar;