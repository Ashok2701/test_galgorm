import React from "react";
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import {makeStyles} from '@material-ui/core/styles';
import Homelogo from "../Images/Homelogo.svg";
import { Link } from "react-router-dom";

const drawerWidth = 100;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        backgroundColor: "#212C2E"
    },
    drawerRoot: {
        width: 72,
    },
    homeLogo: {
        alignSelf: "center", 
        marginTop: 16, 
        marginleft:22
    }
}));

const Navbar = (props) => {
    const classes = useStyles();
    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                root: classes.drawerRoot,
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbar}/>
            <Link className={classes.homeLogo} to='/'>
                <img src={Homelogo} alt="TBS-logo"  />
            </Link>
            <List>
                {['Icon1', 'Icon2', 'Icon3', 'Icon4', 'Icon5'].map((text, index) => (
                    <ListItem key={text}>
                        <div style={{
                            height: "40px", width: "40px", backgroundColor: "#2C3A3D",
                            alignSelf: "center", borderRadius: "8px", opacity: "1"
                        }}/>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default Navbar;