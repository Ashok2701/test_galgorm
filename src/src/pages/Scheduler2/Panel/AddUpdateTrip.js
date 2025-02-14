import React from 'react';
import Select from "react-select";
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


class AddUpdateTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInfoShow: false,
      speciality: '',
       columnDefs: [
                      {
                        headerName: "Driver Code",
                        field: "driverid",
                        width: 140,
                        rowDrag: true,
                      },
                      {
                        headerName: "Driver Name",
                        field: "driver",
                        width: 130,
                      },
                      {
                        headerName: "Site",
                        field: "fcy",
                        width: 110,
                      },
                      {
                        headerName: "Permit",
                        field: "licenum",
                        width: 110,
                      },
                      {
                        headerName: "Postal",
                        field: "poscod",
                        width: 110,
                      },
                      {
                        headerName: "City",
                        field: "cty",
                        width: 130,
                      },
                      {
                        headerName: "Country",
                        field: "cry",
                        width: 110,
                      },
                      {
                        headerName: "Lunch Time (HH:MM)",
                        field: "lncstrtime",
                        width: 180,
                      },
                      {
                        headerName: "Lunch Duration",
                        field: "lncduration",
                        width: 150,
                      },
                    ],
      trips: [],


    };
 this.dragOver = this.dragOver.bind(this);
    this.drop = this.drop.bind(this);
    console.log("inside addupdate trip constructor");
  }


    dragOver(event) {
          event.preventDefault();
      }

      drop(event, eventType) {
          console.log("3 inside drop event",event);
           if(eventType === 'createVehicle') {
                      this.setState({
                          checkedTripShow: true,
                          vehicleMessage : this.props.t('vehicle_replace') ,
                          enableOk: true
                      })
                  } else {
          if (!(this.props.trips && this.props.trips[0] && (this.props.trips[0].lock || this.props.trips[0].tmsValidated))) {
              this.setState({ siteValue: '', siteStartValue: '', siteValueTripList: '', siteStartValueTripList: '' })
              this.props.updateClearTripsFlag();
           let type;
                         if (eventType === 'updateVehicle') {
                             type = 'updateVehicle';
                             this.setState({
                                 checkedTripShow: false
                             })
                         } else {
                             type = event.type;
                         }
              console.log("T8 inside if");
              var currentTrip = this.props.trips;
              console.log("T8 inside current trip",currentTrip);
              var trip = {
                  code: '',
                  driverName: '',
                  driverId: '',
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
                  currDropsPanel: {
                      drops: [],
                      pickUps: []
                  },
                  pickups: 0,
                  alldrivers: '',
                  driverslist: '',
                  allcustomers: '',
                  customerlist: ''
              }
              var status = true;
              var data;
                            if (!(eventType === 'updateVehicle')) {
                                data = JSON.parse(event.currentCard);

                            } else {
                                console.log("updateVehicleData", this.state.updateVehicleData);
                                type = "vehicle";
                                data = this.state.updateVehicleData
                            }
              if (type === 'vehicle') {
                 console.log("3 inside vehicle drop event");
                  this.setState({ isValidPassword: '' })
                  if (currentTrip.length > 0) {
                      currentTrip = [];
                  }

                   if (this.props.checkedTrip && !(eventType === 'updateVehicle')) {
                                          this.setState({
                                              checkedTripShow: true,
                                              vehicleMessage :  this.props.t('Vehicle_replaceinfo'),
                                              enableOk: false,
                                              updateVehicleData: data,
                                              updateVehicleId: event.dataTransfer.getData("id"),
                                              updateVehicleIndex: event.dataTransfer.getData("index")
                                          })
                                      } else {
                  console.log("3 current trip after reset",currentTrip);
                  trip.code = data.codeyve;
                  trip.timelineInterval = data.timelineInterval;
                  trip.trailerLink = data.trailerLink;
                  trip.trailerList = data.trailerList;
                  trip.defaultDriver = data.driverid;
                  trip.alldrivers = data.alldrivers;
                  trip.driverslist = data.driverslist;
                  trip.allcustomers = data.allcustomers;
                  trip.customerlist = data.customerlist;
                  this.props.colourDivs(data.alldrivers, data.driverslist, data.trailerLink, data.trailerList);
                  var emptyIndex = 0;
                  for (var j = 0; j < this.props.tripsPanel.length; j++) {
                      if (trip.code == this.props.tripsPanel[j].code) {
                          for (var k = 0; k < trip.timelineInterval.length; k++) {
                              if (this.props.tripsPanel[j].endTime == trip.timelineInterval[k].label) {
                                  trip.startTime = trip.timelineInterval[k + 2].label;
                                  trip.startIndex = k + 1;
                                  emptyIndex = k + 1;
                              }
                          }
                      }
                  }
                  console.log("T8 empty index",emptyIndex);
                  if (emptyIndex > 0) {
                      this.props.addSelectedTrips(emptyIndex);
                  }
                  if (trip.startTime == undefined && trip.timelineInterval[1]) {
                      trip.startTime = trip.timelineInterval[1].label;
                      trip.startIndex = 0;
                  }
                  if (data.drivername != "") {
                      var drivs = this.props.curVehiclePanel.drivers;
                        console.log("T8 data drviername",data.drivername);
                      for (var i = 0; i < drivs.length; i++) {
                          if (data.drivername == drivs[i].driver) {
                              trip.driverId = drivs[i].driverid;
                              trip.driverName = drivs[i].driver;
                              this.props.disableDivs(i, "driver");
                          }
                      }
                  }

                  if ( data.trailer !== "" || data.trailer !== null ) {
                       console.log("T8 data trailers",data.trailer);
                    //  this.props.colourDocDivs(data.trailer);
                      var trails = this.props.curVehiclePanel.trails;
                       console.log("T8 trails",trails);
                      for (var i = 0; i < trails.length; i++) {
                          if (data.trailer == trails[i].trailer) {
                              this.addTrailer(trip, trails[i], data.codeyve);
                              this.props.disableDivs(i, "trailer");
                              this.props.colourDocDivs(data.trailer);
                          }
                      }
                  }
                  if (data.equipmentList.length > 0) {
                    console.log("T8 data equipment",data.equipmentList);
                      var equip = this.props.curVehiclePanel.equipments;
                      for (var i = 0; i < equip.length; i++) {
                          if (data.equipmentList.includes(equip[i].xequipid)) {
                              this.addEquipment(trip, equip[i]);
                          }
                      }
                  }

                  trip.capacities = data.capacities;
                  trip.vehicleObject = data;
                  trip.vol = data.vol;

                    console.log("T8 data before push",trip);
                  currentTrip.push(trip);
                  console.log("T8 current final trip is",currentTrip);
                    console.log("T8 trip is",trip);
                    /*
                  if (this.props.checkedTrip) {
                      currentTrip[0].equipmentObject = this.props.equipments;
                  } else {
                      currentTrip[0].equipmentObject = [];
                      currentTrip[0].trialerObject = [];
                      this.props.clearTrailers();
                      this.props.enableDivs(this.props.trailers, "trailer");
                  }
                  */
                   currentTrip[0].equipmentObject = this.props.equipments;
                  if (currentTrip[0].currDropsPanel && this.props.currDropsPanel
                                      && this.props.trips && this.props.trips[0]) {
                                      currentTrip[0].currDropsPanel.drops = this.props.currDropsPanel.drops;
                                      currentTrip[0].currDropsPanel.pickUps = this.props.currDropsPanel.pickUps;
                                      currentTrip[0].drops = this.props.trips[0].drops;
                                      currentTrip[0].pickups = this.props.trips[0].pickups;
                                      currentTrip[0].stops = this.props.trips[0].stops;
                                      currentTrip[0].trips = this.props.trips[0].trips;
                                      currentTrip[0].driverName = this.props.trips[0].driverName;
                                      currentTrip[0].driverId = this.props.trips[0].driverId;
                                      currentTrip[0].dropObject = this.props.trips[0].dropObject;
                                      currentTrip[0].pickupObject = this.props.trips[0].pickupObject;
                                       currentTrip[0].notes = this.props.trips[0].notes;
                                                                  currentTrip[0].trialerObject = this.props.trips[0].trialerObject;
                                                                  currentTrip[0].itemCode = this.props.trips[0].itemCode;
                                  }
                  this.props.updateTrip(currentTrip);
                  status = false;
                  let trailer = [];
                  if (this.props.curVehiclePanel && this.props.curVehiclePanel.vehicles && this.props.curVehiclePanel.vehicles.length > 0) {
                      this.props.curVehiclePanel.vehicles.map((vehicle) => {
                          if (vehicle.codeyve === data.codeyve) {
                              if (this.props.curVehiclePanel.trails && this.props.curVehiclePanel.trails.length > 0) {
                                  this.props.curVehiclePanel.trails.map((trail) => {
                                      if (vehicle.trailer === trail.trailer) {
                                          trailer.push(trail)
                                      }
                                  });
                              }
                          }
                      })
                  }

                   this.props.updateTrip(currentTrip);
                  /*
                  currentTrip[0].drops = 0;
                  currentTrip[0].pickups = 0;
                  currentTrip[0].stops = 0;
                  this.props.updateTrip(currentTrip);

                  this.setState({
                      equipments: [],
                      trailers: trailer,
                  });
                  */
                  }
              } else if (type === 'drops') {
                  this.addDrop(currentTrip, data, trip);
                  if (data.pairedDoc != undefined && data.pairedDoc != '') {
                      for (var i = 0; i < this.props.currDropsPanel.pickUps.length; i++) {
                          if (data.pairedDoc === this.props.currDropsPanel.pickUps[i].docnum) {
                              currentTrip = this.props.trips;
                              this.addPickup(currentTrip, this.props.currDropsPanel.pickUps[i], trip);
                              this.props.disableDivs(i, "pickup", this.props.currDropsPanel.drops[i].docnum);
                          }
                      }
                  }
              } else if (type === 'pickup') {
                  this.addPickup(currentTrip, data, trip);
                  if (data.pairedDoc != undefined && data.pairedDoc != '') {
                      for (var i = 0; i < this.props.currDropsPanel.drops.length; i++) {
                          if (data.pairedDoc === this.props.currDropsPanel.drops[i].docnum) {
                              currentTrip = this.props.trips;
                              this.addDrop(currentTrip, this.props.currDropsPanel.drops[i], trip);
                              this.props.disableDivs(i, "drops", this.props.currDropsPanel.drops[i].docnum);
                          }
                      }
                  }

              } else if (type === 'driver') {
                  if (currentTrip.length > 0) {
                      trip = currentTrip[0];
                      currentTrip = [];
                  }
                  if (trip.alldrivers === 2) {
                      trip.driverId = data.driverid;
                      trip.driverName = data.driver;
                      currentTrip.push(trip);
                      this.props.updateTrip(currentTrip);
                      status = false;
                  }
                  else {
                      if (trip.driverslist && !trip.driverslist.includes(data.driverid)) {
                          status = false;
                          this.setState({
                              errorMessage: 'Selected Driver is not associated with current Vehicle',
                              addAlertShow: true,
                              error: true
                          });
                      }
                      else {
                          trip.driverId = data.driverid;
                          trip.driverName = data.driver;
                          currentTrip.push(trip);
                          this.props.updateTrip(currentTrip);
                          status = false;
                      }
                  }
                  if (this.state.siteValueTripList.length > 0) {
                      this.setState({ siteValueTripList: this.state.siteValueTripList })
                  }
                  if (this.state.siteStartValue.length > 0) {
                      this.setState({ siteStartValue: this.state.siteStartValue })
                  }
                  if (this.state.siteValueTripList.length > 0) {
                      this.setState({ siteValueTripList: this.state.siteValueTripList })
                  }
                  if (this.state.siteStartValueTripList.length > 0) {
                      this.setState({ siteStartValueTripList: this.state.siteStartValueTripList })
                  }
              } else if (type === 'trailer') {
                  console.log("T11 trailer data",data);

                  if (currentTrip.length > 0) {
                      trip = currentTrip[0];
                      currentTrip = [];
                  }
                    let docsCompatability = false;
                    let errorflag = false;
              if(trip.stops > 0)
                 {
                     // trailer and document relation
                     console.log("T21 insdie stops");
                                               if(trip.drops > 0){
                                               console.log("T21 insdie drops");
                                                for (var i = 0; i < trip.dropObject.length; i++) {
                                                   if((trip.dropObject[i].trailer).trim() === '' || trip.dropObject[i].trailer === data.trailer){
                                                       docsCompatability = true;
                                                       console.log("T21 insdie stops matched");
                                                   }
                                                   else{
                                                   console.log("T21 insdie stops not matched");
                                                    docsCompatability = false;
                                                    errorflag = true;

                                                    status = false;
                                                    this.setState({
                                                        errorMessage: 'Route Documents - Trailer is not compatabliity with added Trailer',
                                                        addAlertShow: true,
                                                        error: true,

                                                    })
                                                    break;

                                                   }

                                                }
                                               }
                                               if (trip.pickups > 0 && errorflag === false) {
                                                for (var j = 0; j < trip.pickupObject.lenght; j++) {
                                                    if ((trip.pickupObject[j].trailer).trim() === '' || trip.pickupObject[j].trailer === data.trailer) {

                                                        docsCompatability = true;
                                                    }
                                                    else {
                                                        docsCompatability = false;
                                                        status = false;
                                                        this.setState({
                                                            errorMessage: 'Route Documents - Trailer is not compatabliity with added Trailer',
                                                            addAlertShow: true,
                                                            error: true
                                                        })
                                                        break;
                                                    }

                                                }
                                            }
                   if(errorflag === false) {

                     if(data.allproducts === 2){
                     docsCompatability = true;
                     }
                     else {
                            if(trip.drops > 0){
                               for( var i=0;i<trip.dropObject.length;i++){
                                        if (data.tclcod && data.tclcod.includes(trip.dropObject[i].products.productCateg)) {

                                                          docsCompatability = true;
                                                      }
                                                      else {
                                                          docsCompatability = false;
                                                          errorflag = true;

                                                          status = false;
                                                          this.setState({
                                                                                 errorMessage: 'Route Documents - products are not compatabliity with added Trailer',
                                                                                 addAlertShow: true,
                                                                                 error: true,

                                                      })
                                                       break;

                               }
                            }
                            }
                            if(trip.pickups > 0 && errorflag === false) {
                                for(var j=0 ; j<trip.pickupObject.lenght; j++){
                                          if (data.tclcod && data.tclcod.includes(trip.pickupObject[i].products.productCateg)) {

                                                          docsCompatability = true;
                                                      }
                                                      else {
                                                          docsCompatability = false;

                                                          status = false;
                                                                             this.setState({
                                                                                 errorMessage: 'Route Documents - products are not compatabliity with added Trailer',
                                                                                 addAlertShow: true,
                                                                                 error: true
                                                      })
                                                      break;

                                }

                            }




                     }


                 }
                   }
                 }
                 else {
                 docsCompatability = true;
                 }
              if(docsCompatability === true) {
                  if (trip.trailerLink && trip.trailerLink != 'Yes') {
                      status = false;
                      this.setState({
                          errorMessage: 'Vehicle is Single Unit Type, cant add trailer to it',
                          addAlertShow: true,
                          error: true
                      });
                  } else if ((!this.props.checkedTrip && this.props.trailers.length >= 2) ||
                      (this.props.checkedTrip && this.props.trips && this.props.trips[0] && this.props.trips[0].trialerObject
                          && this.props.trips[0].trialerObject.length == 2)) {
                      status = false;
                      this.setState({
                          errorMessage: 'You cant add more than 2 trailers',
                          addAlertShow: true,
                          error: true
                      });
                  } else if (trip.trailerList && !trip.trailerList.includes(data.typ)) {
                      status = false;
                      this.setState({
                          errorMessage: 'Trailer Type & Vehicle Class association doesnt exist',
                          addAlertShow: true,
                          error: true
                      });
                  }
                  else {
                      console.log("T1 - data insdie trailer",data);
                       this.props.colourDocDivs(data.trailer);
                      let code = currentTrip[0] && currentTrip[0].code
                      this.addTrailer(trip, data, trip.code);
                      currentTrip.push(trip);

                      this.props.updateTrip(currentTrip);
                      if (this.state.siteValue.length > 0) {
                          this.setState({ siteValue: this.state.siteValue })
                      }
                      if (this.state.siteStartValue.length > 0) {
                          this.setState({ siteStartValue: this.state.siteStartValue })
                      }
                      if (this.state.siteValueTripList.length > 0) {
                          this.setState({ siteValueTripList: this.state.siteValueTripList })
                      }
                      if (this.state.siteStartValueTripList.length > 0) {
                          this.setState({ siteStartValueTripList: this.state.siteStartValueTripList })
                      }
                  }
                 }
                  if (this.state.siteValue.length > 0) {
                      this.setState({ siteValue: this.state.siteValue })
                  }
                  if (this.state.siteStartValue.length > 0) {
                      this.setState({ siteStartValue: this.state.siteStartValue })
                  }
                  if (this.state.siteValueTripList.length > 0) {
                      this.setState({ siteValueTripList: this.state.siteValueTripList })
                  }
                  if (this.state.siteStartValueTripList.length > 0) {
                      this.setState({ siteStartValueTripList: this.state.siteStartValueTripList })
                  }

               }else if (type === 'equipment') {
                  if (currentTrip.length > 0) {
                      trip = currentTrip[0];
                      currentTrip = [];
                  }
                  this.addEquipment(trip, data);
                  currentTrip.push(trip);
                  this.props.updateTrip(currentTrip);
              }
              if (status) {
                if (!(eventType === 'updateVehicle')) {
                                        this.props.disableDroppedDiv(event.dataTransfer.getData("id"));
                                        this.props.disableDivs(event.dataTransfer.getData("index"), type, data.docnum);
                                    } else {
                                        this.props.disableDroppedDiv(this.state.updateVehicleId);
                                        this.props.disableDivs(this.state.updateVehicleIndex, type, data.docnum);
                                    }
              }
          }
          console.log("T8 endof drop event");
          }
      }
  render(){
     return(
      <>
<Card className="mb-3">
                  <CardBody className="p-0"

                  >
                    <div className="timeline-container"
                    onDragOver={(evnt) => this.dragOver(evnt)}
                            onDrop={(evnt) => this.drop(evnt)}
                    >
                      <div className="table-responsive">
                        <Table className="mb-0">
                          <thead>
                            <tr>
                              <th></th>
                              <th className="text-nowrap">Vehicle</th>
                              <th className="text-nowrap">Driver</th>
                              <th className="text-nowrap">Trailer</th>
                              <th className="text-nowrap">Equipment</th>
                              <th className="text-nowrap">Departure Site</th>
                              <th className="text-nowrap">Arrival Site</th>
                              <th className="text-nowrap">Sequence #</th>
                              <th className="text-nowrap">Travel Time</th>
                              <th className="text-nowrap">Distance</th>
                              <th className="text-nowrap">Pickups</th>
                              <th className="text-nowrap">Drops</th>
                              <th className="text-nowrap">Stops</th>
                              <th className="text-nowrap">Comments</th>
                              <th className="text-nowrap">Trip Sequence</th>
                            </tr>
                          </thead>
                          <tbody className="timeline-data d-none">
                            <tr>
                              <td className="align-middle">
                                <Button
                                  size="sm"
                                  color="primary"
                                  active
                                  type="button"
                                  onClick={() => this.toggleDetail(true)}
                                >
                                  <i className="ri-arrow-left-s-line"></i>
                                </Button>
                              </td>
                              <td className="align-middle">524WAL75</td>
                              <td></td>
                              <td className="align-middle">0</td>
                              <td className="align-middle">0</td>
                              <td className="align-middle">CORPS</td>
                              <td className="align-middle" width="200px">
                                <FormGroup className="select2-container mb-0">
                                  <Select
                                    options="Site"
                                    placeholder="Select Site"
                                    classNamePrefix="select2-selection"
                                  />
                                </FormGroup>
                              </td>
                              <td className="align-middle">0</td>
                              <td className="align-middle">0</td>
                              <td className="align-middle">0</td>
                              <td className="align-middle">0</td>
                              <td className="align-middle">0</td>
                              <td className="align-middle">0</td>
                              <td className="align-middle">
                                <span
                                  className="text-primary h3"
                                  role="button"
                                  onClick={this.tog_standard}
                                >
                                  <i className="ri-message-2-line"></i>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </CardBody>
                </Card>
      </>
     );
  }

}

export default AddUpdateTrip;