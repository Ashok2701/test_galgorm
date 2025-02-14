import React from "react";
// import Select from "./components/Select";
import MultiSelect from "./components/MultiSelect";

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
        height: 58,
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
        console.log("TYYY date =",date)
        this.setState({ calenderDate: date })
    }

     setSelectedSites = (val) => {
           console.log("selected sites are",val);
            this.props.handleSiteChange(val);
        }

         refreshData = () => {
                   console.log("isndie refresh button");
                    this.props.refreshDataforWeek();
                }



      selectedSitesArr = (val) => {
         console.log("selectedSitesArr sites are",val);
            this.props.sitesArr(val);
        }


    render() {
        const { classes } = this.props;
        console.log("inside Home - props-selectedSite",this.props.selectedSite);
        let sites = this.props.sitelist;
        let optionItems = [];
        var optionSelected = {};
        var selectedSite = {};
        var placeHolder = "All";


            var optionSelected = {};
            var selectedSite = {};
            var placeHolder = "All";
            console.log("inside useEffect",this.props.sitelist);
            this.props.sitelist && this.props.sitelist.length > 0 && this.props.sitelist.map((site) => {
                if (site.id == this.props.selectedSite) {
                    selectedSite = site;
                    placeHolder = site.value;
                    optionSelected.value = site.id;
                    optionSelected.label = (site.value + "(" + site.id + ")");
                }
                optionItems.push({ value: site.id, label: (site.value + "(" + site.id + ")") })
            });
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Paper className={classes.paper}>
                        <Grid
                            container
                            //spacing={4}
                            direction="row"
                            justify="space-between"
                            alignItems="flex-start"
                            style={{ marginBottom: 8  }}
                        >
                            <Grid item container xs alignItems="baseline">
                                <Grid item style={{ marginRight: 10 }}>
                                    <MultiSelect
                                                                             setSelectedSites={this.setSelectedSites}
                                                                             selectedSitesArr={this.selectedSitesArr}
                                                                             options={optionItems}
                                                                             defaultSelected = {this.props.selectedSite}
                                                                             defaultPropsSelected = {this.props.selectedSitesArr}
                                                                         />
                                </Grid>
                                {/* <Grid item style={{ marginRight: 10 }}>
                                    <Select />
                                </Grid>
                                <Grid item style={{ marginRight: 8 , paddingTop : 10 }}>
                                    <SelectSite
                                        data={this.props.vehiclesList}
                                        OnVehicleSelection={this.props.OnVehicleSelection}
                                        labelName={'Select Vehicle'}
                                        type={'Vehicle'}
                                    >

                                    </SelectSite>
                                </Grid>
                                */}
                                &emsp;&emsp;
                                <Grid item style={{ marginRight: 8, paddingTop : 20 }}>
                                    <div>Date </div>
                                    <Calendar style={{paddingTop : 500}}
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

                                <Button style={{ marginLeft: 80 , paddingTop : 10 ,top : '21px' , backgroundColor : 'rgb(66, 75, 77)',color : 'white'  }} onClick={() => this.refreshData() }>Refresh</Button>
                            </Grid>

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