import { render } from "react-dom";
import {
  convertHrToSec,
  formatTime,
  formatHHMM,
  splitTime,
  convertHrToMin,
} from "../converterFunctions/converterFunctions";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import React, { Component } from "react";
import moment from "moment";
import FiberNewIcon from "@mui/icons-material/FiberNew";
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import StartIcon from "@mui/icons-material/Start";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import RedoIcon from "@mui/icons-material/Redo";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ConfirmRouteCode from "./ConfirmRouteCode";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "../dashboard.scss";
import DisplayInformationIconDetails1 from "./DisplayInformationIconDetails1";
import {
  ScheduleComponent,
  ResourcesDirective,
  CellClickEventArgs,
  ResourceDirective,
  ViewsDirective,
  ViewDirective,
  Inject,
  TimelineViews,
  Resize,
  DragAndDrop,
  TimelineMonth,
} from "@syncfusion/ej2-react-schedule";
import EditorTemp from "./EditorTemp.js";
import {
  TreeViewComponent,
  DragAndDropEventArgs,
} from "@syncfusion/ej2-react-navigations";
import dataSource from "./datasource.js";
import {
  extend,
  Draggable,
  Droppable,
  loadCldr,
  L10n,
} from "@syncfusion/ej2-base";
import Confirm from "./Confirm";
import Alert from "./Alert";
import * as numberingSystems from "./Jsonfile/numberingSystems.json";
import * as gregorian from "./Jsonfile/ca-gregorian.json";
import * as numbers from "./Jsonfile/numbers.json";
import * as timeZoneNames from "./Jsonfile/timeZoneNames.json";
import locale from "./Jsonfile/locale.json";
import Tooltip from "@mui/material/Tooltip";
import ConfirmOtherRC from "./ConfirmOtherRC.js";
/**
 * schedule resources group-editing sample
 */
loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);
L10n.load(locale);

const isEmpty = (obj) =>
  Object.entries(obj).length === 0 && obj.constructor === Object;

class ExternalDragDrop extends Component {
  constructor(props) {
    super(props);
    this.dragOver = this.dragOver.bind(this);
    this.scheduleObj = this.props.ref;
    this.drop = this.drop.bind(this);
    this.state = {
      currentView: "TimelineDay", // Initialize with the default view
      addRouteCodeConfirmShow: false,
      addotherRCConfirmShow: false,
      isTreeItemDropped: false,
      draggedItemId: "",
      selectedDate: props.documentPanel_date,
      showEditorTemplate: false,
      EditorData: "",
      addInfoShow: false,
      speciality: "",
      clickedVeh: "",
      addConfirmShow: false,
      droppedData: [],
      droppedIndex: 0,
      addAlertShow: false,
      errorMessage: "",
      errorType: "",
      error: false,
      firstMatchedRouteCodeDesc: "",
      droppedCellData: {},
      droppedEvent: {},
      confirmMessage: "",
      EventDraggedData: "",
      dayOfWeek: "",
      data: dataSource.hospitalData,

      driverData: [
        {
          Text: "OLIVIER LE HO",
          Id: 1,
          GroupId: 1,
          Color: "#5664d2",
          Designation: "1104",
        },
        {
          Text: "CHRISTIAN LEMEE",
          Id: 2,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "1124",
        },
        {
          Text: "SYLVAIN LE GUEVOUT",
          Id: 3,
          GroupId: 1,
          Color: "#5664d2",
          Designation: "1578",
        },
        {
          Text: "OLLIVAUX HERVE",
          Id: 4,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "1025",
        },
        {
          Text: "LAURENT NEVO",
          Id: 5,
          GroupId: 1,
          Color: "#5664d2",
          Designation: "2452",
        },
        {
          Text: "Henry",
          Id: 6,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "1489",
        },
        {
          Text: "LE MEE CHRISTIAN",
          Id: 7,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "1921",
        },
      ],

      consultantData: [
        {
          Text: "GFP885D0P",
          Id: 1,
          GroupId: 1,
          Color: "#5664d2",
          Designation: "FP885DP",
        },
        {
          Text: "FP885DPGY",
          Id: 2,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "FP-885-DPWE",
        },
        {
          Text: "RTY675E43",
          Id: 3,
          GroupId: 1,
          Color: "#5664d2",
          Designation: "RTY675E4312",
        },
        {
          Text: "FP885DP02",
          Id: 4,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "FP-885-DPWE02",
        },
        {
          Text: "KAKV06",
          Id: 5,
          GroupId: 1,
          Color: "#5664d2",
          Designation: "KAKV06",
        },
        {
          Text: "V00001",
          Id: 6,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "EL-719-WFRP1",
        },
        {
          Text: "V00002",
          Id: 7,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "EL-719-WFRP1",
        },
      ],
    };
    this.cellData = null;
  }

  getConsultantName(value) {
    return (
      <span
        style={{ cursor: "pointer" }}
        onClick={() => this.onInfoClick(value)}
      >
        {value.resourceData[value.resource.textField]}
      </span>
    );
  }
  getConsultantImage(value) {
    if (this.props.SelectedGroupBy === "Vehicles") return "truck";
    else return "driver";
  }

  // for displaying details screen of particular pick ticket
  showModal = (e) => {
    // 
    this.setState({
      // showEditorTemplate: true,
      // EditorData: e,
    });
  };

  hideModal = (e) => {
    this.setState({ showEditorTemplate: false });
  };

  onConfirmNo = () => {
    this.setState({
      addConfirmShow: false,
    });
  };

  onConfirmYes = () => {
    //this.props.onTripCreationwithDoc(this.state.EventDraggedData);
    // this.draggingProcessedFurtherForRouteCode(this.state.droppedData, this.state.droppedEvent, this.state.droppedIndex, this.state.droppedCellData);
    this.draggingProcessedFurther(
      this.state.droppedData,
      this.state.droppedEvent,
      this.state.droppedIndex,
      this.state.droppedCellData
    );

    this.setState({
      addConfirmShow: false,
    });
  };

  onRouteCodeConfirmNo = () => {
    this.setState({
      addRouteCodeConfirmShow: false,
    });
  };

  onRouteCodeConfirmYes = () => {
    //this.props.onTripCreationwithDoc(this.state.EventDraggedData);
 
    this.setState({
      addRouteCodeConfirmShow: false,
    });
  };

  onOtherRCConfirm = (confirm) => {
    // this.draggingProcessedFurther(
    //   this.state.droppedData,
    //   this.state.droppedEvent,
    //   this.state.droppedIndex,
    //   this.state.droppedCellData
    // );

    const { droppedData, droppedEvent, droppedIndex, droppedCellData } =
      this.state;

    // window.alert("Clicked on yes after if RC not there" + confirm)
    let tempresourceDetails = this.scheduleObj.getResourcesByIndex(
      droppedCellData.groupIndex
    );
    let tempresourceData = tempresourceDetails.resourceData;

    // monday popup confimation if day is monday then this will execute
    if (this.state.dayOfWeek == "Monday") {
      // this.draggingProcessedFurther(data, event, index, cellData);
      // 
      if (!this.props.firstMatchedRouteCodeDesc) {
        // this.setState({
        //   firstMatchedRouteCodeDesc : data.routeCodeDesc
        // })

        // 
        this.props.setFirstMatchedRouteCodeDesc({
          ...this.props.firstMatchedRouteCodeDesc,
          [tempresourceData.codeyve]: droppedData.routeCodeDesc,
        });

        this.draggingProcessedFurther(
          droppedData,
          droppedEvent,
          droppedIndex,
          droppedCellData
        );
      } else {
        if (
          this.props.firstMatchedRouteCodeDesc.hasOwnProperty(
            tempresourceData.codeyve
          )
        ) {
          // 

          const value =
            this.props.firstMatchedRouteCodeDesc[tempresourceData.codeyve];

          droppedData.routeCodeDesc == value
            ? this.draggingProcessedFurther(
                droppedData,
                droppedEvent,
                droppedIndex,
                droppedCellData
              )
            : this.setState({
                errorType: "Vehicle",
                errorMessage: `Add only the document associated with Route Code ${value} to the trip.`,
                addAlertShow: true,
                error: true,
              });
        } else {
          this.props.setFirstMatchedRouteCodeDesc({
            ...this.props.firstMatchedRouteCodeDesc,
            [tempresourceData.codeyve]: droppedData.routeCodeDesc,
          });

          this.draggingProcessedFurther(
            droppedData,
            droppedEvent,
            droppedIndex,
            droppedCellData
          );
        }
      }
    }

    // Tuesday Confirmation
    if (this.state.dayOfWeek == "Tuesday") {
      const currentTuesdayMatchecRouteCodeDesc =
        this.props.tuesdayMatchecRouteCodeDesc || {};

      if (Object.keys(currentTuesdayMatchecRouteCodeDesc).length === 0) {
        // When the object is empty, initialize it with the new route code
        this.props.setTuesdayMatchecRouteCodeDesc({
          ...currentTuesdayMatchecRouteCodeDesc,
          [tempresourceData.codeyve]: droppedData.routeCodeDesc,
        });
        this.draggingProcessedFurther(
          droppedData,
          droppedEvent,
          droppedIndex,
          droppedCellData
        );
      } else {
        if (
          currentTuesdayMatchecRouteCodeDesc.hasOwnProperty(
            tempresourceData.codeyve
          )
        ) {
          // Check if the route code matches the existing one
          const value =
            currentTuesdayMatchecRouteCodeDesc[tempresourceData.codeyve];
          if (droppedData.routeCodeDesc === value) {
            this.draggingProcessedFurther(
              droppedData,
              droppedEvent,
              droppedIndex,
              droppedCellData
            );
          } else {
            this.setState({
              errorType: "Vehicle",
              errorMessage: `Add only the document associated with Route Code ${value} to the trip.`,
              addAlertShow: true,
              error: true,
            });
          }
        } else {
          // If the key does not exist, add the new route code
          this.props.setTuesdayMatchecRouteCodeDesc({
            ...currentTuesdayMatchecRouteCodeDesc,
            [tempresourceData.codeyve]: droppedData.routeCodeDesc,
          });
          this.draggingProcessedFurther(
            droppedData,
            droppedEvent,
            droppedIndex,
            droppedCellData
          );
        }
      }
    }

    // Wednesday confirmation
    if (this.state.dayOfWeek == "Wednesday") {
      // Ensure wednesdayMatchedRouteCodeDesc is initialized as an object
      const currentWednesdayMatchedRouteCodeDesc =
        this.props.wednesdayMatchedRouteCodeDesc || {};

      if (Object.keys(currentWednesdayMatchedRouteCodeDesc).length === 0) {
        // When the object is empty, initialize it with the new route code
        this.props.setWednesdayMatchedRouteCodeDesc({
          ...currentWednesdayMatchedRouteCodeDesc,
          [tempresourceData.codeyve]: droppedData.routeCodeDesc,
        });
        this.draggingProcessedFurther(
          droppedData,
          droppedEvent,
          droppedIndex,
          droppedCellData
        );
      } else {
        if (
          currentWednesdayMatchedRouteCodeDesc.hasOwnProperty(
            tempresourceData.codeyve
          )
        ) {
          // Check if the route code matches the existing one
          const value =
            currentWednesdayMatchedRouteCodeDesc[tempresourceData.codeyve];
          if (droppedData.routeCodeDesc === value) {
            this.draggingProcessedFurther(
              droppedData,
              droppedEvent,
              droppedIndex,
              droppedCellData
            );
          } else {
            this.setState({
              errorType: "Vehicle",
              errorMessage: `Add only the document associated with Route Code ${value} to the trip.`,
              addAlertShow: true,
              error: true,
            });
          }
        } else {
          // If the key does not exist, add the new route code
          this.props.setWednesdayMatchedRouteCodeDesc({
            ...currentWednesdayMatchedRouteCodeDesc,
            [tempresourceData.codeyve]: droppedData.routeCodeDesc,
          });
          this.draggingProcessedFurther(
            droppedData,
            droppedEvent,
            droppedIndex,
            droppedCellData
          );
        }
      }
    }

    // Thursday Confirmation

    if (this.state.dayOfWeek == "Thursday") {
      // Ensure thursdayMatchedRouteCodeDesc is initialized as an object
      const currentThursdayMatchedRouteCodeDesc =
        this.props.thursdayMatchedRouteCodeDesc || {};

      if (Object.keys(currentThursdayMatchedRouteCodeDesc).length === 0) {
        // When the object is empty, initialize it with the new route code
        this.props.setThursdayMatchedRouteCodeDesc({
          ...currentThursdayMatchedRouteCodeDesc,
          [tempresourceData.codeyve]: droppedData.routeCodeDesc,
        });
        this.draggingProcessedFurther(
          droppedData,
          droppedEvent,
          droppedIndex,
          droppedCellData
        );
      } else {
        if (
          currentThursdayMatchedRouteCodeDesc.hasOwnProperty(
            tempresourceData.codeyve
          )
        ) {
          // Check if the route code matches the existing one
          const value =
            currentThursdayMatchedRouteCodeDesc[tempresourceData.codeyve];
          if (droppedData.routeCodeDesc === value) {
            this.draggingProcessedFurther(
              droppedData,
              droppedEvent,
              droppedIndex,
              droppedCellData
            );
          } else {
            this.setState({
              errorType: "Vehicle",
              errorMessage: `Add only the document associated with Route Code ${value} to the trip.`,
              addAlertShow: true,
              error: true,
            });
          }
        } else {
          // If the key does not exist, add the new route code
          this.props.setThursdayMatchedRouteCodeDesc({
            ...currentThursdayMatchedRouteCodeDesc,
            [tempresourceData.codeyve]: droppedData.routeCodeDesc,
          });
          this.draggingProcessedFurther(
            droppedData,
            droppedEvent,
            droppedIndex,
            droppedCellData
          );
        }
      }
    }

    // Friday Confirmation

    if (this.state.dayOfWeek == "Friday") {
      const currentFridayMatchedRouteCodeDesc =
        this.props.fridayMatchedRouteCodeDesc || {};

      if (Object.keys(currentFridayMatchedRouteCodeDesc).length === 0) {
        // When the object is empty, initialize it with the new route code
        this.props.setFridayMatchedRouteCodeDesc({
          ...currentFridayMatchedRouteCodeDesc,
          [tempresourceData.codeyve]: droppedData.routeCodeDesc,
        });
        this.draggingProcessedFurther(
          droppedData,
          droppedEvent,
          droppedIndex,
          droppedCellData
        );
      } else {
        if (
          currentFridayMatchedRouteCodeDesc.hasOwnProperty(
            tempresourceData.codeyve
          )
        ) {
          // Check if the route code matches the existing one
          const value =
            currentFridayMatchedRouteCodeDesc[tempresourceData.codeyve];
          if (droppedData.routeCodeDesc === value) {
            this.draggingProcessedFurther(
              droppedData,
              droppedEvent,
              droppedIndex,
              droppedCellData
            );
          } else {
            this.setState({
              errorType: "Vehicle",
              errorMessage: `Trip has Route Code ${value}. Please add a document with Route Code ${value} only.`,
              addAlertShow: true,
              error: true,
            });
          }
        } else {
          // If the key does not exist, add the new route code
          this.props.setFridayMatchedRouteCodeDesc({
            ...currentFridayMatchedRouteCodeDesc,
            [tempresourceData.codeyve]: droppedData.routeCodeDesc,
          });
          this.draggingProcessedFurther(
            droppedData,
            droppedEvent,
            droppedIndex,
            droppedCellData
          );
        }
      }
    }

    this.setState({
      addotherRCConfirmShow: false,
    });
  };

  onOtherRCConfirmNo = () => {
    this.setState({
      addotherRCConfirmShow: false,
    });
  };
  getConsultantDesignationPlate(value) {
    // return <span style={{ cursor: 'pointer', paddingLeft : '10%' , color : "#2952a3"  }} >{value.resourceData[value.resource.name]}</span>;

    return value.resourceData.name;
  }

  getConsultantDesignation(value) {
    // 
    // return value.resourceData.drivername;
    if (value) {
      return value.resourceData.drivername;
    } else {
      return " ";
    }
  }

  onInfoClick = (value) => {
    // 
    let currunit = "",
      distunits = "",
      weiunits = "",
      volunits = "";
    var selsite = this.props.selectedSite;

    currunit = selsite.cur;
    distunits = selsite.distunit;
    weiunits = selsite.massunit;
    volunits = selsite.volunit;



    let data = value.resourceData;
    var lng = localStorage.getItem("lng");
    let costunits;
    if (currunit == "USD") {
      costunits = "$";
      // distunits = 'Miles'
    } else if (currunit == "EUR") {
      costunits = "€";
      //  distunits = 'Kms'
    } else {
      costunits = currunit;
    }
    let length = data.length && data.length + "cm, ";
    let width = data.width && data.width + "cm, ";
    let heigth = data.heigth && data.heigth + "cm";
    const vehicleDetails = {};
    vehicleDetails.VehicleNumber = data.name && data.name;
    vehicleDetails.Class = data.className && data.className;
    vehicleDetails.routeCodeDesc = data.routeCodeDesc && data.routeCodeDesc;
    vehicleDetails.Carrier =
      data.bptnum && data.bptnum + " - " + data.bptnumType;
    vehicleDetails.Trailer = data.trailer && data.trailer;
    vehicleDetails.ArrivalSite = data.startdepotn && data.startdepotn;
    vehicleDetails.DepartureSite = data.enddepotname && data.enddepotname;
    vehicleDetails.Capacity =
      data.capacities && data.capacities + " " + data.xweu;
    vehicleDetails.Volume = data.vol && data.vol + " " + data.xvol;
    vehicleDetails.MaxDistance =
      data.maxtotaldist && data.maxtotaldist + " " + data.xmaxtotaldis;
    vehicleDetails.MaxTotalTime =
      data.maxtotaltime &&
      formatTime(convertHrToSec(data.maxtotaltime)) + " Hrs";
    vehicleDetails.MaxTotalTravelTime =
      data.maxtotaltrvtime &&
      formatTime(convertHrToSec(data.maxtotaltrvtime)) + " Hrs";
    vehicleDetails.MaxOrderCount = data.maxordercnt && data.maxordercnt;
    vehicleDetails.MaxSpeed =
      data.maxspeed && data.maxspeed + " " + distunits + "/Hr";

    vehicleDetails.Driver = data.drivername && data.drivername;
    vehicleDetails.EarliestStartTime =
      data.starttime && splitTime(data.starttime) + "  HH:MM";
    vehicleDetails.LatestStartTime =
      data.lateststarttime && splitTime(data.lateststarttime) + "  HH:MM";

    vehicleDetails.OverTimeStart =
      data.overtimestar &&
      formatTime(convertHrToSec(data.overtimestar)) + " Hrs";
    vehicleDetails.LoadingTime =
      data.startdepots && convertHrToMin(data.startdepots) + " Mins";
    vehicleDetails.OffLoadingTime =
      data.enddepotserv && convertHrToMin(data.enddepotserv) + " Mins";

    vehicleDetails.FixedCost =
      data.fixedcost && data.fixedcost + " " + costunits;
    vehicleDetails.CostPerUnitTime =
      data.costperunitt && data.costperunitt + " " + costunits;
    vehicleDetails.CostPerUnitDistance =
      data.costperunitd && data.costperunitd + " " + costunits;
    vehicleDetails.CostPerUnitOverTime =
      data.costperunito && data.costperunito + " " + costunits;

    vehicleDetails.Tailgate = data.tailGate && data.tailGate;
    vehicleDetails.Loadbay = data.loadBay && data.loadBay;
    vehicleDetails.Dimensions = length + width + heigth;
    vehicleDetails.mondayRCDesc = data.mondayRCDesc && data.mondayRCDesc;
    vehicleDetails.tuesdayRCDesc = data.tuesdayRCDesc && data.tuesdayRCDesc;
    vehicleDetails.wednesdayRCDesc =
      data.wednesdayRCDesc && data.wednesdayRCDesc;
    vehicleDetails.thursdayRCDesc = data.thursdayRCDesc && data.thursdayRCDesc;
    vehicleDetails.fridayRCDesc = data.fridayRCDesc && data.fridayRCDesc;
    this.setState({
      addInfoShow: true,
      speciality: vehicleDetails,
      clickedVeh: value.resourceData.codeyve,
    });
  };

  resourceHeaderTemplate(props) {

    return (
      <div className="template-wrap">
        <div className="specialist-category">
          <div
            className={"specialist-image " + this.getConsultantImage(props)}
          ></div>
          <div className="specialist-name">
            <span
              className=""
              onClick={() => this.onInfoClick(props)}
              style={{
                cursor: "pointer",
              }}
            >
              {this.getConsultantDesignationPlate(props)}
            </span>
          </div>

          <div className="specialist-designation">
            {this.getConsultantDesignation(props)}
          </div>
          <br />
          {props.resourceData.trailer &&
            props.resourceData.trailer.length > 0 && (
              <div className="specialist-designation">
                Trailer : {props.resourceData.trailer}
              </div>
            )}
          <div className="specialist-designation">
            Class : {props.resourceData.className}
          </div>

          {/* <div>
          <Tooltip title="Registration Plate">
              <div
                style={{
                  padding: "1%",
                  backgroundColor: "#a3c590",
                  marginTop: "3%",
                  marginRight: "5%",
                  gridColumn: "span 2",

                  borderRadius: "3px",
                }}
              >
                <span
                  onClick={() => this.onInfoClick(props)}
                  style={{
                    paddingLeft: "10px",
                    color: "#2952a3",
                    fontWeight: "500",
                  }}
                >
                  {this.getConsultantDesignationPlate(props)}
                </span>
              </div>
            </Tooltip>
          </div> */}
        </div>
      </div>
    );
  }
  treeTemplate(props) {
    return (
      <div id="waiting">
        <div id="waitdetails">
          <div id="waitlist">{props.Name}</div>
          <div id="waitcategory">
            {props.DepartmentName} - {props.Description}
          </div>
        </div>
      </div>
    );
  }
  onItemDrag(event) {
    if (this.scheduleObj.isAdaptive) {
      let classElement =
        this.scheduleObj.element.querySelector(".e-device-hover");
      if (classElement) {
        classElement.classList.remove("e-device-hover");
      }
      if (event.event.target.classList.contains("e-work-cells")) {
        // addClass([event.event.target], 'e-device-hover');
      }
    }
    if (document.body.style.cursor === "not-allowed") {
      document.body.style.cursor = "";
    }
    if (event.name === "nodeDragging") {
      let dragElementIcon = document.querySelectorAll(
        ".e-drag-item.treeview-external-drag .e-icon-expandable"
      );
      for (let i = 0; i < dragElementIcon.length; i++) {
        dragElementIcon[i].style.display = "none";
      }
    }
  }
  onActionBegin(event) {
    if (event.requestType === "eventCreate" && this.isTreeItemDropped) {
      let treeViewData = this.treeObj.fields.dataSource;
      const filteredPeople = treeViewData.filter(
        (item) => item.Id !== parseInt(this.draggedItemId, 10)
      );
      this.treeObj.fields.dataSource = filteredPeople;
      let elements = document.querySelectorAll(
        ".e-drag-item.treeview-external-drag"
      );
      for (let i = 0; i < elements.length; i++) {
        // remove(elements[i]);
      }
    }
  }
  onTreeDragStop(event) {
    let treeElement = ""; //closest(event.target, '.e-treeview');
    let classElement =
      this.scheduleObj.element.querySelector(".e-device-hover");
    if (classElement) {
      classElement.classList.remove("e-device-hover");
    }
    if (!treeElement) {
      event.cancel = true;
      let scheduleElement = ""; //closest(event.target, '.e-content-wrap');
      if (scheduleElement) {
        let treeviewData = this.treeObj.fields.dataSource;
        if (event.target.classList.contains("e-work-cells")) {
          const filteredData = treeviewData.filter(
            (item) => item.Id === parseInt(event.draggedNodeData.id, 10)
          );
          let cellData: CellClickEventArgs = this.scheduleObj.getCellDetails(
            event.target
          );
          let resourceDetails = this.scheduleObj.getResourcesByIndex(
            cellData.groupIndex
          );
          let eventData = {
            Name: filteredData[0].Name,
            StartTime: cellData.startTime,
            EndTime: cellData.endTime,
            IsAllDay: cellData.isAllDay,
            Description: filteredData[0].Description,
            DepartmentID: resourceDetails.resourceData.GroupId,
            ConsultantID: resourceDetails.resourceData.Id,
          };
          this.scheduleObj.openEditor(eventData, "Add", true);
          this.isTreeItemDropped = true;
          this.draggedItemId = event.draggedNodeData.id;
        }
      }
    }
  }

  onPopupOpen = (args) => {

    if (args.type === "Editor") {
      args.cancel = true;
      this.data = args.data;
      this.showModal(args.data);
    } else {
      args.cancel = true;
    }
  };

  saveModal = (args) => {
    var app = {};
    var dialog = document.querySelector(".custom-event-editor");
    var subject = dialog.querySelector("#routeid");
    app.Subject = subject.value;
    var Vehicle = dialog.querySelector("#vehicle");
    app.Vehicle = Vehicle.value;
    var Driver = dialog.querySelector("#driver");
    app.Driver = Driver.value;
    var Status = dialog.querySelector("#sts");
    app.Status = Status.value;
    var DepSite = dialog.querySelector("#depsite");
    app.DepSite = DepSite.value;
    var ArrSite = dialog.querySelector("#arrsite");
    app.ArrSite = ArrSite.value;
    var startTime = dialog.querySelector("#StartTime").ej2_instances[0];
    app.StartTime = startTime.value;
    var endTime = dialog.querySelector("#EndTime").ej2_instances[0];
    app.EndTime = endTime.value;

    var scheduleObj = document.querySelector(".e-schedule").ej2_instances[0];
    if (this.data.Id) {
      scheduleObj.saveEvent(app);
    } else {
      scheduleObj.addEvent(app);
    }
    this.hideModal(this);
  };

  onDragStart(args) {
    args.navigation.enable = true;
  }

  onSchActionBegin(event) {
    // 
  }

  onSchActionComplete(event) {
    // 
    // if (event.requestType === "dateNavigate") {
    //   // 
    //   // this.props.handleDateRangeChange();
    // }

    // date na
    if (event.requestType === "dateNavigate") {
      // 
      const newDate = this.scheduleObj.selectedDate;

      const date = new Date(newDate);
      const formattedDate = moment(date).format("YYYY-MM-DD");
      // 

      this.props.documentPanelDateChange(formattedDate);
    }

    // Check if the event is related to a view change
    if (event.requestType === "view" || event.requestType === "viewNavigate") {
      const currentView = this.scheduleObj.currentView; // Access the current view


      this.props.setcurrentView(currentView);
      // this.setState({ currentView }, () => {
      //     
      // });
    }
    // const currentView = this.scheduleObj.currentView; // Access the current view
  }

  addcontenttoScheduler = (passeddata, event, index, cellData) => {
    // 
    var data = passeddata;
    var doctype;

    if (data.doctype === "DLV" || data.doctype === "PICK") {
      doctype = "Drop";
    } else {
      doctype = "Pickup";
    }

    //    let cellData : CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
    // 
    let resourceDetails = this.scheduleObj.getResourcesByIndex(
      cellData.groupIndex
    );
    // add validation for the dropped document
    let dropCompatability = true;
    let error = "";
    // To check vehicle and product category
    if (dropCompatability) {
      if (resourceDetails.resourceData.tclcod === "") {
        // 
        dropCompatability = true;
      } else {
        // need to check the vehicle and products category compatability;
        for (var i = 0; i < data.products.length; i++) {
          if (
            resourceDetails.resourceData &&
            resourceDetails.resourceData.tclcod &&
            resourceDetails.resourceData.tclcod.includes(
              data.products[i].productCateg
            )
          ) {
            dropCompatability = true;
          } else {
            // 
            dropCompatability = false;
            error = "product";
            this.setState({
              errorType: "product",
              errorMessage:
                "Product Category is not compatability with Vehicle",
              addAlertShow: true,
              error: true,
            });
            break;
          }
        }
      }
    }
    // To check capacity constraint for Vehicle and document
    if (dropCompatability == true) {
      if (
        resourceDetails.resourceData.capacities &&
        resourceDetails.resourceData.capacities < data.netweight
      ) {
        dropCompatability = false;
        // 
        error = "capacity";
        this.setState({
          errorType: "capacity",
          errorMessage: "Vehicle Capacity is less than the Document Capacity",
          addAlertShow: true,
          error: true,
        });
      } else {
        dropCompatability = true;
      }
    }

    // To check capacity constraint for Vehicle and document
    if (dropCompatability == true) {
      if (
        resourceDetails.resourceData.vol &&
        resourceDetails.resourceData.vol < data.volume
      ) {
        dropCompatability = false;
        // 
        error = "volume";
        this.setState({
          errorType: "volume",
          errorMessage: "Vehicle volume is less than the Document volume",
          addAlertShow: true,
          error: true,
        });
      } else {
        dropCompatability = true;
      }
    }

    //to  check driver compatability
    if (dropCompatability == true) {
      if (resourceDetails.resourceData.alldrivers === 2) {
        // 
        dropCompatability = true;
      } else {
        // 
        // need to check the venicle and products category compatability;
        if (
          resourceDetails.resourceData.driverslist &&
          !resourceDetails.resourceData.driverslist.includes(data.drivercode)
        ) {
          dropCompatability = false;
          // 
          error = "driver";
          this.setState({
            errorType: "driver",
            errorMessage: "Driver is not associated with current Vehicle",
            addAlertShow: true,
            error: true,
          });
        } else {
          dropCompatability = true;
        }
      }
    }

    //to  check customer compatability
    if (dropCompatability == true) {
      if (resourceDetails.resourceData.allcustomers === 2) {
        // 
        dropCompatability = true;
      } else {
        // 
        // need to check the venicle and products category compatability;
        if (
          resourceDetails.resourceData.customerlist &&
          !resourceDetails.resourceData.customerlist.includes(data.bpcode)
        ) {
          dropCompatability = false;
          // 
          error = "customer";
          this.setState({
            errorType: "customer",
            errorMessage: "Customer is not associated with current Vehicle",
            addAlertShow: true,
            error: true,
          });
        } else {
          dropCompatability = true;
        }
      }
    }
    if (dropCompatability) {

      const parseDate = new Date(Date.parse(cellData.startTime)).toString();

      const SelParsedate = moment.tz(parseDate, "").format("YYYY-MM-DD");

  
      let eventData: { [key: string]: Object } = {
        docnum: data.docnum,
        bpcode: data.bpcode,
        bpname: data.bpname,
        city: data.city,
        poscode: data.poscode,
        subject: data.docnum,
        optistatus: "dragged",
        obbject: data,
        docdate: SelParsedate,
        Location: data.docnum,
        docType: doctype,
        IsAllDay: false,
        doctype: data.doctype,
        Description: data.bpcode + "-" + data.bpname,
        vehicleCode: resourceDetails.resourceData.codeyve,
        VehicleObject: resourceDetails.resourceData,
      };

      /*

          this.setState({
            EventDraggedData : eventData,
            addConfirmShow: true,
            confirmMessage: 'Are you sure you want  to create the trip',
        })
*/
      // 
      this.scheduleObj.addEvent(eventData);
      this.props.disableDivs(index, "doc", data.docnum);
    }
  };

// backup code 24-12-24
  // drop(event, eventType, args: DragAndDropEventArgs) {
  //   // 

  //   var data;
  //   var doctype;
  //   data = JSON.parse(event.dataTransfer.getData("currentCard"));

  //   
  //   var transferedData = event.dataTransfer;
  //   var index = event.dataTransfer.getData("index");


  //   // checking cell data

  //   let cellData = this.scheduleObj.getCellDetails(event.target);

  //   // If newCellData is undefined, use the previously stored value
  //   if (!cellData) {
  //     cellData = this.cellData;  // Use the instance variable
  //   } else {
  //     this.cellData = cellData;  // Store the new value in the instance variable
  //   }

  //   




  //   

  //   const parseDate1 = new Date(Date.parse(cellData.startTime)).toString();

  //   const SelParsedate1 = moment.tz(parseDate1, "").format("YYYY-MM-DD");


  //   // check and stop carrier type

  //   let tempresourceDetails1 = this.scheduleObj.getResourcesByIndex(
  //     cellData.groupIndex
  //   );
  //   let tempresourceData1 = tempresourceDetails1.resourceData;


  //   let clickedDocs = this.props.checkedDoccs;

 

  //   if (["MONTGOMERY", "DPD", "EXTERNAL"].includes(data.carrier)) {
  //     data.carrier = "EXTERNAL";
  //   }

  //   

  //   // for dragging multiple documents at once based on selection
  //   if (clickedDocs.length > 0) {
  //     clickedDocs.forEach((doc) => {
  //       if(doc.carrier == tempresourceData1.bptnumType){
  //         this.draggingProcessedFurther(doc, event, index, cellData);
  //       }
  //     });
  //   } else {
  //     if (tempresourceData1.bptnumType == data.carrier) {
  //       if (moment(data.docdate).format("YYYY-MM-DD") === SelParsedate1) {
  //         // 
  //         this.draggingProcessedFurther(data, event, index, cellData);

  //         // this.draggingProcessedFurther(data, event, index, cellData);
  //       } else {
  //         // 
  //         this.setState({
  //           droppedData: data,
  //           droppedIndex: index,
  //           droppedCellData: cellData,
  //           droppedEvent: event,
  //           addConfirmShow: true,
  //           confirmMessage:
  //             "Document date and the calendar date are different. Confirm the addition to the trip",
  //         });
  //       }
  //     } else {
  //       this.setState({
  //         errorType: "Vehicle",
  //         errorMessage: `Vehicle is ${tempresourceData1.bptnumType} type and you are assigning document type of  ${data.carrier} `,
  //         addAlertShow: true,
  //         error: true,
  //       });
  //     }
  //   }

  //   this.props.removeDocsCheckBoxes()
  // }

  // // To  Add Route Code Compatability and get confirmation if it is different
  // draggingProcessedFurtherForRouteCode = (data, event, index, cellData) => {
  //   let tempresourceDetails = this.scheduleObj.getResourcesByIndex(
  //     cellData.groupIndex
  //   );
  //   let tempresourceData = tempresourceDetails.resourceData;

  //   

  //   if (tempresourceData.routeCodeDesc.length > 0) {
  //     if (data.routeCodeDesc && data.routeCodeDesc.length > 0) {

  //       if (tempresourceData.routeCode === data.routeCode) {
  //           this.draggingProcessedFurther(data, event, index, cellData);
  //         }
  //         // this.draggingProcessedFurther(data, event, index, cellData);
  //        else {
  //         this.setState({
  //           droppedData: data,
  //           droppedIndex: index,
  //           droppedCellData: cellData,
  //           droppedEvent: event,
  //           addRouteCodeConfirmShow: true,
  //           confirmMessage:
  //             "Document RouteCode and Vehicle Route Code is different, Do you want to proceed ?",
  //         });
  //       }
  //     } else {
  //       this.draggingProcessedFurther(data, event, index, cellData);
  //     }
  //     }
  //   else {
  //     this.draggingProcessedFurther(data, event, index, cellData);
  //   }

  // };

  // To  Add Route Code Compatability and get confirmation if it is different
  // draggingProcessedFurtherForRouteCode = (data, event, index, cellData) => {

  //   
  //   let tempresourceDetails = this.scheduleObj.getResourcesByIndex(
  //     cellData.groupIndex
  //   );

  //   // getting particular schedular cell day where we have dragged document
  //   let startTime = new Date(cellData.startTime);
  //   let dayOfWeek = moment(startTime).format("dddd");
  //   

  //   let tempresourceData = tempresourceDetails.resourceData;

  //   

  //   // 

  //   let routeCodeArr = tempresourceData.routeCodeDesc?.split(",");
  //   
  //   
  //   if (routeCodeArr.length > 0 && routeCodeArr[0] != "") {
  //     if (data.routeCodeDesc && routeCodeArr.length > 0) {
  //       if (routeCodeArr.includes(data.routeCodeDesc)) {
  //         this.draggingProcessedFurther(data, event, index, cellData);
  //       } else {
  //         this.setState({
  //           droppedData: data,
  //           droppedIndex: index,
  //           droppedCellData: cellData,
  //           droppedEvent: event,
  //           addRouteCodeConfirmShow: true,
  //           confirmMessage:
  //             "Document RouteCode and Vehicle Route Code are different, Do you want to proceed ?",
  //         });
  //       }
  //     } else {
  //       this.draggingProcessedFurther(data, event, index, cellData);
  //     }
  //   }

  //   // let monday="r1","r2"

  //   // 

  //   // tempresourceData.tuesday = "Belfast City Centre, EAST BELFAST";
  //   // tempresourceData.monday = "Belfast City Centre";
  //   // tempresourceData.wednesday

  //   // let mondayNoneCehck

  //   }

  // };



  drop(event, eventType, args: DragAndDropEventArgs) {
    var data;
    var doctype;
    data = JSON.parse(event.dataTransfer.getData("currentCard"));
    var transferedData = event.dataTransfer;
    var index = event.dataTransfer.getData("index");

    let cellData = this.scheduleObj.getCellDetails(event.target);


    
    

    // if (!cellData) {
    //   cellData = this.cellData;  // Use previously stored value if undefined
    // } else {
    //   this.cellData = cellData;  // Store new value
    // }

    if (!this.cellDataMap) {
      this.cellDataMap = {};
    }
    
    if (cellData) {
      this.cellDataMap[cellData.groupIndex] = cellData;
    }
    
    // Retrieve the correct cellData based on the groupIndex
    cellData = this.cellDataMap[cellData.groupIndex] || cellData;
    

    const parseDate1 = new Date(Date.parse(cellData.startTime)).toString();
    const SelParsedate1 = moment.tz(parseDate1, "").format("YYYY-MM-DD");

    let tempresourceDetails1 = this.scheduleObj.getResourcesByIndex(cellData.groupIndex);
    let tempresourceData1 = tempresourceDetails1.resourceData;

    
    let clickedDocs = this.props.checkedDoccs;

    // Adjust carrier type for certain conditions

    let matchCareer="";

    if (["MONTGOMERY", "DPD", "EXTERNAL"].includes(data.carrier)) {
      // data.carrier = "EXTERNAL";
        matchCareer="EXTERNAL";
    }else{
      matchCareer =data.carrier;
    }

    // Check if document's carrier matches resource's carrier
    if (clickedDocs.length > 0) {
      let documentsWithDifferentDates = clickedDocs.filter((doc) => 
        moment(doc.docdate).format("YYYY-MM-DD") !== SelParsedate1
      );

      // If any document has a different date, show a confirmation popup
      if (documentsWithDifferentDates.length > 0) {
        this.setState({
          addRouteCodeConfirmShow:true,
          confirmMessage:
            "One or more documents have different dates than the selected date. Do you want to continue adding them?",
          confirmAction: () => {
            // If user confirms, proceed with adding all selected documents
            clickedDocs.forEach((doc) => {
              if (matchCareer == tempresourceData1.bptnumType) {
                this.draggingProcessedFurther(doc, event, index, cellData);
              }
            });
            this.props.removeDocsCheckBoxes();
          }
        });
      } else {
        // If all documents have the same date, process further
        clickedDocs.forEach((doc) => {
          if (matchCareer == tempresourceData1.bptnumType) {
            this.draggingProcessedFurther(doc, event, index, cellData);
          }
        });
        this.props.removeDocsCheckBoxes();
      }
    } else {
      // Single document handling (same as before)
      if (tempresourceData1.bptnumType == matchCareer) {
        if (moment(data.docdate).format("YYYY-MM-DD") === SelParsedate1) {
          this.draggingProcessedFurther(data, event, index, cellData);
        } else {
          this.setState({
            droppedData: data,
            droppedIndex: index,
            droppedCellData: cellData,
            droppedEvent: event,
            addConfirmShow: true,
            confirmMessage:
              "Document date and the calendar date are different. Confirm the addition to the trip",
            confirmAction: () => {
              this.draggingProcessedFurther(data, event, index, cellData);
              this.props.removeDocsCheckBoxes();
            }
          });
        }
      } else {
        this.setState({
          errorType: "Vehicle",
          errorMessage: `Vehicle is ${tempresourceData1.bptnumType} type and you are assigning document type of  ${data.carrier}`,
          addAlertShow: true,
          error: true,
        });
      }
    }
  }

draggingProcessedFurtherforProdCategory = (data, event, index, cellData) => {
   
    let tempresourceDetails = this.scheduleObj.getResourcesByIndex(
       cellData.groupIndex
    );

    let tempresourceData = tempresourceDetails.resourceData;
   

const vehicleSkillsRaw = tempresourceData?.skills  || "";

  // Normalize skills to array of strings
  const vehicleSkills = vehicleSkillsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);


  const productSkills = (typeof data.skills === "string"
    ? data.skills.split(",")
    : Array.isArray(data.skills)
      ? data.skills
      : []
  ).map((s) => s.trim()).filter(Boolean);

  // If no skills defined, assume compatible
  if (vehicleSkills.length === 0) {
   
   // dropCompatability = true;
   this.addcontenttoScheduler(data, event, index, cellData);
   return;
  }  
  
   const allSkillsMatched = productSkills.every(skill => vehicleSkills.includes(skill));

  
   if (allSkillsMatched) {
   
 this.addcontenttoScheduler(data, event, index, cellData);
   }
   else {
 
    this.setState({
      errorType: "Vehicle",
      errorMessage: `Vehicle ${tempresourceData.codeyve} - Product Category incompatible with assigned Product Category.`,
      addAlertShow: true,
      error: true,
    });
   }

}






  draggingProcessedFurther = (data, event, index, cellData) => {
    if (data.miscpickflg == 2) {
      // 
      if (data.pairedDoc != undefined && data.pairedDoc != "") {
        // 
        for (var i = 0; i < this.props.dropsPanel.length; i++) {
          if (data.pairedDoc === this.props.dropsPanel[i].docnum) {
            //currentTrip = this.props.trips;
            this.addcontenttoScheduler(
              this.props.dropsPanel[i],
              event,
              i,
              cellData
            );
            break;
          }
        }
      }
      this.addcontenttoScheduler(data, event, index, cellData);
    } else {
      // 
      //this.addcontenttoScheduler(data, event, index, cellData);
      this.draggingProcessedFurtherforProdCategory(data, event, index, cellData);
      if (data.pairedDoc != undefined && data.pairedDoc != "") {
        // 
        for (var i = 0; i < this.props.dropsPanel.length; i++) {
          // 
          if (data.pairedDoc === this.props.dropsPanel[i].docnum) {
            //currentTrip = this.props.trips;
            // 
           // this.addcontenttoScheduler(
            //  this.props.dropsPanel[i],
           //   event,
           //   i,
           //   cellData
           // );
            this.draggingProcessedFurtherforProdCategory(this.props.dropsPanel[i],event,i,cellData);
            break;
          }
        }
      }
    }
  };

  dragOver(event) {
    event.preventDefault();
  }

  GetDeliveryStatus1 = (x) => {
    switch (x) {
      case "1":
        return "Scheduled";
      case "2":
        return "On the Way";
      case "3":
        return "In-progress";
      case "4":
        return "Completed";
      case "5":
        return "Skipped";
      case "6":
        return "Re-Scheduled";
      case "7":
        return "Cancelled";
      case "8":
        return "To-Plan";
      default:
        return "To-Plan";
    }
  };

  GetRouteStatus1 = (x) => {
    switch (x) {
      case "Open":
        return "DS - Planned , RS - Open";
      case "Optimized":
        return "DS - Planned , RS - Optimized";
      case "Locked":
        return "DS - Confirmed , RS - Locked";
      case "LVS Generated":
        return "DS - Confirmed , RS - LVS Generated";
      case "LVS Confirmed":
        return "DS - Dispatched , RS -LVS Confirmed";
      case "Cancelled":
        return "RS - Cancelled";
      case "Completed":
        return "DS - Completed , RS - Completed";
      case "To Plan":
        return "DS - To Plan";
      case "Skipped":
        return "DS - Skipped";
    }
  };

  bgcolor = (type) => {
    // 
    if (type === "DLV") {
      return "#008000		";
    } else if (type === "PICK") {
      return "#000080";
    } else {
      return "#ff3d60";
    }
  };

  GetDeliveryStatus = (x) => {
    switch (x) {
      case "1":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/planned.png"
          ></img>
        );
      case "2":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/onway2.png"
          ></img>
        );
      case "3":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/inprogress.png"
          ></img>
        );
      case "4":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/completed.png"
          ></img>
        );
      case "5":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/skipped.png"
          ></img>
        );
      case "6":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/rescheduled.png"
          ></img>
        );
      case "7":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/cancelled.png"
          ></img>
        );
      case "8":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/toPlan.png"
          ></img>
        );
      default:
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/toPlan.png"
          ></img>
        );
    }
  };

  GetRouteStatus = (x) => {
    switch (x) {
      case "Open":
        return <CalendarTodayIcon style={{ fontSize: 32 }} />;
      case "Optimized":
        return <CalendarTodayIcon style={{ fontSize: 32 }} />;
      case "Locked":
        return <EventAvailableIcon style={{ fontSize: 32 }} />;
      case "LVS Generated":
        return <EventAvailableIcon style={{ fontSize: 32 }} />;
      case "LVS Confirmed":
        return <StartIcon style={{ fontSize: 32 }} />;
      case "Cancelled":
        return <EventBusyIcon style={{ fontSize: 32 }} />;
      case "Completed":
        return <ThumbUpAltIcon style={{ fontSize: 32 }} />;
      case "To Plan":
        return <FiberNewIcon style={{ fontSize: 32 }} />;
      case "Skipped":
        return <RedoIcon style={{ fontSize: 32 }} />;
    }
  };

  eventTemplate(props: { [key: string]: Object }): JSX.Element {
 
    return (
      <div
        className="template-wrap"
        style={{
          width: "450px",
          height: "105px",
          display: "flex",
          background: this.bgcolor(props.doctype),
          paddingBottom:"100px"
        }}
      >
        <div className="tooltip1">
          {this.GetRouteStatus(props.routeStatus)}
          <span className="tooltiptext1" style={{ width: "10%" }}>
            {this.GetRouteStatus1(props.routeStatus)}
          </span>
        </div>
        <div className="subject" style={{ width: "90%", wrap: "true" }}>
          <div>
            <div style={{ fontSize: "14px", paddingLeft: "5px" }}>
              {props.bpcode} - {props.bpname} (
              {props.obbject?.routeCodeDesc || props.routeCodeDesc})
            </div>
            <span style={{ paddingLeft: "10px" }}>{props.docnum}</span>
            <span>
              T{props.tripno} - #{props.seq}
            </span>
            <span style={{ paddingLeft: "5px" }}>
              {props.arvtime} - {props.deptime}
            </span>
          </div>
        </div>
      </div>
    );
  }

  getVehicleName(value) {
    return value.resourceData
      ? value.resourceData[value.resource.textField]
      : value.resourceName;
  }
  getDrivername(value) {
    let resourceName = this.getDoctorName(value);
    return resourceName === "Will Smith"
      ? "Cardiologist"
      : resourceName === "Alice"
      ? "Neurologist"
      : "Orthopedic Surgeon";
  }

  getConsultantDesignationRoute(value) {

    return value.resourceData.routeCodeDesc;
  }
  // componentDidUpdate(prevProps) {
  //   // Ensure the new date is valid before updating state and scheduler
  //   if (this.props.documentPanel_date && this.state.selectedDate !== this.props.documentPanel_date) {
  //     // Update state with new prop value
  //     this.setState({ selectedDate: this.props.documentPanel_date }, () => {
  //       // Manually navigate to the new date
  //       if (this.scheduleObj) {
  //         this.scheduleObj.selectedDate = this.props.documentPanel_date;
  //         this.scheduleObj.refresh(); // Refresh the schedule to apply changes
  //       }
  //     });
  //   }
  // }

  componentDidUpdate(prevProps) {
    // Check if the documentPanel_date prop has changed
    if (prevProps.documentPanel_date !== this.props.documentPanel_date) {
      // Ensure the new date is valid before updating state and scheduler
      if (this.props.documentPanel_date) {
        // Update state with new prop value
        this.setState({ selectedDate: this.props.documentPanel_date }, () => {
          // Manually navigate to the new date
          if (this.scheduleObj) {
            this.scheduleObj.selectedDate = this.props.documentPanel_date;
            this.scheduleObj.refresh(); // Refresh the schedule to apply changes
          }
        });
      }
    }
  }

  onViewChange(args) {
    // When the view is changed, dynamically adjust the row height
    // if (this.scheduleObj.currentView === 'TimelineDay') {
    //   const timelineRows = document.querySelectorAll('.e-timelines td');
    //   timelineRows.forEach((row) => {
    //     // Add 20px to each row's height
    //     row.style.height = `${row.offsetHeight + 50}px`;
    //   });
    // }
  }
  
  

  render() {
 
    var lang = localStorage.getItem("i18nextLng");
    // 
    let loc = "";
    if (lang === "eng") {
      loc = "en";
    } else {
      loc = "en";
    }
    // 
    // 
    let addAlertClose = () => this.setState({ addAlertShow: false });
    let addInfoIconClose = () => this.setState({ addInfoShow: false });

    let filteredVehicle = [];
    this.props.vehicles &&
      this.props.vehicles.length > 0 &&
      this.props.vehicles.map((veh) => {
        if (this.props.selectedVehicleCodeArr.includes(veh.codeyve)) {
          filteredVehicle.push(veh);
        }
      });

    // 
 
    // 

    //  route codes


    // if (
    //   this.props.selectedRouteCodeArr &&
    //   this.props.selectedRouteCodeArr.length > 0
    // ) {
    //   if (filteredVehicle.length > 0) {
    //     let tempfilteredVeh = filteredVehicle;
    //     
    //     filteredVehicle = [];

    //     tempfilteredVeh.map((fvel) => {
    //        
    //      if(fvel.routeCodeDesc.length > 0 ) {
    //       if (fvel.routeCodeDesc.includes(this.props.selectedRouteCodeArr)) {
    //         filteredVehicle.push(fvel);
    //       }
    //       }
    //     });

    //   } else {
    //     this.props.vehicles &&
    //       this.props.vehicles.length > 0 &&
    //       this.props.vehicles.map((actveh) => {
    //           
    //          
    //         if ( actveh.routeCodeDesc.includes(this.props.selectedRouteCodeArr)) {
    //           filteredVehicle.push(actveh);
    //         } else {
    //         }
    //       });
    //   }
    // }

    if (
      this.props.selectedRouteCodeArr &&
      this.props.selectedRouteCodeArr.length > 0
    ) {
      // if (filteredVehicle.length > 0) {
      //   let tempfilteredVeh = filteredVehicle;
      //   
      //   filteredVehicle = [];

      //   tempfilteredVeh.map((fvel) => {
      //     
      //     if (
      //       fvel.routeCodeDesc.length > 0 &&
      //       (this.props.selectedRouteCodeArr.includes("None") ? fvel.routeCodeDesc === "None" || fvel.routeCodeDesc === "" : fvel.routeCodeDesc.includes(this.props.selectedRouteCodeArr))
      //     ) {
      //       filteredVehicle.push(fvel);
      //     }
      //   });
      // } else {
      //   this.props.vehicles &&
      //     this.props.vehicles.length > 0 &&
      //     this.props.vehicles.map((actveh) => {
      //       
      //       
      //       if (
      //         (this.props.selectedRouteCodeArr.includes("None") ? actveh.routeCodeDesc === "None" || actveh.routeCodeDesc === "" : actveh.routeCodeDesc.includes(this.props.selectedRouteCodeArr))
      //       ) {
      //         filteredVehicle.push(actveh);
      //       }
      //     });
      // }

      if (filteredVehicle.length > 0) {
        let tempfilteredVeh = filteredVehicle;
 
        filteredVehicle = [];

        tempfilteredVeh.map((fvel) => {

          // Loop through the days (keys)
          const routeKeys = [
            "fridayRCDesc",
            "mondayRCDesc",
            "tuesdayRCDesc",
            "wednesdayRCDesc",
            "tuesdayRCDesc",
          ];

          const isSelectedRouteCode = routeKeys.some((key) => {
            // Check if the selected route code exists in any of the day-related keys
            return this.props.selectedRouteCodeArr.includes("None")
              ? fvel[key] === "None" || fvel[key] === ""
              : fvel[key] &&
                  fvel[key].includes(this.props.selectedRouteCodeArr);
          });

          if (isSelectedRouteCode) {
            filteredVehicle.push(fvel);
          }
        });
      } else {
        this.props.vehicles &&
          this.props.vehicles.length > 0 &&
          this.props.vehicles.map((actveh) => {
      

            // Loop through the days (keys)
            const routeKeys = [
              "fridayRCDesc",
              "mondayRCDesc",
              "tuesdayRCDesc",
              "wednesdayRCDesc",
              "tuesdayRCDesc",
            ];

            const isSelectedRouteCode = routeKeys.some((key) => {
              // Check if the selected route code exists in any of the day-related keys
              return this.props.selectedRouteCodeArr.includes("None")
                ? actveh[key] === "None" || actveh[key] === ""
                : actveh[key] &&
                    actveh[key].includes(this.props.selectedRouteCodeArr);
            });

            if (isSelectedRouteCode) {
              filteredVehicle.push(actveh);
            }
          });
      }
    }

   
    // const vehicles =
    //   filteredVehicle.length > 0 ? filteredVehicle : this.props.vehicles;
    // const drivers = this.props.drivers;
    // const TripsDocData = this.props.dropsPanel;

    const vehicles =
      filteredVehicle.length > 0
        ? filteredVehicle
        : this.props.selectedRouteCodeArr &&
          this.props.selectedRouteCodeArr.length > 0
        ? filteredVehicle
        : this.props.vehicles;
    const drivers = this.props.drivers;
    const TripsDocData = this.props.dropsPanel;

    // 


    return (
      <div
        className="schedule-control-section"
        onDragOver={(evnt) => this.dragOver(evnt)}
        onDrop={(evnt) => this.drop(evnt)}
      >
        <div className="col-lg-12 control-section">
          <div className="control-wrapper drag-sample-wrapper">
            <div className="schedule-container">
              <ScheduleComponent
                allowResizing={false}
                allowDragAndDrop={false}
                locale={loc}
                actionBegin={this.onSchActionBegin.bind(this)}
                actionComplete={this.onSchActionComplete.bind(this)}
                rowAutoHeight={true}
                ref={(schedule) => (this.scheduleObj = schedule)}
                popupOpen={this.onPopupOpen.bind(this)}
                cssClass="schedule-drag-drop"
                width="100%"
                height="650px"
                selectedDate={
                  this.state.selectedDate || this.props.selectedDate
                }
                currentView="TimelineDay"
                resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
                eventSettings={{
                  dataSource: TripsDocData,
                  template: this.eventTemplate.bind(this),
                  enableMaxHeight: false,
                  fields: {
                    id: "docnum",
                    subject: { name: "bpcode" },
                    isAllDay: false,
                    startTime: { name: "docdate" },
                    endTime: { name: "docdate" },
                  },
                }}
                group={{ enableCompactView: false, resources: ["Consultants"] }}
                actionBegin={this.onActionBegin.bind(this)}
                drag={this.onItemDrag.bind(this)}
                timeScale={{ enable: false }}
                viewChange={this.onViewChange} // Attach viewChange event
              >
                <ResourcesDirective>
                  {" "}
                  <ResourceDirective
                    field="vehicleCode"
                    title="vehicleCode"
                    name="Consultants"
                    allowMultiple={false}
                    dataSource={vehicles}
                    textField="codeyve"
                    idField="codeyve"
                    groupIDField="GroupId"
                    colorField={this.bgcolor("doctype")}
                  ></ResourceDirective>
                </ResourcesDirective>
                <ViewsDirective>
                  <ViewDirective option="TimelineDay" />
                  <ViewDirective
                    option="TimelineWorkWeek"
                    displayName="Week"
                    allowVirtualScrolling={true}
                  />
                </ViewsDirective>
                <Inject
                  services={[TimelineViews, TimelineMonth, Resize, DragAndDrop]}
                />
              </ScheduleComponent>
              {/* <ScheduleComponent
  allowResizing={false}
  allowDragAndDrop={false}
  locale={loc}
  actionBegin={this.onSchActionBegin.bind(this)}
  actionComplete={this.onSchActionComplete.bind(this)}
  rowAutoHeight={true}
  ref={(schedule) => (this.scheduleObj = schedule)}
  popupOpen={this.onPopupOpen.bind(this)}
  cssClass="schedule-drag-drop"
  width="100%"
  height="650px"
  selectedDate={this.props.selectedDate}
  currentView="TimelineDay" // Set the default view to TimelineDay
  resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
  eventSettings={{
    dataSource: TripsDocData,
    template: this.eventTemplate.bind(this),
    enableMaxHeight: false,
    fields: {
      id: "docnum",
      subject: { name: "bpcode" },
      isAllDay: false,
      startTime: { name: "docdate" },
      endTime: { name: "docdate" },
    },
  }}
  group={{ enableCompactView: false, resources: ["Consultants"] }}
  actionBegin={this.onActionBegin.bind(this)}
  drag={this.onItemDrag.bind(this)}
  timeScale={{ enable: false }}
>
  <ResourcesDirective>
    <ResourceDirective
      field="vehicleCode"
      title="vehicleCode"
      name="Consultants"
      allowMultiple={false}
      dataSource={vehicles}
      textField="codeyve"
      idField="codeyve"
      groupIDField="GroupId"
      colorField={this.bgcolor("doctype")}
    />
  </ResourcesDirective>
  <ViewsDirective>
    <ViewDirective option="TimelineDay" />
    <ViewDirective
      option="TimelineWorkWeek"
      displayName="Week"
      allowVirtualScrolling={true}
    />
  </ViewsDirective>
  <Inject
    services={[TimelineViews, TimelineMonth, Resize, DragAndDrop]}
  />
</ScheduleComponent> */}
            </div>
            {this.state.showEditorTemplate && (
              <EditorTemp
                onClose={this.hideModal}
                onSave={this.saveModal}
                onCreated={this.onCreated}
                SelectedDocData={this.state.EditorData}
              />
            )}
          </div>
          <Confirm
            show={this.state.addConfirmShow}
            onHide={this.onConfirmNo}
            confirmTrip={this.onConfirmYes}
            confirmMessage={this.state.confirmMessage}
          ></Confirm>

          <ConfirmRouteCode
            show={this.state.addRouteCodeConfirmShow}
            onConfirm={() => {
              // Execute confirmAction stored in state
              this.state.confirmAction();
              this.setState({ addRouteCodeConfirmShow: false });  // Close modal after confirmation
            }}
            onCancel={() => this.setState({ addRouteCodeConfirmShow: false })}  // Close modal if cancelled
            confirmMessage={this.state.confirmMessage}
          ></ConfirmRouteCode>

          <ConfirmOtherRC
            show={this.state.addotherRCConfirmShow}
            onHide={this.onOtherRCConfirmNo}
            confirmTrip={this.onOtherRCConfirm}
            confirmMessage={this.state.confirmMessage}
          ></ConfirmOtherRC>

          <DisplayInformationIconDetails1
            show={this.state.addInfoShow}
            onInfoIconHide={addInfoIconClose}
            data={this.state.speciality}
            vehicle={this.state.clickedVeh}
            dataName="vinfo"
            dataType="object"
          ></DisplayInformationIconDetails1>
          <Alert
            show={this.state.addAlertShow}
            onHide={addAlertClose}
            errorMessage={this.state.errorMessage}
          ></Alert>
        </div>
      </div>
    );
  }
}
const ScheduleTrips = React.forwardRef((props, ref) => (
  <ExternalDragDrop {...props} ref={ref} />
));
export default ScheduleTrips;
