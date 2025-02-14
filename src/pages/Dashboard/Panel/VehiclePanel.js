import React from 'react';
import Vehicles3 from './Vehicles3';
import Trailers3 from './Trailers3';
import Equipments3 from './Equipments3';
import Drivers3 from './Drivers3';
import { withNamespaces } from 'react-i18next';
import { AgGridReact } from "ag-grid-react";
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
class VehiclePanel extends React.Component {

 constructor(props) {
        super(props);
         this.state = {
              activeTab: "Vehicles"
              }
           console.log("T22 inside Vehicle panel - conc",props);

          this.toggleTab = this.toggleTab.bind(this);
    }


  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

/*
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

*/
    render() {

     const site = this.props.updatedArrSite;
            let filterVehicles = this.props.curVehiclePanel && this.props.curVehiclePanel.vehicles.filter(
                (vehicle) => {
                    return ((vehicle.codeyve != null && vehicle.codeyve.toLowerCase().indexOf(
                        this.props.searchVeh.toLowerCase()
                    ) !== -1) || (vehicle.trailer != null && vehicle.trailer.toLowerCase().indexOf(
                        this.props.searchVeh.toLowerCase()
                    ) !== -1));
                }
            );

            let filterTrailers = this.props.curVehiclePanel.trails.filter(
                (trailer) => {

                         return ((trailer.trailer.toLowerCase().indexOf(
                                            this.props.searchTra.toLowerCase()
                                        ) !== -1) || (trailer.des.toLowerCase().indexOf(
                                            this.props.searchTra.toLowerCase()
                                        ) !== -1) || (trailer.model.toLowerCase().indexOf(
                                            this.props.searchTra.toLowerCase()
                                        ) !== -1) || (trailer.xmaxlovol.toLowerCase().indexOf(
                                            this.props.searchTra.toLowerCase()
                                        ) !== -1) || (trailer.xmaxloams.toLowerCase().indexOf(
                                            this.props.searchTra.toLowerCase()
                                        ) !== -1));

                }
            );

            let filterEquipments = this.props.curVehiclePanel.equipments.filter(
                (equipment) => {
                        return ((equipment.xequipid.toLowerCase().indexOf(
                                              this.props.searchEqu.toLowerCase()
                                          ) !== -1) || (equipment.xdescript.toLowerCase().indexOf(
                                              this.props.searchEqu.toLowerCase()
                                          ) !== -1) || (equipment.xequiptyp.toLowerCase().indexOf(
                                              this.props.searchEqu.toLowerCase()
                                          ) !== -1) || (equipment.xcodeyve.toLowerCase().indexOf(
                                              this.props.searchEqu.toLowerCase()
                                          ) !== -1));
                  }
            );

            let filterDriver = this.props.curVehiclePanel.drivers.filter(
                (driver) => {
                       return ((driver.driver.toLowerCase().indexOf(
                                           this.props.searchDrv.toLowerCase()
                                       ) !== -1) || (driver.driverid.toLowerCase().indexOf(
                                           this.props.searchDrv.toLowerCase()
                                       ) !== -1) || (driver.licenum.toLowerCase().indexOf(
                                           this.props.searchDrv.toLowerCase()
                                       ) !== -1) || (driver.licedat.toLowerCase().indexOf(
                                           this.props.searchDrv.toLowerCase()
                                       ) !== -1) || (driver.cty.toLowerCase().indexOf(
                                           this.props.searchDrv.toLowerCase()
                                       ) !== -1) || (driver.poscod.toLowerCase().indexOf(
                                           this.props.searchDrv.toLowerCase()
                                       ) !== -1) || (driver.cry.toLowerCase().indexOf(
                                           this.props.searchDrv.toLowerCase()
                                       ) !== -1));
                }
            );
/*
    const gridOptions = {
          columnDefs: [
            {
              headerName: "Vehicle Code",
              field: "vehicle_code",
              width: 130,
              rowDrag: true,
              // headerCheckboxSelection: true,
              // checkboxSelection: true,
            },
            {
              headerName: "Vehicle No",
              field: "vehicle_no",
              width: 110,
            },
            {
              headerName: "Departure Site",
              field: "departure_site",
              width: 130,
            },
            {
              headerName: "Arrival Site",
              field: "arrival_site",
              width: 110,
            },
            {
              headerName: "Driver Name",
              field: "driver_name",
              width: 120,
            },
            {
              headerName: "Side Operation",
              field: "side_operation",
              width: 130,
            },
            {
              headerName: "Trailer",
              field: "trailer",
              width: 80,
            },
            {
              headerName: "Info",
              field: "info",
              width: 100,
            },
            {
              headerName: "Category",
              field: "category",
              width: 100,
            },
            {
              headerName: "Earliest Start Time",
              field: "earliest_start_time",
              width: 150,
            },
            {
              headerName: "Latest Start Time",
              field: "latest_start_time",
              width: 150,
            },
            {
              headerName: "Capacity",
              field: "capacity",
              width: 100,
            },
            {
              headerName: "Volume",
              field: "volume",
              width: 90,
            },
            {
              headerName: "Max Order Count",
              field: "max_order_count",
              width: 140,
            },
            {
              headerName: "Max Total Distance",
              field: "max_total_distance",
              width: 150,
            },
            {
              headerName: "Max Total Time",
              field: "max_total_time",
              width: 150,
            },
            {
              headerName: "Max Total Travel Time",
              field: "max_total_travel_time",
              width: 170,
            },
            {
              headerName: "Carrier",
              field: "carrier",
              width: 140,
            },
          ],
          defaultColDef: {
            sortable: true,
          },
          rowData: [
            {
              vehicle_code: "SAPRK002",
              vehicle_no: "EF-015-KM",
              departure_site: "CORPS",
              arrival_site: "CORPS",
              driver_name: "",
              side_operation: "No",
              trailer: "",
              info: "",
              category: "DAFDVC",
              earliest_start_time: "07:00",
              latest_start_time: "19:00",
              capacity: "59850 KG",
              volume: "20000 L",
              max_order_count: "50",
              max_total_distance: "25000 Miles",
              max_total_time: "10:00 Hrs",
              max_total_travel_time: "08:00 Hrs",
              carrier: "FRINTERNE",
              color: "success",
            },
            {
              vehicle_code: "DAFPV001",
              vehicle_no: "EF-015-KM",
              departure_site: "CORPS",
              arrival_site: "CORPS",
              driver_name: "",
              side_operation: "No",
              trailer: "",
              info: "",
              category: "DAFDVC",
              earliest_start_time: "07:00",
              latest_start_time: "19:00",
              capacity: "59850 KG",
              volume: "20000 L",
              max_order_count: "50",
              max_total_distance: "25000 Miles",
              max_total_time: "10:00 Hrs",
              max_total_travel_time: "08:00 Hrs",
              carrier: "FRINTERNE",
              color: "danger",
            },
            {
              vehicle_code: "DAFPV001",
              vehicle_no: "EF-015-KM",
              departure_site: "CORPS",
              arrival_site: "CORPS",
              driver_name: "",
              side_operation: "No",
              trailer: "",
              info: "",
              category: "DAFDVC",
              earliest_start_time: "07:00",
              latest_start_time: "19:00",
              capacity: "59850 KG",
              volume: "20000 L",
              max_order_count: "50",
              max_total_distance: "25000 Miles",
              max_total_time: "10:00 Hrs",
              max_total_travel_time: "08:00 Hrs",
              carrier: "FRINTERNE",
              color: "warning",
            },
            {
              vehicle_code: "DAFPV001",
              vehicle_no: "EF-015-KM",
              departure_site: "CORPS",
              arrival_site: "CORPS",
              driver_name: "",
              side_operation: "No",
              trailer: "",
              info: "",
              category: "DAFDVC",
              earliest_start_time: "07:00",
              latest_start_time: "19:00",
              capacity: "59850 KG",
              volume: "20000 L",
              max_order_count: "50",
              max_total_distance: "25000 Miles",
              max_total_time: "10:00 Hrs",
              max_total_travel_time: "08:00 Hrs",
              carrier: "FRINTERNE",
              color: "info",
            },
            {
              vehicle_code: "DAFPV001",
              vehicle_no: "EF-015-KM",
              departure_site: "CORPS",
              arrival_site: "CORPS",
              driver_name: "",
              side_operation: "No",
              trailer: "",
              info: "",
              category: "DAFDVC",
              earliest_start_time: "07:00",
              latest_start_time: "19:00",
              capacity: "59850 KG",
              volume: "20000 L",
              max_order_count: "50",
              max_total_distance: "25000 Miles",
              max_total_time: "10:00 Hrs",
              max_total_travel_time: "08:00 Hrs",
              carrier: "FRINTERNE",
              color: "primary",
            },
            {
              vehicle_code: "DAFPV001",
              vehicle_no: "EF-015-KM",
              departure_site: "CORPS",
              arrival_site: "CORPS",
              driver_name: "",
              side_operation: "No",
              trailer: "",
              info: "",
              category: "DAFDVC",
              earliest_start_time: "07:00",
              latest_start_time: "19:00",
              capacity: "59850 KG",
              volume: "20000 L",
              max_order_count: "50",
              max_total_distance: "25000 Miles",
              max_total_time: "10:00 Hrs",
              max_total_travel_time: "08:00 Hrs",
              carrier: "FRINTERNE",
              color: "dark",
            },
          ],
          rowClassRules: {
            "row-success": function (params) {
              return params.data.color === "success";
            },
            "row-danger": function (params) {
              return params.data.color === "danger";
            },
            "row-warning": function (params) {
              return params.data.color === "warning";
            },
            "row-info": function (params) {
              return params.data.color === "info";
            },
            "row-primary": function (params) {
              return params.data.color === "primary";
            },
            "row-dark": function (params) {
              return params.data.color === "dark";
            },
          },
          animateRows: true,
        };

        const equipmentsGridOptions = {
          columnDefs: [
            {
              headerName: "Equipment",
              field: "equipment",
              width: 160,
              rowDrag: true,
            },
            {
              headerName: "Description",
              field: "description",
              width: 150,
            },
            {
              headerName: "Site",
              field: "site",
              width: 110,
            },
            {
              headerName: "Type",
              field: "type",
              width: 120,
            },
            {
              headerName: "Connexion",
              field: "connexion",
              width: 120,
            },
          ],
          defaultColDef: {
            sortable: true,
          },
          rowData: [
            {
              equipment: "EXSA03",
              description: "EXTINCTSA05",
              site: "BGLC1",
              type: "EqupType",
              connexion: "",
            },
          ],
          animateRows: true,
        };
*/
        return (
        <>
        <Card className="mb-3">
                          <CardBody className="p-2">
                            <Nav tabs className="nav-tabs-custom nav-justified">
                              <NavItem>
                                <NavLink
                                  style={{ cursor: "pointer" }}
                                  className={classnames({
                                    active: this.state.activeTab === "Vehicles",
                                  })}
                                  onClick={() => {
                                    this.toggleTab("Vehicles");
                                  }}
                                >
                                  <span>{this.props.t('Vehicles')}</span>
                                </NavLink>
                              </NavItem>
							  <NavItem>
                                <NavLink
                                  style={{ cursor: "pointer" }}
                                  className={classnames({
                                    active: this.state.activeTab === "Trailers",
                                  })}
                                  onClick={() => {
                                    this.toggleTab("Trailers");
                                  }}
                                >
                                  <span>{this.props.t('Trailers')}</span>
                                </NavLink>
                              </NavItem>
                              
                              <NavItem>
                                <NavLink
                                  style={{ cursor: "pointer" }}
                                  className={classnames({
                                    active: this.state.activeTab === "Drivers",
                                  })}
                                  onClick={() => {
                                    this.toggleTab("Drivers");
                                  }}
                                >
                                  <span>{this.props.t('Drivers')}</span>
                                </NavLink>
                              </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <Vehicles3
                                curVehicleList = {filterVehicles}
                                handleDragStart = {this.props.handleDragStart}
                                updateVehSearchTerm = {this.props.updateVehSearchTerm}
                                vehOrder={this.props.vehOrder}
                                sortVehicles={this.props.sortVehicles}
                                />
								 <Trailers3
                                 curTrails={filterTrailers}
                                 handleDragStart = {this.props.handleDragStart}
                                 allowedTrailers = {this.props.allowedTrailers}
                                 allAllowedTrailers = {this.props.allAllowedTrailers}
                                 vehicleDropped = {this.props.vehicleDropped}
                                 updateTrailSearchTerm = {this.props.updateTrailSearchTerm}
                                 sortTrailer={this.props.sortTrailer}
                                 trailOrder={this.props.trailOrder}

                                 />
                                <Drivers3
                                 curDrivers={filterDriver}
                                 handleDragStart = {this.props.handleDragStart}
                                 allAllowedDrivers={this.props.allAllowedDrivers}
                                 vehicleDropped = {this.props.vehicleDropped}
                                 allowedDrivers={this.props.allowedDrivers}
                                 updateDriverSearchTerm = {this.props.updateDriverSearchTerm}
                                 sortDriver={this.props.sortDriver}
                                 diverOrder={this.props.diverOrder}

                                />
                            </TabContent>
                          </CardBody>
                        </Card>
             </>
        );
    }
}

export default withNamespaces()(VehiclePanel);