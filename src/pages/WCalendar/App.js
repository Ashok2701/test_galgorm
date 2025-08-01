import React from 'react';
import moment from 'moment';
//import { Counter } from './features/counter/Counter';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Appbar from "./components/Appbar";
import Drawer from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route,  withRouter } from "react-router-dom";
import Googlemaps from "./components/Googlemaps";
import Home from "./Home";
// import MainApp from './../App';
import DataTable from "./components/Datatable/Datatable";
import { fetchCall } from './ServiceCalls';

const drawerWidth = 100;
const colorCodes = ["#CD5C5C", "#E29319", "#E2CA19", "#19E277", "#19A5E2", "#4C3F9D",
  "#564C62", "#F781BE"];

const useStyles = (theme) => ({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flex: 'auto',
    backgroundColor: "#EAEAEA",
    padding: "24px 16px"
  },
  formControl: {
    width: 200
  }
});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sites: [],
      vehiclesList: [],
      operators: [],
      selectedSitesArr: [],
      selectedMultipleSites: '',
      selectedSite: 'SHERV',
        selectedSites: {
              id: 'All'
            },
      weekStartDate: moment(new Date()).startOf('isoWeek'),
      weekEndDate: moment(new Date()).endOf('week').add(1, 'days'),
      tripDetails: [],
      calenderMapDate: new Date(),
      tripList: []
    }
  }

  componentDidMount() {
    
    let date = moment(new Date()).format('YYYY-MM-DD');
    Promise.all([
      fetch('/api/v1/report/sites'),
      fetch('/api/v1/report/tripslist?date=' + date)])
      .then(([sites, mapTrips]) => {
        return Promise.all([sites.json(), mapTrips.json()])
      })
      .then(([sites, mapTrips]) => {
        let tripListData = mapTrips;
        tripListData.length > 0 && tripListData.map((trips, tripIndex) => {
          colorCodes.map((color, colorIndex) => {
            if (tripIndex === colorIndex) {
              return trips.bgcolor = color
            }
          })
        });
        this.setState({
          sites: sites,
          tripList: tripListData
        });
          
           this.OnSiteSelection(this.state.selectedSite);
      })
      
     // this.OnSiteSelection(this.state.selectedSite);
  }
  onEyeIconClick = (type, status, itemcode, index) => {
    let tripsData = this.state.tripList;
    if (tripsData && tripsData.length > 0) {
      tripsData.map((trips) => {
        if (type === "all") {
          trips.eyeIcon = !status
        } else {
          if (trips.itemCode === itemcode) {
            trips.eyeIcon = status;
          }
        }
      })
    }
    this.setState({ tripList: tripsData })
  }



  setCurrentSite = selectedOption => {
    var currSelected = {};
    
    this.state.sites && this.state.sites.map((site) => {
    
      if (selectedOption[0] === site.id) {
        currSelected = site;
        currSelected.city = site.value;
        currSelected.cur = site.cur;
        currSelected.distunit = site.distunit;
        currSelected.massunit = site.massunit;
        currSelected.volunit = site.volunit;
      }
    });
    this.setState({
      selectedSites: currSelected,
      selectedMultipleSites: selectedOption
    });
  }




  onDaysChanged = (days) => {
   
  var currDate = moment(this.state.calenderMapDate, 'YYYY-MM-DD').add(days,'days');
  var newDate = moment(currDate).format('YYYY-MM-DD');
  
   this.onMapDateChange(newDate);
  }

 sitesArr = (val) => {

    this.setCurrentSite(val);
    this.setState({ selectedSitesArr: val })
  }



  onMapDateAndSiteChange = (seldate,sites) => {

    Promise.all([fetch(`/api/v1/report/tripslistbyDateandSite?date=${seldate}&site=${sites}`)])
         .then(([trips]) => {
           return Promise.all([trips.json()])
         })
         .then(([tripsList]) => {
           let tripListData = tripsList;
           tripListData.length > 0 && tripListData.map((trips, tripIndex) => {
             colorCodes.map((color, colorIndex) => {
               if (tripIndex === colorIndex) {
                 return trips.bgcolor = color
               }
             })
           });
           this.setState({
             tripList: tripListData
           });
         });
  }










  onMapDateChange = (seldate , camefrom) => {
    
     this.setState({ calenderMapDate: seldate })
    seldate = moment(new Date(seldate)).format('YYYY-MM-DD')
    
    if(this.state.selectedSitesArr.length > 0 && camefrom !== 'uncheck'){
       
       this.onMapDateAndSiteChange(seldate, this.state.selectedSitesArr)
    }
    else {
      
    Promise.all([fetch(`/api/v1/report/tripslist?date=${seldate}`)])
      .then(([trips]) => {
        return Promise.all([trips.json()])
      })
      .then(([tripsList]) => {
        let tripListData = tripsList;
        tripListData.length > 0 && tripListData.map((trips, tripIndex) => {
          colorCodes.map((color, colorIndex) => {
            if (tripIndex === colorIndex) {
              return trips.bgcolor = color
            }
          })
        });
        this.setState({
          tripList: tripListData
        });
      });
      }
  }

  OnSiteSelection = (selSite) => {
  
    this.setState({ selectedSite: selSite })
    let startDate = moment(this.state.weekStartDate).format('YYYY-MM-DD');
    let endDate = moment(this.state.weekEndDate).format('YYYY-MM-DD');
    Promise.all([
      fetch(`/api/v1/report/vehicle?site=${selSite}`),
      fetch(`/api/v1/report/route?site=${selSite}&start=${startDate}&end=${endDate}`)
    ])
      .then(([vehicles, data]) => {
        return Promise.all([vehicles.json(), data.json()])
      })
      .then(([vehicles, data]) => {

        
        this.setState({
          vehiclesList: vehicles,
          tripDetails: data
        });
      });
  }

  OnVehicleSelection = (selVehicle) => {
    
  }

    handleSiteChange = selectedOption => {
      if(selectedOption.length > 0) {
        var currdate =  moment(this.state.calenderMapDate).format('YYYY-MM-DD');
        this.onMapDateAndSiteChange(currdate,selectedOption);
              

      }
      else{
        var currdate =  moment(this.state.calenderMapDate).format('YYYY-MM-DD');
        this.onMapDateChange(currdate , 'uncheck');
       
      }

      }




  startEndDates = (startDate, endDate) => {
    this.setState({ weekStartDate: startDate, weekEndDate: endDate })
    startDate = moment(new Date(startDate)).format('YYYY-MM-DD')
    endDate = moment(new Date(endDate)).format('YYYY-MM-DD')
    if (this.state.selectedSite) {
      Promise.all([fetch(`/api/v1/report/route?site=${this.state.selectedSite}&start=${startDate}&end=${endDate}`)])
        .then(([data]) => {
          return Promise.all([data.json()])
        })
        .then(([data]) => {
          this.setState({
            tripDetails: data
          });
        });
    }
  }

  render() {
        
    const { classes } = this.props;
    return (
       <>
        <CssBaseline />
          <main className={classes.content}>
            <div style={{ minHeight: 50 }} className={classes.toolbar} />
            calendar
                              <Home
                                sitelist={this.state.sites}
                                OnSiteSelection={this.OnSiteSelection}
                                vehiclesList={this.state.vehiclesList}
                                OnVehicleSelection={this.OnVehicleSelection}
                                startEndDates={this.startEndDates}
                                weekStartDate={this.state.weekStartDate}
                                weekEndDate={this.state.weekEndDate}
                                tripDetails={this.state.tripDetails}
                                selectedSite={this.state.selectedSite}
                              >
                              </Home>

          </main>
          </>
    );
  }
}

export default withStyles(useStyles)(withRouter(App));