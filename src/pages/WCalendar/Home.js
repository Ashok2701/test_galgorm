import React from "react";
// import Select from "./components/Select";
import MultiSelect from "./components/MultiSelect";
import { Button } from "reactstrap";
import SelectSite from "./components/SelectSite";
import * as moment from "moment-timezone";
import Calendar from "./components/Calendar";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import StatusDetails from "./components/StatusDetails/StatusDetails";
import { withStyles } from "@material-ui/core/styles";
import Search from "./components/Search";
import {
  IconButton,
  MuiThemeProvider,
  Tooltip,
  createMuiTheme,
} from "@material-ui/core";
import RefreshIcon from "@mui/icons-material/Refresh";
import export1 from "./Images/export1.svg";
import save from "./Images/save.svg";
import WeekCalender from "./WeekCalender";

const drawerWidth = 72;
const useStyles = (theme) => ({
  Button: {
    width: 56,
    height: 32,
    top: 10,
    backgroundColor: "#424B4D",
    color: "#fff",
    textTransform: "none",
  },
  Button2: {
    width: 74,
    height: 32,
    top: 8,
    textTransform: "none",
  },
  paper: {
    // height: 70,
    display: "flex",
    alignItems: "center",
    paddingTop:"1rem",
    paddingBottom:"1rem",
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
    fontSize: 18,
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  home: {
    height: 40,
    width: 90,
    backgroundColor: "#7CC246",
    borderRadius: 8,
    marginRight: 8,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: "unset",
      },
    },
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    moment.tz.setDefault("UTC");
    this.state = {
      calenderDate: new Date(),
    };
  }
  onCalenderDateChage = (date) => {
    
    this.props.handleDateChange(date);
    this.setState({ calenderDate: date });
  };

  setSelectedSites = (val) => {
    
    this.props.handleSiteChange(val);
  };

  refreshData = () => {
    
    this.props.refreshDataforWeek();
  };

  selectedSitesArr = (val) => {
    
    this.props.sitesArr(val);
  };

  render() {
    const { classes } = this.props;
    
    let sites = this.props.sitelist;
    let optionItems = [];
    var optionSelected = {};
    var selectedSite = {};
    var placeHolder = "All";

    var optionSelected = {};
    var selectedSite = {};
    var placeHolder = "All";
    
    this.props.sitelist &&
      this.props.sitelist.length > 0 &&
      this.props.sitelist.map((site) => {
        if (site.id == this.props.selectedSite) {
          selectedSite = site;
          placeHolder = site.value;
          optionSelected.value = site.id;
          optionSelected.label = site.value + "(" + site.id + ")";
        }
        optionItems.push({
          value: site.id,
          label: site.value + "(" + site.id + ")",
        });
      });
    return (
      <MuiThemeProvider theme={theme}>
        <div>
     
          <Paper className={classes.paper}>
            <Grid
              container 
            >
             
              <Grid item container spacing={2}  alignItems="center" >
                <Grid item  xs={2}>
                  <MultiSelect
                    setSelectedSites={this.setSelectedSites}
                    selectedSitesArr={this.selectedSitesArr}
                    options={optionItems}
                    defaultSelected={this.props.selectedSite}
                    defaultPropsSelected={this.props.selectedSitesArr}
                  />
                </Grid>
             
                <Grid item  xs={2}>
                  {/* <div>Date </div> */}
                  <Calendar
                    // style={{ paddingTop: 500 }}
                    weekStartDate={this.props.weekStartDate}
                    weekEndDate={this.props.weekEndDate}
                    onCalenderDateChage={this.onCalenderDateChage}
                  />
                </Grid>
              
                <Grid item xs={6} style={{display:"flex"}} className="ml-5">
                  <WeekCalender
                    calenderDate={this.state.calenderDate}
                    startEndDates={this.props.startEndDates}
                  />
                    {/* <Tooltip title="Refresh">
                  <IconButton>
                    <RefreshIcon onClick={() => this.refreshData()} style={{color:"#007b788f"}} />
                  </IconButton>
                </Tooltip> */}
                </Grid>
                {/* <Button
                className="bg-primary text-white ml-3"
             
                  onClick={() => this.refreshData()}
                >
                  Refresh
                </Button> */}
              
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
    );
  }
}

export default withStyles(useStyles)(Home);
