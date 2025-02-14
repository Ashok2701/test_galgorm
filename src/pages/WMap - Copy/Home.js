import React from "react";
// import Select from "./components/Select";
import SelectSite from "./components/SelectSite";
import * as moment from 'moment-timezone';
import Calendar from "./components/Calendar";
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import StatusDetails from "./components/StatusDetails/StatusDetails";
import { withStyles } from '@material-ui/core/styles';
import Search from "./components/Search";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import export1 from "./Images/export1.svg";
import save from "./Images/save.svg";
import WeekCalender from './WeekCalender'


const drawerWidth = 72;
const useStyles = (theme) => ({
    Button: {
        width: 56,
        height: 32,
        top: 10,
        backgroundColor: "#424B4D",
        color: "#fff",
        textTransform: "none"
    },
    Button2: {
        width: 74,
        height: 32,
        top: 8,
        textTransform: "none"
    },
    paper: {
        height: 48,
        display: "flex",
        alignItems: "center",
    },
      heading: {
            height: 48,
            display: "flex",
            alignItems: "center",
        },
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

});

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            contained: {
                boxShadow: "unset",
            }
        }
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        moment.tz.setDefault("UTC");
        this.state = {
            calenderDate: new Date()
        }
    };
    onCalenderDateChage = (date) => {
        this.setState({ calenderDate: date })
    }

    render() {
        const { classes } = this.props;
        let sites = this.props.sitelist;
        let optionItems = sites && sites.map((site) => <option key={site.id}>{site.id}</option>);

        return (
            <MuiThemeProvider theme={theme}>
               <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar classes={{ root: classes.toolBar }}>
                  <h2>Calendar </h2>
               </Toolbar>
               </AppBar>

                <div>
                    <Paper className={classes.paper}>
                        <Grid
                            container
                            //spacing={4}
                            direction="row"
                            justify="space-between"
                            alignItems="flex-start"
                            style={{ marginBottom: 8 }}
                        >
                            <Grid item container xs alignItems="baseline">
                                <Grid item style={{ marginRight: 10 }}>
                                    <SelectSite
                                        data={this.props.sitelist}
                                        OnSiteSelection={this.props.OnSiteSelection}
                                        labelName={'Select Site'}
                                        type={'Site'}
                                        selectedSite= {this.props.selectedSite}
                                    >

                                    </SelectSite>
                                </Grid>
                                {/* <Grid item style={{ marginRight: 10 }}>
                                    <Select />
                                </Grid> */}
                                <Grid item style={{ marginRight: 8 }}>
                                    <SelectSite
                                        data={this.props.vehiclesList}
                                        OnVehicleSelection={this.props.OnVehicleSelection}
                                        labelName={'Select Vehicle'}
                                        type={'Vehicle'}
                                    >

                                    </SelectSite>
                                </Grid>
                                &emsp;&emsp;
                                <Grid item style={{ marginRight: 8 }}>
                                    <Calendar
                                        weekStartDate={this.props.weekStartDate}
                                        weekEndDate={this.props.weekEndDate}
                                        onCalenderDateChage={this.onCalenderDateChage} />
                                </Grid>
                                &emsp;&emsp;
                                <Grid item style={{ display: "flex" }}>
                                    <WeekCalender
                                        calenderDate={this.state.calenderDate}
                                        startEndDates={this.props.startEndDates} />
                                </Grid>
                            </Grid>
                            {/* <Grid item container justify="flex-end" spacing={1} xs={2} style={{ marginRight: 40 }}
                            >
                                <Grid item style={{ marginTop: 5 }} >
                                    <Button classes={{ root: classes.Button2 }} variant="contained" >
                                        <img src={export1} style={{ paddingRight: 5 }} />
                                        Export
                                    </Button>
                                </Grid>
                                <Grid item style={{ marginTop: 5 }} >
                                    <Button classes={{ root: classes.Button2 }} variant="contained">
                                        <img src={save} style={{ paddingRight: 5 }} />Save</Button>
                                </Grid>
                            </Grid> */}
                        </Grid>
                    </Paper>
                    <StatusDetails
                        weekStartDate={this.props.weekStartDate}
                        weekEndDate={this.props.weekEndDate}
                        tripDetails={this.props.tripDetails}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(useStyles)(Home);