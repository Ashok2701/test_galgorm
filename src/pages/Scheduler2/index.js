import React, { Component } from "react";
import Select from "react-select";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { AgGridReact } from "ag-grid-react";
import ScheduleTrips from "./Panel/ExternalDragDrop";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { logoutUser } from "../../store/actions";
// import IdleTimerContainer from '../../IdleTimerContainer';
import { fetchDocumentPanelwithRangeDaysBack, fetchSchedulerAPI } from "../../service";
import { ToastContainer, toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  convertHrToSec,
  convertSecToMin,
  secondsToHms,
  splitTimeAndConv2Sec,
  splitTimeAndAddtimeAndConv2Sec,
  convertSecToHr,
  formatTime,
  formatHHMM,
  splitTime,
  convertHrToMin,
  secondsToDecimalHours,
  convertMinToSec,
  secondsToHmsAutoGen,
} from "./converterFunctions/converterFunctions";
import moment from "moment";
import SideNav from "./Nav1/SideNav";
import SideNav_Test from "./Nav1/SideNav_Test";
import Alert from "./Panel/Alert";
import {
  fetchAPI,
  fetchDocumentPanelAPI,
  fetchSchedulerAPIOneDate,
  fetchDocumentPanelwithRange,
  ToPickData,
  ToStaggingLocationFetchData,
  AllocatedDataByStaggingLocations,
  ToAllocationFetchData,
  ToAllocationSubmitData,
} from "../../service";
import XMLParser from "react-xml-parser";
import {
  fetchPanel,
  ConfirmLVS,
  ToLotDetailsFetchData,
  ToLocationsFetchData,
} from "../../service";
import { fetchTrips } from "../../service";
import { fetchDropsPanel } from "../../service";
import { fetchDropsPanelwithRange, fetchSchedulerDocsAPI } from "../../service";
import { fetchVR, fetchLVS } from "../../service";
import VehiclePanel from "./Panel/VehiclePanel";
import DocumentsPanel from "./Panel/DocumentsPanel";
import AddUpdateTrip1 from "./Panel/AddUpdateTrip1";
import TripsList3 from "./Panel/TripsList3";
import VrHeader from "./Panel/VrHeader";
import VrStops3 from "./Panel/VrStops3";
import Timeline from "./Panel/Timeline";
import RouteMap1 from "./Panel/RouteMap1";
import IndividualRouteMap2 from "./Panel/IndividualRouteMap2";
import VrTotals from "./Panel/VrTotals";
import RouteDetails from "./RouteDetail";
import "./dashboard.scss";

import LVSToPickTabs from "./Panel/ToPickTabs";
import LVSToAllocationTabs from "./Panel/ToAllocationTabs";
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
import AlertSummary from "./Panel/AlertSummary";
import AlertArray from "./Panel/AlertArray";

// backend url from .env
const apiUrl = process.env.REACT_APP_API_URL;

const optionGroup = [
  { label: "CORPS", value: "corps" },
  { label: "WASTE", value: "waste" },
];

class Dashboard extends Component {
   docChangeTimeout = null;
  constructor(props) {
    super(props);
    this.schedulerRef = React.createRef();
    this.state = {
      currentViewCheck: "",
      activeTab: "Vehicles",
      docnoRemoveTrip: "",
      checkedToPlan: false,
      checkedToOpen: false,
      checkedToOptimise: false,
      checkedToLock: false,
      checkedToValidate: false,
      checked5days: false,
      checkedDropsList: false,
      checkedPickupList: false,
      checkedsameVehicles: false,
      checkedToShowinMap: false,
      optimisedClickedTrip: false,
      defaultdocprocess: 90,
      daysDoc:7,
      isDragged: false,
      loader: false,
      draggedDocActTour: {},
      selectedDocumentList: [],
      toPickDataList: [],
      toAllocationDataList: [],
      toStaggingLocationList: [],
      toStaggingLocationList2: [],
      toLogDataList: [],
      StaggingFromLoc: "",
      StaggingFromLocIndex: 0,
      StaggingToLoc: "",
      StaggingToLocIndex: 0,
      StaggingFromLoc2: "",
      StaggingFromLoc2Index: 0,
      StaggingToLoc2: "",
      StaggingToLoc2Index: 0,
      docs4rautoselection: [],
      doc4autoselection: {},
      vehs4autoselection: [],
      veh4autoselection: {},
      pickersList: [],
      selectedDocs: [],
      checkedDoccs: [],
      breadcrumbItems: [
        { title: "Route Planner", link: "#" },
        { title: "Dashboard", link: "#" },
      ],
      isTimeline: false,
      IsPickTicket: false,
      onlyReceiptflg: false,
      SelectedGroupBy: "Vehicles",
      vehicleShow: "block",
      schedulerShow: "block",
      RouteoptiShow: "none",
      vrShow: "none",
      toPickdetailsShow: "none",
      toAllocationdetailsShow: "none",
      addAlertArrayShow: false,
      addAlertSummaryShow: false,
      errorSummartMessage: "",
      errorArrayMessage: "",
      vehicleChecked: "none",
      vrlist: [],
      bl_markers: [],
      SelectedDeletedDocs: [],
      bl_tripsList: {},
      initalload: true,
      deliverySite: "",
      searchVString: "",
      searchSiteString: "",
      searchTString: "",
      searchEString: "",
      searchDString: "",
      searchDrpString: "",
      alert: false,
      alertMessage: "",
      documentPanel_date: "",
      documentPanel_dateflg: false,
      documentPanel_5dayscheck: false,
      filterVehicleflg: false,
      searchTripString: "",
      searchPckString: "",
      panelSearchString: "",
      vrdetaillist: [],
      loadvehstock: [],
      slectedTrips: [],
      selectedTripData: {},
      allowedDrivers: [],
      allAllowedDrivers: false,
      allAllowedTrailers: false,
      vehicleDropped: false,
      droppedTrailers: [],
      allowedTrailers: [],
      isDetail: false,
      date: new Date(),
      sites: null,
      selectedSite: {
        id: "All",
      },
      selectedRouteCode: {
        id: "All",
      },
      selectedVehicleCode: {
        id: "All",
      },
      selectedSiteValue: "",
      selectedRoutecodeValue: "",
      guageTrip: {},
      addAlertShow: false,
      errorMessage: "",
      selectedMultipleSites: "",
      markers: [],
      geoData: [],
      mapChanged: false,
      clearTrips: false,
      trips: [],
      isTimeline: false,
      trailers: [],
      isDetail: false,
      selectedVrIndex: "",
      selectedVrValidated: "",
      slectedTrips: [],
      clickedTrips: [],
      selectedTripData: {},
      default_date: new Date(),
      dropDate: new Date(),
      selectedPlace: {},
      triplock: false,
      vehiclePanel: {
        vehicles: [],
        equipments: [],
        trails: [],
        drivers: [],
      },
      RouteCode: null,
      docsPanel: [],
      dropsPanel: {
        drops: [],
        pickUps: [],
      },
      dataTransfer: {
        currentCard: "",
        type: "",
        id: "",
        index: -1,
      },
      firstMatchedRouteCodeDesc: {},
      tuesdayMatchecRouteCodeDesc: {},
      wednesdayMatchedRouteCodeDesc: {},
      thursdayMatchedRouteCodeDesc: {},
      fridayMatchedRouteCodeDesc: {},
      tripColor: [
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
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
        "#26a541",
      ],
      pickOrder: [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1,
      ],
      dropOrder: [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ],
      equpOrder: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      diverOrder: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      vehOrder: [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1,
      ],
      trailOrder: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      topDetails: {
        vehicleCount: 0,
        TotalvehicleCount: 0,
        routesCount: 0,
        assignedOrders: 0,
        unassignedOrders: 0,
        travelTime: 0,
        serviceTime: 0,
        DropProdCount: 0,
        PickupProdCount: 0,
      },
      tripsPanel: [],
      selectedSitesArr: [],
      selectedRouteCodeArr: [],
      selectedVehicleCodeArr: [],
      selectedRCode: [],
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
      googeMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyANa5oogYwmC9XtnHep09-JoU0Bjp13tWU&v=3.exp&libraries=geometry,drawing,places",
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.handleDefault = this.handleDefault.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.toggleDetail = this.toggleDetail.bind(this);
    this.tog_standard = this.tog_standard.bind(this);
    this.updateselectedRCode = this.updateselectedRCode.bind(this);
    this.ClearRouteCodes = this.ClearRouteCodes.bind(this);
    this.googleMapRef = React.createRef();
    this.setcurrentView = this.setcurrentView.bind(this);
   
  }

  updateselectedRCode(val) {
    this.setState({ selectedRCode: val });
  }

  ClearRouteCodes() {
    this.setState({
      selectedRCode: [],
      tripsChecked: [],
      checkedTrip: false,
      showListRouteMap: false,
      selectedRouteCodeArr: [],
      selectedRouteCode: {
        id: "All",
      },
    });
  }

  setTriplistSeqChange(flg) {
    this.setState({
      triplistSeqChange: flg,
    });
  }

  setcurrentView(view) {
    this.setState({
      currentViewCheck: view,
    });
  }

  setDocumentPanelDate(date) {
    this.setState({
      documentPanel_date: date,
    });
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

  Dateformat() {}

  updateMagChaged = () => {
    this.setState({
      mapChanged: false,
    });
  };

  updateSiteSearchTerm = (event) => {
    this.setState({ searchSiteString: event.target.value });
  };

  updateVehSearchTerm = (event) => {
    this.setState({ searchVString: event.target.value });
  };
  updateTrailSearchTerm = (event) => {
    this.setState({ searchTString: event.target.value });
  };
  updateEquSearchTerm = (event) => {
    this.setState({ searchEString: event.target.value });
  };
  updateDriverSearchTerm = (event) => {
    this.setState({ searchDString: event.target.value });
  };
  updateDropSearchTerm = (event) => {
    
    this.setState({ searchDrpString: event.target.value });
  };
  updatePickupSearchTerm = (event) => {
    this.setState({ searchPckString: event.target.value });
  };

  updateTripsSearchTerm = (event) => {
    this.onRouteoptihide();

    this.setState({
      searchTripString: event.target.value,
      tripsChecked: [],
      checkedTrip: false,
      showListRouteMap: false,
    });
  };

  colourDivs = (allDrivers, dlist, allTrailers, tlist) => {
    
    this.setState({
      allAllowedDrivers: allDrivers,
      allAllowedTrailers: allTrailers,
      allowedDrivers: dlist,
      vehicleDropped: true,
      allowedTrailers: tlist,
    });

     
  };
  colourDocDivs = (drpTrailer) => {
    if (drpTrailer !== null || drpTrailer !== "") {
      this.setState({
        trailerDropped: true,
        droppedTrailers: drpTrailer,
      });
    }
  };

  sortPickup = (type, index) => {
    var cusDropsPanel = this.state.dropsPanel;
    var cusPick = this.state.dropsPanel.pickUps;
    var picOrder = this.state.pickOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("docnum" === type) {
        cusPick.sort((a, b) => (a.docnum < b.docnum ? 1 : -1));
      }
      if ("site" === type) {
        cusPick.sort((a, b) => (a.site < b.site ? 1 : -1));
      }
      if ("bpcode" === type) {
        cusPick.sort((a, b) => (a.bpcode < b.bpcode ? 1 : -1));
      }
      if ("bpname" === type) {
        cusPick.sort((a, b) => (a.bpname < b.bpname ? 1 : -1));
      }
      if ("doctype" === type) {
        cusPick.sort((a, b) => (a.doctype < b.doctype ? 1 : -1));
      }
      if ("docdate" === type) {
        cusPick.sort((a, b) => (a.docdate < b.docdate ? 1 : -1));
      }
      if ("poscode" === type) {
        cusPick.sort((a, b) => (a.poscode < b.poscode ? 1 : -1));
      }
      if ("netweight" === type) {
        cusPick.sort((a, b) => (a.netweight < b.netweight ? 1 : -1));
      }
      if ("volume" === type) {
        cusPick.sort((a, b) => (a.volume < b.volume ? 1 : -1));
      }
      if ("vehicleCode" === type) {
        cusPick.sort((a, b) => (a.vehicleCode < b.vehicleCode ? 1 : -1));
      }
      if ("type" === type) {
        cusPick.sort((a, b) => (a.type < b.type ? 1 : -1));
      }
      if ("site" === type) {
        cusPick.sort((a, b) => (a.site < b.site ? 1 : -1));
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("docnum" === type) {
        cusPick.sort((a, b) => (a.docnum > b.docnum ? 1 : -1));
      }
      if ("bpcode" === type) {
        cusPick.sort((a, b) => (a.bpcode > b.bpcode ? 1 : -1));
      }
      if ("bpname" === type) {
        cusPick.sort((a, b) => (a.bpname > b.bpname ? 1 : -1));
      }
      if ("doctype" === type) {
        cusPick.sort((a, b) => (a.doctype > b.doctype ? 1 : -1));
      }
      if ("docdate" === type) {
        cusPick.sort((a, b) => (a.docdate > b.docdate ? 1 : -1));
      }
      if ("poscode" === type) {
        cusPick.sort((a, b) => (a.poscode > b.poscode ? 1 : -1));
      }
      if ("netweight" === type) {
        cusPick.sort((a, b) => (a.netweight > b.netweight ? 1 : -1));
      }
      if ("volume" === type) {
        cusPick.sort((a, b) => (a.volume > b.volume ? 1 : -1));
      }
      if ("vehicleCode" === type) {
        cusPick.sort((a, b) => (a.vehicleCode > b.vehicleCode ? 1 : -1));
      }
      if ("type" === type) {
        cusPick.sort((a, b) => (a.type > b.type ? 1 : -1));
      }
      if ("site" === type) {
        cusPick.sort((a, b) => (a.site > b.site ? 1 : -1));
      }
    }
    cusDropsPanel.pickUps = cusPick;
    this.setState({
      dropsPanel: cusDropsPanel,
      pickOrder: picOrder,
      mapChanged: false,
    });
  };

  // sortDrop = (type, index) => {

    
  //   var cusDropsPanel = this.state.docsPanel;
  //   var cusPick = this.state.docsPanel;

  //   

  //   
  //   var picOrder = this.state.dropOrder;

  //   
  //   
  //   
  //   if (picOrder[index] == -1 || picOrder[index] == 1) {

  //     picOrder[index] = 0;
  //     if ("docnum" === type) {
  //       cusPick.sort((a, b) => (a.docnum < b.docnum) ? 1 : -1)
  //     }
  //     if("weight"==type){
  //       cusPick.sort((a, b) => Number(a.netweight) < Number(b.netweight) ? 1 : -1);

  //     }

  //     if ("bpcode" === type) {
  //       cusPick.sort((a, b) => (a.bpcode < b.bpcode) ? 1 : -1)
  //     }
  //     if ("carrier" === type) {
  //       cusPick.sort((a, b) => (a.carrier < b.carrier) ? 1 : -1)
  //     }
  //     if ("bpname" === type) {
  //       cusPick.sort((a, b) => (a.bpname < b.bpname) ? 1 : -1)
  //     }
  //     if ("doctype" === type) {
  //       cusPick.sort((a, b) => (a.doctype < b.doctype) ? 1 : -1)
  //     }
  //     if ("poscode" === type) {
  //       cusPick.sort((a, b) => (a.poscode < b.poscode) ? 1 : -1)
  //     }
  //     if ("netweight" === type) {
  //       
  //       cusPick.sort((a, b) => (a.netweight < b.netweight) ? 1 : -1)
  //     }
  //     if ("volume" === type) {
  //       cusPick.sort((a, b) => (a.volume < b.volume) ? 1 : -1)
  //     }
  //     if ("vehicleCode" === type) {
  //       cusPick.sort((a, b) => (a.vehicleCode < b.vehicleCode) ? 1 : -1)
  //     }
  //     if ("type" === type) {
  //       cusPick.sort((a, b) => (a.type < b.type) ? 1 : -1)
  //     }
  //     if ("docdate" === type) {
  //       cusPick.sort((a, b) => (a.docdate < b.docdate) ? 1 : -1)
  //     }
  //     if ("site" === type) {
  //       cusPick.sort((a, b) => (a.site < b.site) ? 1 : -1)
  //     }
  //     if ("priority" === type) {
  //       cusPick.sort((a, b) => (a.priority < b.priority) ? 1 : -1)
  //     }
  //   } else if (picOrder[index] == 0) {

  //     picOrder[index] = 1;
  //     if ("docnum" === type) {
  //       cusPick.sort((a, b) => (a.docnum > b.docnum) ? 1 : -1)
  //     }
  //     if ("weight" == type) {
  //       
  //       cusPick.sort((a, b) => Number(a.netweight) > Number(b.netweight) ? 1 : -1);

  //     }
  //     if ("bpcode" === type) {
  //       cusPick.sort((a, b) => (a.bpcode > b.bpcode) ? 1 : -1)
  //     }

  //     if ("carrier" === type) {
  //       cusPick.sort((a, b) => (a.carrier > b.carrier) ? 1 : -1)
  //     }
  //     if ("bpname" === type) {
  //       cusPick.sort((a, b) => (a.bpname > b.bpname) ? 1 : -1)
  //     }
  //     if ("doctype" === type) {
  //       cusPick.sort((a, b) => (a.doctype > b.doctype) ? 1 : -1)
  //     }
  //     if ("poscode" === type) {
  //       cusPick.sort((a, b) => (a.poscode > b.poscode) ? 1 : -1)
  //     }
  //     if ("docdate" === type) {
  //       cusPick.sort((a, b) => (a.docdate > b.docdate) ? 1 : -1)
  //     }
  //     if ("netweight" === type) {
  //       cusPick.sort((a, b) => (a.netweight > b.netweight) ? 1 : -1)
  //     }
  //     if ("volume" === type) {
  //       cusPick.sort((a, b) => (a.volume > b.volume) ? 1 : -1)
  //     }
  //     if ("vehicleCode" === type) {
  //       cusPick.sort((a, b) => (a.vehicleCode > b.vehicleCode) ? 1 : -1)
  //     }
  //     if ("type" === type) {
  //       cusPick.sort((a, b) => (a.type > b.type) ? 1 : -1)
  //     }
  //     if ("site" === type) {
  //       cusPick.sort((a, b) => (a.site > b.site) ? 1 : -1)
  //     }
  //     if ("priority" === type) {
  //       cusPick.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
  //     }
  //   }
  //   cusDropsPanel = cusPick;
  //   this.setState({
  //     docsPanel: cusDropsPanel,
  //     dropOrder: picOrder,
  //     mapChanged: false
  //   });
  // }

  sortDrop = (type, index) => {
    let cusDropsPanel = this.state.docsPanel;
    let cusPick = [...this.state.docsPanel]; // Create a copy to avoid mutating state directly

    let picOrder = this.state.dropOrder;

    const sortByQuantity = (a, b) => {
      const totalQuantityA =
        a.products && a.products.length > 0
          ? a.products.reduce(
              (sum, product) => sum + parseFloat(product.quantity || 0),
              0
            )
          : 0;

      const totalQuantityB =
        b.products && b.products.length > 0
          ? b.products.reduce(
              (sum, product) => sum + parseFloat(product.quantity || 0),
              0
            )
          : 0;

      return totalQuantityA - totalQuantityB; // Ascending order
    };

    if (picOrder[index] === -1 || picOrder[index] === 1) {
      picOrder[index] = 0;

      if (type == "quantity") {
        cusPick.sort(sortByQuantity);
      }
      // Add existing sorting logic for other types
      if (type === "docnum") {
        cusPick.sort((a, b) => (a.docnum < b.docnum ? 1 : -1));
      }
      if (type === "weight") {
        cusPick.sort((a, b) =>
          Number(a.netweight) < Number(b.netweight) ? 1 : -1
        );
      }
      if (type === "bpcode") {
        cusPick.sort((a, b) => (a.bpcode < b.bpcode ? 1 : -1));
      }
      if (type === "carrier") {
        cusPick.sort((a, b) => (a.carrier < b.carrier ? 1 : -1));
      }
      if (type === "bpname") {
        cusPick.sort((a, b) => (a.bpname < b.bpname ? 1 : -1));
      }
      if (type === "doctype") {
        cusPick.sort((a, b) => (a.doctype < b.doctype ? 1 : -1));
      }
      if (type === "poscode") {
        cusPick.sort((a, b) => (a.poscode < b.poscode ? 1 : -1));
      }
      if (type === "netweight") {
        cusPick.sort((a, b) => (a.netweight < b.netweight ? 1 : -1));
      }
      if (type === "volume") {
        cusPick.sort((a, b) => (a.volume < b.volume ? 1 : -1));
      }
      if (type === "vehicleCode") {
        cusPick.sort((a, b) => (a.vehicleCode < b.vehicleCode ? 1 : -1));
      }
      if (type === "type") {
        cusPick.sort((a, b) => (a.type < b.type ? 1 : -1));
      }
      if (type === "docdate") {
        cusPick.sort((a, b) => (a.docdate < b.docdate ? 1 : -1));
      }
      if (type === "site") {
        cusPick.sort((a, b) => (a.site < b.site ? 1 : -1));
      }
      if (type === "Priority") {
        cusPick.sort((a, b) => (a.priority < b.priority ? 1 : -1));
      }

      if (type === "routecode") {
        cusPick.sort((a, b) => (a.routeCodeDesc < b.routeCodeDesc ? 1 : -1));
      }
    } else if (picOrder[index] === 0) {
      picOrder[index] = 1;

      if (type == "quantity") {
        cusPick.sort((a, b) => sortByQuantity(b, a)); // Descending order
      }

      // Add existing sorting logic for other types
      if (type === "docnum") {
        cusPick.sort((a, b) => (a.docnum > b.docnum ? 1 : -1));
      }
      if (type === "weight") {
        cusPick.sort((a, b) =>
          Number(a.netweight) > Number(b.netweight) ? 1 : -1
        );
      }
      if (type === "bpcode") {
        cusPick.sort((a, b) => (a.bpcode > b.bpcode ? 1 : -1));
      }
      if (type === "carrier") {
        cusPick.sort((a, b) => (a.carrier > b.carrier ? 1 : -1));
      }
      if (type === "bpname") {
        cusPick.sort((a, b) => (a.bpname > b.bpname ? 1 : -1));
      }
      if (type === "doctype") {
        cusPick.sort((a, b) => (a.doctype > b.doctype ? 1 : -1));
      }
      if (type === "poscode") {
        cusPick.sort((a, b) => (a.poscode > b.poscode ? 1 : -1));
      }
      if (type === "netweight") {
        cusPick.sort((a, b) => (a.netweight > b.netweight ? 1 : -1));
      }
      if (type === "volume") {
        cusPick.sort((a, b) => (a.volume > b.volume ? 1 : -1));
      }
      if (type === "vehicleCode") {
        cusPick.sort((a, b) => (a.vehicleCode > b.vehicleCode ? 1 : -1));
      }
      if (type === "type") {
        cusPick.sort((a, b) => (a.type > b.type ? 1 : -1));
      }
      if (type === "docdate") {
        cusPick.sort((a, b) => (a.docdate > b.docdate ? 1 : -1));
      }
      if (type === "site") {
        cusPick.sort((a, b) => (a.site > b.site ? 1 : -1));
      }
      if (type === "Priority") {
        cusPick.sort((a, b) => (a.priority > b.priority ? 1 : -1));
      }
      if (type === "routecode") {
        cusPick.sort((a, b) => (a.routeCodeDesc > b.routeCodeDesc ? 1 : -1));
      }
    }

    // Update the state with the newly sorted array
    this.setState({
      docsPanel: cusPick,
      dropOrder: picOrder,
      mapChanged: false,
    });
  };

  sortEquipement = (type, index) => {
    var cusDropsPanel = this.state.vehiclePanel;
    var cusPick = this.state.vehiclePanel.equipments;
    var picOrder = this.state.equpOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("xequipid" === type) {
        cusPick.sort((a, b) => (a.xequipid < b.xequipid ? 1 : -1));
      }
      if ("xdescript" === type) {
        cusPick.sort((a, b) => (a.xdescript < b.xdescript ? 1 : -1));
      }
      if ("xequiptyp" === type) {
        cusPick.sort((a, b) => (a.xequiptyp < b.xequiptyp ? 1 : -1));
      }
      if ("xcodeyve" === type) {
        cusPick.sort((a, b) => (a.xcodeyve < b.xcodeyve ? 1 : -1));
      }
      if ("xfcy" === type) {
        cusPick.sort((a, b) => (a.xfcy < b.xfcy ? 1 : -1));
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("xequipid" === type) {
        cusPick.sort((a, b) => (a.xequipid > b.xequipid ? 1 : -1));
      }
      if ("xdescript" === type) {
        cusPick.sort((a, b) => (a.xdescript > b.xdescript ? 1 : -1));
      }
      if ("xequiptyp" === type) {
        cusPick.sort((a, b) => (a.xequiptyp > b.xequiptyp ? 1 : -1));
      }
      if ("xcodeyve" === type) {
        cusPick.sort((a, b) => (a.xcodeyve > b.xcodeyve ? 1 : -1));
      }
      if ("xfcy" === type) {
        cusPick.sort((a, b) => (a.xfcy > b.xfcy ? 1 : -1));
      }
    }
    cusDropsPanel.equipments = cusPick;
    this.setState({
      vehiclePanel: cusDropsPanel,
      equpOrder: picOrder,
      mapChanged: false,
    });
  };

  sortDriver = (type, index) => {
    var cusDropsPanel = this.state.vehiclePanel;
    var cusPick = this.state.vehiclePanel.drivers;
    var picOrder = this.state.diverOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("driverid" === type) {
        cusPick.sort((a, b) => (a.driverid < b.driverid ? 1 : -1));
      }
      if ("driver" === type) {
        cusPick.sort((a, b) => (a.driver < b.driver ? 1 : -1));
      }
      if ("licenum" === type) {
        cusPick.sort((a, b) => (a.licenum < b.licenum ? 1 : -1));
      }
      if ("licedat" === type) {
        cusPick.sort((a, b) => (a.licedat < b.licedat ? 1 : -1));
      }
      if ("cty" === type) {
        cusPick.sort((a, b) => (a.cty < b.cty ? 1 : -1));
      }
      if ("poscod" === type) {
        cusPick.sort((a, b) => (a.poscod < b.poscod ? 1 : -1));
      }
      if ("cry" === type) {
        cusPick.sort((a, b) => (a.cry < b.cry ? 1 : -1));
      }
      if ("fcy" === type) {
        cusPick.sort((a, b) => (a.fcy < b.fcy ? 1 : -1));
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("driverid" === type) {
        cusPick.sort((a, b) => (a.driverid > b.driverid ? 1 : -1));
      }
      if ("driver" === type) {
        cusPick.sort((a, b) => (a.driver > b.driver ? 1 : -1));
      }
      if ("licenum" === type) {
        cusPick.sort((a, b) => (a.licenum > b.licenum ? 1 : -1));
      }
      if ("licedat" === type) {
        cusPick.sort((a, b) => (a.licedat > b.licedat ? 1 : -1));
      }
      if ("cty" === type) {
        cusPick.sort((a, b) => (a.cty > b.cty ? 1 : -1));
      }
      if ("poscod" === type) {
        cusPick.sort((a, b) => (a.poscod > b.poscod ? 1 : -1));
      }
      if ("cry" === type) {
        cusPick.sort((a, b) => (a.cry > b.cry ? 1 : -1));
      }
      if ("fcy" === type) {
        cusPick.sort((a, b) => (a.fcy > b.fcy ? 1 : -1));
      }
    }
    cusDropsPanel.drivers = cusPick;
    this.setState({
      vehiclePanel: cusDropsPanel,
      diverOrder: picOrder,
      mapChanged: false,
    });
  };

  sortVehicles = (type, index) => {
    var cusDropsPanel = this.state.vehiclePanel;
    var cusPick = this.state.vehiclePanel.vehicles;
    var picOrder = this.state.vehOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("codeyve" === type) {
        cusPick.sort((a, b) => (a.codeyve < b.codeyve ? 1 : -1));
      }
      if ("name" === type) {
        cusPick.sort((a, b) => (a.name < b.name ? 1 : -1));
      }
      if ("startdepotn" === type) {
        cusPick.sort((a, b) => (a.startdepotn < b.startdepotn ? 1 : -1));
      }
      if ("enddepotname" === type) {
        cusPick.sort((a, b) => (a.enddepotname < b.enddepotname ? 1 : -1));
      }
      if ("drivername" === type) {
        cusPick.sort((a, b) => (a.drivername < b.drivername ? 1 : -1));
      }
      if ("lateral" === type) {
        cusPick.sort((a, b) => (a.lateral < b.lateral ? 1 : -1));
      }
      if ("trailer" === type) {
        cusPick.sort((a, b) => (a.trailer < b.trailer ? 1 : -1));
      }
      if ("catego" === type) {
        cusPick.sort((a, b) => (a.catego < b.catego ? 1 : -1));
      }
      if ("capacities" === type) {
        cusPick.sort((a, b) => (a.capacities < b.capacities ? 1 : -1));
      }
      if ("vol" === type) {
        cusPick.sort((a, b) => (a.vol < b.vol ? 1 : -1));
      }
      if ("maxordercnt" === type) {
        cusPick.sort((a, b) => (a.maxordercnt < b.maxordercnt ? 1 : -1));
      }
      if ("starttime" === type) {
        cusPick.sort((a, b) => (a.starttime < b.starttime ? 1 : -1));
      }
      if ("lateststarttime" === type) {
        cusPick.sort((a, b) =>
          a.lateststarttime < b.lateststarttime ? 1 : -1
        );
      }
      if ("maxtotaldist" === type) {
        cusPick.sort((a, b) => (a.maxtotaldist < b.maxtotaldist ? 1 : -1));
      }
      if ("maxtotaltime" === type) {
        cusPick.sort((a, b) => (a.maxtotaltime < b.maxtotaltime ? 1 : -1));
      }
      if ("maxtotaltrvtime" === type) {
        cusPick.sort((a, b) =>
          a.maxtotaltrvtime < b.maxtotaltrvtime ? 1 : -1
        );
      }
      if ("bptnum" === type) {
        cusPick.sort((a, b) => (a.bptnum < b.bptnum ? 1 : -1));
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("codeyve" === type) {
        cusPick.sort((a, b) => (a.codeyve > b.codeyve ? 1 : -1));
      }
      if ("name" === type) {
        cusPick.sort((a, b) => (a.name > b.name ? 1 : -1));
      }
      if ("startdepotn" === type) {
        cusPick.sort((a, b) => (a.startdepotn > b.startdepotn ? 1 : -1));
      }
      if ("enddepotname" === type) {
        cusPick.sort((a, b) => (a.enddepotname > b.enddepotname ? 1 : -1));
      }
      if ("drivername" === type) {
        cusPick.sort((a, b) => (a.drivername > b.drivername ? 1 : -1));
      }
      if ("lateral" === type) {
        cusPick.sort((a, b) => (a.lateral > b.lateral ? 1 : -1));
      }
      if ("trailer" === type) {
        cusPick.sort((a, b) => (a.trailer > b.trailer ? 1 : -1));
      }
      if ("catego" === type) {
        cusPick.sort((a, b) => (a.catego > b.catego ? 1 : -1));
      }
      if ("starttime" === type) {
        cusPick.sort((a, b) => (a.starttime > b.starttime ? 1 : -1));
      }
      if ("lateststarttime" === type) {
        cusPick.sort((a, b) =>
          a.lateststarttime > b.lateststarttime ? 1 : -1
        );
      }
      if ("capacities" === type) {
        cusPick.sort((a, b) => (a.capacities > b.capacities ? 1 : -1));
      }
      if ("vol" === type) {
        cusPick.sort((a, b) => (a.vol > b.vol ? 1 : -1));
      }
      if ("maxordercnt" === type) {
        cusPick.sort((a, b) => (a.maxordercnt > b.maxordercnt ? 1 : -1));
      }
      if ("maxtotaldist" === type) {
        cusPick.sort((a, b) => (a.maxtotaldist > b.maxtotaldist ? 1 : -1));
      }
      if ("maxtotaltime" === type) {
        cusPick.sort((a, b) => (a.maxtotaltime > b.maxtotaltime ? 1 : -1));
      }
      if ("maxtotaltrvtime" === type) {
        cusPick.sort((a, b) =>
          a.maxtotaltrvtime > b.maxtotaltrvtime ? 1 : -1
        );
      }
      if ("bptnum" === type) {
        cusPick.sort((a, b) => (a.bptnum > b.bptnum ? 1 : -1));
      }
    }
    cusDropsPanel.vehicles = cusPick;
    this.setState({
      vehiclePanel: cusDropsPanel,
      vehOrder: picOrder,
      mapChanged: false,
    });
  };

  sortTrailer = (type, index) => {
    var cusDropsPanel = this.state.vehiclePanel;
    var cusPick = this.state.vehiclePanel.trails;
    var picOrder = this.state.trailOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("trailer" === type) {
        cusPick.sort((a, b) => (a.trailer < b.trailer ? 1 : -1));
      }
      if ("des" === type) {
        cusPick.sort((a, b) => (a.des < b.des ? 1 : -1));
      }
      if ("fcy" === type) {
        cusPick.sort((a, b) => (a.fcy < b.fcy ? 1 : -1));
      }
      if ("typ" === type) {
        cusPick.sort((a, b) => (a.typ < b.typ ? 1 : -1));
      }
      if ("model" === type) {
        cusPick.sort((a, b) => (a.model < b.model ? 1 : -1));
      }
      if ("maxloams" === type) {
        cusPick.sort((a, b) => (a.maxloams < b.maxloams ? 1 : -1));
      }
      if ("maxlovol" === type) {
        cusPick.sort((a, b) => (a.maxlovol < b.maxlovol ? 1 : -1));
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("trailer" === type) {
        cusPick.sort((a, b) => (a.trailer > b.trailer ? 1 : -1));
      }
      if ("des" === type) {
        cusPick.sort((a, b) => (a.des > b.des ? 1 : -1));
      }
      if ("fcy" === type) {
        cusPick.sort((a, b) => (a.fcy > b.fcy ? 1 : -1));
      }
      if ("typ" === type) {
        cusPick.sort((a, b) => (a.typ > b.typ ? 1 : -1));
      }
      if ("model" === type) {
        cusPick.sort((a, b) => (a.model > b.model ? 1 : -1));
      }
      if ("maxloams" === type) {
        cusPick.sort((a, b) => (a.maxloams > b.maxloams ? 1 : -1));
      }
      if ("maxlovol" === type) {
        cusPick.sort((a, b) => (a.maxlovol > b.maxlovol ? 1 : -1));
      }
    }
    cusDropsPanel.trails = cusPick;
    this.setState({
      vehiclePanel: cusDropsPanel,
      trailOrder: picOrder,
      mapChanged: false,
    });
  };

  disableDivs = (index, type, docNum) => {
    // 
    // 
    // 
    var currVehPanel = this.state.vehiclePanel;
    var currDocssPanel = this.state.docsPanel;
    // 
    if (type === "vehicle") {
      var currVeh = currVehPanel.vehicles;
      currVeh[index].isDropped = true;
      currVeh[index].type = "selected";
      currVehPanel.vehicles = currVeh;
    }
    if (type === "trailer") {
      var currVeh = currVehPanel.trails;
      currVeh[index].isDropped = true;
      currVeh[index].type = "selected";
      currVehPanel.trails = currVeh;
    }
    if (type === "driver") {
      var currVeh = currVehPanel.drivers;
      currVeh[index].isDropped = true;
      currVeh[index].type = "selected";
      currVehPanel.drivers = currVeh;
    }
    if (type === "equipment") {
      var currVeh = currVehPanel.equipments;
      currVeh[index].isDropped = true;
      currVeh[index].type = "selected";
      currVehPanel.equipments = currVeh;
    }
    if (type === "doc") {
      var currVeh = currDocssPanel;
      // 
      if (currDocssPanel && currDocssPanel.length > 0) {
        currDocssPanel.map((pickups, i) => {
          if (pickups.docnum === docNum) {
            currVeh[i].type = "selected";
          }
        });
      }
      currDocssPanel = currVeh;
      // 
    }
    this.setState({
      vehiclePanel: currVehPanel,
      docsPanel: currDocssPanel,
    });
  };

  UnlockConfirmTrip = (ClickedTrip) => {
    this.confirmTrip(ClickedTrip, "unlock");
  };

  OptimiseConfirmTrip = (ClickedTrip) => {
    // 
    this.setState({ optimisedClickedTrip: true, guageTrip: ClickedTrip });
  };

  submitTrips = (trips) => {
    // 
    this.setState({ loader: true });
    fetch(`${apiUrl}/api/v1/transport/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trips),
    })
      .then((response) => {
        // 
        this.handleErrors(response);
      })
      .then(function (response) {})
      .then(() => {
        // 
        // this.onRouteoptihide();
        // this.UPDATE_DELETED_DOC_DETAILS();
        this.fetchDocumentPanelDateChange(this.state.documentPanel_date);

        // this.refreshDocspanel()
      })
      .then(() => {
        this.setState({
          loader: false,
          checkedTrip: false,
          isDetail: false,
          showListRouteMap: false,
          vehicleShow: "block",
          schedulerShow: "block",
          RouteoptiShow: "none",
          vrShow: "none",
          toPickdetailsShow: "none",
          toAllocationdetailsShow: "none",
          vehicleChecked: "none",
          tripsChecked: [],
        });

        this.notifySucess("Trip Added/Updated Sucessfully");
      })
      .catch((error) => {
        this.handleDateRangeChange();
        this.setState({ loading: false });
        this.notifyError(
          "Please add proper trip to add or update, with vehicle, drops and pickups"
        );
      });
    // this.handleDateRangeChange();
  };

  handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  };

  confirmTrip = (trip, route, routesSchedule, newGeoData) => {
    

    if (
      (trip.timelineInterval != undefined &&
        trip.timelineInterval.length > 0) ||
      route === "unlock" ||
      route === "loaderMsg" ||
      route === "ForceSeq" ||
      route === "Open"
    ) {
      // trip.site = this.state.selectedSite.id;

      this.setState({ selectedSite: trip.site });
      this.setState({ selectedSiteValue: trip.site });
      let tripdate = moment.tz(trip.docdate, "").format("YYYY-MM-DD");
      this.setState({ date: moment.tz(trip.docdate, "").format("YYYY-MM-DD") });
      var today = new Date();
      var execdate = today.getDate();
      var hr = today.getHours();
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
        // 
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
        trip.generatedBy = "MScheduler";
        trip.route = true;
        trip.fixedCost = routesSchedule.cost.fixedCost;
        trip.totalCost = routesSchedule.cost.totalCost;
        trip.distanceCost = routesSchedule.cost.distanceCost;
        trip.regularCost = routesSchedule.cost.Regularcost;
        trip.overtimeCost = routesSchedule.cost.overtimecost;
        trip.timeCost = routesSchedule.cost.timeCost;
        trip.optistatus = "Optimized";
        trip.uomTime = "Hr";
        trip.uomDistance = "Kms";
        trip.route = true;
      } else if (route === "unlock") {
        trip.lock = false;
        trip.lockP = true;
        trip.date = tripdate;
        trip.route = true;
      } else if (route === "loaderMsg" || route === "ForceSeq") {
        // trip.loaderInfo =
        trip.date = tripdate;
        trip.route = false;
      } else {
        trip.date = tripdate;
        trip.endDate = "";
        trip.optistatus = "Open";
        trip.route = false;

        trip.travelTime = "0";
        trip.serviceTime = "0";
        trip.totalTime = "0";
        trip.totalDistance = "0";
      }
      var totalWeight = 0;
      var totalVolume = 0;
      var weight = "";
      var volume = "";

      for (var i = 0; i < trip.pickupObject.length; i++) {
        totalWeight = totalWeight + parseFloat(trip.pickupObject[i].netweight);
        totalVolume = totalVolume + parseFloat(trip.pickupObject[i].volume);
        if (weight == "") {
          weight = trip.pickupObject[i].weightunit;
        }
        if (volume == "") {
          volume = trip.pickupObject[i].volume_unit;
        }
      }

      for (var i = 0; i < trip.dropObject.length; i++) {
        totalWeight = totalWeight + parseFloat(trip.dropObject[i].netweight);
        totalVolume = totalVolume + parseFloat(trip.dropObject[i].volume);
        if (weight == "") {
          weight = trip.dropObject[i].weightunit;
        }
        if (volume == "") {
          volume = trip.dropObject[i].volume_unit;
        }
      }

      var percentageMass = 0;
      var percentageVolume = 0;
      var flds_doc_volume = 0;
      var flds_per_volume = 0;

      if (totalWeight > 0) {
        percentageMass = (
          (parseFloat(totalWeight) / parseFloat(trip.capacities)) *
          100
        ).toFixed(2);
      }

      // if (totalVolume > 0) {
      //   percentageVolume = ((parseFloat(totalVolume) / parseFloat(trip.vehicleObject.vol)) * 100).toFixed(2);
      // }

      if (totalVolume > 0) {
        // Convert totalVolume and volume to floating-point numbers

        let volumeVal = parseFloat(totalVolume);
        let vol = parseFloat(trip.vehicleObject.vol);

        // Calculate the percentage volume and format it to one decimal place
        percentageVolume = ((volumeVal / vol) * 100).toFixed(2);

        // Store values as floating-point numbers
        flds_doc_volume = volumeVal;
        flds_per_volume = percentageVolume;
      }

      totalVolume =
        totalVolume % 1 === 0
          ? totalVolume.toString() // If the number is an integer, show it without decimals
          : totalVolume.toFixed(1); // Otherwise, show it rounded to three decimal places

      totalWeight =
        totalWeight % 1 === 0 ? totalWeight.toString() : totalWeight.toFixed(1);

      trip.weightPercentage = percentageMass;
      trip.volumePercentage = flds_per_volume;
      trip.totalWeight = totalWeight + " " + trip.vehicleObject.xweu;
      trip.totalVolume = totalVolume + " " + trip.vehicleObject.xvol;

      var itemTrips = [];
      this.refreshTrips();
      var itemTrip = {};

      if (
        route === "unlock" ||
        route === "loaderMsg" ||
        route === "ForceSeq" ||
        route === undefined
      ) {
        itemTrips.push(trip);
      } else {
        // 
        if (route === "route") {
          if (routesSchedule) {
            // 
            while (
              this.state.tripsPanel[this.state.selectedIndex].timelineInterval
                .length > 0
            ) {
              this.state.tripsPanel[
                this.state.selectedIndex
              ].timelineInterval.pop();
            }
            this.state.tripsPanel[
              this.state.selectedIndex
            ].timelineInterval.push({
              value: 0,
              label: routesSchedule.startTime,
            });
            routesSchedule.routesData.map((data, index) => {
              let values;
              values = (index + 1) * 12;
              this.state.tripsPanel[
                this.state.selectedIndex
              ].timelineInterval.push({ value: values, label: data.end });
            });
          }
          itemTrip.timelineInterval =
            this.state.tripsPanel[this.state.selectedIndex].timelineInterval;
          itemTrip.selectedTripData = newGeoData;
        } else {
          itemTrip.selectedTripData = this.state.slectedTrips;
          itemTrip.timelineInterval = trip.timelineInterval;
        }
        itemTrip.equipments = this.state.equipments;
        itemTrip.trailers = this.state.trailers;
        itemTrip.quantities = this.state.quantities;
        if (
          this.state.tripsPanel &&
          this.state.tripsPanel[this.state.selectedIndex] &&
          this.state.tripsPanel[this.state.selectedIndex].totalObject &&
          this.state.tripsPanel[this.state.selectedIndex].totalObject.logData
        ) {
          itemTrip.logData =
            this.state.tripsPanel[this.state.selectedIndex].totalObject.logData;
        } else {
          itemTrip.logData = [];
        }

        trip.totalObject = itemTrip;
        if (this.state.reorder) {
          trip.reorder = this.state.reorder;
        } else {
          trip.reorder = false;
        }

        this.setState({ reorder: false });
        itemTrips.push(trip);
        if (
          this.state.docType &&
          this.state.docType.length > 0 &&
          this.state.deletedVehicleCode &&
          this.state.deletedVehicleCode.length > 0
        ) {
          let tripPanel = this.state.tripsPanel;
          tripPanel.map((trip) => {
            if (trip.code === this.state.deletedVehicleCode) {
              trip.optistatus = null;
            }
          });
          this.setState({ tripsPanel: tripPanel });
          this.setState({ docType: "" });
          this.setState({ deletedVehicleCode: "" });
        }
      }
      var user = JSON.parse(localStorage.getItem("authUser"));
      let details = {
        loginUser: user.username,
        dateTime: new Date(),
        type: "",
      };

      if (
        itemTrips[0].totalObject.logData &&
        itemTrips[0].totalObject.logData.length > 0
      ) {
        if (route && route.length > 0) {
          details.type = route;
        } else {
          details.type = "modify";
        }
        itemTrips[0].totalObject.logData.push(details);
      } else {
        itemTrips[0].totalObject.logData = [];
        details.type = "create";
        itemTrips[0].totalObject.logData.push(details);
      }

      this.submitTrips(itemTrips);

      /*
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
    */
    } else {
      this.handleDateRangeChange();
      this.notifyError("Vehicle is mandatory");
    }
  };

  refreshTrips = () => {
    this.updateGeoLocations();
    this.removeTrips();
  };

  filterTrans_depSite = (site) => {
    this.setState({ deliverySite: site });
  };

  updateTrip = (trip) => {
    this.setState({
      trips: trip,
    });

    
    // this.removeMarkers();
  };

  changeDateatDocumentPanel = (dayflag) => {
    // 
    var flagconsider = dayflag;
    var currDate = moment(this.state.documentPanel_date).add(0, "days");
    var sdate = moment(currDate).add(-5, "days");
    var edate = moment(currDate).add(5, "days");
    var newDate = moment(currDate).format("YYYY-MM-DD");
    var newStartDate = moment(sdate).format("YYYY-MM-DD");
    var newEndDate = moment(edate).format("YYYY-MM-DD");
    // 
    if (flagconsider) {
      // 
      fetchDocumentPanelwithRange(
        this.state.selectedMultipleSites,
        newStartDate,
        newEndDate
      )
        .then(([res1, res2]) => {
          var dropsP = res1;
          // 
          // this.filterDropsDiv(newDate, dropsP);
          // 
          this.setState({
            docsPanel: res1,
            tripsPanel: res2,
          });
        })
        .catch((error) => {});
    } else {
      // 

      // 
      fetchDocumentPanelAPI(this.state.selectedMultipleSites, newDate)
        .then(([res1, res2]) => {
          var dropsP = res1;
          // 
          // this.filterDropsDiv(newDate, dropsP);
          // 
          this.setState({
            docsPanel: res1,
            tripsPanel: res2,
          });
        })
        .catch((error) => {});
    }
  };

  changeDate = (day, dayflag, from) => {
    var flagconsider = false;
    if (from == "checked") {
      // 
      flagconsider = dayflag;
      // 
    } else if (from == "buttons") {
      // 
      flagconsider = this.state.checked5days;
      // 
    }

    var currDate = moment.tz(this.state.dropDate, "").add(day, "days");
    var sdate = moment.tz(currDate, "").add(-5, "days");
    var edate = moment.tz(currDate, "").add(5, "days");
    var newDate = moment.tz(currDate, "").format("YYYY-MM-DD");
    var newStartDate = moment.tz(sdate, "").format("YYYY-MM-DD");
    var newEndDate = moment.tz(edate, "").format("YYYY-MM-DD");
    // 
    if (flagconsider) {
      // 
      fetchDropsPanelwithRange(
        this.state.selectedMultipleSites,
        newStartDate,
        newEndDate
      )
        .then(([res1]) => {
          var dropsP = res1;
          // 
          // this.filterDropsDiv(newDate, dropsP);
          // 
          this.setState({
            dropDate: new Date(newDate),
            dropsPanel: dropsP,
          });
        })
        .catch((error) => {});
    } else {
      // 

      // 
      fetchDropsPanel(this.state.selectedMultipleSites, newDate)
        .then(([res1]) => {
          var dropsP = res1;
          // 
          // this.filterDropsDiv(newDate, dropsP);
          // 
          this.setState({
            dropDate: new Date(newDate),
            dropsPanel: dropsP,
          });
        })
        .catch((error) => {});
    }
  };

  SelectedDocumentEvent = (data) => {
    // 
    let temparray = this.state.selectedDocumentList;
    temparray.add(data);

    this.setState({
      selectedDocumentList: temparray,
    });
  };

  OncheckedSameVehicles = (checked) => {
    this.setState({
      checkedsameVehicles: checked,
    });
  };

  filterDropsDiv = (day, dropsPanel) => {
    var currDate = moment.tz(this.state.date, "").format("YYYY-MM-DD");
    var status = false;
    if (currDate > day) {
      status = true;
    } else if (currDate < day) {
      status = true;
    } else {
      status = true;
    }

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
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  checkedToPlan = (checked) => {
    // 
    this.setState({ checkedToPlan: checked });
  };

  OnCheckedToOpen = (checked) => {
    // 
    // 
    this.setState({ checkedToOpen: checked });
  };

  OnCheckedToShowoverMap = (checked) => {
    // 

    // 
    this.setState({ checkedToShowinMap: checked });
    this.updateGeoLocations();
  };

  OncheckedTodropList = (checked) => {
    // 
    // 
    this.setState({ checkedDropsList: checked });
  };

  OncheckedToPickupList = (checked) => {
    // 
    // 
    this.setState({ checkedPickupList: checked });
  };

  OnCheckedToValidate = (checked) => {
    // 
    this.setState({ checkedToValidate: checked });
  };

  OnCheckedToLock = (checked) => {
    // 
    this.setState({ checkedToLock: checked });
  };

  OnCheckedToOptimise = (checked) => {
    // 
    this.setState({ checkedToOptimise: checked });
  };

  checked5days = (checked) => {
    // 
    this.setState({ checked5days: checked });
    this.changeDate(0, checked, "checked");
  };

  checked5daysfromDocumentPanel = (checked) => {
    // 
    this.setState({ documentPanel_5dayscheck: checked });
    this.changeDateatDocumentPanel(checked);
  };

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
    // 
    if (this.state.vehiclePanel.vehicles.length > 0) {
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
            Drop_prodCount += parseInt(
              trips[i].dropObject[j].products[k].quantity
            );
          }
        }
      }

      if (null !== trips[i].pickupObject) {
        for (var j = 0; j < trips[i].pickupObject.length; j++) {
          for (var k = 0; k < trips[i].pickupObject[j].products.length; k++) {
            Pickup_prodCount += parseInt(
              trips[i].pickupObject[j].products[k].quantity
            );
          }
        }
      }
    }

    var drops = this.state.docsPanel;
    // var pickups = this.state.dropsPanel;
    for (var j = 0; j < drops.length; j++) {
      if (drops[j].dlvystatus === "0" || drops[j].dlvystatus === "8") {
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
      topDetails: topDetails,
    });
  };

  handleMulti = (sites) => {
    this.setState({ sites });
  };

  handleDefault(date) {
    this.setState({
      default_date: date,
      date: date,
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
    this.state.sites &&
      this.state.sites.length > 0 &&
      this.state.sites.map((site) => {
        if (site.id == this.state.selectedSite) {
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
  };

  OnGroupByChange = (selected) => {
    this.setState({
      SelectedGroupBy: selected,
    });
  };

  setCurrentSite = (selectedOption) => {
    var currSelected = {};
    this.state.sites &&
      this.state.sites.map((site) => {
        if (selectedOption[0] === site.id) {
          currSelected = site;
          currSelected.city = site.value;
        }
      });
    this.setState({
      selectedSite: currSelected,
      selectedMultipleSites: selectedOption,
    });
  };

  setCurrentRoutecode = (selectedOption) => {
    var currSelected = {};
    this.state.RouteCode &&
      this.state.RouteCode.map((routecode) => {
        if (selectedOption[0] === routecode.routeNo) {
          currSelected = routecode;
          currSelected.city = routecode.routeDesc;
        }
      });
    this.setState({
      selectedRouteCode: currSelected,
      // selectedMultipleSites: selectedOption
    });
  };

  setCurrentVehiclecode = (selectedOption) => {
    var currSelected = {};
    this.state.vehiclePanel.vehicles &&
      this.state.vehiclePanel.vehicles.map((vehicle) => {
        if (selectedOption[0] === vehicle.codeyve) {
          currSelected = vehicle;
          currSelected.name = vehicle.name;
        }
      });
    this.setState({
      selectedVehicleCode: currSelected,
    });
  };

  refreshAllPanels = () => {
    // 
    const emptyTrip = [];
    this.setState({
      loading: true,
      selectedDocumentList: [],
      selectedRouteCodeArr: [],
      selectedRCode: [],
      selectedRouteCode: {
        id: "All",
      },
      trips: emptyTrip,
      firstMatchedRouteCodeDesc: {},
      tuesdayMatchecRouteCodeDesc: {},
      wednesdayMatchedRouteCodeDesc: {},
      thursdayMatchedRouteCodeDesc: {},
      fridayMatchedRouteCodeDesc: {},
      selectedDocs: [],
      checkedDoccs: [],
    
      
    });
    this.handleDateRangeChange();
  };

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
    // 
    this.setCurrentSite(val);
    this.setState({ selectedSitesArr: val });
  };

  RouteCodeArr = (val) => {
    this.setCurrentRoutecode(val);
    this.setState({ selectedRouteCodeArr: val });
  };

  VehicleCodeArr = (val) => {
    // 
    this.setCurrentVehiclecode(val);

    if (val.length > 0) {
      this.setState({
        filterVehicleflg: true,
      });
    } else {
      this.setState({
        filterVehicleflg: false,
      });
    }

    this.setState({
      selectedVehicleCodeArr: val,
    });
  };

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem("authUser"));
    const currDate = moment.tz(new Date(), "").format("YYYY-MM-DD");
    // 
    var selSites = sessionStorage.getItem("sites");
    var listSites = [];
    // 
    if (selSites != null) {
      listSites = selSites.split(",");
    }

    if (!this.state.documentPanel_date) {
      this.setState({
        documentPanel_date: currDate,
        documentPanel_dateflg:true
      });
    }

    // 
    Promise.all([
      fetch(`${apiUrl}/api/v1/transport/usrsites?user=` + user.username),
    ])
      .then(([res1]) => {
        return Promise.all([res1.json()]);
      })
      .then(([res1]) => {
        this.setState({
          sites: res1,
        });

        // this.updateGeoLocations();
        // this.addStateMarker()
        this.refreshAllPanels();

        if (listSites.length > 0) {
          this.AlreadySelectedSites(res1, selSites, listSites);
        }
      });
  }

  AlreadySelectedSites = (totsites, selSites, arrayList) => {
    // // 
    // 
    this.handleSiteChange(selSites);
    this.sitesArr(arrayList);
    /*
     let flg = false;
     let initialSite = "";
     let defSite = "";
     sites.length > 0 && sites.map((site, Index) => {
      // 
        if(Index == 0){
           initialSite = site.id;
          // 
        }
  
        // 
         if(site.defflg === "Yes") {
           // 
             defSite = site.id;
         }
     });
     if(defSite == "") {
          // 
          defSite = initialSite;
     }
  
  
      this.setState({
                    selectedSite : defSite
                 });
                 */
  };

  updateSelectedSite = (siteId) => {
    var curSites = this.state.sites;
    for (var i = 0; i < curSites.length; i++) {
      if (curSites[i].id == siteId) {
        this.setState({ selectedSite: curSites[i] });
      }
    }
  };

  clearCheckBox = () => {
    this.setState({
      selectedDocs: [],
      checkedDoccs: [],
    });
  };

  startAndEndOfWeek = (date) => {
    // 
    // 
    // 
    const now = date ? new Date(date) : new Date().setHours(0, 0, 0, 0);
    // 
    const sunday = new Date(now);
    // 
    sunday.setDate(sunday.getDate() - sunday.getDay() + 0);
    // 
    const satday = new Date(now);
    // 
    satday.setDate(satday.getDate() - satday.getDay() + 5);
    // 
    return [sunday, satday];
  };

  handleDateRangeChange = () => {
    this.setState({ loader: true });
    var satday, sunday;
    const events = this.schedulerRef;
    // 
    const clickedDate = this.schedulerRef.current.scheduleObj.selectedDate;
    let clickedDateinFormat = moment(clickedDate).format("YYYY-MM-DD");

    if (
      this.schedulerRef.current.scheduleObj.currentView === "TimelineWorkWeek"
    ) {
      // 
      [sunday, satday] = this.startAndEndOfWeek(clickedDate);
      var StartDate = moment(sunday).format("YYYY-MM-DD");
      var EndDate = moment(satday).format("YYYY-MM-DD");

      // 
      // 

      fetchSchedulerAPI(this.state.selectedMultipleSites, StartDate, EndDate)
        .then(([res1, res2, res3, res4]) => {
          this.setState({
            vehiclePanel: res1,
            docsPanel: res2,
            tripsPanel: res3,
            loader: false,
            date: clickedDate,
            // documentPanel_dateflg: false,
            // documentPanel_date: '',
            // documentPanel_5dayscheck: false,
            SelectedDeletedDocs: [],
            selectedDocumentList: [],
            RouteCode: res4,
              daysDoc:7,
          });
        })
        .then(() => {
          this.updateTopBar();
          this.refreshSite();
          this.removeDocsCheckBoxes();
        })
        .catch((error) => {});
    } else {
    
// getting documents with range and trips with selected date here
  const daysDoc = parseInt(this.state.daysDoc || 0, 10);

  const startDate = moment(clickedDate).subtract(daysDoc, 'days').format("YYYY-MM-DD");
  
  console.log(startDate ,clickedDateinFormat,"this is start date and end date here initially here checking")



    //   fetchSchedulerAPIOneDate(
    //     this.state.selectedMultipleSites,
    //     clickedDateinFormat
    //   )
    //     .then(([res1, res2, res3, res4]) => {
    //       this.setState({
    //         vehiclePanel: res1,
    //         docsPanel: res2,
    //         tripsPanel: res3,
    //         loader: false,
    //         RouteCode: res4,
    //         date: clickedDateinFormat,
    //         // documentPanel_dateflg: false,
    //         // documentPanel_date: "",
    //         // documentPanel_5dayscheck: false,
    //         SelectedDeletedDocs: [],
    //         selectedDocumentList: [],
    //         filteredTripData: "",
    //           daysDoc:7,
    //       });
    //     })

    //     .then(() => {
    //       this.updateTopBar();
    //       this.refreshSite();
    //       this.removeDocsCheckBoxes();
    //     })
    //     .catch((error) => {});
    // }



    // fetchDocumentPanelwithRangeDaysBack

        fetchDocumentPanelwithRangeDaysBack(this.state.selectedMultipleSites, startDate,clickedDateinFormat)
      .then(([res1, res2]) => {
        /*
          if(status1 === 200 && status2 === 200 && status3 === 200){
                   this.setState({loading: false})
          }
          */

        this.setState({
          date: clickedDate,
          documentPanel_dateflg: true,
          docsPanel: res1,
          tripsPanel: res2,
          loader: false,
          
        });
      })
      .then(() => {
        this.updateTopBar();
        this.refreshSite();
        this.removeDocsCheckBoxes();
      })
      .catch((error) => {
        this.setState({
          loader: false,
        });
      });
    }
  };

  updateTripsafterRouteGenerate = () => {
    this.setState({ loader: true });
    var satday, sunday;
    const events = this.schedulerRef;
    // 
    const clickedDate = this.schedulerRef.current.scheduleObj.selectedDate;
    if (
      this.schedulerRef.current.scheduleObj.currentView === "TimelineWorkWeek"
    ) {
      // 
      [sunday, satday] = this.startAndEndOfWeek(clickedDate);
      var StartDate = moment(sunday).format("YYYY-MM-DD");
      var EndDate = moment(satday).format("YYYY-MM-DD");

      // 
      // 

      fetchSchedulerAPI(this.state.selectedMultipleSites, StartDate, EndDate)
        .then(([res1, res2, res3, res4]) => {
          this.setState({
            vehiclePanel: res1,
            docsPanel: res2,
            tripsPanel: res3,
            loader: false,
            date: clickedDate,
            // documentPanel_dateflg: false,
            // documentPanel_date: '',
            // documentPanel_5dayscheck: false,
            SelectedDeletedDocs: [],
            selectedDocumentList: [],
            RouteCode: res4,
          });
        })
        .then(() => {
          this.updateTopBar();
          // this.refreshSite();
          this.removeDocsCheckBoxes();
        })
        .catch((error) => {});
    }
  };

  handleRouteCodeChange = (selectedRouteCodes) => {
    this.setCurrentRoutecode(selectedRouteCodes);
  };

  handleVehicleCodeChange = (selectedvehicleCodes) => {
    // 
    // 
    this.setCurrentVehiclecode(selectedvehicleCodes);
  };

  handleSiteChange = (selectedOption) => {
    this.setState({ loader: true });
    // 

    // 
    this.setCurrentSite(selectedOption);
    sessionStorage.setItem("sites", selectedOption);
    const currDate = moment.tz(this.state.date, "").format("YYYY-MM-DD");
    var FirstDate, LastDate;
    [FirstDate, LastDate] = this.startAndEndOfWeek(currDate);
    // 
    var StartDate = moment.tz(FirstDate, "").format("YYYY-MM-DD");
    var EndDate = moment.tz(LastDate, "").format("YYYY-MM-DD");

    // 

    if (
      this.schedulerRef.current.scheduleObj.currentView === "TimelineWorkWeek"
    ) {
      // fetchSchedulerAPI(selectedOption, StartDate, EndDate)
      //   .then(([res1, res2, res3, res4, res5]) => {
      //     this.setState({
      //       vehiclePanel: res1,
      //       docsPanel: res2,
      //       tripsPanel: res3,
      //       RouteCode: res4,
      //       loader: false,
      //       documentPanel_dateflg: false,
      //       documentPanel_date: "",
      //       documentPanel_5dayscheck: false,
      //       filterVehicleflg: false,
      //       pickersList: res5,
      //     });
      //   })
      //   .then(() => {
      //     this.updateTopBar();
      //     this.refreshSite();
      //   });

      fetchSchedulerAPI(selectedOption, StartDate, EndDate)
  .then(([res1, res2, res3, res4, res5]) => {

    console.log(res1,res2,res3,res4,res5 ,"all these response inside fetch one data")
    this.setState({
      vehiclePanel: res1 || [],            // fallback to empty array or object
      docsPanel: res2 || [],
      tripsPanel: res3 || [],
      RouteCode: res4 || [],
      pickersList: res5 || [],
      loader: false,
      documentPanel_dateflg: false,
      documentPanel_date: "",
      documentPanel_5dayscheck: false,
      filterVehicleflg: false,
    });
  })
  .then(() => {
    this.updateTopBar();
    this.refreshSite();
  })
  .catch(error => {
    console.error('Unexpected error in fetchSchedulerAPI:', error);
    this.setState({ loader: false }); // always stop the loader on error
  });

    } else {
      fetchSchedulerAPIOneDate(selectedOption, currDate)
        .then(([res1, res2, res3, res4, res5]) => {
          this.setState({
            vehiclePanel: res1,
            docsPanel: res2,
            loader: false,
            tripsPanel: res3,
            RouteCode: res4,
            SelectedDeletedDocs: [],
            selectedDocumentList: [],
            pickersList: res5,
          });
        })
        .catch((error) => {});
    }
  };

  /* old
  
       handleSiteChange = selectedOption => {
          // 
          // 
          this.setCurrentSite(selectedOption);
         const currDate = moment(this.state.date).format('YYYY-MM-DD');
         // 
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
  };

  updateGeoLocations = () => {
    this.removeMarkers();
    this.setState({
      mapChanged: true,
    });
  };

  removeMarkers = () => {
    this.setState(
      {
        markers: [],
        geoData: [],
      },
      this.addStateMarker
    );
  };

  addStateMarker = () => {
    if (this.state.selectedSite.lat != undefined) {
      let currMarkers;
      if (this.state.markers.length > 0) {
        currMarkers = this.state.markers;
      } else {
        currMarkers = [];

        currMarkers.push(this.state.selectedSite);

        // 
        // 

        //add pointer to the map
        let currDropsPanel = this.state.docsPanel;

        for (var j = 0; j < currDropsPanel.length; j++) {
          if (currDropsPanel[j].movtype === "DROP") {
            currDropsPanel[j].panelType = "drop";
            currMarkers.push(currDropsPanel[j]);
          } else {
            currDropsPanel[j].panelType = "pickup";
            currMarkers.push(currDropsPanel[j]);
          }
        }
      }
      this.setState({
        markers: currMarkers,
        mapChanged: true,
      });
    }
  };

  removeGeoMarkers = () => {
    var currMarkers = [];
    this.setState({
      geoMarkers: currMarkers,
    });
  };

  addGeoLocations = (geoObj) => {
    const currMarkers = this.state.markers;
    currMarkers.push(geoObj);
    // currMarkers = this.startAndEndDeport(currMarkers, this.state.trips[0])
    this.setState({
      markers: currMarkers,
      mapChanged: true,
    });
  };

  // checkStatus=(document)=>{

  //   let status ="";

  //   if (dropStatus == "open" && dlvyStatus == "1") {
  //     return (
  //       <h6>
  //         <span class="badge badge-success text-uppercase" style={{fontSize:"14px"}}>
  //           {this.props.t("Planned")}
  //         </span>
  //       </h6>
  //     );
  //   }
  //   if (dropStatus == "Allocated" && (dlvyStatus == "0" || dlvyStatus == "8")) {
  //     return (
  //       <h6>
  //         <span class="badge badge-success text-uppercase" style={{fontSize:"14px"}}>
  //           {this.props.t("Planned")}
  //         </span>
  //       </h6>
  //     );
  //   }
  //   if (dropStatus == "selected" && (dlvyStatus == "0" || dlvyStatus == "8")) {
  //     return (
  //       <h6>
  //         <span class="badge badge-success text-uppercase" style={{fontSize:"14px"}}>
  //           {this.props.t("Planned")}
  //         </span>
  //       </h6>
  //     );
  //   }
  //   if (dlvyStatus == "1") {
  //     return (
  //       <h6>
  //         <span class="badge badge-success text-uppercase" style={{fontSize:"14px"}}>
  //           {this.props.t("Planned")}
  //         </span>
  //       </h6>
  //     );
  //   }
  // }

  addGeoList = (geoData, index) => {
    const currData = this.state.geoData;

    // Check if the docnum already exists in currData
    const docnumExists = currData.some(
      (item) => item.docnum === geoData.docnum
    );

    const updatedDocsPanel = this.state.docsPanel.map((item) => {
      // Check if the docnum matches
      if (item.docnum === geoData.docnum) {
        // Return the updated object with dlvystatus set to "1"
        return {
          ...item,
          dlvystatus: "1",
        };
      }
      // Return the item unchanged if docnum does not match
      return item;
    });

    if (!docnumExists) {
      // If docnum does not exist, push geoData to the arrays
      currData.push(geoData);
      var selectedTrips = this.state.slectedTrips;
      selectedTrips.push(geoData);
      var tripColor = this.state.tripColor;

      if (geoData.panelType === "drop") {
        tripColor[index - 1] = "#7ace4c";
      } else {
        tripColor[index - 1] = "#09aaed";
      }

      // Update the state with the new data
      this.setState({
        geoData: currData,
        tripColor: tripColor,
        selectedTripData: geoData,
        slectedTrips: selectedTrips,
        left: index * 55,
        docsPanel: updatedDocsPanel,
      });
    } else {
    }
  };

  addSelectedTrips = (count) => {
    var slctTrips = this.state.slectedTrips;
    var emptyTrip = {};
    for (var i = 0; i < count; i++) {
      slctTrips.push(emptyTrip);
    }
    this.setState({
      slectedTrips: slctTrips,
      left: count,
    });
  };

  handleDateChange = (date) => {

    console.log("this is handle date change funciton 2533");
    // 
    const currDate = moment.tz(date, "").format("YYYY-MM-DD");
    // 

    let value = this.state.selectedMultipleSites;
    fetchSchedulerAPIOneDate(value, currDate)
      .then(([res1, res2, res3, status1, status2, status3]) => {
        /*
          if(status1 === 200 && status2 === 200 && status3 === 200){
                   this.setState({loading: false})
          }
          */

        this.setState({
          date: currDate,
          default_date: currDate,
          dropDate: currDate,
          deliverySite: "",
          trips: [],
          updatedArrSite: "",
          allowedDrivers: [],
          trailers: [],
          allAllowedDrivers: false,
          checked5days: false,
          vehicleDropped: false,
          trailerDropped: false,
          allowedTrailers: [],
          droppedTrailers: [],
          allAllowedTrailers: false,
          dropDate: currDate,
          vehiclePanel: res1,
          dropsPanel: res2,
          tripsPanel: res3,
        });
      })
      .then(() => {
        this.updateTopBar();
        this.refreshSite();
      })
      .catch((error) => {});
  };

  onVRhide = () => {
    this.setState({
      vehicleShow: "block",
      schedulerShow: "block",
      IsPickTicket: false,
      onlyReceiptflg: false,
      RouteoptiShow: "none",
      vrShow: "none",
      toPickdetailsShow: "none",
      toAllocationdetailsShow: "none",
      vehicleChecked: "none",
    });
  };

  onVRClick = (i, tmsValidated) => {
    this.setState({ loader: true });
    // 
    // 
    var tripsPanels = this.state.tripsPanel;
    var selectedTrip = [];
    var selectedTrips = [];
    var trailers = [];
    var selVR_num = tripsPanels[i].itemCode;
    var ClickedVR = tripsPanels[i];

    var sel_Driver_name = tripsPanels[i].driverName;
    //caling API

    let Ispktkct = false,
      IsOnlyReceipt = false;

    {
      tripsPanels[i].dropObject.length > 0 &&
        console.log("Hide and seek - LVS Workflow 1", tripsPanels[i]);

      for (let ij = 0; ij < tripsPanels[i].dropObject.length; ij++) {
        let dropobj = tripsPanels[i].dropObject[ij];

        if (!Ispktkct) {
          if (dropobj.doctype === "PICK") {
            Ispktkct = true;
          }
        }
      }
    }

    if (
      tripsPanels[i].pickupObject.length > 0 &&
      tripsPanels[i].dropObject.length === 0
    ) {
      IsOnlyReceipt = true;
    }

    fetchVR(selVR_num)
      .then(([res1, res2, res3]) => {
        this.setState({
          vrlist: res1,
          vrdetaillist: res2,
          loadvehstock: res3,
          loader: false,
        });
      })
      .then(() => {})
      .catch((error) => {
        //  history.push('/');
      });
    // 
    if (this.state.markers && this.state.markers.length == 0) {
      // 
      this.state.sites.map((site) => {
        if (this.state.selectedSite === site.id) {
          let marker = [];
          marker.push(site);
          this.setState({ markers: marker });
        }
      });
    }
    this.setState({
      clickedTrips: ClickedVR,
      selectedVrIndex: i,
      IsPickTicket: Ispktkct,
      onlyReceiptflg: IsOnlyReceipt,
      selectedVrValidated: tmsValidated,
      vehicleShow: "none",
      RouteoptiShow: "none",
      schedulerShow: "none",
      vrShow: "block",
      toPickdetailsShow: "none",
      toAllocationdetailsShow: "none",
      vehicleChecked: "none",
    });
  };

  OnChangeFromStagginLocation2 = (newValue, site, index) => {
    this.setState({
      StaggingFromLoc2: newValue,
      StaggingFromLoc2Index: index,
      StaggingToLoc2: "",
      StaggingToLoc2Index: -1,
    });
  };

  OnChangeFromStagginLocation = (newValue, site, index) => {
    this.setState({ loader: true });
    // load locations based on Type selection
    let fromloc = newValue;
    let toloc = newValue;
    if (this.state.StaggingToLoc.length > 0) {
      toloc = this.state.StaggingToLoc;
    }

    ToLocationsFetchData(site, fromloc, toloc).then((res) => {
      var statuscode = res.children[1].children;
      var statusmessage = res.children[1].children[1];

      //  if(statuscode == 2) {

      this.notifySucess("Locations updated successfully");
      //      var tripsPanels = this.state.tripsPanel;
      // var selVR_num = tripsPanels[i].itemCode;
      //  fetchVR(selVR_num)

      this.setState({
        StaggingFromLoc: newValue,
        StaggingFromLocIndex: index,
        StaggingToLoc: "",
        StaggingToLocIndex: -1,
        StaggingFromLoc2: "",
        StaggingFromLoc2Index: -1,
        StaggingToLoc2: "",
        StaggingToLoc2Index: -1,
        loader: false,
        toStaggingLocationList2: statuscode,
      });
    });
  };

  OnChangeToStagginLocation2 = (newValue, site, index) => {
    this.setState({
      StaggingToLoc2: newValue,
      StaggingToLoc2Index: index,
    });
  };

  OnChangeToStagginLocation = (newValue, site, index) => {
    let fromloc = this.state.StaggingFromLoc;
    let toloc = newValue;

    ToLocationsFetchData(site, fromloc, toloc).then((res) => {
      var statuscode = res.children[1].children;
      var statusmessage = res.children[1].children[1];

      //  if(statuscode == 2) {

      this.notifySucess("Locations updated successfully");
      //      var tripsPanels = this.state.tripsPanel;
      // var selVR_num = tripsPanels[i].itemCode;
      //  fetchVR(selVR_num)

      this.setState({
        StaggingToLoc: newValue,
        StaggingToLocIndex: index,
        loader: false,
        toStaggingLocationList2: statuscode,
        StaggingFromLoc2: "",
        StaggingFromLoc2Index: -1,
        StaggingToLoc2: "",
        StaggingToLoc2Index: -1,
      });
    });
  };

  onHideToPickLVSShow = () => {
    this.setState({
      vehicleShow: "none",
      schedulerShow: "none",
      RouteoptiShow: "none",
      vrShow: "block",
      toPickdetailsShow: "none",
      toAllocationdetailsShow: "none",
      vehicleChecked: "none",
      toPickDataList: [],
      toAllocationDataList: [],
      toStaggingLocationList: [],
      toStaggingLocationList2: [],
      toLogDataList: [],
      StaggingFromLoc: "",
      StaggingFromLocIndex: -1,
      StaggingToLoc: "",
      StaggingToLocIndex: -1,
      StaggingFromLoc2: "",
      StaggingFromLoc2Index: -1,
      StaggingToLoc2: "",
      StaggingToLoc2Index: -1,
    });
  };

  CloseLotdetails = () => {
    this.setState({
      toLogDataList: [],
    });
  };

  getLotDetailsbyProdSite = (site, prod, vrnum) => {
    this.setState({ loader: true });

    ToLotDetailsFetchData(prod, site, vrnum).then((res) => {
      var statuscode = res.children[1].children;
      var statusmessage = res.children[1].children[1];

      //  if(statuscode == 2) {

      this.notifySucess("Lot Data fetched Sucessfully");
      //      var tripsPanels = this.state.tripsPanel;
      // var selVR_num = tripsPanels[i].itemCode;
      //  fetchVR(selVR_num)
      this.setState({
        loader: false,
        toLogDataList: statuscode,
      });
    });
  };

  getDatabyStaggingLocations = (vrnum, from) => {
    this.setState({ loader: true });
    let fromloctyp = this.state.StaggingFromLoc;
    let toloctyp = this.state.StaggingFromLoc;
    if (this.state.StaggingToLoc.length > 0) {
      toloctyp = this.state.StaggingToLoc;
    }

    let floc = this.state.StaggingFromLoc2;
    let tloc = this.state.StaggingFromLoc2;
    if (this.state.StaggingToLoc2.length > 0) {
      tloc = this.state.StaggingToLoc2;
    }

    ToAllocationFetchData(vrnum, fromloctyp, toloctyp, floc, tloc).then(
      (res) => {
        var statuscode = res.children[1].children;
        var statusmessage = res.children[1].children[1];

        //  if(statuscode == 2) {

        this.notifySucess("Locations updated successfully");
        //      var tripsPanels = this.state.tripsPanel;
        // var selVR_num = tripsPanels[i].itemCode;
        //  fetchVR(selVR_num)
        this.setState({
          loader: false,
          toAllocationDataList: statuscode,

          vehicleShow: "none",
          schedulerShow: "none",
          RouteoptiShow: "none",
          vrShow: "none",
          toPickdetailsShow: "none",
          toAllocationdetailsShow: "block",
          vehicleChecked: "none",
        });
        /*
        else {
           
          this.notifyError("Can't fetch To Pick Data", statusmessage);
            this.setState({ loader: false });
        }
        */

        if (from === "allocation") {
          this.onVrRefresh(vrnum);
        }
      }
    );
  };

  ToPickDatafromVR = (vrnum) => {
    this.setState({ loader: true });
    // 
    //   var tripsPanels = this.state.tripsPanel;
    //   var ClickedTrip = tripsPanels[i];
    //   let trips = ClickedTrip;
    ToPickData(vrnum).then((res) => {
      var statuscode = res.children[1].children;
      var statusmessage = res.children[1].children[1];

      //  if(statuscode == 2) {

      this.notifySucess("TO Pick data fetched Sucessfully");
      //      var tripsPanels = this.state.tripsPanel;
      // var selVR_num = tripsPanels[i].itemCode;
      //  fetchVR(selVR_num)
      this.setState({
        loader: false,
        toPickDataList: statuscode,

        vehicleShow: "none",
        schedulerShow: "none",
        RouteoptiShow: "none",
        vrShow: "none",
        toPickdetailsShow: "block",
        toAllocationdetailsShow: "none",
        vehicleChecked: "none",
      });
      /*
        else {
           
          this.notifyError("Can't fetch To Pick Data", statusmessage);
            this.setState({ loader: false });
        }
        */
    });
  };

  ToAllocationGetDatafromVR = (vrnum, site, from) => {
    this.setState({ loader: true });

    //   var tripsPanels = this.state.tripsPanel;
    //   var ClickedTrip = tripsPanels[i];
    //   let trips = ClickedTrip;

    ToStaggingLocationFetchData(site).then((res1) => {
      var statuscode1 = res1.children[2].children;
      var statusmessage1 = res1.children[1].children[1];

      //  if(statuscode == 2) {

      // this.notifySucess("TO Pick data fetched Sucessfully", statusmessage);
      //      var tripsPanels = this.state.tripsPanel;
      // var selVR_num = tripsPanels[i].itemCode;
      //  fetchVR(selVR_num)
      this.setState({
        //   loader : false,
        toStaggingLocationList: statuscode1,
      });
    });

    let fromloc = this.state.StaggingFromLoc;
    let toloc = this.state.StaggingToLoc;
    ToAllocationFetchData(vrnum, fromloc, toloc).then((res) => {
      var statuscode = res.children[1].children;
      var statusmessage = res.children[1].children[1];

      //  if(statuscode == 2) {

      this.notifySucess("Allocation Data loaded successfully");
      //      var tripsPanels = this.state.tripsPanel;
      // var selVR_num = tripsPanels[i].itemCode;
      //  fetchVR(selVR_num)
      this.setState({
        loader: false,
        toAllocationDataList: statuscode,

        vehicleShow: "none",
        schedulerShow: "none",
        RouteoptiShow: "none",
        vrShow: "none",
        toPickdetailsShow: "none",
        toAllocationdetailsShow: "block",
        vehicleChecked: "none",
      });
      /*
        else {
           
          this.notifyError("Can't fetch To Pick Data", statusmessage);
            this.setState({ loader: false });
        }
        */

      if (from === "allocation") {
        this.onVrRefresh(vrnum);
      }
    });
  };

  SubmitforAllocation = (site, vrcode) => {
    var currentAllocationData = this.state.toAllocationDataList;
    this.setState({
      loader: true,
    });
    // 
    //  var tripsPanel = this.state.tripsPanel;
    //  tripsPanel[index].lock = true;

    var arrayoftemppt = [];
    for (let i2 = 0; i2 < currentAllocationData.length; i2++) {
      var pickticket = currentAllocationData[i2];

      //      if(pickticket.children[9].value === 'Global') {

      var temppicktkct = {};
      temppicktkct.prhnum = pickticket.children[0].value;
      temppicktkct.lineno = pickticket.children[1].value;
      temppicktkct.site = site;
      temppicktkct.count = pickticket.children[12].value;
      temppicktkct.lot = "";
      temppicktkct.prod = pickticket.children[3].value;
      temppicktkct.qty = pickticket.children[5].value;
      temppicktkct.stocount = pickticket.children[12].value;
      temppicktkct.vrnum = vrcode;
      //  temppicktkct.qty = pickticket.children[7].value;
      //   temppicktkct.lot = pickticket.children[3].value

      arrayoftemppt.push(temppicktkct);
      //     }
    }

    //if(arrayoftemppt.length > 0) {
    fetch(`${apiUrl}/api/v1/transport/allocation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arrayoftemppt),
    }).then((response) => {
      if (response.status === 200) {
        ToAllocationSubmitData(vrcode).then((res) => {
       
          //    if(statuscode == 200) {

          this.notifySucess("Allocation Sucessfully Completed");
          //      var tripsPanels = this.state.tripsPanel;
          // var selVR_num = tripsPanels[i].itemCode;
          //  fetchVR(selVR_num)
          //     }

          //this.onVrRefresh(vrcode);
          //  this.ToAllocationGetDatafromVR(vrcode, site);
          if (this.state.StaggingFromLoc2.length > 0) {
            this.getDatabyStaggingLocations(vrcode, "allocation");
            //  this.onVrRefresh(vrcode);
          } else {
            this.ToAllocationGetDatafromVR(vrcode, site, "allocation");
            // this.onVrRefresh(vrcode);
          }
        });
      } else {
        this.notifyError("Allocation Failed");
      }
    });
  };

  confirmLVSbyCode = (lvscode, i, pageType) => {
    this.setState({ loader: true });
    // 
    var tripsPanels = this.state.tripsPanel;
    var ClickedTrip = tripsPanels[i];
    let trips = ClickedTrip;
    ConfirmLVS(lvscode).then((res) => {
      var statuscode = res.children[1].children[0].value;
      var statusmessage = res.children[1].children[1].value;

      if (statuscode == 2) {
        this.notifySucess("LVS Confirmed Sucessfully", statusmessage);
        var tripsPanels = this.state.tripsPanel;
        var selVR_num = tripsPanels[i].itemCode;
        fetchVR(selVR_num).then(([res1, res2, res3]) => {
          this.setState({
            vrlist: res1,
            vrdetaillist: res2,
            loadvehstock: res3,
            loader: false,
          });
        });
      } else {
        this.notifyError("Can't Confirm the LVS", statusmessage);
        this.setState({ loader: false });
      }
    });
  };

  onVrRefresh = (vrnum) => {
    fetchVR(vrnum)
      .then(([res1, res2, res3]) => {
        this.setState({
          vrlist: res1,
          vrdetaillist: res2,
          loadvehstock: res3,
          loader: false,
        });
      })
      .then(() => {})
      .catch((error) => {
        // history.push('/');
      });
  };

  /*
    updateTripsGeoLocations = (index , status) => {
     // var checkboxes = document.getElementsByName("tripsCheckBox");
      // 
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
         // 
        this.removeTrips();
  //      checkboxes[index].checked = true;
  
        this.updateTripsPanel(currMarkers, currGeoData, index);
        this.setState({ selectedIndex: index, checkedTrip: true, RouteoptiShow:'block' })
      } else {
       // 
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
  };

  updateDocsMap = (currMarkers, currGeoData, i, docnum) => {
    //add pointer to the map
    let currDropsPanel = this.state.docsPanel;
    // 
    for (var j = 0; j < currDropsPanel.length; j++) {
      if (currDropsPanel[j].docnum === docnum) {
        if (currDropsPanel[j].movtype === "DROP") {
          currDropsPanel[j].panelType = "drop";
          currMarkers.push(currDropsPanel[j]);
        } else {
          currDropsPanel[j].panelType = "pickup";
          currMarkers.push(currDropsPanel[j]);
        }
      }
    }

    this.setState({
      geoData: currGeoData,
      markers: currMarkers,
      mapChanged: true,
    });
  };

  updateonlyTripsPanel = (i) => {
    // 
    // 
    var tripsPanels = this.state.tripsPanel;
    // 
    var selectedTrip = [];
    var selectedTrips = [];
    var trailers = [];
    var equipments = [];
    var quantities = [];
    var gTrip = this.state.guageTrip;
    gTrip = tripsPanels[i];
    var slectTrip = gTrip.totalObject;
    // 
    tripsPanels[i].timelineInterval = slectTrip.timelineInterval;
    // 
    selectedTrips = slectTrip.selectedTripData;
    // 
    trailers = slectTrip.trailers;
    equipments = slectTrip.equipments;
    quantities = slectTrip.quantities;
    selectedTrip.push(tripsPanels[i]);
    this.setState({ tripsPanel: tripsPanels, selectedIndex: i });
  };

  updateTripsPanel = (currMarkers, currGeoData, i) => {
    
    // 
    var tripsPanels = this.state.tripsPanel;
    // 
    var selectedTrip = [];
    var selectedTrips = [];
    var trailers = [];
    var equipments = [];
    var quantities = [];
    var gTrip = this.state.guageTrip;
    gTrip = tripsPanels[i];
    var slectTrip = tripsPanels[i].totalObject;
    // 
    tripsPanels[i].timelineInterval = slectTrip.timelineInterval;
    // 
    selectedTrips = slectTrip.selectedTripData;
    // 
    trailers = slectTrip.trailers;
    equipments = slectTrip.equipments;
    quantities = slectTrip.quantities;
    selectedTrip.push(tripsPanels[i]);
    // 

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
      "#e0e0e0",
    ];
    var count = selectedTrips.length;
    for (var i = 0; i < selectedTrips.length; i++) {
      if (Object.keys(selectedTrips[i]).length != 0) {
        if (selectedTrips[i].panelType === "drop") {
          tripColor[i] = "#7ace4c";
        } else if (selectedTrips[i].panelType === "pickup") {
          tripColor[i] = "#09aaed";
        }
        currGeoData.push(selectedTrips[i]);
      }
    }

    // 
    this.setState({
      trips: selectedTrip,
      guageTrip: gTrip,
      tripColor: tripColor,
      slectedTrips: selectedTrips,
      selectedTripData: selectedTrips[count - 1],
      left: count * 55,
      trailers: trailers,
      equipments: equipments,
      quantities: quantities,
      geoData: currGeoData,
      markers: currMarkers,
      mapChanged: true,
      tripsChecked: selectedTrip,
    });
    // 
  };

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
        "#e0e0e0",
      ],
      slectedTrips: [],
    });
  };

  handleDragStart = (event, valueObj, type, index, id) => {
    // 
    // 
    // 
    // 
    if (type === "vehicle") {
      // 
      const currDate = moment.tz(this.state.date, "").format("YYYY-MM-DD");
      const url =
        `${apiUrl}/api/v1/transport/prevtrpsite?veh=` +
        valueObj.codeyve +
        "&date=" +
        currDate;
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then((res) => {
          let endSite = "";
          if (res.arrSite && res.arrSite.length > 0) {
            endSite = res.arrSite;
            this.setState({ updatedArrSite: endSite });
          } else {
            endSite = valueObj.startdepotn;
            this.setState({ updatedArrSite: "" });
          }
          let latestMarkers = this.state.markers;
          let currMarkers = [];
          if (latestMarkers && latestMarkers.length > 0) {
            latestMarkers.map((marker) => {
              if (marker.panelType) {
                currMarkers.push(marker);
              }
            });
          }
          let arrivalSite = {};
          if (this.state.sites && this.state.sites.length > 0) {
            this.state.sites.map((site) => {
              if (site.id === endSite) {
                currMarkers.unshift(site);
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
            });
          }
          if (
            !(
              currMarkers[0].lat === arrivalSite.lat &&
              currMarkers[0].lng === arrivalSite.lng
            )
          ) {
            currMarkers.push(arrivalSite);
          }
          this.setState({
            markers: currMarkers,
            mapChanged: true,
            tripsChecked: [],
          });
        });
    }

    /*
        // 
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

    // 
    // 
  };

  enableDivs = (trails, type) => {
    let vPanel = this.state.vehiclePanel;
    vPanel.trails.map((vTrial) => {
      trails.map((trail) => {
        if (trail.trailer === vTrial.trailer) {
          vTrial.type = "open";
        }
      });
    });
    this.setState({ vehiclePanel: vPanel });
  };

  updateClearTripsFlag = () => {
    this.setState({
      clearTrips: false,
    });
  };

  handleArrSite = (siteLabel, type) => {
    let currMarkers = this.state.markers;
    let arrivalSite = {};
    let depSite = {};
    if (currMarkers && currMarkers.length > 0) {
      currMarkers.map((marker) => {
        this.state.sites &&
          this.state.sites.map((site) => {
            if (type === "end" && site.id === siteLabel) {
              if (marker.arrivalCheck === "arrival") {
                let removeObjIndex = currMarkers.findIndex(
                  (data) => data.arrivalCheck === "arrival"
                );
                currMarkers.splice(removeObjIndex, 1);
                arrivalSite.city = site.value;
                arrivalSite.docnum = site.value;
                arrivalSite.idd = site.id;
                arrivalSite.lat = site.lat;
                arrivalSite.lng = site.lng;
                arrivalSite.value = site.value;
                arrivalSite.arrivalCheck = "arrival";
              } else {
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
          });
      });
      if (
        type === "end" &&
        !(
          currMarkers[0].lat === arrivalSite.lat &&
          currMarkers[0].lng === arrivalSite.lng
        )
      ) {
        if (Object.keys(arrivalSite).length > 0) {
          currMarkers.push(arrivalSite);
        }
      }
      if (
        type === "start" &&
        !(
          currMarkers[0].lat === depSite.lat &&
          currMarkers[0].lng === depSite.lng
        )
      ) {
        if (Object.keys(depSite).length > 0) {
          currMarkers = [];
          currMarkers.push(depSite);
        }
      }
    }
    this.setState({
      markers: currMarkers,
      mapChanged: true,
      tripsChecked: [],
    });
  };

  updateResetTrip = (trip) => {
    this.setState({
      trips: trip,
      equipments: [],
    });
    this.removeMarkers();
  };

  dropResetObj = (trip) => {
    if (
      this.state.dropsPanel &&
      this.state.dropsPanel &&
      this.state.dropsPanel.drops.length > 0
    ) {
      let dropsPanel = this.state.dropsPanel;
      var drops = dropsPanel.drops;
      var pickUps = dropsPanel.pickUps;
      drops.map((drop) => {
        if (trip.dropObj && trip.dropObj.length > 0) {
          trip.dropObj.map((dropOb) => {
            if (drop.docnum === dropOb.docnum) {
              drop.type = "open";
            }
          });
        }
      });
      pickUps.map((pickUp) => {
        if (trip.pickupObject && trip.pickupObject.length > 0) {
          trip.pickupObject.map((pickOb) => {
            if (pickUp.docnum === pickOb.docnum) {
              pickUp.type = "open";
            }
          });
        }
      });

      dropsPanel.drops = drops;
      dropsPanel.pickUps = pickUps;
      this.setState({ dropsPanel: dropsPanel });
    }
  };

  updateTrip = (trip) => {
    this.setState({
      trips: trip,
    });
    // this.removeMarkers();
  };

  updateTrialers = (trailer) => {
    this.setState({
      trailers: trailer,
    });
  };

  updateQuantities = (quantity) => {
    this.setState({
      quantities: quantity,
    });
  };

  updateEqupments = (equipment) => {
    this.setState({
      equipments: equipment,
    });
  };

  onDocProcessChange = (val) => {
    this.setState({
      defaultdocprocess: val,
    });
  };

  // ondaysDocChange=(val)=>{
  //   this.setState({
  //     daysDoc:val
  //   })

  //   console.log(val ,"this is val checking 3518");

  //   this.documentPanelDateChange(this.state.documentPanel_date);
  // }

  ondaysDocChange = (val) => {
  this.setState({ daysDoc: val });
      this.documentPanelDateChange(this.state.documentPanel_date);

};


  updateTripCount = () => {
    var tripCount = this.state.selectedTrips;
    tripCount += 12;
    this.setState({
      selectedTrips: tripCount,
    });
  };

  clearAllDocsCheckBoxes = () => {
    var checkboxes = document.getElementsByName("docsCheckBox");
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  };

  removeDocsCheckBoxes = () => {
    this.clearAllDocsCheckBoxes();

    this.setState({
      selectedDocs: [],
      checkedDoccs: [],
    });
  };

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
        "#e0e0e0",
      ],
      slectedTrips: [],
    });
  };

  clearTrailers = () => {
    this.setState({
      trailers: [],
    });
  };

  clearEquipments = () => {
    this.setState({
      equipments: [],
      quantities: [],
    });
  };

  disableDroppedDiv = (divTag) => {
    // 
    var temp = "[row-id=" + divTag + "]";
    //  var htmlDiv = document.getElementById(divTag);
    // 
    var htmlDiv = document.querySelectorAll(temp);
    var { droppedDivs } = this.state;
    // 
    droppedDivs.push(temp);
    this.setState({ droppedDivs });
  };

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
      if (drops[i].isDropped && drops[i].type != "Allocated") {
        drops[i].type = "open";
      }
    }
    for (var i = 0; i < pickUps.length; i++) {
      if (pickUps[i].isDropped && pickUps[i].type != "Allocated") {
        pickUps[i].type = "open";
      }
    }

    currDropsPanel.drops = drops;
    currDropsPanel.pickUps = pickUps;

    this.setState({
      vehiclePanel: currVehPanel,
      dropsPanel: currDropsPanel,
    });
  };

  closeActivePanel = () => {
    /*
      this.setState({
          checkedTrip: false, isDetail:false, showListRouteMap : false
      })
      */

    // this.handleDateRangeChange();
    this.setState({
      checkedTrip: false,
      isDetail: false,
      showListRouteMap: false,
      vehicleShow: "block",
      schedulerShow: "block",
      RouteoptiShow: "none",
      vrShow: "none",
      toPickdetailsShow: "none",
      toAllocationdetailsShow: "none",
      vehicleChecked: "none",
      tripsChecked: [],
    });
    var checkboxes = document.getElementsByName("tripsCheckBox");
    for (var i = 0; i < checkboxes.length; i++) {
      var checkBox = checkboxes[i];
      checkBox.checked = false;
    }
  };

  handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  };

  updateTripValue = (count, tripData) => {
    var currLeft = this.state.left;
    var tripColor = this.state.tripColor;
    if (tripData.panelType === "drop") {
      tripColor[count] = "#7ace4c";
    } else {
      tripColor[count] = "#09aaed";
    }
    var currSlectedTrips = this.state.slectedTrips;
    currSlectedTrips.push(tripData);
    setTimeout(() => {
      this.setState({
        left: currLeft + 55,
        tripColor: tripColor,
        selectedTripData: tripData,
        slectedTrips: currSlectedTrips,
      });
    }, 10);
  };

  updateSelectedTrip = (count) => {
    var selectedTrips = this.state.slectedTrips;
    this.setState({
      selectedTripData: selectedTrips[count],
      left: (count + 1) * 55,
    });
  };

  onValidateAll = () => {
    this.setState({ loader: true });
    var tripsPanel = this.state.tripsPanel;
    var ValidateTrips = [];
    var Validatecount = 0;

    for (let i = 0; i < tripsPanel.length; i++) {
      var trip = tripsPanel[i];
      if (trip.lock && !trip.tmsValidated) {
        Validatecount = Validatecount + 1;
        // 
        ValidateTrips.push(trip);
      }
    }

    if (Validatecount > 0) {
      fetch(`${apiUrl}/api/v1/transport/groupvalidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ValidateTrips),
      })
        .then((response) => {
          this.handleErrors(response);
        })
        .then(function (response) {})
        .then(() => {
          // this.handleDateRangeChange();
          this.fetchDocumentPanelDateChange(this.state.documentPanel_date);
        })
        .then(() => {
          // this.refreshDocspanel();
          this.setState({ loader: false });
          this.notifySucess("Trips Validated Sucessfully");
        })
        .catch((error) => {
          this.handleDateRangeChange();
          this.setState({ loader: false });
          this.notifyError("Can't validate the Trips");
        });
    } else {
      this.setState({
        loader: false,
        errorMessage: "No Trips are available for Validation",
        addAlertShow: true,
      });
    }
  };

  Nonvalidate = (i) => {
    this.setState({ loader: true });
    // 
    var tripsPanels = this.state.tripsPanel;
    var ClickedTrip = tripsPanels[i];
    let trips = ClickedTrip;
    fetch(`${apiUrl}/api/v1/transport/nonvalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trips),
    })
      .then((response) => {
        // this.handleErrors(response);
      })
      .then(function (response) {})
      .then(() => {
        // this.handleDateRangeChange();
        this.fetchDocumentPanelDateChange(this.state.documentPanel_date);
      })
      .then(() => {
        // this.updateMaprelatedstuff(i);
      })
      .then(() => {
        // this.setState({ loader: false });

        this.setState({
          loader: false,
          checkedTrip: false,
          isDetail: false,
          showListRouteMap: false,
          vehicleShow: "block",
          schedulerShow: "block",
          RouteoptiShow: "none",
          vrShow: "none",
          toPickdetailsShow: "none",
          toAllocationdetailsShow: "none",
          vehicleChecked: "none",
          tripsChecked: [],
        });
        this.notifySucess("Disputed Validated Trip Sucessfully");

        // call vrClick functionality
      })
      .catch((error) => {
        this.fetchDocumentPanelDateChange(this.state.documentPanel_date);
        this.setState({ loader: false });
        this.notifyError("unable to dispute validated Trip");
      });
  };

  validate = (i) => {
    this.setState({ loader: true });
    // 
    var tripsPanels = this.state.tripsPanel;
    var ClickedTrip = tripsPanels[i];
    let userinfo = JSON.parse(localStorage.getItem("authUser"));
    ClickedTrip.loginUser = userinfo.username;
    let trips = ClickedTrip;

    // 
    fetch(`${apiUrl}/api/v1/transport/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trips),
    })
      .then((response) => {
        this.handleErrors(response);
      })
      .then(function (response) {})
      .then(() => {
        // this.handleDateRangeChange();
        this.fetchDocumentPanelDateChange(this.state.documentPanel_date);
      })
      .then(() => {
        this.updateMaprelatedstuff(i);
        this.setState({
          loader: false,
          checkedTrip: false,
          isDetail: false,
          showListRouteMap: false,
          vehicleShow: "block",
          schedulerShow: "block",
          RouteoptiShow: "none",
          vrShow: "none",
          toPickdetailsShow: "none",
          toAllocationdetailsShow: "none",
          vehicleChecked: "none",
          tripsChecked: [],
        });
      })
      .then(() => {
        this.setState({ loader: false });
        this.notifySucess("Trip Validated Sucessfully");
        // call vrClick functionality
      })
      .catch((error) => {
        this.handleDateRangeChange();
        this.setState({ loader: false });
        this.notifyError("Can't validate the Trip");
      });
  };

  confirmLVSbyCode_backup = (lvscode, i, pageType) => {
    this.setState({ loader: true });
    // 
    var tripsPanels = this.state.tripsPanel;
    var ClickedTrip = tripsPanels[i];
    let trips = ClickedTrip;
    fetch(`${apiUrl}/api/v1/transport/confirmlvs?vrcode=` + lvscode, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lvscode),
    })
      .then((response) => {
        this.handleErrors(response);
      })
      .then(() => {
        this.setState({ loader: false });
        this.notifySucess("LVS Confirmed Sucessfully");
        // call vrClick functionality
        if (pageType === "vrHeader") {
          var tripsPanels = this.state.tripsPanel;
          var selVR_num = tripsPanels[i].itemCode;
          fetchLVS(selVR_num)
            .then(([res1]) => {
              this.setState({
                loadvehstock: res1,
              });
            })
            .then(() => {
              this.setState({ selectedVrValidated: true });
            })
            .catch((error) => {
              // history.push('/');
            });
        }
      })
      .catch((error) => {
        this.handleDateRangeChange();
        this.setState({ loader: false });
        this.notifyError("Can't validate the Trip");
      });
  };

  confirmLVSbyCode = (lvscode, i, pageType) => {
    this.setState({ loader: true });
    // 
    var tripsPanels = this.state.tripsPanel;
    var ClickedTrip = tripsPanels[i];
    let trips = ClickedTrip;
    ConfirmLVS(lvscode).then((res) => {
      var statuscode = res.children[1].children[0].value;
      var statusmessage = res.children[1].children[1].value;

      if (statuscode == 2) {
        // this.notifySucess("LVS Confirmed Sucessfully", statusmessage);
        var tripsPanels = this.state.tripsPanel;
        var selVR_num = tripsPanels[i].itemCode;
        fetchVR(selVR_num).then(([res1, res2, res3]) => {
          this.setState({
            vrlist: res1,
            vrdetaillist: res2,
            loadvehstock: res3,
            loader: false,
          });

          if (res3.xstoflg === 2) {
            this.notifySucess(
              "Stock loaded into the truck/trailer successfully"
            );
          } else {
            this.notifySucess(
              "Stock didn't load into the truck/trailer , please verify"
            );
          }
        });
      } else {
        this.notifyError("Can't Confirm the LVS " + statusmessage);
        this.setState({ loader: false });
      }
    });
  };

  validateonly = (i, pageType) => {
    this.setState({ loader: true });
    // 
    var tripsPanels = this.state.tripsPanel;
    var ClickedTrip = tripsPanels[i];
    let trips = ClickedTrip;
    fetch(`${apiUrl}/api/v1/transport/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trips),
    })
      .then((response) => {
        this.handleErrors(response);
      })
      .then(() => {
        this.setState({ loader: false });
        this.notifySucess("Trip Validated Sucessfully");
        // call vrClick functionality
        if (pageType === "vrHeader") {
          var tripsPanels = this.state.tripsPanel;
          var selVR_num = tripsPanels[i].itemCode;
          fetchLVS(selVR_num)
            .then(([res1]) => {
              this.setState({
                loadvehstock: res1,
              });
            })
            .then(() => {
              this.setState({ selectedVrValidated: true });
            })
            .catch((error) => {
              // history.push('/');
            });
        }

        this.fetchDocumentPanelDateChange(this.state.documentPanel_date);
      })
      .catch((error) => {
        this.handleDateRangeChange();
        this.setState({ loader: false });
        this.notifyError("Can't validate the Trip");
      });
  };

  updateMaprelatedstuff(index) {
    const currMarkers = [];
    const currGeoData = [];
    if (typeof this.state.selectedSite === "string") {
      if (this.state.sites.length > 0) {
        this.state.sites.map((site) => {
          if (site.id === this.state.selectedSite) {
            currMarkers.push(site);
          }
        });
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
    if (typeof this.state.selectedSite === "string") {
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
  };

  // updateDocsGeoLocations = (index, docnum) => {
  //   var checkboxes = document.getElementsByName("docsCheckBox");
  //   const currMarkers = [];
  //   const currGeoData = [];
  //   if (typeof (this.state.selectedSite) === "string") {
  //     if (this.state.sites.length > 0) {
  //       // 
  //       this.state.sites.map((site) => {
  //         if (site.id === this.state.selectedSite) {
  //           currMarkers.push(site)
  //         }
  //       })
  //     }
  //   } else if (this.state.selectedSite.lat != undefined) {
  //     // 
  //     currMarkers.push(this.state.selectedSite);
  //   }
  //   // 
  //   // 
  //   if (checkboxes[index].checked) {
  //     this.removeDocsCheckBoxes();
  //     // 
  //     checkboxes[index].checked = true;
  //     //this.onRouteoptiShow();
  //     this.updateDocsMap(currMarkers, currGeoData, index, docnum);
  //     //this.updateTripsPanel(currMarkers, currGeoData, index);
  //     // this.setState({ selectedIndex: index, checkedTrip: true })
  //   } else {
  //     // 
  //     // this.onRouteoptihide();
  //     this.removeDocsCheckBoxes();
  //     let marker = [];
  //     marker.push(currMarkers[0])
  //     // 
  //     // 
  //     this.setState({
  //       markers: marker,
  //       mapChanged: true,
  //       geoData: currGeoData
  //     });
  //   }

  // }

  updateDocsGeoLocations = (index, drops) => {
    
    const checkboxes = document.getElementsByName("docsCheckBox");
    const currMarkers = [];
    const currGeoData = [];
    const { selectedDocs, selectedSite, sites, checkedDoccs } = this.state;

    // Determine the current marker
    if (typeof selectedSite === "string") {
      if (sites.length > 0) {
        sites.forEach((site) => {
          if (site.id === selectedSite) {
            currMarkers.push(site);
          }
        });
      }
    } else if (selectedSite.lat !== undefined) {
      currMarkers.push(selectedSite);
    }

    // Handle checkbox state
    if (checkboxes[index].checked) {
      // Add the document to the selectedDocs array
      const updatedDocs = [
        ...selectedDocs,
        { docnum: drops.docnum, type: drops.doctype },
      ];

      const checkedDocs = [...checkedDoccs, drops];

      this.setState(
        {
          selectedDocs: updatedDocs,
          markers: currMarkers,
          mapChanged: true,
          checkedDoccs: checkedDocs,
        },
        () => {
          // Update the map and any other necessary components
          this.updateDocsMap(currMarkers, currGeoData, index, drops.docnum);
        }
      );
    } else {
      // Remove the document from the selectedDocs array
      const updatedDocs = selectedDocs.filter((doc) => doc !== drops.docnum);

      this.setState({
        selectedDocs: updatedDocs,
        markers: currMarkers,
        mapChanged: true,
        geoData: currGeoData,
      });
    }
  };

  updateTripsGeoLocations = (passedi, vrcode) => {
    let index, searchindex;
    let temptripsdata = this.state.tripsPanel;
    let temptripsdata2 = this.state.tripsPanel;
    let searchTripString = this.state.searchTripString;

    if (searchTripString.length > 0) {
      temptripsdata = temptripsdata.filter((trip) => {
        return (
          trip.itemCode
            .toLowerCase()
            .indexOf(searchTripString.toLowerCase()) !== -1 ||
          trip.code.toLowerCase().indexOf(searchTripString.toLowerCase()) !==
            -1 ||
          trip.driverName
            .toLowerCase()
            .indexOf(searchTripString.toLowerCase()) !== -1
        );

        // 
      });
    }

    // filter data after search
    for (let i11 = 0; i11 < temptripsdata.length; i11++) {
      if (temptripsdata[i11].itemCode === vrcode) {
        index = i11;
      }
    }

    // get actual data index
    for (let i12 = 0; i12 < temptripsdata2.length; i12++) {
      if (temptripsdata2[i12].itemCode === vrcode) {
        searchindex = i12;
      }
    }

    var checkboxes = document.getElementsByName("tripsCheckBox");
    const currMarkers = [];
    const currGeoData = [];
    if (typeof this.state.selectedSite === "string") {
      if (this.state.sites.length > 0) {
        // 
        this.state.sites.map((site) => {
          if (site.id === this.state.selectedSite) {
            currMarkers.push(site);
          }
        });
      }
    } else if (this.state.selectedSite.lat != undefined) {
      // 
      currMarkers.push(this.state.selectedSite);
    }
    // 
    // 
    if (checkboxes[index].checked) {
      this.removeTrips();
      // 
      checkboxes[index].checked = true;
      this.onRouteoptiShow();

      this.updateTripsPanel(currMarkers, currGeoData, searchindex);

      this.setState({ selectedIndex: searchindex, checkedTrip: true });
    } else {
      this.onRouteoptihide();
      this.removeTrips();
      let marker = [];
      marker.push(currMarkers[0]);
      // 
      // 
      this.setState({
        markers: marker,
        mapChanged: true,
        geoData: currGeoData,
        tripsChecked: [],
        checkedTrip: false,
      });
    }
  };

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
        "#e0e0e0",
      ],
      slectedTrips: [],
    });
  }

  updateTripsPanel_beforeLocking(currMarkers_bl, i) {
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
      bl_tripsList: tripsList_bl,
      bl_selectedTripData: selectedTrip_bl,
      bl_markers: currMarkers_bl,
      triplock: false,
      vehicleShow: "none",
      RouteoptiShow: "none",
      vrShow: "block",
      schedulerShow: "none",
      vehicleChecked: "none",
    });
  }

  // working updateTripsPanel (one same named function is there)
  updateTripsPanel = (currMarkers, currGeoData, i) => {
    // 

    var tripsPanels = this.state.tripsPanel;
    var selectedTrip = [];
    var selectedTrips = [];
    var trailers = [];
    var equipments = [];
    var quantities = [];
    var gTrip = this.state.guageTrip;
    gTrip = tripsPanels[i];
    var slectTrip = tripsPanels[i].totalObject;
    // 
    tripsPanels[i].timelineInterval = slectTrip.timelineInterval;
    // 
    selectedTrips = slectTrip.selectedTripData;
    // 
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
      "#e0e0e0",
    ];

    var count = selectedTrips.length;
    for (var i = 0; i < selectedTrips.length; i++) {
      if (Object.keys(selectedTrips[i]).length != 0) {
        if (selectedTrips[i].panelType === "drop") {
          tripColor[i] = "#7ace4c";
        } else if (selectedTrips[i].panelType === "pickup") {
          tripColor[i] = "#09aaed";
        }
        currGeoData.push(selectedTrips[i]);
      }
    }

    // 
    // 
    // if (currGeoData[0]?.vehicleCode !== gTrip.code) {
    currGeoData = currGeoData.map((obj) => ({
      ...obj,
      vehicleCode: gTrip.code,
    }));
    // }

    this.setState({
      trips: selectedTrip,
      guageTrip: gTrip,
      tripColor: tripColor,
      slectedTrips: selectedTrips,
      selectedTripData: selectedTrips[count - 1],
      left: count * 55,
      trailers: trailers,
      equipments: equipments,
      quantities: quantities,
      geoData: currGeoData,
      markers: currMarkers,
      mapChanged: true,
      tripsChecked: selectedTrip,
    });
  };

  onSaveNotes = (note) => {
    this.setState({
      notes: note,
    });
  };

  clearAllCheckBoxes = () => {
    var checkboxes = document.getElementsByName("tripsCheckBox");
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  };

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
        if (
          null !== tripsPanels[i].dropObject &&
          null !== tripsPanels[i].pickupObject
        ) {
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
      this.setState({
        selectedTripData: tripsPanels,
        tripsChecked: tripsPanels,
      });
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
      mapChanged: true,
    });
  };

  updateTimeLine = () => {
    var elements = document.getElementsByName("docNum");
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
      "#e0e0e0",
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
          if (currTripsLine[j].panelType === "drop") {
            tripColor[docElements.length - 1] = "#7ace4c";
          } else if (currTripsLine[j].panelType === "pickup") {
            tripColor[docElements.length - 1] = "#09aaed";
          }
        }
      }
    }
    this.setState({
      reorder: true,
      tripColor: tripColor,
      slectedTrips: docElements,
      selectedTripData: docElements[docElements.length - 1],
      left: docElements.length * 55,
    });

    this.notifySucess("Documents in the Trip are reordered Succesfully");
  };

  onVRClick = (i, tmsValidated) => {
    var tripsPanels = this.state.tripsPanel;
    var selectedTrip = [];
    var selectedTrips = [];
    var trailers = [];
    var selVR_num = tripsPanels[i].itemCode;
    var ClickedVR = tripsPanels[i];

    let Ispktkct = false,
      IsOnlyReceipt = false;
    var sel_Driver_name = tripsPanels[i].driverName;
    //caling API

    {
      tripsPanels[i].dropObject.length > 0 &&
        console.log("Hide and seek - LVS Workflow 1", tripsPanels[i]);

      for (let ij = 0; ij < tripsPanels[i].dropObject.length; ij++) {
        let dropobj = tripsPanels[i].dropObject[ij];

        if (!Ispktkct) {
          if (dropobj.doctype === "PICK") {
            Ispktkct = true;
          }
        }
      }
    }

    if (
      tripsPanels[i].dropObject.length === 0 &&
      tripsPanels[i].pickupObject.length > 0
    ) {
      IsOnlyReceipt = true;
    }

    fetchVR(selVR_num)
      .then(([res1, res2, res3]) => {
        this.setState({
          vrlist: res1,
          vrdetaillist: res2,
          loadvehstock: res3,
        });
      })
      .then(() => {})
      .catch((error) => {
        // history.push('/');
      });
    if (this.state.markers && this.state.markers.length == 0) {
      this.state.sites.map((site) => {
        if (this.state.selectedSite === site.id) {
          let marker = [];
          marker.push(site);
          this.setState({ markers: marker });
        }
      });
    }
    this.setState({
      clickedTrips: ClickedVR,
      selectedVrIndex: i,
      selectedVrValidated: tmsValidated,
      IsPickTicket: Ispktkct,
      onlyReceiptflg: IsOnlyReceipt,
      triplock: true,
      vehicleShow: "none",
      RouteoptiShow: "none",
      vrShow: "block",
      toPickdetailsShow: "none",
      toAllocationdetailsShow: "none",
      schedulerShow: "none",
      vehicleChecked: "none",
    });
  };

  documentPanelDateChange = (date) => {

    console.log(date ,"document panel date chagne fetching here");
    this.setState({ loader: true });
    // 
    const currDate = moment.tz(date, "").format("YYYY-MM-DD");
    // 



      const daysDoc = parseInt(this.state.daysDoc || 0, 10);
      
        const startDate = moment(currDate).subtract(daysDoc, 'days').format("YYYY-MM-DD");

        console.log(startDate,currDate ,"checking both dates checkins here 4537");

    let value = this.state.selectedMultipleSites;
    fetchDocumentPanelwithRangeDaysBack(value, startDate,currDate)
      .then(([res1, res2]) => {
        /*
          if(status1 === 200 && status2 === 200 && status3 === 200){
                   this.setState({loading: false})
          }
          */

        this.setState({
          documentPanel_date: currDate,
          documentPanel_dateflg: true,
          docsPanel: res1,
          tripsPanel: res2,
          loader: false,
        });
      })
      .then(() => {
        this.updateTopBar();
        this.refreshSite();
        this.removeDocsCheckBoxes();
      })
      .catch((error) => {
        this.setState({
          loader: false,
        });
      });


    
  };

  // show document panel data after generating route locking validating (this is created because date is getting blank after performing these oprations)

  fetchDocumentPanelDateChange = (date) => {
    this.setState({ loader: true });
    // 


       console.log(date ,"document panel date chagne fetching here");
    this.setState({ loader: true });
    // 
    const currDate = moment.tz(date, "").format("YYYY-MM-DD");
    // 



      const daysDoc = parseInt(this.state.daysDoc || 0, 10);
      
        const startDate = moment(currDate).subtract(daysDoc, 'days').format("YYYY-MM-DD");

        console.log(startDate,currDate ,"checking both dates checkins here 4537");

    let value = this.state.selectedMultipleSites;
  fetchDocumentPanelwithRangeDaysBack(value, startDate,currDate)
      .then(([res1, res2]) => {
        /*
          if(status1 === 200 && status2 === 200 && status3 === 200){
                   this.setState({loading: false})
          }
          */

        this.setState({
          documentPanel_date: date,
          documentPanel_dateflg: true,
          tripsPanel: res2,
          docsPanel: res1,
          loader: false,
          selectedDocs: [],
          checkedDoccs: [],
        });
      })
      .then(() => {
        this.updateTopBar();
        this.refreshSite();
        this.removeDocsCheckBoxes();
      })
      .catch((error) => {
        this.setState({
          loader: false,
        });
      });
  };

  onVRhide = () => {
    this.setState({
      vehicleShow: "block",
      schedulerShow: "block",
      RouteoptiShow: "none",
      vrShow: "none",
      vehicleChecked: "none",
      toPickdetailsShow: "none",
      toAllocationdetailsShow: "none",
      toPickDataList: [],
      toAllocationDataList: [],
      IsPickTicket: false,
      onlyReceiptflg: false,
      toLogDataList: [],
      toStaggingLocationList: [],
      StaggingFromLoc: "",
      StaggingFromLocIndex: 0,
      StaggingToLoc: "",
      StaggingToLocIndex: 0,
    });
  };

  onRouteoptihide = () => {
    // this.refreshAllpanels();
    this.setState({
      vehicleShow: "block",
      schedulerShow: "block",
      toPickdetailsShow: "none",
      toAllocationdetailsShow: "none",
      RouteoptiShow: "none",
      vrShow: "none",
      vehicleChecked: "none",
    });
    // this.handleDateRangeChange();
  };

  onRouteoptiShow = () => {
    this.setState({
      vehicleShow: "block",
      RouteoptiShow: "block",
      toPickdetailsShow: "none",
      toAllocationdetailsShow: "none",
      vrShow: "none",
      schedulerShow: "none",
      vehicleChecked: "none",
    });
  };

  onLoadermessage = (tripindex, msg) => {
    var tripsPanels = this.state.tripsPanel;
    var tripsList_loader = tripsPanels[tripindex];
    tripsList_loader.loaderInfo = msg;

    // 
    this.confirmTrip(tripsList_loader, "loaderMsg");
  };

  onForcesequnceCheck = (tripindex, msg) => {
    // 
    var tripsPanels = this.state.tripsPanel;
    var trips = [];
    var tripsList_force = tripsPanels[tripindex];
    tripsList_force.date = moment.tz(this.state.date, "").format("YYYY-MM-DD");
    if (msg) {
      tripsList_force.forceSeq = true;
    } else {
      tripsList_force.forceSeq = false;
    }
    trips.push(tripsList_force);
    this.submitTrips(trips);
  };

  onDocmessage = (docNum, msg, Msgtype) => {
    var currentGeoData = this.state.geoData;
    var currentMarkers = this.state.markers;
    var trips = [];
    var geoData = [];
    var currMarkers = [];
    var trip = this.state.trips[0];

    currentGeoData &&
      currentGeoData.map((geoData, index) => {
        if (geoData.docnum && geoData.docnum === docNum) {
          if (Msgtype === "doc") {
            geoData.noteMessage = msg;
            geoData.ptheader = msg;
          } else if (Msgtype === "carrier") {
            geoData.CarrierMessage = msg;
          } else {
            geoData.loaderMessage = msg;
          }
        }
      });

    currentMarkers &&
      currentMarkers.map((currMarker, index) => {
        if (currMarker.docnum && currMarker.docnum === docNum) {
          currMarker.noteMessage = msg;
        }
      });
    trip &&
      trip.totalObject &&
      trip.totalObject.selectedTripData &&
      trip.totalObject.selectedTripData.map((TripData) => {
        if (TripData.docnum && TripData.docnum === docNum) {
          if (Msgtype === "doc") {
            // 
            TripData.noteMessage = msg;
          } else if (Msgtype === "carrier") {
            TripData.CarrierMessage = msg;
          } else {
            TripData.LoaderMessage = msg;
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
    });
  };

  UPDATE_DELETED_DOC_DETAILS = () => {
    // var deleteddoc = this.state.;
    fetch(`${apiUrl}/api/v1/transport/update/deldoc`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.SelectedDeletedDocs),
    }).then((response) => {});
  };

  refreshDocspanel = () => {
    var satday, sunday;
    var currDate = moment.tz(this.state.date, "");
    [sunday, satday] = this.startAndEndOfWeek(currDate);
    var StartDate = moment.tz(sunday, "").format("YYYY-MM-DD");
    var EndDate = moment.tz(satday, "").format("YYYY-MM-DD");
    // 
    // 
    fetchSchedulerDocsAPI(this.state.selectedMultipleSites, StartDate, EndDate)
      .then(([res1]) => {
        this.setState({
          docsPanel: res1,
        });
      })
      .catch((error) => {});
  };

  onTripDelete = (index, docnum, vtype, vcode, docObject) => {
    // 

    // 
    // 
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

    // making delivery status as 8

    docs.forEach((document) => {
      if (document.docnum == docnum) {
        document.dlvystatus = "8";
      }
    });

    // 
    // 
    // 
    // 
    if (currentGeoData[index].panelType == "pickup") {
      var pickCount = trip.pickups;
      trip.pickups = pickCount - 1;
      removeDocs.push(docnum);
      this.setState({
        docnoRemoveTrip: docnum,
      });
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
          if (
            trip.pickupObject[k].pairedDoc != undefined &&
            trip.pickupObject[k].pairedDoc != " "
          ) {
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

    if (currentGeoData[index].panelType == "drop") {
      var dropCount = trip.drops;
      trip.drops = dropCount - 1;
      removeDocs.push(docnum);
      this.setState({
        docnoRemoveTrip: docnum,
      });
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
          if (
            trip.dropObject[k].pairedDoc != undefined &&
            trip.dropObject[k].pairedDoc != " "
          ) {
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

    let selectedTripData = [...trip.totalObject.selectedTripData];

    // service time logic if we have service time in above document and below document having same client code and adresscode then this logic will apply

    removeDocsObject.forEach((deletedDoc) => {
      const { docnum, serviceTime, bpcode, adrescode } = deletedDoc;
   
      if (serviceTime !== "00:00") {
        
        const index = selectedTripData.findIndex(
          (item) => item.docnum === docnum
        );

        

        if (index !== -1 && index + 1 < selectedTripData.length) {
          const nextItem = selectedTripData[index + 1];

          

      
          if (nextItem.bpcode === bpcode && nextItem.adrescode === adrescode) {
         
            selectedTripData[index + 1].serviceTime = serviceTime;
          }
        }
      }
    });

    trip.totalObject.selectedTripData = selectedTripData;
    var dropObject = [];
    for (var i = 0; i < trip.dropObject.length; i++) {
      if (!removeDocs.includes(trip.dropObject[i].docnum)) {
        dropObject.push(trip.dropObject[i]);
      }
    }

    // 

    trip.pickupObject = pickupObject;
    trip.dropObject = dropObject;
    trip.totalObject.selectedTripData = selectedTrips;

    // 
    var tripColor = [
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
    ];

    var count = selectedTrips.length;
    for (var i = 0; i < count; i++) {
      if (selectedTrips[i].panelType === "drop") {
        tripColor[i] = "#7ace4c";
      } else if (selectedTrips[i].panelType === "pickup") {
        tripColor[i] = "#09aaed";
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
      SelectedDeletedDocs: removeDocsObject,
      dropsPanel: currDropsPanel,
      mapChanged: true,
      docType: vtype,
      deletedVehicleCode: vcode,
    });
  };
  // end of onTrip Delete

  lockTrip = (trips, index) => {
    this.setState({ loader: true });
    // 
    var tripsPanel = this.state.tripsPanel;
    let userinfo = JSON.parse(localStorage.getItem("authUser"));
    tripsPanel[index].loginUser = userinfo.username;
    tripsPanel[index].lock = true;

    fetch(`${apiUrl}/api/v1/transport/lock/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trips),
    }).then((response) => {
      this.setState({
        tripsPanel: tripsPanel,
        loader: false,
        checkedTrip: false,
        isDetail: false,
        showListRouteMap: false,
        vehicleShow: "block",
        schedulerShow: "block",
        RouteoptiShow: "none",
        vrShow: "none",
        toPickdetailsShow: "none",
        toAllocationdetailsShow: "none",
        vehicleChecked: "none",
        tripsChecked: [],
      });

      this.documentPanelDateChange(this.state.documentPanel_date);
      this.notifySucess("Trip Locked Sucessfully");
    });
  };

  onLockRecord = (index, lockP, itemCode) => {
    var tripsPanel = this.state.tripsPanel;

    var trips = [];
    for (let i = 0; i < tripsPanel.length; i++) {
      if (tripsPanel[i].itemCode == itemCode) {
        trips.push(tripsPanel[i]);
      }
    }

    var trip = trips[0];

    trip.date = this.state.date;
    trip.lockP = lockP;
    trip.allocatedRouteCodes = trip.allocatedRouteCodes.split(",")[0].trim();
    trips.push(trip);

    // trips.allocatedRouteCodes=trip[index].allocatedRouteCodes
    var user = JSON.parse(localStorage.getItem("authUser"));
    let details = {
      loginUser: user.username,
      dateTime: new Date(),
      type: "lock",
    };
    if (
      trips[0].totalObject &&
      trips[0].totalObject.logData &&
      trips[0].totalObject.logData.length > 0
    ) {
      trips[0].totalObject.logData.push(details);
    }
    this.lockTrip(trips, index);
  };

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
    // 
    var tripsPanel = this.state.tripsPanel;
    var trips = [];
    for (let trip in tripsPanel) {
      if (trip.optistatus === "Open") {
        trip.lock = true;

        trips.push(trip);
      }
    }
    fetch(`${apiUrl}/api/v1/transport/lock/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trips),
    }).then((response) => {
      this.setState({
        tripsPanel: tripsPanel,
      });
    });
  };

  submitRoutesforTripsCreationOSRMManually = async (
    routes,
    site,
    Vehicle,
    alreadyTrip
  ) => {
    this.setState({ loader: true });
    let existingTrip = alreadyTrip;
    var RouteprocessedData = [];
    var sameProcessUsedDriversList = [];
    var TripsfromRoutes = [];
    // 
    for (let k = 0; k < routes.length; k++) {
      var currRoute = routes[k];
      var Veh = routes[k].description;
      var auto_tot_travel_time = formatTime(routes[k].duration);
      var auto_total_time = (routes[k].duration + routes[k].service) / 60 / 60;
      var auto_service_time = routes[k].service / 60 / 60;
      var auto_total_distance = routes[k].distance / 1000;

      // 
      var dropObject = [],
        pickupObject = [],
        drops = 0,
        pickups = 0;
      var startTime = "",
        endTime = "";
      var totalWeight = 0;
      var ddate = "";
      var totalVolume = 0;
      var fld_per_capacity = 0;
      var fld_per_volume = 0;
      var fld_doc_capacity = 0;
      var fld_doc_volume = 0;
      var weight = "";
      var volume = "";
      var vol_unit = "";
      var wei_unit = "";
      var percentageMass = 0;
      var percentageVolume = 0;
      var VehicleObject = Vehicle;
      var vehobj = [];
      var itemTrip = {
        selectedTripData: [],
        timelineInterval: [],
        equipments: [],
        trailers: [],
        quantities: [],
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
      let totTime = 0;
      let totDistance = 0;
      for (let t = 0; t < currRoute.steps.length; t++) {
        var ttime = "";
        var currTask = currRoute.steps[t];
        

        if (currTask.type !== "start" && currTask.type !== "end") {
          var docno = currTask.description;
          // 
          for (let d = 0; d < this.state.docsPanel.length; d++) {
            let newStartDate1 = moment(existingTrip.docdate).format(
              "YYYY-MM-DD"
            );
            var currDoc = this.state.docsPanel[d];
            // 
            var SelectedDoc = [];
            if (currDoc.docnum === docno) {
              //let time = data.summary.travelTimeInSeconds
              //currDoc.serviceTime = secondsToHms(currTask.service);
              currDoc.serTime = secondsToHmsAutoGen(currTask.service);
              currDoc.tDistance = currTask.distance
                ? currTask.distance / 1000
                : 0;
              currDoc.waitingTime = currTask.waiting_time / 3600;
              currDoc.tTime = currTask.duration;
              currDoc.vehicleCode = Veh;
              currDoc.arrival = secondsToHmsAutoGen(currTask.arrival);
              currDoc.startDate = newStartDate1;
              currDoc.endDate = newStartDate1;
              currDoc.time = convertSecToHr(currTask.duration).toFixed(3);
              currDoc.distance = 0;
              currDoc.end = secondsToHmsAutoGen(currTask.arrival + currTask.service);
              ttime = currDoc.arrival;
              if (currDoc.doctype === "PRECEIPT") {
                pickups = pickups + 1;
                currDoc.panelType = "pickup";
                pickupObject.push(currDoc);
                fld_doc_capacity = fld_doc_capacity + currDoc.netweight;
                fld_doc_volume = fld_doc_volume + currDoc.volume;
              } else {
                drops = drops + 1;
                currDoc.panelType = "drop";
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
        else if (currTask.type === "start") {
          // 
          startTime = secondsToHms(currTask.arrival);
          ttime = startTime;
        } else if (currTask.type === "end") {
          endTime = secondsToHms(currTask.arrival);
          ttime = endTime;
          // 
        }
        //for timeline
        var index = t * 12;
        timelneInterval.push({ value: index, label: ttime });

        // 
      } // end of steps
      totalWeight = 0; //totalWeight + parseInt(docItem.obbject.netweight);
      totalVolume = 0; //totalVolume + parseInt(docItem.obbject.volume);
      ddate = existingTrip.docdate;

      itemTrip.timelineInterval = timelneInterval;
      var TimelineInterval = VehicleObject.timelineInterval;
      var stops = pickups + drops;
      var site = VehicleObject.fcy;
      var capacity = parseInt(VehicleObject.capacities);
      var fld_tot_capacity = parseInt(VehicleObject.capacities);
      var fld_tot_volume = VehicleObject.vol;
      var fld_uom_capacity = VehicleObject.xweu;
      var fld_uom_volume = VehicleObject.xvol;

      fld_per_capacity = Math.round(
        (fld_doc_capacity / fld_tot_capacity) * 100
      );
      fld_per_volume = Math.round((fld_doc_volume / fld_tot_volume) * 100);

      // 
      var volume = VehicleObject.vol;
      //  var StartTime = VehicleObject.timelineInterval[0].label;
      vehobj = VehicleObject;

      if (totalWeight > 0) {
        percentageMass = 0; //((parseInt(totalWeight) / parseInt(capacity)) * 100).toFixed(1);
      }

      if (totalVolume > 0) {
        percentageVolume = 0; //((parseInt(totalVolume) / parseInt(volume)) * 100).toFixed(1);
      }
      var today = new Date();
      var execdate = today.getDate();

      

      existingTrip.date = moment.tz(ddate, "").format("YYYY-MM-DD");
      existingTrip.docdate = moment.tz(ddate, "").format("YYYY-MM-DD");
      existingTrip.endDate = ddate;
      existingTrip.tot_capacity = fld_tot_capacity;
      existingTrip.tot_volume = fld_tot_volume;
      existingTrip.doc_capacity = fld_doc_capacity;
      existingTrip.doc_volume = fld_doc_volume;
      existingTrip.per_capacity = fld_per_capacity;
      existingTrip.totalDistance = auto_total_distance;
      existingTrip.totalCost = 0;
      existingTrip.per_volume = fld_per_volume;
      existingTrip.uom_capacity = fld_uom_capacity;
      existingTrip.uom_volume = fld_uom_volume;
      existingTrip.generatedBy = "MScheduler";
      existingTrip.vehicleObject = vehobj;
      existingTrip.optistatus = "Optimized";
      existingTrip.capacities = capacity;
      existingTrip.adeptime = startTime;
      existingTrip.startTime = startTime;
      existingTrip.endTime = endTime;
      existingTrip.pickups = pickups;
      existingTrip.lock = false;
      existingTrip.pickupObject = pickupObject;
      existingTrip.dropObject = dropObject;
      existingTrip.totalObject = itemTrip;
      existingTrip.drops = drops;
      existingTrip.stops = stops;
      existingTrip.startIndex = stops;
      existingTrip.pickUps = pickups;
      existingTrip.timelineInterval = TimelineInterval;
      existingTrip.weightPercentage = fld_per_capacity;
      existingTrip.volumePercentage = fld_per_volume;
      existingTrip.totalWeight = fld_doc_capacity + " " + fld_uom_capacity;
      existingTrip.totalVolume = fld_doc_volume + " " + fld_uom_volume;
      existingTrip.travelTime = auto_tot_travel_time;
      existingTrip.serviceTime = auto_service_time;
      existingTrip.totalTime = auto_total_time;
      existingTrip.pickups = pickups;
      existingTrip.route = true;
      /*

        // 
        var trip = {
          arrSite: site,
          code: Veh,
          date: moment.tz(ddate, '').format("YYYY-MM-DD"),
          docdate: moment.tz(ddate, '').format("YYYY-MM-DD"),
          endDate       : ddate,
          depSite: site,
          freqExist: freqtype,
          appointment: appointmentExist,
          poProcessed: false,
          tot_capacity: fld_tot_capacity,
          tot_volume: fld_tot_volume,
          doc_capacity: fld_doc_capacity,
          doc_volume: fld_doc_volume,
          per_capacity: fld_per_capacity,
          per_volume: fld_per_volume,
          uom_capacity: fld_uom_capacity,
          uom_volume: fld_uom_volume,
          dlvystatus: 0,
          lvsno: null,
          credattim: new Date(),
          upddattim: new Date(),
          // datexec : new Date(),
          datexec: new Date(),
          driverName: defaultDrivername,
          driverId: defaultDriver,
          generatedBy: 'AutoScheduler',
          defaultDriver: '',
          trailers: defaultTrailerCount_a,
          site: site,
          equipments: 0,
          vehicleObject: vehobj,
          optistatus: 'Optimized',
          capacities: capacity,
          adeptime: startTime,
          startTime: startTime,
          endTime: endTime,
          trips: 1,
          pickups: pickups,
          lock: false,
          pickupObject: pickupObject,
          dropObject: dropObject,
          totalObject: itemTrip,
          equipmentObject: [],
          trialerObject: defaultTrailerObject_a,
          drops: drops,
          stops: stops,
          startIndex: stops,
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
          weightPercentage: percentageMass,
          volumePercentage: percentageVolume,
          totalWeight: totalWeight + " " + wei_unit,
          totalVolume: totalVolume + " " + vol_unit,
          travelTime: auto_tot_travel_time,
          serviceTime: auto_service_time,
          totalTime: auto_total_time,
          totalDistance: 0,
          fixedCost: 0,
          totalCost: 0,
          distanceCost: 0,
          regularCost: 0,
          overtimeCost: 0,
          timeCost: 0,
          driverslist: '',
          allcustomers: '',
          customerlist: '',

        }
        */

      RouteprocessedData.push(existingTrip);
    }
    // 
    TripsfromRoutes = RouteprocessedData;
    // 
    //   this.ConfirmScheduledTrips(TripsfromRoutes);
    /*
            fetch(`${process.env.REACT_APP_API_URL}/api/v1/transport/trips`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trips)
              }).then((response) => {
                // 
                this.handleErrors(response);
              }).then(function (response) {
    
              }).then(() => {
                // 
                this.handleDateRangeChange();
              }).then(() => {
                this.setState({ laoder: false, checkedTrip: false, isDetail: false });
                this.notifySucess("Trip Added/Updated Sucessfully");
              }).catch(error => {
                this.handleDateRangeChange();
                this.setState({ loader: false });
                this.notifyError("Please add proper trip to add or update, with vehicle, drops and pickups");
              });
    
              */
    try {
      let fresponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/transport/trips`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(TripsfromRoutes),
        }
      );

      if (fresponse.status === 200) {
        this.notifySucess("Trip Optimised Successfully");
        this.setState({ loader: false });
      } else {
        this.notifyError("Trip is not optimised properly");
      }
    } catch (error) {
      console.error("Error in processing trip:", error);
      this.setState({
        errorMessage: `Error in processing trip ${error.message}`,
        loader: false,
        addAlertShow: true,
      });
    }
  };

  OSRM_manuallytrip = async (optitrip) => {
    let selectedDate = this.state.documentPanel_date;
    let DayOnDate = this.getDayOfWeek(selectedDate);
    this.setState({ loader: true });
    let processtrip = optitrip;
    let selectedTripdata = processtrip.totalObject.selectedTripData;
    // get site details
    let VehListM = [],
      DocListM = [];
    let veh = {},
      vehObject = {};
    let siteLatM, siteLangM;
    let docM = {};
    let selSite = this.state.selectedMultipleSites[0];
    // 
    this.state.sites.map((site) => {
      if (selSite === site.id) {
        siteLatM = site.lat;
        siteLangM = site.lng;
      }
    });

    // get vehicle from the vehicle list

    for (let vi = 0; vi < this.state.vehiclePanel.vehicles.length; vi++) {
      let tempveh = this.state.vehiclePanel.vehicles[vi];
      var array = [];

      switch (DayOnDate) {
        case "Monday":
          
          array = JSON.parse("[" + tempveh.mondayRC + "]");
          break;
        case "Tuesday":
          array = JSON.parse("[" + tempveh.tuesdayRC + "]");
          
          break;
        case "Wednesday":
          array = JSON.parse("[" + tempveh.wednesdayRC + "]");
          
          break;
        case "Thursday":
          array = JSON.parse("[" + tempveh.thursdayRC + "]");
          
          break;
        case "Friday":
          array = JSON.parse("[" + tempveh.fridayRC + "]");
          // 
          break;
      }

    
      if (processtrip.code === tempveh.codeyve) {
        vehObject = tempveh;

        
        let MVeh = {};

        MVeh.max_travel_time = convertHrToSec(tempveh.maxtotaltrvtime);

        MVeh.capacity = [parseInt(tempveh.capacities), parseInt(tempveh.vol)];
        MVeh.id = 1;
        MVeh.description = tempveh.codeyve;
        let starttime = splitTimeAndConv2Sec(tempveh.starttime);
        let loadingHrs = convertHrToSec(tempveh.startdepots);
        let stime = starttime + loadingHrs;
        // 
        let etime = splitTimeAndAddtimeAndConv2Sec(
          tempveh.starttime,
          tempveh.overtimestar
        );
        let timew = [stime, etime];
        let geo = [siteLangM, siteLatM];

        MVeh.time_window = timew;
        MVeh.start = geo;
        MVeh.end = geo;

        // MVeh.skills = array;
        if (veh.maxordercnt > 0) {
          MVeh.max_tasks = 99;
        } else {
          MVeh.max_tasks = 99;
        }
        
        VehListM.push(MVeh);
        break;
      }
    }

    // get the list of documents to process

    for (let j = 0; j < selectedTripdata.length; j++) {
      let doc = selectedTripdata[j];
      var Doc = {};
      // 
      // 
      Doc.id = j + 1;
      Doc.description = doc.docnum;
      // 

      var FromArr;
      var fromflag = false;
      var toflag = false;
      if (doc.fromTime.length > 0) {
        FromArr = doc.fromTime.split(" ");
        fromflag = true;
      }
      var ToArr;
      if (doc.toTime.length > 0) {
        ToArr = doc.toTime.split(" ");
        toflag = true;
      }

      // 
      // 

      var timeWindw = [];

      fromflag &&
        FromArr.map((ft, index) => {
          var tt = [];
          // 
          tt.push(splitTimeAndConv2Sec(ft));
          // 
          tt.push(splitTimeAndConv2Sec(ToArr[index]));

          timeWindw.push(tt);
        });

      // 

      var DocLat, DocLang;
      DocLat = doc.lat;
      DocLang = doc.lng;
      Doc.location = [DocLang, DocLat];
      Doc.priority = doc.priority;
      Doc.amount = [parseInt(doc.netweight), parseInt(doc.volume)];
      // var array1 = JSON.parse("[" + doc.skills + "]");
      // var array1=[]
      //  Veh.skills = array;
      // Doc.skills = (doc.skills).split(',');
      // if (doc.skills) {
      //   Doc.skills = doc.skills
      //     .split(",")
      //     .map((skill) => parseInt(skill.trim(), 10));
      // } else {
      //   Doc.skills = []; // or handle the case where skills is undefined or empty
      // }

   
      let wtime = convertHrToSec(doc.waitingTime);
      let stime = convertHrToSec(doc.serviceTime);

      
      Doc.service = parseInt(wtime) + parseInt(stime);

      // 
      let ps,
        pe = 0;
      let ds,
        de = 0;

      // if (fromflag) {
      //   Doc.time_windows = timeWindw;
      // }
      // if (fromflag) {
      //   if (timeWindw[0][0] !== 0) {
      //     
      //     Doc.time_windows = timeWindw;
      //   }
      // }
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

      // 
      DocListM.push(Doc);
    }

    //process for the JSON file
    var processedData = {};
    processedData.vehicles = VehListM;
    processedData.jobs = DocListM;
    processedData.options = {
      g: true,
    };

    

    try {
      let response = await fetch("http://maps.uk.tema-systems.com:3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processedData),
      });

      if (response.status === 200) {
        let res = await response.json();
        if (res.routes.length > 0) {
          await this.submitRoutesforTripsCreationOSRMManually(
            res.routes,
            selSite,
            vehObject,
            processtrip
          );
        } else {
          this.setState({
            errorMessage:
              "Trip are not optimized, Due to Documents are Not In Range",
            loader: false,
            addAlertShow: true,
          });
        }
      }
    } catch (error) {
      console.error("Error in processing trip:", error);
      this.setState({
        errorMessage: "Error in processing trip",
        loader: false,
        addAlertShow: true,
      });
    }
  };

  OptimisemanuallywithOSRM = async (Optimisedtrips) => {
    for (let tt = 0; tt < Optimisedtrips.length; tt++) {
      await this.OSRM_manuallytrip(Optimisedtrips[tt]);
    }
  };

  groupOptmiseTrips = () => {
    let OptimisedtripsPanel = this.state.tripsPanel;

    // 
    let Optimisedtrips = [];
    for (let ttrip in OptimisedtripsPanel) {
      // 
      if (
        OptimisedtripsPanel[ttrip].optistatus === "Open" &&
        OptimisedtripsPanel[ttrip].driverId !== ""
      ) {
        Optimisedtrips.push(OptimisedtripsPanel[ttrip]);
      }
    }

    if (Optimisedtrips.length > 0) {
      this.OptimisemanuallywithOSRM(Optimisedtrips);
    } else {
      this.setState({
        errorMessage:
          "No trips are in open status to do optimization or driver is missing.",
        loader: false,
        addAlertShow: true,
      });
    }
  };

  setFirstMatchedRouteCodeDesc = (val) => {
    this.setState({
      firstMatchedRouteCodeDesc: val,
    });
  };

  setTuesdayMatchecRouteCodeDesc = (val) => {
    this.setState({
      tuesdayMatchecRouteCodeDesc: val,
    });
  };

  setWednesdayMatchedRouteCodeDesc = (val) => {
    this.setState({
      wednesdayMatchedRouteCodeDesc: val,
    });
  };

  setThursdayMatchedRouteCodeDesc = (val) => {
    this.setState({
      thursdayMatchedRouteCodeDesc: val,
    });
  };

  setFridayMatchedRouteCodeDesc = (val) => {
    this.setState({
      fridayMatchedRouteCodeDesc: val,
    });
  };

  onWarningAlertOff = (index, tripcode) => {
    var tripsPanel = this.state.tripsPanel;
    var trips = [];
    var trip = tripsPanel[index];
    trips.push(trip);
    const currDate = moment.tz(this.state.date, "").format("YYYY-MM-DD");
    fetch(`${apiUrl}/api/v1/transport/alertoff/trip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trips),
    }).then((response) => {
      this.reloadTrips();
      //  this.handlePanelsUpdate(currDate);
      this.notifySucess("Warning Alert has been closed Sucessfully");
      this.onRouteoptihide();
    });
  };

  onCompleteTripDelete = (i, tripcode) => {
    let trippsPanel = this.state.tripsPanel;

    let index;
    let deltedTripMatched = false;
    for (let dt = 0; trippsPanel.length > dt; dt++) {
      if (trippsPanel[dt].itemCode === tripcode) {
        index = dt;
        deltedTripMatched = true;
      }
    }

    if (deltedTripMatched) {
      var trips = [];
      var trip = trippsPanel[index];
      trips.push(trip);
      this.deleteTrip(trips, index);
      // this.dropResetObj(trip,"completeDelete");
      this.setState({
        guageTrip: {},
        geoData: [],
        markers: [],
        mapChanged: true,
        trips: [],
        slectedTrips: [],
        checkedTrip: false,
      });
    } else {
      this.setState({
        errorMessage: "Trip unable to Delete , Due to  Technical issue",
        loader: false,
        addAlertShow: true,
      });
    }

    //this.reloadTrips();
    this.fetchDocumentPanelDateChange(this.state.documentPanel_date);
    this.refreshDocspanel();
  };

  onTripCreationwithDoc = (eventData) => {
    var dropObject = [],
      pickupObject = [],
      drops = 0,
      pickups = 0;
    var VehicleObject = [];
    var totalWeight = 0;
    var totalVolume = 0;
    var weight = "";
    var volume = "";
    var percentageMass = 0;
    var percentageVolume = 0;
    var Trips = [];
    var TotalObjects = [];
    var itemTrip = {
      selectedTripData: [],
      timelineInterval: [],
      equipments: [],
      trailers: [],
      quantities: [],
    };
    itemTrip.selectedTripData.push(eventData.obbject);
    itemTrip.timelineInterval = eventData.VehicleObject.timelineInterval;
    itemTrip.equipments = [];
    itemTrip.trailers = [];
    itemTrip.quantities = [];
    VehicleObject.push(eventData.VehicleObject);
    if (eventData.docType === "Drop") {
      drops = drops + 1;
      eventData.obbject.panelType = "drop";
      dropObject.push(eventData.obbject);
    } else {
      pickups = pickups + 1;
      eventData.obbject.panelType = "pickup";
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
      percentageMass = (
        (parseInt(totalWeight) / parseInt(capacity)) *
        100
      ).toFixed(1);
    }

    if (totalVolume > 0) {
      percentageVolume = (
        (parseInt(totalVolume) / parseInt(volume)) *
        100
      ).toFixed(1);
    }

    // 

    var trip = {
      code: eventData.code,
      date: moment.tz(eventData.docdate, "").format("YYYY-MM-DD"),
      docdate: eventData.docdate,
      depSite: site,
      arrSite: site,
      dlvystatus: 0,
      lvsno: null,
      credattim: new Date(),
      upddattim: new Date(),

      driverName: "",

      driverId: "",
      defaultDriver: "",
      trailers: 0,
      site: site,
      equipments: 0,
      vehicleObject: VehicleObject,
      optistatus: "open",
      trips: 1,
      pickups: pickups,
      lock: false,
      pickupObject: pickupObject,
      dropObject: dropObject,
      totalObject: itemTrip,
      equipmentObject: [],
      trialerObject: [],
      drops: drops,
      stops: stops,
      startIndex: stops,
      pickUps: pickups,
      timelineInterval: [],
      trailerList: [],
      trailerLink: "",
      forceSeq: false,
      currDropsPanel: {
        drops: [],
        pickUps: [],
      },
      pickups: pickups,
      alldrivers: "",
      weightPercentage: percentageMass,
      volumePercentage: percentageVolume,
      totalWeight: totalWeight + " " + wei_unit,
      totalVolume: totalVolume + " " + vol_unit,

      driverslist: "",
      allcustomers: "",
      customerlist: "",
    };

    Trips.push(trip);

    this.ConfirmScheduledTrips(Trips);
  };

  grouplockTrips = () => {
    this.setState({ loader: true });
    var tripsPanel = this.state.tripsPanel;
    var unlockedTrips = [];
    var Lockcount = 0;
    var driverCount = 0;

    var user = JSON.parse(localStorage.getItem("authUser"));

    for (let i = 0; i < tripsPanel.length; i++) {
      var trip = tripsPanel[i];
      if (!trip.lock && trip.optistatus === "Optimized") {
        if (trip.driverId !== "") {
          Lockcount = Lockcount + 1;
          // 
          let tripdate = moment.tz(trip.docdate, "").format("YYYY-MM-DD");
          trip.date = tripdate;
          trip.lock = true;
          trip.loginUser = user.username;
          unlockedTrips.push(trip);
        } else {
          driverCount = driverCount + 1;
        }
      }
    }

    if (Lockcount > 0) {
      fetch(`${apiUrl}/api/v1/transport/lock/multipletrips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(unlockedTrips),
      }).then((response) => {
        this.notifySucess("Trips are Locked Sucessfully");
        this.setState({
          tripsPanel: tripsPanel,
          loader: false,
        });
      });
    } else if (driverCount > 0) {
      this.setState({
        errorMessage: "Driver is missing for the trips",
        loader: false,
        addAlertShow: true,
      });
    } else {
      this.setState({
        errorMessage: "No Trips are available for Locking",
        loader: false,
        addAlertShow: true,
      });
    }
  };

  autoResetTrips = () => {
    this.setState({ loader: true });
    var tripsPanel = this.state.tripsPanel;
    var unlockedTrips = [];
    var deletecount = 0;

    for (let i = 0; i < tripsPanel.length; i++) {
      var trip = tripsPanel[i];
      if (!trip.lock) {
        deletecount = deletecount + 1;
        unlockedTrips.push(trip);
      }
    }

    if (deletecount > 0) {
      // 
      fetch(`${apiUrl}/api/v1/transport/delete/trips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(unlockedTrips),
      }).then((response) => {
        // this.reloadTrips();
        //  this.handlePanelsUpdate(currDate);
        this.setState({ loader: false });
        this.notifySucess("Trips deleted Sucessfully");
        this.onRouteoptihide();
        this.fetchDocumentPanelDateChange(this.state.documentPanel_date);
        this.refreshDocspanel();
      });
    } else {
      this.setState({
        errorMessage: "No Trips are available for Deletion",
        loader: false,
        addAlertShow: true,
      });
    }
  };

  // getting day of particular date

  // Function to get day of the week from a date string
  getDayOfWeek = (dateString) => {
    // Create a new Date object from the date string
    const date = new Date(dateString);

    // Array of day names
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Get the day of the week as a number (0-6)
    const dayIndex = date.getDay();

    // Return the day name
    return daysOfWeek[dayIndex];
  };

  // autoGenerateTrips = () => {

  //   //filter the trips panle and sort it
  //   var tempTripPanel = this.state.tripsPanel;
  //   var orginalTripOrder = this.state.tripsPanel;
  //   // 

  //   tempTripPanel.sort((a, b) => (b.code.localeCompare(a.code) || b.trips - a.trips));

  //   // 

  //   const key = "code"

  //   // let uniqueTripListByCode = [...new Map(tempTripPanel.map((item) => [item["code"], item])).values(),];

  //   let selectedDate = this.state.documentPanel_date;

  //   let DayOnDate = this.getDayOfWeek(selectedDate);

  //   // 

  //   // 

  //   var resArr = [];
  //   tempTripPanel.filter(function (item) {
  //     var i = resArr.findIndex(x => (x.code == item.code));
  //     if (i <= -1) {
  //       resArr.push(item);
  //     }
  //     return null;
  //   });

  //   this.setState({ loader: true });
  //   var sameVehiclesflag = this.state.checkedsameVehicles;
  //   var DocCount = 0;
  //   let VehStartTime, VehEndTime;
  //   var internalArr = [];
  //   var collectionArr = [];
  //   var ExternalArr = [];

  //   let temproutecodelistofdocs = [];
  //   for (let jj = 0; jj < this.state.docsPanel.length; jj++) {
  //     let doc = this.state.docsPanel[jj];
  //     if ((doc.type === 'open') && (doc.dlvystatus === '0' || doc.dlvystatus === '8')) {
  //       DocCount = DocCount + 1;

  //       if (!temproutecodelistofdocs.includes(Number(doc.routeCode))) {
  //         temproutecodelistofdocs.push(Number(doc.routeCode));
  //       }

  //       // temproutecodelistofdocs.push(doc);

  //       if (doc.carrier === "INTERNAL") {
  //         internalArr.push(doc);
  //       }

  //       if (doc.carrier === "COLLECTIONS") {
  //         collectionArr.push(doc)
  //       }

  //       if (doc.carrier === "EXTERNAl" || doc.carrier === "DPD" || doc.carrier === "MONTGOMERY") {
  //         ExternalArr.push(doc)
  //       }

  //     }
  //   }

  //   

  //   // 

  //   // 
  //   // 
  //   // 

  //   if (DocCount > 0) {

  //     // 
  //     // 
  //     // 
  //     // 
  //     // 
  //     var VehList = [], DocList = [];
  //     var siteLat, siteLang;
  //     var doc = {};
  //     var selSite = this.state.selectedMultipleSites[0];
  //     // 
  //     this.state.sites.map((site) => {
  //       if (selSite === site.id) {
  //         siteLat = site.lat;
  //         siteLang = site.lng;

  //       }
  //     })

  //     var intenalVeh = [];
  //     var collectionVehicle = []
  //     var externalVeh = [];

  //     var vehSkill = "";

  //     
  //     for (let i = 0; i < this.state.vehiclePanel.vehicles.length; i++) {
  //       var Veh = {};
  //       let veh = this.state.vehiclePanel.vehicles[i];

  //       // 
  //       

  //       
  //       switch (DayOnDate) {

  //         case "Monday":
  //           let temodata = JSON.parse("[" + veh.mondayRC + "]");
  //           //check temodata array count if it is greatee than 1
  //           
  //           let finmodata = []
  //           if (temodata.length > 1) {
  //             
  //             for (let i = 0; i < temodata.length; i++) {
  //               if (temproutecodelistofdocs.includes(temodata[i])) {
  //                 finmodata.push(temodata[i]);
  //                 

  //                 break;
  //               }
  //             }
  //           } else {
  //             
  //             for (let i = 0; i < temodata.length; i++) {
  //               if (temproutecodelistofdocs.includes(temodata[i])) {
  //                 finmodata.push(temodata[i]);
  //                 
  //                 break;
  //               }
  //             }
  //           }
  //           // temodata - loop

  //           //     routecode if it exist in temproutecodelistofdocs
  //           //     vehSkill = routecodeec;
  //           
  //           vehSkill = finmodata;
  //           break;
  //         case "Tuesday":
  //           let temtudata = JSON.parse("[" + veh.tuesdayRC + "]");
  //           
  //           
  //           
  //           let fintudata = []
  //           if (temtudata.length > 1) {
  //             for (let i = 0; i < temtudata.length; i++) {

  //               if (temproutecodelistofdocs.includes(temtudata[i])) {

  //                 fintudata.push(temtudata[i])
  //                 
  //                 break;
  //               }
  //             }
  //           } else {
  //             for (let i = 0; i < temtudata.length; i++) {

  //               if (temproutecodelistofdocs.includes(temtudata[i])) {

  //                 fintudata.push(temtudata[i])
  //                 
  //                 break;
  //               }
  //             }
  //           }
  //           
  //           vehSkill = fintudata;
  //           break;
  //         case "Wednesday":
  //           let temwedata = JSON.parse("[" + veh.wednesdayRC + "]");
  //           let finwedata = [];

  //           if (temwedata.length > 1) {
  //             for (let i = 0; i < temwedata.length; i++) {
  //               if (temproutecodelistofdocs.includes(temwedata[i])) {
  //                 finwedata.push(temwedata[i])
  //                 break;
  //               }
  //             }
  //           } else {
  //             for (let i = 0; i < temwedata.length; i++) {
  //               if (temproutecodelistofdocs.includes(temwedata[i])) {
  //                 finwedata.push(temwedata[i])
  //                 break;
  //               }
  //             }
  //           }
  //           vehSkill = finwedata;
  //           break;
  //         case "Thursday":
  //           let temthdata = JSON.parse("[" + veh.thursdayRC + "]");
  //           let finthurdata = [];

  //           if (temthdata.length > 1) {
  //             for (let i = 0; i < temthdata.length; i++) {
  //               if (temproutecodelistofdocs.includes(temthdata[i])) {
  //                 finthurdata.push(temthdata[i])
  //                 break;
  //               }
  //             }
  //           } else {
  //             for (let i = 0; i < temthdata.length; i++) {
  //               if (temproutecodelistofdocs.includes(temthdata[i])) {
  //                 finthurdata.push(temthdata[i])
  //                 break;
  //               }
  //             }
  //           }
  //           vehSkill = finthurdata;
  //           break;
  //         case "Friday":
  //           let temfrdata = JSON.parse("[" + veh.fridayRC + "]");
  //           let finfridata = [];

  //           if (temfrdata.length > 1) {
  //             for (let i = 0; i < temfrdata.length; i++) {
  //               if (temproutecodelistofdocs.includes(temfrdata[i])) {
  //                 finfridata.push(temfrdata[i]);
  //                 break;
  //               }
  //             }
  //           } else {
  //             for (let i = 0; i < temfrdata.length; i++) {
  //               if (temproutecodelistofdocs.includes(temfrdata[i])) {
  //                 finfridata.push(temfrdata[i]);
  //                 break;
  //               }
  //             }
  //           }
  //           vehSkill = finfridata;
  //           break;

  //       }

  //       // 

  //       var sflag = false; var prevEndTime = 0;

  //       for (let t = 0; t < resArr.length; t++) {

  //         var currtrip = resArr[t];
  //         if (currtrip.code === veh.codeyve) {
  //           sflag = true;
  //           var endTime = splitTimeAndConv2Sec(currtrip.endTime);
  //           var unloadingtime = convertHrToSec(veh.enddepotserv);
  //           prevEndTime = endTime + unloadingtime;
  //           // 
  //           break;
  //         }
  //       }

  //       // filtering vehicles based on careerType
  //       if (veh.bptnumType === "INTERNAL") {
  //         intenalVeh.push(veh)
  //       }

  //       if (veh.bptnumType === "COLLECTIONS") {
  //         collectionVehicle.push(veh)
  //       }

  //       if (veh.bptnumType === "EXTERNAL") {
  //         externalVeh.push(veh)
  //       }

  //       // 

  //       if (!sameVehiclesflag && !sflag) {
  //         Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime);
  //         Veh.capacity = [veh.capacities];
  //         Veh.id = i + 1;
  //         Veh.description = veh.codeyve;
  //         let starttime = splitTimeAndConv2Sec(veh.starttime);
  //         let loadingHrs = convertHrToSec(veh.startdepots);
  //         let stime = starttime + loadingHrs;
  //         // 
  //         let etime = splitTimeAndAddtimeAndConv2Sec(veh.starttime, veh.overtimestar);
  //         let timew = [stime, etime];
  //         let geo = [siteLang, siteLat];

  //         Veh.time_window = timew;
  //         Veh.start = geo;
  //         Veh.end = geo;
  //         //  var array = JSON.parse("[" + vehSkill + "]");
  //         Veh.skills = vehSkill;
  //         if (veh.maxordercnt > 0) {
  //           Veh.max_tasks = veh.maxordercnt;
  //         }
  //         else {
  //           Veh.max_tasks = 3;
  //         }
  //         // 
  //         VehList.push(Veh);
  //         VehEndTime = etime;
  //         VehStartTime = stime;
  //       }
  //       else if (sameVehiclesflag && sflag) {

  //         let starttime = prevEndTime;
  //         let loadingHrs = convertHrToSec(veh.startdepots);
  //         let stime = starttime + loadingHrs;
  //         // 
  //         // 
  //         let etime = splitTimeAndAddtimeAndConv2Sec(veh.starttime, veh.overtimestar);

  //         if (stime < etime) {

  //           Veh.id = i + 1;
  //           Veh.description = veh.codeyve;
  //           Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime);
  //           Veh.capacity = [veh.capacities];

  //           // 
  //           let timew = [stime, etime];
  //           let geo = [siteLang, siteLat];
  //           Veh.time_window = timew;
  //           Veh.start = geo;
  //           Veh.end = geo;
  //           //  var array = JSON.parse("[" + vehSkill + "]");
  //           Veh.skills = vehSkill;
  //           if (veh.maxordercnt > 0) {
  //             Veh.max_tasks = veh.maxordercnt;
  //           }
  //           else {
  //             Veh.max_tasks = 3;
  //           }

  //           // 
  //           VehList.push(Veh);
  //           VehEndTime = etime;
  //           VehStartTime = stime;
  //         }

  //       }

  //     }

  //     

  //     // 
  //     // 
  //     // 

  //     // 
  //     // 
  //     let maxDoc = this.state.defaultdocprocess;
  //     let docprocessedCount = 0;
  //     for (let j = 0; j < this.state.docsPanel.length; j++) {
  //       let doc = this.state.docsPanel[j];
  //       // 
  //       if ((doc.type === 'open') && (doc.dlvystatus === '0' || doc.dlvystatus === '8') && docprocessedCount < maxDoc) {

  //         var Doc = {};
  //         // 
  //         // 
  //         Doc.id = j + 1;
  //         Doc.description = doc.docnum;
  //         // 

  //         var FromArr;
  //         var fromflag = false;
  //         var toflag = false;
  //         if ((doc.fromTime).length > 0) {
  //           FromArr = (doc.fromTime).split(' ');
  //           fromflag = true;

  //         }
  //         var ToArr;
  //         if ((doc.toTime).length > 0) {
  //           ToArr = (doc.toTime).split(' ');
  //           toflag = true;
  //         }

  //         // 
  //         // 

  //         var timeWindw = [];

  //         fromflag && FromArr.map((ft, index) => {
  //           var tt = []
  //           // 
  //           tt.push(splitTimeAndConv2Sec(ft));
  //           // 
  //           tt.push(splitTimeAndConv2Sec(ToArr[index]));

  //           timeWindw.push(tt);
  //         });

  //         // 

  //         var DocLat, DocLang;
  //         DocLat = doc.lat;
  //         DocLang = doc.lng;
  //         Doc.location = [DocLang, DocLat];
  //         Doc.priority = doc.priority;
  //         Doc.amount = [Math.round(doc.netweight)];
  //         // 
  //         // var array1 = JSON.parse("[" + doc.skills + "]");
  //         // var array1 = []
  //         //  Veh.skills = array;
  //         // Doc.skills = (doc.skills).split(',');
  //         //  Doc.skills = doc.skills;
  //         if (doc.skills) {
  //           Doc.skills = doc.skills.split(',').map(skill => parseInt(skill.trim(), 10));
  //         } else {
  //           Doc.skills = []; // or handle the case where skills is undefined or empty
  //         }
  //         let wtime = convertHrToSec(doc.waitingTime);
  //         let stime = convertHrToSec(doc.serviceTime);
  //         Doc.service = parseInt(wtime) + parseInt(stime);
  //         let ps, pe = 0;
  //         let ds, de = 0;

  //         
  //         if (fromflag) {
  //           if (timeWindw[0][0] !== 0) {
  //             
  //             Doc.time_windows = timeWindw;
  //           }
  //         }

  //         /*
  //               ps = VehStartTime + 10800;
  //               ds = VehStartTime ;
  //               pe = VehEndTime ;
  //               de = VehStartTime + 10800;
  //               if(doc.doctype === "PRECEIPT") {
  //                 //Doc.time_windows = [0,28800]
  //               //Doc.time_window = [36000, 54000];
  //               Doc.time_windows = [[ps, pe]];

  //               }
  //               else {
  //            Doc.time_windows =[[ds,de]];
  //               }
  //         */

  //         // 
  //         DocList.push(Doc);
  //         docprocessedCount = docprocessedCount + 1;
  //       }
  //     }
  //     

  //     //process for the JSON file
  //     var processedData = {};
  //     processedData.vehicles = VehList;
  //     processedData.jobs = DocList;
  //     processedData.options = {
  //       "g": false
  //     }

  //     
  //     // latest - 34.171.208.219
  //     // v10   - 34.134.143.219
  //     //new frane  - 35.193.234.153
  //     //34.136.15.124
  //     //34.132.234.177
  //     // US-west instance 34.95.36.63
  //     // tema server - http://maps.tema-systems.com:3000
  //     //  34.136.204.237

  //     fetch('http://maps.uk.tema-systems.com:3000', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(processedData)
  //     }).then((response) => {
  //       // 
  //       if (response.status === 200) {
  //         return response.json()
  //       }
  //     }).then((res) => {
  //       // 
  //       if (res.routes.length > 0) {
  //         // 
  //         // submit generated routes for trips creation
  //         this.submitRoutesforTripsCreation(res.routes, selSite);
  //       }
  //       else {
  //         this.setState({
  //           errorMessage: 'Trips are not genereated ,  Due to Documents are Not In Range or Distance/Time/Capacity/Product Category/Vehicle Class not sufficient with vehicles ',
  //           loader: false,
  //           addAlertShow: true,
  //         })
  //       }
  //     });
  //   }
  //   else {
  //     this.setState({
  //       errorMessage: 'No Documents are available for Trips creation',
  //       loader: false,
  //       addAlertShow: true,
  //     })
  //   }
  // }

  autoGenerateTrips = () => {
    //filter the trips panle and sort it
    var tempTripPanel = this.state.tripsPanel;
    var orginalTripOrder = this.state.tripsPanel;
    // 

    tempTripPanel.sort(
      (a, b) => b.code.localeCompare(a.code) || b.trips - a.trips
    );

    // 

    const key = "code";

    // let uniqueTripListByCode = [...new Map(tempTripPanel.map((item) => [item["code"], item])).values(),];

    let selectedDate = this.state.documentPanel_date;

    let DayOnDate = this.getDayOfWeek(selectedDate);

    // 

    // 

    var resArr = [];
    tempTripPanel.filter(function (item) {
      var i = resArr.findIndex((x) => x.code == item.code);
      if (i <= -1) {
        resArr.push(item);
      }
      return null;
    });

    this.setState({ loader: true });
    var sameVehiclesflag = this.state.checkedsameVehicles;
    var DocCount = 0;
    let VehStartTime, VehEndTime;
    var internalArr = [];
    var collectionArr = [];
    var ExternalArr = [];
    let noneDocs = [];

    let temproutecodelistofdocs = [];

    // for adding 1 route code at the end function
    function moveOnesToEnd(jsonString) {
      // Parse the JSON string into an array

      // Separate the 1s from the other values
      let ones = jsonString.filter((x) => x === 1);
      let others = jsonString.filter((x) => x !== 1);

      // Combine the arrays: other values first, followed by all 1s
      return others.concat(ones);
    }

    var autoDocs = [];

    for (let jj = 0; jj < this.state.docsPanel.length; jj++) {
      let doc = this.state.docsPanel[jj];
      if (
        doc.type === "open" &&
        (doc.dlvystatus === "0" || doc.dlvystatus === "8") &&
        doc.carrier == "INTERNAL" &&
        doc.routeCodeDesc != "None"
      ) {
        autoDocs.push(doc);
        DocCount = DocCount + 1;

        if (!temproutecodelistofdocs.includes(Number(doc.routeCode))) {
          temproutecodelistofdocs.push(Number(doc.routeCode));
        }

        // temproutecodelistofdocs.push(doc);

        if (doc.carrier === "INTERNAL") {
          internalArr.push(doc);
        }

        if (doc.carrier === "COLLECTIONS") {
          collectionArr.push(doc);
        }

        if (
          doc.carrier === "EXTERNAl" ||
          doc.carrier === "DPD" ||
          doc.carrier === "MONTGOMERY"
        ) {
          ExternalArr.push(doc);
        }
      }

      if (doc.routeCodeDesc == "None" && doc.carrier === "INTERNAL") {
        noneDocs.push(doc.docnum);
      }
    }

    // 
    // 
    // 

    if (DocCount > 0) {
      // 
      // 
      // 
      // 
      // 
      var VehList = [],
        DocList = [];
      var siteLat, siteLang;
      var doc = {};
      var selSite = this.state.selectedMultipleSites[0];
      // 
      this.state.sites.map((site) => {
        if (selSite === site.id) {
          siteLat = site.lat;
          siteLang = site.lng;
        }
      });

      var intenalVeh = [];
      var collectionVehicle = [];
      var externalVeh = [];

      var vehSkill = "";

      // 

      let filteredVehicle = this.state.vehiclePanel.vehicles.filter(
        (vehicle) => vehicle.bptnumType == "INTERNAL"
      );

      for (let i = 0; i < filteredVehicle.length; i++) {
        var Veh = {};
        let veh = filteredVehicle[i];

        

        switch (DayOnDate) {
          case "Monday":
            let temodata = JSON.parse("[" + veh.mondayRC + "]");
            temodata = moveOnesToEnd(temodata);

            let finmodata = [];
            //check temodata array count if it is greatee than 1
            if (temodata.length > 1) {
              for (let i = 0; i < temodata.length; i++) {
                if (temproutecodelistofdocs.includes(temodata[i])) {
                  finmodata.push(temodata[i]);

                  break;
                }
              }
            } else {
              for (let i = 0; i < temodata.length; i++) {
                if (temproutecodelistofdocs.includes(temodata[i])) {
                  finmodata.push(temodata[i]);

                  break;
                }
              }
            }
            // temodata - loop

            //     routecode if it exist in temproutecodelistofdocs
            //     vehSkill = routecodeec;

            vehSkill = finmodata;
            break;
          case "Tuesday":
            let temtudata = JSON.parse("[" + veh.tuesdayRC + "]");
            temtudata = moveOnesToEnd(temtudata);

            let fintudata = [];
            if (temtudata.length > 1) {
              for (let i = 0; i < temtudata.length; i++) {
                if (temproutecodelistofdocs.includes(temtudata[i])) {
                  fintudata.push(temtudata[i]);

                  break;
                }
              }
            } else {
              for (let i = 0; i < temtudata.length; i++) {
                if (temproutecodelistofdocs.includes(temtudata[i])) {
                  fintudata.push(temtudata[i]);

                  break;
                }
              }
            }

            vehSkill = fintudata;
            break;
          case "Wednesday":
            let temwedata = JSON.parse("[" + veh.wednesdayRC + "]");
            temwedata = moveOnesToEnd(temwedata);

            let finwedata = [];
            if (temwedata.length > 1) {
              for (let i = 0; i < temwedata.length; i++) {
                if (temproutecodelistofdocs.includes(temwedata[i])) {
                  finwedata.push(temwedata[i]);
                  break;
                }
              }
            } else {
              for (let i = 0; i < temwedata.length; i++) {
                if (temproutecodelistofdocs.includes(temwedata[i])) {
                  finwedata.push(temwedata[i]);
                  break;
                }
              }
            }
            vehSkill = finwedata;
            break;
          case "Thursday":
            let temthdata = JSON.parse("[" + veh.thursdayRC + "]");
            temthdata = moveOnesToEnd(temthdata);

            let finthurdata = [];

            if (temthdata.length > 1) {
              for (let i = 0; i < temthdata.length; i++) {
                if (temproutecodelistofdocs.includes(temthdata[i])) {
                  finthurdata.push(temthdata[i]);
                  break;
                }
              }
            } else {
              for (let i = 0; i < temthdata.length; i++) {
                if (temproutecodelistofdocs.includes(temthdata[i])) {
                  finthurdata.push(temthdata[i]);
                  break;
                }
              }
            }
            vehSkill = finthurdata;

            break;
          case "Friday":
            let temfrdata = JSON.parse("[" + veh.fridayRC + "]");
            // 
            temfrdata = moveOnesToEnd(temfrdata);
            let finfridata = [];

            if (temfrdata.length > 1) {
              for (let i = 0; i < temfrdata.length; i++) {
                if (temproutecodelistofdocs.includes(temfrdata[i])) {
                  finfridata.push(temfrdata[i]);
                  break;
                }
              }
            } else {
              for (let i = 0; i < temfrdata.length; i++) {
                if (temproutecodelistofdocs.includes(temfrdata[i])) {
                  finfridata.push(temfrdata[i]);
                  break;
                }
              }
            }

            vehSkill = finfridata;
            break;
        }

        

        var sflag = false;
        var prevEndTime = 0;

        for (let t = 0; t < resArr.length; t++) {
          var currtrip = resArr[t];
          if (currtrip.code === veh.codeyve) {
            sflag = true;
            var endTime = splitTimeAndConv2Sec(currtrip.endTime);
            var unloadingtime = convertHrToSec(veh.enddepotserv);
            prevEndTime = endTime + unloadingtime;
            // 
            break;
          }
        }

        // filtering vehicles based on careerType
        if (veh.bptnumType === "INTERNAL") {
          intenalVeh.push(veh);
        }

        if (veh.bptnumType === "COLLECTIONS") {
          collectionVehicle.push(veh);
        }

        if (veh.bptnumType === "EXTERNAL") {
          externalVeh.push(veh);
        }

        // 

        if (!sameVehiclesflag && !sflag) {
          Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime);
          // Veh.capacity = [veh.capacities];
          Veh.capacity = [
            parseInt(veh.capacities),
            parseInt(veh.vol),
            // , parseInt(veh.totalCases ? veh.totalCases : 0)
          ];
          Veh.id = i + 1;
          Veh.description = veh.codeyve;
          let starttime = splitTimeAndConv2Sec(veh.starttime);
          let loadingHrs = convertHrToSec(veh.startdepots);
          let stime = starttime + loadingHrs;
          // 
          let etime = splitTimeAndAddtimeAndConv2Sec(
            veh.starttime,
            veh.overtimestar
          );
          let timew = [stime, etime];
          let geo = [siteLang, siteLat];

          Veh.time_window = timew;
          Veh.start = geo;
          Veh.end = geo;
          //  var array = JSON.parse("[" + vehSkill + "]");
          Veh.skills = vehSkill;
          if (veh.maxordercnt > 0) {
            Veh.max_tasks = veh.maxordercnt;
          } else {
            Veh.max_tasks = 3;
          }
          // 
          VehList.push(Veh);
          VehEndTime = etime;
          VehStartTime = stime;
        } else if (sameVehiclesflag && sflag) {
          let starttime = prevEndTime;
          let loadingHrs = convertHrToSec(veh.startdepots);
          let stime = starttime + loadingHrs;
          // 
          // 
          let etime = splitTimeAndAddtimeAndConv2Sec(
            veh.starttime,
            veh.overtimestar
          );

          if (stime < etime) {
            Veh.id = i + 1;
            Veh.description = veh.codeyve;
            Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime);
            // Veh.capacity = [veh.capacities];
            Veh.capacity = [parseInt(veh.capacities), parseInt(veh.vol)];

            // 
            let timew = [stime, etime];
            let geo = [siteLang, siteLat];
            Veh.time_window = timew;
            Veh.start = geo;
            Veh.end = geo;
            //  var array = JSON.parse("[" + vehSkill + "]");
            Veh.skills = vehSkill;
            if (veh.maxordercnt > 0) {
              Veh.max_tasks = veh.maxordercnt;
            } else {
              Veh.max_tasks = 3;
            }

            // 
            VehList.push(Veh);
            VehEndTime = etime;
            VehStartTime = stime;
          }
        }
      }

      

      // 
      // 
      // 

      // 
      // 
      let maxDoc = this.state.defaultdocprocess;
      let docprocessedCount = 0;
      for (let j = 0; j < this.state.docsPanel.length; j++) {
        let doc = this.state.docsPanel[j];
        // 
        if (
          doc.type === "open" &&
          (doc.dlvystatus === "0" || doc.dlvystatus === "8") &&
          doc.carrier == "INTERNAL" &&
          doc.routeCodeDesc != "None"
        ) {
          var Doc = {};
          // 
          // 
          Doc.id = j + 1;
          Doc.description = doc.docnum;
          // 

          var FromArr;
          var fromflag = false;
          var toflag = false;
          if (doc.fromTime.length > 0) {
            FromArr = doc.fromTime.split(" ");
            fromflag = true;
          }
          var ToArr;
          if (doc.toTime.length > 0) {
            ToArr = doc.toTime.split(" ");
            toflag = true;
          }

          // 
          // 

          var timeWindw = [];

          fromflag &&
            FromArr.map((ft, index) => {
              var tt = [];
              // 
              tt.push(splitTimeAndConv2Sec(ft));
              // 
              tt.push(splitTimeAndConv2Sec(ToArr[index]));

              timeWindw.push(tt);
            });

          // 

          var DocLat, DocLang;
          DocLat = doc.lat;
          DocLang = doc.lng;
          Doc.location = [DocLang, DocLat];
          Doc.priority = doc.priority;
          // Doc.amount = [Math.round(doc.netweight)];
          Doc.amount = [
            parseInt(doc.netweight),
            parseInt(doc.volume),
            // , parseInt(doc.noofcases ? doc.noofcases : 0)
          ];
          // 
          // var array1 = JSON.parse("[" + doc.skills + "]");
          // var array1 = []
          //  Veh.skills = array;
          // Doc.skills = (doc.skills).split(',');
          //  Doc.skills = doc.skills;
          if (doc.skills) {
            Doc.skills = doc.skills
              .split(",")
              .map((skill) => parseInt(skill.trim(), 10));
          } else {
            Doc.skills = []; // or handle the case where skills is undefined or empty
          }
          let wtime = convertHrToSec(doc.waitingTime);
          let stime = convertHrToSec(doc.serviceTime);
          
       
          Doc.service = parseInt(wtime) + parseInt(stime);

       
          let ps,
            pe = 0;
          let ds,
            de = 0;

          if (fromflag) {
            if (timeWindw[0][0] !== 0) {
              Doc.time_windows = timeWindw;
            }
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

          // 
          DocList.push(Doc);
          docprocessedCount = docprocessedCount + 1;
        }
      }

      //process for the JSON file
      var processedData = {};
      processedData.vehicles = VehList;
      processedData.jobs = DocList;
      processedData.options = {
        g: true,
      };

      

      

      // for sending route code matched vehicles to OSRM
      let filteredVehArray = this.state.vehiclePanel.vehicles.filter((item1) =>
        VehList.some((item2) => item1.codeyve === item2.description)
      );

    

      // latest - 34.171.208.219
      // v10   - 34.134.143.219
      //new frane  - 35.193.234.153
      //34.136.15.124
      //34.132.234.177
      // US-west instance 34.95.36.63
      // tema server - http://maps.tema-systems.com:3000
      //  34.136.204.237

      fetch("http://maps.uk.tema-systems.com:3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processedData),
      })
        .then((response) => {
          
          if (response.status === 200) {
            return response.json();
          } else {
            var StatusErrorMessage = response.statusText;
            this.setState({
              errorMessage: { StatusErrorMessage },
              loader: false,
              addAlertShow: true,
            });
          }
        })
        .then((res) => {
          
          if (res.routes.length > 0) {
            
            // submit generated routes for trips creation
            this.submitRoutesforTripsCreation(
              res.routes,
              selSite,
              autoDocs,
              "",
              filteredVehArray,
              res
            );
          }

          //     if(noneDocs.length>0){
          //       let noneErr = `${noneDocs.join(", ")} are excluded because those having none route code`;
          // this.setState({
          //   errorMessage: noneErr,
          //   loader: false,
          //   addAlertShow: true,
          // });

          //     }
          else {
            let errorbox = [];

            let selectedDate = this.state.documentPanel_date;
            let DayOnDate = this.getDayOfWeek(selectedDate);

            //         autoDocs.forEach((doc) => {
            //           let glbalmissingskill = [];
            //           let tempoptiError = {
            //             docnum: "",
            //             skillerrorflg: false,
            //             skillmessage: "",
            //             capacatyflg: false,
            //             capacityError: "",
            //             generalflg: false,
            //             genearalError: "",
            //           };
            //           let glabalerrorOBject = "";

            //           let isSkillMatchFoundflg = false;
            //           let docskill = JSON.parse("[" + doc.skills + "]");
            //           let tcapacatyflg = false;
            //           let tskillflg = false;
            //           let tvolumeflg = false;
            //           let prodCodevehList = [];
            //           let routeCodeVehList = [];
            //           let timewindowVehList = [];
            //           let capacityVehList = [];
            //           let volumeVehList = [];
            //           let vehClassVehList = [];
            //           let TimewindowforDoc = [];
            //           filteredVehArray.forEach((veh) => {
            //             let missingSkillsForDoc = [];

            //               var varray="";
            // switch (DayOnDate) {
            //   case "Monday":
            //     
            //     varray= JSON.parse("[" + veh.mondayRC + "]");
            //     break;
            //   case "Tuesday":
            //     varray= JSON.parse("[" + veh.tuesdayRC + "]");
            //     
            //     break;
            //   case "Wednesday":
            //     varray= JSON.parse("[" + veh.wednesdayRC + "]");
            //     
            //     break;
            //   case "Thursday":
            //     varray= JSON.parse("[" + veh.thursdayRC + "]");
            //     
            //     break;
            //   case "Friday":
            //     varray= JSON.parse("[" + veh.fridayRC + "]");
            //     
            //     break;
            // }
            //             const missingSkills = docskill.filter(
            //               (skill) => !varray.includes(skill)
            //             );

            //             

            //             if (missingSkills.length == 0) {
            //               // If no missing skills, it's a match
            //               if (veh.capacities < doc.netweight) {
            //                 tcapacatyflg = true;
            //                 capacityVehList.push(veh.name);
            //               }
            //               // volume check
            //               if (veh.vol < doc.volume) {
            //                 tvolumeflg = true;
            //                 volumeVehList.push(veh.name);
            //               }
            //             } else {
            //               // If there are missing skills, collect them
            //               isSkillMatchFoundflg = true;
            //               missingSkillsForDoc.push(...missingSkills);
            //               glbalmissingskill.push(...missingSkills);

            //               if (veh.capacities < doc.netweight) {
            //                 tcapacatyflg = true;
            //                 capacityVehList.push(veh.name);
            //               }
            //               // volume check
            //               if (veh.vol < doc.volume) {
            //                 tvolumeflg = true;
            //                 volumeVehList.push(veh.name);
            //               }

            //               // assign the not mathced skills to the vehicle array
            //               const tempuniqueMissingSkills = [...new Set(missingSkills)];
            //               const temprouteCodeErrors = tempuniqueMissingSkills.filter(
            //                 (skill) => skill >= -1 && skill <= 100
            //               );
            //               const tempproductCategoryErrors =
            //                 tempuniqueMissingSkills.filter(
            //                   (skill) => skill > 100 && skill <= 200
            //                 );
            //               const tempvehicleClassErrors = tempuniqueMissingSkills.filter(
            //                 (skill) => skill > 200
            //               );

            //               if (temprouteCodeErrors.length > 0) {
            //                 routeCodeVehList.push(veh.name);
            //               }
            //               if (tempproductCategoryErrors.length > 0) {
            //                 prodCodevehList.push(veh.name);
            //               }
            //               if (tempvehicleClassErrors.length > 0) {
            //                 vehClassVehList.push(veh.name);
            //               }
            //             }
            //           });

            //           if (!tvolumeflg || !tcapacatyflg || !isSkillMatchFoundflg) {
            //             tempoptiError.docnum = doc.docnum;
            //             let tmsg = "";

            //             if (doc.fromTime.length > 0) {
            //               const fromTimes = this.TimeWindow_splitTime(doc.fromTime); // Split into ["0700", "0900"]
            //               const toTimes = this.TimeWindow_splitTime(doc.toTime); // Split into ["0800", "1030"]
            //               
            //               for (let i = 0; i < fromTimes.length; i++) {
            //                 TimewindowforDoc.push(`${fromTimes[i]}-${toTimes[i]}`); // Combine each pair into a time range
            //               }
            //             }
            //             

            //             
 

            //             if (vehClassVehList.length > 0) {
            //               glabalerrorOBject =
            //                 glabalerrorOBject +
            //                 `Document ${doc.docnum} has been excluded as the Customer's assigned Vehicle Class does not match of these vehicles  ${vehClassVehList}. \n`;
            //             }
            //             if (prodCodevehList.length > 0) {
            //               glabalerrorOBject =
            //                 glabalerrorOBject +
            //                 `Document ${doc.docnum} has been excluded as it contains products not matching the  vehicles' ${prodCodevehList}  product categories . \n`;
            //             }
            //             if (routeCodeVehList.length > 0) {
            //               glabalerrorOBject =
            //                 glabalerrorOBject +
            //                 `Document ${doc.docnum} has been excluded as the customer's assigned RouteCode does not match any of the vehicles ${routeCodeVehList}. \n`;
            //             }
            //             if (capacityVehList.length > 0) {
            //               glabalerrorOBject =
            //                 glabalerrorOBject +
            //                 `Document ${doc.docnum} has been excluded due to Weight Capacity restriction on the vehicles ${capacityVehList}. \n`;
            //             }
            //             if (volumeVehList.length > 0) {
            //               glabalerrorOBject =
            //                 glabalerrorOBject +
            //                 `Document ${doc.docnum} has been excluded due to Volume Capacity restriction on the  vehicles ${volumeVehList}. \n`;
            //             }
            //             // if (TimewindowforDoc.length > 0) {
            //             //   glabalerrorOBject =
            //             //     glabalerrorOBject +
            //             //     `Document ${doc.docnum} has been excluded due to Delivery Time Frame restriction (${TimewindowforDoc}) . \n`;
            //             // }

            //             if (glabalerrorOBject.length < 1) {
            //               if (TimewindowforDoc.length > 0) {
            //                 glabalerrorOBject =
            //                   glabalerrorOBject +
            //                   `Document ${doc.docnum} has been excluded due to Delivery Time Frame restriction (${TimewindowforDoc}). \n`;
            //               } else {
            //                 // 
            //                 glabalerrorOBject = `Document ${doc.docnum} has been excluded due to the vehicles weight/volume capacity was full in the current trip. \n`;
            //               }
            //             }

            //             // 
            //             glabalerrorOBject = glabalerrorOBject + "\n";
            //             // 
            //             errorbox.push(glabalerrorOBject);
            //           }
            //         });

            // Track assigned weight and volume per vehicle
            let vehicleAssignedWeight = {};
            let vehicleAssignedVolume = {};

            autoDocs.forEach((doc) => {
              let tempoptiError = {
                docnum: "",
                skillerrorflg: false,
                skillmessage: "",
                capacatyflg: false,
                capacityError: "",
                generalflg: false,
                genearalError: "",
              };

              let docskill = JSON.parse("[" + doc.skills + "]");
              let matchedVehicles = [];
              let unmatchedVehicles = [];
              let capacityFailedVehicles = new Set(); // Use Set to prevent duplicates
              let volumeFailedVehicles = new Set(); // Use Set to prevent duplicates

              filteredVehArray.forEach((veh) => {
                let varray = [];

                // 🔹 Select the correct route based on the day
                switch (DayOnDate) {
                  case "Monday":
                    varray = JSON.parse("[" + veh.mondayRC + "]");
                    break;
                  case "Tuesday":
                    varray = JSON.parse("[" + veh.tuesdayRC + "]");
                    break;
                  case "Wednesday":
                    varray = JSON.parse("[" + veh.wednesdayRC + "]");
                    break;
                  case "Thursday":
                    varray = JSON.parse("[" + veh.thursdayRC + "]");
                    break;
                  case "Friday":
                    varray = JSON.parse("[" + veh.fridayRC + "]");
                    break;
                }

                
                

                // ✅ Check if at least one skill matches
                const isSkillMatched = docskill.some((skill) =>
                  varray.includes(skill)
                );

                

                if (isSkillMatched) {
                  matchedVehicles.push(veh.name);
                } else {
                  unmatchedVehicles.push(veh.name);
                  return; // Skip further checks if skills don’t match
                }

                // 🔹 Initialize assigned weight & volume if not present
                if (!vehicleAssignedWeight[veh.name])
                  vehicleAssignedWeight[veh.name] = 0;
                if (!vehicleAssignedVolume[veh.name])
                  vehicleAssignedVolume[veh.name] = 0;

                // ✅ Calculate total assigned weight if this doc is added
                let totalWeightIfAdded =
                  vehicleAssignedWeight[veh.name] + doc.netweight;
                let totalVolumeIfAdded =
                  vehicleAssignedVolume[veh.name] + doc.volume;


                // ✅ Check if adding this document exceeds capacity
                if (totalWeightIfAdded > veh.capacities) {
                  capacityFailedVehicles.add(
                    `${veh.name} (Max Weight: ${veh.capacities})`
                  );
                } else {
                  // ✅ If within capacity, update assigned weight
                  vehicleAssignedWeight[veh.name] += doc.netweight;
                }

                // ✅ Check if adding this document exceeds volume
                if (totalVolumeIfAdded > veh.vol) {
                  volumeFailedVehicles.add(
                    `${veh.name} (Max Volume: ${veh.vol})`
                  );
                } else {
                  vehicleAssignedVolume[veh.name] += doc.volume;
                }
              });

              let errorMessagesArray = [];
   let capacityFailed = false;
      let volumeFailed = false;
              // ✅ If at least one vehicle matched skills, check weight/volume errors
              if (matchedVehicles.length > 0) {
                if (capacityFailedVehicles.size > 0) {
                  capacityFailed = true;
                  errorMessagesArray.push(
                    `${doc.docnum} excluded: Weight Capacity exceeded on: ${[
                      ...capacityFailedVehicles,
                    ].join(", ")}.`
                  );
                }
                if (volumeFailedVehicles.size > 0) {
                  volumeFailed=true;
                  errorMessagesArray.push(
                    `${doc.docnum} excluded: Volume Capacity exceeded on: ${[
                      ...volumeFailedVehicles,
                    ].join(", ")}.`
                  );
                }


                   if (!capacityFailed && !volumeFailed) {
            // 
            errorMessagesArray.push(
              `${doc.docnum} Document excluded: Could not be assigned due to travel time or distance constraints.`
            );
          }
              } else {
                // ❌ No vehicle matched, show skill mismatch error

                let previousTripUsingRC = this.state.tripsPanel.find(
                  (veh) => veh.allocatedRouteCodes == doc.routeCodeDesc
                );
                // checking if any trips are generated before for this day using this same matched route code vehicle

                if (previousTripUsingRC) {
                  errorMessagesArray.push(
                    `${doc.docnum} excluded: Trip is already generated for route code '${doc.routeCodeDesc}' using vehicle '${previousTripUsingRC.vehicleObject.name}'.`
                  );
                } else {
                  // ❌ No vehicle matched, show skill mismatch error
                  errorMessagesArray.push(
                    `${
                      doc.docnum
                    } excluded: No vehicle matched for provided Route code '${
                      doc.routeCodeDesc
                    }'. Vehicles checked: ${unmatchedVehicles.join(", ")}.`
                  );
                }
              }

              // 🔹 Push errors only if there are any
              if (errorMessagesArray.length > 0) {
                let globalErrorObject = errorMessagesArray.join("\n");
                errorbox.push(globalErrorObject);
              }
            });

            let errorMessagesArray = [];

            noneDocs.forEach((doc) => {
              errorMessagesArray.push(
                `${doc} Document excluded: None route code assigned`
              );
            });

            if (errorMessagesArray.length > 0) {
              let globalErrorObject = errorMessagesArray.join("\n");
              errorbox.push(globalErrorObject);
            }

            const finalErrorMessage = errorbox.join("\n");

            
            this.setState({
              errorArrayMessage: errorbox,
              loader: false,
              addAlertArrayShow: true,
            });
          }
        })
        .catch((err) => {
          this.setState({
            errorMessage: "No Documents are available for Trips creation",
            loader: false,
            addAlertShow: true,
          });
        });
    } else {
      this.setState({
        errorMessage: "No Documents are available for Trips creation",
        loader: false,
        addAlertShow: true,
      });
    }
  };

  submitRoutesforTripsCreation = (
    routes,
    site,
    selDocs,
    selDrivers,
    SelVehicles,
    res
  ) => {
    var RouteprocessedData = [];
    var sameProcessUsedDriversList = [];
    var TripsfromRoutes = [];
    // let seenClients = new Set();

    // 
    for (let k = 0; k < routes.length; k++) {
      var currRoute = routes[k];
      var Vehicle = {},
        Veh = routes[k].description;
      var auto_tot_travel_time = formatTime(routes[k].duration);
      var auto_total_time = (routes[k].duration + routes[k].service) / 60 / 60;
      var auto_service_time = routes[k].service / 60 / 60;
      var auto_total_distance = routes[k].distance / 1000;
      // 
      for (let i = 0; i < this.state.vehiclePanel.vehicles.length; i++) {
        if (Veh == this.state.vehiclePanel.vehicles[i].codeyve) {
          Vehicle = this.state.vehiclePanel.vehicles[i];
          break;
        }
      }

      // 
      var dropObject = [],
        pickupObject = [],
        drops = 0,
        pickups = 0;
      var startTime = "",
        endTime = "";
      var totalWeight = 0;
      var ddate = "";
      var totalVolume = 0;
      var flds_uom_volume = "";
      var flds_uom_capacity = "";
      var fld_per_capacity = 0;
      var fld_per_volume = 0;
      var fld_doc_capacity = 0;
      var fld_doc_volume = 0;
      var weight = "";
      var volume = "";
      var vol_unit = "";
      var wei_unit = "";
      var percentageMass = 0;
      var percentageVolume = 0;
      var VehicleObject = Vehicle;
      var flds_per_capacity = 0;
      var flds_doc_capacity = 0;
      var flds_per_volume = 0;
      var flds_doc_volume = 0;
      var vehobj = [];
      var itemTrip = {
        selectedTripData: [],
        matchedDocsList: [],
        timelineInterval: [],
        equipments: [],
        trailers: [],
        quantities: [],
      };
      var timelneInterval = [];
      // itemTrip.selectedTripData = GroupedObjects;
      // itemTrip.timelineInterval = [];
      itemTrip.equipments = [];
      itemTrip.trailers = [];
      itemTrip.quantities = [];
      var freqtype = false;
      var appointmentExist = false;
      var routeCodeArr1 = [];

      // loop thorugh the documents steps
      let seenClientAddress = new Set();

      for (let t = 0; t < currRoute.steps.length; t++) {
        var ttime = "";
        var currTask = currRoute.steps[t];
        
        if (currTask.type !== "start" && currTask.type !== "end") {
          var docno = currTask.description;
          // 

          for (let d = 0; d < this.state.docsPanel.length; d++) {
            var currDoc = this.state.docsPanel[d];

            let clientCode = currDoc.bpcode;

            let newStartDate1 = moment(currDoc.docdate).format("YYYY-MM-DD");

            var SelectedDoc = [];
            if (currDoc.docnum === docno) {
              if (!routeCodeArr1.includes(currDoc.routeCodeDesc)) {
                // Push valueToCompare1 into array
                routeCodeArr1.push(currDoc.routeCodeDesc);
              }
              currDoc.vehicleCode = Veh;
           
              currDoc.arrival = secondsToHmsAutoGen(currTask.arrival);
              currDoc.time = convertSecToMin(currTask.duration);
              // currDoc.distance = 0;
              currDoc.distance = currTask.distance
                ? currTask.distance / 1000
                : 0;

              
              currDoc.serTime = secondsToHmsAutoGen(currTask.service);

              const clientAddressKey = `${clientCode}_${currDoc.adrescode}`;

              if (seenClientAddress.has(clientAddressKey)) {
             

                // Already processed this client+address → no service time
                const prevDoc = itemTrip.selectedTripData.find(
                  (doc) =>
                    doc.bpcode === clientCode &&
                    doc.adrescode === currDoc.adrescode
                );

                if (prevDoc) {
                  currDoc.arrival = prevDoc.arrival;
                  currDoc.end = prevDoc.end;
                }

                currDoc.serviceTime = secondsToHmsAutoGen(0);
                currDoc.serTime = secondsToHmsAutoGen(0);
              } else {
             

                // First time → assign full service time
                seenClientAddress.add(clientAddressKey);
                currDoc.serTime = secondsToHmsAutoGen(currTask.service);
                // let diff =convertHrToSec((Number(currDoc.waitingTime)),currTask.service)
                // 
                currDoc.serviceTime = secondsToDecimalHours(
                  currTask.service - convertHrToSec(Number(currDoc.waitingTime))
                );
                currDoc.end = secondsToHmsAutoGen(
                  currTask.arrival + currTask.service
                );
              }

              currDoc.startDate = newStartDate1;
              currDoc.endDate = newStartDate1;
              ttime = currDoc.arrival;
              if (currDoc.doctype === "RETURN") {
                pickups = pickups + 1;
                currDoc.panelType = "pickup";
                pickupObject.push(currDoc);
                fld_doc_capacity = fld_doc_capacity + currDoc.netweight;
                fld_doc_volume = fld_doc_volume + currDoc.volume;
              } else {
                drops = drops + 1;
                currDoc.panelType = "drop";
                dropObject.push(currDoc);
                fld_doc_capacity = fld_doc_capacity + currDoc.netweight;
                fld_doc_volume = fld_doc_volume + currDoc.volume;
              }
              itemTrip.selectedTripData.push(currDoc);

              

              totalWeight = totalWeight + parseFloat(currDoc.netweight);
              totalVolume = totalVolume + parseFloat(currDoc.volume);
              break;
            }
          }
          //end of search task with document panel
        } // end of if, task
        else if (currTask.type === "start") {
          // 
          startTime = secondsToHms(currTask.arrival);
          ttime = startTime;
        } else if (currTask.type === "end") {
          endTime = secondsToHms(currTask.arrival);
          ttime = endTime;
          // 
        }
        //for timeline
        var index = t * 12;
        timelneInterval.push({ value: index, label: ttime });

        // 
      } // end of steps

      ddate = this.state.documentPanel_date;

      itemTrip.timelineInterval = timelneInterval;
      var TimelineInterval = VehicleObject.timelineInterval;
      var stops = pickups + drops;
      var site = VehicleObject.fcy;
      var capacity = VehicleObject.capacities;
      var fld_tot_capacity = VehicleObject.capacities;
      var fld_tot_volume = VehicleObject.vol;
      var fld_uom_capacity = VehicleObject.xweu;
      var fld_uom_volume = VehicleObject.xvol;

      // default trailer assignment
      var defaultTrailer_a = "",
        defaultTrailerCount_a = 0,
        defaultTrailerObject_a = [];
      var trailers = this.state.vehiclePanel.trails;
      if (VehicleObject.trailer === " " || VehicleObject.trailer === "") {
      } else {
        defaultTrailer_a = VehicleObject.trailer;
        defaultTrailerCount_a = defaultTrailerCount_a + 1;
        //loop thorugh all the trailers and assign

        trailers &&
          trailers.length > 0 &&
          trailers.map((trail) => {
            if (trail.trailer === VehicleObject.trailer) {
              defaultTrailerObject_a.push(trail);
              fld_tot_volume =
                parseInt(fld_tot_volume) + parseInt(trail.maxlovol);
              fld_tot_capacity =
                parseInt(fld_tot_capacity) + parseInt(trail.maxloams);
            }
          });
      }

      //end of trailer assignment

      fld_per_capacity = Math.round(
        (fld_doc_capacity / fld_tot_capacity) * 100
      );
      fld_per_volume = Math.round((fld_doc_volume / fld_tot_volume) * 100);

      var defaultDriver = "",
        defaultDrivername = "";

      // if not driver is there assign random drivers from acive drivers

      if (VehicleObject.driverid === " " || VehicleObject.driverid === "") {
        //assign some random driver from the active drivers
        var activeDrivers = this.state.vehiclePanel.drivers;
        var tempTripPanel = this.state.tripsPanel;
        var sflag = false;
        var dflag = false;

        // 
        // 

        var resArr1 = [],
          UsedDriversList = [];
        // tempTripPanel.filter(function (item) {
        //   var i = resArr1.findIndex(x => (x.code == item.code));
        //   if (i <= -1) {
        //     resArr1.push(item);
        //   }
        //   return null;
        // });

        // 
        // for (let t = 0; t < resArr1.length; t++) {
        //   var currtrip = resArr1[t];

        //   if (currtrip.driverId != "" || currtrip.driverId != null) {
        //     UsedDriversList.push(currtrip.driverId)
        //   }
        //   //same vehicle , same driver allocation
        //   if (currtrip.code === Veh) {
        //     sflag = true;
        //     if (currtrip.driverId != "" || currtrip.driverId != null) {
        //       defaultDriver = currtrip.driverid;
        //       defaultDrivername = currtrip.driverName;
        //       dflag = true;

        //       // 
        //     }
        //     break;
        //   }
        // }

        // 

        // 
        // 
        // 
        // Veh  -  vehicle
        //check already vehicle is used , and assign same driver
        //loop all the drivers list and assigned not used driver
        // if (!dflag) {
        //   // 
        //   for (let dl = 0; dl < activeDrivers.length; dl++) {
        //     // 
        //     if (UsedDriversList.length > 0) {
        //       if (!UsedDriversList.includes(activeDrivers[dl].driverid)) {
        //         // 
        //         if (sameProcessUsedDriversList.length > 0) {
        //           // 
        //           if (!sameProcessUsedDriversList.includes(activeDrivers[dl].driverid)) {
        //             // 
        //             // 
        //             defaultDriver = activeDrivers[dl].driverid;
        //             defaultDrivername = activeDrivers[dl].driver;
        //             sameProcessUsedDriversList.push(activeDrivers[dl].driverid);
        //             break;
        //           }
        //           else {
        //             // 
        //           }
        //         }
        //         else {
        //           // 
        //           defaultDriver = activeDrivers[dl].driverid;
        //           defaultDrivername = activeDrivers[dl].driver;
        //           sameProcessUsedDriversList.push(activeDrivers[dl].driverid);
        //           break;
        //         }

        //         // 
        //       }
        //     }
        //     else {
        //       // 
        //       if (sameProcessUsedDriversList.length > 0) {
        //         // 
        //         if (!sameProcessUsedDriversList.includes(activeDrivers[dl].driverid)) {
        //           // 
        //           // 
        //           defaultDriver = activeDrivers[dl].driverid;
        //           defaultDrivername = activeDrivers[dl].driver;
        //           sameProcessUsedDriversList.push(activeDrivers[dl].driverid);
        //           break;

        //         }
        //         else {
        //           // 
        //         }
        //       }
        //       else {
        //         // 
        //         defaultDriver = activeDrivers[dl].driverid;
        //         defaultDrivername = activeDrivers[dl].driver;
        //         sameProcessUsedDriversList.push(activeDrivers[dl].driverid);

        //         break;
        //       }
        //     }
        //   }
        // }
      } else {
        let tempdate = moment.tz(ddate, "");
        let dayOfWeek = tempdate.day();

        let tempdriverslist = this.state.vehiclePanel.drivers;
        let tempdefaultDriver = VehicleObject.driverid;

        tempdriverslist.map((driver) => {
          if (driver.driverid === tempdefaultDriver) {
            switch (dayOfWeek) {
              case 1:
                if (driver.mondayflg === 2) {
                  defaultDriver = driver.driverid;
                  defaultDrivername = driver.driver;
                }
                break;
              case 2:
                if (driver.tuesdayflg === 2) {
                  defaultDriver = driver.driverid;
                  defaultDrivername = driver.driver;
                }
                break;
              case 3:
                if (driver.wednesdayflg === 2) {
                  defaultDriver = driver.driverid;
                  defaultDrivername = driver.driver;
                }
                break;
              case 4:
                if (driver.thursdayflg === 2) {
                  defaultDriver = driver.driverid;
                  defaultDrivername = driver.driver;
                }
                break;
              case 5:
                if (driver.fridayflg === 2) {
                  defaultDriver = driver.driverid;
                  defaultDrivername = driver.driver;
                }
                break;
              case 6:
                if (driver.satdayflg === 2) {
                  defaultDriver = driver.driverid;
                  defaultDrivername = driver.driver;
                }
                break;
              case 7:
                if (driver.sundayflg === 2) {
                  defaultDriver = driver.driverid;
                  defaultDrivername = driver.driver;
                }
                break;
              // Add cases for Saturday and Sunday if needed
              default:
                break;
            }
          }
        });

        // 
      }
      // 
      var volume = VehicleObject.vol;
      //  var StartTime = VehicleObject.timelineInterval[0].label;

      vehobj = VehicleObject;

      var capacity = VehicleObject.capacities;
      flds_uom_capacity = VehicleObject.xweu;
      flds_uom_volume = VehicleObject.xvol;
      var dddd1 = new Date();
      let h = (dddd1.getHours() < 10 ? "0" : "") + dddd1.getHours();
      let m = (dddd1.getMinutes() < 10 ? "0" : "") + dddd1.getMinutes();
      let currtime = h + ":" + m;

      //   if (totalWeight > 0) {
      //     percentageMass = ((parseFloat(totalWeight) / parseFloat(capacity)) * 100).toFixed(1);
      //     flds_doc_capacity = parseFloat(totalWeight);
      //     flds_per_capacity = percentageMass;
      // }

      // if (totalVolume > 0) {
      //     percentageVolume = ((parseFloat(totalVolume) / parseFloat(volume)) * 100).toFixed(1);
      //     flds_doc_volume = parseFloat(totalVolume);
      //     flds_per_volume = percentageVolume;
      // }

      if (totalWeight > 0) {
        // Convert totalWeight and capacity to floating-point numbers
        let weight = parseFloat(totalWeight);
        let cap = parseFloat(capacity);

        // Calculate the percentage mass and format it to one decimal place
        percentageMass = ((weight / cap) * 100).toFixed(2);

        // Store values as floating-point numbers
        flds_doc_capacity = weight;
        flds_per_capacity = percentageMass;
      }

      if (totalVolume > 0) {
        // Convert totalVolume and volume to floating-point numbers
        let volumeVal = parseFloat(totalVolume);
        let vol = parseFloat(volume);

        // Calculate the percentage volume and format it to one decimal place
        percentageVolume = ((volumeVal / vol) * 100).toFixed(2);

        // Store values as floating-point numbers
        flds_doc_volume = volumeVal;
        flds_per_volume = percentageVolume;
      }
      totalVolume =
        totalVolume % 1 === 0
          ? totalVolume.toString() // If the number is an integer, show it without decimals
          : totalVolume.toFixed(1); // Otherwise, show it rounded to three decimal places

      totalWeight =
        totalWeight % 1 === 0 ? totalWeight.toString() : totalWeight.toFixed(1);

      var today = new Date();
      var execdate = today.getDate();
      let commaSeperated = routeCodeArr1.join(", ");

      // 

      var user = JSON.parse(localStorage.getItem("authUser"));
      var trip = {
        arrSite: site,
        code: Veh,
        date: moment.tz(ddate, "").format("YYYY-MM-DD"),
        docdate: moment.tz(ddate, "").format("YYYY-MM-DD"),
        endDate: ddate,
        depSite: site,
        freqExist: freqtype,
        appointment: appointmentExist,
        poProcessed: false,
        tot_capacity: fld_tot_capacity,
        tot_volume: fld_tot_volume,
        doc_capacity: fld_doc_capacity,
        doc_volume: fld_doc_volume,
        per_capacity: fld_per_capacity,
        per_volume: fld_per_volume,
        uom_capacity: fld_uom_capacity,
        uom_volume: fld_uom_volume,
        dlvystatus: 0,
        lvsno: null,
        credattim: new Date(),
        upddattim: new Date(),
        // datexec : new Date(),
        heuexec: currtime,
        datexec: new Date(),
        driverName: defaultDrivername,
        driverId: defaultDriver,
        generatedBy: "AutoScheduler",
        defaultDriver: "",
        trailers: defaultTrailerCount_a,
        site: site,
        equipments: 0,
        vehicleObject: vehobj,
        optistatus: "Optimized",
        capacities: capacity,
        adeptime: startTime,
        startTime: startTime,
        endTime: endTime,
        trips: 1,
        pickups: pickups,
        lock: false,
        pickupObject: pickupObject,
        dropObject: dropObject,
        totalObject: itemTrip,
        equipmentObject: [],
        trialerObject: defaultTrailerObject_a,
        drops: drops,
        stops: stops,
        startIndex: stops,
        pickUps: pickups,
        timelineInterval: TimelineInterval,
        trailerList: [],
        trailerLink: "",
        forceSeq: false,
        currDropsPanel: {
          drops: [],
          pickUps: [],
        },
        pickups: pickups,
        alldrivers: "",
        weightPercentage: percentageMass,
        volumePercentage: percentageVolume,
        totalWeight: totalWeight + " " + flds_uom_capacity,
        totalVolume: totalVolume + " " + flds_uom_volume,
        travelTime: auto_tot_travel_time,
        serviceTime: auto_service_time,
        totalTime: auto_total_time,
        totalDistance: auto_total_distance,
        fixedCost: 0,
        totalCost: 0,
        distanceCost: 0,
        regularCost: 0,
        overtimeCost: 0,
        timeCost: 0,
        driverslist: "",
        allcustomers: "",
        customerlist: "",
        allocatedRouteCodes: commaSeperated,
        xusrcode: user.username,
        loginUser: user.username,
      };

      RouteprocessedData.push(trip);
    }
    TripsfromRoutes = RouteprocessedData;

    // 
    this.ConfirmScheduledTrips(
      TripsfromRoutes,
      selDocs,
      SelVehicles,
      res,
      "auto"
    );
  };

  submitDocumentsforTripCreation = () => {
    // 
    const events = this.schedulerRef.current.scheduleObj.getCurrentViewEvents();
    var dlvyevents = [];
    var tripevents = [];
    events.forEach(function (event) {
      if (event.optistatus === "dragged") {
        dlvyevents.push(event);
      } else if (event.optistatus === "Open") {
        tripevents.push(event);
      } else {
      }
    });

    let groups = ["vehicleCode", "docdate"],
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
        var dropObject = [],
          pickupObject = [],
          drops = 0,
          pickups = 0;
        var totalWeight = 0;
        var ddate = "";
        var totalVolume = 0;
        var weight = "";
        var volume = "";
        var vol_unit = "";
        var wei_unit = "";
        var percentageMass = 0;
        var percentageVolume = 0;
        var flds_uom_volume = "";
        var flds_uom_capacity = "";
        var flds_per_volume = 0;
        var flds_per_capacity = 0;
        var flds_doc_volume = 0;
        var flds_doc_capacity = 0;
        var flds_tot_volume = 0;
        var flds_tot_capacity = 0;
        var VehicleObject = [];
        var vehobj = [];
        var itemTrip = {
          selectedTripData: [],
          timelineInterval: [],
          equipments: [],
          trailers: [],
          quantities: [],
        };
        // itemTrip.selectedTripData = GroupedObjects;
        // itemTrip.timelineInterval = [];
        itemTrip.equipments = [];
        itemTrip.trailers = [];
        itemTrip.quantities = [];
        var freqtype = false;
        var appointmentExist = false;
        var routeCodeArr = [];
console.log(GroupedObjects ,"this is groupedObjects 8146")
        GroupedObjects.forEach(function (docItem) {
console.log(docItem ,"this is docItem 8146")
          

          // Splitting routeCodeDesc into an array
          const routeCodeDescArray =
            docItem.obbject?.routeCodeDesc?.split(",") || [];

          // Iterating over each item in routeCodeDescArray
          routeCodeDescArray.forEach((item) => {
            // Checking if item is not present in externalArray
            if (!routeCodeArr.includes(item)) {
              // Adding item to externalArray
              routeCodeArr.push(item);
            }
          });

          VehicleObject = docItem.VehicleObject;
          docItem.obbject.vehicleCode = docItem.VehicleObject.codeyve;
          itemTrip.selectedTripData.push(docItem.obbject);
          if (docItem.docType === "Drop") {
            drops = drops + 1;
            docItem.obbject.panelType = "drop";
            dropObject.push(docItem.obbject);
            if (docItem.obbject.doctype === "APP") {
              appointmentExist = true;
            }
          } else {
            pickups = pickups + 1;
            docItem.obbject.panelType = "pickup";
            pickupObject.push(docItem.obbject);
            // 
            if (docItem.obbject.doctype === "FREQENCY") {
              freqtype = true;
            }
          }

          //weight calculations
          totalWeight = totalWeight + parseFloat(docItem.obbject.netweight);
          totalVolume = totalVolume + parseFloat(docItem.obbject.volume);

          ddate = docItem.docdate;
        });

        // var commaSeperated = routeCodeArr.join(", ");
        var commaSeperated = routeCodeArr.length > 0 ? routeCodeArr[0] : "";

        itemTrip.timelineInterval = VehicleObject.timelineInterval;
        var TimelineInterval = VehicleObject.timelineInterval;
        var stops = pickups + drops;
        var site = VehicleObject.fcy;
        var capacity = VehicleObject.capacities;
        flds_tot_capacity = VehicleObject.capacities;
        flds_tot_volume = VehicleObject.vol;
        flds_uom_capacity = VehicleObject.xweu;
        flds_uom_volume = VehicleObject.xvol;

        var defaultDriver = "",
          defaultDrivername = "";
        if (VehicleObject.driverid === " " || VehicleObject.driverid === "") {
        } else {
          let tempdate = moment.tz(d, "");
          let dayOfWeek = tempdate.day();

          let tempdriverslist = this.state.vehiclePanel.drivers;
          let tempdefaultDriver = VehicleObject.driverid;

          tempdriverslist.map((driver) => {
            if (driver.driverid === tempdefaultDriver) {
              switch (dayOfWeek) {
                case 1:
                  if (driver.mondayflg === 2) {
                    defaultDriver = driver.driverid;
                    defaultDrivername = driver.driver;
                  }
                  break;
                case 2:
                  if (driver.tuesdayflg === 2) {
                    defaultDriver = driver.driverid;
                    defaultDrivername = driver.driver;
                  }
                  break;
                case 3:
                  if (driver.wednesdayflg === 2) {
                    defaultDriver = driver.driverid;
                    defaultDrivername = driver.driver;
                  }
                  break;
                case 4:
                  if (driver.thursdayflg === 2) {
                    defaultDriver = driver.driverid;
                    defaultDrivername = driver.driver;
                  }
                  break;
                case 5:
                  if (driver.fridayflg === 2) {
                    defaultDriver = driver.driverid;
                    defaultDrivername = driver.driver;
                  }
                  break;
                case 6:
                  if (driver.satdayflg === 2) {
                    defaultDriver = driver.driverid;
                    defaultDrivername = driver.driver;
                  }
                  break;
                case 7:
                  if (driver.sundayflg === 2) {
                    defaultDriver = driver.driverid;
                    defaultDrivername = driver.driver;
                  }
                  break;
                // Add cases for Saturday and Sunday if needed
                default:
                  break;
              }
            }
          });
        }

        // default trailer assignment
        var defaultTrailer = "",
          defaultTrailerCount = 0,
          defaultTrailerObject = [];
        var trailers = this.state.vehiclePanel.trails;
        if (VehicleObject.trailer === " " || VehicleObject.trailer === "") {
        } else {
          defaultTrailer = VehicleObject.trailer;
          defaultTrailerCount = defaultTrailerCount + 1;
          //loop thorugh all the trailers and assign

          trailers &&
            trailers.length > 0 &&
            trailers.map((trail) => {
              if (trail.trailer === VehicleObject.trailer) {
                defaultTrailerObject.push(trail);
                flds_tot_volume =
                  parseInt(flds_tot_volume) + parseInt(trail.maxlovol);
                flds_tot_capacity =
                  parseInt(flds_tot_capacity) + parseInt(trail.maxloams);
              }
            });
        }

        //end of trailer assignment

        var volume = VehicleObject.vol;
        var StartTime = VehicleObject.timelineInterval[0].label;
        vehobj = VehicleObject;

        // accessing logged in user

        var user = JSON.parse(localStorage.getItem("authUser"));

        // if (totalWeight > 0) {
        //   percentageMass = ((parseInt(totalWeight) / parseInt(capacity)) * 100).toFixed(1);
        //   flds_doc_capacity = parseInt(totalWeight);
        //   flds_per_capacity = percentageMass;
        // }

        // if (totalVolume > 0) {
        //   percentageVolume = ((parseInt(totalVolume) / parseInt(volume)) * 100).toFixed(1);
        //   flds_doc_volume = parseInt(totalVolume);
        //   flds_per_volume = percentageVolume;
        // }
        if (totalWeight > 0) {
          // Convert totalWeight and capacity to floating-point numbers
          let weight = parseFloat(totalWeight);
          let cap = parseFloat(capacity);

          // Calculate the percentage mass and format it to one decimal place
          percentageMass = ((weight / cap) * 100).toFixed(2);

          // Store values as floating-point numbers
          flds_doc_capacity = weight;
          flds_per_capacity = percentageMass;
        }

        if (totalVolume > 0) {
          // Convert totalVolume and volume to floating-point numbers

          let volumeVal = parseFloat(totalVolume);
          let vol = parseFloat(volume);

          // Calculate the percentage volume and format it to one decimal place
          percentageVolume = ((volumeVal / vol) * 100).toFixed(2);

          // Store values as floating-point numbers
          flds_doc_volume = volumeVal;
          flds_per_volume = percentageVolume;
        }

        totalVolume =
          totalVolume % 1 === 0
            ? totalVolume.toString() // If the number is an integer, show it without decimals
            : totalVolume.toFixed(1); // Otherwise, show it rounded to three decimal places

        totalWeight =
          totalWeight % 1 === 0
            ? totalWeight.toString()
            : totalWeight.toFixed(1);
        var trip = {
          arrSite: site,
          code: x,
          date: moment.tz(d, "").format("YYYY-MM-DD"),
          docdate: moment.tz(d, "").format("YYYY-MM-DD"),
          depSite: site,
          freqExist: freqtype,
          appointment: appointmentExist,
          poProcessed: false,
          dlvystatus: 0,
          tot_capacity: flds_tot_capacity,
          tot_volume: flds_tot_volume,
          doc_capacity: flds_doc_capacity,
          doc_volume: flds_doc_volume,
          per_capacity: flds_per_capacity,
          per_volume: flds_per_volume,
          uom_capacity: flds_uom_capacity,
          uom_volume: flds_uom_volume,
          lvsno: null,
          credattim: new Date(),
          upddattim: new Date(),
          driverName: defaultDrivername,
          driverId: defaultDriver,
          generatedBy: "MScheduler",
          defaultDriver: "",
          trailers: defaultTrailerCount,
          site: site,
          equipments: 0,
          vehicleObject: vehobj,
          optistatus: "Open",
          capacities: capacity,
          startTime: StartTime,
          trips: 1,
          pickups: pickups,
          lock: false,
          pickupObject: pickupObject,
          dropObject: dropObject,
          totalObject: itemTrip,
          equipmentObject: [],
          trialerObject: defaultTrailerObject,
          drops: drops,
          stops: stops,
          startIndex: stops,
          pickUps: pickups,
          timelineInterval: TimelineInterval,
          trailerList: [],
          trailerLink: "",
          forceSeq: false,
          currDropsPanel: {
            drops: [],
            pickUps: [],
          },
          pickups: pickups,
          alldrivers: "",
          weightPercentage: percentageMass,
          volumePercentage: percentageVolume,
          totalWeight: totalWeight + " " + flds_uom_capacity,
          totalVolume: totalVolume + " " + flds_uom_volume,
          allocatedRouteCodes: commaSeperated,
          driverslist: "",
          allcustomers: "",
          customerlist: "",
          xusrcode: user.username,
        };

        processedData.push(trip);
      });
    });
    Trips = processedData;
    // 

    this.ConfirmScheduledTrips(Trips);
  };

  TimeWindow_splitTime = (timeString) => {
    // Split the timeString into individual times
    return timeString.split(" ");
  };

  timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;

    // Normalize format: insert colon if missing
    if (!timeStr.includes(":")) {
      // Make sure it's 4 digits, pad with leading zero if needed
      timeStr = timeStr.padStart(4, "0");
      timeStr = `${timeStr.slice(0, 2)}:${timeStr.slice(2)}`;
    }

    const [hours, minutes] = timeStr.split(":").map(Number);

    return hours * 60 + minutes;
  };

  normalizeTimeFormat = (timeStr) => {
    if (!timeStr) return "00:00";

    if (!timeStr.includes(":")) {
      timeStr = timeStr.padStart(4, "0"); // Ensure it's 4 digits
      timeStr = `${timeStr.slice(0, 2)}:${timeStr.slice(2)}`;
    }

    return timeStr;
  };
  // exceptional List
  Exceptionalanalysis = (
    selectedDocs,
    SelectedVehicles,
    res,
    tripsfromAuto
  ) => {
    

    
    let totalSelectedDocs = selectedDocs.length;
    let unassignedDocCount = res.unassigned.length;
    let unassignedDocs = res.unassigned;
    let trips = res.routes.length;
    let assignedDocs = totalSelectedDocs - unassignedDocCount;
    let glabalSummaryOBject = "";
    let summarybox = [];
    let noneDocs = [];
    let allDocs = this.state.docsPanel;
    let vehicleAssignedDocCount = {};

    let selVeh = SelectedVehicles;

    for (let i = 0; i < allDocs.length; i++) {
      if (
        allDocs[i].routeCodeDesc == "None" &&
        allDocs[i].carrier === "INTERNAL"
      ) {
        noneDocs.push(allDocs[i].docnum);
      }
    }

    
    let tempselDocs = [];
    unassignedDocs.map((undoc, index) => {
      for (let tempdoc of selectedDocs) {
        if (tempdoc.docnum === undoc.description) {
          tempselDocs.push(tempdoc);
          break;
        }
      }
    });

    // Initialize counts from tripsfromAuto or from previous calculation
    tripsfromAuto.forEach((trip) => {
      const vehicleCode = trip.vehicleObject.name;
      const dropCount = trip.dropObject ? trip.dropObject.length : 0;
      const pickupCount = trip.pickupObject ? trip.pickupObject.length : 0;

      vehicleAssignedDocCount[vehicleCode] = dropCount + pickupCount;
    });

    

    
    summarybox.push(
      ` ${trips} trips have been auto generated containing a total of  ${assignedDocs} documents  \n`
    );
    summarybox.push(
      `${
        unassignedDocCount + noneDocs.length
      } out of ${totalSelectedDocs} documents have been excluded from the trip auto-generation process. \n`
    );

    // summarybox.push(glabalSummaryOBject);
    // `Trips ${trips} are generated with ${assignedDocs} Documents  \n`;

    let errorbox = [];

    // 

    let selectedDate = this.state.documentPanel_date;
    let DayOnDate = this.getDayOfWeek(selectedDate);

    // specifically checking which vehicle weight exceed

    // Track assigned weight and volume per vehicle
    let vehicleAssignedWeight = {};
    let vehicleAssignedVolume = {};

    tempselDocs.forEach((doc) => {
      let tempoptiError = {
        docnum: "",
        skillerrorflg: false,
        skillmessage: "",
        capacatyflg: false,
        capacityError: "",
        generalflg: false,
        genearalError: "",
      };

      let docskill = JSON.parse("[" + doc.skills + "]");
      let matchedVehicles = [];
      let unmatchedVehicles = [];
      let capacityFailedVehicles = new Set(); // Use Set to prevent duplicates
      let volumeFailedVehicles = new Set(); // Use Set to prevent duplicates
      // let maxDistanceFailure = new Set();
      let timeWindowFailedDocuments = new Set();
      let maxOrderCountFaildedDocuments = new Set();

      selVeh.forEach((veh) => {
        let varray = [];

        // 🔹 Select the correct route based on the day
        switch (DayOnDate) {
          case "Monday":
            varray = JSON.parse("[" + veh.mondayRC + "]");
            break;
          case "Tuesday":
            varray = JSON.parse("[" + veh.tuesdayRC + "]");
            break;
          case "Wednesday":
            varray = JSON.parse("[" + veh.wednesdayRC + "]");
            break;
          case "Thursday":
            varray = JSON.parse("[" + veh.thursdayRC + "]");
            break;
          case "Friday":
            varray = JSON.parse("[" + veh.fridayRC + "]");
            break;
        }

        // 
        // 

        // ✅ Check if at least one skill matches
        const isSkillMatched = docskill.some((skill) => varray.includes(skill));

        // 

        if (isSkillMatched) {
          matchedVehicles.push(veh.name);

          const assignedCount = vehicleAssignedDocCount[veh.name] || 0;

    
          if (assignedCount >= veh.maxordercnt) {
            // Exclude document due to max order count
            maxOrderCountFaildedDocuments.add(
              `${doc.docnum} excluded: ${
                veh.name
              } has reached its max order limit of ${
                veh.maxordercnt == 0 ? 3 : veh.maxordercnt
              }.`
            );
            return; // Skip further checks for this vehicle
          }
        } else {
          unmatchedVehicles.push(veh.name);
        }
        
        // maxordercnt
        // checking time windo here
        if (doc.fromTime && doc.toTime) {
          let docTimeFrom = this.timeToMinutes(doc.fromTime);
          let docTimeTo = this.timeToMinutes(doc.toTime);

        

          let isTimeWindowMatched = tripsfromAuto.some((trip) => {
            if (!trip.startTime || !trip.endTime) return false;

            let tripStart = this.timeToMinutes(trip.startTime);
            let tripEnd = this.timeToMinutes(trip.endTime);

            

            return docTimeFrom >= tripStart && docTimeTo <= tripEnd;
          });

          if (!isTimeWindowMatched) {
            const from = this.normalizeTimeFormat(doc.fromTime);
            const to = this.normalizeTimeFormat(doc.toTime);

            timeWindowFailedDocuments.add(
              `${doc.docnum} Document excluded, Reason: Delivery time window for the customer (${from} - ${to}) does not fit within any vehicle's trip schedule.`
            );
          }
        }

      
        // CAT012501PIC00243
        // CAT012503PIC00171
        // CAT012503PIC00172
        //  checking max order count of the vehicle

        // 

        // for getting vehicle fulled weight
        const assignedWeight = tripsfromAuto
          .filter((trip) => trip.code === veh.codeyve) // Find the trip for this vehicle
          .reduce((sum, trip) => sum + Number(trip.doc_capacity), 0); // Sum assigned weights

        
        // Calculate remaining capacity
        const remainingCapacity = Number(veh.capacities) - assignedWeight;

        

        const assignedVolume = tripsfromAuto
          .filter((trip) => trip.code === veh.codeyve) // Find the trip for this vehicle
          .reduce((sum, trip) => sum + Number(trip.doc_volume), 0); // Sum assigned weights
        
        const remainingVol = veh.vol - assignedVolume;

        

        // 🔹 Initialize assigned weight & volume if not present
        if (!vehicleAssignedWeight[veh.name])
          vehicleAssignedWeight[veh.name] = 0;
        if (!vehicleAssignedVolume[veh.name])
          vehicleAssignedVolume[veh.name] = 0;

        // ✅ Calculate total assigned weight if this doc is added
        let totalWeightIfAdded =
          vehicleAssignedWeight[veh.name] + doc.netweight;
        let totalVolumeIfAdded = vehicleAssignedVolume[veh.name] + doc.volume;

        // checking distance related validation

        // if(assignedDistance)

        // ✅ Check if adding this document exceeds capacity
        if (totalWeightIfAdded > remainingCapacity) {
          capacityFailedVehicles.add(
            `${doc.docnum} Document excluded: Vehicle ${veh.name} has only ${remainingCapacity} KG remaining, which is insufficient for the required ${doc.netweight} KG.`
          );
        }
        // ✅ Check if adding this document exceeds volume
        if (totalVolumeIfAdded > remainingVol) {
          volumeFailedVehicles.add(
            `${doc.docnum} Document excluded: Vehicle ${veh.name} has only ${remainingVol} L volume capacity remaining, which is insufficient for the required ${doc.volume} L.`
          );
        } else {
          vehicleAssignedVolume[veh.name] += doc.volume;
        }
      });

      // total distance time logic

      let errorMessagesArray = [];

      // for excluding capacity volume matched docs
      let capacityFailed = false;
      let volumeFailed = false;
      let timeWindoFailed = false;

      // none documents exceptional display

      // ✅ If at least one vehicle matched skills, check weight/volume errors

      if (matchedVehicles.length > 0) {
        if (maxOrderCountFaildedDocuments.size > 0) {
          errorMessagesArray.push(...maxOrderCountFaildedDocuments);
        } else {
          if (capacityFailedVehicles.size > 0) {
            errorMessagesArray.push(...capacityFailedVehicles);
            capacityFailed = true;
          }
          if (volumeFailedVehicles.size > 0) {
            errorMessagesArray.push(...volumeFailedVehicles);
            volumeFailed = true;
          }

          if (timeWindowFailedDocuments.size > 0) {
            errorMessagesArray.push(...timeWindowFailedDocuments);
            timeWindoFailed = true;
          }

          
          if (!capacityFailed && !volumeFailed && !timeWindoFailed) {
            // 
            errorMessagesArray.push(
              `${doc.docnum} Document excluded: Could not be assigned due to travel time or distance constraints.`
            );
          }
        }
      } else {
        // ❌ No vehicle matched, show skill mismatch error

        // doc routeCodeDesc
        // veh allocatedRouteCodes

        // let previousTripUsingRC = this.state.tripsPanel.find(
        //   (veh) => veh.allocatedRouteCodes == doc.routeCodeDesc
        // );

    
        // errorMessagesArray.push(
        //   `${doc.docnum} excluded: No vehicle matched for provided Route code ${
        //     doc.routeCodeDesc
        //   }. Vehicles checked: ${unmatchedVehicles.join(", ")}.`
        // );

        let previousTripUsingRC = this.state.tripsPanel.find(
          (veh) => veh.allocatedRouteCodes == doc.routeCodeDesc
        );
        // checking if any trips are generated before for this day using this same matched route code vehicle

        if (previousTripUsingRC) {
          errorMessagesArray.push(
            `${doc.docnum} excluded: Trip is already generated for route code '${doc.routeCodeDesc}' using vehicle '${previousTripUsingRC.vehicleObject.name}'.`
          );
        } else {
          // ❌ No vehicle matched, show skill mismatch error
          errorMessagesArray.push(
            `Document ${
              doc.docnum
            } excluded: No available vehicle matches the provided route code "${
              doc.routeCodeDesc
            }" for the selected day. Vehicles evaluated: ${unmatchedVehicles.join(
              ", "
            )}.`
          );
        }
      }

      // 🔹 Push errors only if there are any
      if (errorMessagesArray.length > 0) {
        let globalErrorObject = errorMessagesArray.join("\n");
        errorbox.push(globalErrorObject);
      }
    });

    // none docs checking and pushing here
    noneDocs.forEach((docnum) => {
      const isAlreadyHandled = tempselDocs.some((doc) => doc.docnum === docnum);
      if (!isAlreadyHandled) {
        errorbox.push(`${docnum} Document excluded: None route code assigned`);
      }
    });

    

    //   errorbox.push(glabalerrorOBject);

    const finalErrorMessage = errorbox.join("\n");

    this.setState({
      errorArrayMessage: errorbox,
      errorSummartMessage: summarybox,
      loader: false,
      addAlertSummaryShow: true,
    });
  };

  ConfirmScheduledTrips = (trips, selDocs, SelVeh, res, from) => {

    this.setState({ loader: true });
    fetch(`${apiUrl}/api/v1/transport/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trips),
    })
      .then((response) => {
        // 
        this.handleErrors(response);
        this.fetchDocumentPanelDateChange(this.state.documentPanel_date);
      })
      .then(() => {
        this.setState({
          loader: false,
          checkedTrip: false,
          isDetail: false,
          checkedDoccs: [],
          // firstMatchedRouteCodeDesc: {},
          // tuesdayMatchecRouteCodeDesc: {},
          // wednesdayMatchedRouteCodeDesc: {},
          // thursdayMatchedRouteCodeDesc: {},
          // fridayMatchedRouteCodeDesc: {}
        });
        this.notifySucess("Trip Added/Updated Sucessfully");

        if (from === "auto") {
          
          this.Exceptionalanalysis(selDocs, SelVeh, res, trips);
        }
      })
      .catch((error) => {
        
        this.handleDateRangeChange();
        this.setState({ loader: false });
        this.notifyError(
          "Please add proper trip to add or update, with vehicle, drops and pickups"
        );
      });
  };

  updatePOPreReceiptDocs = (trip) => {
    var trips = trip;
    // trips.push(trip);
    fetch(`${apiUrl}/api/v1/transport/freq/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trips),
    })
      .then((response) => {
        // 
        this.handleErrors(response);
      })
      .then(function (response) {})
      .then(() => {
        // 
        this.handleDateRangeChange();
      })
      .then(() => {
        this.setState({ loading: false, checkedTrip: false, isDetail: false });
        this.notifySucess(" PO & PreReceipt Data update Sucessfully");
      })
      .catch((error) => {
        this.handleDateRangeChange();
        this.setState({ loading: false });
        this.notifyError(
          "Please add proper trip to add or update, with vehicle, drops and pickups"
        );
      });
  };

  reloadTrips = () => {
    const currDate = moment.tz(this.state.date, "").format("YYYY-MM-DD");
    let value = this.state.selectedMultipleSites;
    fetchTrips(value, currDate)
      .then(([res1]) => {
        this.setState({
          tripsPanel: res1,
        });
      })
      .then(() => {
        this.changeDate(0, false, "buttons");
      });
  };

  setUpdatedGeoData = (newData) => {
    this.setState({
      geoData: newData,
    });
  };

  deleteTrip = (trips, index) => {
    var tripsPanel = this.state.tripsPanel;
    tripsPanel[index].lock = true;
    const currDate = moment.tz(this.state.date, "").format("YYYY-MM-DD");
    let value = this.state.selectedMultipleSites;
    fetch(`${apiUrl}/api/v1/transport/delete/trip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trips),
    }).then((response) => {
      // this.reloadTrips();
      //  this.handlePanelsUpdate(currDate);
      this.fetchDocumentPanelDateChange(this.state.documentPanel_date);
      this.notifySucess("Trip deleted Sucessfully");
      // this.onRouteoptihide();
    });
  };
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
      tripsPanel: tripsPan,
    });
  };

  getRouteSchedulerApp = (
    routesSchedule,
    optimisedindex,
    auto,
    from,
    Tripsdata,
    SelectedI
  ) => {
    var data = [];
    var newGeoData = [];
    if (auto) {
      var tempoptimisedIndex = [];
      var tempGeoData;
      //map
      const tempdata = optimisedindex.map((order, index) => {
        for (var i = 0; i < order.length; i++) {
          tempoptimisedIndex.push(order[i].optimizedIndex);
        }
      });
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
            data = { ...geo, ...route };
            matched = true;
          }
        });
        if (matched === true) {
          newGeoData.push(data);
        }
      });
    } else {
      // 
      var data = [];
      var GeoData1 = [];

      if (from === "Trips") {
        this.updateonlyTripsPanel(SelectedI);
        var selectedTrips = Tripsdata.totalObject.selectedTripData;
        routesSchedule.trips.timelineInterval =
          Tripsdata.totalObject.timelineInterval;
        // 
        for (var i = 0; i < selectedTrips.length; i++) {
          GeoData1.push(selectedTrips[i]);
        }
        GeoData1.map((geo, geoIndex) => {
          routesSchedule.routesData.map((route, routeIndex) => {
            if (geoIndex === routeIndex) {
              data = { ...geo, ...route };
            }
          });
          newGeoData.push(data);
        });
      } else {
        // 
        this.state.geoData.map((geo, geoIndex) => {
          routesSchedule.routesData.map((route, routeIndex) => {
            if (geoIndex === routeIndex) {
              data = { ...geo, ...route };
            }
          });
          newGeoData.push(data);
        });
      }
    }
    // 
    this.setState({ geoData: newGeoData });
    this.setState({ routeSchedulerTime: routesSchedule });
    this.confirmTrip(routesSchedule.trips, "route", routesSchedule, newGeoData);
  };

  notifySucess = (message) => toast.success(message, { autoClose: 3000 });

  notifyError = (message) => toast.error(message, { autoClose: 3000 });

  render() {
    let filteredVeh = this.state.vehiclePanel.vehicles.filter((vehicle) => {
      return vehicle.bptnumType == "INTERNAL";
    });

   
    // console.log(this.state.docsPanel , "this is docs panel state where will get all the documents"); 

    // 

    let optionItems = [];
    let addAlertClose = () => this.setState({ addAlertShow: false });
    let addAlertArrayClose = () => this.setState({ addAlertArrayShow: false });
    let addAlertSummaryClose = () =>
      this.setState({ addAlertSummaryShow: false });
    var optionSelected = {};
    var selectedSite = {};
    var placeHolder = "All";

    this.state.sites &&
      this.state.sites.length > 0 &&
      this.state.sites.map((site) => {
        /*
         if(site.id == this.selectedSite.id) {
             selectedSite = site;
             placeHolder = site.value;
             optionSelected.value = site.id;
             optionSelected.label = (site.value + "(" + site.id + ")");
         }
         */
        optionItems.push({
          value: site.id,
          label: site.value + "(" + site.id + ")",
        });
      });
    const { sites } = this.state;

    let siteDetails = {};

    if (this.state.markers && this.state.markers[0]) {
      this.state.sites &&
        this.state.sites.map((site) => {
          if (site.id === this.state.markers[0].id) {
            siteDetails = { lat: site.lat, lng: site.lng };
          }
        });
    } else if (this.state.bl_markers && this.state.bl_markers[0]) {
      this.state.sites &&
        this.state.sites.map((site) => {
          if (site.id === this.state.bl_markers[0].id) {
            siteDetails = { lat: site.lat, lng: site.lng };
          }
        });
    }

    // 

    // 

    return (
      <React.Fragment>
        <div className="page-content pb-0">
          <ToastContainer />
          <Container fluid>
            <LoadingOverlay
              active={this.state.loader}
              spinner
              text="Loading Please wait..."
            >
              <section style={{ display: this.state.vehicleShow }}>
                <Row className="">
                  <Col xs="12">
                    <Row>
                      <MiniWidgets topDetails={this.state.topDetails} />
                    </Row>
                  </Col>
                </Row>
              </section>

              <SideNav_Test
                updateselectedRCode={this.updateselectedRCode}
                ClearRouteCodes={this.ClearRouteCodes}
                selectedRCode={this.state.selectedRCode}
                sites={this.state.sites}
                documentPanel_dateflg={this.state.documentPanel_dateflg}
                routecodes={this.state.RouteCode}
                searchSite={this.state.searchSiteString}
                selectedSite={this.state.selectedSiteValue}
                selectedSitesArr={this.state.selectedSitesArr}
                handleSiteChange={this.handleSiteChange}
                handleRouteCodeChange={this.handleRouteCodeChange}
                sitesArr={this.sitesArr}
                RouteCodeArr={this.RouteCodeArr}
                selectedRouteCodeArr={this.state.selectedRouteCodeArr}
                VehicleCodeArr={this.VehicleCodeArr}
                handleVehicleCodeChange={this.handleVehicleCodeChange}
                selectedVehicleCodeArr={this.state.selectedVehicleCodeArr}
                groupOptmiseTrips={this.groupOptmiseTrips}
                selectedDate={this.state.date}
                SelectedGroupBy={this.state.SelectedGroupBy}
                handleDateChange={this.handleDateChange}
                onVRhide={this.onVRhide}
                OncheckedSameVehicles={this.OncheckedSameVehicles}
                samevehicleChecked={this.state.checkedsameVehicles}
                onDocProcessChange={this.onDocProcessChange}
                defaultprocessDocs={this.state.defaultdocprocess}
                daysDoc={this.state.daysDoc}
                ondaysDocChange={this.ondaysDocChange}
                vrShow={this.state.vrShow}
                toPickdetailsShow={this.state.toPickdetailsShow}
                toAllocationdetailsShow={this.state.toAllocationdetailsShow}
                vehicleShow={this.state.vehicleShow}
                schedulerShow={this.state.schedulerShow}
                submitDocumentsforTripCreation={
                  this.submitDocumentsforTripCreation
                }
                autoGenerateTrips={this.autoGenerateTrips}
                autoResetTrips={this.autoResetTrips}
                GrouplockTrips={this.GrouplockTrips}
                grouplockTrips={this.grouplockTrips}
                RouteoptiShow={this.state.RouteoptiShow}
                onValidateAll={this.onValidateAll}
                guageTrip={this.state.guageTrip}
                vehiclePanel={this.state.vehiclePanel}
                vehicles={this.state.vehiclePanel.vehicles}
                getValuestoApp={(routesSchedule, optiindex, auto) =>
                  this.getRouteSchedulerApp(
                    routesSchedule,
                    optiindex,
                    auto,
                    "AutoOps"
                  )
                }
                tripsPanel={this.state.tripsPanel}
                refreshAllPanels={this.refreshAllPanels}
                handleDateRangeChange={this.handleDateRangeChange}
              ></SideNav_Test>

              <section style={{ display: this.state.RouteoptiShow }}>
                <Row className="mt-3">
                  <Col md="12">
                    <VehiclePanel
                      curVehiclePanel={this.state.vehiclePanel}
                      handleDragStart={this.handleDragStart}
                      allAllowedDrivers={this.state.allAllowedDrivers}
                      vehicleDropped={this.state.vehicleDropped}
                      allowedDrivers={this.state.allowedDrivers}
                      allowedTrailers={this.state.allowedTrailers}
                      allAllowedTrailers={this.state.allAllowedTrailers}
                      searchVeh={this.state.searchVString}
                      searchTra={this.state.searchTString}
                      searchEqu={this.state.searchEString}
                      searchDrv={this.state.searchDString}
                      updateVehSearchTerm={this.updateVehSearchTerm}
                      updateTrailSearchTerm={this.updateTrailSearchTerm}
                      updateDriverSearchTerm={this.updateDriverSearchTerm}
                      updateEquSearchTerm={this.updateEquSearchTerm}
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
                  <Col md="12">
                    <AddUpdateTrip1
                      closeActivePanel={this.closeActivePanel}
                      isDragged={this.state.isDragged}
                      onRouteoptihide={this.onRouteoptihide}
                      dataTransfer={this.state.dataTransfer}
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
                      toggleDetail={this.toggleDetail}
                      trailers={this.state.trailers}
                      equipments={this.state.equipments}
                      geoData={this.state.geoData}
                      setUpdatedGeoData={this.setUpdatedGeoData}
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
                      colourDocDivs={this.colourDocDivs}
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
                      data={this.state.guageTrip}
                      clearTrailers={this.clearTrailers}
                      enableDivs={this.enableDivs}
                      updateGeoLocations={this.updateGeoLocations}
                      vehiclePanel={this.state.vehiclePanel}
                      getValues={(routesSchedule, optiindex, auto) =>
                        this.getRouteSchedulerApp(
                          routesSchedule,
                          optiindex,
                          auto,
                          "Timeline"
                        )
                      }
                      pickersList={this.state.pickersList}
                    />
                  </Col>
                </Row>
              </section>

              <section style={{ display: this.state.vehicleShow }}>
                <Row className="mt-3">
                  <Col md="12">
                    <DocumentsPanel
                      routeCodes={this.state.RouteCode}
                      fetchDocumentPanelDateChange={
                        this.fetchDocumentPanelDateChange
                      }
                      currentView={this.state.currentViewCheck}
                      deleteTripDocNo={this.state.docnoRemoveTrip}
                      selectedTripData={this.state.selectedTripData}
                      checkedToPlan={this.checkedToPlan}
                      dropsPanel={this.state.docsPanel}
                      deliverySite={this.state.deliverySite}
                      handleDragStart={this.handleDragStart}
                      Nonvalidate={this.Nonvalidate}
                      documentPanel_dateflg={this.state.documentPanel_dateflg}
                      documentPanel_5dayscheck={
                        this.state.documentPanel_5dayscheck
                      }
                      documentPanel_date={this.state.documentPanel_date}
                      documentPanelDateChange={this.documentPanelDateChange}
                      selectedRouteCodeArr={this.state.selectedRouteCodeArr}
                      sortDrop={this.sortDrop}
                      dropOrder={this.state.dropOrder}
                      selectedDate={this.state.dropDate}
                      updateDropSearchTerm={this.updateDropSearchTerm}
                      updateTripsSearchTerm={this.updateTripsSearchTerm}
                      searchDrp={this.state.searchDrpString}
                      searchTrip={this.state.searchTripString}
                      tripsList={this.state.tripsPanel}
                      vehiclePanel={this.state.vehiclePanel}
                      updateTripsGeoLocations={this.updateTripsGeoLocations}
                      updateDocsGeoLocations={this.updateDocsGeoLocations}
                      onVRClick={this.onVRClick}
                      updateTripsGeolocationbeforelock={
                        this.updateTripsGeolocationbeforelock
                      }
                      onLockRecord={this.onLockRecord}
                      validate={this.validate}
                      onCompleteTripDelete={this.onCompleteTripDelete}
                      onWarningAlertOff={this.onWarningAlertOff}
                      onLockRecord={this.onLockRecord}
                      date={this.state.date}
                      selectAllTripsPanel={this.selectAllTripsPanel}
                      routeSchedulerData={this.state.routeSchedulerTime}
                      UnlockConfirmTrip={this.UnlockConfirmTrip}
                      OptimiseConfirmTrip={this.OptimiseConfirmTrip}
                      onValidateAll={this.onValidateAll}
                      onloaderMsg={this.onLoadermessage}
                      onForceseq={this.onForcesequnceCheck}
                      OnCheckedToLock={this.OncheckedToLock}
                      daysCheckedIn={this.state.daysCheckedIn}
                      checked5daysfromDocumentPanel={
                        this.checked5daysfromDocumentPanel
                      }
                      OnCheckedToOpen={this.OnCheckedToOpen}
                      OnCheckedToOptimise={this.OnCheckedToOptimise}
                      OnCheckedToValidate={this.OnCheckedToValidate}
                      OncheckedTodropList={this.OncheckedTodropList}
                      OncheckedToPickupList={this.OncheckedToPickupList}
                      OnCheckedToShowoverMap={this.OnCheckedToShowoverMap}
                      refreshDocspanel={this.refreshDocspanel}
                      sites={this.state.sites}
                      selectedSite={this.Timeline_SelectedSite}
                      getValues={(
                        routesSchedule,
                        optiindex,
                        auto,
                        data,
                        selectedI
                      ) =>
                        this.getRouteSchedulerApp(
                          routesSchedule,
                          optiindex,
                          auto,
                          "Trips",
                          data,
                          selectedI
                        )
                      }
                      onTripDelete={this.onTripDelete}
                      pickersList={this.state.pickersList}
                      currDropsPanel={this.state.docsPanel}
                      selectedDocs={this.state.selectedDocs}
                    />
                  </Col>
                  <Col md="12" className="mt-3">
                    <div
                      style={{
                        display:
                          this.state.tripsChecked === undefined ||
                          this.state.tripsChecked.length === 0
                            ? "none"
                            : "block",
                      }}
                    >
                      <RouteMap1
                        routeCodes={this.state.RouteCode}
                        fetchDocumentPanelDateChange={
                          this.fetchDocumentPanelDateChange
                        }
                        documentPanel_date={this.state.documentPanel_date}
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
                        pickersList={this.state.pickersList}
                      />
                    </div>
                  </Col>
                </Row>
                {/* <div className="gap" style={{ height: "50px" }}>
                </div> */}
              </section>

              <section style={{ display: this.state.schedulerShow }}>
                <Row>
                  {/* <Col md="12"> */}
                  <ScheduleTrips
                    ref={this.schedulerRef}
                    currentView={this.state.currentView}
                    setcurrentView={this.setcurrentView}
                    documentPanel_date={this.state.documentPanel_date}
                    documentPanelDateChange={this.documentPanelDateChange}
                    setDocumentPanelDate={this.setDocumentPanelDate}
                    SelectedGroupBy={this.state.SelectedGroupBy}
                    handleDateRangeChange={this.handleDateRangeChange}
                    selectedDate={this.state.date}
                    selectedRouteCodeArr={this.state.selectedRouteCodeArr}
                    selectedSite={this.state.selectedSite}
                    vehiclePanel={this.state.vehiclePanel}
                    disableDivs={this.disableDivs}
                    filterVehicleflg={this.state.filterVehicleflg}
                    selectedVehicleCodeArr={this.state.selectedVehicleCodeArr}
                    vehicles={this.state.vehiclePanel.vehicles}
                    drivers={this.state.vehiclePanel.drivers}
                    dropsPanel={this.state.docsPanel}
                    onTripCreationwithDoc={this.onTripCreationwithDoc}
                    SelectedDocumentEvent={this.SelectedDocumentEvent}
                    selectedDocumentList={this.state.selectedDocumentList}
                    firstMatchedRouteCodeDesc={
                      this.state.firstMatchedRouteCodeDesc
                    }
                    tuesdayMatchecRouteCodeDesc={
                      this.state.tuesdayMatchecRouteCodeDesc
                    }
                    wednesdayMatchedRouteCodeDesc={
                      this.state.wednesdayMatchedRouteCodeDesc
                    }
                    thursdayMatchedRouteCodeDesc={
                      this.state.thursdayMatchedRouteCodeDesc
                    }
                    fridayMatchedRouteCodeDesc={
                      this.state.fridayMatchedRouteCodeDesc
                    }
                    setFirstMatchedRouteCodeDesc={
                      this.setFirstMatchedRouteCodeDesc
                    }
                    setTuesdayMatchecRouteCodeDesc={
                      this.setTuesdayMatchecRouteCodeDesc
                    }
                    setWednesdayMatchedRouteCodeDesc={
                      this.setWednesdayMatchedRouteCodeDesc
                    }
                    setThursdayMatchedRouteCodeDesc={
                      this.setThursdayMatchedRouteCodeDesc
                    }
                    setFridayMatchedRouteCodeDesc={
                      this.setFridayMatchedRouteCodeDesc
                    }
                    selectedDocs={this.state.selectedDocs}
                    checkedDoccs={this.state.checkedDoccs}
                    removeDocsCheckBoxes={this.removeDocsCheckBoxes}
                  />

                  {/* </Col> */}
                </Row>
              </section>

              <section style={{ display: this.state.toPickdetailsShow }}>
                <Row className="mt-3">
                  <Col xs="12">
                    <LVSToPickTabs
                      toPickDataList={this.state.toPickDataList}
                      vrdata={this.state.vrlist}
                      onHideToPickLVSShow={this.onHideToPickLVSShow}
                    />
                  </Col>
                </Row>
              </section>

              <section style={{ display: this.state.toAllocationdetailsShow }}>
                <Row className="mt-3">
                  <Col xs="12">
                    <LVSToAllocationTabs
                      toPickDataList={this.state.toAllocationDataList}
                      toStaggingLocationList={this.state.toStaggingLocationList}
                      toStaggingLocationList2={
                        this.state.toStaggingLocationList2
                      }
                      vrdata={this.state.vrlist}
                      onHideToPickLVSShow={this.onHideToPickLVSShow}
                      OnChangeFromStagginLocation={
                        this.OnChangeFromStagginLocation
                      }
                      OnChangeToStagginLocation={this.OnChangeToStagginLocation}
                      OnChangeFromStagginLocation2={
                        this.OnChangeFromStagginLocation2
                      }
                      OnChangeToStagginLocation2={
                        this.OnChangeToStagginLocation2
                      }
                      StaggingFromLoc={this.state.StaggingFromLoc}
                      StaggingFromLocIndex={this.state.StaggingFromLocIndex}
                      StaggingToLoc={this.state.StaggingToLoc}
                      StaggingToLocIndex={this.state.StaggingToLocIndex}
                      StaggingFromLoc2={this.state.StaggingFromLoc2}
                      StaggingFromLoc2Index={this.state.StaggingFromLoc2Index}
                      StaggingToLoc2={this.state.StaggingToLoc2}
                      StaggingToLoc2Index={this.state.StaggingToLoc2Index}
                      getDatabyStaggingLocations={
                        this.getDatabyStaggingLocations
                      }
                      SubmitforAllocation={this.SubmitforAllocation}
                      getLotDetailsbyProdSite={this.getLotDetailsbyProdSite}
                      toLogDataList={this.state.toLogDataList}
                      CloseLotdetails={this.CloseLotdetails}
                    />
                  </Col>
                </Row>
              </section>

              <section style={{ display: this.state.vrShow }}>
                <Row className="mt-3">
                  <Col xs="12">
                    <VrHeader
                      vrdata={this.state.vrlist}
                      selectedVrIndex={this.state.selectedVrIndex}
                      selectedVrValidated={this.state.selectedVrValidated}
                      validate={this.validate}
                      validateonly={this.validateonly}
                      loadvehstck={this.state.loadvehstock}
                      pickTicketflg={this.state.IsPickTicket}
                      onlyReceiptflg={this.state.onlyReceiptflg}
                      tripdetails={this.state.clickedTrips}
                      confirmLVSbyCode={this.confirmLVSbyCode}
                      ToPickDatafromVR={this.ToPickDatafromVR}
                      toPickDataList={this.state.toPickDataList}
                      ToAllocationGetDatafromVR={this.ToAllocationGetDatafromVR}
                      toAllocationDataList={this.state.toAllocationDataList}
                      SubmitforAllocation={this.SubmitforAllocation}
                      getLotInfoBySiteByProd={this.getLotInfoBySiteByProd}
                      vehiclePanel={this.state.vehiclePanel}
                    />
                  </Col>
                  <Col lg="12">
                    <VrStops3
                      vedetail={this.state.vrdetaillist}
                      tripdetails={this.state.clickedTrips}
                      sites={this.state.sites}
                      geoData={this.state.geoData}
                      vehiclePanel={this.state.vehiclePanel}
                    />
                  </Col>
                  <Col lg="12">
                    <IndividualRouteMap2
                      vrdata={this.state.vrlist}
                      markers={this.state.markers}
                      tripsList={this.state.tripsPanel}
                      siteDetails={siteDetails}
                      sites={this.state.sites}
                      bl_tripsList={this.state.bl_tripsList}
                      bl_markers={this.state.bl_markers}
                      triplock={this.state.triplock}
                    />
                  </Col>

                  <Col lg="12">
                    <VrTotals
                      vrdata={this.state.vrlist}
                      vedetail={this.state.vrdetaillist}
                      tripdetails={this.state.clickedTrips}
                      sites={this.state.sites}
                    />
                  </Col>
                </Row>
              </section>
              {/* <IdleTimerContainer></IdleTimerContainer> */}
            </LoadingOverlay>
          </Container>
          <div
            className={`detail-sidebar ${this.state.isDetail ? "open" : ""}`}
          >
            <Timeline
              sites={this.state.sites}
              date={moment.tz(this.state.date, "").format("YYYY-MM-DD")}
              RouteoptiShow={this.state.RouteoptiShow}
              data={this.state.guageTrip}
              selectedSite={this.Timeline_SelectedSite}
              vehiclePanel={this.state.vehiclePanel}
              getValues={(routesSchedule, optiindex, auto) =>
                this.getRouteSchedulerApp(
                  routesSchedule,
                  optiindex,
                  auto,
                  "Timeline"
                )
              }
              tripsPanel={this.state.tripsPanel}
              toggleDetail={this.toggleDetail}
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

        <AlertSummary
          show={this.state.addAlertSummaryShow}
          onHide={addAlertSummaryClose}
          errorArrayMessage={this.state.errorArrayMessage}
          errorSummartMessage={this.state.errorSummartMessage}
        ></AlertSummary>
        <AlertArray
          show={this.state.addAlertArrayShow}
          onHide={addAlertArrayClose}
          errorArrayMessage={this.state.errorArrayMessage}
        ></AlertArray>
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
