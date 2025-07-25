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
import CollectionsDrops3 from "./CollectionsDrops3";
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
    this.handleSearchDropsValue = this.handleSearchDropsValue.bind(this);
  }


  
 componentDidMount() {
    this.updateFilteredData();
  }



  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchDrp !== this.props.searchDrp ||
      prevProps.dropsPanel !== this.props.dropsPanel ||
      prevProps.searchTrip !== this.props.searchTrip ||
      prevProps.tripsList !== this.props.tripsList ||
      prevProps.selectedRouteCodeArr !== this.props.selectedRouteCodeArr ||
      prevState.openRecords !== this.state.openRecords ||
      prevState.LockedRecords !== this.state.LockedRecords ||
      prevState.ValidateRecords !== this.state.ValidateRecords ||
      prevState.OptimisedRecords !== this.state.OptimisedRecords ||
      prevState.ToPlanchecked !== this.state.ToPlanchecked ||
      prevState.Todropchecked !== this.state.Todropchecked ||
      prevState.ToPickchecked !== this.state.ToPickchecked
    ) {
      this.updateFilteredData();
    }
  }



  handleSearchDropsValue(value) {
    console.log("handle search drops", value)
    const term = typeof value === "string" ? value : String(value?.target?.value || "");
    this.setState({ searchDrpTerm: term }, () => {
    
      this.updateFilteredData();
    });
  }

  handleSearchTripsValue(value) {
    const term = typeof value === "string" ? value : String(value?.target?.value || "");
    this.setState({ searchTripTerm: term }, () => {
    
      this.updateFilteredData();
    });
  }



  
  updateFilteredData() {
  console.time("updateFilteredData total");

  const site = "";
  const searchDrpTerm = String(this.state.searchDrpTerm || "").toLowerCase().trim();
  const searchTripTerm = String(this.state.searchTripTerm || "").toLowerCase().trim();

  const selectedRouteCodes = this.props.selectedRouteCodeArr || [];
  const dropsPanel = this.props.dropsPanel || [];
  const tripsList = this.props.tripsList || [];

  const noSearch = searchDrpTerm.length <= 1;
  const noRouteCodeFilter = selectedRouteCodes.length === 0;
  const noCheckboxFilters = !(
    this.state.ToPlanchecked ||
    this.state.Todropchecked ||
    this.state.ToPickchecked ||
    this.state.ToDeliverable ||
    this.state.ToNotDeliverable
  );

  // 🔄 Fast path: nothing is filtered
  if (noSearch && noRouteCodeFilter && noCheckboxFilters) {
    console.time("count categories");
    const internalCount = dropsPanel.filter(d => d.carrier === "INTERNAL").length;
    const externalCount = dropsPanel.filter(d => ["EXTERNAL", "DPD", "MONTGOMERY"].includes(d.carrier)).length;
    const collectionCount = dropsPanel.filter(d => d.carrier === "COLLECTIONS").length;
    console.timeEnd("count categories");

    console.time("filter trips (no filter)");
    const filteredTrips = [...tripsList];
    console.timeEnd("filter trips (no filter)");

    this.setState({ filteredDrops: dropsPanel, filteredTrips, internalCount, externalCount, collectionCount }, () => {
      console.timeEnd("updateFilteredData total");
    });
    return;
  }

  // 🔎 Drops filtering
  console.time("filter drops");
  let filteredDrops = dropsPanel.filter(drop => {
    if (
      this.state.ToPlanchecked &&
      !this.state.Todropchecked &&
      !this.state.ToPickchecked &&
      !this.state.ToDeliverable &&
      !this.state.ToNotDeliverable
    ) {
      return drop.type === "open" && ["0", "8"].includes(drop.dlvystatus);
    }
    if (!this.state.ToPlanchecked && this.state.Todropchecked && !this.state.ToPickchecked) {
      return drop.movtype === "DROP";
    }
    if (!this.state.ToPlanchecked && !this.state.Todropchecked && this.state.ToPickchecked) {
      return drop.movtype === "PICK";
    }
    return true;
  });
  console.timeEnd("filter drops");

  if (!noRouteCodeFilter) {
    console.time("filter by route code");
    filteredDrops = filteredDrops.filter(drop => selectedRouteCodes.includes(drop.routeCodeDesc));
    console.timeEnd("filter by route code");
  }

  if (!noSearch) {
    console.time("filter by search");
    const matches = (val) => val?.toLowerCase().includes(searchDrpTerm);
    filteredDrops = filteredDrops.filter(drop =>
      matches(drop.docnum) ||
      matches(drop.bpcode) ||
      matches(drop.bpname) ||
      matches(drop.doctype) ||
      matches(drop.poscode) ||
      matches(drop.type) ||
      matches(drop.city) ||
      matches(drop.routeCodeDesc) ||
      String(drop.netweight) === searchDrpTerm ||
      String(drop.volume) === searchDrpTerm
    );
    console.timeEnd("filter by search");
  }

  console.time("count categories");
  const internalCount = filteredDrops.filter(d => d.carrier === "INTERNAL").length;
  const externalCount = filteredDrops.filter(d => ["EXTERNAL", "DPD", "MONTGOMERY"].includes(d.carrier)).length;
  const collectionCount = filteredDrops.filter(d => d.carrier === "COLLECTIONS").length;
  console.timeEnd("count categories");

  // 🚚 Trips filtering
  console.time("filter trips");
  let filteredTrips = tripsList.filter(trip => {
    const filters = [];
    if (this.state.openRecords) filters.push(trip => trip.optistatus === "Open");
    if (this.state.LockedRecords) filters.push(trip => trip.lock === true);
    if (this.state.ValidateRecords) filters.push(trip => trip.tmsValidated === true);
    if (this.state.OptimisedRecords) filters.push(trip => trip.optistatus === "Optimized");
    return filters.length === 0 || filters.some(fn => fn(trip));
  });

  if (searchTripTerm.length > 1) {
    filteredTrips = filteredTrips.filter(trip =>
      trip.itemCode?.toLowerCase().includes(searchTripTerm) ||
      trip.code?.toLowerCase().includes(searchTripTerm) ||
      trip.driverName?.toLowerCase().includes(searchTripTerm)
    );
  }
  console.timeEnd("filter trips");

  this.setState({ filteredDrops, filteredTrips, internalCount, externalCount, collectionCount }, () => {
    console.timeEnd("updateFilteredData total");
  });
}


  updateFilteredData222() {
    
    console.time("updateFilteredData total"); // ⏱️ Start timing
    const site = "";
    const searchDrpTerm = String(this.state.searchDrpTerm || "").toLowerCase().trim();
    const searchTripTerm = String(this.state.searchTripTerm || "").toLowerCase().trim();

   
console.log("data insdie updateFilteredDAta", searchDrpTerm)
    let filteredDrops = (this.props.dropsPanel || []).filter(drop => {
      if (
        this.state.ToPlanchecked &&
        !this.state.Todropchecked &&
        !this.state.ToPickchecked &&
        !this.state.ToDeliverable &&
        !this.state.ToNotDeliverable
      ) {
        return drop.type === "open" && ["0", "8"].includes(drop.dlvystatus);
      }
      if (!this.state.ToPlanchecked && this.state.Todropchecked && !this.state.ToPickchecked) {
        return drop.movtype === "DROP";
      }
      if (!this.state.ToPlanchecked && !this.state.Todropchecked && this.state.ToPickchecked) {
        return drop.movtype === "PICK";
      }
      return true;
    });
    console.timeEnd("filter drops");

    console.time("filter by route"); // Optional
    // Route description filtering (by selectedRouteCodeArr)
    if (this.props.selectedRouteCodeArr && this.props.selectedRouteCodeArr.length > 0) {
      const SelectedRouteCodes = this.props.selectedRouteCodeArr;
      filteredDrops = filteredDrops.filter(drop => SelectedRouteCodes.includes(drop.routeCodeDesc));
    }

     console.timeEnd("filter by route");

  console.time("filter by search"); // Optional
    if (searchDrpTerm.length > 1) {
      const matches = (val) => val?.toLowerCase().includes(searchDrpTerm);
      filteredDrops = filteredDrops.filter(drop =>
        matches(drop.docnum) ||
        matches(drop.bpcode) ||
        matches(drop.bpname) ||
        matches(drop.doctype) ||
        matches(drop.poscode) ||
        matches(drop.type) ||
        matches(drop.city) ||
        matches(drop.routeCodeDesc) ||
        String(drop.netweight) === searchDrpTerm ||
        String(drop.volume) === searchDrpTerm
      );
    }
 console.timeEnd("filter by search");

  console.time("count categories"); // Count types
    const internalCount = filteredDrops.filter(d => d.carrier === "INTERNAL").length;
    const externalCount = filteredDrops.filter(d => ["EXTERNAL", "DPD", "MONTGOMERY"].includes(d.carrier)).length;
    const collectionCount = filteredDrops.filter(d => d.carrier === "COLLECTIONS").length;
console.timeEnd("count categories");

  console.time("filter trips");
    let filteredTrips = (this.props.tripsList || []).filter(trip => {
      const tripFilters = [];
      if (this.state.openRecords) tripFilters.push(trip => trip.optistatus === "Open");
      if (this.state.LockedRecords) tripFilters.push(trip => trip.lock === true);
      if (this.state.ValidateRecords) tripFilters.push(trip => trip.tmsValidated === true);
      if (this.state.OptimisedRecords) tripFilters.push(trip => trip.optistatus === "Optimized");
      return tripFilters.length === 0 || tripFilters.some(fn => fn(trip));
    });

    if (searchTripTerm.length > 1) {
      filteredTrips = filteredTrips.filter(trip =>
        trip.itemCode?.toLowerCase().includes(searchTripTerm) ||
        trip.code?.toLowerCase().includes(searchTripTerm) ||
        trip.driverName?.toLowerCase().includes(searchTripTerm)
      );
    
    }
console.timeEnd("filter trips");
   this.setState({ filteredDrops, filteredTrips, internalCount, externalCount, collectionCount }, () => {
    console.timeEnd("updateFilteredData total"); // ⏱️ End timing
  });
  
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
  
    this.props.updateTripsSearchTerm(e);
  };

  render() {
  
    const {
  filteredDrops = [],
  filteredTrips = [],
  internalCount,
  externalCount,
  collectionCount
} = this.state;

   // const { filteredDrops, filteredTrips, internalCount, externalCount, collectionCount } = this.state;

    const SelectedDate = moment.tz(this.props.selectedDate, '').format('YYYY-MM-DD');

    let OpenTripsCount = filteredTrips.filter(trip => trip.optistatus === 'Open').length;
    let OptimisedTripsCount = filteredTrips.filter(trip => trip.optistatus === 'Optimized' && trip.lock === false).length;
    let LockedTripsCount = filteredTrips.filter(trip => trip.lock === true && trip.optistatus === 'Optimized' && !trip.tmsValidated).length;
    let ValidatedTripsCount = filteredTrips.filter(trip => trip.tmsValidated && ![5, 6, 7, 10].includes(trip.lvsStatus)).length;

    let ToPlanCount = filteredDrops.filter(drop => drop.type === 'open' && ['0', '8'].includes(drop.dlvystatus)).length;
    let OutboundCount = filteredDrops.filter(drop => drop.movtype === 'DROP').length;
    let InboundCount = filteredDrops.filter(drop => drop.movtype === 'PICK').length;

    let externalToplan = filteredDrops.filter(drop => drop.type === 'open' && ['0', '8'].includes(drop.dlvystatus) && ['EXTERNAL', 'DPD', 'MONTGOMERY'].includes(drop.carrier)).length;
    let externalOutbound = filteredDrops.filter(drop => drop.movtype === 'DROP' && ['EXTERNAL', 'DPD', 'MONTGOMERY'].includes(drop.carrier)).length;
    let externalInbound = filteredDrops.filter(drop => drop.movtype === 'PICK' && ['EXTERNAL', 'DPD', 'MONTGOMERY'].includes(drop.carrier)).length;

    let collectionToPan = filteredDrops.filter(drop => drop.type === 'open' && ['0', '8'].includes(drop.dlvystatus) && drop.carrier === 'COLLECTIONS').length;
    let collectionOutbound = filteredDrops.filter(drop => drop.movtype === 'DROP' && drop.carrier === 'COLLECTIONS').length;
    let collectionInbound = filteredDrops.filter(drop => drop.movtype === 'PICK' && drop.carrier === 'COLLECTIONS').length;

 
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
                    {this.props.t("Documents")}[{internalCount}]
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
                    {this.props.t("Trips")}[{filteredTrips.length}]
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

{/* Collections */}
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: this.state.activeTab === "Collections",
                  })}
                  onClick={() => {
                    this.toggleTab("Collections");
                  }}
                >
                  <span style={{ fontWeight: "bolder", fontSize: "large" }}>
                    {this.props.t("Collections")}
                    [{collectionCount}]
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
                    value={this.state.searchDrpTerm}
                    onChange={(e) => this.handleSearchDropsValue(e.target.value)}
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
{(this.state.activeTab === "External" || this.state.activeTab === "Collections") &&  (
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
                    value={this.state.searchDrpTerm}
                    onChange={(e) => this.handleSearchDropsValue(e.target.value)}
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
                    {this.props.t("Outbound")}[{ this.state.activeTab === "External" ?externalOutbound :collectionOutbound}]
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
                    {this.props.t("ToPlan")}[{ this.state.activeTab === "External" ? externalToplan :collectionToPan} ]
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
                   value={this.state.searchTripTerm}
              onChange={(e) => this.handleSearchTripsValue(e.target.value)}
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
              dropsList={filteredDrops}
              dayschecked={this.props.daysCheckedIn}
              currDate={this.props.selectedDate}
              handleDragStart={this.props.handleDragStart}
              updateDocsGeoLocations={this.props.updateDocsGeoLocations}
              selectedDocs={this.props.selectedDocs}
            />
            <TripList3
              tripsList={filteredTrips}
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
              NB_manuallytrip = {this.props.NB_manuallytrip}
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
               dropsList={filteredDrops}
               dayschecked={this.props.daysCheckedIn}
               currDate={this.props.selectedDate}
               handleDragStart={this.props.handleDragStart}
               updateDocsGeoLocations={this.props.updateDocsGeoLocations}
               selectedDocs={this.props.selectedDocs}
            />


            <CollectionsDrops3
             routeCodes={this.props.routeCodes}
             fetchDocumentPanelDateChange={this.props.fetchDocumentPanelDateChange}
             documentPanel_date={this.props.documentPanel_date}
              currDropsPanel={this.props.dropsPanel}
                pickersList={this.props.pickersList}
               updateDropSearchTerm={this.props.updateDropSearchTerm}
               sortDrop={this.props.sortDrop}
               dropOrder={this.props.dropOrder}
               dropsList={filteredDrops}
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
