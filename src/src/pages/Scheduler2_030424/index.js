import React, { Component } from "react";
import Select from "react-select";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { AgGridReact } from "ag-grid-react";
import ScheduleTrips from './Panel/ExternalDragDrop';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { logoutUser } from '../../store/actions';
import IdleTimerContainer from '../../IdleTimerContainer';
import { fetchSchedulerAPI } from '../../service';
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { convertHrToSec,convertSecToMin,secondsToHms,splitTimeAndConv2Sec,splitTimeAndAddtimeAndConv2Sec,convertSecToHr, formatTime, formatHHMM,splitTime, convertHrToMin } from './converterFunctions/converterFunctions';
import moment from 'moment';
import SideNav from './Nav1/SideNav';
import SideNav_Test from './Nav1/SideNav_Test';
import Alert from './Panel/Alert';
import { fetchAPI, fetchDocumentPanelAPI,fetchDocumentPanelwithRange } from '../../service';
import { CreatePOfromFrequency2 } from '../../service';
import { CreateDelvieriesfromOrdersinRoute } from '../../service';
import XMLParser from 'react-xml-parser';
import { fetchPanel } from '../../service';
import { fetchTrips } from '../../service';
import { fetchDropsPanel } from '../../service';
import { fetchDropsPanelwithRange , fetchSchedulerDocsAPI} from '../../service';
import { fetchVR,fetchLVS } from '../../service';
import VehiclePanel  from './Panel/VehiclePanel';
import DocumentsPanel from './Panel/DocumentsPanel';
import AddUpdateTrip1 from './Panel/AddUpdateTrip1';
import TripsList3 from './Panel/TripsList3';
import VrHeader  from './Panel/VrHeader';
import VrStops3 from './Panel/VrStops3';
import Timeline from './Panel/Timeline';
import RouteMap1 from './Panel/RouteMap1';
import IndividualRouteMap2 from './Panel/IndividualRouteMap2';
import VrTotals from './Panel/VrTotals';
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
 this.schedulerRef = React.createRef();
    this.state = {
      activeTab: "Vehicles",
       checkedToPlan: false,
       checkedToOpen : false,
       checkedToOptimise :false,
       checkedToLock :false,
       checkedToValidate : false,
       checked5days : false,
       checkedDropsList : false,
       checkedPickupList : false,
       checkedsameVehicles : false,
       checkedToShowinMap : false,
       optimisedClickedTrip : false,
       defaultdocprocess : 90,
       isDragged : false,
         loader  : false,
       selectedDocumentList : [],
       docs4rautoselection : [],
       doc4autoselection : {},
       vehs4autoselection : [],
       veh4autoselection : {},
      breadcrumbItems: [
        { title: "Route Planner", link: "#" },
        { title: "Dashboard", link: "#" },
      ],
      isTimeline: false,
        SelectedGroupBy : 'Vehicles',
      vehicleShow: 'block',
      schedulerShow : 'block',
      RouteoptiShow : 'none',
      vrShow: 'none',

      vehicleChecked : 'none',
 vrlist: [],
    bl_markers : [],
       SelectedDeletedDocs : [],
       bl_tripsList : {},
       initalload: true,
    deliverySite: '',
   searchVString: '',
   searchSiteString : '',
   searchTString: '',
   searchEString: '',
   searchDString: '',
   searchDrpString: '',
   alert : false,
   alertMessage : '',
    documentPanel_date : '',
         documentPanel_dateflg : false,
         documentPanel_5dayscheck : false,
         filterVehicleflg  : false,
   searchTripString: '',
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
 selectedRouteCode: {
              id: 'All'
            },
            selectedVehicleCode: {
                         id: 'All'
                       },
      selectedSiteValue: '',
      selectedRoutecodeValue : '',
      guageTrip: {},
       addAlertShow: false,
       errorMessage: '',
      selectedMultipleSites: '',
        markers: [],
          geoData: [],
            mapChanged: false,
               clearTrips: false,
  trips: [],
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
       vehiclePanel: {
              vehicles: [],
              equipments: [],
              trails: [],
              drivers: []
            },
     RouteCode : null,
 docsPanel : [],
 dropsPanel: {
        drops: [],
        pickUps: []
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
         -1,
         -1,
         -1,
         -1,
         -1,
         -1,
         -1,
         -1,
         -1,

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
         TotalvehicleCount : 0,
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
      selectedRouteCodeArr : [],
      selectedVehicleCodeArr : [],
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
      googeMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyANa5oogYwmC9XtnHep09-JoU0Bjp13tWU&v=3.exp&libraries=geometry,drawing,places'

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


  Dateformat () {


  }


 updateMagChaged = () => {
    this.setState({
      mapChanged: false
    });
  }

updateSiteSearchTerm = (event) => {
      this.setState({ searchSiteString: event.target.value });
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
            // console.log("DropSearch item =", event.target.value);
         this.setState({ searchDrpString: event.target.value });
       }
  updatePickupSearchTerm = (event) => {
                this.setState({ searchPckString: event.target.value });
              }

  updateTripsSearchTerm = (event) => {

 this.setState({ searchTripString: event.target.value });
  }

      colourDivs = (allDrivers, dlist, allTrailers, tlist) => {
         // console.log("T22 - inside  index, change colorDivs");
        this.setState({
          allAllowedDrivers: allDrivers,
          allAllowedTrailers: allTrailers,
          allowedDrivers: dlist,
          vehicleDropped: true,
          allowedTrailers: tlist
        });

        // console.log("T22 after assiging -vehicleDropped",this.state.vehicleDropped);
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
       if ("docdate" === type) {
              cusPick.sort((a, b) => (a.docdate < b.docdate) ? 1 : -1)
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
       if ("docdate" === type) {
              cusPick.sort((a, b) => (a.docdate > b.docdate) ? 1 : -1)
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
    var cusDropsPanel = this.state.docsPanel;
    var cusPick = this.state.docsPanel;
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
      if ("docdate" === type) {
              cusPick.sort((a, b) => (a.docdate < b.docdate) ? 1 : -1)
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
        if ("docdate" === type) {
                    cusPick.sort((a, b) => (a.docdate > b.docdate) ? 1 : -1)
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
    cusDropsPanel = cusPick;
    this.setState({
      docsPanel: cusDropsPanel,
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
    // console.log("T31  inside disableDivs ", index);
    // console.log("T31  inside disableDivs type", type);
    // console.log("T31  inside disableDivs docnum", docNum);
    var currVehPanel = this.state.vehiclePanel;
    var currDocssPanel = this.state.docsPanel;
 // console.log("inside disablediv - currDocsPanel",currDocssPanel);
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
    if (type === 'doc') {
      var currVeh = currDocssPanel;
      // console.log("inside disablediv - doc",currDocssPanel);
        if (currDocssPanel && currDocssPanel.length > 0) {
          currDocssPanel.map((pickups, i) => {
            if (pickups.docnum === docNum) {
              currVeh[i].type = 'selected';
            }
          })
        }
      currDocssPanel =  currVeh;
       // console.log("inside after disablediv - doc",currDocssPanel);
    }
    this.setState({
      vehiclePanel: currVehPanel,
      docsPanel : currDocssPanel,

    });
  }

 UnlockConfirmTrip = (ClickedTrip) => {
    this.confirmTrip(ClickedTrip, "unlock");
  }


  OptimiseConfirmTrip = (ClickedTrip) => {
      // console.log("TSSS at index - optimise confirm");
       this.setState({ optimisedClickedTrip: true , guageTrip : ClickedTrip });
  }


    submitTrips = (trips) => {
      // console.log("T6565 inside submit trips")
      this.setState({ loader: true });
      fetch('http://tmsx3.tema-systems.com:8050/api/fms/transport/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trips)
      }).then((response) => {
        // console.log("inside after trip - response",response);
        this.handleErrors(response);
      }).then(function (response) {

      }).then(() => {
         // console.log("inside submit Trips",this.state.date);
       this.onRouteoptihide();
       // this.UPDATE_DELETED_DOC_DETAILS();
      }).then(() => {

        this.setState({ loader: false, checkedTrip: false, isDetail:false, SelectedDeletedDocs : [] ,selectedDocumentList : [] });
        this.notifySucess("Trip Added/Updated Sucessfully");

      }).catch(error => {
        this.handleDateRangeChange();
        this.setState({ loading: false });
        this.notifyError("Please add proper trip to add or update, with vehicle, drops and pickups");
      });
     // this.handleDateRangeChange();
    }

    handleErrors = (response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }





  confirmTrip = (trip, route, routesSchedule, newGeoData) => {

     // console.log("T6565 routesSchedule =", routesSchedule);
      // console.log("T6565 tripspanels =", this.state.tripsPanel);
      // console.log("T6565 route =", route);
      // console.log("T6565 trip info =", trip);
    if ((trip.timelineInterval != undefined && trip.timelineInterval.length > 0) || route === 'unlock' || route=== 'loaderMsg' || route === 'ForceSeq' || route === 'Open') {
      // trip.site = this.state.selectedSite.id;
       // console.log("T555 inside 1 if =", route);
      this.setState({ selectedSite: trip.site })
      this.setState({ selectedSiteValue: trip.site })
      let tripdate =  moment.tz(trip.docdate,'').format("YYYY-MM-DD");
      this.setState({date : moment.tz(trip.docdate,'').format("YYYY-MM-DD")});
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
        // console.log("T6565 inside confirm if route")
         trip.datexec = today;
        trip.date = tripdate;
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
        trip.date =  tripdate;
        trip.route = true;
      }
      else if(route=== 'loaderMsg' || route === 'ForceSeq'){
        // trip.loaderInfo =
         trip.date = tripdate;
         trip.route = false;
      }
      else {
        trip.date = tripdate;
        trip.endDate = "";
        trip.optistatus = "Open";
        trip.route = false;
        // console.log("T555 inside else - optistattus=",trip.optistatus);
      }
      var totalWeight = 0;
      var totalVolume = 0;
      var weight = "";
      var volume = "";
      for (var i = 0; i < trip.pickupObject.length; i++) {
        totalWeight = totalWeight + parseInt(trip.pickupObject[i].netweight);
        totalVolume = totalVolume + parseInt(trip.pickupObject[i].volume);
        if (weight == "") {
          weight = trip.pickupObject[i].weightunit;
        }
        if (volume == "") {
          volume = trip.pickupObject[i].volume_unit;
        }
      }

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
      // console.log("T6565 11")
        if (route === "route") {
          if (routesSchedule) {
          // console.log("T6565 12")
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
        itemTrip.equipments = this.state.equipments;
        itemTrip.trailers = this.state.trailers;
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
         // console.log("T6565 5");
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
            }
            else {
              itemTrips[0].totalObject.logData = [];
              details.type = 'create'
              itemTrips[0].totalObject.logData.push(details);
            }
     // console.log("T6565 6")
     // console.log("T6565 13")
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

      for (var i = 0; i < trip.pickupObject.length; i++) {
        for (var j = 0; j < pickUps.length; j++) {
          if (trip.pickupObject[i].docnum === pickUps[j].docnum) {
            pickUps[j].vehicleCode = trip.code;
            pickUps[j].type = "Allocated";
          }
        }
      }

      currDropsPanel.drops = drops;
      currDropsPanel.pickUps = pickUps;

    } else {
      this.handleDateRangeChange();
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

  changeDateatDocumentPanel = (dayflag) => {
   // console.log("Tttt inside chagneDateatDocPanel =",dayflag);
  var flagconsider = dayflag;
 var currDate = moment(this.state.documentPanel_date).add(0, 'days');
 var sdate = moment(currDate).add(-5, 'days');
  var edate = moment(currDate).add(5, 'days');
    var newDate = moment(currDate).format('YYYY-MM-DD');
  var newStartDate = moment(sdate).format('YYYY-MM-DD');
  var newEndDate = moment(edate).format('YYYY-MM-DD');
   // console.log("T222 inside changeDate - 5daysflag",this.state.checked5days);
     if(flagconsider) {

         // console.log("Tttt inside changeDAte checked5days true");
         fetchDocumentPanelwithRange(this.state.selectedMultipleSites, newStartDate,newEndDate)
               .then(([res1, res2]) => {
                 var dropsP = res1;
                 // console.log("drops panel after result",dropsP);
                // this.filterDropsDiv(newDate, dropsP);
                 // console.log("drops panel after filter",dropsP);
                 this.setState({
                   docsPanel: res1,
                   tripsPanel : res2
                 });
               }).catch(error => {

               });

     }
     else {
       // console.log("Tttt inside changeDAte checked5days false");


    // console.log("T21 inside chageDAte");
    fetchDocumentPanelAPI(this.state.selectedMultipleSites, newDate)
      .then(([res1, res2]) => {
        var dropsP = res1;
        // console.log("drops panel after result",dropsP);
       // this.filterDropsDiv(newDate, dropsP);
        // console.log("drops panel after filter",dropsP);
        this.setState({
          docsPanel: res1,
          tripsPanel : res2
        });
      }).catch(error => {

      });
      }
  }




  changeDate = (day, dayflag, from) => {

  var flagconsider = false;
  if(from == 'checked') {
    // console.log("T222 from checked ",from);
    flagconsider = dayflag;
     // console.log("T222 from flagconsider ",flagconsider);
  }
  else if (from == 'buttons') {
   // console.log("T222 from button",from);
   flagconsider = this.state.checked5days;
     // console.log("T222 from flagconsider",flagconsider);
  }

 var currDate = moment.tz(this.state.dropDate,'').add(day, 'days');
 var sdate = moment.tz(currDate,'').add(-5, 'days');
  var edate = moment.tz(currDate,'').add(5, 'days');
    var newDate = moment.tz(currDate,'').format('YYYY-MM-DD');
  var newStartDate = moment.tz(sdate,'').format('YYYY-MM-DD');
  var newEndDate = moment.tz(edate,'').format('YYYY-MM-DD');
   // console.log("T222 inside changeDate - 5daysflag",this.state.checked5days);
     if(flagconsider) {

         // console.log("T222 inside changeDAte checked5days true");
         fetchDropsPanelwithRange(this.state.selectedMultipleSites, newStartDate,newEndDate)
               .then(([res1]) => {
                 var dropsP = res1;
                 // console.log("drops panel after result",dropsP);
                // this.filterDropsDiv(newDate, dropsP);
                 // console.log("drops panel after filter",dropsP);
                 this.setState({
                   dropDate: new Date(newDate),
                   dropsPanel: dropsP,
                 });
               }).catch(error => {

               });

     }
     else {
       // console.log("T222 inside changeDAte checked5days false");


    // console.log("T21 inside chageDAte");
    fetchDropsPanel(this.state.selectedMultipleSites, newDate)
      .then(([res1]) => {
        var dropsP = res1;
        // console.log("drops panel after result",dropsP);
       // this.filterDropsDiv(newDate, dropsP);
        // console.log("drops panel after filter",dropsP);
        this.setState({
          dropDate: new Date(newDate),
          dropsPanel: dropsP,
        });
      }).catch(error => {

      });
      }
  };


  SelectedDocumentEvent = (data) => {

   // console.log("selected Document is",data);
   let temparray = this.state.selectedDocumentList;
   temparray.add(data);

   this.setState({
        selectedDocumentList : temparray
   })
  }



OncheckedSameVehicles = (checked) => {
   this.setState({
      checkedsameVehicles : checked
   })
}


  filterDropsDiv = (day, dropsPanel) => {
    var currDate = moment.tz(this.state.date,'').format('YYYY-MM-DD');
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
     // console.log("T22 inside app checkedToPlan");
      this.setState({ checkedToPlan: checked })
    }


   OnCheckedToOpen = (checked) => {
       // console.log("T22 inside app OnCheckedToOpen");
       // console.log("t11 inside app");
          this.setState({ checkedToOpen: checked })
    }


 OnCheckedToShowoverMap = (checked) => {
 // console.log("T22 inside app checkedToShowinMap");

       // console.log("t11 inside app");
          this.setState({ checkedToShowinMap: checked })
           this.updateGeoLocations();
 }


 OncheckedTodropList = (checked) => {
       // console.log("T22 inside app OnCheckedTodroplist");
       // console.log("t11 inside app");
          this.setState({ checkedDropsList: checked })
    }

     OncheckedToPickupList = (checked) => {
           // console.log("T22 inside app OnCheckedTopickuplist");
           // console.log("t11 inside app");
              this.setState({ checkedPickupList: checked })
        }

 OnCheckedToValidate = (checked) => {
       // console.log("T22 inside app OnCheckedToValidate");
          this.setState({ checkedToValidate: checked })
    }

 OnCheckedToLock = (checked) => {
       // console.log("T22 inside app OnCheckedToLock");
          this.setState({ checkedToLock: checked })
    }

 OnCheckedToOptimise = (checked) => {
       // console.log("T22 inside app OnCheckedToOptimise");
          this.setState({ checkedToOptimise: checked })
    }

      checked5days = (checked) => {
           // console.log("T222 inside checked5days",checked);
          this.setState({ checked5days: checked })
          this.changeDate(0, checked, 'checked');
        }

           checked5daysfromDocumentPanel = (checked) => {
                   // console.log("T222 inside checked5days",checked);
                  this.setState({ documentPanel_5dayscheck : checked })
                   this.changeDateatDocumentPanel(checked);
                }

    updateTopBar = () => {
      var trips = this.state.tripsPanel;
      var vehicleList = [];
      var routesCount = 0;
      var totalvehicleCount = 0;
      var Drop_prodCount = 0;
      var Pickup_prodCount = 0;
      var assignedOrders = 0;
      var unassignedOrders = 0;
    //  for(var i=0;i< this.state.vehiclePanel..length; )
       // console.log("Count =",this.state.vehiclePanel.vehicles.length);
      if(this.state.vehiclePanel.vehicles.length > 0) {
        totalvehicleCount = this.state.vehiclePanel.vehicles.length;
      }

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

      var drops = this.state.docsPanel;
     // var pickups = this.state.dropsPanel;
      for (var j = 0; j < drops.length; j++) {
        if (drops[j].dlvystatus === '0' || drops[j].dlvystatus === '8') {
           unassignedOrders += 1;
        } else {
            assignedOrders += 1;
        }
      }

      unassignedOrders = this.state.docsPanel.length - assignedOrders;
      var topDetails = {};
      topDetails.vehicleCount = vehicleList.length;
      topDetails.routesCount = routesCount;
      topDetails.assignedOrders = assignedOrders;
      topDetails.unassignedOrders = unassignedOrders;
      topDetails.travelTime = 0;
      topDetails.serviceTime = 0;
topDetails.TotalvehicleCount = totalvehicleCount;
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


 OnGroupByChange = (selected) => {
    this.setState({
      SelectedGroupBy: selected
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


      setCurrentRoutecode = selectedOption => {
          var currSelected = {};
          this.state.RouteCode && this.state.RouteCode.map((routecode) => {
            if (selectedOption[0] === routecode.routeNo) {
              currSelected = routecode;
              currSelected.city = routecode.routeDesc;
            }
          });
          this.setState({
            selectedRouteCode: currSelected,
            selectedMultipleSites: selectedOption
          });
        }



  setCurrentVehiclecode = selectedOption => {
          var currSelected = {};
           console.log("Selected TEch", selectedOption);
          this.state.vehiclePanel.vehicles && this.state.vehiclePanel.vehicles.map((vehicle) => {
            if (selectedOption[0] === vehicle.techId) {
              currSelected = vehicle;
              currSelected.name = vehicle.name;
            }
          });
          this.setState({

            selectedVehicleCode : currSelected,

          });
        }



refreshAllPanels = () => {
      // console.log("inside refreshallpanels - index");
       const emptyTrip = [];
        this.setState({
        loading: true,
        selectedDocumentList: [],
         trips: emptyTrip
        });
        this.handleDateRangeChange();
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
      // console.log("Thhh index sitesArr", val);
    this.setCurrentSite(val);
    this.setState({ selectedSitesArr: val })
  }

   RouteCodeArr = (val) => {
      this.setCurrentRoutecode(val);
      this.setState({ selectedRouteCodeArr: val })
    }

     VehicleCodeArr = (val) => {
        // console.log("VehicleCodeChange - inside Vehicle code arr", val);
          this.setCurrentVehiclecode(val);

          if(val.length > 0) {
              this.setState({
                      filterVehicleflg: true

                       })
          }
          else {
           this.setState({
                filterVehicleflg: false
                                 })
         }

          this.setState({
          selectedVehicleCodeArr: val

           })
        }


   componentDidMount() {

      var user = JSON.parse(localStorage.getItem("authUser"));
       const currDate = moment.tz(new Date(),'').format('YYYY-MM-DD');
       // console.log("T11 component did mount", currDate);
       var selSites =  sessionStorage.getItem('sites');
       var listSites = [];
       // console.log("Thhh componentDidMount selSites",selSites);
       if(selSites != null) {
          listSites = selSites.split(',');
       }
        // console.log("T11 component did mount", this.state.date);
       Promise.all([fetch('http://tmsx3.tema-systems.com:8050/api/fms/transport/sites')])
      .then(([res1]) => {
        return Promise.all([res1.json()])
      }).then(([res1]) => {
                this.setState({
                   sites: res1
                });

       if(listSites.length > 0) {
            this.AlreadySelectedSites(res1, selSites, listSites);
       }
              });
}



   AlreadySelectedSites = (totsites, selSites , arrayList) => {
  // // console.log("AlreadySelected Site",sites );
    // console.log("AlreadySelected total sites",totsites );
    this.handleSiteChange(selSites);
    this.sitesArr(arrayList);
  /*
   let flg = false;
   let initialSite = "";
   let defSite = "";
   sites.length > 0 && sites.map((site, Index) => {
    // console.log("T333 first index",Index);
      if(Index == 0){
         initialSite = site.id;
        // console.log("T333 first index if",Index);
      }

      // console.log("T226 inside defaulsite- site",site);
       if(site.defflg === "Yes") {
         // console.log("T226 inside defaulsite- yes",site.id);
           defSite = site.id;
       }
   });
   if(defSite == "") {
        // console.log("T333 inside if no default site",defSite);
        defSite = initialSite;
   }


    this.setState({
                  selectedSite : defSite
               });
               */
   }


    updateSelectedSite = (siteId) => {
       var curSites = this.state.sites;
       for (var i = 0; i < curSites.length; i++) {
         if (curSites[i].id == siteId) {
           this.setState({ selectedSite: curSites[i] });
         }
       }
     }


      startAndEndOfWeek = (date) => {
        // console.log("date passed =", date);
        // console.log("date newDAte()passed =", new Date(date));
        // console.log("date newDAte()passed =", new Date().setHours(0, 0, 0, 0));
         const now = date ? new Date(date) : new Date().setHours(0, 0, 0, 0);
          // console.log("now passed =", now);
         const sunday = new Date(now);
         // console.log("sunday passed =", sunday);
         sunday.setDate(sunday.getDate() - sunday.getDay() + 0);
           // console.log("sunday set =", sunday);
         const satday = new Date(now);
           // console.log("satday passed =", satday);
         satday.setDate(satday.getDate() - satday.getDay() + 5);
           // console.log("satday set =", satday);
         return [sunday , satday];
       }


      handleDateRangeChange = () => {
        this.setState({loader : true});
        var satday , sunday;
        const events = this.schedulerRef;
        // console.log("insdie handleDateChagnge -",events);
         const clickedDate = this.schedulerRef.current.scheduleObj.selectedDate;
        if(this.schedulerRef.current.scheduleObj.currentView === 'TimelineWorkWeek')
        {
          // console.log("insdie handleDateChagnge selected week -");
          [sunday , satday] = this.startAndEndOfWeek(clickedDate);
          var StartDate =  moment(sunday).format("YYYY-MM-DD");
          var EndDate = moment(satday).format("YYYY-MM-DD");

          // console.log("start date =",StartDate);
          // console.log("End date =",EndDate);

       fetchSchedulerAPI(this.state.selectedMultipleSites, StartDate,EndDate)
                    .then(([res1, res2, res3]) => {
                      this.setState({
                        vehiclePanel: res1,
                        docsPanel : res2,
                        tripsPanel : res3,
                        loader : false,
                         date : clickedDate,
                        documentPanel_dateflg : false,
                        documentPanel_date : '',
                         documentPanel_5dayscheck : false,
                         SelectedDeletedDocs : [],
                         selectedDocumentList : [],



                      });
                    }).then(() => {
                              this.updateTopBar();
                              this.refreshSite();
                              this.removeDocsCheckBoxes();
                            }).catch(error => {

                            });
        }
        }

  handleRouteCodeChange = selectedRouteCodes => {
     this.setCurrentRoutecode(selectedRouteCodes);

  }

    handleVehicleCodeChange = selectedvehicleCodes => {
     // console.log("Inside handleVehicleCodeChange - 1", selectedvehicleCodes)
      // console.log("handleVehicleCodeChange length =", selectedvehicleCodes.length)
       this.setCurrentVehiclecode(selectedvehicleCodes);
    }


  handleSiteChange = selectedOption => {
  this.setState({loader : true});
    // console.log("Thhh site change", selectedOption);

    // console.log("date =", this.state.date);
    this.setCurrentSite(selectedOption);
     sessionStorage.setItem('sites', selectedOption);
    const currDate = moment.tz(this.state.date,'').format('YYYY-MM-DD');
    var FirstDate , LastDate
    [FirstDate, LastDate] = this.startAndEndOfWeek(currDate);
    // console.log("after assign current date =", currDate);
    var StartDate =  moment.tz(FirstDate,'').format("YYYY-MM-DD");
               var EndDate = moment.tz(LastDate,'').format("YYYY-MM-DD");

    // console.log("after schedulerRef =", this.schedulerRef);


     if(this.schedulerRef.current.scheduleObj.currentView === 'TimelineWorkWeek')
       {
        fetchSchedulerAPI(selectedOption, StartDate,EndDate)
              .then(([res1, res2, res3]) => {

                this.setState({
                  vehiclePanel: res1,
                  docsPanel : res2,
                  tripsPanel : res3,
                  loader : false,
                   documentPanel_dateflg : false,
                                           documentPanel_date : '',
                                           documentPanel_5dayscheck : false,
                                           filterVehicleflg : false


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
          docsPanel : res2,
          tripsPanel : res3,
          loader :false,
          SelectedDeletedDocs : [],
          selectedDocumentList : [],



        });
      }).catch(error => {

      });

      }

  };



/* old

     handleSiteChange = selectedOption => {
        // console.log("site change",selectedOption);
        // console.log("date =",this.state.date);
        this.setCurrentSite(selectedOption);
       const currDate = moment(this.state.date).format('YYYY-MM-DD');
       // console.log("after assign current date =",currDate);
       fetchAPI(selectedOption, currDate)
         .then(([res1, res2, res3]) => {
           this.setState({
             vehiclePanel: res1,
             dropsPanel: res2,
             deliverySite: '',
             updatedArrSite: '',
             tripsPanel: res3
           });
         }).then(() => {
           this.updateTopBar();
           this.refreshSite();
         }).catch(error => {

         });
     };
*/

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

        // console.log("inside  - addStateMarker 1",currMarkers);
        // console.log("inside  - addStateMarker 1",this.state.docsPanel);

        //add pointer to the map
         let currDropsPanel = this.state.docsPanel;

         for (var j = 0; j < currDropsPanel.length; j++) {

               if(currDropsPanel[j].movtype === 'DROP') {
               currDropsPanel[j].panelType = 'drop';
               currMarkers.push(currDropsPanel[j]);
             }
             else {
               currDropsPanel[j].panelType = 'pickup';
               currMarkers.push(currDropsPanel[j]);
            }
}
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
   // console.log("T11 sync,inside handleDatechagne",date);
    const currDate = moment.tz(date,'').format('YYYY-MM-DD');
    // console.log("T11 sync,inside handleDatechagne",currDate);

    let value = this.state.selectedMultipleSites
    fetchAPI(value, currDate)
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
          allAllowedDrivers: false,
           checked5days : false,
          vehicleDropped : false,
          trailerDropped : false,
          allowedTrailers: [],
          droppedTrailers : [],
          allAllowedTrailers: false,
          dropDate : currDate,
          vehiclePanel: res1,
          dropsPanel: res2,
          tripsPanel: res3
        });
      }).then(() => {
        this.updateTopBar();
        this.refreshSite();
      }).catch(error => {

      });
  };





  onVRhide = () => {
    this.setState({
      vehicleShow: 'block',
       schedulerShow : 'block',
      RouteoptiShow : 'none',
      vrShow: 'none',
       vehicleChecked : 'none',
    });
  }



  onVRClick = (i, tmsValidated) => {
  this.setState({loader : true});
     // console.log("inside onVRclieck at index",i);
     // console.log("inside onVRclieck at index - tmsvalida",tmsValidated);
    var tripsPanels = this.state.tripsPanel;
    var selectedTrip = [];
    var selectedTrips = [];
    var trailers = [];
    var selVR_num = tripsPanels[i].itemCode;
    var ClickedVR = tripsPanels[i];

    var sel_Driver_name = tripsPanels[i].driverName;
    //caling API

    fetchVR(selVR_num)
      .then(([res1, res2]) => {
        this.setState({
          vrlist: res1,
          vrdetaillist: res2,
          loader : false
        });
      }).then(() => {
      }).catch(error => {
      //  history.push('/');
      });
      // console.log("inside VR click",this.state.markers);
    if (this.state.markers && this.state.markers.length == 0) {
       // console.log("inside VR click inside if");
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
      selectedVrValidated: tmsValidated,
      vehicleShow: 'none',
      RouteoptiShow :'none',
       schedulerShow : 'none',
      vrShow: 'block',
       vehicleChecked : 'none',
    });
  }





/*
  updateTripsGeoLocations = (index , status) => {
   // var checkboxes = document.getElementsByName("tripsCheckBox");
    // console.log("inside updateTripgeo");
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
       // console.log("inside updateTripgeo if",status);
      this.removeTrips();
//      checkboxes[index].checked = true;

      this.updateTripsPanel(currMarkers, currGeoData, index);
      this.setState({ selectedIndex: index, checkedTrip: true, RouteoptiShow:'block' })
    } else {
     // console.log("inside updateTripgeo else",status);
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



 updateDocsMap = (currMarkers, currGeoData, i, docnum) => {
       //add pointer to the map
             let currDropsPanel = this.state.docsPanel;
             // console.log("selecte document =",docnum);
           for (var j = 0; j < currDropsPanel.length; j++) {

             if(currDropsPanel[j].docnum === docnum)
                {
               if(currDropsPanel[j].movtype === 'DROP') {
                   currDropsPanel[j].panelType = 'drop';
                   currMarkers.push(currDropsPanel[j]);
                 }
                 else {
                   currDropsPanel[j].panelType = 'pickup';
                   currMarkers.push(currDropsPanel[j]);
                }
           }
           }

          this.setState({
                 geoData: currGeoData,
                 markers: currMarkers,
                 mapChanged: true,
          });
        }

updateonlyTripsPanel = (i) => {
// console.log("T6565 updateTripsPanel - 1",i);
   // console.log("3");
    var tripsPanels = this.state.tripsPanel;
    // console.log("inside updateTripsPanel - tripspanel =",tripsPanels);
    var selectedTrip = [];
    var selectedTrips = [];
    var trailers = [];
    var equipments = [];
    var quantities = [];
    var gTrip = this.state.guageTrip;
    gTrip = tripsPanels[i];
    var slectTrip = gTrip.totalObject;
    // console.log("inside updateTripsPanel - totalobject =",slectTrip);
    tripsPanels[i].timelineInterval = slectTrip.timelineInterval;
    // console.log("inside updateTripsPanel - totalobject- timeline =",slectTrip.timelineInterval);
    selectedTrips = slectTrip.selectedTripData;
    // console.log("inside updateTripsPanel - totalobject- selectedtrip =",selectedTrips);
    trailers = slectTrip.trailers;
    equipments = slectTrip.equipments;
    quantities = slectTrip.quantities;
    selectedTrip.push(tripsPanels[i]);
   this.setState({tripsPanel : tripsPanels , selectedIndex: i});

}


updateTripsPanel = (currMarkers, currGeoData, i) => {

   // console.log("inside updateTripsPanel - 1");
    console.log("3");
    var tripsPanels = this.state.tripsPanel;
    console.log("inside updateTripsPanel - tripspanel =",tripsPanels);
    var selectedTrip = [];
    var selectedTrips = [];
    var trailers = [];
    var equipments = [];
    var quantities = [];
    var gTrip = this.state.guageTrip;
    gTrip = tripsPanels[i];
    var slectTrip = tripsPanels[i].totalObject;
    // console.log("inside updateTripsPanel - totalobject =",slectTrip);
    tripsPanels[i].timelineInterval = slectTrip.timelineInterval;
    // console.log("inside updateTripsPanel - totalobject- timeline =",slectTrip.timelineInterval);
    selectedTrips = slectTrip.selectedTripData;
    // console.log("inside updateTripsPanel - totalobject- selectedtrip =",selectedTrips);
    selectedTrip.push(tripsPanels[i]);
     console.log("inside updateTripsPanel - selectedTrip  =",selectedTrip);

    for (var j = 0; j < tripsPanels[i].dropObject.length; j++) {
      tripsPanels[i].dropObject[j].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].dropObject[j].lock = tripsPanels[i].lock;
      currMarkers.push(tripsPanels[i].dropObject[j]);
    }
    for (var k = 0; k < tripsPanels[i].pickupObject.length; k++) {
      tripsPanels[i].pickupObject[k].type = "pickup";
      tripsPanels[i].pickupObject[k].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].pickupObject[k].lock = tripsPanels[i].lock;
      currMarkers.push(tripsPanels[i].pickupObject[k]);
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
       console.log("3 update trips panel", selectedTrips)
      if (Object.keys(selectedTrips[i]).length != 0) {
        if (selectedTrips[i].panelType === 'drop') {
          tripColor[i] = '#7ace4c';
        } else if (selectedTrips[i].panelType === 'pickup') {
          tripColor[i] = '#09aaed';
        }
        currGeoData.push(selectedTrips[i]);
      }
    }
     console.log("geo data =",currGeoData);
     console.log("markrs data =",currMarkers);
    this.setState({
      trips: selectedTrip,
      guageTrip: gTrip,
      tripColor: tripColor,
      slectedTrips: selectedTrips,
      selectedTripData: selectedTrips[count - 1],
      left: (count) * 55,
      geoData: currGeoData,
      markers: currMarkers,
      mapChanged: true,
      tripsChecked: selectedTrip
    });
     console.log("4");
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
    // console.log("3 inside handldragStart at index - event",event);
     // console.log("3 inside handldragStart at index - valueobj",valueObj);
      // console.log("3 inside handldragStart at index - type",type);
        // console.log("3 inside handldragStart at index - index",index);
    if (type === "vehicle") {
      // console.log("selected Date =",this.state.date);
      const currDate = moment.tz(this.state.date,'').format('YYYY-MM-DD');
      const url = 'http://tmsx3.tema-systems.com:8050/api/v1/transport/prevtrpsite?veh=' + valueObj.codeyve + '&date=' + currDate;
      fetch(url)
        .then(function (response) {
          return response.json()
        }).then((res) => {
          let endSite = '';
          if (res.arrSite && res.arrSite.length > 0) {
            endSite = res.arrSite;
            this.setState({ updatedArrSite: endSite })
          } else {
            endSite = valueObj.startdepotn;
            this.setState({ updatedArrSite: '' })
          }
          let latestMarkers = this.state.markers;
          let currMarkers = [];
          if (latestMarkers && latestMarkers.length > 0) {
            latestMarkers.map((marker) => {
              if (marker.panelType) {
                currMarkers.push(marker)
              }
            })
          };
          let arrivalSite = {}
          if (this.state.sites && this.state.sites.length > 0) {
            this.state.sites.map((site) => {
              if (site.id === endSite) {
                currMarkers.unshift(site)
              }
              if (site.id === valueObj.enddepotname) {
                arrivalSite.city = site.value;
                arrivalSite.docnum = site.value;
                arrivalSite.idd = site.id;
                arrivalSite.lat = site.lat;
                arrivalSite.lng = site.lng;
                arrivalSite.value = site.value;
                arrivalSite.arrivalCheck = "arrival";
              }
            })
          }
          if (!(currMarkers[0].lat === arrivalSite.lat && currMarkers[0].lng === arrivalSite.lng)) {
            currMarkers.push(arrivalSite);
          }
          this.setState({ markers: currMarkers ,mapChanged: true, tripsChecked: [] })
        })
    }

/*
    // console.log("3 inside handleDragStart",event)
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

   // console.log("3 inside handledrag - dataTranser after",event);
   // console.log("3 inside handledrag - is dragged after",event.dataTransfer);

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


  onDocProcessChange = (val) => {
    this.setState({
    defaultdocprocess : val
    })
  }

  updateTripCount = () => {
    var tripCount = this.state.selectedTrips;
    tripCount += 12;
    this.setState({
      selectedTrips: tripCount
    });
  }


  clearAllDocsCheckBoxes = () => {
    var checkboxes = document.getElementsByName("docsCheckBox");
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  }



   removeDocsCheckBoxes = () => {
    this.clearAllDocsCheckBoxes();
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
   // console.log("T31 inside disable Drooped Div",divTag);
   var temp = "[row-id="+divTag+"]";
  //  var htmlDiv = document.getElementById(divTag);
   // console.log("T31 inside disable Drooped Div temp",temp);
  var htmlDiv = document.querySelectorAll(temp);
    var { droppedDivs } = this.state;
     // console.log("T31 inside disable Drooped Div htmldiv",htmlDiv);
    droppedDivs.push(temp);
    this.setState({ droppedDivs });
  }

  enableDroppedDiv = () => {
    var currVehPanel = this.state.vehiclePanel;
    var currDropsPanel = this.state.dropsPanel;
    var vehicles = currVehPanel.vehicles;
    var drops = currDropsPanel.drops;

    for (var i = 0; i < vehicles.length; i++) {
      if (vehicles[i].isDropped) {
        vehicles[i].type = "open";
      }
    }
    currVehPanel.vehicles = vehicles;

    for (var i = 0; i < drops.length; i++) {
      if (drops[i].isDropped && drops[i].type != 'Allocated') {
        drops[i].type = "open";
      }
    }

    currDropsPanel.drops = drops;

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
   this.setState({loader : true});
    var tripsPanel = this.state.tripsPanel;
           var ValidateTrips = [];
           var Validatecount = 0;

           for(let i=0; i < tripsPanel.length ; i++) {
                var trip = tripsPanel[i];
             if(trip.lock && !trip.tmsValidated) {
               Validatecount = Validatecount + 1;
               // console.log("OSRM docdate =",trip.docdate);
                ValidateTrips.push(trip);
             }
           }

            if(Validatecount > 0) {

    fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/groupvalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ValidateTrips)
    }).then((response) => {
      this.handleErrors(response);
    }).then(function (response) {
    }).then(() => {
      this.handleDateRangeChange();
    }).then(() => {
      this.setState({ loader: false });
      this.notifySucess("Trips Validated Sucessfully");
    }).catch(error => {
      this.handleDateRangeChange();
      this.setState({ loader: false });
      this.notifyError("Can't validate the Trips");
    });
  }
else {
             this.setState({
                                                                                                                         loader : false,
                                                                                                                         errorMessage: 'No Trips are available for Validation',
                                                                                                                         addAlertShow: true,
                                                                                                                          })
           }
  }

 Nonvalidate = (i) => {
  this.setState({loader : true});
     // console.log("s1 - inside non validate");
         var tripsPanels = this.state.tripsPanel;
         var ClickedTrip = tripsPanels[i];
         let trips = ClickedTrip;
         fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/nonvalidate', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(trips)
         }).then((response) => {
           this.handleErrors(response);
         }).then(function (response) {
         }).then(() => {
           this.handleDateRangeChange();

         }).then(() => {
           this.updateMaprelatedstuff(i);
         }).then(() => {
          this.setState({ loader: false });
           this.notifySucess("Disputed Validated Trip Sucessfully");
            // call vrClick functionality
         }).catch(error => {
           this.handleDateChange(this.state.date);
           this.setState({ loading: false });
           this.notifyError("unable to dispute validated Trip");
         });

  }



   validate = (code) => {
     this.setState({loader : true});
    let resultantXml;
       CreateDelvieriesfromOrdersinRoute(code)
       .then(res => {
                            // console.log("after soap completes The result is", res);
                            resultantXml = res;
                             console.log("Result =", resultantXml )
                             let PO =  resultantXml.children[0].children[0].value;
                                                    let   PreReceipt = resultantXml.children[1].children[0].value;
                                                   console.log("Result first chid value =", PO )
                                                   console.log("Result second child value =", PreReceipt )
                                      if(PreReceipt == 2){
                                           this.notifySucess("Route Validated Sucessfully");
                                       }
                                      else {
                                          this.notifyError("Can't validate the Trip, something went wrong");
                                      }
                            }).then(() => {
                              this.refreshAllPanels();
                            this.setState({loader : false});
                            })

     }


 validateonly = (code,pageType) => {
 this.setState({loader : true});
     // console.log("s1 - inside validate");
     let resultantXml;
    CreateDelvieriesfromOrdersinRoute(code)
    .then(res => {
                         // console.log("after soap completes The result is", res);
                         resultantXml = res;
                          console.log("Result =", resultantXml )
                          let PO =  resultantXml.children[0].children[0].value;
                                                 let   PreReceipt = resultantXml.children[1].children[0].value;
                                                console.log("Result first chid value =", PO )
                                                console.log("Result second child value =", PreReceipt )
                                   if(PreReceipt == 2){
                                        this.notifySucess("Route Validated Sucessfully");
                                    }
                                   else {
                                       this.notifyError("Can't validate the Trip, something went wrong");
                                   }
                         }).then(() => {

                         this.setState({loader : false});
                         })


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
              currMarkers_bl.push(site)
            }
          })
        }
      } else if (this.state.selectedSite.lat != undefined) {
        currMarkers_bl.push(this.state.selectedSite);
      }
      this.updateTripsPanel_beforeLocking(currMarkers_bl, index);
  }





  updateDocsGeoLocations = (index, docnum) => {
        var checkboxes = document.getElementsByName("docsCheckBox");
            const currMarkers = [];
            const currGeoData = [];
            if (typeof (this.state.selectedSite) === "string") {
              if (this.state.sites.length > 0) {
                 // console.log("1A");
                this.state.sites.map((site) => {
                  if (site.id === this.state.selectedSite) {
                    currMarkers.push(site)
                  }
                })
              }
            } else if (this.state.selectedSite.lat != undefined) {
               // console.log("1B");
              currMarkers.push(this.state.selectedSite);
            }
            // console.log("2");
         // console.log("T5 inside index - updategeo",checkboxes[index].checked);
            if (checkboxes[index].checked) {
              this.removeDocsCheckBoxes();
              // console.log("2A");
              checkboxes[index].checked = true;
            //this.onRouteoptiShow();
              this.updateDocsMap(currMarkers, currGeoData, index, docnum);
              //this.updateTripsPanel(currMarkers, currGeoData, index);
             // this.setState({ selectedIndex: index, checkedTrip: true })
            } else {
               // console.log("2B");
             // this.onRouteoptihide();
              this.removeDocsCheckBoxes();
              let marker = [];
              marker.push(currMarkers[0])
              // console.log("5");
              // console.log("markers =",marker);
              this.setState({
                markers: marker, mapChanged: true,
                geoData: currGeoData
              });
            }



  }


  updateTripsGeoLocations = (index) => {
    // console.log("1");
    var checkboxes = document.getElementsByName("tripsCheckBox");
    const currMarkers = [];
    const currGeoData = [];
    console.log("1 seleted Site", this.state.selectedSite)
    if (typeof (this.state.selectedSite) === "string") {
      if (this.state.sites.length > 0) {
         // console.log("1A");
        this.state.sites.map((site) => {
          if (site.id === this.state.selectedSite) {
            currMarkers.push(site)
          }
        })
      }
    } else if (this.state.selectedSite.lat != undefined) {
       // console.log("1B");
      currMarkers.push(this.state.selectedSite);
    }
     console.log("2", currMarkers);
 // console.log("T5 inside index - updategeo",checkboxes[index].checked);
    if (checkboxes[index].checked) {
      this.removeTrips();
      console.log("2A");
      checkboxes[index].checked = true;
    this.onRouteoptiShow();

      this.updateTripsPanel(currMarkers, currGeoData, index);
      this.setState({ selectedIndex: index, checkedTrip: true })
    } else {
        console.log("2B");
      this.onRouteoptihide();
      this.removeTrips();
      let marker = [];
      marker.push(currMarkers[0])
      // console.log("5");
      // console.log("markers =",marker);
      this.setState({
        markers: marker, mapChanged: true,
        geoData: currGeoData, tripsChecked: [], checkedTrip: false
      });
    }
  }


  ResetUpdateTrip() {
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
      slectedTrips: []
    });
  }

  updateTripsPanel_beforeLocking(currMarkers_bl,i){
    var tripsPanels = this.state.tripsPanel;
    var tripsList_bl = tripsPanels[i];
    var slectTrip_bl = tripsPanels[i].totalObject;
    var selectedTrip_bl = slectTrip_bl.selectedTripData;
    for (var j = 0; j < tripsPanels[i].dropObject.length; j++) {
      tripsPanels[i].dropObject[j].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].dropObject[j].lock = tripsPanels[i].lock;
      currMarkers_bl.push(tripsPanels[i].dropObject[j]);
     }
    for (var k = 0; k < tripsPanels[i].pickupObject.length; k++) {
      tripsPanels[i].pickupObject[k].type = "pickup";
      tripsPanels[i].pickupObject[k].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].pickupObject[k].lock = tripsPanels[i].lock;
      currMarkers_bl.push(tripsPanels[i].pickupObject[k]);
    }
    this.setState({
          clickedTrips: tripsList_bl,
          bl_tripsList : tripsList_bl,
          bl_selectedTripData: selectedTrip_bl,
          bl_markers: currMarkers_bl,
          triplock : false,
          vehicleShow: 'none',
          RouteoptiShow : 'none',
          vrShow: 'block',
           schedulerShow : 'none',
           vehicleChecked : 'none',
        });
  }


  updateTripsPanel = (currMarkers, currGeoData, i) => {

     // console.log("2-2");
    var tripsPanels = this.state.tripsPanel;
    var selectedTrip = [];
    var selectedTrips = [];
    var trailers = [];
    var equipments = [];
    var quantities = [];
    var gTrip = this.state.guageTrip;
    gTrip = tripsPanels[i];
    var slectTrip = tripsPanels[i].totalObject;
    // console.log("2-2 totalobject =",slectTrip);
    tripsPanels[i].timelineInterval = slectTrip.timelineInterval;
     // console.log("2-2 totalobject -timeline =",slectTrip);
    selectedTrips = slectTrip.selectedTripData;
     // console.log("2-2 totalobject - selcetedTrips =",slectTrip);
    trailers = slectTrip.trailers;
    equipments = slectTrip.equipments;
    quantities = slectTrip.quantities;
    selectedTrip.push(tripsPanels[i]);
    for (var j = 0; j < tripsPanels[i].dropObject.length; j++) {
      tripsPanels[i].dropObject[j].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].dropObject[j].lock = tripsPanels[i].lock;
      currMarkers.push(tripsPanels[i].dropObject[j]);
    }
    for (var k = 0; k < tripsPanels[i].pickupObject.length; k++) {
      tripsPanels[i].pickupObject[k].type = "pickup";
      tripsPanels[i].pickupObject[k].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].pickupObject[k].lock = tripsPanels[i].lock;
      currMarkers.push(tripsPanels[i].pickupObject[k]);
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


 onVRClick = (i, tmsValidated) => {
    var tripsPanels = this.state.tripsPanel;
    var selectedTrip = [];
    var selectedTrips = [];
    var trailers = [];
    var selVR_num = tripsPanels[i].itemCode;
    var ClickedVR = tripsPanels[i];

    var sel_Driver_name = tripsPanels[i].driverName;
    //caling API

    fetchVR(selVR_num)
      .then(([res1, res2]) => {
        this.setState({
          vrlist: res1,
          vrdetaillist: res2

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
      selectedVrValidated: tmsValidated,
      triplock : true,
      vehicleShow: 'none',
      RouteoptiShow : 'none',
      vrShow: 'block',
       schedulerShow : 'none',
       vehicleChecked : 'none',
    });
  }



  documentPanelDateChange = (date) => {
      console.log("Tktk1 inside index - date",date);
      this.setState({loader : true})
     // console.log("T11 sync,inside handleDatechagne",date);
        const currDate = moment.tz(date,'').format('YYYY-MM-DD');
        // console.log("T11 sync,inside handleDatechagne",currDate);
console.log("Tktk1 inside momenttz - date",moment.tz(date,'').format('YYYY-MM-DD'));
console.log("Tktk1 inside moment - date",moment(date).format('YYYY-MM-DD'));
        let value = this.state.selectedMultipleSites
        fetchDocumentPanelAPI(value, currDate)
          .then(([res1]) => {
            /*
              if(status1 === 200 && status2 === 200 && status3 === 200){
                       this.setState({loading: false})
              }
              */

            this.setState({
               documentPanel_date: currDate,
               documentPanel_dateflg : true,
              docsPanel: res1,
              loader : false
            })

          }).then(() => {
                                          this.updateTopBar();
                                          this.refreshSite();
                                          this.removeDocsCheckBoxes();
           }).catch(error => {
             this.setState({
              loader : false
             })

        });
    }




  onVRhide = () => {
    this.setState({
      vehicleShow: 'block',
       schedulerShow : 'block',
       RouteoptiShow : 'none',
      vrShow: 'none',
       vehicleChecked : 'none',
    });
  }

  onRouteoptihide = () => {

    // this.refreshAllpanels();
    this.setState({
      vehicleShow: 'block',
       schedulerShow : 'block',
      RouteoptiShow : 'none',
      vrShow: 'none',
      vehicleChecked : 'none',
    });
    this.handleDateRangeChange();
  }



    onRouteoptiShow = () => {
      this.setState({
        vehicleShow: 'block',
        RouteoptiShow : 'block',
        vrShow: 'none',
         schedulerShow : 'none',
        vehicleChecked : 'none',
      });
    }

  onLoadermessage = (tripindex,msg) => {
      var tripsPanels = this.state.tripsPanel;
      var tripsList_loader = tripsPanels[tripindex];
      tripsList_loader.loaderInfo = msg;

      // console.log("loader msg - trip",tripsList_loader);
      this.confirmTrip(tripsList_loader, "loaderMsg");

  }

  onForcesequnceCheck = (tripindex,msg) => {

  // console.log("foced check msg - trip",msg);
   var tripsPanels = this.state.tripsPanel;
   var trips = []
   var tripsList_force = tripsPanels[tripindex];
      tripsList_force.date = moment.tz(this.state.date,'').format("YYYY-MM-DD");
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
             geoData.ptheader = msg
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
           // console.log("inside doc type at app",Msgtype);
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



    UPDATE_DELETED_DOC_DETAILS = () => {

   // var deleteddoc = this.state.;
    fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/update/deldoc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.SelectedDeletedDocs)
    }).then((response) => {
    });
    }




 refreshDocspanel = () => {
  var satday, sunday;
 var currDate = moment.tz(this.state.date,'');
  [sunday , satday] = this.startAndEndOfWeek(currDate);
  var StartDate =  moment.tz(sunday,'').format("YYYY-MM-DD");
           var EndDate = moment.tz(satday,'').format("YYYY-MM-DD");
  // console.log("insdie refreshhDocs - start date =",StartDate);
   // console.log("insdie refreshhDocs - end date =",EndDate);
         fetchSchedulerDocsAPI(this.state.selectedMultipleSites, StartDate,EndDate)
              .then(([res1]) => {
                               this.setState({
                                 docsPanel: res1,
                               });
                     }).catch(error => {
               });
     }



  onTripDelete = (index, docnum, vtype, vcode, docObject) => {
   // console.log("T222 inside app after delete button clicked- index",index);
     // console.log("T222 inside app after delete button clicked- docnum",docnum);
       // console.log("T222 inside app after delete button clicked- vtype",vtype);
         // console.log("T222 inside app after delete button clicked- vcode",vcode);
         // console.log("T222 inside app after delete button documnet object = ",docObject);
    var currentGeoData = this.state.geoData;
    var currentMarkers = this.state.markers;
    var geoData = [];
    var currMarkers = [];
    var currDropsPanel = this.state.docsPanel;
    var docs = currDropsPanel;
    //var pickUps = currDropsPanel.pickUps;
    var trips = [];
    var trip = this.state.trips[0];
    var removeDocs = [];
    var removeDocsObject = [];
   // this.UPDATE_DELETED_DOC_DETAILS(docObject);


    // console.log("Docspanel =",currDropsPanel);





  // console.log("T222 inside app after delete button clicked- currentGeoData",currentGeoData);
  // console.log("T222 inside app after delete button clicked- currentMarkers",currentMarkers);
  // console.log("T222 inside app after delete button clicked- currDropsPanel",currDropsPanel);
  // console.log("T222 inside app after delete button clicked- trip",trip);
    if (currentGeoData[index].panelType == 'pickup') {
      var pickCount = trip.pickups;
      trip.pickups = pickCount - 1;
      removeDocs.push(docnum);
      removeDocsObject.push(docObject);
      for (var i = 0; i < docs.length; i++) {
        if (docs[i].docnum == docnum) {
          docs[i].type = "open";
          docs[i].vehicleCode = "";
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
          for (var j = 0; j < docs.length; j++) {
            if (docs[j].docnum == trip.pickupObject[k].pairedDoc) {
              docs[j].type = "open";
              docs[j].vehicleCode = "";
            }
          }
        }
      }
    }


    if (currentGeoData[index].panelType == 'drop') {
      var dropCount = trip.drops;
      trip.drops = dropCount - 1;
      removeDocs.push(docnum);
      removeDocsObject.push(docObject);
      for (var j = 0; j < docs.length; j++) {
        if (docs[j].docnum == docnum) {
          docs[j].type = "open";
          docs[j].vehicleCode = "";
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
          for (var i = 0; i < docs.length; i++) {
            if (docs[i].docnum == trip.dropObject[k].pairedDoc) {
              docs[i].type = "open";
              docs[i].vehicleCode = "";
            }
          }
        }
      }
    }

   // currDropsPanel.drops = drops;
    //currDropsPanel.pickUps = pickUps;
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
    // console.log("T222 insdie Delete - selectedTrip",currSelectedTrips);
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

    // console.log("removed data=",removeDocs);


    trip.pickupObject = pickupObject;
    trip.dropObject = dropObject;

    // console.log("T222 inside delte- trip",trip);
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
    // console.log("T222 inside delete - after push",trips);
    this.setState({
      markers: currMarkers,
      geoData: geoData,
      trips: trips,
      tripColor: tripColor,
      slectedTrips: selectedTrips,
      selectedTripData: selectedTrips[count - 1],
      left: count * 55,
      SelectedDeletedDocs : removeDocsObject,
      dropsPanel: currDropsPanel,
      mapChanged: true,
      docType: vtype,
      deletedVehicleCode: vcode
    });
  }
  // end of onTrip Delete


  lockTrip = (trips, index) => {
     this.setState({loader : true});
     // console.log("inside final lock tripp");
    var tripsPanel = this.state.tripsPanel;
    tripsPanel[index].lock = true;
    fetch('http://tmsx3.tema-systems.com:8050/api/fms/transport/lock/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trips)
    }).then((response) => {
         this.notifySucess("Trip Locked Sucessfully");
      this.setState({
        tripsPanel: tripsPanel,
        loader : false
      });
    }).catch(error => {
                       // this.handleDateChange(this.state.date);
                        this.setState({ loader: false });
                        this.notifyError("unable to Lock the Trip");
                      });
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

/*
  //on Lock All the open Records
  onLockAllRecord = () => {
      var tripsPanel = this.state.tripsPanel;
      var trips = tripsPanel;
      var trip = tripsPanel[index];
     // trip.date = this.state.date;
     // trip.lockP = lockP;
    //  trips.push(trip);
    /*
      var user = JSON.parse(localStorage.getItem("authUser"));
          let details = {
            loginUser: user.username,
            dateTime: new Date(),
            type: 'lock'
          }
          if (trips[0].totalObject && trips[0].totalObject.logData && trips[0].totalObject.logData.length > 0) {
            trips[0].totalObject.logData.push(details)
          }

      this.GrouplockTrips(trips);
    }
*/

     GrouplockTrips = () => {
 this.setState({ loader : true
 })
         // console.log("inside final lock group trips");
        var tripsPanel = this.state.tripsPanel;
        var trips = [];
       for(let trip in tripsPanel)
       {
              if(trip.optistatus === 'Open') {
                   trip.lock = true;

               trips.push(trip);
              }
       }
        fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/lock/trips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trips)
        }).then((response) => {
        this.notifySucess("Trip Locked Sucessfully");
          this.setState({
            tripsPanel: tripsPanel,
            loader : false
          });
        }).catch(error => {
                            // this.handleDateChange(this.state.date);
                             this.setState({ loader: false });
                             this.notifyError("unable to Lock the Trip");
                           });

      }


   onWarningAlertOff = (index , tripcode) => {

       var tripsPanel = this.state.tripsPanel;
       var trips = [];
       var trip = tripsPanel[index];
           trips.push(trip);
       const currDate = moment.tz(this.state.date,'').format('YYYY-MM-DD');
       fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/alertoff/trip', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(trips)
       }).then((response) => {
         this.reloadTrips();
         //  this.handlePanelsUpdate(currDate);
         this.notifySucess("Warning Alert has been closed Sucessfully");
          this.onRouteoptihide();
       });


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
              itemTrip.timelineInterval = eventData.VehicleObject.timelineInterval;
              itemTrip.equipments = [];
              itemTrip.trailers = [];
              itemTrip.quantities = [];
               VehicleObject.push(eventData.VehicleObject);
               if(eventData.docType === 'Drop'){
                                            drops = drops + 1;
                                            eventData.obbject.panelType = 'drop';
                                            dropObject.push(eventData.obbject);

                                        }
                                        else {
                                            pickups = pickups + 1;
                                            eventData.obbject.panelType = 'pickup';
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

     // console.log("inside Scheduler -  onTrip",eventData);

        var trip = {
                         code: eventData.code,
                         date : moment.tz(eventData.docdate,'').format("YYYY-MM-DD"),
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

                     this.ConfirmScheduledTrips(Trips);
                     }

  grouplockTrips = () => {
    this.setState({loader : true});
   var tripsPanel = this.state.tripsPanel;
       var unlockedTrips = [];
       var Lockcount = 0;

       for(let i=0; i < tripsPanel.length ; i++) {
            var trip = tripsPanel[i];
         if(!trip.lock) {
           Lockcount = Lockcount + 1;
           // console.log("OSRM docdate =",trip.docdate);
           let tripdate =  moment.tz(trip.docdate,'').format("YYYY-MM-DD");
            trip.date = tripdate;
            trip.lock = true;
            unlockedTrips.push(trip);
         }
       }

        if(Lockcount > 0) {

      fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/lock/multipletrips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(unlockedTrips)
    }).then((response) => {
       this.notifySucess("Trips are Locked Sucessfully");
      this.setState({
        tripsPanel: tripsPanel,
        loader : false
      });
      });
     }
           else {
             this.setState({
                                                                                                                         errorMessage: 'No Trips are available for Locking',
                                                                                                                         loader: false,
                                                                                                                         addAlertShow: true,
                                                                                                                          })
           }
  }


 autoResetTrips=  () => {
     this.setState({loader : true});
     var tripsPanel = this.state.tripsPanel;
     var unlockedTrips = [];
     var deletecount = 0;

     for(let i=0; i < tripsPanel.length ; i++) {
          var trip = tripsPanel[i];
       if(!trip.lock) {
         deletecount = deletecount + 1;
          unlockedTrips.push(trip);
       }
     }

     if(deletecount > 0) {

     // console.log("Trips are reeadyy to delete =",unlockedTrips);
        fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/delete/trips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(unlockedTrips)
        }).then((response) => {
          this.reloadTrips();
          //  this.handlePanelsUpdate(currDate);
          this.setState({loader : false});
          this.notifySucess("Trips deleted Sucessfully");
           this.onRouteoptihide();
        });
        }
        else {
                this.setState({
                                                                                                              errorMessage: 'No Trips are available for Deletion',
                                                                                                              loader : false,
                                                                                                              addAlertShow: true,
                                                                                                               })
        }
 }


autoGenerateTrips = () => {



  //filter the trips panle and sort it
   var tempTripPanel = this.state.tripsPanel;
   var orginalTripOrder = this.state.tripsPanel;
    // console.log("OSRM trip before trip",tempTripPanel);

    tempTripPanel.sort((a,b) => (b.code.localeCompare(a.code) || b.trips - a.trips));

     // console.log("OSRM trip after trip",tempTripPanel);

   const key = "code"

  // let uniqueTripListByCode = [...new Map(tempTripPanel.map((item) => [item["code"], item])).values(),];


  var resArr = [];
  tempTripPanel.filter(function(item){
    var i = resArr.findIndex(x => (x.code == item.code));
    if(i <= -1){
          resArr.push(item);
    }
    return null;
  });


   this.setState({loader : true});
   var sameVehiclesflag = this.state.checkedsameVehicles;
   var DocCount = 0;
   let VehStartTime ,VehEndTime;
   for(let jj=0 ; jj<this.state.docsPanel.length ; jj++) {
         let doc = this.state.docsPanel[jj];
         if((doc.type === 'open') && (doc.dlvystatus === '0' || doc.dlvystatus === '8'))
         {
           DocCount = DocCount + 1;
         }
         }

   if(DocCount > 0) {

    // console.log("OSRM");
    // console.log("OSRM- vehicles",this.state.vehiclePanel.vehicles);
      // console.log("OSRM- drivers",this.state.vehiclePanel.vehicles);
    // console.log("OSRM- documents", this.state.docsPanel);
    // console.log("OSRM- site", this.state.selectedMultipleSites);
    var VehList = [],DocList = [];
    var siteLat,siteLang;
    var doc = {};
    var selSite = this.state.selectedMultipleSites[0];
      // console.log("OSRM- sel site", selSite);
      this.state.sites.map((site) => {
                if (selSite === site.id) {
                    siteLat = site.lat;
                    siteLang = site.lng;

                }
            })

    for(let i=0 ; i<this.state.vehiclePanel.vehicles.length ; i++) {
        var Veh = {};
       let veh = this.state.vehiclePanel.vehicles[i];
       // console.log("OSRM veh count =",i);
       // console.log("OSRM veh info",veh);
       var sflag = false; var prevEndTime = 0;

  for(let t=0 ; t<resArr.length ; t++) {

                var currtrip = resArr[t];
              if(currtrip.code === veh.codeyve ) {
                 sflag = true;
                 var endTime = splitTimeAndConv2Sec(currtrip.endTime);
                 var unloadingtime = convertHrToSec(veh.enddepotserv);
                 prevEndTime = endTime + unloadingtime;
                 // console.log("OSRM incre PrevEndtime",prevEndTime);
                 break;
              }
       }



       if(!sameVehiclesflag && !sflag) {
       Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime);
       Veh.capacity = [veh.capacities];
       Veh.id = i+1;
       Veh.description = veh.codeyve;
       let starttime = splitTimeAndConv2Sec(veh.starttime);
       let   loadingHrs = convertHrToSec(veh.startdepots);
       let stime = starttime + loadingHrs;
       // console.log("loading hrs =",loadingHrs);
        let etime = splitTimeAndAddtimeAndConv2Sec(veh.starttime, veh.overtimestar);
        let timew = [stime , etime];
        let geo = [siteLang, siteLat];

       Veh.time_window = timew;
       Veh.start = geo;
       Veh.end = geo;
       var array = JSON.parse("[" + veh.skills + "]");
        Veh.skills = array;
       if(veh.maxordercnt > 0) {
       Veh.max_tasks = veh.maxordercnt;
               }
               else {
                Veh.max_tasks = 3;
               }
// console.log("OSRM Vehicle details",Veh)
       VehList.push(Veh);
      VehEndTime = etime;
      VehStartTime = stime;
      }
      else if(sameVehiclesflag && sflag) {

      let starttime = prevEndTime;
        let   loadingHrs = convertHrToSec(veh.startdepots);
        let stime = starttime + loadingHrs;
        // console.log("OSRM incre loading loadinghrs =",loadingHrs);
        // console.log("OSRM incre loading stime hrs =",stime);
   let etime = splitTimeAndAddtimeAndConv2Sec(veh.starttime, veh.overtimestar);

    if(stime < etime ) {


       Veh.id = i+1;
       Veh.description = veh.codeyve;
        Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime);
             Veh.capacity = [veh.capacities];


                 // console.log("OSRM incre etime  hrs =",etime);
        let timew = [stime , etime];
        let geo = [siteLang, siteLat];
       Veh.time_window = timew;
       Veh.start = geo;
       Veh.end = geo;
       var array = JSON.parse("[" + veh.skills + "]");
        Veh.skills = array;
       if(veh.maxordercnt > 0) {
       Veh.max_tasks = veh.maxordercnt;
               }
               else {
                Veh.max_tasks = 3;
               }

// console.log("OSRM Vehicle details",Veh)
       VehList.push(Veh);
        VehEndTime = etime;
             VehStartTime = stime;
    }

      }

    }
 // console.log("OSRM Vehicle Final List",VehList);
 let maxDoc = this.state.defaultdocprocess;
 let docprocessedCount = 0;
 for(let j=0 ; j<this.state.docsPanel.length ; j++) {
      let doc = this.state.docsPanel[j];
      if((doc.type === 'open') && (doc.dlvystatus === '0' || doc.dlvystatus === '8') && docprocessedCount < maxDoc)
      {

       var Doc = {};
       // console.log("OSRM doc count =",j);
       // console.log("OSRM doc info",doc);
       Doc.id = j+1;
       Doc.description = doc.docnum;
     // console.log("OSRM doc ",doc);


    var FromArr;
    var fromflag = false;
    var toflag = false;
    if((doc.fromTime).length > 0) {
      FromArr = (doc.fromTime).split(' ');
      fromflag = true;

    }
    var ToArr;
    if((doc.toTime).length > 0) {
    ToArr = (doc.toTime).split(' ');
    toflag = true;
    }

      // console.log("OSRM doc from",FromArr);
        // console.log("OSRM doc to",ToArr);

    var timeWindw = [];

   fromflag && FromArr.map((ft, index) => {
       var tt = []
       // console.log("OSRM doc ft",ft);
       tt.push(splitTimeAndConv2Sec(ft));
        // console.log("OSRM doc tt",ToArr[index]);
       tt.push(splitTimeAndConv2Sec(ToArr[index]));

    timeWindw.push(tt);
    });

// console.log("OSRM doc Final Time Window",timeWindw);

         var DocLat,DocLang;
         DocLat = doc.lat;
         DocLang = doc.lng;
       Doc.location = [DocLang,DocLat];
       Doc.priority = doc.priority;
          Doc.amount = [Math.round(doc.netweight)];
       var array1 = JSON.parse("[" + doc.skills + "]");
             //  Veh.skills = array;
      // Doc.skills = (doc.skills).split(',');
      Doc.skills = array1;
      Doc.service = convertHrToSec(doc.serviceTime);
      let ps, pe = 0;
      let ds , de = 0;

   if(fromflag) {
   Doc.time_windows = timeWindw;
   }
/*
      ps = VehStartTime + 10800;
      ds = VehStartTime ;
      pe = VehEndTime ;
      de = VehStartTime + 10800;
      if(doc.doctype === "PRECEIPT") {
        //Doc.time_windows = [0,28800]
      //Doc.time_window = [36000, 54000];
      Doc.time_windows = [[ps, pe]];

      }
      else {
   Doc.time_windows =[[ds,de]];
      }
*/

      // console.log("OSRM Document details",Doc);
      DocList.push(Doc);
      docprocessedCount = docprocessedCount + 1;
      }
    }
// console.log("OSRM Document Final List",DocList);



//process for the JSON file
var processedData = {};
processedData.vehicles = VehList;
processedData.jobs = DocList;
processedData.options = {
		"g": false
	}


// console.log("OSRM proccessed data =",processedData)
// latest - 34.171.208.219
// v10   - 34.134.143.219
//new frane  - 35.193.234.153
//34.136.15.124
// US-west instance 34.95.36.63

 fetch('http://34.136.15.124:3000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData)
      }).then((response) => {
        // console.log("OSRM inside after OSRM - response",response);
               if (response.status === 200) {
                       return response.json()
               }
       }).then((res) => {
                                           // console.log("OSRM - opti result",res);
                                      if(res.routes.length > 0) {
                                           // console.log("OSRM - opti route count",res.routes.length);
                                          this.submitRoutesforTripsCreation(res.routes, selSite);
                                      }
                                      else {
                                        this.setState({
                                                                                                                                                    errorMessage: 'something wrong with the data , please check',
                                                                                                                                                    loader : false,
                                                                                                                                                    addAlertShow: true,
                                                                                                                                                     })
                                      }
                            });
}
else {
   this.setState({
                                                                                                              errorMessage: 'No Documents are available for Trips creation',
                                                                                                              loader : false,
                                                                                                              addAlertShow: true,
                                                                                                               })
}
}


submitRoutesforTripsCreation = (routes, site) => {

 var RouteprocessedData = [];
 var sameProcessUsedDriversList = [];
             var TripsfromRoutes = [];
// console.log("OSRM Auto Routes data are",routes);
 for(let k=0;k < routes.length ; k++){
    var currRoute = routes[k];
    var Vehicle = {},Veh = routes[k].description;
// console.log("OSRM Auto Routes veh are",routes[k].description);
    for(let i=0 ; i<this.state.vehiclePanel.vehicles.length ; i++) {


           if(Veh == this.state.vehiclePanel.vehicles[i].codeyve) {
            Vehicle = this.state.vehiclePanel.vehicles[i];
            break;
            }
     }

// console.log("OSRM Auto  veh are",Vehicle);
   var dropObject = [], pickupObject = [],drops = 0, pickups = 0;
   var startTime = ''  ,endTime = '';
 	            var totalWeight = 0;
      			  var ddate = '';
                    var totalVolume = 0;
                    var fld_per_capacity = 0;
                    var fld_per_volume  =0;
                    var fld_doc_capacity = 0;
                    var fld_doc_volume = 0
                    var weight = "";
                    var volume = "";
      			  var vol_unit = "";
                     var wei_unit = "";
                    var percentageMass = 0;
                    var percentageVolume = 0;
                    var VehicleObject =  Vehicle;
                  var vehobj = [];
                    var itemTrip = {
      			  selectedTripData : [],
                    timelineInterval : [],
                    equipments : [],
                    trailers : [],
                    quantities : []
      			  };
      			  var timelneInterval = [];
                   // itemTrip.selectedTripData = GroupedObjects;
                   // itemTrip.timelineInterval = [];
                    itemTrip.equipments = [];
                    itemTrip.trailers = [];
                    itemTrip.quantities = [];
                    var freqtype = false;
                    var appointmentExist = false;

                 // loop thorugh the documents steps

                 for(let t = 0; t < currRoute.steps.length; t++) {
                         var ttime = "";
                         var currTask = currRoute.steps[t];
                           // console.log("OSRM Auto  curr task are",currTask);
                     if(currTask.type !== 'start' && currTask.type !== 'end') {
                        var docno = currTask.description;
                         // console.log("OSRM Auto  curr task is job");
                        for(let d = 0; d < this.state.docsPanel.length ; d ++ ) {

                             var currDoc = this.state.docsPanel[d];
                              // console.log("OSRM Auto  curr doc is job,",currDoc);
                             var SelectedDoc = [];
                             if(currDoc.docnum === docno) {

                               currDoc.vehicleCode = Veh;
                              currDoc.arrival  = secondsToHms(currTask.arrival);
                             currDoc.time =  convertSecToMin(currTask.duration);
                             currDoc.distance = 0;
                              currDoc.end   =  secondsToHms(currTask.arrival + currTask.service);
                              ttime = currDoc.arrival;
                              if(currDoc.doctype === 'PRECEIPT') {
                                    pickups = pickups + 1;
                                        							 currDoc.panelType = 'pickup';
                                                                     pickupObject.push(currDoc);
                                                                     fld_doc_capacity = fld_doc_capacity + currDoc.netweight;
                                                                     fld_doc_volume = fld_doc_volume + currDoc.volume;
                               }
                               else {
                                   drops = drops + 1;
                                   currDoc.panelType = 'drop';
                                   dropObject.push(currDoc);
                                    fld_doc_capacity = fld_doc_capacity + currDoc.netweight;
                                                                                                        fld_doc_volume = fld_doc_volume + currDoc.volume;
                               }
                                  itemTrip.selectedTripData.push(currDoc);
                               break;
                             }
                        }
                        //end of search task with document panel




                     } // end of if, task
                     else if(currTask.type === 'start') {
                      // console.log("OSRM start task",currTask.arrival);
                    startTime  = secondsToHms(currTask.arrival);
                      ttime = startTime;
                     }
                     else if(currTask.type === 'end') {
                      endTime  = secondsToHms(currTask.arrival);
                      ttime = endTime;
                        // console.log("OSRM end task",currTask.arrival);
                     }
                     //for timeline
                     var index = t * 12;
           timelneInterval.push(
              { value: index, label: ttime });

         // console.log("OSRM timline data  =",timelneInterval);
                 } // end of steps
                 totalWeight = 0 //totalWeight + parseInt(docItem.obbject.netweight);
                 totalVolume = 0 //totalVolume + parseInt(docItem.obbject.volume);
                 ddate = this.state.documentPanel_date;



     				itemTrip.timelineInterval = timelneInterval;
     				var TimelineInterval = VehicleObject.timelineInterval;
                     var stops = pickups + drops;
     				var site = VehicleObject.fcy;
     				var capacity = VehicleObject.capacities;
     				var fld_tot_capacity = VehicleObject.capacities;
     				var fld_tot_volume  = VehicleObject.vol;
     				var fld_uom_capacity = VehicleObject.xweu;
     				var fld_uom_volume = VehicleObject.xvol;
     				fld_per_capacity = Math.round((fld_doc_capacity / fld_tot_capacity) * 100);
     				fld_per_volume = Math.round((fld_doc_volume / fld_tot_volume) * 100);

     				var defaultDriver = "",defaultDrivername = "";
     				if(VehicleObject.driverid === " " || VehicleObject.driverid === "") {

     				     //assign some random driver from the active drivers
     				     var activeDrivers = this.state.vehiclePanel.drivers;
     				     var tempTripPanel = this.state.tripsPanel;
     				     var sflag = false;
     				     var dflag = false;

// console.log("T1212 active drivers =",activeDrivers);

// console.log("T1212 active trips =",tempTripPanel);
 var resArr1 = [], UsedDriversList = [];
  tempTripPanel.filter(function(item){
    var i = resArr1.findIndex(x => (x.code == item.code));
    if(i <= -1){
          resArr1.push(item);
    }
    return null;
  });


// console.log("T1212 active res trips =",resArr1);
  for(let t=0 ; t<resArr1.length ; t++) {
                var currtrip = resArr1[t];

               if(currtrip.driverId != "" || currtrip.driverId != null) {
                    UsedDriversList.push(currtrip.driverId)
               }
              //same vehicle , same driver allocation
              if(currtrip.code === Veh) {
                 sflag = true;
                 if(currtrip.driverId != "" || currtrip.driverId != null) {
                   defaultDriver = currtrip.driverid;
                    defaultDrivername = currtrip.driverName;
                    dflag = true;

// console.log("T1212 active same driver assigned =",defaultDriver);
                 }
                 break;
              }
       }

// console.log("T1212 active usedDriverlist =",UsedDriversList);

// console.log("T1212 same pricess used Drivers =",sameProcessUsedDriversList);
// console.log("T1212 Routeprocessed - Trips Data =",RouteprocessedData);
// console.log("T1212 dfalg =",dflag);
                         // Veh  -  vehicle
                         //check already vehicle is used , and assign same driver
                         //loop all the drivers list and assigned not used driver
                         if(!dflag) {
                          // console.log("T1212 - 0");
                         for(let dl = 0 ; dl < activeDrivers.length ; dl ++) {
                           // console.log("T1212 - 1");
                               if (UsedDriversList.length > 0) {
                                if(!UsedDriversList.includes(activeDrivers[dl].driverid)) {
                                   // console.log("T1212 - 2");
                                   if(sameProcessUsedDriversList.length > 0)
                                   {
                                        // console.log("T1212 - 2 - 1");
                                   if(!sameProcessUsedDriversList.includes(activeDrivers[dl].driverid)) {
// console.log("T1212 active randon unused driver assigned =",defaultDriver);
 // console.log("T1212 - 2 - 2");
                                    defaultDriver = activeDrivers[dl].driverid;
                                    defaultDrivername = activeDrivers[dl].driver;
                                     sameProcessUsedDriversList.push(activeDrivers[dl].driverid);
                                     break;
                                     }
                                     else {
                                      // console.log("T1212 - 2 - 3");
                                     }
                                     }
                                     else {
                                     // console.log("T1212 - 3");
                                      defaultDriver = activeDrivers[dl].driverid;
                                                                         defaultDrivername = activeDrivers[dl].driver;
                                                                         sameProcessUsedDriversList.push(activeDrivers[dl].driverid);
                                                                         break;
                                     }

// console.log("T1212 active randon driver assigned =",defaultDriver);
                               }
                               }
                               else {
                               // console.log("T1212 - 5");
 if(sameProcessUsedDriversList.length > 0) {
          // console.log("T1212 - 5 - 1");
     if(!sameProcessUsedDriversList.includes(activeDrivers[dl].driverid)) {
           // console.log("T1212 - 5 - 2");
         // console.log("T1212 active randon first driver assigned =",defaultDriver);
          defaultDriver = activeDrivers[dl].driverid;
                                             defaultDrivername = activeDrivers[dl].driver;
                                             sameProcessUsedDriversList.push(activeDrivers[dl].driverid);
                                              break;

     }
     else {
        // console.log("T1212 - 5 - 3");
     }
     }
   else {
// console.log("T1212 - 7");
                                       defaultDriver = activeDrivers[dl].driverid;
                                                                          defaultDrivername = activeDrivers[dl].driver;
                                                                          sameProcessUsedDriversList.push(activeDrivers[dl].driverid);

                                            break;
                                     }
                               }
                         }
                         }

     				}
     				else {
     				// console.log("T1212 - 8");
     				defaultDriver = VehicleObject.driverid;
     				   if(VehicleObject.drivername != null || VehicleObject.drivername != "") {
     				     defaultDrivername = VehicleObject.drivername;
     				   }

// console.log("T1212 active default driver assigned =",defaultDriver);
     				}
     				// console.log("OSRM Vehicle Object =",VehicleObject);
                    var volume = VehicleObject.vol;
                  //  var StartTime = VehicleObject.timelineInterval[0].label;
     			   vehobj = VehicleObject;



           if (totalWeight > 0) {
             percentageMass =  0//((parseInt(totalWeight) / parseInt(capacity)) * 100).toFixed(1);
           }

           if (totalVolume > 0) {
             percentageVolume =   0//((parseInt(totalVolume) / parseInt(volume)) * 100).toFixed(1);
           }
           var today = new Date;
           var execdate = today.getDate();

 // console.log("OSRM Auto Routes data are",routes[k]);
   var trip = {
                        arrSite : site,
                                                        code: Veh,
                                                        date : moment.tz(ddate,'').format("YYYY-MM-DD"),
                                                        docdate : moment.tz(ddate,'').format("YYYY-MM-DD"),
                                                        endDate : ddate,
                                                        depSite : site,
                                                        freqExist : freqtype ,
                                                        appointment : appointmentExist,
                                                        poProcessed : false,
                                                        tot_capacity : fld_tot_capacity,
                                                        tot_volume : fld_tot_volume,
                                                        doc_capacity : fld_doc_capacity,
                                                        doc_volume : fld_doc_volume,
                                                        per_capacity : fld_per_capacity,
                                                        per_volume : fld_per_volume,
                                                        uom_capacity : fld_uom_capacity,
                                                        uom_volume : fld_uom_volume,
                                                        dlvystatus : 0,
                                                        lvsno: null,
                                                        credattim: new Date(),
                                                        upddattim: new Date(),
                                                       // datexec : new Date(),
                                                        datexec : new Date(),
                                                        driverName: defaultDrivername,
      												  driverId: defaultDriver,
      												  generatedBy : 'AutoScheduler',
      												  defaultDriver: '',
                                                        trailers: 0,
      												  site : site,
                                                        equipments: 0,
                                                        vehicleObject: vehobj,
      												  optistatus : 'Optimized',
      												  capacities : capacity,
      												  adeptime : startTime,
      												  startTime : startTime,
      												  endTime  : endTime,
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
      						 timelineInterval: TimelineInterval,
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
                                travelTime : 0,
        serviceTime : 0,
        totalTime : 0,
        totalDistance : 0,
       fixedCost : 0,
        totalCost : 0,
       distanceCost : 0,
        regularCost : 0,
       overtimeCost : 0,
        timeCost : 0,
                               driverslist: '',
                               allcustomers: '',
                               customerlist: '',

                      }

                  RouteprocessedData.push(trip);
                  }
             // console.log("OSRM Final TripsList =",RouteprocessedData);
              TripsfromRoutes = RouteprocessedData;
              // console.log(TripsfromRoutes);
              this.ConfirmScheduledTrips(TripsfromRoutes);
}



     submitDocumentsforTripCreation = () => {
             // console.log("T111 inside submittion of create trips =",this.schedulerRef);
             const events = this.schedulerRef.current.scheduleObj.getCurrentViewEvents();
             var dlvyevents = [];
             var tripevents = [];
             events.forEach(function (event) {
                 if(event.optistatus === 'dragged'){
                     dlvyevents.push(event);
                 }
                 else if(event.optistatus === 'Open') {
                    tripevents.push(event);
                 }
                 else {
                 }
             });


             let groups = ["techId", "docdate"],
               grouped = {};
              dlvyevents.forEach(function (a) {
               groups
                 .reduce(function (o, g, i) {
                     o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {}); // or generate new obj, or
                   return o[a[g]]; // at last, then an array
                 }, grouped)
                 .push(a);
             });
             var processedData = [];
             var Trips = [];

             Object.keys(grouped).forEach((x) => {
                let dateBy = grouped[x];
               Object.keys(dateBy).forEach((d) => {
                   //trying to loop and get the pickup object and drop objects init
                   var GroupedObjects = dateBy[d];
                   var dropObject = [], pickupObject = [],drops = 0, pickups = 0;
     			  var totalWeight = 0;
     			  var ddate = '';
                   var totalVolume = 0;
                   var weight = "";
                   var volume = "";
     			  var vol_unit = "";
                    var wei_unit = "";
                   var percentageMass = 0;
                   var percentageVolume = 0;
                   var flds_uom_volume = '';
                   var flds_uom_capacity = '';
                   var flds_per_volume = 0;
                   var flds_per_capacity = 0;
                   var flds_doc_volume = 0;
                   var flds_doc_capacity = 0;
                   var flds_tot_volume = 0;
                   var flds_tot_capacity = 0;
                   var TechnicianObject = [] ;
     			  var vehobj = [];
                   var itemTrip = {
     			  selectedTripData : [],
                   timelineInterval : [],
                   equipments : [],
                   trailers : [],
                   quantities : []
     			  };
                  // itemTrip.selectedTripData = GroupedObjects;
                  // itemTrip.timelineInterval = [];
                   itemTrip.equipments = [];
                   itemTrip.trailers = [];
                   itemTrip.quantities = [];
                   GroupedObjects.forEach(function (docItem) {
                           // console.log("T111 inside groupobjects =",docItem);
                             TechnicianObject =  docItem.TechnicianObject;
                             docItem.obbject.techId = docItem.TechnicianObject.codeyve;
                             itemTrip.selectedTripData.push(docItem.obbject);
                              if(docItem.docType === 'Order'){
                                  drops = drops + 1;
     							 docItem.obbject.panelType = 'drop';
                                  dropObject.push(docItem.obbject);
                              }
                              else {
                                  pickups = pickups + 1;
     							 docItem.obbject.panelType = 'pickup';
                                  pickupObject.push(docItem.obbject);
                                  // console.log("Doctype of object =",docItem.obbject);

                                 }

     						 //weight calculations

                             ddate = docItem.docdate;

                          });


     				itemTrip.timelineInterval = TechnicianObject.timelineInterval;
     				var TimelineInterval = TechnicianObject.timelineInterval;
                     var stops = pickups + drops;
     				var site = TechnicianObject.fcy;
     				var capacity = TechnicianObject.capacities;
     				 flds_tot_capacity = TechnicianObject.capacities;
     				 flds_tot_volume = TechnicianObject.vol;
     				 flds_uom_capacity = TechnicianObject.xweu;
     				 flds_uom_volume = TechnicianObject.xvol;

     				var defaultDriver = "",defaultDrivername = "";
     				if(TechnicianObject.driverid === " " || TechnicianObject.driverid === "") {
     				}
     				else {
     				defaultDriver = TechnicianObject.driverid;
     				   if(TechnicianObject.drivername != null || TechnicianObject.drivername != "") {
     				     defaultDrivername = TechnicianObject.drivername;
     				   }
     				}
                    var volume = TechnicianObject.vol;
                    var StartTime = TechnicianObject.timelineInterval[0].label;
     			   vehobj = TechnicianObject;


            var trip = {
                       arrSite : site,
                                                       code: x,
                                                       date : moment.tz(d,'').format("YYYY-MM-DD"),
                                                       docdate : moment.tz(d,'').format("YYYY-MM-DD"),
                                                       depSite : site,
                                                       dlvystatus : 0,
                                                       lvsno: null,
                                                       credattim: new Date(),
                                                       upddattim: new Date(),
                                                      generatedBy : 'Scheduler',
     												  site : site,
                                                       TechnicianObject: vehobj,
     												  optistatus : 'Open',
     												  startTime : StartTime,
     												  trips: 1,
     												  pickups: pickups,
                                                      lock: false,
                              pickupObject: pickupObject,
                              dropObject: dropObject,
                              totalObject : itemTrip,
                              techObject : vehobj,
                              drops: drops,
                              stops: stops,
                              startIndex : stops,
                              pickUps: pickups,
     						 timelineInterval: TimelineInterval,
                              currDropsPanel: {
                                  drops: [],
                                  pickUps: []
                              },
                              pickups: pickups,
                              alldrivers: '',

                     }
                  console.log("trip =", trip)
                 processedData.push(trip);
               });
             });
             Trips = processedData;
              console.log(Trips);

             this.ConfirmScheduledTrips(Trips);
           }



     ConfirmScheduledTrips = (trips) => {

      this.setState({ loader: true });
      fetch('http://tmsx3.tema-systems.com:8050/api/fms/transport/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trips)
      }).then((response) => {
        // console.log("inside after trip - response",response);
        this.handleErrors(response);
      }).then(function (response) {

      }).then(() => {
         // console.log("inside submit Trips",this.state.date);
        this.handleDateRangeChange();
      }).then(() => {
        this.setState({ laoder: false, checkedTrip: false, isDetail:false });
        this.notifySucess("Trip Added/Updated Sucessfully");
      }).catch(error => {
        this.handleDateRangeChange();
       this.setState({ loader: false });
        this.notifyError("Please add proper trip to add or update, with vehicle, drops and pickups");
      });
    }


getPOandPreREceiptfromFreq = (index, tripcode) => {
 // console.log("trips of selected =",tripcode);
 let FreqExist = false;
 var tripPanel = this.state.tripsPanel;
 // console.log("trips of selected tripspanle =",tripPanel);
    var generatePofortrip = [];
      for(let trip in tripPanel)
           {
                 // console.log("Trips inside loop",trip);
                if(tripPanel[trip].itemCode === tripcode) {
                   // console.log("Trips of selected code=",trip.code);
                   generatePofortrip.push(tripPanel[trip]);

                }
           }
        // console.log("trips of selected =",generatePofortrip);

      for (var i = 0; i < generatePofortrip[0].totalObject.selectedTripData.length; i++) {
                    if(generatePofortrip[0].totalObject.selectedTripData[i].doctype === 'FREQENCY')
                    {
                        FreqExist = true;
                        var currentFreq = generatePofortrip[0].totalObject.selectedTripData[i];
                        // console.log("Freq Type =",currentFreq);
                         var num = currentFreq.docnum;
                         var site = currentFreq.site;
                         var date = moment.tz(currentFreq.docdate,'').format('YYYYMMDD');
                          // console.log("Freq Type docdate =",date);
                         var supplier = currentFreq.bpcode
                         var reference = "Scheduler"
                         var Qty  = currentFreq.products[0].quantity;
                         let  resultantXml, PO,PreReceipt ;
                         CreatePOfromFrequency2(num, site, date,supplier, reference, Qty)
                         .then(res => {
                         // console.log("after soap completes The result is", res);
                         resultantXml = res;
                           PO =  resultantXml.children[1].children[1].value;
                          PreReceipt = resultantXml.children[1].children[2].value;
                          currentFreq.POnum = PO;
                                                                                       currentFreq.PreReceipt = PreReceipt;
                                                                                           // console.log("after soap PO",PO);
                                                                                                 // console.log("after soap PreReceipt =",PreReceipt);
                          // console.log("final current freq",currentFreq);
                         })
                         .then(() => {
                                //update PO, PreREceipt numbers in the Freq type Document
                                 this.updatePOPreReceiptDocs(generatePofortrip);
                               })

                         // let  resultantXml = this.POPrereceiptSoapCall(num, site, date,supplier, reference, Qty)

// console.log("after soap calls");
                             }
          }
          // console.log("after completes = freq ", generatePofortrip);

}

updatePOPreReceiptDocs = (trip) => {
  var trips = trip;
 // trips.push(trip);
  fetch('http://tmsx3.tema-systems.com:8050/api/v1/transport/freq/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trips)
      }).then((response) => {
        // console.log("inside after trip - response",response);
        this.handleErrors(response);
      }).then(function (response) {

      }).then(() => {
         // console.log("inside submit Trips",this.state.date);
        this.handleDateRangeChange();
      }).then(() => {
        this.setState({ loading: false, checkedTrip: false, isDetail:false });
        this.notifySucess(" PO & PreReceipt Data update Sucessfully");
      }).catch(error => {
        this.handleDateRangeChange();
        this.setState({ loading: false });
        this.notifyError("Please add proper trip to add or update, with vehicle, drops and pickups");
      });



}



  reloadTrips = () => {
    const currDate = moment.tz(this.state.date,'').format('YYYY-MM-DD');
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
    const currDate = moment.tz(this.state.date,'').format('YYYY-MM-DD');
    let value = this.state.selectedMultipleSites
    fetch('http://tmsx3.tema-systems.com:8050/api/fms/transport/delete/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trips)
    }).then((response) => {
      this.reloadTrips();
      //  this.handlePanelsUpdate(currDate);
      this.notifySucess("Trip deleted Sucessfully");
       this.onRouteoptihide();
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

  getRouteSchedulerApp = (routesSchedule, optimisedindex , auto,from , Tripsdata , SelectedI) => {
     var data = [];
     var newGeoData = [];
    if(auto) {
        var tempoptimisedIndex= [];
          var tempGeoData;
        //map
       const tempdata =  optimisedindex.map((order , index) => {
            for(var i = 0 ; i < order.length ; i++){
               tempoptimisedIndex.push(order[i].optimizedIndex)
            }

        })
     /*   if(from === 'Trips') {
            tempGeoData = Tripsdata;
        }
        else {
          tempGeoData = this.state.geoData;
        }*/
tempGeoData = this.state.geoData;
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
     // console.log("T6565 Tripsdata else");
    var data = [];
    var GeoData1 = [];

     if(from === 'Trips') {
         this.updateonlyTripsPanel(SelectedI);
         var  selectedTrips = Tripsdata.totalObject.selectedTripData;
        routesSchedule.trips.timelineInterval = Tripsdata.totalObject.timelineInterval;
        // console.log("T6565 Tripsdata else if");
    for (var i = 0; i < selectedTrips.length; i++) {

            GeoData1.push(selectedTrips[i]);
        }
        GeoData1.map((geo, geoIndex) => {

              routesSchedule.routesData.map((route, routeIndex) => {

                if (geoIndex === routeIndex) {
                  data = { ...geo, ...route }
                }
              })
              newGeoData.push(data)
            });

    }
    else {

    // console.log("T6565 Tripsdata else else");
    this.state.geoData.map((geo, geoIndex) => {

      routesSchedule.routesData.map((route, routeIndex) => {

        if (geoIndex === routeIndex) {
          data = { ...geo, ...route }
        }
      })
      newGeoData.push(data)
    });
    }
    }
    // console.log("T6565 Tripsdata else end");
    this.setState({ geoData: newGeoData})
    this.setState({ routeSchedulerTime: routesSchedule });
    this.confirmTrip(routesSchedule.trips, "route", routesSchedule, newGeoData);
  }

  notifySucess = (message) => toast.success(message, { autoClose: 3000 });

  notifyError = (message) => toast.error(message, { autoClose: 3000 });


  render() {
 let optionItems = [];
  let addAlertClose = () => this.setState({ addAlertShow: false });
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
            <LoadingOverlay
                                                            active={this.state.loader}
                                                            spinner
                                                            text='Loading Please wait...'
                                                          >
                <SideNav_Test
                                           sites={this.state.sites}
                                           documentPanel_dateflg = {this.state.documentPanel_dateflg}
                                           routecodes = {this.state.RouteCode}
                                           searchSite={this.state.searchSiteString}
                                           selectedSite={this.state.selectedSiteValue}
                                           selectedSitesArr = {this.state.selectedSitesArr}
                                           handleSiteChange={this.handleSiteChange}
                                           handleRouteCodeChange = {this.handleRouteCodeChange}
                                           sitesArr={this.sitesArr}
                                           RouteCodeArr = {this.RouteCodeArr}
                                           selectedRouteCodeArr = {this.state.selectedRouteCodeArr}

                                           VehicleCodeArr = {this.VehicleCodeArr}
                                           handleVehicleCodeChange = {this.handleVehicleCodeChange}
                                           selectedVehicleCodeArr = {this.state.selectedVehicleCodeArr}

                                           selectedDate={this.state.date}
                                           SelectedGroupBy={this.state.SelectedGroupBy}
                                           handleDateChange={this.handleDateChange}
                                           onVRhide={this.onVRhide}
                                           OncheckedSameVehicles = {this.OncheckedSameVehicles}
                                           samevehicleChecked = {this.state.checkedsameVehicles}
                                           onDocProcessChange = {this.onDocProcessChange}
                                           defaultprocessDocs = {this.state.defaultdocprocess}
                                           vrShow={this.state.vrShow}
                                            vehicleShow = {this.state.vehicleShow}
                                           schedulerShow = {this.state.schedulerShow}
                                           submitDocumentsforTripCreation = {this.submitDocumentsforTripCreation}
                                           autoGenerateTrips = {this.autoGenerateTrips}
                                           autoResetTrips = {this.autoResetTrips}
                                           GrouplockTrips = {this.GrouplockTrips}
                                           grouplockTrips = {this.grouplockTrips}
                                           RouteoptiShow={this.state.RouteoptiShow}
                                           onValidateAll={this.onValidateAll}
                                           guageTrip={this.state.guageTrip}
                                           vehiclePanel={this.state.vehiclePanel}
                                             vehicles = {this.state.vehiclePanel.vehicles}
                                           getValuestoApp={(routesSchedule, optiindex, auto) => this.getRouteSchedulerApp(routesSchedule, optiindex, auto , 'AutoOps')}
                                           tripsPanel={this.state.tripsPanel}
                                           refreshAllPanels = {this.refreshAllPanels}
                                           handleDateRangeChange = {this.handleDateRangeChange}

                                         >
                               </SideNav_Test>

             <section style={{ display: this.state.schedulerShow }}>
              <Row className="mt-3">

              <Col md="12">
                  <ScheduleTrips ref={this.schedulerRef}
                    SelectedGroupBy={this.state.SelectedGroupBy}
                    handleDateRangeChange = {this.handleDateRangeChange}
                    selectedDate = {this.state.date}
                    selectedSite = {this.state.selectedSite}
                    vehiclePanel = {this.state.vehiclePanel}
                     disableDivs={this.disableDivs}
                     filterVehicleflg = {this.state.filterVehicleflg}
                     selectedVehicleCodeArr = {this.state.selectedVehicleCodeArr}
                    vehicles = {this.state.vehiclePanel.vehicles}
                    dropsPanel={this.state.docsPanel}
                    onTripCreationwithDoc = {this.onTripCreationwithDoc}
                    SelectedDocumentEvent = {this.SelectedDocumentEvent}
                    selectedDocumentList = {this.state.selectedDocumentList}
                  />

             </Col>
             </Row>
             </section>



               <section style={{ display: this.state.RouteoptiShow }}>

                <Row className="mt-3">
                                            <Col md="12">
                                                <AddUpdateTrip1
                                                isDragged = {this.state.isDragged}
                                                onRouteoptihide = {this.onRouteoptihide}
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
                </Row>
               </section>

             <section style={{ display: this.state.vehicleShow }}>
               <Row className="mt-3">
                <Col md="6">
                <DocumentsPanel
                                                     checkedToPlan={this.checkedToPlan}
                                                     dropsPanel={this.state.docsPanel}
                                                     deliverySite={this.state.deliverySite}
                                                     handleDragStart={this.handleDragStart}
                                                      Nonvalidate = {this.Nonvalidate}

                                                     documentPanel_dateflg = {this.state.documentPanel_dateflg}
                                                                          documentPanel_5dayscheck = {this.state.documentPanel_5dayscheck}
                                                                          documentPanel_date = {this.state.documentPanel_date}
                                                                          documentPanelDateChange = {this.documentPanelDateChange}
                                                     selectedRouteCodeArr = {this.state.selectedRouteCodeArr}
                                                     sortDrop={this.sortDrop}
                                                     dropOrder={this.state.dropOrder}
                                                     selectedDate={this.state.dropDate}
                                                     updateDropSearchTerm = {this.updateDropSearchTerm}
                                                     updateTripsSearchTerm = {this.updateTripsSearchTerm}
                                                     searchDrp = {this.state.searchDrpString}
                                                     searchTrip = {this.state.searchTripString}
                                                     tripsList = {this.state.tripsPanel}
                                                     vehiclePanel = {this.state.vehiclePanel}
                                                     updateTripsGeoLocations={this.updateTripsGeoLocations}
                                                     updateDocsGeoLocations = {this.updateDocsGeoLocations}
                                                     onVRClick={this.onVRClick}
                                                     updateTripsGeolocationbeforelock = {this.updateTripsGeolocationbeforelock}
                                                     onLockRecord={this.onLockRecord}
                                                     validate={this.validate}
                                                     onCompleteTripDelete={this.onCompleteTripDelete}
                                                     onWarningAlertOff = {this.onWarningAlertOff}
                                                     onLockRecord={this.onLockRecord}
                                                     date={this.state.date}
                                                     selectAllTripsPanel={this.selectAllTripsPanel}
                                                     routeSchedulerData={this.state.routeSchedulerTime}
                                                     UnlockConfirmTrip={this.UnlockConfirmTrip}
                                                       OptimiseConfirmTrip={this.OptimiseConfirmTrip}
                                                     onValidateAll={this.onValidateAll}
                                                     onloaderMsg = {this.onLoadermessage}
                                                     onForceseq = {this.onForcesequnceCheck}
                                                     OnCheckedToLock = {this.OncheckedToLock}
                                                     daysCheckedIn = {this.state.daysCheckedIn}
                                                     checked5daysfromDocumentPanel = {this.checked5daysfromDocumentPanel}
                                                     OnCheckedToOpen = {this.OnCheckedToOpen}
                                                     OnCheckedToOptimise = {this.OnCheckedToOptimise}
                                                     OnCheckedToValidate = {this.OnCheckedToValidate}
                                                     OncheckedTodropList = {this.OncheckedTodropList}
                                                     OncheckedToPickupList = {this.OncheckedToPickupList}
                                                     OnCheckedToShowoverMap = {this.OnCheckedToShowoverMap}
                                                     refreshDocspanel ={this.refreshDocspanel}
                                                     getPOandPreREceiptfromFreq = {this.getPOandPreREceiptfromFreq}
                                                     sites={this.state.sites}
                                                     selectedSite={this.Timeline_SelectedSite}
                                                     getValues={(routesSchedule, optiindex, auto , data , selectedI) => this.getRouteSchedulerApp(routesSchedule, optiindex, auto, 'Trips', data, selectedI)}


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
                                         currDropsPanel={this.state.docsPanel}
                                        trips={this.state.trips}
                                        sites={this.state.sites}
                                        onDocMsg={this.onDocmessage}
                                        />

            </Row>
            </section>

            <section style={{ display: this.state.vrShow }}>
                          <Row className="mt-3" style={{marginLeft : "0px", marginRight : "20px", marginBottom : "40px" }}>
                          <Col xs="12">

                            <VrHeader
                               vrdata={this.state.vrlist}
                               selectedVrIndex = {this.state.selectedVrIndex}
                               selectedVrValidated = {this.state.selectedVrValidated}
                               validate={this.validate}
                               validateonly = {this.validateonly}
                               loadvehstck={this.state.loadvehstock}
                               tripdetails={this.state.clickedTrips}
                             />
                            </Col>
                          <Col lg="12">
                            <VrStops3
                          vedetail={this.state.vrdetaillist}
                          tripdetails={this.state.clickedTrips}
                           sites={this.state.sites}
                            />
                            </Col>
                             <Col lg="12">
                            <IndividualRouteMap2
                      vrdata={this.state.vrlist}
                                              markers={this.state.markers}
                                              tripsList={this.state.tripsPanel}
                                              siteDetails={siteDetails}
                                              sites={this.state.sites}
                                              bl_tripsList = {this.state.bl_tripsList}
                                              bl_markers = {this.state.bl_markers}
                                              triplock = {this.state.triplock}
                            />
             </Col>
                      </Row>

                                   <div className="gap" style={{height : "50px"}}>
                                                 </div>


            </section>
             <IdleTimerContainer></IdleTimerContainer>
              </LoadingOverlay>
          </Container>
          <div
            className={`detail-sidebar ${this.state.isDetail ? "open" : ""}`}
          >
             <Timeline
             sites={this.state.sites}

                                        date={moment.tz(this.state.date,'').format('YYYY-MM-DD')}
                                        RouteoptiShow={this.state.RouteoptiShow}
                                        data={this.state.guageTrip}
                                        selectedSite={this.Timeline_SelectedSite}
                                        vehiclePanel={this.state.vehiclePanel}
                                        getValues={(routesSchedule, optiindex, auto) => this.getRouteSchedulerApp(routesSchedule, optiindex, auto , 'Timeline')}
                                        tripsPanel={this.state.tripsPanel}
                                        toggleDetail = {this.toggleDetail}

             />
          </div>
          <Modal isOpen={this.state.modal_standard} toggle={this.tog_standard}>
            <ModalHeader
              toggle={() => this.setState({ modal_standard: false })}
            >
              Message
            </ModalHeader>
            <ModalBody>
              <div className="table-responsive">
                <FormGroup>
                  <Input type="textarea" name="message" rows="8" />
                </FormGroup>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                onClick={this.tog_standard}
                color="light"
                className="waves-effect"
              >
                Close
              </Button>
              <Button
                type="button"
                color="primary"
                className="waves-effect waves-light"
              >
                Save
              </Button>
            </ModalFooter>
          </Modal>
        </div>
         <Alert
                                show={this.state.addAlertShow}
                                onHide={addAlertClose}
                                errorMessage={this.state.errorMessage}
                            ></Alert>
      </React.Fragment>
    );
  }

}

export default Dashboard;
