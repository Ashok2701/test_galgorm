import React from "react";
import Drops3 from "./Drops3";
import TripList3 from "./TripsList3";
import moment from "moment";
import "moment-timezone";
import { withNamespaces } from "react-i18next";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { AgGridReact } from "ag-grid-react";
import Checkbox from "@mui/material/Checkbox";
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
import "../dashboard.scss";
import classnames from "classnames";
import ExternalDrops3 from "./ExternalDrops3";
class DocumentsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "Documents",
      ToPlanchecked: false,
      Todropchecked: false,
      ToPickchecked: false,
      ToDeliverable: false,
      ToNotDeliverable: false,
      Todayschecked: false,
      To5dayschecked: false,
      openRecords: false,
      ToShowinMap: false,
      OptimisedRecords: false,
      LockedRecords: false,
      ValidateRecords: false,
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  checkBoxChange = () => {
    // console.log("T222 docpanel - to plan change");
    this.setState({ ToPlanchecked: !this.state.ToPlanchecked });
    this.props.checkedToPlan(!this.state.ToPlanchecked);
  };

  LockcheckBoxChange = () => {
    // console.log("T222 docpanel - LockcheckBoxChange");
    this.setState({ LockedRecords: !this.state.LockedRecords });
    this.props.OnCheckedToLock(!this.state.LockedRecords);
  };

  ValidatecheckBoxChange = () => {
    // console.log("T222 docpanel - ValidatecheckBoxChange");
    this.setState({ ValidateRecords: !this.state.ValidateRecords });
    this.props.OnCheckedToValidate(!this.state.ValidateRecords);
  };

  OnShowMapcheckBoxChange = () => {
    // console.log("T222 docpanel - Showin Map");
    this.setState({ ToShowinMap: !this.state.ToShowinMap });
    this.props.OnCheckedToShowoverMap(!this.state.ToShowinMap);
  };

  OpencheckBoxChange = () => {
    // console.log("T222 docpanel - OpencheckBoxChange");
    this.setState({ openRecords: !this.state.openRecords });
    this.props.OnCheckedToOpen(!this.state.openRecords);
  };

  OptimisecheckBoxChange = () => {
    // console.log("T222 docpanel - OptimisecheckBoxChange");
    this.setState({ OptimisedRecords: !this.state.OptimisedRecords });
    this.props.OnCheckedToOptimise(!this.state.OptimisedRecords);
  };

  OnDropscheckBoxChange = () => {
    // console.log("T222 docpanel - to plan change");
    this.setState({ Todropchecked: !this.state.Todropchecked });
    this.props.OncheckedTodropList(!this.state.Todropchecked);
  };

  OnPickupscheckBoxChange = () => {
    // console.log("T222 docpanel - to plan change");
    this.setState({ ToPickchecked: !this.state.ToPickchecked });
    this.props.OncheckedToPickupList(!this.state.ToPickchecked);
  };

  OnDelierablecheckBoxChange = () => {
    // console.log("T222 docpanel - to plan change");
    this.setState({ ToDeliverable: !this.state.ToDeliverable });
    this.props.OncheckedToDeliverableList(!this.state.ToDeliverable);
  };

  OnNotDeliverablecheckBoxChange = () => {
    // console.log("T222 docpanel - to plan change");
    this.setState({ ToNotDeliverable: !this.state.ToNotDeliverable });
    this.props.OncheckedToNotDeliverableList(!this.state.ToNotDeliverable);
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        Todayschecked: false,
      });
    }
  }

  dayscheckBoxChange = () => {
    // console.log("T222 docpanel - dayscheckbox change");
    this.setState({ Todayschecked: !this.props.documentPanel_5dayscheck });
    this.props.checked5daysfromDocumentPanel(
      !this.props.documentPanel_5dayscheck
    );
  };

  onDateselection = (date, event) => {
 

    const parseDate = new Date(Date.parse(date)).toString();


    const SelParsedate = moment.tz(parseDate, "").format("YYYY/MM/DD");
   

    const Seldate = moment(date[0]).format("YYYY-MM-DD");
 
    this.props.documentPanelDateChange(SelParsedate);
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

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  SearchDrops = (e) => {
 
    // console.log("search drop",e)
    this.props.updateDropSearchTerm(e);
  };

  SearchTrips = (e) => {
  
    this.props.updateTripsSearchTerm(e);
  };

  render() {
    const site = "";
    // console.log("T6 inside docpanel - flag",this.props.daysCheckedIn)
    //const currDate = moment(this.props.selectedDate).format('YYYY-MM-DD');
    const currDate = moment
      .tz(this.props.selectedDate, "")
      .format("YYYY-MM-DD");
    const today = moment().format('YYYY-MM-DD');

    let SelectedDate = "";

    if (this.props.currentView != "TimelineWorkWeek") {
      if (this.props.documentPanel_dateflg) {
        // console.log("TkTk date flag", this.props.documentPanel_dateflg);
        // console.log("TkTk date flag", this.props.documentPanel_date);
        // console.log("TkTk date flag", this.props.documentPanel_dateflg);
        SelectedDate = this.props.documentPanel_date;

        // console.log(SelectedDate ,"this is selected date in doc panel")
      } else {
        SelectedDate = today
      }
    }


    let filterTrips;
    

    if (this.props.tripsList) {
      // console.log("T11 inside triplist",this.props.tripsList);
      filterTrips = this.props.tripsList.filter((trip) => {
        // console.log("T11 inside trip",trip);
        // console.log("T11 state of open ",this.state.openRecords);
        if (
          this.state.openRecords &&
          this.state.LockedRecords &&
          this.state.ValidateRecords &&
          this.state.OptimisedRecords
        ) {
     
          return (
            trip.optistatus === "Open" ||
            trip.optistatus === "Optimized" ||
            trip.lock === true ||
            trip.tmsValidated === true
          );
        }
        if (
          !this.state.openRecords &&
          this.state.LockedRecords &&
          this.state.ValidateRecords &&
          this.state.OptimisedRecords
        ) {
       
          return (
            trip.optistatus === "Optimized" ||
            trip.lock === true ||
            trip.tmsValidated === true
          );
        }
        if (
          this.state.openRecords &&
          !this.state.LockedRecords &&
          this.state.ValidateRecords &&
          this.state.OptimisedRecords
        ) {
       
          return (
            (trip.optistatus === "Open" ||
              trip.tmsValidated === true) ||
            (trip.optistatus === "Optimized" && trip.lock !== true)
          );
        }
        if (
          this.state.openRecords &&
          this.state.LockedRecords &&
          !this.state.ValidateRecords &&
          this.state.OptimisedRecords
        ) {
    
          return (
            (trip.optistatus === "Open" ||
              trip.optistatus === "Optimized" ||
              trip.lock === true) && trip.tmsValidated == false
          );
        }
        if (
          this.state.openRecords &&
          this.state.LockedRecords &&
          this.state.ValidateRecords &&
          !this.state.OptimisedRecords
        ) {
  
          return (
            (trip.optistatus === "Open" || trip.lock === true || trip.tmsValidated === true) && ![5, 6, 7, 10].includes(trip.lvsStatus)
          );
        }
        // 2 elements
        if (
          this.state.openRecords &&
          this.state.LockedRecords &&
          !this.state.ValidateRecords &&
          !this.state.OptimisedRecords
        ) {
      
          return (trip.optistatus === "Open" || trip.lock === true) && trip.tmsValidated == false
        }
        if (
          this.state.openRecords &&
          !this.state.LockedRecords &&
          this.state.ValidateRecords &&
          !this.state.OptimisedRecords
        ) {
          return (
            (trip.optistatus === "Open" || trip.tmsValidated === true) &&
            ![5, 6, 7, 10].includes(trip.lvsStatus)
          );
        }
        if (
          this.state.openRecords &&
          !this.state.LockedRecords &&
          !this.state.ValidateRecords &&
          this.state.OptimisedRecords
        ) {
    
          return ((trip.optistatus === "Open" || trip.optistatus === "Optimized") && trip.tmsValidated == false && trip.lock == false
          )

        }
        if (
          !this.state.openRecords &&
          this.state.LockedRecords &&
          this.state.ValidateRecords &&
          !this.state.OptimisedRecords
        ) {
      
          return trip.lock === true || trip.tmsValidated === true;
        }
        if (
          !this.state.openRecords &&
          this.state.LockedRecords &&
          !this.state.ValidateRecords &&
          this.state.OptimisedRecords
        ) {
     
          return ((trip.optistatus === "Optimized" || trip.lock === true) && trip.tmsValidated == false

          );
        }
        if (
          !this.state.openRecords &&
          !this.state.LockedRecords &&
          this.state.ValidateRecords &&
          this.state.OptimisedRecords
        ) {
     
          return (
            (trip.optistatus === "Optimized" && trip.lock === false) ||
            (trip.tmsValidated === true && trip.lock === true)
          );


        }

        //1 element
        if (
          this.state.openRecords &&
          !this.state.LockedRecords &&
          !this.state.ValidateRecords &&
          !this.state.OptimisedRecords
        ) {
  
          return trip.optistatus === "Open";
        }
        if (
          !this.state.openRecords &&
          this.state.LockedRecords &&
          !this.state.ValidateRecords &&
          !this.state.OptimisedRecords
        ) {
     
          return trip.lock === true && trip.tmsValidated === false;
        }
        if (
          !this.state.openRecords &&
          !this.state.LockedRecords &&
          this.state.ValidateRecords &&
          !this.state.OptimisedRecords
        ) {
      
          return trip.tmsValidated === true;
        }
        if (
          !this.state.openRecords &&
          !this.state.LockedRecords &&
          !this.state.ValidateRecords &&
          this.state.OptimisedRecords
        ) {
          
          return (
            trip.optistatus === "Optimized" && trip.lock === false && trip.tmsValidated === false
          );
        } else {
         
          return trip;
        }
      });

    
      if (this.props.searchTrip.length > 1) {
        filterTrips = filterTrips.filter((trip) => {
          return (
            trip.itemCode
              .toLowerCase()
              .indexOf(this.props.searchTrip.toLowerCase()) !== -1 ||
            trip.code
              .toLowerCase()
              .indexOf(this.props.searchTrip.toLowerCase()) !== -1 ||
            trip.driverName
              .toLowerCase()
              .indexOf(this.props.searchTrip.toLowerCase()) !== -1
          );

          // console.log("inside search and filter trips",trip);
        });
      }
    }

    let filterDrops;
    let filterPickups;
    if (this.props.dropsPanel) {
      filterDrops = this.props.dropsPanel.filter((drop) => {
        if (
          this.state.ToPlanchecked &&
          !this.state.Todropchecked &&
          !this.state.ToPickchecked &&
          !this.state.ToDeliverable &&
          !this.state.ToNotDeliverable
        ) {
          return (
            drop.type === "open" &&
            (drop.dlvystatus === "0" || drop.dlvystatus === "8")
          );
        } else if (
          !this.state.ToPlanchecked &&
          this.state.Todropchecked &&
          !this.state.ToPickchecked
        ) {
          return drop.movtype === "DROP";
        } else if (
          !this.state.ToPlanchecked &&
          !this.state.Todropchecked &&
          this.state.ToPickchecked
        ) {
          return drop.movtype === "PICK";
        } else if (
          this.state.ToPlanchecked &&
          this.state.Todropchecked &&
          !this.state.ToPickchecked
        ) {
          return (
            drop.type === "open" &&
            (drop.dlvystatus === "0" || drop.dlvystatus === "8") &&
            drop.movtype === "DROP"
          );
        } else if (
          this.state.ToPlanchecked &&
          !this.state.Todropchecked &&
          this.state.ToPickchecked
        ) {
          return (
            drop.type === "open" &&
            (drop.dlvystatus === "0" || drop.dlvystatus === "8") &&
            drop.movtype === "PICK"
          );
        } else {
          return drop;
        }

        

        /*
                    if(site === ""){
                      return ((drop.docnum.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (drop.bpcode.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (drop.bpname.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (drop.doctype.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (drop.poscode.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (String(drop.netweight).indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (String(drop.volume).indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1)  || (drop.type.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1));

                    }
                    else {
                       return (((drop.docnum.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (drop.bpcode.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (drop.bpname.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (drop.doctype.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (drop.poscode.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (String(drop.netweight).indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (String(drop.volume).indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1)  || (drop.type.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1)) && (drop.site === site));
                    }
                    */
      });

      if (this.props.selectedRouteCodeArr.length > 0) {
        let SelectedRouteCodes = this.props.selectedRouteCodeArr;
        filterDrops = filterDrops.filter((drop) => {
          return SelectedRouteCodes.includes(drop.routeCodeDesc);
        });
      }

      // if (this.props.searchDrp.length > 1) {

      //   console.log("this is search drop while checking search", this.props.searchDrp)
      //   filterDrops = filterDrops.filter((drop) => {
      //     // console.log(drop ,"this is droppppp")
      //     if (site === "") {
      //       return (
      //         drop.docnum
      //           .toLowerCase()
      //           .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
      //         // drop.bpcode?.toLowerCase()
      //         //   .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
      //         // drop.carrier
      //         //    .toLowerCase()
      //         //    .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
      //         // drop.bpname
      //         //   .toLowerCase()
      //         //   .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
      //         drop.doctype
      //           .toLowerCase()
      //           .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
      //         drop.poscode
      //           .toLowerCase()
      //           .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
      //         String(drop.netweight).indexOf(
      //           this.props.searchDrp.toLowerCase()
      //         ) !== -1 ||
      //         String(drop.volume).indexOf(
      //           this.props.searchDrp.toLowerCase()
      //         ) !== -1 ||
      //         drop.type
      //           .toLowerCase()
      //           .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
      //         drop.city
      //           .toLowerCase()
      //           .indexOf(this.props.searchDrp.toLowerCase()) !== -1 || 
      //           drop.routeCodeDesc
      //           .toLowerCase()
      //           .indexOf(this.props.searchDrp.toLowerCase()) !== -1 
      //       );
      //     } else {
      //       return (
      //         (drop.docnum
      //           .toLowerCase()
      //           .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
      //           drop.bpcode
      //             .toLowerCase()
      //             .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
      //           drop.carrier
      //             .toLowerCase()
      //             .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
      //           // drop.bpname
      //           //   .toLowerCase()
      //           //   .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
      //           drop.doctype
      //             .toLowerCase()
      //             .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
      //           drop.poscode
      //             .toLowerCase()
      //             .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
      //           drop.city
      //             .toLowerCase()
      //             .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
      //           String(drop.netweight).indexOf(
      //             this.props.searchDrp.toLowerCase()
      //           ) !== -1 ||
      //           String(drop.volume).indexOf(
      //             this.props.searchDrp.toLowerCase()
      //           ) !== -1 ||
      //           drop.type
      //             .toLowerCase()
      //             .indexOf(this.props.searchDrp.toLowerCase()) !== -1) &&
      //         drop.site === site ||
      //         drop.routeCodeDesc
      //           .toLowerCase()
      //           .indexOf(this.props.searchDrp.toLowerCase()) !== -1 
      //       );
      //     }
      //   });
      // }
      if (this.props.searchDrp.length > 1) {

        const searchTerm = this.props.searchDrp.toLowerCase();
      
        const matchesSearchTerm = (value) => 
          value ? value.toLowerCase().indexOf(searchTerm) !== -1 : false;
      
        filterDrops = filterDrops.filter((drop) => {
          if (site === "") {
            return (
              matchesSearchTerm(drop.docnum) ||
              matchesSearchTerm(drop.bpcode) ||
              matchesSearchTerm(drop.bpname) ||
              matchesSearchTerm(drop.doctype) ||
              matchesSearchTerm(drop.poscode) ||
              String(drop.netweight).indexOf(searchTerm) !== -1 ||
              String(drop.volume).indexOf(searchTerm) !== -1 ||
              matchesSearchTerm(drop.type) ||
              matchesSearchTerm(drop.city) ||
              matchesSearchTerm(drop.routeCodeDesc)
            );
          } else {
            return (
              (matchesSearchTerm(drop.docnum) ||
               matchesSearchTerm(drop.bpcode) ||
               matchesSearchTerm(drop.bpname) ||
               matchesSearchTerm(drop.carrier) ||
               matchesSearchTerm(drop.doctype) ||
               matchesSearchTerm(drop.poscode) ||
               matchesSearchTerm(drop.city) ||
               String(drop.netweight).indexOf(searchTerm) !== -1 ||
               String(drop.volume).indexOf(searchTerm) !== -1 ||
               matchesSearchTerm(drop.type)) &&
              drop.site === site ||
              matchesSearchTerm(drop.routeCodeDesc)
            );
          }
        });
      }
      
    }


    // console.log("Trips count =", filterTrips);




    // writing document for toplan status to active tour

    // delete trippp
    // if(this.props.deleteTripDocNo){
    //   filterDrops.forEach((item)=>{
    //     if(item.docnum == this.props.deleteTripDocNo){
    //       item.dlvystatus = "8"; 
    //     }
    //   })
    // }

    // filterDrops.forEach(item => {
    //   // console.log(item.docnum ,this.props.selectedTripData.docnum ,"thisssssssssssssssssss")

    //     if (item.docnum === this.props.selectedTripData.docnum) {
    //       item.dlvystatus = "1";  // Update dlvyStatus to "1"
    //     }


    // });

    if (filterDrops && Array.isArray(filterDrops)) {
      filterDrops.forEach(item => {
        if (item && item.docnum && this.props.selectedTripData && this.props.selectedTripData.docnum) {
          if (item.docnum === this.props.selectedTripData.docnum) {
            item.dlvystatus = "1";  // Update dlvyStatus to "1"
          }
        }
      });
    }



    // console.log(this.props.selectedTripData ,"this is selected trip data inside docspanel")


    // end of the toplain status for active tour

    // console.log("filter trips")





    let ToPlanCount = 0;
    let InboundCount = 0;
    let OutboundCount = 0;
    let externalToplan=0;
    let externalInbound=0;
    let externalOutbound=0;
    let OpenTripsCount = 0;
    let OptimisedTripsCount = 0;
    let LockedTripsCount = 0;
    let ValidatedTripsCount = 0;

    this.props.tripsList &&
      this.props.tripsList.map((trip, k) => {
        if (trip.optistatus === "Open") {
          OpenTripsCount = OpenTripsCount + 1;
        }
        if (trip.optistatus === "Optimized" && trip.lock === false) {
          OptimisedTripsCount = OptimisedTripsCount + 1;
        }
        if (trip.lock === true && trip.optistatus === "Optimized" && trip.tmsValidated != true) {
          LockedTripsCount = LockedTripsCount + 1;
        }
        if (trip.tmsValidated === true &&
          ![5, 6, 7, 10].includes(trip.lvsStatus)) {
          ValidatedTripsCount = ValidatedTripsCount + 1;
        }
      });

    filterDrops &&
    filterDrops.map((drop, i) => {
        // To plan count
        if (
          drop.type === "open" &&
          (drop.dlvystatus === "0" || drop.dlvystatus === "8")
        ) {
          ToPlanCount = ToPlanCount + 1;
        }

        // external document toplan
        if (
          drop.type === "open" &&
          (drop.dlvystatus === "0" || drop.dlvystatus === "8") && drop.carrier == "EXTERNAL" || drop.carrier == "DPD" || drop.carrier == "MONTGOMERY"
        ) {
          // ToPlanCount = ToPlanCount + 1;
          externalToplan+=1
        }

        //To drop
        if (drop.movtype === "DROP") {
          OutboundCount = OutboundCount + 1;
        }     

        //To Pickup

        if (drop.movtype === "PICK") {
          InboundCount = InboundCount + 1;
        }

        if (drop.movtype === "DROP" && drop.carrier == "EXTERNAL" || drop.carrier == "DPD" || drop.carrier == "MONTGOMERY") {
          // OutboundCount = OutboundCount + 1;
          externalOutbound+=1
        }

        if (drop.movtype === "PICK" && drop.carrier == "EXTERNAL" || drop.carrier == "DPD" || drop.carrier == "MONTGOMERY") {
          // OutboundCount = OutboundCount + 1;
          externalInbound+=1
        }

     
      });


    // console.log(this.props.dropsPanel, "this is toplancounttttt")
console.log(filterDrops ,"these are filtered drops checking")

let externalCount = filterDrops?.filter((doc)=>doc.carrier== "EXTERNAL"|| doc.carrier == "DPD" || doc.carrier == "MONTGOMERY").length || 0;


    return (
      <>
        <div class="documentPanel" style={{ height: "100%" }}>
          <div className="d-flex justify-content-between align-items-center">
            <Nav tabs className="nav-tabs-custom nav-justified">
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: this.state.activeTab === "Documents",
                  })}
                  onClick={() => {
                    this.toggleTab("Documents");
                  }}
                >
                  <span style={{ fontWeight: "bolder", fontSize: "large" }}>
                    {this.props.t("Documents")}[{filterDrops.length}]
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: this.state.activeTab === "Trips",
                  })}
                  onClick={() => {
                    this.toggleTab("Trips");
                  }}
                >
                  <span style={{ fontWeight: "bolder", fontSize: "large" }}>
                    {this.props.t("Trips")}[{filterTrips.length}]
                  </span>
                </NavLink>
              </NavItem>


              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: this.state.activeTab === "External",
                  })}
                  onClick={() => {
                    this.toggleTab("External");
                  }}
                >
                  <span style={{ fontWeight: "bolder", fontSize: "large" }}>
                    {this.props.t("External")}
                    [{externalCount}]
                  </span>
                </NavLink>
              </NavItem>
            </Nav>

            {/* documents */}
            {this.state.activeTab === "Documents" && (
              <div className="d-flex align-items-center">
                <FormGroup className="mb-0 mr-3">
                  <Flatpickr
                    className="form-control"
                    placeholder="Select Date.."
                    value={SelectedDate}
                    onChange={this.onDateselection}
                  />
                </FormGroup>

                <FormGroup className="mb-0 mr-4 bg">
                  <Input
                    bsSize="md"
                    type="search"
                    placeholder={this.props.t("SearchCaption")}
                    className="form-control"
                    onChange={this.SearchDrops}
                    value={this.props.searchDrp}
                  />
                </FormGroup>

                <div
                  className="custom-control custom-checkbox mb-2 mr-3"
                  style={{ fontWeight: "bolder", fontSize: "large" }}
                >
                  <Input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={() => this.OnDropscheckBoxChange()}
                    checked={this.state.Todropchecked}
                  />
                  <Label
                    className="custom-control-label"
                    onClick={() => {
                      this.setState({
                        Todropchecked: !this.state.Todropchecked,
                      });
                    }}
                  >
                    {this.props.t("Outbound")}[{OutboundCount}]
                  </Label>
                </div>

                <div
                  className="custom-control custom-checkbox mb-2 mr-3"
                  style={{ fontWeight: "bolder", fontSize: "large" }}
                >
                  <Input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={() => this.OnPickupscheckBoxChange()}
                    checked={this.state.ToPickchecked}
                  />
                  <Label
                    className="custom-control-label"
                    onClick={() => {
                      this.setState({
                        ToPickchecked: !this.state.ToPickchecked,
                      });
                    }}
                  >
                    {this.props.t("Inbound")}[{InboundCount}]
                  </Label>
                </div>



                <div
                  className="custom-control custom-checkbox mb-2 mr-3"
                  style={{ fontWeight: "bolder", fontSize: "large" }}
                >
                  <Input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={() => this.checkBoxChange()}
                    checked={this.state.ToPlanchecked}
                  />
                  <Label
                    className="custom-control-label"
                    onClick={() => {
                      this.setState({
                        ToPlanchecked: !this.state.ToPlanchecked,
                      });
                    }}
                  >
                    {this.props.t("ToPlan")}[{ToPlanCount}]
                  </Label>
                </div>
                <div
                  className="d-inline-block"
                  style={{ paddingRight: "40px", alignSelf: "center" }}
                >
                  <Button
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      marginRight: "20%",
                      marginLeft: "20%",
                    }}
                    onClick={() => this.props.refreshDocspanel()}
                  >
                    {this.props.t("Update")}
                  </Button>
                </div>
              </div>
            ) 
            }
{/* for external documents checking */}
{this.state.activeTab === "External" && (
              <div className="d-flex align-items-center">
                <FormGroup className="mb-0 mr-3">
                  <Flatpickr
                    className="form-control"
                    placeholder="Select Date.."
                    value={SelectedDate}
                    onChange={this.onDateselection}
                  />
                </FormGroup>

                <FormGroup className="mb-0 mr-4 bg">
                  <Input
                    bsSize="md"
                    type="search"
                    placeholder={this.props.t("SearchCaption")}
                    className="form-control"
                    onChange={this.SearchDrops}
                    value={this.props.searchDrp}
                  />
                </FormGroup>

                <div
                  className="custom-control custom-checkbox mb-2 mr-3"
                  style={{ fontWeight: "bolder", fontSize: "large" }}
                >
                  <Input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={() => this.OnDropscheckBoxChange()}
                    checked={this.state.Todropchecked}
                  />
                  <Label
                    className="custom-control-label"
                    onClick={() => {
                      this.setState({
                        Todropchecked: !this.state.Todropchecked,
                      });
                    }}
                  >
                    {this.props.t("Outbound")}[{externalOutbound}]
                  </Label>
                </div>

                <div
                  className="custom-control custom-checkbox mb-2 mr-3"
                  style={{ fontWeight: "bolder", fontSize: "large" }}
                >
                  <Input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={() => this.OnPickupscheckBoxChange()}
                    checked={this.state.ToPickchecked}
                  />
                  {/* <Label
                    className="custom-control-label"
                    onClick={() => {
                      this.setState({
                        ToPickchecked: !this.state.ToPickchecked,
                      });
                    }}
                  >
                    {this.props.t("Inbound")}[{externalInbound}]
                  </Label> */}
                </div>



                <div
                  className="custom-control custom-checkbox mb-2 mr-3"
                  style={{ fontWeight: "bolder", fontSize: "large" }}
                >
                  <Input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={() => this.checkBoxChange()}
                    checked={this.state.ToPlanchecked}
                  />
                  <Label
                    className="custom-control-label"
                    onClick={() => {
                      this.setState({
                        ToPlanchecked: !this.state.ToPlanchecked,
                      });
                    }}
                  >
                    {this.props.t("ToPlan")}[{externalToplan}]
                  </Label>
                </div>
                <div
                  className="d-inline-block"
                  style={{ paddingRight: "40px", alignSelf: "center" }}
                >
                  <Button
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      marginRight: "20%",
                      marginLeft: "20%",
                    }}
                    onClick={() => this.props.refreshDocspanel()}
                  >
                    {this.props.t("Update")}
                  </Button>
                </div>
              </div>
            ) 
            }

{/* trips tab */}
            {this.state.activeTab === "Trips" &&(
              <div className="d-flex align-items-center">
                <FormGroup className="mb-0 mr-3">
                  <Flatpickr
                    className="form-control"
                    placeholder="Select Date.."
                    dateformat="d/m/Y"
                    value={SelectedDate}
                    onChange={this.onDateselection}
                  />
                </FormGroup>

                <FormGroup className="mb-0 mr-4">
                  <Input
                    bsSize="md"
                    type="search"
                    placeholder={this.props.t("SearchCaption")}
                    className="form-control"
                    value={this.props.searchTrip}
                    onChange={this.SearchTrips}
                  />
                </FormGroup>
                <div
                  className="custom-control custom-checkbox mb-2 mr-3"
                  style={{ fontWeight: "bolder", fontSize: "large" }}
                >
                  <Input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={() => this.OpencheckBoxChange()}
                    checked={this.state.openRecords}
                  />
                  <Label
                    className="custom-control-label"
                    onClick={() => {
                      this.setState({
                        openRecords: !this.state.openRecords,
                      });
                    }}
                  >
                    {this.props.t("Open")}[{OpenTripsCount}]
                  </Label>
                </div>
                <div
                  className="custom-control custom-checkbox mb-2 mr-3"
                  style={{ fontWeight: "bolder", fontSize: "large" }}
                >
                  <Input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={() => this.OptimisecheckBoxChange()}
                    checked={this.state.OptimisedRecords}
                  />
                  <Label
                    className="custom-control-label"
                    onClick={() => {
                      this.setState({
                        OptimisedRecords: !this.state.OptimisedRecords,
                      });
                    }}
                  >
                    {this.props.t("Optimised")}[{OptimisedTripsCount}]
                  </Label>
                </div>

                <div
                  className="custom-control custom-checkbox mb-2 mr-3"
                  style={{ fontWeight: "bolder", fontSize: "large" }}
                >
                  <Input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={() => this.LockcheckBoxChange()}
                    checked={this.state.LockedRecords}
                  />
                  <Label
                    className="custom-control-label"
                    onClick={() => {
                      this.setState({
                        LockedRecords: !this.state.LockedRecords,
                      });
                    }}
                  >
                    {this.props.t("Locked")}[{LockedTripsCount}]
                  </Label>
                </div>
                <div
                  className="custom-control custom-checkbox mb-2 mr-3"
                  style={{ fontWeight: "bolder", fontSize: "large" }}
                >
                  <Input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={() => this.ValidatecheckBoxChange()}
                    checked={this.state.ValidateRecords}
                  />
                  <Label
                    className="custom-control-label"
                    onClick={() => {
                      this.setState({
                        ValidateRecords: !this.state.ValidateRecords,
                      });
                    }}
                  >
                    {this.props.t("Validated")}[{ValidatedTripsCount}]
                  </Label>
                </div>
              </div>
            )
          }
          </div>

          <hr className="my-0" />
          <TabContent
            className="xl-tabcontent1"
            activeTab={this.state.activeTab}
          >
            <Drops3
            routeCodes={this.props.routeCodes}
            fetchDocumentPanelDateChange={this.props.fetchDocumentPanelDateChange}
            documentPanel_date={this.props.documentPanel_date}
             currDropsPanel={this.props.dropsPanel}
               pickersList={this.props.pickersList}
              updateDropSearchTerm={this.props.updateDropSearchTerm}
              sortDrop={this.props.sortDrop}
              dropOrder={this.props.dropOrder}
              dropsList={filterDrops}
              dayschecked={this.props.daysCheckedIn}
              currDate={this.props.selectedDate}
              handleDragStart={this.props.handleDragStart}
              updateDocsGeoLocations={this.props.updateDocsGeoLocations}
              selectedDocs={this.props.selectedDocs}
            />
            <TripList3
              tripsList={filterTrips}
              updateTripsSearchTerm={this.props.updateTripsSearchTerm}
              vehiclePanel={this.props.vehiclePanel}
              updateTripsGeoLocations={this.props.updateTripsGeoLocations}
              onVRClick={this.props.onVRClick}
              updateTripsGeolocationbeforelock={
                this.props.updateTripsGeolocationbeforelock
              }
              onLockRecord={this.props.onLockRecord}
              validate={this.props.validate}
              Nonvalidate={this.props.Nonvalidate}
              onCompleteTripDelete={this.props.onCompleteTripDelete}
              onWarningAlertOff={this.props.onWarningAlertOff}
              onLockRecord={this.props.onLockRecord}
              date={this.props.date}
              selectAllTripsPanel={this.props.selectAllTripsPanel}
              routeSchedulerData={this.props.routeSchedulerTime}
              UnlockConfirmTrip={this.props.UnlockConfirmTrip}
              OptimiseConfirmTrip={this.props.OptimiseConfirmTrip}
              onValidateAll={this.props.onValidateAll}
              onloaderMsg={this.props.onLoadermessage}
              onForceseq={this.props.onForcesequnceCheck}
              sites={this.props.sites}
              selectedSite={this.props.selectedSite}
              getValues={this.props.getValues}
            />


            <ExternalDrops3
             routeCodes={this.props.routeCodes}
             fetchDocumentPanelDateChange={this.props.fetchDocumentPanelDateChange}
             documentPanel_date={this.props.documentPanel_date}
              currDropsPanel={this.props.dropsPanel}
                pickersList={this.props.pickersList}
               updateDropSearchTerm={this.props.updateDropSearchTerm}
               sortDrop={this.props.sortDrop}
               dropOrder={this.props.dropOrder}
               dropsList={filterDrops}
               dayschecked={this.props.daysCheckedIn}
               currDate={this.props.selectedDate}
               handleDragStart={this.props.handleDragStart}
               updateDocsGeoLocations={this.props.updateDocsGeoLocations}
               selectedDocs={this.props.selectedDocs}
            />



            
          </TabContent>
        </div>
      </>
    );
  }
}

export default withNamespaces()(DocumentsPanel);
