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

class WCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sites: [],
      vehiclesList: [],
      operators: [],
      selectedSitesArr: [],
      selectedMultipleSites: '',
      selectedSite: '',
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


    var user = JSON.parse(localStorage.getItem("authUser"));
    console.log("inside componentDidmount");
     console.log("inside componentDidmount - user",user);
     var selSites =  sessionStorage.getItem('sites');
            var listSites = [];
            console.log("Thhh componentDidMount selSites",selSites);
            if(selSites != null) {
               listSites = selSites.split(',');
            }
    let date = moment(new Date()).format('YYYY-MM-DD');
    Promise.all([
      fetch('http://tmsportal.tema-systems.com:8082/api/v1/report/usrsites?user='+ user.username),
      fetch('http://tmsportal.tema-systems.com:8082/api/v1/report/tripslist?date=' + date)])
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

      if(listSites.length > 0) {
                  this.AlreadySelectedSites(sites, selSites, listSites);
             }
             else {
        this.DefaultSite (sites);
        }

          console.log("inside componentDidmount after success call");
           this.OnSiteSelection(selSites, 'ComponentDidMount');
      })
      console.log("inside componentDidmount before onsitechagne");
     // this.OnSiteSelection(this.state.selectedSite);
  }


  AlreadySelectedSites = (totsites, selSites , arrayList) => {
  // console.log("AlreadySelected Site",sites );
    console.log("AlreadySelected total sites",totsites );
    this.handleSiteChange(selSites);
    this.sitesArr(arrayList);
 }

   DefaultSite = (sites) => {
   let flg = false;
   let initialSite = "";
   let defSite = "";
   sites.length > 0 && sites.map((site, Index) => {
    console.log("T333 first index",Index);
      if(Index == 0){
         initialSite = site.id;
        console.log("T333 first index if",Index);
      }

      console.log("T226 inside defaulsite- site",site);
       if(site.defflg === "Yes") {
         console.log("T226 inside defaulsite- yes",site.id);
           defSite = site.id;
       }
   });
   if(defSite == "") {
        console.log("T333 inside if no default site",defSite);
        defSite = initialSite;
   }


    this.setState({
                  selectedSite : defSite
               });
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
    console.log("1 set currentsite",selectedOption);
    this.state.sites && this.state.sites.map((site) => {
    console.log("1 set sites",site);
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
   console.log("T1 inside onDaysChanged",days);
  var currDate = moment(this.state.calenderMapDate, 'YYYY-MM-DD').add(days,'days');
  var newDate = moment(currDate).format('YYYY-MM-DD');
  console.log("T1 inside onDaysChanged", newDate);
   this.onMapDateChange(newDate);
  }

 sitesArr = (val) => {
    console.log("seleted site array =",val);
    console.log("selectedSitesArr",this.state.selectedSitesArr);
    this.setCurrentSite(val);
    this.setState({ selectedSitesArr: val })
  }



  onMapDateAndSiteChange = (seldate,sites) => {

    Promise.all([fetch(`http://tmsportal.tema-systems.com:8082/api/v1/report/tripslistbyDateandSite?date=${seldate}&site=${sites}`)])
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
    console.log("T1 inside MApChanged", seldate);
     this.setState({ calenderMapDate: seldate })
    seldate = moment(new Date(seldate)).format('YYYY-MM-DD')
    console.log("T1 inside MApChanged site arraylist", this.state.selectedSitesArr);
    if(this.state.selectedSitesArr.length > 0 && camefrom !== 'uncheck'){
       console.log("T1 inside MApChanged site arraylist if", this.state.selectedSitesArr);
       this.onMapDateAndSiteChange(seldate, this.state.selectedSitesArr)
    }
    else {
      console.log("T1 inside MApChanged site arraylist else", this.state.selectedSitesArr);
    Promise.all([fetch(`http://tmsportal.tema-systems.com:8082/api/v1/report/tripslist?date=${seldate}`)])
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

  OnSiteSelection = (selSite, from) => {
  console.log("TYYY inside onSiteSelection - selSite",selSite);
  console.log("inside onSiteSelection - selSite from",from);
    this.setState({ selectedSite: selSite })
    const sdate = moment(this.state.weekStartDate).add(1, 'days');
    const edate = moment(this.state.weekEndDate).add(1, 'days');
    let startDate = moment(sdate).format('YYYY-MM-DD');
    let endDate = moment(edate).format('YYYY-MM-DD');
    Promise.all([
      fetch(`http://tmsportal.tema-systems.com:8082/api/v1/report/vehicle?site=${selSite}`),
      fetch(`http://tmsportal.tema-systems.com:8082/api/v1/report/route?site=${selSite}&start=${startDate}&end=${endDate}`)
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
    console.log("selected selVehicle", selVehicle)
  }

    handleSiteChange = selectedOption => {
      if(selectedOption.length > 0) {
        var currdate =  moment(this.state.calenderMapDate).format('YYYY-MM-DD');
         sessionStorage.setItem('sites', selectedOption);
        this.onMapDateAndSiteChange(currdate,selectedOption);
              console.log("inside handleSite Change selected sites are ", selectedOption);

      }
      else{
        var currdate =  moment(this.state.calenderMapDate).format('YYYY-MM-DD');
        this.onMapDateChange(currdate , 'uncheck');
       console.log("inside handleSite no sites exist ", selectedOption);
      }

      }



      RefreshDataforWeek = () => {

      console.log("TYYY Inside refresh at Home");
     let startDate = moment(new Date(this.state.weekStartDate)).format('YYYY-MM-DD')
      let endDate = moment(new Date(this.state.weekEndDate)).format('YYYY-MM-DD')

       console.log("Inside refresh at Home- startdate",startDate);
        console.log("Inside refresh at Home- endDate", endDate);
        console.log("Inside refresh at Home- site",this.state.selectedSitesArr);
          if (this.state.selectedSite) {
            Promise.all([fetch(`http://tmsportal.tema-systems.com:8082/api/v1/report/route?site=${this.state.selectedSitesArr}&start=${startDate}&end=${endDate}`)])
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





  startEndDates = (startDate, endDate) => {

     console.log("TYYY at startEndDAtes - start, EndDate",startDate)
      console.log("TYYY at startEndDAtes - start, EndDate",endDate)
    this.setState({ weekStartDate: startDate, weekEndDate: endDate })
    startDate = moment.tz(new Date(Date.parse(startDate)).toString(),'').format('YYYY-MM-DD')
   endDate = moment.tz(new Date(Date.parse(endDate)).toString(),'').format('YYYY-MM-DD')
       console.log("TYYY at startEndDAtes - final startDate",startDate)
          console.log("TYYY at startEndDAtes - final endDate",endDate)
    if (this.state.selectedSite) {
      Promise.all([fetch(`http://tmsportal.tema-systems.com:8082/api/v1/report/route?site=${this.state.selectedSitesArr}&start=${startDate}&end=${endDate}`)])
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
        console.log("inside App component");
    const { classes } = this.props;
    return (
       <React.Fragment>
      <div className="page-content pb-0">
           <Home
                                          sitelist={this.state.sites}
                                          OnSiteSelection={this.OnSiteSelection}
                                          vehiclesList={this.state.vehiclesList}
                                          OnVehicleSelection={this.OnVehicleSelection}
                                          startEndDates={this.startEndDates}
                                          refreshDataforWeek = {this.RefreshDataforWeek}
                                          weekStartDate={this.state.weekStartDate}
                                          weekEndDate={this.state.weekEndDate}
                                          tripDetails={this.state.tripDetails}
                                          selectedSite={this.state.selectedSite}
                                          selectedSitesArr = {this.state.selectedSitesArr}
                                          handleSiteChange={this.handleSiteChange}
                                          sitesArr={this.sitesArr}
                                        >
                                        </Home>
        </div>

           </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(withRouter(WCalendar));