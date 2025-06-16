import React from "react";
import Drops3 from "./Drops3";
import TripList3 from "./TripsList3";
import moment from "moment";
import "moment-timezone";
import Select from "react-select";
import { withNamespaces } from "react-i18next";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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
       selectedFilteredData : null,
      To5dayschecked: false,
      openRecords: false,
      ToShowinMap: false,
      OptimisedRecords: false,
      LockedRecords: false,
      ValidateRecords: false,
    };
    this.toggleTab = this.toggleTab.bind(this);
  }


     handleFilterChange = item => {

      
      this.props.filteredTripsData(item.value);
      this.setState({
         selectedFilteredData : item
      })
     }


  checkBoxChange = () => {
    // 
    this.setState({ ToPlanchecked: !this.state.ToPlanchecked });
    this.props.checkedToPlan(!this.state.ToPlanchecked);
  };

  LockcheckBoxChange = () => {
    // 
    this.setState({ LockedRecords: !this.state.LockedRecords });
    this.props.OnCheckedToLock(!this.state.LockedRecords);
  };

  ValidatecheckBoxChange = () => {
    // 
    this.setState({ ValidateRecords: !this.state.ValidateRecords });
    this.props.OnCheckedToValidate(!this.state.ValidateRecords);
  };

  OnShowMapcheckBoxChange = () => {
    // 
    this.setState({ ToShowinMap: !this.state.ToShowinMap });
    this.props.OnCheckedToShowoverMap(!this.state.ToShowinMap);
  };

  OpencheckBoxChange = () => {
    // 
    this.setState({ openRecords: !this.state.openRecords });
    this.props.OnCheckedToOpen(!this.state.openRecords);
  };

  OptimisecheckBoxChange = () => {
    // 
    this.setState({ OptimisedRecords: !this.state.OptimisedRecords });
    this.props.OnCheckedToOptimise(!this.state.OptimisedRecords);
  };

  OnDropscheckBoxChange = () => {
    // 
    this.setState({ Todropchecked: !this.state.Todropchecked });
    this.props.OncheckedTodropList(!this.state.Todropchecked);
  };

  OnPickupscheckBoxChange = () => {
    // 
    this.setState({ ToPickchecked: !this.state.ToPickchecked });
    this.props.OncheckedToPickupList(!this.state.ToPickchecked);
  };

  OnDelierablecheckBoxChange = () => {
    // 
    this.setState({ ToDeliverable: !this.state.ToDeliverable });
    this.props.OncheckedToDeliverableList(!this.state.ToDeliverable);
  };

  OnNotDeliverablecheckBoxChange = () => {
    // 
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
    // 
    this.setState({ Todayschecked: !this.props.documentPanel_5dayscheck });
    this.props.checked5daysfromDocumentPanel(
      !this.props.documentPanel_5dayscheck
    );
  };

  onDateselection = (date, event) => {
    
    

    const parseDate = new Date(Date.parse(date)).toString();
    

    const SelParsedate = moment.tz(parseDate, "").format("YYYY/MM/DD");
    

    const Seldate = moment(date[0]).format("YYYY-MM-DD");
    // 
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
    // 
    this.props.updateDropSearchTerm(e);
  };

  SearchTrips = (e) => {
    // 
    this.props.updateTripsSearchTerm(e);
  };

  render() {

   let optionFilterItems = [{value :'Open', label: 'Open'},{value :'Optimized', label: 'Optimized'},{value :'Locked', label: 'Locked'},{value :'Scheduled', label: 'Scheduled'},{value :'In-Process', label: 'In-Process'},{value :'Checked-In', label: 'Checked-In'},{value :'Checked-Out', label: 'Checked-Out'},{value :'Cancelled', label: 'Cancelled'},{value :'Completed', label: 'Completed'}];
        let optionSelected1 = '';

    const site = "";
    // 
    //const currDate = moment(this.props.selectedDate).format('YYYY-MM-DD');
    const currDate = moment
      .tz(this.props.selectedDate, "")
      .format("YYYY-MM-DD");
    let SelectedDate = "";
    if (this.props.documentPanel_dateflg) {
      
      
      
      SelectedDate = this.props.documentPanel_date;
    }

    let filterTrips;

    if (this.props.tripsList) {
      
      filterTrips = this.props.tripsList.filter((trip) => {
         if(this.props.filteredTripData && this.props.filteredTripData.length > 0 ) {

                                               // 

                                           if(this.props.filteredTripData === 'Open') {
                                               return  (trip.routeStatus === "Open")
                                           }
                                           else if(this.props.filteredTripData === 'Optimized') {
                                                 return  (trip.routeStatus === "Optimized")
                                           }
                                            else if(this.props.filteredTripData === 'Locked') {
                                                  return  (trip.routeStatus === 'Locked')
                                              }
                                           else if(this.props.filteredTripData === 'Scheduled') {
                                                                                            return  (trip.routeStatus === 'Scheduled')
                                                                                        }
                                       else if(this.props.filteredTripData === 'In-Process') {
                                                                                        return  (trip.routeStatus === 'In-Process')
                                                                                    }
                                    else if(this.props.filteredTripData === 'Completed') {
                                                                                     return  (trip.routeStatus === 'Compelted')
                                                                                 }
                                   else if(this.props.filteredTripData === 'Cancelled') {
                                                                                    return  (trip.routeStatus === 'Cancelled')
                                                                                }
                                else if(this.props.filteredTripData === 'Checked-In') {
                                                                                                                   return  (trip.routeStatus === 'Checked-In')
                                                                                                               }
                                else if(this.props.filteredTripData === 'Checked-Out') {
                                                                                                                   return  (trip.routeStatus === 'Checked-Out')
                                                                                                               }


                                            else {
                                             return  (trip);
                                             }
                                          }
                 else {
                    return trip;
                 }
              }
             );

      if (this.props.searchTrip.length > 1) {
        filterTrips = filterTrips.filter((trip) => {
          return (
            trip.itemCode
              .toLowerCase()
              .indexOf(this.props.searchTrip.toLowerCase()) !== -1 ||
            trip.code
              .toLowerCase()
              .indexOf(this.props.searchTrip.toLowerCase()) !== -1 ||
            trip.itemCode
                          .toLowerCase()
                          .indexOf(this.props.searchTrip.toLowerCase()) !== -1 ||
            trip.techObject.name
              .toLowerCase()
              .indexOf(this.props.searchTrip.toLowerCase()) !== -1
          );

          // 
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
          return SelectedRouteCodes.includes(drop.routeCode);
        });
      }

      if (this.props.searchDrp.length > 1) {
        filterDrops = filterDrops.filter((drop) => {
          if (site === "") {
            return (
              drop.docnum
                .toLowerCase()
                .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
              drop.bpcode
                .toLowerCase()
                .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
              drop.bpname
                .toLowerCase()
                .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
              drop.doctype
                .toLowerCase()
                .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
              drop.poscode
                .toLowerCase()
                .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
              drop.type
                .toLowerCase()
                .indexOf(this.props.searchDrp.toLowerCase()) !== -1
            );
          } else {
            return (
              (drop.docnum
                .toLowerCase()
                .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
                drop.bpcode
                  .toLowerCase()
                  .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
                drop.bpname
                  .toLowerCase()
                  .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
                drop.doctype
                  .toLowerCase()
                  .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
                drop.poscode
                  .toLowerCase()
                  .indexOf(this.props.searchDrp.toLowerCase()) !== -1 ||
                drop.type
                  .toLowerCase()
                  .indexOf(this.props.searchDrp.toLowerCase()) !== -1) &&
              drop.site === site
            );
          }
        });
      }
    }

    return (
      <>
        <div class="documentPanel" style={{height:"100%"}}>
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
                  <span>{this.props.t("Documents")}</span>
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
                  <span>{this.props.t("Trips")}</span>
                </NavLink>
              </NavItem>
            </Nav>
            {this.state.activeTab === "Documents" ? (
              <div className="d-flex align-items-center">

                <FormGroup className="mb-0 mr-4">
                  <Input
                    bsSize="md"
                    type="search"
                    placeholder={this.props.t("SearchCaption")}
                    className="form-control"
                    onChange={this.SearchDrops}
                  />
                </FormGroup>

                <div
                  className="d-inline-block"
                  style={{ paddingRight: "40px", alignSelf: "center" }}
                >
                  <button
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      marginRight: "20%",
                      marginLeft: "20%",
                    }}
                    onClick={() => this.props.refreshDocspanel()}
                  >
                    {this.props.t("Refresh")}
                  </button>
                </div>

                <div className="custom-control custom-checkbox mb-2 mr-3">
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
                    {this.props.t("ToPlan")}
                  </Label>
                </div>
              </div>
            ) : (


              <div className="d-flex align-items-center">
                 <FormGroup className="mb-0 mr-4">
                                  <Input
                                    bsSize="md"
                                    type="search"
                                    placeholder={this.props.t("SearchCaption")}
                                    className="form-control"
                                    onChange={this.SearchTrips}
                                  />
                                </FormGroup>

                  <div className="mb-2 mr-4" style={{fontWeight : "bolder", fontSize: "large", width : '20rem'}}>

                                                  														<Select
                                                  														  value={this.state.selectedFilteredData}
                                                  															isMulti={false}
                                                  															onChange={this.handleFilterChange}
                                                  															options={optionFilterItems}
                                                  															classNamePrefix="FilterBy"
                                                  															placeholder={this.state.selectedFilteredData ? this.state.selectedFilteredData.label : "Filter By"}
                                                  														/>

                                                </div>

                                                            <IconButton  color="success" aria-label="icon" onClick = {this.resetTripsPanels} >
                                                                                              <HighlightOffIcon style={{fontSize : "34px"}} />
                                                                </IconButton>
              </div>
            )}
          </div>

          <hr className="my-0" />
          <TabContent
            className="xl-tabcontent1"
            activeTab={this.state.activeTab}
          >
            <Drops3
              updateDropSearchTerm={this.props.updateDropSearchTerm}
              sortDrop={this.props.sortDrop}
              dropOrder={this.props.dropOrder}
              dropsList={filterDrops}
              dayschecked={this.props.daysCheckedIn}
              currDate={this.props.selectedDate}
              handleDragStart={this.props.handleDragStart}
              updateDocsGeoLocations={this.props.updateDocsGeoLocations}
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
              getPOandPreREceiptfromFreq={this.props.getPOandPreREceiptfromFreq}
              sites={this.props.sites}
              selectedSite={this.props.selectedSite}
              getValues={this.props.getValues}
            />
          </TabContent>
        </div>
      </>
    );
  }
}

export default withNamespaces()(DocumentsPanel);
