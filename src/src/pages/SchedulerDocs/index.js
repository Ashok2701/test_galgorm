import React, { Component } from "react";
import Select from "react-select";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingOverlay from 'react-loading-overlay';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import SideNav from './Nav1/SideNav';
import { fetchSchedulerAPI } from '../../service';
import RouteMap1 from './Panel/RouteMap1';
import ScheduleTrips from './Panel/ExternalDragDrop';

import { fetchPanel } from '../../service';
import { fetchTrips } from '../../service';


import RouteDetails from './RouteDetail'
import { fetchSchedulerDropsPanelwithRange } from '../../service';

import { fetchVR, fetchRailVR, fetchLVS } from '../../service';
import "./dashboard.scss";
import DocumentsPanel from './Panel/DocumentsPanel';
import TripsList3 from './Panel/TripsList3';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  ButtonGroup,
  Button,
  Input,
  Label,
  FormGroup,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import classnames from "classnames";

//Import Components
import MiniWidgets from "./MiniWidgets";
import RouteInfoRenderer from "./RouteInfoRenderer";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.schedulerRef = React.createRef();
    this.state = {
     activeTab: "Vehicles",
           checkedToPlan: false,
           checked5days : false,
           isDragged : false,
          breadcrumbItems: [
            { title: "Route Planner", link: "#" },
            { title: "Dashboard", link: "#" },
          ],
          isTimeline: false,
          vehicleShow: 'block',
          RouteoptiShow : 'none',
          vrShow: 'none',
     vrlist: [],
        bl_markers : [],
           bl_tripsList : {},
           initalload: true,
        deliverySite: '',
       searchVString: '',
       searchSiteString : '',
       searchTString: '',
       searchEString: '',
       searchDString: '',
       searchDrpString: '',
       searchPckString: '',
        panelSearchString: '',
          vrdetaillist: [],
          loadvehstock: [],
          slectedTrips: [],
          selectedTripData: {},
      allowedDrivers: [],
          allAllowedDrivers: false,
            allAllowedTrailers: false,
          vehicleDropped : false,
          droppedTrailers : [],
          allowedTrailers: [],
          isDetail: false,
      date: new Date(),
      sites: null,
      selectedSite: {
        id: 'All'
      },
      selectedSiteValue: '',
            guageTrip: {},
            selectedMultipleSites: '',
              markers: [],
                geoData: [],
                  mapChanged: false,
                     clearTrips: false,
            isTimeline: false,
              trailers: [],
            isDetail: false,
            selectedVrIndex: '',
            selectedVrValidated: '',
            slectedTrips: [],
            clickedTrips: [],
            selectedTripData: {},
            default_date: new Date(),
            dropDate: new Date(),
            selectedPlace: {},
              triplock : false,


      selectedSiteValue: '',
       SelectedGroupBy : 'Vehicles',
      trips: [],
      vehiclePanel: {
        vehicles: [],
        equipments: [],
        trails: [],
        drivers: []
      },
      dropsPanel: [],
      dataTransfer: {
        currentCard: "",
        type: "",
        id: "",
        index: -1
      },
      tripColor: [
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0"
      ],
      tripbgColor: [
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541"
      ],
      pickOrder: [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
      ],
      dropOrder: [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
      ],
      equpOrder: [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
      ],
      diverOrder: [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
      ],
      vehOrder: [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
      ],
      trailOrder: [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
      ],
      topDetails: {
        vehicleCount: 0,
        routesCount: 0,
        assignedOrders: 0,
        unassignedOrders: 0,
        searchDrpString : '',
        travelTime: 0,
        serviceTime: 0,
        DropProdCount: 0,
        PickupProdCount: 0
      },
      tripsPanel: [],
      CurrentWeekTrips : [],
      selectedSitesArr: [],
      reports: [
        {
          icon: "ri-truck-line",
          background: "bg-secondary",
          title: "Vehicles",
          value: "0",
        },
        {
          icon: "ri-route-line",
          background: "bg-primary",
          title: "Routes",
          value: "0",
        },
        {
          icon: "ri-checkbox-circle-line",
          background: "bg-success",
          title: "Assigned Orders",
          value: "0",
        },
        {
          icon: "ri-close-circle-line",
          background: "bg-warning",
          title: "Not Assigned Orders",
          value: "0",
        },
        {
          icon: "ri-logout-box-r-line",
          background: "bg-danger",
          title: "Total Delivery Qty",
          value: "0",
        },
        {
          icon: "ri-logout-box-line",
          background: "bg-info",
          title: "Total Pickup Qty",
          value: "0",
        },
      ],
      googeMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCezUPUlJ28J6S_1o7TDwjoKW2si4o4U4c&v=3.exp&libraries=geometry,drawing,places'

    };
    this.toggleTab = this.toggleTab.bind(this);
   // this.handleDefault = this.handleDefault.bind(this);
   // this.onMarkerClick = this.onMarkerClick.bind(this);
    this.toggleDetail = this.toggleDetail.bind(this);
    this.tog_standard = this.tog_standard.bind(this);
    this.googleMapRef = React.createRef();
  }

  tog_standard() {
    this.setState((prevState) => ({
      modal_standard: !prevState.modal_standard,
    }));
    this.removeBodyCss();
  }

  removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  toggleDetail(flag) {
    if (this.state.isDetail !== flag) {
      this.setState({ isDetail: flag });
    }
  }


 updateMagChaged = () => {
    this.setState({
      mapChanged: false
    });
  }


  updateDropSearchTerm = (event) => {
         this.setState({ searchDrpString: event.target.value });
       }

  colourDivs = (allDrivers, dlist, allTrailers, tlist) => {
    console.log("T22 - inside  index, change colorDivs");
    this.setState({
      allAllowedDrivers: allDrivers,
      allAllowedTrailers: allTrailers,
      allowedDrivers: dlist,
      vehicleDropped: true,
      allowedTrailers: tlist
    });

    console.log("T22 after assiging -vehicleDropped", this.state.vehicleDropped);
  }
  colourDocDivs = (drpTrailer) => {
    if (drpTrailer !== null || drpTrailer !== '') {
      this.setState({
        trailerDropped: true,
        droppedTrailers: drpTrailer
      });
    }
  }


  handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }


  refreshTrips = () => {
    this.updateGeoLocations();
    this.removeTrips();
  }


  filterTrans_depSite = (site) => {
    this.setState({ deliverySite: site });
  }



  updateTrip = (trip) => {
    this.setState({
      trips: trip
    });
    // this.removeMarkers();
  }


  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

    checkedToPlan = (checked) => {
     console.log("T22 inside app checkedToPlan");
      this.setState({ checkedToPlan: checked })
    }

  setCurrentSite = selectedOption => {
    var currSelected = {};
    this.state.sites && this.state.sites.map((site) => {
      if (selectedOption[0] === site.id) {
        currSelected = site;
        currSelected.city = site.value;
      }
    });
    this.setState({
      selectedSite: currSelected,
      selectedMultipleSites: selectedOption
    });
  }

  refreshAllPanels = () => {
    const emptyTrip = [];
    this.setState({
      loading: true,
      trips: emptyTrip
    });
    console.log("T11 inside refreshAllpanels", this.state.trips);
    console.log("T11 inside refreshAllpanels", this.state.date);
  //  this.handleDateChange(this.state.date);
  }



  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    var timeLineContainer = document.querySelector(".timeline-container");
    var dropZone = {
      getContainer: function () {
        return timeLineContainer;
      },
      onDragStop: function (params) {
        const el = document.querySelector(".timeline-data");
        el.classList.remove("d-none");
        // var el = document.createElement("div");
        // el.classList.add("tile");
        // el.innerHTML =
        //   '<div class="id">' + params.node.data.vehicle_code + "</div>";
        // timeLineContainer.appendChild(el);
      },
    };
    params.api.addRowDropZone(dropZone);
  }


  sitesArr = (val) => {
    this.setCurrentSite(val);
    this.setState({ selectedSitesArr: val })
  }

  componentDidMount() {

    var user = JSON.parse(localStorage.getItem("authUser"));
    const currDate = moment(new Date()).format('YYYY-MM-DD');
    console.log("T11 component did mount", currDate);
    console.log("T11 component did mount", this.state.date);
    Promise.all([fetch('/api/v1/scheduler/usrsites?user=' + user.username)])
      .then(([res1]) => {
        return Promise.all([res1.json()])
      }).then(([res1]) => {
        this.setState({
          sites: res1
        });
      });
  }


  updateSelectedSite = (siteId) => {
    var curSites = this.state.sites;
    for (var i = 0; i < curSites.length; i++) {
      if (curSites[i].id == siteId) {
        this.setState({ selectedSite: curSites[i] });
      }
    }
  }

  handleSiteChange = selectedOption => {
    console.log("site change", selectedOption);
    console.log("date =", this.state.date);
    this.setCurrentSite(selectedOption);
    const currDate = moment(this.state.date).format('YYYY-MM-DD');
    var FirstDate , LastDate
    [FirstDate, LastDate] = this.startAndEndOfWeek(currDate);
    console.log("after assign current date =", currDate);
    var StartDate =  moment(FirstDate).format("YYYY-MM-DD");
               var EndDate = moment(LastDate).format("YYYY-MM-DD");

     if(this.schedulerRef.current.scheduleObj.currentView === 'TimelineWeek')
       {
        fetchSchedulerAPI(selectedOption, StartDate,EndDate)
              .then(([res1, res2, res3]) => {
                this.setState({
                  vehiclePanel: res1,
                  dropsPanel : res2,
                  tripsPanel: res3

                });
                }).then(() => {
                              this.updateTopBar();
                              this.refreshSite();
              })
      }
      else {

             fetchSchedulerAPI(selectedOption, currDate)
      .then(([res1, res2, res3]) => {
        this.setState({
          vehiclePanel: res1,
          dropsPanel : res2,
          tripsPanel: res3

        });
      }).catch(error => {

      });

      }

  };


  refreshSite = () => {
    this.updateGeoLocations();
    this.enableDroppedDiv();
    this.removeTrips();
  }



  updateGeoLocations = () => {
    this.removeMarkers();
    this.setState({
      mapChanged: true
    });
  };

  removeMarkers = () => {
    this.setState({
      markers: [],
      geoData: []
    }, this.addStateMarker);

  }

  addStateMarker = () => {
    if (this.state.selectedSite.lat != undefined) {
      let currMarkers;
      if (this.state.markers.length > 0) {
        currMarkers = this.state.markers;
      } else {
        currMarkers = []
        currMarkers.push(this.state.selectedSite);
      }
      this.setState({
        markers: currMarkers,
        mapChanged: true
      });
    }
  }

  removeGeoMarkers = () => {
    var currMarkers = [];
    this.setState({
      geoMarkers: currMarkers
    });
  }



  OnGroupByChange = (selected) => {
    this.setState({
      SelectedGroupBy: selected
    });


  }


  addGeoLocations = (geoObj) => {
    const currMarkers = this.state.markers;
    currMarkers.push(geoObj);
    // currMarkers = this.startAndEndDeport(currMarkers, this.state.trips[0])
    this.setState({
      markers: currMarkers,
      mapChanged: true
    });
  };

  addGeoList = (geoData, index) => {
    const currData = this.state.geoData;
    currData.push(geoData);
    var selectedTrips = this.state.slectedTrips;
    selectedTrips.push(geoData);
    var tripColor = this.state.tripColor;

    if (geoData.panelType === 'drop') {
      tripColor[index - 1] = '#7ace4c';
    } else {
      tripColor[index - 1] = '#09aaed';
    }

    this.setState({
      geoData: currData,
      tripColor: tripColor,
      selectedTripData: geoData,
      slectedTrips: selectedTrips,
      left: index * 55
    });
  };

  addSelectedTrips = (count) => {
    var slctTrips = this.state.slectedTrips;
    var emptyTrip = {};
    for (var i = 0; i < count; i++) {
      slctTrips.push(emptyTrip);
    }
    this.setState({
      slectedTrips: slctTrips,
      left: count
    });
  }

  handleDateChange = () => {
  }


  startAndEndOfWeek = (date) => {
    const now = date ? new Date(date) : new Date().setHours(0, 0, 0, 0);
    const sunday = new Date(now);
    sunday.setDate(sunday.getDate() - sunday.getDay() + 0);
    const satday = new Date(now);
    satday.setDate(satday.getDate() - satday.getDay() + 6);
    return [sunday , satday];
  }

  handleDateRangeChange = () => {
   var satday , sunday;
   const events = this.schedulerRef;
   console.log("insdie handleDateChagnge -",events);
    const clickedDate = this.schedulerRef.current.scheduleObj.selectedDate;
   if(this.schedulerRef.current.scheduleObj.currentView === 'TimelineWeek')
   {
     console.log("insdie handleDateChagnge selected week -");
     [sunday , satday] = this.startAndEndOfWeek(clickedDate);
     var StartDate =  moment(sunday).format("YYYY-MM-DD");
     var EndDate = moment(satday).format("YYYY-MM-DD");

     console.log("start date =",StartDate);
     console.log("End date =",EndDate);

  fetchSchedulerAPI(this.state.selectedMultipleSites, StartDate,EndDate)
               .then(([res1, res2, res3]) => {
                 this.setState({
                   vehiclePanel: res1,
                   dropsPanel : res2,
                   tripsPanel: res3,
                    date : clickedDate,
                 });
               });

   }
   }


  /*
    updateTripsGeoLocations = (index , status) => {
     // var checkboxes = document.getElementsByName("tripsCheckBox");
      console.log("inside updateTripgeo");
     var checkboxes = this.state.tripsPanel;
      const currMarkers = [];
      const currGeoData = [];
      if (typeof (this.state.selectedSite) === "string") {
        if (this.state.sites.length > 0) {
          this.state.sites.map((site) => {
            if (site.id === this.state.selectedSite) {
              currMarkers.push(site)
            }
          })
        }
      } else if (this.state.selectedSite.lat != undefined) {
        currMarkers.push(this.state.selectedSite);
      }
  
      if (status) {
         console.log("inside updateTripgeo if",status);
        this.removeTrips();
  //      checkboxes[index].checked = true;
  
        this.updateTripsPanel(currMarkers, currGeoData, index);
        this.setState({ selectedIndex: index, checkedTrip: true, RouteoptiShow:'block' })
      } else {
       console.log("inside updateTripgeo else",status);
        this.removeTrips();
        let marker = [];
        marker.push(currMarkers[0])
        this.setState({
          markers: marker, mapChanged: true,
          geoData: currGeoData, tripsChecked: [], checkedTrip: false
        });
      }
    }
  */
  updateSelectedTrip = (count) => {
    var selectedTrips = this.state.slectedTrips;
    this.setState({
      selectedTripData: selectedTrips[count],
      left: (count + 1) * 55,
    });
  }


  updateTripsPanel = (currMarkers, currGeoData, i) => {


    console.log("inside updateTripsPanel - 1");
    var tripsPanels = this.state.tripsPanel;
    var selectedTrip = [];
    var selectedTrips = [];
    var quantities = [];
    var gTrip = this.state.guageTrip;
    gTrip = tripsPanels[i];
    var slectTrip = tripsPanels[i].totalObject;
    tripsPanels[i].timelineInterval = slectTrip.timelineInterval;
    selectedTrips = slectTrip.selectedTripData;
    quantities = slectTrip.quantities;
    selectedTrip.push(tripsPanels[i]);

    console.log("inside updateTripsPanel - 2");
    for (var j = 0; j < tripsPanels[i].dropObject.length; j++) {

      console.log("inside updateTripsPanel - 3");
      tripsPanels[i].dropObject[j].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].dropObject[j].lock = tripsPanels[i].lock;
      currMarkers.push(tripsPanels[i].dropObject[j]);
    }
    this.updateSelectedTrip(selectedTrips.length);
    var tripColor = [
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0"
    ];
    console.log("inside updateTripsPanel - 4", selectedTrips.length);
    var count = selectedTrips.length;
    for (var i = 0; i < selectedTrips.length; i++) {

      if (Object.keys(selectedTrips[i]).length != 0) {
        if (selectedTrips[i].panelType === 'drop') {
          tripColor[i] = '#7ace4c';
        } else if (selectedTrips[i].panelType === 'pickup') {
          tripColor[i] = '#09aaed';
        }
        currGeoData.push(selectedTrips[i]);
      }
    }
    console.log("inside index - updateTripspanel - 5");
    this.setState({
      trips: selectedTrip,
      guageTrip: gTrip,
      tripColor: tripColor,
      slectedTrips: selectedTrips,
      selectedTripData: selectedTrips[count - 1],
      left: (count) * 55,
      quantities: quantities,
      geoData: currGeoData,
      markers: currMarkers,
      mapChanged: true,
      tripsChecked: selectedTrip
    });
  }


  removeTrips = () => {
    // this.clearAllCheckBoxes();
    this.setState({
      trips: [],
      guageTrip: {},
      selectedTrips: 0,
      trailers: [],
      equipments: [],
      quantities: [],
      left: 0,
      selectedTripData: {},
      tripColor: [
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0"
      ],
      slectedTrips: []
    });
  }


  handleDragStart = (event, valueObj, type, index, id) => {
    console.log("3 inside handldragStart at index - event", event);
    console.log("3 inside handldragStart at index - valueobj", valueObj);
    console.log("3 inside handldragStart at index - type", type);
    console.log("3 inside handldragStart at index - index", index);




    event.dataTransfer.setData("currentCard", JSON.stringify(valueObj));
    event.dataTransfer.setData("type", type);
    event.dataTransfer.setData("row-id", id);
    event.dataTransfer.setData("index", index);

    console.log("3 inside handledrag - dataTranser after", event);
    console.log("3 inside handledrag - is dragged after", event.dataTransfer);

  }

  enableDivs = (trails, type) => {
    let vPanel = this.state.vehiclePanel
    vPanel.trails.map((vTrial) => {
      trails.map((trail) => {
        if (trail.trailer === vTrial.trailer) {
          vTrial.type = 'open'
        }
      })
    })
    this.setState({ vehiclePanel: vPanel })
  }


  updateClearTripsFlag = () => {
    this.setState({
      clearTrips: false
    });
  }

  handleArrSite = (siteLabel, type) => {
    let currMarkers = this.state.markers;
    let arrivalSite = {};
    let depSite = {};
    if (currMarkers && currMarkers.length > 0) {
      currMarkers.map((marker) => {
        this.state.sites && this.state.sites.map((site) => {
          if (type === "end" && site.id === siteLabel) {
            if (marker.arrivalCheck === 'arrival') {
              let removeObjIndex = currMarkers.findIndex(data => data.arrivalCheck === "arrival");
              currMarkers.splice(removeObjIndex, 1);
              arrivalSite.city = site.value;
              arrivalSite.docnum = site.value;
              arrivalSite.idd = site.id;
              arrivalSite.lat = site.lat;
              arrivalSite.lng = site.lng;
              arrivalSite.value = site.value;
              arrivalSite.arrivalCheck = "arrival";
            }
            else {
              arrivalSite.city = site.value;
              arrivalSite.docnum = site.value;
              arrivalSite.idd = site.id;
              arrivalSite.lat = site.lat;
              arrivalSite.lng = site.lng;
              arrivalSite.value = site.value;
              arrivalSite.arrivalCheck = "arrival";
            }
          }

          if (type === "start" && site.id === siteLabel) {
            depSite.city = site.value;
            depSite.docnum = site.value;
            depSite.id = site.id;
            depSite.lat = site.lat;
            depSite.lng = site.lng;
            depSite.value = site.value;
          }
        })
      })
      if (type === "end" && !(currMarkers[0].lat === arrivalSite.lat && currMarkers[0].lng === arrivalSite.lng)) {
        if (Object.keys(arrivalSite).length > 0) {
          currMarkers.push(arrivalSite);
        }
      }
      if (type === "start" && !(currMarkers[0].lat === depSite.lat && currMarkers[0].lng === depSite.lng)) {
        if (Object.keys(depSite).length > 0) {
          currMarkers = [];
          currMarkers.push(depSite);
        }
      }
    }
    this.setState({
      markers: currMarkers,
      mapChanged: true, tripsChecked: []
    })
  }

  updateResetTrip = (trip) => {
    this.setState({
      trips: trip,
      equipments: []
    });
    this.removeMarkers();
  }

  updateTrip = (trip) => {
    this.setState({
      trips: trip
    });
    // this.removeMarkers();
  }

  updateTrialers = (trailer) => {
    this.setState({
      trailers: trailer

    });
  }

  updateQuantities = (quantity) => {
    this.setState({
      quantities: quantity
    });
  }

  updateEqupments = (equipment) => {
    this.setState({
      equipments: equipment
    });
  }

  updateTripCount = () => {
    var tripCount = this.state.selectedTrips;
    tripCount += 12;
    this.setState({
      selectedTrips: tripCount
    });
  }

  removeTrips = () => {
    this.clearAllCheckBoxes();
    this.setState({
      trips: [],
      guageTrip: {},
      selectedTrips: 0,
      trailers: [],
      equipments: [],
      quantities: [],
      left: 0,
      selectedTripData: {},
      tripColor: [
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0"
      ],
      slectedTrips: []
    });
  }

  clearTrailers = () => {
    this.setState({
      trailers: []
    })
  }

  clearEquipments = () => {
    this.setState({
      equipments: [],
      quantities: []
    });
  }


  disableDroppedDiv = (divTag) => {
    console.log("T31 inside disable Drooped Div", divTag);
    var temp = "[row-id=" + divTag + "]";
    //  var htmlDiv = document.getElementById(divTag);
    console.log("T31 inside disable Drooped Div temp", temp);
    var htmlDiv = document.querySelectorAll(temp);
    var { droppedDivs } = this.state;
    console.log("T31 inside disable Drooped Div htmldiv", htmlDiv);
    droppedDivs.push(temp);
    this.setState({ droppedDivs });
  }

  handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  updateTripValue = (count, tripData) => {
    var currLeft = this.state.left;
    var tripColor = this.state.tripColor;
    if (tripData.panelType === 'drop') {
      tripColor[count] = '#7ace4c';
    } else {
      tripColor[count] = '#09aaed';
    }
    var currSlectedTrips = this.state.slectedTrips;
    currSlectedTrips.push(tripData);
    setTimeout(() => {
      this.setState({
        left: currLeft + 55,
        tripColor: tripColor,
        selectedTripData: tripData,
        slectedTrips: currSlectedTrips
      });
    }, 10);
  }

  updateSelectedTrip = (count) => {
    var selectedTrips = this.state.slectedTrips;
    this.setState({
      selectedTripData: selectedTrips[count],
      left: (count + 1) * 55,
    });
  }

  onValidateAll = () => {
    var tripsPanels = this.state.tripsPanel;
    fetch('/api/v1/transport/groupvalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tripsPanels)
    }).then((response) => {
      this.handleErrors(response);
    }).then(function (response) {
    }).then(() => {
      this.handleDateChange(this.state.date);
    }).then(() => {
      this.setState({ loading: false });
      this.notifySucess("Trips Validated Sucessfully");
    }).catch(error => {
      this.handleDateChange(this.state.date);
      this.setState({ loading: false });
      this.notifyError("Can't validate the Trips");
    });
  }









  validate = (i) => {
    console.log("s1 - inside validate");
    var tripsPanels = this.state.tripsPanel;
    var ClickedTrip = tripsPanels[i];
    let trips = ClickedTrip;
    fetch('/api/v1/transport/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trips)
    }).then((response) => {
      this.handleErrors(response);
    }).then(function (response) {
    }).then(() => {
      this.handleDateChange(this.state.date);

    }).then(() => {
      this.updateMaprelatedstuff(i);
    }).then(() => {
      this.setState({ loading: false });
      this.notifySucess("Trip Validated Sucessfully");
      // call vrClick functionality
    }).catch(error => {
      this.handleDateChange(this.state.date);
      this.setState({ loading: false });
      this.notifyError("Can't validate the Trip");
    });
  }



  refreshVRScreens = (code) => {

    fetchRailVR(code)
      .then(([res1, res2, res3, res4]) => {
        this.setState({
          vrlist: res1,
          vrdetaillist: res2,
          comboData: res3,
          boldetail: res4
        });
      }).catch(error => {
        // history.push('/');
      });

  }


  railcarStatus_Change = (code, status) => {
    console.log("s1 - inside validate");
    let StatusupdateDetail = {
      "code": code,
      "status": status
    }
    fetch('/api/v1/rail/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(StatusupdateDetail)
    }).then((response) => {
      this.handleErrors(response);
    }).then(() => {
      this.setState({ loading: false });
      this.notifySucess("RailCar Status Updated Sucessfully");
      // call vrClick functionality
      fetchRailVR(code)
        .then(([res1, res2, res3, res4]) => {
          this.setState({
            vrlist: res1,
            vrdetaillist: res2,
            comboData: res3,
            boldetail: res4
          });
        }).catch(error => {
          // history.push('/');
        });
    });


  }



  validateonly = (i, pageType) => {
    console.log("s1 - inside validate");
    var tripsPanels = this.state.tripsPanel;
    var ClickedTrip = tripsPanels[i];
    let trips = ClickedTrip;
    fetch('/api/v1/transport/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trips)
    }).then((response) => {
      this.handleErrors(response);
    }).then(() => {
      this.setState({ loading: false });
      this.notifySucess("Trip Validated Sucessfully");
      // call vrClick functionality
      if (pageType === 'vrHeader') {
        var tripsPanels = this.state.tripsPanel;
        var selVR_num = tripsPanels[i].itemCode;
        fetchLVS(selVR_num)
          .then(([res1]) => {
            this.setState({
              loadvehstock: res1
            });
          }).then(() => {
            this.setState({ selectedVrValidated: true })
          }).catch(error => {
            // history.push('/');
          });
      }
    }).catch(error => {
      this.handleDateChange(this.state.date);
      this.setState({ loading: false });
      this.notifyError("Can't validate the Trip");
    });
  }

  updateMaprelatedstuff(index) {
    const currMarkers = [];
    const currGeoData = [];
    if (typeof (this.state.selectedSite) === "string") {
      if (this.state.sites.length > 0) {
        this.state.sites.map((site) => {
          if (site.id === this.state.selectedSite) {
            currMarkers.push(site)
          }
        })
      }
    } else if (this.state.selectedSite.lat != undefined) {
      currMarkers.push(this.state.selectedSite);
    }
    this.removeTrips();
    this.updateTripsPanel(currMarkers, currGeoData, index);
  }

  updateTripsGeolocationbeforelock = (index) => {
    console.log("inside updateTRipGeolocations")
    const currMarkers_bl = [];
    const currGeoData_bl = [];
    if (typeof (this.state.selectedSite) === "string") {
      if (this.state.sites.length > 0) {
        this.state.sites.map((site) => {
          if (site.id === this.state.selectedSite) {
            currMarkers_bl.push(site);
          }
        });
      }
    } else if (this.state.selectedSite.lat != undefined) {
      currMarkers_bl.push(this.state.selectedSite);
    }
    this.updateTripsPanel_beforeLocking(currMarkers_bl, index);
  }




  updateTripsGeoLocations = (index) => {
    var checkboxes = document.getElementsByName("tripsCheckBox");
    const currMarkers = [];
    const currGeoData = [];
    if (typeof (this.state.selectedSite) === "string") {
      if (this.state.sites.length > 0) {
        this.state.sites.map((site) => {
          if (site.id === this.state.selectedSite) {
            currMarkers.push(site)
          }
        })
      }
    } else if (this.state.selectedSite.lat != undefined) {
      currMarkers.push(this.state.selectedSite);
    }
 console.log("T5 inside index - updategeo",checkboxes[index].checked);
    if (checkboxes[index].checked) {
      this.removeTrips();
      checkboxes[index].checked = true;

      this.updateTripsPanel(currMarkers, currGeoData, index);
      this.setState({ selectedIndex: index, checkedTrip: true })
    } else {
      this.removeTrips();
      let marker = [];
      marker.push(currMarkers[0])
      this.setState({
        markers: marker, mapChanged: true,
        geoData: currGeoData, tripsChecked: [], checkedTrip: false
      });
    }
  }


  ResetUpdateTrip = () => {
    const currMarkers = [];
    const currGeoData = [];
    this.setState({
      markers: currMarkers,
      geoData: currGeoData,
      trailers: [],
      equipments: [],
      quantities: [],
      left: 0,
      selectedTripData: {},
      tripColor: [
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0"
      ],
      slectedTrips: [],
    });
  }

  updateTripsPanel_beforeLocking(currMarkers_bl, i) {
    console.log("beforelocking=", this.state.tripsPanel);
    var tripsPanels = this.state.tripsPanel;
    var tripsList_bl = tripsPanels[i];
    //  console.log("beforelocking=",tripsPanels[i].totalObject);
    var slectTrip_bl = tripsPanels[i].totalObject;
    var selectedTrip_bl = slectTrip_bl.selectedTripData;
    for (var j = 0; j < tripsPanels[i].dropObject.length; j++) {
      tripsPanels[i].dropObject[j].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].dropObject[j].lock = tripsPanels[i].lock;
      currMarkers_bl.push(tripsPanels[i].dropObject[j]);
    }
    this.setState({
      clickedTrips: tripsList_bl,
      bl_tripsList: tripsList_bl,
      bl_selectedTripData: selectedTrip_bl,
      bl_markers: currMarkers_bl,
      triplock: false,
      vehicleShow: 'none',
      RouteoptiShow: 'none',
      vrShow: 'block'
    });
  }


  updateTripsPanel = (currMarkers, currGeoData, i) => {
    var tripsPanels = this.state.tripsPanel;
    var selectedTrip = [];
    var selectedTrips = [];
    var trailers = [];
    var equipments = [];
    var quantities = [];
    var gTrip = this.state.guageTrip;
    gTrip = tripsPanels[i];
    var slectTrip = tripsPanels[i].totalObject;
    tripsPanels[i].timelineInterval = slectTrip.timelineInterval;
    selectedTrips = slectTrip.selectedTripData;
    trailers = slectTrip.trailers;
    equipments = slectTrip.equipments;
    quantities = slectTrip.quantities;
    selectedTrip.push(tripsPanels[i]);
    for (var j = 0; j < tripsPanels[i].dropObject.length; j++) {
      tripsPanels[i].dropObject[j].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].dropObject[j].lock = tripsPanels[i].lock;
      currMarkers.push(tripsPanels[i].dropObject[j]);
    }

    this.updateSelectedTrip(selectedTrips.length);
    var tripColor = [
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0"
    ];
    var count = selectedTrips.length;
    for (var i = 0; i < selectedTrips.length; i++) {

      if (Object.keys(selectedTrips[i]).length != 0) {
        if (selectedTrips[i].panelType === 'drop') {
          tripColor[i] = '#7ace4c';
        } else if (selectedTrips[i].panelType === 'pickup') {
          tripColor[i] = '#09aaed';
        }
        currGeoData.push(selectedTrips[i]);
      }
    }
    this.setState({
      trips: selectedTrip,
      guageTrip: gTrip,
      tripColor: tripColor,
      slectedTrips: selectedTrips,
      selectedTripData: selectedTrips[count - 1],
      left: (count) * 55,
      trailers: trailers,
      equipments: equipments,
      quantities: quantities,
      geoData: currGeoData,
      markers: currMarkers,
      mapChanged: true,
      tripsChecked: selectedTrip
    });
  }

  onSaveNotes = (note) => {
    this.setState({
      notes: note
    });
  }

  clearAllCheckBoxes = () => {
    var checkboxes = document.getElementsByName("tripsCheckBox");
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  }

  selectAllTripsPanel = () => {
    this.removeTrips();
    var checkB = document.getElementById("tripsCheckBoxAll");
    const currMarkers = [];
    const currGeoData = [];
    if (this.state.selectedSite.lat != undefined) {
      currMarkers.push(this.state.selectedSite);
    }
    if (checkB.checked) {
      var checkboxes = document.getElementsByName("tripsCheckBox");
      var tripsPanels = this.state.tripsPanel;

      for (var i = 0; i < checkboxes.length; i++) {
        var checkBox = checkboxes[i];
        checkBox.checked = true;
        if (null !== tripsPanels[i].dropObject && null !== tripsPanels[i].pickupObject) {
          for (var j = 0; j < tripsPanels[i].dropObject.length; j++) {
            tripsPanels[i].dropObject[j].itemCode = tripsPanels[i].itemCode;
            tripsPanels[i].dropObject[j].lock = tripsPanels[i].lock;
            currMarkers.push(tripsPanels[i].dropObject[j]);
            currGeoData.push(tripsPanels[i].dropObject[j]);
          }
          for (var k = 0; k < tripsPanels[i].pickupObject.length; k++) {
            tripsPanels[i].pickupObject[k].type = "pickup";
            tripsPanels[i].pickupObject[k].itemCode = tripsPanels[i].itemCode;
            tripsPanels[i].pickupObject[k].lock = tripsPanels[i].lock;
            currMarkers.push(tripsPanels[i].pickupObject[k]);
            currGeoData.push(tripsPanels[i].pickupObject[k]);
          }
        }
      }
      this.setState({ selectedTripData: tripsPanels, tripsChecked: tripsPanels })
    } else {
      var checkboxes = document.getElementsByName("tripsCheckBox");
      for (var i = 0; i < checkboxes.length; i++) {
        var checkBox = checkboxes[i];
        checkBox.checked = false;
      }
    }

    this.setState({
      markers: currMarkers,
      geoData: currGeoData,
      mapChanged: true
    });
  }

  updateTimeLine = () => {
    var elements = document.getElementsByName('docNum');
    var docElements = [];
    var currTripsLine = this.state.slectedTrips;
    var tripColor = [
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0"
    ];
    for (var k = 0; k < currTripsLine.length; k++) {
      if (currTripsLine[k].docnum == undefined) {
        docElements.push(currTripsLine[k]);
      }
    }
    for (var i = 0; i < elements.length; i++) {
      for (var j = 0; j < currTripsLine.length; j++) {
        if (elements[i].innerText === currTripsLine[j].docnum) {
          docElements.push(currTripsLine[j]);
          if (currTripsLine[j].panelType === 'drop') {
            tripColor[docElements.length - 1] = '#7ace4c';
          } else if (currTripsLine[j].panelType === 'pickup') {
            tripColor[docElements.length - 1] = '#09aaed';
          }
        }
      }
    }
    this.setState({
      reorder: true,
      tripColor: tripColor,
      slectedTrips: docElements,
      selectedTripData: docElements[docElements.length - 1],
      left: docElements.length * 55
    });
  }


  onVRClick = (i) => {
    var tripsPanels = this.state.tripsPanel;
    var selectedTrip = [];
    var selectedTrips = [];
    var trailers = [];
    var selVR_num = tripsPanels[i].itemCode;
    var ClickedVR = tripsPanels[i];

    //caling API

    fetchRailVR(selVR_num)
      .then(([res1, res2, res3, res4]) => {
        this.setState({
          vrlist: res1,
          vrdetaillist: res2,
          comboData: res3,
          boldetail: res4
        });
      }).then(() => {
      }).catch(error => {
        // history.push('/');
      });
    if (this.state.markers && this.state.markers.length == 0) {
      this.state.sites.map((site) => {
        if (this.state.selectedSite === site.id) {
          let marker = [];
          marker.push(site)
          this.setState({ markers: marker })
        }
      })
    }
    this.setState({
      clickedTrips: ClickedVR,
      selectedVrIndex: i,
      triplock: true,
      vehicleShow: 'none',
      RouteoptiShow: 'none',
      vrShow: 'block'
    });
  }

  onVRhide = () => {
    this.setState({
      vehicleShow: 'block',
      RouteoptiShow: 'none',
      vrShow: 'none'
    });
  }

  onRouteoptihide = () => {
    this.setState({
      vehicleShow: 'block',
      RouteoptiShow: 'none',
      vrShow: 'none'
    });
  }

  onLoadermessage = (tripindex, msg) => {
    var tripsPanels = this.state.tripsPanel;
    var tripsList_loader = tripsPanels[tripindex];
    tripsList_loader.loaderInfo = msg;

    console.log("loader msg - trip", tripsList_loader);
    this.confirmTrip(tripsList_loader, "loaderMsg");

  }

  onForcesequnceCheck = (tripindex, msg) => {

    console.log("foced check msg - trip", msg);
    var tripsPanels = this.state.tripsPanel;
    var trips = []
    var tripsList_force = tripsPanels[tripindex];
    tripsList_force.date = moment(this.state.date).format("YYYY-MM-DD");
    if (msg) {
      tripsList_force.forceSeq = true;
    }
    else {
      tripsList_force.forceSeq = false;
    }
    trips.push(tripsList_force);
    this.submitTrips(trips);
  }


  onDocmessage = (docNum, msg, Msgtype) => {
    var currentGeoData = this.state.geoData;
    var currentMarkers = this.state.markers;
    var trips = [];
    var geoData = [];
    var currMarkers = [];
    var trip = this.state.trips[0];

    currentGeoData && currentGeoData.map((geoData, index) => {
      if (geoData.docnum && geoData.docnum === docNum) {
        if (Msgtype === 'doc') {
          geoData.noteMessage = msg
        }
        else if (Msgtype === 'carrier') {
          geoData.CarrierMessage = msg
        }
        else {
          geoData.loaderMessage = msg
        }

      }
    })

    currentMarkers && currentMarkers.map((currMarker, index) => {
      if (currMarker.docnum && currMarker.docnum === docNum) {
        currMarker.noteMessage = msg
      }
    })
    trip && trip.totalObject && trip.totalObject.selectedTripData && trip.totalObject.selectedTripData.map((TripData) => {

      if (TripData.docnum && TripData.docnum === docNum) {
        if (Msgtype === 'doc') {
          console.log("inside doc type at app", Msgtype);
          TripData.noteMessage = msg
        }
        else if (Msgtype === 'carrier') {

          TripData.CarrierMessage = msg
        }
        else {

          TripData.LoaderMessage = msg
        }
      }
    });

    geoData.push(currentGeoData);
    currMarkers.push(currentMarkers);
    trips.push(trip);

    this.setState({
      markers: currentMarkers,
      geoData: currentGeoData,
      trips: trips,
    })
  }



  lockTrip = (trips, index) => {
    console.log("inside final lock tripp");
    var tripsPanel = this.state.tripsPanel;
    tripsPanel[index].lock = true;
    fetch('/api/v1/rail/lock/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trips)
    }).then((response) => {
      this.notifySucess("RailTrip Generated in X3 Sucessfully");
      this.setState({
        tripsPanel: tripsPanel
      });
    }).catch(error => {

      this.notifyError("Issue with Generating Route in X3");
    });
  }


  railcarChecked_fn = (i) => {

    var checkboxes = document.getElementsByName("railcarCheckBox");

    console.log("inside railcarChecked - ", checkboxes[i].checked);
    if (checkboxes[i].checked) {

      console.log("Inside railCar Checked at index");
      var carlist = this.state.railcarCheckInList;

      var CheckedRailcar = carlist[i];

      this.setState({
        railcarIsChecked: true,
        CheckedRailcar: CheckedRailcar
      });
    }
    else {
      this.setState({
        railcarIsChecked: false,
        CheckedRailcar: ''
      });
    }


  }



  onLockRecord = (index, lockP) => {
    var tripsPanel = this.state.tripsPanel;
    var trips = [];
    var trip = tripsPanel[index];
    trip.date = this.state.date;
    trip.lockP = lockP;
    trips.push(trip);
    var user = JSON.parse(localStorage.getItem("authUser"));
    let details = {
      loginUser: user.username,
      dateTime: new Date(),
      type: 'lock'
    }
    if (trips[0].totalObject && trips[0].totalObject.logData && trips[0].totalObject.logData.length > 0) {
      trips[0].totalObject.logData.push(details)
    }
    this.lockTrip(trips, index);
  }

  onCompleteTripDelete = (index, tripcode) => {
    var tripsPanel = this.state.tripsPanel;
    var trips = [];
    var trip = tripsPanel[index];
    trips.push(trip);
    this.deleteTrip(trips, index);
    // this.dropResetObj(trip,"completeDelete");
    this.setState({
      guageTrip: {}, geoData: [], markers: [], mapChanged: true, trips: [],
      slectedTrips: [], checkedTrip: false
    })
    //this.reloadTrips();
  }

  reloadTrips = () => {
    const currDate = moment(this.state.date).format('YYYY-MM-DD');
    let value = this.state.selectedMultipleSites
    fetchTrips(value, currDate)
      .then(([res1]) => {
        this.setState({
          tripsPanel: res1
        });
      }).then(() => {
        this.changeDate(0, false, 'buttons');
      })
  }



  deleteTrip = (trips, index) => {
    var tripsPanel = this.state.tripsPanel;
    tripsPanel[index].lock = true;
    const currDate = moment(this.state.date).format('YYYY-MM-DD');
    let value = this.state.selectedMultipleSites
    fetch('/api/v1/rail/delete/trip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trips)
    }).then((response) => {
      this.reloadTrips();
      //  this.handlePanelsUpdate(currDate);
      this.notifySucess("Trip deleted Sucessfully");
    });
  }
  unlockTrip = () => {
    var totalTrips = [];
    var ctrips = this.state.trips[0];
    var tripsPan = this.state.tripsPanel;
    for (var i = 0; i < tripsPan.length; i++) {
      if (ctrips.itemCode == tripsPan[i].itemCode) {
        tripsPan[i].lock = false;
        tripsPan[i].lockP = true;
      }
    }
    ctrips.lock = false;
    totalTrips.push(ctrips);
    this.setState({
      trips: totalTrips,
      tripsPanel: tripsPan
    });
  }
  getRouteSchedulerApp = (routesSchedule, optimisedindex, auto) => {

    var data = [];
    var newGeoData = [];
    if (auto) {
      var tempoptimisedIndex = [];

      //map
      const tempdata = optimisedindex.map((order, index) => {
        for (var i = 0; i < order.length; i++) {


          tempoptimisedIndex.push(order[i].optimizedIndex)
        }

      })
      var tempGeoData = this.state.geoData;
      routesSchedule.routesData.map((route, routeIndex) => {
        var matched = false;

        var optimiseddataindex = tempoptimisedIndex[routeIndex];

        tempGeoData.map((geo, geoIndex) => {

          if (geoIndex === optimiseddataindex) {
            data = { ...geo, ...route }
            matched = true;
          }
        })
        if (matched === true) {
          newGeoData.push(data);
        }

      })
    }
    else {

      var data = [];
      var newGeoData = [];
      this.state.geoData.map((geo, geoIndex) => {

        routesSchedule.routesData.map((route, routeIndex) => {

          if (geoIndex === routeIndex) {
            data = { ...geo, ...route }
          }
        })
        newGeoData.push(data)
      });
    }
    this.setState({ geoData: newGeoData })
    this.setState({ routeSchedulerTime: routesSchedule });
    this.confirmTrip(routesSchedule.trips, "route", routesSchedule, newGeoData);
  }
  notifySucess = (message) => toast.success(message, { autoClose: 3000 });

  notifyError = (message) => toast.error(message, { autoClose: 3000 });


     ConfirmTrips = (trips) => {

      this.setState({ loading: true });
      fetch('/api/v1/transport/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trips)
      }).then((response) => {
        console.log("inside after trip - response",response);
        this.handleErrors(response);
      }).then(function (response) {

      }).then(() => {
         console.log("inside submit Trips",this.state.date);
        this.handleDateRangeChange();
      }).then(() => {
        this.setState({ loading: false, checkedTrip: false, isDetail:false });
        this.notifySucess("Trip Added/Updated Sucessfully");
      }).catch(error => {
        this.handleDateRangeChange();
        this.setState({ loading: false });
        this.notifyError("Please add proper trip to add or update, with vehicle, drops and pickups");
      });
    }



  onTripCreationwithDoc = (eventData) => {

 var dropObject = [], pickupObject = [],drops = 0, pickups = 0;
              var VehicleObject = [] ;
               var totalWeight = 0;
                    var totalVolume = 0;
                    var weight = "";
                    var volume = "";
                      var percentageMass = 0;
                          var percentageVolume = 0;
              var Trips = [];
              var TotalObjects = [];
              var  itemTrip = {
              selectedTripData : [],
              timelineInterval : [],
              equipments : [],
              trailers : [],
              quantities : []

              };
              itemTrip.selectedTripData.push(eventData.obbject);
              itemTrip.timelineInterval = [];
              itemTrip.equipments = [];
              itemTrip.trailers = [];
              itemTrip.quantities = [];
               VehicleObject.push(eventData.VehicleObject);
               if(eventData.docType === 'Drop'){
                                            drops = drops + 1;
                                            dropObject.push(eventData.obbject);

                                        }
                                        else {
                                            pickups = pickups + 1;
                                            pickupObject.push(eventData.obbject);
                                        }

               var stops = drops + pickups;
               var site = eventData.VehicleObject.fcy;
               var capacity = eventData.VehicleObject.capacities;
               var volume = eventData.VehicleObject.vol;
               var vol_unit = eventData.obbject.volume_unit;
               var wei_unit = eventData.obbject.weightunit;
                  var percentageMass = 0;
                     var percentageVolume = 0;
     //weight calucations

                 totalWeight = totalWeight + parseInt(eventData.obbject.netweight);
                       totalVolume = totalVolume + parseInt(eventData.obbject.volume);


      if (totalWeight > 0) {
        percentageMass = ((parseInt(totalWeight) / parseInt(capacity)) * 100).toFixed(1);
      }

      if (totalVolume > 0) {
        percentageVolume = ((parseInt(totalVolume) / parseInt(volume)) * 100).toFixed(1);
      }

     console.log("inside Scheduler -  onTrip",eventData);

        var trip = {
                         code: eventData.code,
                         date : moment(eventData.docdate).format("YYYY-MM-DD"),
                         docdate : eventData.docdate,
                                                                           depSite : site,
                                                                           arrSite : site,
                                                                           dlvystatus : 0,
                                                                           lvsno: null,
                                                                           credattim: new Date(),
                                                                           upddattim: new Date(),

                         driverName: '',

                         driverId: '',
                         defaultDriver: '',
                         trailers: 0,
                         site : site,
                         equipments: 0,
                         vehicleObject: VehicleObject,
                         optistatus : 'open',
                         trips: 1,
                         pickups: pickups,
                         lock: false,
                         pickupObject: pickupObject,
                         dropObject: dropObject,
                         totalObject : itemTrip,
                         equipmentObject: [],
                         trialerObject: [],
                         drops: drops,
                         stops: stops,
                         startIndex : stops,
                         pickUps: pickups,
                         timelineInterval: [],
                         trailerList: [],
                         trailerLink: '',
                         forceSeq: false,
                         currDropsPanel: {
                             drops: [],
                             pickUps: []
                         },
                         pickups: pickups,
                         alldrivers: '',
                         weightPercentage : percentageMass,
                         volumePercentage : percentageVolume,
                         totalWeight : totalWeight + " " + wei_unit,
                         totalVolume : totalVolume + " " + vol_unit,

                         driverslist: '',
                         allcustomers: '',
                         customerlist: ''
                     }

                     Trips.push(trip);

                     this.ConfirmTrips(Trips);
                     }

    submit = () => {
        console.log(this.schedulerRef);
        const events = this.schedulerRef.current.scheduleObj.getCurrentViewEvents();
        let groups = ["ConsultantID", "StartTime"],
          grouped = {};

        events.forEach(function (a) {
          groups
            .reduce(function (o, g, i) {
              o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {}); // or generate new obj, or
              return o[a[g]]; // at last, then an array
            }, grouped)
            .push(a);
        });
        let processedData = [];
        let Trips = [];
        let trip = [];

        Object.keys(grouped).forEach((x) => {
          let dateBy = grouped[x];
          Object.keys(dateBy).forEach((d) => {
            processedData.push({
                 arrSite : "",
                                  capacities : 0,
                                  date : d,
                                  depSite : "",
                                  code: '',
                                  driverName: '',
                                  endDate : "",
                                  heuexec : "",
                                  lock : false,
                                  optistatus : "Open",
                                  reorder : false,
                                  route : false,
                                  site : "",
                                  StartTime : "",
                                  driverId: x,
                                  defaultDriver: '',
                                  trailers: 0,
                                  equipments: 0,
                                  vehicleObject: {},
                                  trips: 0,
                                  pickups: 0,
                                  lock: false,
                                  pickupObject: [],
                                  dropObject: [],
                                  equipmentObject: [],
                                  trialerObject: [],
                                  drops: 0,
                                  stops: 0,
                                  pickUps: 0,
                                  timelineInterval: [],
                                  trailerList: [],
                                  trailerLink: '',
                                  forceSeq: false,
                                  currDropsPanel: {
                                      drops: [],
                                      pickUps: []
                                  },
                                  pickups: 0,
                                  alldrivers: '',
                                  driverslist: '',
                                  allcustomers: '',
                                  customerlist: '',
              value: dateBy[d],
            });
          });
        });
        Trips = processedData;
        console.log(Trips);
      };



          updateDropSearchTerm = (event) => {
               this.setState({ searchDrpString: event.target.value });
             }

  render() {
    let optionItems = [];
    var optionSelected = {};
    var selectedSite = {};
    var placeHolder = "All";

    this.state.sites && this.state.sites.length > 0 && this.state.sites.map((site) => {
      /*
         if(site.id == this.selectedSite.id) {
             selectedSite = site;
             placeHolder = site.value;
             optionSelected.value = site.id;
             optionSelected.label = (site.value + "(" + site.id + ")");
         }
         */
      optionItems.push({ value: site.id, label: (site.value + "(" + site.id + ")") })
    });
    const { sites } = this.state;



    let siteDetails = {};

    if (this.state.markers && this.state.markers[0]) {
      this.state.sites && this.state.sites.map((site) => {
        if (site.id === this.state.markers[0].id) {
          siteDetails = { lat: site.lat, lng: site.lng }
        }
      })
    }
    else if (this.state.bl_markers && this.state.bl_markers[0]) {
      this.state.sites && this.state.sites.map((site) => {
        if (site.id === this.state.bl_markers[0].id) {
          siteDetails = { lat: site.lat, lng: site.lng }
        }
      })
    }




    return (
      <React.Fragment>

        <div className="page-content pb-0">
          <ToastContainer />
          <Container fluid>

            <SideNav
              sites={this.state.sites}
              selectedSite={this.state.selectedSiteValue}
              handleSiteChange={this.handleSiteChange}
              sitesArr={this.sitesArr}
              selectedDate={this.state.date}
              onVRhide={this.onVRhide}
              vrShow={this.state.vrShow}
              vehicleShow={this.state.vehicleShow}
              RouteoptiShow={this.state.RouteoptiShow}
              guageTrip={this.state.guageTrip}
              vehiclePanel={this.state.vehiclePanel}
              getValuestoApp={(routesSchedule, optiindex, auto) => this.getRouteSchedulerApp(routesSchedule, optiindex, auto)}
              tripsPanel={this.state.tripsPanel}
              refreshAllPanels={this.refreshAllPanels}
              OnGroupByChange={this.OnGroupByChange}
              SelectedGroupBy={this.state.SelectedGroupBy}
              submit={this.submit}

            >
            </SideNav >
            <section>
              <Row className="mt-3">
                <Col md="12">
                  <ScheduleTrips ref={this.schedulerRef}
                    SelectedGroupBy={this.state.SelectedGroupBy}
                    handleDateRangeChange = {this.handleDateRangeChange}
                    selectedDate = {this.state.date}
                    VehiclePanel = {this.state.vehiclePanel}
                    vehicles = {this.state.vehiclePanel.vehicles}
                    drivers = {this.state.vehiclePanel.drivers}
                    dropsPanel={this.state.dropsPanel}
                    onTripCreationwithDoc = {this.onTripCreationwithDoc}
                  />

                </Col>

                <Col md="7">
                 <DocumentsPanel
                                      checkedToPlan={this.checkedToPlan}
                                      dropsPanel={this.state.dropsPanel}
                                      deliverySite={this.state.deliverySite}
                                      handleDragStart={this.handleDragStart}
                                      sortDrop={this.sortDrop}
                                      dropOrder={this.state.dropOrder}
                                      selectedDate={this.state.dropDate}
                                      updateDropSearchTerm = {this.updateDropSearchTerm}
                                      searchDrp = {this.state.searchDrpString}
                                      tripsList = {this.state.tripsPanel}
                                      vehiclePanel = {this.state.vehiclePanel}
                                      updateTripsGeoLocations={this.updateTripsGeoLocations}

                                      />
                </Col>
                <Col md="5">
                  <RouteMap1
                                                  markers={this.state.markers}
                                                                          mapChanged={this.state.mapChanged}
                                                                          updateMagChaged={this.updateMagChaged}
                                                                          geoData={this.state.geoData}
                                                                          tripsList={this.state.tripsPanel}
                                                                          updateTimeLine={this.updateTimeLine}
                                                                          onTripDelete={this.onTripDelete}
                                                                          selectedTrips={this.state.tripsChecked}
                                                                          vehiclePanel={this.state.vehiclePanel}
                                                                          trips={this.state.trips}
                                                                          sites={this.state.sites}
                                                                          onDocMsg={this.onDocmessage}
                                                                          />

                </Col>

              </Row>
            </section>

          </Container>
        </div>
      </React.Fragment>
    );
  }

}

export default Dashboard;
