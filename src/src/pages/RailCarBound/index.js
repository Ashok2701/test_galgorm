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
import { fetchAPI } from '../../service';
import { fetchRailAPI } from '../../service';
import {fetchRailCarOutBoundAPI}  from '../../service';
import { fetchRailCarAPI } from '../../service';
import { fetchPanel } from '../../service';
import { fetchTrips } from '../../service';
import { fetchRailDropsPanel } from '../../service';
import { fetchRailDropsPanelwithRange , fetchRailTripsPanelwithRange, fetchRailTripsPanel } from '../../service';
import { fetchVR,fetchRailVR,fetchLVS } from '../../service';
import VehiclePanel  from './Panel/VehiclePanel';
import DocumentsPanel from './Panel/DocumentsPanel';
import AddUpdateTrip1 from './Panel/AddUpdateTrip1';
import RailRouteList from './Panel/RailRouteList';
import VrHeader  from './Panel/VrHeader';
import VrStops4 from './Panel/VrStops4';
import Timeline from './Panel/Timeline';
import RouteMap1 from './Panel/RouteMap1';
import IndividualRouteMap2 from './Panel/IndividualRouteMap2';
import RouteDetails from './RouteDetail'
import "./dashboard.scss";
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

const optionGroup = [
  { label: "CORPS", value: "corps" },
  { label: "WASTE", value: "waste" },
];

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "Vehicles",
       checkedToPlan: false,
         checked5days : false,
          checked30daysRailtrips : false,
        railcarIsChecked :false,
        CheckedRailcar : {},
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
 boldetail : [],
    bl_markers : [],
       bl_tripsList : {},
       sealnoBydlvyno : {
           sealnumbers : [],
           dlvyno : ''
       },
    deliverySite: '',
   searchVString: '',
   searchTString: '',
   searchEString: '',
   searchDString: '',
   searchDrpString: '',
   searchPckString: '',


       panelSearchString: '',
      vrdetaillist: [],
      comboData : [],
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
      DraggedRailCar : {},
      selectedMultipleSites: '',
        markers: [],
          geoData: [],
            mapChanged: false,
               clearTrips: false,
  trips: [],
      isTimeline: false,
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
        railcarList : [],
        railcarCheckInList : [],
        railcarCheckOutList : [],
        railcarCheckAvailList : [],
       vehiclePanel: {
              vehicles: [],
              equipments: [],
              trails: [],
              drivers: []
            },
 dropsPanel: {
        drops: []

      },
 dataTransfer : {
   currentCard : "",
   type : "",
   id : "",
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
         travelTime: 0,
         serviceTime: 0,
         DropProdCount: 0,
         PickupProdCount: 0
       },
        tripsPanel: [],
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
    this.handleDefault = this.handleDefault.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
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


   checked30daysRailtrips = (checked) => {

      
         this.setState({ checked30daysRailtrips : checked});
         this.RailTriplistforCheckedindays(checked);
     }

      RailTriplistforCheckedindays = (dayflag) => {
           var currDate = moment(this.state.dropDate).add(0, 'days');
           var sdate = moment(currDate).add(-30, 'days');
           var edate = moment(currDate).add(30, 'days');
                   var newDate = moment(currDate).format('YYYY-MM-DD');
                 var newStartDate = moment(sdate).format('YYYY-MM-DD');
                 var newEndDate = moment(edate).format('YYYY-MM-DD');
                  
                 if(dayflag) {
                    
                    fetchRailTripsPanelwithRange(this.state.selectedMultipleSites, newStartDate,newEndDate)
                                        .then(([res1]) => {
                                          var dropsP = res1;
                                          
                                         // this.filterDropsDiv(newDate, dropsP);
                                          
                                          this.setState({
                                            tripsPanel: dropsP,
                                          });
                                        }).catch(error => {

                                        });
               }
               else {
                  
                   fetchRailTripsPanel(this.state.selectedMultipleSites, newDate)
                             .then(([res1]) => {
                               var dropsP = res1;
                               
                              // this.filterDropsDiv(newDate, dropsP);
                               
                               this.setState({
                                 tripsPanel: dropsP,
                               });
                             }).catch(error => {

                             });
               }
          }





   updateVehSearchTerm = (event) => {
      this.setState({ searchVString: event.target.value });
    }
   updateTrailSearchTerm = (event) => {
         this.setState({ searchTString: event.target.value });
       }
   updateEquSearchTerm = (event) => {
         this.setState({ searchEString: event.target.value });
       }
   updateDriverSearchTerm = (event) => {
         this.setState({ searchDString: event.target.value });
       }
    updateDropSearchTerm = (event) => {
         this.setState({ searchDrpString: event.target.value });
       }
  updatePickupSearchTerm = (event) => {
                this.setState({ searchPckString: event.target.value });
              }

      colourDivs = (allDrivers, dlist, allTrailers, tlist) => {
         
        this.setState({
          allAllowedDrivers: allDrivers,
          allAllowedTrailers: allTrailers,
          allowedDrivers: dlist,
          vehicleDropped: true,
          allowedTrailers: tlist
        });

        
      }
      colourDocDivs = (drpTrailer) => {
           if (drpTrailer !== null || drpTrailer !== '') {
               this.setState({
                  trailerDropped: true,
                  droppedTrailers: drpTrailer
                });
           }
        }


  sortPickup = (type, index) => {
    var cusDropsPanel = this.state.dropsPanel;
    var cusPick = this.state.dropsPanel.pickUps;
    var picOrder = this.state.pickOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("docnum" === type) {
        cusPick.sort((a, b) => (a.docnum < b.docnum) ? 1 : -1)
      }
      if ("site" === type) {
        cusPick.sort((a, b) => (a.site < b.site) ? 1 : -1)
      }
      if ("bpcode" === type) {
        cusPick.sort((a, b) => (a.bpcode < b.bpcode) ? 1 : -1)
      }
      if ("bpname" === type) {
        cusPick.sort((a, b) => (a.bpname < b.bpname) ? 1 : -1)
      }
      if ("doctype" === type) {
        cusPick.sort((a, b) => (a.doctype < b.doctype) ? 1 : -1)
      }
      if ("poscode" === type) {
        cusPick.sort((a, b) => (a.poscode < b.poscode) ? 1 : -1)
      }
      if ("netweight" === type) {
        cusPick.sort((a, b) => (a.netweight < b.netweight) ? 1 : -1)
      }
      if ("volume" === type) {
        cusPick.sort((a, b) => (a.volume < b.volume) ? 1 : -1)
      }
      if ("vehicleCode" === type) {
        cusPick.sort((a, b) => (a.vehicleCode < b.vehicleCode) ? 1 : -1)
      }
      if ("type" === type) {
        cusPick.sort((a, b) => (a.type < b.type) ? 1 : -1)
      }
      if ("site" === type) {
        cusPick.sort((a, b) => (a.site < b.site) ? 1 : -1)
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("docnum" === type) {
        cusPick.sort((a, b) => (a.docnum > b.docnum) ? 1 : -1)
      }
      if ("bpcode" === type) {
        cusPick.sort((a, b) => (a.bpcode > b.bpcode) ? 1 : -1)
      }
      if ("bpname" === type) {
        cusPick.sort((a, b) => (a.bpname > b.bpname) ? 1 : -1)
      }
      if ("doctype" === type) {
        cusPick.sort((a, b) => (a.doctype > b.doctype) ? 1 : -1)
      }
      if ("poscode" === type) {
        cusPick.sort((a, b) => (a.poscode > b.poscode) ? 1 : -1)
      }
      if ("netweight" === type) {
        cusPick.sort((a, b) => (a.netweight > b.netweight) ? 1 : -1)
      }
      if ("volume" === type) {
        cusPick.sort((a, b) => (a.volume > b.volume) ? 1 : -1)
      }
      if ("vehicleCode" === type) {
        cusPick.sort((a, b) => (a.vehicleCode > b.vehicleCode) ? 1 : -1)
      }
      if ("type" === type) {
        cusPick.sort((a, b) => (a.type > b.type) ? 1 : -1)
      }
      if ("site" === type) {
        cusPick.sort((a, b) => (a.site > b.site) ? 1 : -1)
      }
    }
    cusDropsPanel.pickUps = cusPick;
    this.setState({
      dropsPanel: cusDropsPanel,
      pickOrder: picOrder,
      mapChanged: false
    });
  }

  sortDrop = (type, index) => {
    var cusDropsPanel = this.state.dropsPanel;
    var cusPick = this.state.dropsPanel.drops;
    var picOrder = this.state.dropOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("docnum" === type) {
        cusPick.sort((a, b) => (a.docnum < b.docnum) ? 1 : -1)
      }
      if ("bpcode" === type) {
        cusPick.sort((a, b) => (a.bpcode < b.bpcode) ? 1 : -1)
      }
      if ("bpname" === type) {
        cusPick.sort((a, b) => (a.bpname < b.bpname) ? 1 : -1)
      }
      if ("doctype" === type) {
        cusPick.sort((a, b) => (a.doctype < b.doctype) ? 1 : -1)
      }
      if ("poscode" === type) {
        cusPick.sort((a, b) => (a.poscode < b.poscode) ? 1 : -1)
      }
      if ("netweight" === type) {
        cusPick.sort((a, b) => (a.netweight < b.netweight) ? 1 : -1)
      }
      if ("volume" === type) {
        cusPick.sort((a, b) => (a.volume < b.volume) ? 1 : -1)
      }
      if ("vehicleCode" === type) {
        cusPick.sort((a, b) => (a.vehicleCode < b.vehicleCode) ? 1 : -1)
      }
      if ("type" === type) {
        cusPick.sort((a, b) => (a.type < b.type) ? 1 : -1)
      }
      if ("site" === type) {
        cusPick.sort((a, b) => (a.site < b.site) ? 1 : -1)
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("docnum" === type) {
        cusPick.sort((a, b) => (a.docnum > b.docnum) ? 1 : -1)
      }
      if ("bpcode" === type) {
        cusPick.sort((a, b) => (a.bpcode > b.bpcode) ? 1 : -1)
      }
      if ("bpname" === type) {
        cusPick.sort((a, b) => (a.bpname > b.bpname) ? 1 : -1)
      }
      if ("doctype" === type) {
        cusPick.sort((a, b) => (a.doctype > b.doctype) ? 1 : -1)
      }
      if ("poscode" === type) {
        cusPick.sort((a, b) => (a.poscode > b.poscode) ? 1 : -1)
      }
      if ("netweight" === type) {
        cusPick.sort((a, b) => (a.netweight > b.netweight) ? 1 : -1)
      }
      if ("volume" === type) {
        cusPick.sort((a, b) => (a.volume > b.volume) ? 1 : -1)
      }
      if ("vehicleCode" === type) {
        cusPick.sort((a, b) => (a.vehicleCode > b.vehicleCode) ? 1 : -1)
      }
      if ("type" === type) {
        cusPick.sort((a, b) => (a.type > b.type) ? 1 : -1)
      }
      if ("site" === type) {
        cusPick.sort((a, b) => (a.site > b.site) ? 1 : -1)
      }
    }
    cusDropsPanel.drops = cusPick;
    this.setState({
      dropsPanel: cusDropsPanel,
      dropOrder: picOrder,
      mapChanged: false
    });
  }

  sortEquipement = (type, index) => {
    var cusDropsPanel = this.state.vehiclePanel;
    var cusPick = this.state.vehiclePanel.equipments;
    var picOrder = this.state.equpOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("xequipid" === type) {
        cusPick.sort((a, b) => (a.xequipid < b.xequipid) ? 1 : -1)
      }
      if ("xdescript" === type) {
        cusPick.sort((a, b) => (a.xdescript < b.xdescript) ? 1 : -1)
      }
      if ("xequiptyp" === type) {
        cusPick.sort((a, b) => (a.xequiptyp < b.xequiptyp) ? 1 : -1)
      }
      if ("xcodeyve" === type) {
        cusPick.sort((a, b) => (a.xcodeyve < b.xcodeyve) ? 1 : -1)
      }
      if ("xfcy" === type) {
        cusPick.sort((a, b) => (a.xfcy < b.xfcy) ? 1 : -1)
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("xequipid" === type) {
        cusPick.sort((a, b) => (a.xequipid > b.xequipid) ? 1 : -1)
      }
      if ("xdescript" === type) {
        cusPick.sort((a, b) => (a.xdescript > b.xdescript) ? 1 : -1)
      }
      if ("xequiptyp" === type) {
        cusPick.sort((a, b) => (a.xequiptyp > b.xequiptyp) ? 1 : -1)
      }
      if ("xcodeyve" === type) {
        cusPick.sort((a, b) => (a.xcodeyve > b.xcodeyve) ? 1 : -1)
      }
      if ("xfcy" === type) {
        cusPick.sort((a, b) => (a.xfcy > b.xfcy) ? 1 : -1)
      }
    }
    cusDropsPanel.equipments = cusPick;
    this.setState({
      vehiclePanel: cusDropsPanel,
      equpOrder: picOrder,
      mapChanged: false
    });
  }

  sortDriver = (type, index) => {
    var cusDropsPanel = this.state.vehiclePanel;
    var cusPick = this.state.vehiclePanel.drivers;
    var picOrder = this.state.diverOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("driverid" === type) {
        cusPick.sort((a, b) => (a.driverid < b.driverid) ? 1 : -1)
      }
      if ("driver" === type) {
        cusPick.sort((a, b) => (a.driver < b.driver) ? 1 : -1)
      }
      if ("licenum" === type) {
        cusPick.sort((a, b) => (a.licenum < b.licenum) ? 1 : -1)
      }
      if ("licedat" === type) {
        cusPick.sort((a, b) => (a.licedat < b.licedat) ? 1 : -1)
      }
      if ("cty" === type) {
        cusPick.sort((a, b) => (a.cty < b.cty) ? 1 : -1)
      }
      if ("poscod" === type) {
        cusPick.sort((a, b) => (a.poscod < b.poscod) ? 1 : -1)
      }
      if ("cry" === type) {
        cusPick.sort((a, b) => (a.cry < b.cry) ? 1 : -1)
      }
      if ("fcy" === type) {
        cusPick.sort((a, b) => (a.fcy < b.fcy) ? 1 : -1)
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("driverid" === type) {
        cusPick.sort((a, b) => (a.driverid > b.driverid) ? 1 : -1)
      }
      if ("driver" === type) {
        cusPick.sort((a, b) => (a.driver > b.driver) ? 1 : -1)
      }
      if ("licenum" === type) {
        cusPick.sort((a, b) => (a.licenum > b.licenum) ? 1 : -1)
      }
      if ("licedat" === type) {
        cusPick.sort((a, b) => (a.licedat > b.licedat) ? 1 : -1)
      }
      if ("cty" === type) {
        cusPick.sort((a, b) => (a.cty > b.cty) ? 1 : -1)
      }
      if ("poscod" === type) {
        cusPick.sort((a, b) => (a.poscod > b.poscod) ? 1 : -1)
      }
      if ("cry" === type) {
        cusPick.sort((a, b) => (a.cry > b.cry) ? 1 : -1)
      }
      if ("fcy" === type) {
        cusPick.sort((a, b) => (a.fcy > b.fcy) ? 1 : -1)
      }
    }
    cusDropsPanel.drivers = cusPick;
    this.setState({
      vehiclePanel: cusDropsPanel,
      diverOrder: picOrder,
      mapChanged: false
    });
  }

  sortVehicles = (type, index) => {
    var cusDropsPanel = this.state.vehiclePanel;
    var cusPick = this.state.vehiclePanel.vehicles;
    var picOrder = this.state.vehOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("codeyve" === type) {
        cusPick.sort((a, b) => (a.codeyve < b.codeyve) ? 1 : -1)
      }
      if ("name" === type) {
        cusPick.sort((a, b) => (a.name < b.name) ? 1 : -1)
      }
      if ("startdepotn" === type) {
        cusPick.sort((a, b) => (a.startdepotn < b.startdepotn) ? 1 : -1)
      }
      if ("enddepotname" === type) {
        cusPick.sort((a, b) => (a.enddepotname < b.enddepotname) ? 1 : -1)
      }
      if ("drivername" === type) {
        cusPick.sort((a, b) => (a.drivername < b.drivername) ? 1 : -1)
      }
      if ("lateral" === type) {
        cusPick.sort((a, b) => (a.lateral < b.lateral) ? 1 : -1)
      }
      if ("trailer" === type) {
        cusPick.sort((a, b) => (a.trailer < b.trailer) ? 1 : -1)
      }
      if ("catego" === type) {
        cusPick.sort((a, b) => (a.catego < b.catego) ? 1 : -1)
      }
      if ("capacities" === type) {
        cusPick.sort((a, b) => (a.capacities < b.capacities) ? 1 : -1)
      }
      if ("vol" === type) {
        cusPick.sort((a, b) => (a.vol < b.vol) ? 1 : -1)
      }
      if ("maxordercnt" === type) {
        cusPick.sort((a, b) => (a.maxordercnt < b.maxordercnt) ? 1 : -1)
      }
      if ("starttime" === type) {
        cusPick.sort((a, b) => (a.starttime < b.starttime) ? 1 : -1)
      }
      if ("lateststarttime" === type) {
        cusPick.sort((a, b) => (a.lateststarttime < b.lateststarttime) ? 1 : -1)
      }
      if ("maxtotaldist" === type) {
        cusPick.sort((a, b) => (a.maxtotaldist < b.maxtotaldist) ? 1 : -1)
      }
      if ("maxtotaltime" === type) {
        cusPick.sort((a, b) => (a.maxtotaltime < b.maxtotaltime) ? 1 : -1)
      }
      if ("maxtotaltrvtime" === type) {
        cusPick.sort((a, b) => (a.maxtotaltrvtime < b.maxtotaltrvtime) ? 1 : -1)
      }
      if ("bptnum" === type) {
        cusPick.sort((a, b) => (a.bptnum < b.bptnum) ? 1 : -1)
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("codeyve" === type) {
        cusPick.sort((a, b) => (a.codeyve > b.codeyve) ? 1 : -1)
      }
      if ("name" === type) {
        cusPick.sort((a, b) => (a.name > b.name) ? 1 : -1)
      }
      if ("startdepotn" === type) {
        cusPick.sort((a, b) => (a.startdepotn > b.startdepotn) ? 1 : -1)
      }
      if ("enddepotname" === type) {
        cusPick.sort((a, b) => (a.enddepotname > b.enddepotname) ? 1 : -1)
      }
      if ("drivername" === type) {
        cusPick.sort((a, b) => (a.drivername > b.drivername) ? 1 : -1)
      }
      if ("lateral" === type) {
        cusPick.sort((a, b) => (a.lateral > b.lateral) ? 1 : -1)
      }
      if ("trailer" === type) {
        cusPick.sort((a, b) => (a.trailer > b.trailer) ? 1 : -1)
      }
      if ("catego" === type) {
        cusPick.sort((a, b) => (a.catego > b.catego) ? 1 : -1)
      }
      if ("starttime" === type) {
        cusPick.sort((a, b) => (a.starttime > b.starttime) ? 1 : -1)
      }
      if ("lateststarttime" === type) {
        cusPick.sort((a, b) => (a.lateststarttime > b.lateststarttime) ? 1 : -1)
      }
      if ("capacities" === type) {
        cusPick.sort((a, b) => (a.capacities > b.capacities) ? 1 : -1)
      }
      if ("vol" === type) {
        cusPick.sort((a, b) => (a.vol > b.vol) ? 1 : -1)
      }
      if ("maxordercnt" === type) {
        cusPick.sort((a, b) => (a.maxordercnt > b.maxordercnt) ? 1 : -1)
      }
      if ("maxtotaldist" === type) {
        cusPick.sort((a, b) => (a.maxtotaldist > b.maxtotaldist) ? 1 : -1)
      }
      if ("maxtotaltime" === type) {
        cusPick.sort((a, b) => (a.maxtotaltime > b.maxtotaltime) ? 1 : -1)
      }
      if ("maxtotaltrvtime" === type) {
        cusPick.sort((a, b) => (a.maxtotaltrvtime > b.maxtotaltrvtime) ? 1 : -1)
      }
      if ("bptnum" === type) {
        cusPick.sort((a, b) => (a.bptnum > b.bptnum) ? 1 : -1)
      }
    }
    cusDropsPanel.vehicles = cusPick;
    this.setState({
      vehiclePanel: cusDropsPanel,
      vehOrder: picOrder,
      mapChanged: false
    });
  }

  sortTrailer = (type, index) => {
    var cusDropsPanel = this.state.vehiclePanel;
    var cusPick = this.state.vehiclePanel.trails;
    var picOrder = this.state.trailOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("trailer" === type) {
        cusPick.sort((a, b) => (a.trailer < b.trailer) ? 1 : -1)
      }
      if ("des" === type) {
        cusPick.sort((a, b) => (a.des < b.des) ? 1 : -1)
      }
      if ("fcy" === type) {
        cusPick.sort((a, b) => (a.fcy < b.fcy) ? 1 : -1)
      }
      if ("typ" === type) {
        cusPick.sort((a, b) => (a.typ < b.typ) ? 1 : -1)
      }
      if ("model" === type) {
        cusPick.sort((a, b) => (a.model < b.model) ? 1 : -1)
      }
      if ("maxloams" === type) {
        cusPick.sort((a, b) => (a.maxloams < b.maxloams) ? 1 : -1)
      }
      if ("maxlovol" === type) {
        cusPick.sort((a, b) => (a.maxlovol < b.maxlovol) ? 1 : -1)
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("trailer" === type) {
        cusPick.sort((a, b) => (a.trailer > b.trailer) ? 1 : -1)
      }
      if ("des" === type) {
        cusPick.sort((a, b) => (a.des > b.des) ? 1 : -1)
      }
      if ("fcy" === type) {
        cusPick.sort((a, b) => (a.fcy > b.fcy) ? 1 : -1)
      }
      if ("typ" === type) {
        cusPick.sort((a, b) => (a.typ > b.typ) ? 1 : -1)
      }
      if ("model" === type) {
        cusPick.sort((a, b) => (a.model > b.model) ? 1 : -1)
      }
      if ("maxloams" === type) {
        cusPick.sort((a, b) => (a.maxloams > b.maxloams) ? 1 : -1)
      }
      if ("maxlovol" === type) {
        cusPick.sort((a, b) => (a.maxlovol > b.maxlovol) ? 1 : -1)
      }
    }
    cusDropsPanel.trails = cusPick;
    this.setState({
      vehiclePanel: cusDropsPanel,
      trailOrder: picOrder,
      mapChanged: false
    });
  }

  disableDivs = (index, type, docNum) => {
    
    
    
    var currVehPanel = this.state.vehiclePanel;
    var currDropsPanel = this.state.dropsPanel;

    if (type === 'vehicle') {
      var currVeh = currVehPanel.vehicles;
      currVeh[index].isDropped = true;
      currVeh[index].type = 'selected';
      currVehPanel.vehicles = currVeh;
    }
    if (type === 'trailer') {
      var currVeh = currVehPanel.trails;
      currVeh[index].isDropped = true;
      currVeh[index].type = 'selected';
      currVehPanel.trails = currVeh;
    }
    if (type === 'driver') {
      var currVeh = currVehPanel.drivers;
      currVeh[index].isDropped = true;
      currVeh[index].type = 'selected';
      currVehPanel.drivers = currVeh;
    }
    if (type === 'equipment') {
      var currVeh = currVehPanel.equipments;
      currVeh[index].isDropped = true;
      currVeh[index].type = 'selected';
      currVehPanel.equipments = currVeh;
    }
    if (type === 'pickup') {
      var currVeh = currDropsPanel.pickUps;

      if (this.state.checkedToPlan || this.state.searchPanel) {
        if (currDropsPanel.pickUps && currDropsPanel.pickUps.length > 0) {
          currDropsPanel.pickUps.map((pickups, i) => {
            if (pickups.docnum === docNum) {
              currVeh[i].isDropped = true;
              currVeh[i].type = 'selected';
            }
          })
        }
      } else {
        currVeh[index].isDropped = true;
        currVeh[index].type = 'selected';
      }
      currDropsPanel.pickUps = currVeh;
    }
    if (type === 'drops') {
      
      var currVeh = currDropsPanel.drops;
      
      if (this.state.checkedToPlan || this.state.searchPanel) {
          
        if (currDropsPanel.drops && currDropsPanel.drops.length > 0) {
          currDropsPanel.drops.map((drops, i) => {
            if (drops.docnum === docNum) {
              currVeh[i].isDropped = true;
              currVeh[i].type = 'selected';
            }
          })
        }
      } else {
          
        currVeh[index].isDropped = true;
        currVeh[index].type = 'selected';
      }
      currDropsPanel.drops = currVeh;
    }
    this.setState({
      vehiclePanel: currVehPanel,
      dropsPanel: currDropsPanel
    });
  }

 UnlockConfirmTrip = (ClickedTrip) => {
    this.confirmTrip(ClickedTrip, "unlock");
  }






  saveSealnumbers = (sealnumbers , dlvno) => {
      var sealDetails = {};
      sealDetails.sealnumbers = sealnumbers;
      sealDetails.dlvyno = dlvno;
      this.setState(
      {
      sealnoBydlvyno : sealDetails
      });

      
      

      fetch('http://tmsportal.tema-systems.com:8082/api/v1/rail/seal/doc', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(sealDetails)
            }).then((response) => {
              
              this.handleErrors(response);
            }).then(function (response) {

            }).then(() => {
               
              this.handleDateChange(this.state.date);
            }).then(() => {
              this.setState({ loading: false, checkedTrip: false, isDetail:false });
              this.notifySucess("RailDelivery Sealnumbers updated Sucessfully");
            }).catch(error => {
              this.handleDateChange(this.state.date);
              this.setState({ loading: false });
              this.notifyError("Please add proper Sealnumbers to the delviery");
            });

      

  }


    submitTrips = (trips) => {
      this.setState({ loading: true });
      fetch('http://tmsportal.tema-systems.com:8082/api/v1/rail/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trips)
      }).then((response) => {
        
        this.handleErrors(response);
      }).then(function (response) {

      }).then(() => {
         
        this.handleDateChange(this.state.date);
      }).then(() => {
        this.setState({ loading: false, checkedTrip: false, isDetail:false });
        this.notifySucess("RailTrip Added/Updated Sucessfully");
      }).catch(error => {
        this.handleDateChange(this.state.date);
        this.setState({ loading: false });
        this.notifyError("Please add proper trip to add or update, with vehicle, drops and pickups");
      });
    }

    handleErrors = (response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }


  confirmTrip = (trip, route, routesSchedule, newGeoData) => {
    if ((trip.timelineInterval != undefined && trip.timelineInterval.length > 0) || route === 'unlock' || route=== 'loaderMsg' || route === 'ForceSeq') {
      // trip.site = this.state.selectedSite.id;
      this.setState({ selectedSite: trip.site })
      this.setState({ selectedSiteValue: trip.site })
        var today = new Date;
              var execdate = today.getDate();
              var hr = today.getHours()
              if (hr <= 9) {
                hr = "0" + hr;
              }
              var min = today.getMinutes();
              if (min <= 9) {
                min = "0" + min;
              }
              var time = hr + ":" + min;
              trip.heuexec = time;
      if (route === "route") {
/*
        var today = new Date;
        var execdate = today.getDate();
        var hr = today.getHours()
        if (hr <= 9) {
          hr = "0" + hr;
        }
        var min = today.getMinutes();
        if (min <= 9) {
          min = "0" + min;
        }
        var time = hr + ":" + min;
        trip.datexec = today;
        trip.heuexec = time;
        */
         trip.datexec = today;
        trip.date = moment(this.state.date).format("YYYY-MM-DD");
        //trip.date = this.state.date;
        trip.startTime = routesSchedule.startTime;
        trip.endTime = routesSchedule.endTime;
        trip.startDate = routesSchedule.startDate;
        trip.endDate = routesSchedule.endDate;
        trip.travelTime = routesSchedule.tripData.tripTravelTime;
        trip.serviceTime = routesSchedule.tripData.tripTotalServiceTime;
        trip.totalTime = routesSchedule.tripData.tripTotalTime;
        trip.totalDistance = routesSchedule.tripData.totalDistance;
        trip.route = true;
        trip.fixedCost = routesSchedule.cost.fixedCost;
        trip.totalCost = routesSchedule.cost.totalCost;
        trip.distanceCost = routesSchedule.cost.distanceCost;
        trip.regularCost = routesSchedule.cost.Regularcost;
        trip.overtimeCost = routesSchedule.cost.overtimecost;
        trip.timeCost = routesSchedule.cost.timeCost;
        trip.optistatus = "Optimized";
        trip.uomTime = 'Hr';
        trip.uomDistance = 'Kms';
        trip.route = true;
      }
      else if (route === "unlock") {
        trip.lock = false;
        trip.lockP = true;
        trip.date = moment(this.state.date).format("YYYY-MM-DD");
        trip.route = true;
      }
      else if(route=== 'loaderMsg' || route === 'ForceSeq'){
        // trip.loaderInfo =
         trip.date = moment(this.state.date).format("YYYY-MM-DD");
         trip.route = false;
      }
      else {
        trip.date = moment(this.state.date).format("YYYY-MM-DD");
        
        trip.endDate = "";
        trip.optistatus = "Open";
        trip.route = false;
      }
      var totalWeight = 0;
      var totalVolume = 0;
      var weight = "";
      var volume = "";


      for (var i = 0; i < trip.dropObject.length; i++) {
        totalWeight = totalWeight + parseInt(trip.dropObject[i].netweight);
        totalVolume = totalVolume + parseInt(trip.dropObject[i].volume);
        if (weight == "") {
          weight = trip.dropObject[i].weightunit;
        }
        if (volume == "") {
          volume = trip.dropObject[i].volume_unit;
        }
      }

      var percentageMass = 0;
      var percentageVolume = 0;

      if (totalWeight > 0) {
        percentageMass = ((parseInt(totalWeight) / parseInt(trip.capacities)) * 100).toFixed(1);
      }

      if (totalVolume > 0) {
        percentageVolume = ((parseInt(totalVolume) / parseInt(trip.vehicleObject.vol)) * 100).toFixed(1);
      }

      trip.weightPercentage = percentageMass;
      trip.volumePercentage = percentageVolume;
      trip.totalWeight = totalWeight + " " + weight;
      trip.totalVolume = totalVolume + " " + volume;
      var itemTrips = [];
      this.refreshTrips();
      var itemTrip = {};

      if (route === "unlock" || route === "loaderMsg" || route === "ForceSeq") {
        itemTrips.push(trip);
      }
      else {

        if (route === "route") {
          if (routesSchedule) {
            while (this.state.tripsPanel[this.state.selectedIndex].timelineInterval.length > 0) {
              this.state.tripsPanel[this.state.selectedIndex].timelineInterval.pop();
            }
            this.state.tripsPanel[this.state.selectedIndex].timelineInterval.push(
              { value: 0, label: routesSchedule.startTime });
            routesSchedule.routesData.map((data, index) => {
              let values;
              values = (index + 1) * 12;
              this.state.tripsPanel[this.state.selectedIndex].timelineInterval.push(
                { value: values, label: data.end })
            });
          }
          itemTrip.timelineInterval = this.state.tripsPanel[this.state.selectedIndex].timelineInterval;
          itemTrip.selectedTripData = newGeoData;
        } else {
          itemTrip.selectedTripData = this.state.slectedTrips;
          itemTrip.timelineInterval = trip.timelineInterval;

        }
        itemTrip.quantities = this.state.quantities;
        if (this.state.tripsPanel && this.state.tripsPanel[this.state.selectedIndex] && this.state.tripsPanel[this.state.selectedIndex].totalObject && this.state.tripsPanel[this.state.selectedIndex].totalObject.logData) {
                  itemTrip.logData = this.state.tripsPanel[this.state.selectedIndex].totalObject.logData
                } else {
                  itemTrip.logData = []
                }

        trip.totalObject = itemTrip;
        if (this.state.reorder) {
          trip.reorder = this.state.reorder;
        } else {
          trip.reorder = false;
        }

        this.setState({ reorder: false })
        itemTrips.push(trip);
        if (this.state.docType && this.state.docType.length > 0 && this.state.deletedVehicleCode && this.state.deletedVehicleCode.length > 0) {

          let tripPanel = this.state.tripsPanel;
          tripPanel.map((trip) => {
            if (trip.code === this.state.deletedVehicleCode) {
              trip.optistatus = null
            }
          });
          this.setState({ tripsPanel: tripPanel })
          this.setState({ docType: '' });
          this.setState({ deletedVehicleCode: '' })
        }
      }
      var user = JSON.parse(localStorage.getItem("authUser"));
            let details = {
              loginUser: user.username,
              dateTime: new Date(),
              type: ''
            }

            if (itemTrips[0].totalObject.logData && itemTrips[0].totalObject.logData.length > 0) {
              if (route && route.length > 0) {
                details.type = route
              } else {
                details.type = 'modify'
              }
              itemTrips[0].totalObject.logData.push(details)
            } else {
              itemTrips[0].totalObject.logData = [];
              details.type = 'create'
              itemTrips[0].totalObject.logData.push(details);
            }

      this.submitTrips(itemTrips);
      var currDropsPanel = this.state.dropsPanel;
      var drops = currDropsPanel.drops;
      var pickUps = currDropsPanel.pickUps;

      for (var i = 0; i < trip.dropObject.length; i++) {
        for (var j = 0; j < drops.length; j++) {
          if (trip.dropObject[i].docnum === drops[j].docnum) {
            drops[j].vehicleCode = trip.code;
            drops[j].type = "Allocated";
          }
        }
      }



      currDropsPanel.drops = drops;


    } else {
      this.handleDateChange(this.state.date);
      this.notifyError("Vehicle is mandatory");
    }
  };

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

  changeDate = (day,dayflag, from) => {

  var flagconsider = false;
  if(from == 'checked') {
    
    flagconsider = dayflag;
     
  }
  else if (from == 'buttons') {
   
   flagconsider = this.state.checked5days;
     
  }

 var currDate = moment(this.state.dropDate).add(day, 'days');
 var sdate = moment(currDate).add(-5, 'days');
  var edate = moment(currDate).add(5, 'days');
    var newDate = moment(currDate).format('YYYY-MM-DD');
  var newStartDate = moment(sdate).format('YYYY-MM-DD');
  var newEndDate = moment(edate).format('YYYY-MM-DD');
   
     if(flagconsider) {

         
         fetchRailDropsPanelwithRange(this.state.selectedMultipleSites, newStartDate,newEndDate)
               .then(([res1]) => {
                 var dropsP = res1;
                 
                // this.filterDropsDiv(newDate, dropsP);
                 
                 this.setState({
                   dropDate: new Date(newDate),
                   dropsPanel: dropsP,
                 });
               }).catch(error => {

               });

     }
     else {
    
    fetchRailDropsPanel(this.state.selectedMultipleSites, newDate)
      .then(([res1]) => {
        var dropsP = res1;
        
       // this.filterDropsDiv(newDate, dropsP);
        
        this.setState({
          dropDate: new Date(newDate),
          dropsPanel: dropsP,
        });
      }).catch(error => {

      });
      }
  };



  filterDropsDiv = (day, dropsPanel) => {
    var currDate = moment(this.state.date).format('YYYY-MM-DD');
    var status = false;
    if (currDate > day) {
      status = true
    }
    else if (currDate < day) {
      status = true;
    }
    else {
      status = true;
    };

    if (status) {
      var trips = this.state.slectedTrips;
      for (var i = 0; i < dropsPanel.drops.length; i++) {

        for (var j = 0; j < trips.length; j++) {
          if (trips[j].docnum == dropsPanel.drops[i].docnum) {
            dropsPanel.drops[i].type = "selected";
            dropsPanel.drops[i].vehicleCode = trips[j].vehicleCode;
          }
        }
      }
      for (var i = 0; i < dropsPanel.pickUps.length; i++) {
        for (var j = 0; j < trips.length; j++) {
          if (trips[j].docnum == dropsPanel.pickUps[i].docnum) {
            dropsPanel.pickUps[i].type = "selected";
            dropsPanel.pickUps[i].vehicleCode = trips[j].vehicleCode;
          }
        }
      }
    }
  }



  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

    checkedToPlan = (checked) => {
      this.setState({ checkedToPlan: checked })
    }


      checked5days = (checked) => {
           
          this.setState({ checked5days: checked })
          this.changeDate(0, checked, 'checked');
        }

    updateTopBar = () => {
      var trips = this.state.tripsPanel;
      var vehicleList = [];
      var routesCount = 0;
      var Drop_prodCount = 0;
      var Pickup_prodCount = 0;
      var assignedOrders = 0;
      var unassignedOrders = 0;
      for (var i = 0; i < trips.length; i++) {
        if (!vehicleList.includes(trips[i].code)) {
          vehicleList.push(trips[i].code);
        }
        routesCount += 1;
      }
      for (var i = 0; i < trips.length; i++) {
        var dropobj = [];
        var pickupobj = [];

        if (null !== trips[i].dropObject) {
          for (var j = 0; j < trips[i].dropObject.length; j++) {
            for (var k = 0; k < trips[i].dropObject[j].products.length; k++) {
              Drop_prodCount += parseInt(trips[i].dropObject[j].products[k].quantity);
            }
          }
        }

        if (null !== trips[i].pickupObject) {
          for (var j = 0; j < trips[i].pickupObject.length; j++) {
            for (var k = 0; k < trips[i].pickupObject[j].products.length; k++) {
              Pickup_prodCount += parseInt(trips[i].pickupObject[j].products[k].quantity);
            }
          }
        }
      }

      var drops = this.state.dropsPanel.drops;
      var pickups = this.state.dropsPanel.pickUps;
      for (var j = 0; j < drops.length; j++) {
        if (drops[j].type != 'open') {
          assignedOrders += 1;
        } else {
          unassignedOrders += 1;
        }
      }
      for (var k = 0; k < pickups.length; k++) {
        if (pickups[k].type != 'open') {
          assignedOrders += 1;
        } else {
          unassignedOrders += 1;
        }
      }
      unassignedOrders = (this.state.dropsPanel.drops.length + this.state.dropsPanel.pickUps.length) - assignedOrders;
      var topDetails = {};
      topDetails.vehicleCount = vehicleList.length;
      topDetails.routesCount = routesCount;
      topDetails.assignedOrders = assignedOrders;
      topDetails.unassignedOrders = unassignedOrders;
      topDetails.travelTime = 0;
      topDetails.serviceTime = 0;

      topDetails.DropProdCount = Drop_prodCount;
      topDetails.PickupProdCount = Pickup_prodCount;
      this.setState({
        topDetails: topDetails
      });
    }

  handleMulti = (sites) => {
    this.setState({ sites });
  };

  handleDefault(date) {
    this.setState({
    default_date: date ,
    date : date

    });
  }

  onMarkerClick(props, marker, e) {
    alert("You clicked in this marker");
  }


  Timeline_SelectedSite = () => {
   let optionItems = [];
          var optionSelected = {};
          var selectedSite = {};
          var placeHolder = "All";
          this.state.sites && this.state.sites.length > 0 && this.state.sites.map((site) => {
              if (site.id == this.state.selectedSite) {
                  selectedSite = site;
                  placeHolder = site.value;
                  optionSelected.value = site.id;
                  optionSelected.label = (site.value + "(" + site.id + ")");
              }
              optionItems.push({ value: site.id, label: (site.value + "(" + site.id + ")") })
          });
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
         trips: emptyTrip,

        });
      
      
        this.handleDateChange(this.state.date);
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
       
        
       Promise.all([fetch('http://tmsportal.tema-systems.com:8082/api/v1/transport/usrsites?user='+ user.username)])
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
        
        
        this.setCurrentSite(selectedOption);
       const currDate = moment(this.state.date).format('YYYY-MM-DD');
       
       fetchRailCarOutBoundAPI(selectedOption, currDate)
         .then(([res1, res2, res3]) => {
           this.setState({
             railcarCheckInList: res1,
             dropsPanel : res2,
             tripsPanel : res3

           });
         }).then(() => {
           this.updateTopBar();
           this.refreshSite();
         }).catch(error => {

         });
     };


refreshSite = () => {
  //  this.updateGeoLocations();
  //  this.enableDroppedDiv();
    
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

  handleDateChange = (date) => {
    
    const currDate = moment(date).format('YYYY-MM-DD');
    

    let value = this.state.selectedMultipleSites
    fetchRailCarOutBoundAPI(value, currDate)
      .then(([res1, res2, res3,status1,status2,status3]) => {
        /*
          if(status1 === 200 && status2 === 200 && status3 === 200){
                   this.setState({loading: false})
          }
          */

        this.setState({
          date: currDate,
          default_date : currDate,
           dropDate: currDate,
           deliverySite: '',
           trips : [],
          updatedArrSite: '',
          allowedDrivers: [],
          trailers : [],
          checkedToPlan: false,
          checked5days : false,
          checked30daysRailtrips : false,
          railcarIsChecked :false,
          allAllowedDrivers: false,
          vehicleDropped : false,
          trailerDropped : false,
          allowedTrailers: [],
          droppedTrailers : [],
          allAllowedTrailers: false,
          dropDate : currDate,
          railcarCheckInList: res1,
          dropsPanel: res2,
          tripsPanel: res3
        });
      }).then(() => {
        

        this.refreshSite();
      }).catch(error => {

      });
  };

  onVRhide = () => {
    this.setState({
      vehicleShow: 'block',
      RouteoptiShow : 'none',
      vrShow: 'none'
    });
  }






/*
  updateTripsGeoLocations = (index , status) => {
   // var checkboxes = document.getElementsByName("tripsCheckBox");
    
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
       
      this.removeTrips();
//      checkboxes[index].checked = true;

      this.updateTripsPanel(currMarkers, currGeoData, index);
      this.setState({ selectedIndex: index, checkedTrip: true, RouteoptiShow:'block' })
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
*/
    updateSelectedTrip = (count) => {
      var selectedTrips = this.state.slectedTrips;
      this.setState({
        selectedTripData: selectedTrips[count],
        left: (count + 1) * 55,
      });
    }


updateTripsPanel = (currMarkers, currGeoData, i) => {


   
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
    
     
      
        


      if (type === "vehicle") {
          const url = 'http://tmsportal.tema-systems.com:8082/api/v1/rail/railcarstatus?rail=' + valueObj.railcarid;
          fetch(url)
            .then(function (response) {
              return response.json()
            }).then((res) => {
           //  
          });

          }


/*
    
 let draggedData = {};
    draggedData.currentCard = JSON.stringify(valueObj);
    draggedData.type = type;
    draggedData.id = type + index;
    draggedData.index = index;

   this.setState({
        dataTransfer : draggedData,
        isDragged : true
   });
*/
 event.dataTransfer.setData("currentCard", JSON.stringify(valueObj));
    event.dataTransfer.setData("type", type);
    event.dataTransfer.setData("row-id", id);
    event.dataTransfer.setData("index", index);

   
   

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

dropResetObj = (trip) => {
    if (this.state.dropsPanel && this.state.dropsPanel && this.state.dropsPanel.drops.length > 0) {
      let dropsPanel = this.state.dropsPanel;
      var drops = dropsPanel.drops;
      var pickUps = dropsPanel.pickUps;
      drops.map((drop) => {
        if (trip.dropObj && trip.dropObj.length > 0) {
          trip.dropObj.map((dropOb) => {
            if (drop.docnum === dropOb.docnum) {
              drop.type = "open"
            }
          })
        }
      });
      pickUps.map((pickUp) => {
        if (trip.pickupObject && trip.pickupObject.length > 0) {
          trip.pickupObject.map((pickOb) => {
            if (pickUp.docnum === pickOb.docnum) {
              pickUp.type = "open"
            }
          })
        }
      });

      dropsPanel.drops = drops;
      dropsPanel.pickUps = pickUps;
      this.setState({ dropsPanel: dropsPanel })
    }
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
   
   var temp = "[row-id="+divTag+"]";
  //  var htmlDiv = document.getElementById(divTag);
   
  var htmlDiv = document.querySelectorAll(temp);
    var { droppedDivs } = this.state;
     
    droppedDivs.push(temp);
    this.setState({ droppedDivs });
  }

  enableDroppedDiv = () => {
    var currVehPanel = this.state.vehiclePanel;
    var currDropsPanel = this.state.dropsPanel;
    var vehicles = currVehPanel.vehicles;
    var equipments = currVehPanel.equipments;
    var drivers = currVehPanel.drivers;
    var trails = currVehPanel.trails;
    var drops = currDropsPanel.drops;
    var pickUps = currDropsPanel.pickUps;

    for (var i = 0; i < vehicles.length; i++) {
      if (vehicles[i].isDropped) {
        vehicles[i].type = "open";
      }
    }
    for (var i = 0; i < equipments.length; i++) {
      if (equipments[i].isDropped) {
        equipments[i].type = "open";
      }
    }
    for (var i = 0; i < drivers.length; i++) {
      if (drivers[i].isDropped) {
        drivers[i].type = "open";
      }
    }
    for (var i = 0; i < trails.length; i++) {
      if (trails[i].isDropped) {
        trails[i].type = "open";
      }
    }
    currVehPanel.vehicles = vehicles;
    currVehPanel.equipments = equipments;
    currVehPanel.drivers = drivers;
    currVehPanel.trails = trails;

    for (var i = 0; i < drops.length; i++) {
      if (drops[i].isDropped && drops[i].type != 'Allocated') {
        drops[i].type = "open";
      }
    }
    for (var i = 0; i < pickUps.length; i++) {
      if (pickUps[i].isDropped && pickUps[i].type != 'Allocated') {
        pickUps[i].type = "open";
      }
    }

    currDropsPanel.drops = drops;
    currDropsPanel.pickUps = pickUps;

    this.setState({
      vehiclePanel: currVehPanel,
      dropsPanel: currDropsPanel
    });
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

onValidateAll = ()=>{
    var tripsPanels = this.state.tripsPanel;
    fetch('api/v1/transport/groupvalidate', {
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
       
       var tripsPanels = this.state.tripsPanel;
       var ClickedTrip = tripsPanels[i];
       let trips = ClickedTrip;
       fetch('api/v1/transport/validate', {
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
                        comboData : res3,
                        boldetail : res4
                      });
                    }).catch(error => {
                      // history.push('/');
                    });

   }


  railcarStatus_Change = (code, status) => {
   
    let StatusupdateDetail = {
           "code" : code,
           "status" : status
    }
      fetch('http://tmsportal.tema-systems.com:8082/api/v1/rail/status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(StatusupdateDetail)
        }).then((response) => {
          this.handleErrors(response);
        }).then( () => {
          this.setState({ loading: false });
          this.notifySucess("RailCar Status Updated Sucessfully");
           // call vrClick functionality
             fetchRailVR(code)
                 .then(([res1, res2, res3, res4]) => {
                   this.setState({
                     vrlist: res1,
                     vrdetaillist: res2,
                     comboData : res3,
                     boldetail : res4
                   });
                 }).catch(error => {
                   // history.push('/');
                 });
                 });


      }



 validateonly = (i,pageType) => {
     
     var tripsPanels = this.state.tripsPanel;
     var ClickedTrip = tripsPanels[i];
     let trips = ClickedTrip;
     fetch('api/v1/transport/validate', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(trips)
     }).then((response) => {
       this.handleErrors(response);
     }).then( () => {
       this.setState({ loading: false });
       this.notifySucess("Trip Validated Sucessfully");
        // call vrClick functionality
        if(pageType === 'vrHeader'){
         var tripsPanels = this.state.tripsPanel;
         var selVR_num = tripsPanels[i].itemCode;
         fetchLVS(selVR_num)
         .then(([res1]) => {
           this.setState({
             loadvehstock: res1
           });
         }).then(() => {
           this.setState({selectedVrValidated: true})
         }).catch(error => {
          // history.push('/');
         });      }
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
    
    var checkboxes = document.getElementsByName("tripsCheckBox1");
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

  updateTripsPanel_beforeLocking(currMarkers_bl,i){
  
    var tripsPanels = this.state.tripsPanel;
    var tripsList_bl = tripsPanels[i];
  //  
    var slectTrip_bl = tripsPanels[i].totalObject;
    var selectedTrip_bl = slectTrip_bl.selectedTripData;
    for (var j = 0; j < tripsPanels[i].dropObject.length; j++) {
      tripsPanels[i].dropObject[j].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].dropObject[j].lock = tripsPanels[i].lock;
      currMarkers_bl.push(tripsPanels[i].dropObject[j]);
     }
    this.setState({
          clickedTrips: tripsList_bl,
          bl_tripsList : tripsList_bl,
          bl_selectedTripData: selectedTrip_bl,
          bl_markers: currMarkers_bl,
          triplock : false,
          vehicleShow: 'none',
          RouteoptiShow : 'none',
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
          comboData : res3,
          boldetail : res4
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
      triplock : true,
      vehicleShow: 'none',
      RouteoptiShow : 'none',
      vrShow: 'block'
    });
  }

  onVRhide = () => {
    this.setState({
      vehicleShow: 'block',
       RouteoptiShow : 'none',
      vrShow: 'none'
    });
  }

  onRouteoptihide = () => {
    this.setState({
      vehicleShow: 'block',
      RouteoptiShow : 'none',
      vrShow: 'none'
    });
  }

  onLoadermessage = (tripindex,msg) => {
      var tripsPanels = this.state.tripsPanel;
      var tripsList_loader = tripsPanels[tripindex];
      tripsList_loader.loaderInfo = msg;

      
      this.confirmTrip(tripsList_loader, "loaderMsg");

  }

  onForcesequnceCheck = (tripindex,msg) => {

  
   var tripsPanels = this.state.tripsPanel;
   var trips = []
   var tripsList_force = tripsPanels[tripindex];
      tripsList_force.date = moment(this.state.date).format("YYYY-MM-DD");
  if(msg){
    tripsList_force.forceSeq = true;
  }
  else {
    tripsList_force.forceSeq = false;
  }
  trips.push(tripsList_force);
   this.submitTrips(trips);
  }


  onDocmessage = (docNum,msg, Msgtype) =>{
      var currentGeoData = this.state.geoData;
      var currentMarkers = this.state.markers;
      var trips = [];
      var geoData = [];
      var currMarkers = [];
      var trip = this.state.trips[0];

      currentGeoData && currentGeoData.map((geoData,index)=>{
        if(geoData.docnum && geoData.docnum === docNum) {
          if(Msgtype === 'doc') {
             geoData.noteMessage = msg
          }
          else if(Msgtype === 'carrier') {
           geoData.CarrierMessage = msg
          }
          else {
          geoData.loaderMessage = msg
          }

        }
      })

      currentMarkers && currentMarkers.map((currMarker,index)=>{
        if(currMarker.docnum && currMarker.docnum === docNum) {
          currMarker.noteMessage = msg
        }
      })
      trip && trip.totalObject && trip.totalObject.selectedTripData && trip.totalObject.selectedTripData.map((TripData)=>{

        if(TripData.docnum && TripData.docnum === docNum) {
          if(Msgtype === 'doc') {
           
          TripData.noteMessage = msg
          }
          else if(Msgtype === 'carrier') {

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



  onTripDelete = (index, docnum, vtype, vcode) => {
   
     
       
         
    var currentGeoData = this.state.geoData;
    var currentMarkers = this.state.markers;
    var geoData = [];
    var currMarkers = [];
    var currDropsPanel = this.state.dropsPanel;
    var drops = currDropsPanel.drops;
    var pickUps = currDropsPanel.pickUps;
    var trips = [];
    var trip = this.state.trips[0];
    var removeDocs = [];

  
  
  
  
    if (currentGeoData[index].panelType == 'pickup') {
      var pickCount = trip.pickups;
      trip.pickups = pickCount - 1;
      removeDocs.push(docnum);
      for (var i = 0; i < pickUps.length; i++) {
        if (pickUps[i].docnum == docnum) {
          pickUps[i].type = "open";
          pickUps[i].vehicleCode = "";
        }
      }

      //to get Paired document for the deleted Pikcup element
      for (var k = 0; k < trip.pickupObject.length; k++) {
        if (trip.pickupObject[k].docnum === docnum) {
          if (trip.pickupObject[k].pairedDoc != undefined && trip.pickupObject[k].pairedDoc != ' ') {
            var dropCount = trip.drops;
            trip.drops = dropCount - 1;
            removeDocs.push(trip.pickupObject[k].pairedDoc);
          }
          for (var j = 0; j < drops.length; j++) {
            if (drops[j].docnum == trip.pickupObject[k].pairedDoc) {
              drops[j].type = "open";
              drops[j].vehicleCode = "";
            }
          }
        }
      }
    }

    if (currentGeoData[index].panelType == 'drop') {
      var dropCount = trip.drops;
      trip.drops = dropCount - 1;
      removeDocs.push(docnum);
      for (var j = 0; j < drops.length; j++) {
        if (drops[j].docnum == docnum) {
          drops[j].type = "open";
          drops[j].vehicleCode = "";
        }
      }

      //to get Paired document for the deleted Drop element
      for (var k = 0; k < trip.dropObject.length; k++) {
        if (trip.dropObject[k].docnum === docnum) {
          if (trip.dropObject[k].pairedDoc != undefined && trip.dropObject[k].pairedDoc != ' ') {
            var pickCount = trip.pickups;
            trip.pickups = pickCount - 1;
            removeDocs.push(trip.dropObject[k].pairedDoc);
          }
          for (var i = 0; i < pickUps.length; i++) {
            if (pickUps[i].docnum == trip.dropObject[k].pairedDoc) {
              pickUps[i].type = "open";
              pickUps[i].vehicleCode = "";
            }
          }
        }
      }
    }

    currDropsPanel.drops = drops;
    currDropsPanel.pickUps = pickUps;
    var stops = parseInt(trip.pickups) + parseInt(trip.drops);
    trip.startIndex = stops;
    trip.stops = stops;
    for (var i = 0; i < currentGeoData.length; i++) {
      if (!removeDocs.includes(currentGeoData[i].docnum)) {
        geoData.push(currentGeoData[i]);
      }
    }

    for (var i = 0; i < currentMarkers.length; i++) {
      if (!removeDocs.includes(currentMarkers[i].docnum)) {
        currMarkers.push(currentMarkers[i]);
      }
    }
    var currSelectedTrips = this.state.slectedTrips;
    var selectedTrips = [];
    
    for (var i = 0; i < currSelectedTrips.length; i++) {
      if (!removeDocs.includes(currSelectedTrips[i].docnum)) {
        selectedTrips.push(currSelectedTrips[i]);
      }
    }
    var pickupObject = [];
    for (var i = 0; i < trip.pickupObject.length; i++) {
      if (!removeDocs.includes(trip.pickupObject[i].docnum)) {
        pickupObject.push(trip.pickupObject[i]);
      }
    }
    var dropObject = [];
    for (var i = 0; i < trip.dropObject.length; i++) {
      if (!removeDocs.includes(trip.dropObject[i].docnum)) {
        dropObject.push(trip.dropObject[i]);
      }
    }

    trip.pickupObject = pickupObject;
    trip.dropObject = dropObject;

    
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
    for (var i = 0; i < count; i++) {
      if (selectedTrips[i].panelType === 'drop') {
        tripColor[i] = '#7ace4c';
      } else if (selectedTrips[i].panelType === 'pickup') {
        tripColor[i] = '#09aaed';
      }
    }
    trips.push(trip);
    
    this.setState({
      markers: currMarkers,
      geoData: geoData,
      trips: trips,
      tripColor: tripColor,
      slectedTrips: selectedTrips,
      selectedTripData: selectedTrips[count - 1],
      left: count * 55,
      dropsPanel: currDropsPanel,
      mapChanged: true,
      docType: vtype,
      deletedVehicleCode: vcode
    });
  }
  // end of onTrip Delete
  lockTrip = (trips, index) => {
     
    var tripsPanel = this.state.tripsPanel;
    tripsPanel[index].lock = true;
    fetch('http://tmsportal.tema-systems.com:8082/api/v1/rail/lock/trips', {
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

    
    if(checkboxes[i].checked) {

     
     var carlist = this.state.railcarCheckInList;

     var CheckedRailcar = carlist[i];

     this.setState({
         railcarIsChecked : true,
         CheckedRailcar : CheckedRailcar
     });
     }
     else {
     this.setState({
              railcarIsChecked : false,
              CheckedRailcar : ''
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
        this.changeDate(0,false,'buttons');
      })
  }



  deleteTrip = (trips, index) => {
    var tripsPanel = this.state.tripsPanel;
    tripsPanel[index].lock = true;
    const currDate = moment(this.state.date).format('YYYY-MM-DD');
    let value = this.state.selectedMultipleSites
    fetch('http://tmsportal.tema-systems.com:8082/api/v1/rail/delete/trip', {
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
  getRouteSchedulerApp = (routesSchedule, optimisedindex , auto) => {

     var data = [];
     var newGeoData = [];
    if(auto) {
        var tempoptimisedIndex= [];

        //map
       const tempdata =  optimisedindex.map((order , index) => {
            for(var i = 0 ; i < order.length ; i++){


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
          if(matched === true) {
             newGeoData.push(data);
          }

      })
      }
    else{

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

  render() {
 let optionItems = [];
        var optionSelected = {};
        var selectedSite = {};
        var placeHolder = "All";

       this.state.sites&& this.state.sites.length>0 && this.state.sites.map((site) => {
         /*
            if(site.id == this.selectedSite.id) {
                selectedSite = site;
                placeHolder = site.value;
                optionSelected.value = site.id;
                optionSelected.label = (site.value + "(" + site.id + ")");
            }
            */
            optionItems.push({ value: site.id, label: (site.value + "(" + site.id + ")")} )
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
    else if(this.state.bl_markers && this.state.bl_markers[0]){
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
                           handleDateChange={this.handleDateChange}
                           onVRhide={this.onVRhide}
                           vrShow={this.state.vrShow}
                           vehicleShow = {this.state.vehicleShow}
                           RouteoptiShow={this.state.RouteoptiShow}
                           guageTrip={this.state.guageTrip}
                           vehiclePanel={this.state.vehiclePanel}
                           getValuestoApp={(routesSchedule, optiindex, auto) => this.getRouteSchedulerApp(routesSchedule, optiindex, auto)}
                           tripsPanel={this.state.tripsPanel}
                           refreshAllPanels = {this.refreshAllPanels}

                         >
               </SideNav>
            <section style={{ display: this.state.vehicleShow }}>
            <Row className="mt-3">
              <Col md="6">
                 <VehiclePanel
                 curRailcarList={this.state.railcarCheckInList}
                 handleDragStart={this.handleDragStart}
                 allAllowedDrivers={this.state.allAllowedDrivers}
                 vehicleDropped = {this.state.vehicleDropped}
                 allowedDrivers={this.state.allowedDrivers}
                 allowedTrailers={this.state.allowedTrailers}
                 allAllowedTrailers={this.state.allAllowedTrailers}
                 searchVeh={this.state.searchVString}
                 searchTra=  {this.state.searchTString}
                 railcarChecked_fn = {this.railcarChecked_fn}
                 searchEqu = {this.state.searchEString}
                 searchDrv = {this.state.searchDString}
                 updateVehSearchTerm = {this.updateVehSearchTerm}
                 updateTrailSearchTerm = {this.updateTrailSearchTerm}
                 updateDriverSearchTerm = {this.updateDriverSearchTerm}
                 updateEquSearchTerm = {this.updateEquSearchTerm}
                 sortEquipement={this.sortEquipement}
                 equpOrder={this.state.equpOrder}
                 sortDriver={this.sortDriver}
                 diverOrder={this.state.diverOrder}
                 sortVehicles={this.sortVehicles}
                 vehOrder={this.state.vehOrder}
                 sortTrailer={this.sortTrailer}
                 trailOrder={this.state.trailOrder}

                 />
              </Col>
              <Col md="6">
                   <DocumentsPanel
                   CheckedRailcardetails = {this.state.CheckedRailcar}
                   railcarIsChecked = {this.state.railcarIsChecked}
                     checkedToPlan={this.checkedToPlan}
                        checked5days = {this.checked5days}
                         daysCheckedIn = {this.state.checked5days}
                        saveSealnumber = {this.saveSealnumbers}
                     dropsPanel={this.state.dropsPanel}
                     changeDate={this.changeDate}
                     trailerDropped = {this.state.trailerDropped}
                     deliverySite={this.state.deliverySite}
                     droppedTrailers = {this.state.droppedTrailers}
                     handleDragStart={this.handleDragStart}
                    sortPickup={this.sortPickup}
                    pickOrder={this.state.pickOrder}
                    sortDrop={this.sortDrop}
                    dropOrder={this.state.dropOrder}
                     selectedDate={this.state.dropDate}
                     updateDropSearchTerm = {this.updateDropSearchTerm}
                     updatePickupSearchTerm = {this.updatePickupSearchTerm}
                     searchDrp = {this.state.searchDrpString}
                     searchPck = {this.state.searchPckString}


                     />

              </Col>
               <Col md="12">
                <AddUpdateTrip1
                isDragged = {this.state.isDragged}
                dataTransfer = {this.state.dataTransfer}
                updatedArrSite={this.state.updatedArrSite}
                confirmTrip={this.confirmTrip}
                addGeoLocations={this.addGeoLocations}
                clearTrips={this.state.clearTrips}
                    clearEquipments={this.clearEquipments}
                disableDroppedDiv={this.disableDroppedDiv}
                updateClearTripsFlag={this.updateClearTripsFlag}
                trips={this.state.trips}
                updateTrip={this.updateTrip}
                updateTripCount={this.updateTripCount}
                selectedTrips={this.state.selectedTrips}
                toggleDetail = {this.toggleDetail}
                trailers={this.state.trailers}
                        equipments={this.state.equipments}
                        quantities={this.state.quantities}
                        updateTrialers={this.updateTrialers}
                        updateEqupments={this.updateEqupments}
                        updateQuantities={this.updateQuantities}
                        addGeoList={this.addGeoList}
                        refreshSite={this.refreshSite}
                        tripColor={this.state.tripColor}
                        tripbgColor={this.state.tripbgColor}
                        selectedTripData={this.state.selectedTripData}
                        left={this.state.left}
                        updateTripValue={this.updateTripValue}
                        updateSelectedTrip={this.updateSelectedTrip}
                        disableDivs={this.disableDivs}
                        colourDivs={this.colourDivs}
                        colourDocDivs = {this.colourDocDivs}
                        notes={this.state.notes}
                        onSaveNotes={this.onSaveNotes}
                        curVehiclePanel={this.state.vehiclePanel}
                        unlockTrip={this.unlockTrip}
                        currDropsPanel={this.state.dropsPanel}
                        tripsPanel={this.state.tripsPanel}
                        addSelectedTrips={this.addSelectedTrips}
                        sites={this.state.sites}
                        selectedSitesArr={this.state.selectedSitesArr}
                        ResetUpdateTrip={this.ResetUpdateTrip}
                        filterTrans_depSite={this.filterTrans_depSite}
                        checkedTrip={this.state.checkedTrip}
                        handleArrSite={this.handleArrSite}
                        dropResetObj={this.dropResetObj}
                        updateResetTrip={this.updateResetTrip}
                        clearTrailers={this.clearTrailers}
                        enableDivs={this.enableDivs}
                        updateGeoLocations={this.updateGeoLocations}
                                        />
                 </Col>
  <Col md="6">
                <RailRouteList
                  tripsList = {this.state.tripsPanel}
                  curRailcarList={this.state.railcarCheckInList}
                  onVRClick={this.onVRClick}
                  dropsPanel={this.state.dropsPanel}
                  updateTripsGeoLocations={this.updateTripsGeoLocations}
                  updateTripsGeolocationbeforelock = {this.updateTripsGeolocationbeforelock}
                  onLockRecord={this.onLockRecord}
                  vehiclePanel={this.state.vehiclePanel}
                  validate={this.validate}
                  onCompleteTripDelete={this.onCompleteTripDelete}
                   date={this.state.date}
                   selectAllTripsPanel={this.selectAllTripsPanel}
                   routeSchedulerData={this.state.routeSchedulerTime}
                   UnlockConfirmTrip={this.UnlockConfirmTrip}
                   onValidateAll={this.onValidateAll}
                   onloaderMsg = {this.onLoadermessage}
                   onForceseq = {this.onForcesequnceCheck}
                   checked30daysRailtrips = {this.checked30daysRailtrips}
                   daysforRailTripsCheckedIn = {this.state.checked30daysRailtrips}
                  />
                  </Col>
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
            </Row>
            </section>
            <section style={{ display: this.state.vrShow }}>
                          <Row className="mt-3">
                          <Col xs="12">

                            <VrHeader
                               vrdata={this.state.vrlist}
                               selectedVrIndex = {this.state.selectedVrIndex}
                               selectedVrValidated = {this.state.selectedVrValidated}
                               validate={this.validate}
                               validateonly = {this.validateonly}
                               loadvehstck={this.state.loadvehstock}
                               tripdetails={this.state.clickedTrips}
                               railcarStatus_Change = {this.railcarStatus_Change}
                               refreshVRScreens = {this.refreshVRScreens}
                             />
                            </Col>
                          <Col lg="12" style={{ height:'auto'}}>
                            <VrStops4
                          vedetail={this.state.vrdetaillist}
                          comboData = {this.state.comboData}
                          boldata = {this.state.boldetail}
                          tripdetails={this.state.clickedTrips}
                           sites={this.state.sites}
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
