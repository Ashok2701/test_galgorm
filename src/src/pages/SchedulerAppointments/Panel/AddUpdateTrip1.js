import React from 'react';
import DisplayTrailers from './DisplayTrailers';
import DisplayEquipments from './DisplayEquipments';
import Confirm from './Confirm';
import Alert from './Alert';
import DisplayProducts from './DisplayProducts';
import DisplayNotes from './DisplayNotes';
import MessageIcon from '@material-ui/icons/Message';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import LockRounded from '@material-ui/icons/LockRounded';
import Checkbox from '@mui/material/Checkbox';
import Select from 'react-select';
import ValidateConfirm from './ValidateConfirm';
import { withNamespaces } from 'react-i18next';
import DisplayAuthentication from './DisplayAuthentication';
import { convertHrToSec, convertMinToSec, formatTime } from '../converterFunctions/converterFunctions';
import DisplayCheckedTrip from './DisplayCheckedTrip';
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
class AddUpdateTrip1 extends React.Component {

    constructor(props) {
        super(props);
        this.dragOver = this.dragOver.bind(this);
        this.drop = this.drop.bind(this);
        this.state = {
            trips: [],
            trailers: [],
            equipments: [],
            addTrailShow: false,
            addEquipmentShow: false,
            addConfirmShow: false,
            addAlertShow: false,
            errorMessage: '',
            errorType: '',
            error: false,
            selectedTrips: 0,
            quantities: 0,
            quantityMessage: '',
            currentTrip: {},
            confirmMessage: '',
            addNotesShow: false,
            addProductShow: false,
            totalEquipments: 0,
            products: [],
            docNumber: "",
             doctype:"",
            warning: false,
            warningAlert: '',
            siteValue: '',
            siteValueTripList: '',
            authenticationShow: false,
            isValidPassword: '',
            siteStartValue: '',
            siteStartValueTripList: '',
            depsite: '',
             checkedTripShow: false,
                        updateVehicleData: {},
                        updateVehicleId: '',
                        updateVehicleIndex: '',
                        vehicleMessage: '',
                        enableOk: false
        };
        this.onSaveEquipment = this.onSaveEquipment.bind(this);
        this.deleteEquipment = this.deleteEquipment.bind(this);
        this.deleteTrailer = this.deleteTrailer.bind(this);

    }

        dragOver(event) {
            event.preventDefault();
        }

        drop(event, eventType) {

       console.log("T111 inside drop event, add updateTrip");
    /*
            if(this.props.trips && (this.props.trips[0].lock || this.props.trips[0].tmsValidated))
            {
                  this.setState({
                                        checkedTripShow: true,
                                        vehicleMessage : 'trip_locked_info'),
                                        enableOk: true
                                    })
            }
            */
             if(eventType === 'createVehicle') {
                        this.setState({
                            checkedTripShow: true,
                            vehicleMessage : 'vehicle_replace' ,
                            enableOk: true
                        })
                    } else {
                    console.log("inside not createdVehicle");
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
                                 type = event.dataTransfer.getData("type");
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
                    forceSeq: false,
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
                                  console.log("updateVehicleData if");
                                  data = JSON.parse(event.dataTransfer.getData("currentCard"));

                              } else {
                                  console.log("updateVehicleData", this.state.updateVehicleData);
                                  type = "vehicle";
                                  data = this.state.updateVehicleData
                              }
                if (type === 'vehicle') {
                      let VehicleCompatability = true;
                     let defaulttrailer = false;
                    this.setState({ isValidPassword: '' })
                    if (currentTrip.length > 0) {
                        currentTrip = [];
                    }
                    console.log("T444 Inside App- vehicle",data);
                     if (this.props.checkedTrip && !(eventType === 'updateVehicle')) {
                                            this.setState({
                                                checkedTripShow: true,
                                                vehicleMessage :  'Vehicle_replaceinfo',
                                                enableOk: false,
                                                updateVehicleData: data,
                                                updateVehicleId: event.dataTransfer.getData("row-id"),
                                                updateVehicleIndex: event.dataTransfer.getData("index")
                                            })
                                        } else {

                    trip.code = data.codeyve;

                    for (var j = 0; j < this.props.tripsPanel.length; j++) {
                                          if (trip.code == this.props.tripsPanel[j].code) {
                                               status = false;
                                               VehicleCompatability = false;
                                              this.setState({
                                                              errorMessage: 'Vehicle already used for Selected Date',
                                                              addAlertShow: true,
                                                              error: true
                                                          });
                                               }
                                       }

        if(VehicleCompatability) {
                    trip.timelineInterval = data.timelineInterval;
                    trip.equipments = 0;
                    trip.trailer  =0;
                     trip.trailers  =0;
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

                    if (emptyIndex > 0) {
                        this.props.addSelectedTrips(emptyIndex);
                    }
                    if (trip.startTime == undefined && trip.timelineInterval[1]) {
                        trip.startTime = trip.timelineInterval[1].label;
                        trip.startIndex = 0;
                    }
                    if (data.drivername != "") {
                        var drivs = this.props.curVehiclePanel.drivers;

                        for (var i = 0; i < drivs.length; i++) {
                            if (data.drivername == drivs[i].driver) {
                                trip.driverId = drivs[i].driverid;
                                trip.driverName = drivs[i].driver;
                                this.props.disableDivs(i, "driver");
                            }
                        }
                    }

                    if ( data.trailer !== "" || data.trailer !== null ) {
                       console.log("T11 inside vehicle - data trailer=",data.trailer);
                      //  this.props.colourDocDivs(data.trailer);
                        var trails = this.props.curVehiclePanel.trails;

                        for (var i = 0; i < trails.length; i++) {
                            if (data.trailer == trails[i].trailer) {
                                 defaulttrailer = true;
                                this.addTrailer(trip, trails[i], data.codeyve, 'Vehicle');
                                this.props.disableDivs(i, "trailer");
                                this.props.colourDocDivs(data.trailer);
                            }
                        }
                    }
                    if (data.equipmentList.length > 0) {

                        var equip = this.props.curVehiclePanel.equipments;
                        for (var i = 0; i < equip.length; i++) {
                            if (data.equipmentList.includes(equip[i].xequipid)) {
                                this.addEquipment(trip, equip[i]);
                            }
                        }
                    }

                       if(!defaulttrailer){
                                                this.clearTrailers();
                                        }

                    trip.capacities = data.capacities;
                    trip.vehicleObject = data;
                    trip.vol = data.vol;

                      console.log("T11 data before push",trip);
                    currentTrip.push(trip);

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
                                      let DriverCompatability = true;
                                    if(trip.code === ""){



                                                                                                          status = false;
                                                                                                          DriverCompatability = false;
                                                                                                          this.setState({
                                                                                                              errorMessage: 'Vehicle is missing, please Drag n Drop Vehicle first',
                                                                                                              addAlertShow: true,
                                                                                                              error: true,
                                                                                                               })

                                    }
                                    else {


 /*
// Driver and customer Address level grid validation
               let erroralert = false;
                 // Driver and cutomer address level driver list
                  if(trip.stops > 0){
                          if(trip.drops > 0){
                              for (var i = 0; i < trip.dropObject.length; i++) {
                 			      if(trip.dropObject[i].allDrivers === "2") {
                 						 erroralert = false;
                                  }
                                  else {
                                            if(trip.dropObject[i].driverList.length > 0) {
                 							      if((trip.dropObject[i].driverList).includes(data.driverid)){
                 											 erroralert = false;
                 								  }
                 								  else {
                 														        erroralert = true;
                                                                                status = false;
                                                                                this.setState({
                                                                                     errorMessage: 'Customer Driver List is not matched with Selected Driver',
                                                                                     addAlertShow: true,
                                                                                     error: true,

                                                                       })
                                                                       break;

                 														  }

                 													 }
                 							else {
                 							 erroralert = false;
                 							}
                 													 }

}
}
                        if (trip.pickups > 0 && erroralert === false) {
                                                     for (var i = 0; i < trip.pickupObject.length; i++) {
                                         			      if(trip.pickupObject[i].allDrivers === "2") {
                                         						erroralert = false;
                                                          }
                                                          else {
                                                                    if(trip.pickupObject[i].driverList.length > 0) {
                                         							      if((trip.pickupObject[i].driverList).includes(data.driverid)){
                                         											 erroralert = false;
                                         								  }
                                         								  else {
                                         														        erroralert = true;
                                                                                                        status = false;
                                                                                                        this.setState({
                                                                                                             errorMessage: 'Customer Driver List is not matched with Selected Driver',
                                                                                                             addAlertShow: true,
                                                                                                             error: true,

                                                                                               })
                                                                                               break;

                                         														  }

                                         													 }
                                         							else {
                                         							  erroralert = false;
                                         							}
                                         													 }

                        }

                                                                         }
}



//Vehicle level validation
                              if(erroralert === false) {
                              */
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
                                                  errorMessage: '{this.props.t("driver_vehicle_ass")}',
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
                                      //}

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
                                    }
                                  }
                 else if (type === 'trailer') {

                    console.log("T111 inside trailer");
                     console.log("T111 inside trailer- currentTrip",currentTrip[0]);
                     console.log("T111 inside trailer- trip",trip);


                    if (currentTrip.length > 0) {
                        trip = currentTrip[0];
                        currentTrip = [];
                    }
                    console.log("T111 inside trailer- trip",trip);
                      let docsCompatability = false;
                      let errorflag = false;

             if(trip.code === "") {
                docsCompatability = false;
                                                                   errorflag = true;
                                                                   status = false;
                                                                   this.setState({
                                                                       errorMessage: 'Vehicle is missing, please Drag n Drop Vehicle first',
                                                                       addAlertShow: true,
                                                                       error: true,
                                                                        })

             } else {



                if(trip.stops > 0)
                   {
                     console.log("T111 inside trailer- trip- stops > 0",trip);
                       // trailer and document relation

                                                 if(trip.drops > 0){

                                                  for (var i = 0; i < trip.dropObject.length; i++) {
                                                     if((trip.dropObject[i].trailer).trim() === '' || trip.dropObject[i].trailer === data.trailer){
                                                         docsCompatability = true;

                                                     }
                                                     else{

                                                      docsCompatability = false;
                                                      errorflag = true;
                                                      status = false;
                                                      this.setState({
                                                          errorMessage: '{this.props.t("route_doc_trail_comp")}',
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
                                                              errorMessage: '{this.props.t("route_doc_trail_comp")}',
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
                                                                                   errorMessage: '{this.props.t("route_doc_prod_trail_comp")}',
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
                                                                                   errorMessage: '{this.props.t("route_doc_prod_trail_comp")}',
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
                    console.log("T111 inside trailer- trip ,stop else",trip);
                   docsCompatability = true;
                   }

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
                            errorMessage: "You cant add more than 2 trailers",
                            addAlertShow: true,
                            error: true
                        });
                    } else if (trip.trailerList && !trip.trailerList.includes(data.typ)) {
                        status = false;
                        console.log("T111 inside trailer- else if trailerlist");
                        this.setState({
                            errorMessage: 'Trailer Type & Vehicle Class association doesnt exist',
                            addAlertShow: true,
                            error: true
                        });
                    }
                    else {

                         console.log("T111 inside last else trailer");
                         this.props.colourDocDivs(data.trailer);
                        let code = currentTrip[0] && currentTrip[0].code
                        this.addTrailer(trip, data, trip.code, 'Trailer');
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
                  if(trip.code === ""){

                                                                                          status = false;
                                                                                          this.setState({
                                                                                              errorMessage: 'Vehicle is missing, please Drag n Drop Vehicle first',
                                                                                              addAlertShow: true,
                                                                                              error: true,
                                                                                               })
                  }
                  else {
                    this.addEquipment(trip, data);
                    currentTrip.push(trip);
                    this.props.updateTrip(currentTrip);
                    }
                }
                if (status) {
                  if (!(eventType === 'updateVehicle')) {
                                        console.log("T31 inside status");
                                       //  this.props.disableDroppedDiv(event.dataTransfer.getData("row-id"));
                                          this.props.disableDivs(event.dataTransfer.getData("index"), type, data.docnum);
                                      } else {
                                          this.props.disableDroppedDiv(this.state.updateVehicleId);
                                          this.props.disableDivs(this.state.updateVehicleIndex, type, data.docnum);
                                      }
                }
            }
            }
        }

    addDrop = (currentTrip, data, trip) => {
        let dropCompatability = true;
        let error = "";

        if (currentTrip.length > 0) {
            trip = currentTrip[0];
            currentTrip = [];

           }

         if(trip.trailers > 0) {
             let triptriler2 = "",triptriler1 = "" ;
            if(trip.vehicleObject.trailer && trip.vehicleObject.trailer != ''){
               triptriler1 = trip.vehicleObject.trailer;
                if(trip.trailers === 2) {
                                      triptriler2 = trip.trialerObject[1].trailer;
                                      }
            }
            else {
             triptriler1 = trip.trialerObject[0].trailer;
                       if(trip.trailers === 2) {
                       triptriler2 = trip.trialerObject[1].trailer;
                       }
            }
            if((triptriler1 === data.trailer) || ((triptriler2 != 2) && (triptriler2 === data.trailer)) || (data.trailer).trim() === ''){

                if(trip.driverId !== ""){
                    if(trip.driverId === data.drivercode  || (trip.driverId).trim() === "" || (data.drivercode).trim() === ""){
                       dropCompatability = true;
                    }
                    else {
                        dropCompatability = false;
                                       error = "Driver";
                                     this.setState({
                                        errorType : 'Driver'
                                      });
                    }
                }
                else{
                dropCompatability = true;
                }
            }else {
                  dropCompatability = false;
                   error = "Trailer";
                 this.setState({
                    errorType : 'Trailer'
                  });
            }
         }else {
             if(trip.driverId !== ""){
                                if(trip.driverId === data.drivercode  || (trip.driverId).trim() === "" || (data.drivercode).trim() === ""){
                                   dropCompatability = true;
                                }
                                else {
                                    dropCompatability = false;

                                                   error = "Driver";
                                                 this.setState({
                                                    errorType : 'Driver'
                                                  });
                                }
                            }
                            else{
                            dropCompatability = true;
                            }
         }
      //vehicle and prod category
        if(dropCompatability === true) {
          if (trip.vehicleObject.tclcod === '') {
            dropCompatability = true;
          }
           else {
            // need to check the vehicle and products category compatability;
            for (var i = 0; i < data.products.length; i++) {
                if (trip.vehicleObject && trip.vehicleObject.tclcod &&
                    trip.vehicleObject.tclcod.includes(data.products[i].productCateg)) {
                    dropCompatability = true;
                }
                else {
                    dropCompatability = false;
                    error = "product";
                    this.setState({
                      errorType : 'product'
                    });
                    break;
                }
            }
          }

          //to check trailer & product category
          // if(trip.trailer)
        }

   //to check trailr & prodcut category
   if(trip.trailers > 0) {
  if(dropCompatability === true) {
          if (trip.trialerObject[0].allproducts === 2 || trip.trialerObject[0].allproducts === '2') {

            dropCompatability = true;
          }
           else {

                 if(trip.trailers === 2 && (trip.trialerObject[1].allproducts === 2 || trip.trialerObject[1].allproducts === '2')){
                    dropCompatability = true;
                 }
                 else {

            // need to check the vehicle and products category compatability;
                 for(var i=0 ; i < trip.trailers; i++) {

                     for (var j = 0; j < data.products.length; j++) {
                          if (trip.trialerObject && trip.trialerObject[i].tclcod &&
                           trip.trialerObject[i].tclcod.includes(data.products[j].productCateg)) {

                             dropCompatability = true;
                           }
                           else {
                             dropCompatability = false;

                             error = "productTrailer";
                             this.setState({
                               errorType : 'productTrailer'
                             });
                             break;
                           }
                     }
                     }
                   }
            }
        }
      }
//to  check customer compatability
        if (dropCompatability == true) {

            if (trip.allcustomers === 2) {

                        dropCompatability = true;
            }
            else {

                        // need to check the venicle and products category compatability;
                if (trip.customerlist && !trip.customerlist.includes(data.bpcode)) {
                       dropCompatability = false;

                        error = 'customer';
                       this.setState({
                                                  errorType : 'customer',
                                                   errorMessage: '{this.props.t("cust_veh_assoc")}',
                                                   addAlertShow: true,
                                                   error: true
                                               });

                                           }
                          else {

                               dropCompatability = true;
                          }
                    }
        }

        if (dropCompatability == true) {

            data.panelType = 'drop';
            data.vehicleCode = trip.code;
            trip.dropObject.push(data);
            trip.drops += 1;
            trip.startIndex += 1;
            trip.stops = trip.pickups + trip.drops;
            currentTrip.push(trip);
            var tripCount = this.state.selectedTrips;
            tripCount += 12;
            this.props.updateTrip(currentTrip);
            const geoObj = {};
            geoObj.lat = data.lat;
            geoObj.lng = data.lng;
            geoObj.city = data.city;
            geoObj.panelType = 'drop';
            geoObj.docnum = data.docnum;
            this.props.addGeoLocations(geoObj);
            this.props.addGeoList(data, trip.startIndex);
            if (this.state.siteValue.length > 0) {
                this.setState({ siteValue: this.state.siteValue })
            }
            if (this.state.siteValueTripList.length > 0) {
                this.setState({ siteValueTripList: this.state.siteValueTripList })
            }
            if (this.state.siteStartValue.length > 0) {
                this.setState({ siteStartValue: this.state.siteStartValue })
            }
            if (this.state.siteStartValueTripList.length > 0) {
                this.setState({ siteStartValueTripList: this.state.siteStartValueTripList })
            }


        }
        else {


            if(error === 'product') {
            this.setState({
                errorMessage: 'Selected Products are not compatability with Vehicle product Category',
                addAlertShow: true,
                error: true
            });
             }
              else if(error === 'Trailer') {
               this.setState({
                                                     errorMessage: 'Document already contains Trailer, is not matched with Trip Trailers',
                                                     addAlertShow: true,
                                                     error: true
                                                   });
              }
              else if(error === 'productTrailer'){
               this.setState({
                              errorMessage: 'Selected Products are not compatability with Trailer product Category',
                              addAlertShow: true,
                              error: true
                          });
              }
               else if(error === 'Driver') {

                             this.setState({
                                                                   errorMessage: 'Document already contains Driver, is not matched with Trip Driver',
                                                                   addAlertShow: true,
                                                                   error: true
                                                                 });
                            }

             else {

              this.setState({
                       errorMessage: '{this.props.t("cust_veh_assoc")}',
                       addAlertShow: true,
                       error: true
                    });
        }
        }
    }

    updateTripTime = (trip) => {
        var timeInterval = trip.timelineInterval[0];
        var count = 0;
    }

    addPickup = (currentTrip, data, trip) => {
        let pickupCompatability = true;
        let pickupError = "";
        if (currentTrip.length > 0) {
            trip = currentTrip[0];
            currentTrip = [];
            }

        //trailer compatability
            if(trip.trailers > 0) {

                   let triptriler1,triptriler2 = "";
                   if(trip.vehicleObject.trailer && trip.vehicleObject.trailer != ''){
                               triptriler1 = trip.vehicleObject.trailer;
                                       if(trip.trailers === 2) {
                                       triptriler2 = trip.trialerObject[1].trailer;
                                       }
                            }
                            else {
                             triptriler1 = trip.trialerObject[0].trailer;
                                       if(trip.trailers === 2) {
                                       triptriler2 = trip.trialerObject[1].trailer;
                                       }

                            }



               if((triptriler1 === data.trailer) || ((triptriler2 != 2) && (triptriler2 === data.trailer)) || (data.trailer).trim() === ''){

                            if(trip.driverId !== ""){
                                               if(trip.driverId === data.drivercode || (trip.driverId).trim() === "" || (data.drivercode).trim() === ""){
                                                  pickupCompatability = true;

                                               }
                                               else {
                                                   pickupCompatability = false;
                                                                pickupError = "Driver";
                                                                this.setState({
                                                                   errorType : 'Driver'
                                                                 });

                                               }
                                           }
                                           else{

                                           pickupCompatability = true;

                                           }

               }
               else {
                              pickupCompatability = false;

                               pickupError = "Trailer";
                             this.setState({
                                errorType : 'Trailer'
                              });
                        }
            }
            else {
                  if(trip.driverId !== ""){
                                                  if(trip.driverId === data.drivercode  || (trip.driverId).trim() === "" || (data.drivercode).trim() === ""){
                                                     pickupCompatability = true;
                                                  }
                                                  else {
                                                      pickupCompatability = false;

                                                                     pickupError = "Driver";
                                                                   this.setState({
                                                                      errorType : 'Driver'
                                                                    });

                                                  }
                                              }
                                              else{

                                              pickupCompatability = true;

                                              }
            }

         if(pickupCompatability === true) {


        if (trip.vehicleObject.tclcod === '') {
            pickupCompatability = true;
        }
        else {
            // need to check the venicle and products category compatability;
            for (var i = 0; i < data.products.length; i++) {
                if (trip && trip.vehicleObject && trip.vehicleObject.tclcod && trip.vehicleObject.tclcod.includes(data.products[i].productCateg)) {
                    pickupCompatability = true;
                }
                else {
                    pickupError = "product";
                    pickupCompatability = false;
                    break;
                }
            }
        }
       }

  console.log("T11  trip object ",trip);
   console.log("T11  data ",data);
   //to check trailr & prodcut category
 if(trip.trailers > 0)  {
  if(pickupCompatability === true) {
          if (trip.trialerObject[0].allproducts === 2) {
            pickupCompatability = true;
          }
           else {
                 if(trip.trailers === 2 && trip.trialerObject[1].allproducts === 2){
                    pickupCompatability = true;
                 }
                 else {
            // need to check the vehicle and products category compatability;
                 for(var i=0 ; i < trip.trailers; i++) {
                     for (var j = 0; j < data.products.length; j++) {
                          if (trip.trialerObject && trip.trialerObject[i].tclcod &&
                           trip.trialerObject[i].tclcod.includes(data.products[j].productCateg)) {
                             pickupCompatability = true;
                           }
                           else {
                             pickupCompatability = false;

                             pickupError = "productTrailer";
                             this.setState({
                               errorType : 'productTrailer'
                             });
                             break;
                           }
                     }
                     }
                   }
            }
        }
}

        //to  check customer compatability
                if (pickupCompatability == true) {

                    if (trip.allcustomers === 2) {

                                pickupCompatability = true;
                    }
                    else {

                                // need to check the venicle and products category compatability;
                        if (trip.customerlist && !trip.customerlist.includes(data.bpcode)) {
                               pickupCompatability = false;

                               this.setState({
                                                          errorType : 'customer',
                                                           errorMessage: '{this.props.t("cust_veh_assoc")}',
                                                           addAlertShow: true,
                                                           error: true
                                                       });

                                                   }
                                  else {

                                       pickupCompatability = true;
                                  }
                            }
                }

        if (pickupCompatability) {
            data.vehicleCode = trip.code;
            data.panelType = 'pickup';
            trip.pickupObject.push(data);
            trip.trips = 1;
            trip.pickups += 1;
            trip.startIndex += 1;
            trip.stops = trip.pickups + trip.drops;
            currentTrip.push(trip);
            var tripCount = this.state.selectedTrips;
            tripCount += 12;
            this.props.updateTrip(currentTrip);
            this.props.updateTripCount();
            const geoObj = {};
            geoObj.lat = data.lat;
            geoObj.lng = data.lng;
            geoObj.type = 'pickup';
            geoObj.panelType = 'pickup'
            geoObj.city = data.city;
            geoObj.docnum = data.docnum;
            this.props.addGeoLocations(geoObj);
            this.props.addGeoList(data, trip.startIndex);
            if (this.state.siteValue.length > 0) {
                this.setState({ siteValue: this.state.siteValue })
            }
            if (this.state.siteValueTripList.length > 0) {
                this.setState({ siteValueTripList: this.state.siteValueTripList })
            }
            if (this.state.siteStartValue.length > 0) {
                this.setState({ siteStartValue: this.state.siteStartValue })
            }
            if (this.state.siteStartValueTripList.length > 0) {
                this.setState({ siteStartValueTripList: this.state.siteStartValueTripList })
            }
        }
        else {
            // need to check the venicle and products category compatability;

            if(pickupError === 'product') {
            this.setState({
                errorMessage: 'Selected Products are not compatability with Vehicle product Category',
                addAlertShow: true,
                error: true
            });
             }
             else if(pickupError === 'Trailer') {
                        this.setState({
                            errorMessage: 'Document already contains Trailer, is not matched with Trip Trailers',
                            addAlertShow: true,
                            error: true
                        });
                         }
             else if(pickupError === 'productTrailer'){
                            this.setState({
                                           errorMessage: 'Selected Products are not compatability with Trailer product Category',
                                           addAlertShow: true,
                                           error: true
                                       });
                           }
             else if(pickupError === 'Driver') {

                                          this.setState({
                                                                                errorMessage: 'Document already contains Driver, is not matched with Trip Driver',
                                                                                addAlertShow: true,
                                                                                error: true
                                                                              });
                                         }

             else {
              this.setState({
                       errorMessage: '{this.props.t("cust_veh_assoc")}',
                       addAlertShow: true,
                       error: true
                    });
        }
        }
    }

    addTrailer = (trip, data, code, from) => {
       console.log("T11 trailer comes from", from);
        let trailer = this.state.trailers;
        console.log("T11 add trailer",this.state.trailers);
        if(from === "Vehicle") {
          console.log("T11 trailer comes from inside vehicle");
        if (this.props.curVehiclePanel && this.props.curVehiclePanel.vehicles && this.props.curVehiclePanel.vehicles.length > 0) {
            this.props.curVehiclePanel.vehicles.map((vehicle) => {
                if (vehicle.codeyve === code) {
                    if (this.props.curVehiclePanel.trails && this.props.curVehiclePanel.trails.length > 0) {
                        this.props.curVehiclePanel.trails.map((trail) => {
                            if (vehicle.trailer === trail.trailer) {
                             console.log("T11 add trailer if",trail);
                                trailer = [];
                                trailer.push(trail)
                            }
                        });
                    }
                }
            })
        }
        }
         console.log("T11 add trailer data =",data);
        trailer.push(data);
        let trailerData = [...new Map(trailer.map(obj => [JSON.stringify(obj), obj])).values()];
        trip.trialerObject = [];


        var currentTrails = [...trailerData];
         trip.trialerObject = [...trailerData];
       /*
        if(currentTrails && currentTrails.length > 0){
                    currentTrails.map((currTrailer)=>{
                        trip.trialerObject.push(currTrailer)
                    })
                }
      */
        this.props.updateTrialers(currentTrails);
        this.setState({ trailers: currentTrails });
          console.log("T11 final trailers =",currentTrails);
        if (this.state.siteValue.length > 0) {
            this.setState({ siteValue: this.state.siteValue })
        }
        if (this.state.siteValueTripList.length > 0) {
            this.setState({ siteValueTripList: this.state.siteValueTripList })
        }
        if (this.state.siteStartValue.length > 0) {
            this.setState({ siteStartValue: this.state.siteStartValue })
        }
        if (this.state.siteStartValueTripList.length > 0) {
            this.setState({ siteStartValueTripList: this.state.siteStartValueTripList })
        }
        trip.trailers += 1;

    }

    addEquipment = (trip, data) => {
        var currentEquipments = trip.equipmentObject;
        if (currentEquipments && currentEquipments.length > 0) {
            let quantity = 0;
            let sameEquip = false;
            let sameIndex;
            currentEquipments.map((currEqup, index) => {
                if (data.xequipid === currEqup.xequipid) {
                    quantity = Number(currEqup.quantity) + 1;
                    sameIndex = index
                    sameEquip = true;
                }
            })
            if (sameEquip) {
                data.quantity = quantity;
                currentEquipments.splice(sameIndex, 1);
                currentEquipments.push(data);
            } else {
                data.quantity = 1
                currentEquipments.push(data);
            }
        } else {
            data.quantity = 1
            currentEquipments.push(data);
        }

        let equpQuantity;
        if (currentEquipments.length > 0) {
            equpQuantity = currentEquipments.map(item => item.quantity).reduce((prev, next) => Number(prev) + Number(next));
        }

        this.props.updateEqupments(currentEquipments);
        this.props.updateQuantities([equpQuantity]);
        var equip = this.state.totalEquipments;
        equip += 1;
        this.setState({
            totalEquipments: equip,
            equipments: currentEquipments,
            quantities: equpQuantity
        });
        if (this.state.siteValue.length > 0) {
            this.setState({ siteValue: this.state.siteValue })
        }
        if (this.state.siteValueTripList.length > 0) {
            this.setState({ siteValueTripList: this.state.siteValueTripList })
        }
        if (this.state.siteStartValue.length > 0) {
            this.setState({ siteStartValue: this.state.siteStartValue })
        }
        if (this.state.siteStartValueTripList.length > 0) {
            this.setState({ siteStartValueTripList: this.state.siteStartValueTripList })
        }
        trip.equipments += 1;
    }

    clearEquipments = () => {
        this.setState({
            totalEquipments: 0,
            equipments: [],
            quantities: 0
        });
        var empty = [];
        this.props.updateEqupments(empty);
        this.props.updateQuantities(empty);
    }

    clearTrailers = () => {
        this.setState({
            trailers: []
        });
    }

    handleChange = (event, index) => {
        var equipmentsData;
        if (this.props.trips && this.props.trips[0] && this.props.trips[0].equipmentObject.length > 0) {
            equipmentsData = this.props.trips[0].equipmentObject;
        } else {
            equipmentsData = this.state.equipments;
        }

        equipmentsData[index].quantity = event;
        let equpQuantity = 0;
        if (equipmentsData.length > 0) {
            equpQuantity = equipmentsData.map(item => item.quantity).reduce((prev, next) => Number(prev) + Number(next));
        }
        this.setState({
            equipments: equipmentsData,
            quantities: equpQuantity,
        })
    }

    deleteTrailer = (i) => {
        console.log("T11 inside deleteTrailer");
         console.log("T11 inside deleted Trailer",i);
        let trailer = this.state.trailers;
        let removedTrailer = trailer.splice(i, 1);
         console.log("T11 inside removed Trailer",removedTrailer);
          console.log("T11 inside after removed Trailer",trailer);
        this.props.enableDivs(removedTrailer)
         console.log("T11 inside finalized Trailer",trailer);
        this.setState({ trailers: trailer });
    }

    deleteEquipment = (i) => {
        let equipments = this.state.equipments;
        equipments.splice(i, 1);
        let quantity = this.state.quantities;
        let equpQuantity = 0;
        if (equipments.length > 0) {
            equpQuantity = equipments.map(item => item.quantity).reduce((prev, next) => Number(prev) + Number(next));
        }
        quantity = equpQuantity;
        this.setState({ equipments: equipments })
        this.setState({ quantities: quantity })
    }

    onSaveEquipment = (trip) => {
        var count = 0;
        var currentEquipments = this.state.equipments;
        trip.equipments = this.state.quantities;
        var entireTrip = [];
        entireTrip.push(trip);
        this.setState({
            totalEquipments: count,
            quantityMessage: 'Successfully Quantity Updated'
        });
        this.props.updateTrip(entireTrip);
    }

    trailerData = (trip) => {
        if (this.props.checkedTrip) {
            return trip.trialerObject && trip.trialerObject.length
        } else {
            return this.state.trailers.length
        }
    }

    equipmentData = (trip) => {
        let equpQuantity = 0;
        if (this.props.checkedTrip && trip.equipmentObject.length > 0) {
            equpQuantity = trip.equipmentObject.map(item => item.quantity).reduce((prev, next) => Number(prev) + Number(next));
        } else if ((this.props.checkedTrip && trip.equipmentObject == 0)) {
            equpQuantity = 0;
        } else if (this.state.equipments.length > 0) {
            equpQuantity = this.state.equipments.map(item => item.quantity).reduce((prev, next) => Number(prev) + Number(next));
        }
        return equpQuantity;
    }

    onEquipmentClick = (equipmentObject) => {
        let equpQuantity = 0;
        if (this.state.equipments.length > 0) {
            equpQuantity = this.state.equipments.map(item => item.quantity).reduce((prev, next) => Number(prev) + Number(next));
        }
        if (this.props.checkedTrip) {
            this.setState({ equipments: equipmentObject });
        }
        this.setState({
            addEquipmentShow: true,
            quantities: equpQuantity,
            quantityMessage: ''
        })
    }

    onTrailerClick = (trailerObject) => {
        if (this.props.checkedTrip) {
            this.setState({ trailers: trailerObject });
        }
        this.setState({
            addTrailShow: true
        })
    }

    onConfirmClick = (trip) => {
        console.log("TTT inside confirm trip", trip);
        this.setState({ isValidPassword: '' })
        var message = '';
        let dropVolume = trip.dropObject.reduce((a, b) => a + (b['volume'] || 0), 0);
        let pickupVolume = trip.pickupObject.reduce((a, b) => a + (b['volume'] || 0), 0);
        let dropCapacities = trip.dropObject.reduce((a, b) => a + (b['netweight'] || 0), 0);
        let pickupCapacities = trip.pickupObject.reduce((a, b) => a + (b['netweight'] || 0), 0);



        if(!trip.itemCode){
         //trip.forceSeq = false;
         trip.loaderInfo = "";

        }

   // if(trip.driverId !== ""){
/*
        if (trip.vol <= (dropVolume + pickupVolume) ||
            trip.vehicleObject.maxordercnt <= (trip.pickupObject.length + trip.dropObject.length) ||
            trip.vehicleObject.capacities <= (pickupCapacities + dropCapacities)) {

            if (trip.vol <= (dropVolume + pickupVolume)) {
                message = message + `Trip Volume (${dropVolume + pickupVolume}) is greater-than Max Vehicle Volume(${trip.vol}))`;
            }
            if (trip.vehicleObject.maxordercnt <= (trip.pickupObject.length + trip.dropObject.length)) {
                message = message + `Trip Count (${trip.pickupObject.length + trip.dropObject.length}) is greater-than Max Vehicle Count(${trip.vehicleObject.maxordercnt}))`;
            }
            if (trip.vehicleObject.capacities <= (pickupCapacities + dropCapacities)) {
                message = message + `Trip Capacity (${pickupCapacities + dropCapacities}) is greater-than Max Vehicle Capacity(${trip.vehicleObject.capacities}))`;
            }
            let warningAlertTitle = 'Warning'
            this.setState({
                addConfirmShow: true,
                confirmMessage: message,
                warning: true,
                warningAlert: warningAlertTitle
            })
            */
      //  } else {
            message = 'Are you sure you want to Confirm the Trip';
            let warn = false;
            let warningAlertTitle = '';
            if (trip.pickupObject.length <= 0 && trip.dropObject.length <= 0) {
                message = "Pickup or Drop are not attached to Route, Are you sure you want to Delete the Trip?";
                warn = false;
            }
            trip.site = trip.vehicleObject.fcy;
            if (this.props.updatedArrSite && this.props.updatedArrSite.length > 0) {
                trip.depSite = this.props.updatedArrSite
            } else {
                if (trip.depSite && trip.depSite.length > 0) {
                    trip.depSite = trip.depSite
                } else {
                    trip.depSite = trip.vehicleObject.startdepotn
                }
            }
            trip.arrSite = trip.vehicleObject.enddepotname
            if (this.state.siteValue.length > 0) {
                trip.vehicleObject.enddepotname = this.state.siteValue;
                trip.arrSite = this.state.siteValue
            }
            if (this.state.siteStartValue.length > 0) {
                trip.vehicleObject.startdepotn = this.state.siteStartValue;
                trip.depSite = this.state.siteStartValue
            }
            if (this.state.siteValueTripList.length > 0) {
                trip.vehicleObject.enddepotname = this.state.siteValueTripList;
                trip.arrSite = this.state.siteValueTripList;
            }
            if (this.state.siteStartValueTripList.length > 0) {
                trip.vehicleObject.startdepotn = this.state.siteStartValueTripList;
                trip.depSite = this.state.siteStartValueTripList;
            }
            this.setState({
                addConfirmShow: true,
                confirmMessage: message,
                currentTrip: trip,
                warning: warn,
                warningAlert: warningAlertTitle,
            })
      //  }
    /*  }
      else {
         this.setState({
                         errorMessage: 'Please assign a Driver for the Trip',
                         addAlertShow: true
                     });
      }
      */
    }

    onConfirmNo = () => {
         console.log("inside confirm No");
        this.setState({
            addConfirmShow: false
        })
    }

    onConfirmYes = (trip) => {
       console.log("inside confirm YEs");
        this.setState({
                   addConfirmShow: false,
                   quantities: 0,
                   equipments: []
               })
        this.props.confirmTrip(this.state.currentTrip);

    }





  handleCheckboxChange = (event) => {

     var thisTrip = [];
     var curTrip = this.props.trips[0];
     curTrip.forceSeq = !curTrip.forceSeq;
     thisTrip.push(curTrip);
     this.props.updateTrip(thisTrip);
    this.setState({
      forceSeq : !curTrip.forceSeq
    });
  }

    onSaveNotes = (note) => {
        var thisTrip = [];
        var curTrip = this.props.trips[0];
        curTrip.notes = note;
        thisTrip.push(curTrip);
        this.props.updateTrip(thisTrip);
        this.setState({
            addNotesShow: false
        });
    }

    onDocClick = (product, docNum,doctype) => {
        const products = product;
        this.setState({
            addProductShow: true,
            products: products,
            docNumber: docNum,
            doctype : doctype
        });
    }

    getData = () => {
        if (this.props.selectedTripData === undefined || Object.keys(this.props.selectedTripData).length === 0) {
            return "";
        } else {
            return (
                <table>
                    <tr>
                         <th> {this.props.t('Type')}</th>
                         <th>{this.props.t('Document')}</th>
                         <th>{this.props.t('Client Code')}</th>
                         <th>{this.props.t('Client')}</th>
                         <th>{this.props.t('City')}</th>
                         <th>{this.props.t('Weight')}</th>
                         <th>{this.props.t('Volume')}</th>
                         <th>{this.props.t('Qty')}</th>
                    </tr>
                    <tr>
                        <td>{this.props.selectedTripData.doctype}</td>
                        <td>
                            <a href="#" onClick={() => this.onDocClick(this.props.selectedTripData.products, this.props.selectedTripData.docnum,this.props.selectedTripData.doctype)}>
                                {this.props.selectedTripData.docnum}
                            </a>
                        </td>
                        <td>{this.props.selectedTripData.bpcode}</td>
                        <td>{this.props.selectedTripData.bpname}</td>
                        <td>{this.props.selectedTripData.poscode} {this.props.selectedTripData.city}</td>
                        <td>{this.props.selectedTripData.netweight} {this.props.selectedTripData.weightunit}</td>
                        <td>{this.props.selectedTripData.volume} {this.props.selectedTripData.volume_unit}</td>
                        <td>{this.getTotalQty(this.props.selectedTripData.products)} </td>
                    </tr>
                </table>
            );
        }
    }


    getTotalQty = (prodList) => {
     console.log("T555 insdie getTotlQty prodlist",prodList);
     let prods = prodList;
     let TotQty = 0
     prods && prods.length > 0 && prods.map((prod) => {
         TotQty += +prod.quantity
          console.log("T555 insdie prod qty prodlist",prod.quantity);

     });
       console.log("total qty =",TotQty)
       return TotQty;
    }

    getTripsData = (count, timelineInterval) => {
        if (count + 1 === timelineInterval.length) {
            return "";
        } else {
            return (
                <div>
                    <div class="_17G29n RSqBek" style={{ transitionDelay: '0s', marginLeft: '55px', marginTop: '10px' }}><span class="_3Qv1YL">{count + 1}</span></div>
                    <div class="_3HKlvX" style={{ transitionDelay: '0s', marginLeft: '55px', backgroundColor: this.props.tripColor[count] }} onClick={() => this.props.updateSelectedTrip(count)}>
                    </div>
                    <div class="_2QynGw">
                        <div class="_1tBjl7" style={{ transitionDelay: '0s', transform: 'scaleX(1)', backgroundColor: this.props.tripbgColor[count] }}>
                        </div>
                    </div>
                </div>
            );
        }
    }

    unlockTrip = (tmsValidated) => {
        if (tmsValidated) {
            this.setState({
                errorMessage: 'Already Trip is validated, You cant unlock the Trip',
                addAlertShow: true
            });
        } else {
            this.props.unlockTrip();
        }
    }

    getLockData = (lock, tmsValidated) => {
        if (lock) {
            return (
                <span>
                    <LockRounded style={{ fontSize: 18 }} onClick={() => this.unlockTrip(tmsValidated)} />
                </span>
            );
        } else {
            return (
                <LockOpenRoundedIcon color="primary" style={{ fontSize: 18 }} />
            );
        }
    }

    displayLabel = (label, trip, i) => {

        let sameTrips = [];
        let loadHrs;
        let time = label;
        console.log("Trr time 1 =",time);
        if (trip.optistatus === "Optimized") {
        console.log("Trr time 2 optimised trip =",time);
            return time

        } else {
            if (this.props.tripsPanel && this.props.tripsPanel.length > 0) {
                this.props.tripsPanel.map((tripsPanel) => {
                     console.log("Trr time 3 tripsPanel =",tripsPanel);
                    if (tripsPanel.code === trip.code && tripsPanel.optistatus === "Optimized" && tripsPanel.docdate === trip.docdate) {
                        console.log("Trr time 4 trip =",trip);
                        console.log("Trr time 4 tripsPanel =",tripsPanel);
                        loadHrs = tripsPanel.vehicleObject.enddepotserv + tripsPanel.vehicleObject.startdepots;
                        console.log("Trr time 5 trip =",loadHrs);
                        sameTrips.push(tripsPanel)
                    }
                    if (sameTrips.length > 0) {
                        console.log("Trr time 6 sameTrips =",sameTrips);
                        let timeHr = sameTrips[sameTrips.length - 1].endTime.split(':')[0];
                        let timeMin = sameTrips[sameTrips.length - 1].endTime.split(':')[1];
                        if ((Number(timeHr) + i) >= 23) {
                            timeHr = (Number(timeHr) + i) - 24;

                        } else {
                            timeHr = (Number(timeHr) + i)
                        }
                        time = convertHrToSec(timeHr) + convertMinToSec(timeMin) + convertHrToSec(loadHrs);
                        time = formatTime(time);
                    }
                })
                return time
            } else {
                return time
            }
        }
    }

    onDepSiteClick = () => {
        this.setState({ authenticationShow: true })
    }

    startDepo(trip) {
        if (trip.resetdepsite) {
            return ''
        }
        else if (trip.depSite && trip.depSite.length > 0) {
            return trip.depSite
        }
        else if (this.props.updatedArrSite && this.props.updatedArrSite.length > 0) {
            return this.props.updatedArrSite
        } else {
            return trip.vehicleObject.startdepotn
        }
    }

    startSiteDepo(trip) {
        if (trip.depSite && trip.depSite.length > 0) {
            return trip.depSite
        }
        else if (this.props.updatedArrSite && this.props.updatedArrSite.length > 0) {
            return this.props.updatedArrSite
        } else {
            return trip.vehicleObject.startdepotn
        }
    }

    handleSiteChange(value, trip, type) {
        var deparsite = this.startDepo(trip);
        this.props.handleArrSite(value.label, type);
        if (this.props.checkedTrip) {
            if (type === "end") {
                this.setState({ siteValueTripList: value.label })
            } else if (type === "start") {
                this.setState({ siteStartValueTripList: value.label })
            }
        } else {
            if (type === "start") {
                this.setState({ siteStartValue: value.label })
            } else {
                this.setState({ siteValue: value.label });
            }
        }
        if (type === "end") {
            this.setState({
                confirmMessage: 'DifferentSite',
                addvalidateconfirmShow: true,
                depsite: deparsite
            });
        }
    }

    onValidateNo = () => {
        var site = this.state.depsite;
        this.props.filterTrans_depSite(site);
        this.setState({
            addvalidateconfirmShow: false
        })
    }

    dropDownVal = (site, options, type) => {
        if (this.props.checkedTrip) {
            if (type === "end") {
                if (this.state.siteValueTripList.length > 0) {
                    return [{ label: this.state.siteValueTripList, value: this.state.siteValueTripList }];
                } else {
                    return [{ label: site, value: site }];
                }
            }
            if (type === "start") {
                if (this.state.siteStartValueTripList.length > 0) {
                    return [{ label: this.state.siteStartValueTripList, value: this.state.siteStartValueTripList }];
                } else {
                    return [{ label: site, value: site }];
                }
            }

        } else {
            let val = '';
            if (type === "end" && this.state.siteValue.length > 0) {
                val = this.state.siteValue;
            } else if (type === "start" && this.state.siteStartValue.length > 0) {
                val = this.state.siteStartValue;
            } else if (type === "start" && this.props.updatedArrSite.length > 0) {
                val = this.props.updatedArrSite;
            } else {
                val = site;
                let siteDepo = { label: site, value: site }
                let data = options.some(option => option.label === siteDepo.label);
                if (!data) {
                    options.push(siteDepo)
                }
            }
            return [{ label: val, value: val }];
        }
    }



    onValidateYes = () => {
        var emptysite = "";
        this.props.filterTrans_depSite(emptysite);
        this.setState({
            addvalidateconfirmShow: false
        })
    }

    updatePassword = (password) => {
        if (password === '1234') {
            this.setState({ authenticationShow: false, isValidPassword: 'yes' });
        } else {
            this.setState({ isValidPassword: 'no' })
        }
    }

    getTotalData = (selectedTrips , type) => {

      let tw = 0 , tv = 0, tq = 0, wu= '', vu = '';
      console.log("T666 inside getTotalData =",selectedTrips);

      selectedTrips && selectedTrips.length > 0 && selectedTrips.map((doc) => {
           tw += +doc.netweight;
           tv += +doc.volume;
           wu = doc.weightunit;
           vu = doc.volume_unit;
           tq +=  +this.getTotalQty(doc.products);
      })

     if(type === 'w')
        return tw + ''+wu
     else if(type === 'v')
          return tv + '' + vu
     else if(type === 'q')
          return tq
     else
        return '0'
    }

    render() {

        const menuPortalTarget = document.getElementById('root');
        let addTrailClose = () => this.setState({ addTrailShow: false });
        let authenticationClose = () => this.setState({ authenticationShow: false });
        let checkedTripClose = () => this.setState({ checkedTripShow: false });
        let addAlertClose = () => this.setState({ addAlertShow: false });
        let addEquipmentClose = () => this.setState({ addEquipmentShow: false });
        let addConfirmClose = () => this.setState({ addConfirmShow: false });
        let addProductsClose = () => this.setState({ addProductShow: false });
        let addNotesClose = () => this.setState({ addNotesShow: false });
        var currTrips = this.props.trips;
        console.log("TTT inside render - add update",this.props.trips);
        if (this.props.clearTrips !== undefined & this.props.clearTrips) {
            currTrips = [];
        }
        var actualTrip = {
            code: '',
            driverName: '',
            driverId: '',
            trailers: 0,
            equipments: 0,
            trips: 0,
            pickups: 0,
            lock: false,
            pickupObject: [],
            dropObject: [],
            equipmentObject: [],
            trialerObject: [],
            drops: 0,
            stops: 0,
            timelineInterval: [],
            trailerList: [],
            trailerLink: ''
        }

        let options = [];
        if (this.props.selectedSitesArr && this.props.selectedSitesArr.length > 0) {
            this.props.selectedSitesArr.map((site) => {
                options.push({ label: site, value: site })
            })
        }
        if (this.props.updatedArrSite && this.props.updatedArrSite.length > 0) {
            let data = options.find(x => x.label === this.props.updatedArrSite);
            if (data === undefined) {
                options.push({ label: this.props.updatedArrSite, value: this.props.updatedArrSite })
            }
        }

        return (
          <Card  class="col-md-12 pt-2 pb-0 pr-1 pl-1"
           onDragOver={(evnt) => this.dragOver(evnt)}
                          onDrop={(evnt) => this.drop(evnt)}>
           <CardBody>

                                           <div class="col-md-12">
                                               {this.props.t('Active Tour')}
                                               </div>
 <hr class="m-0 p-0" />
                <div class="middlesection">
                    <div class="reportlist-view">
                        <div class="ctablheight">
                            <table class="table">
                                <thead>
                                    <tr >
                                        <th></th>

                                        <th width="6%">{this.props.t('Vehicle')}</th>
                                        <th width="6%">{this.props.t('Driver')}</th>
                                        <th width="3%">{this.props.t('Trailer')}</th>
                                        <th width="3%">{this.props.t('Equipment')}</th>
                                        <th width="3%">{this.props.t('DepartureSite')} </th>
                                        <th width="3%">{this.props.t('ArrivalSite')}</th>
                                        <th width="3%">{this.props.t('Seq')} #</th>
                                        <th width="5%">{this.props.t('TravelTime')}</th>
                                        <th width="5%">{this.props.t('Distance')}</th>
                                        <th width="5%">{this.props.t('Total Weight')}</th>
                                        <th width="5%">{this.props.t('Total Vol')}</th>
                                        <th width="5%">{this.props.t('Total Qty')}</th>
                                        <th width="3%">{this.props.t('PickUps')}</th>
                                        <th width="3%">{this.props.t('Drops')}</th>
                                        <th width="3%">{this.props.t('Stops')}</th>
                                        <th width="3%">Forced Seq</th>
                                        <th width="3%">{this.props.t('Comments')}</th>
                                        <th>{this.props.t('SequenceTrip')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(currTrips || []).map((trip, i) => {
                                        console.log("inside Addupdate return map",trip);
                                        actualTrip = trip;
                                         trip.trailers = this.state.trailers.length;
                                        trip.equipments = this.state.equipments.length;

                                        return (
                                            <tr key={i}>
                                              <td className="align-middle">
                                                                              <Button
                                                                                size="sm"
                                                                                color="primary"
                                                                                active
                                                                                type="button"
                                                                                onClick={() => this.props.toggleDetail(true)}
                                                                              >
                                                                                <i className="ri-arrow-left-s-line"></i>
                                                                              </Button>
                                                                            </td>

                                                <td width="6%">{trip.code}</td>
                                                <td width="6%">{trip.driverName}</td>
                                                <td width="3%"><a class="custom-anchor" href="#" onClick={() => this.onTrailerClick(actualTrip.trialerObject)}><u>{this.trailerData(trip)}</u></a></td>
                                                <td width="3%"><a class="custom-anchor" href="#" onClick={() => this.onEquipmentClick(actualTrip.equipmentObject)}><u>{this.equipmentData(trip)}</u></a></td>
                                                <td onClick={this.state.isValidPassword !== 'yes' && !trip.lock ? () => this.onDepSiteClick() : null}>
                                                    {this.state.isValidPassword === 'yes' && !trip.lock ?
                                                        <div style={{ width: '100px' }}>
                                                            <Select
                                                                value={this.dropDownVal(trip.vehicleObject.startdepotn, options, "start")}
                                                                onChange={(e) => this.handleSiteChange(e, trip, "start")}
                                                                options={options}
                                                                maxMenuHeight={100}
                                                                menuPlacement="bottom"
                                                                menuPortalTarget={menuPortalTarget}
                                                            /> </div>
                                                        : this.startDepo(trip)}
                                                </td>
                                                <td >
                                                    <div style={{ width: '100px' }}>
                                                        {trip && trip.lock ? trip.arrSite :
                                                            <Select
                                                                value={this.dropDownVal(trip.vehicleObject.enddepotname, options, "end")}
                                                                onChange={(e) => this.handleSiteChange(e, trip, "end")}
                                                                options={options}
                                                                maxMenuHeight={100}
                                                                menuPlacement="bottom"
                                                                menuPortalTarget={menuPortalTarget}
                                                            />
                                                        }
                                                    </div>
                                                </td>
                                                <td width="3%"><span class="vtrips">{trip.trips}</span></td>
                                                <td width="5%">0</td>
                                                <td width="5%">0</td>
                                                <td width="5%">{trip.totalObject.selectedTripData.length > 0 ? this.getTotalData(trip.totalObject.selectedTripData , 'w') : 0}</td>
                                                <td width="5%">{this.getTotalData(trip.totalObject.selectedTripData , 'v')}</td>
                                                <td width="5%">{this.getTotalData(trip.totalObject.selectedTripData , 'q')}</td>
                                                <td width="3%">{trip.pickups}</td>
                                                <td width="3%">{trip.drops}</td>
                                                <td width="3%"><span class="">{trip.stops}</span></td>
                                                <td width="3%">
                                                { trip && trip.lock ? trip.forceSeq ? 'Yes' : 'No' :
                                                <Checkbox color="primary"
                                                  checked = {trip.forceSeq}
                                                  onChange={this.handleCheckboxChange}
                                                  />
                                                  }
                                                </td>
                                                <td width="3%">
                                                    <span>
                                                       <MessageIcon color="primary" style={{ fontSize: 32 }} onClick={()=>this.setState({addNotesShow:true})} />
                                                    </span>
                                                </td>
                                                <td width="38%">
                                                    <div class="_3ncsB7">
                                                        <div class="_3BVwT">
                                                            {(trip.timelineInterval || []).map((timeLine, i) => {
                                                                return (
                                                                    <div key={i} class="_1i5nEe" style={{ width: '55px' }}>
                                                                        {this.getTripsData(i, trip.timelineInterval)}
                                                                        <div class="_3wS5ZT">
                                                                            <span>{this.displayLabel(timeLine.label, trip, i)}</span>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                            <div class="_34rk9f grmEyz" style={{ left: this.props.left + 'px' }}>
                                                            </div>
                                                            <div class="_3MjVpW">
                                                                <div class="_1ctEzo">
                                                                    <div class="_2Mi_Sr">
                                                                        <span class="">
                                                                            {this.getData()}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div class="col-3 text-right ml-auto" style={{ height: '50px', marginRight: '50px' }}>
                            {(() => {
                                if (currTrips.length > 0) {
                                    return (

                                        <div>
                                            <button type="button" class="btn btn-primary btn-sm mt-2"
                                                onClick={() => this.onConfirmClick(actualTrip)}
                                                disabled={actualTrip.lock}
                                            >
                                                <i class="fa fa-pen"></i>{this.props.t('Confirm')}
                                            </button>
                                            {/* <button class="btn btn-primary btn-sm mt-2 ml-2"
                                                onClick={() => this.ResetUpdateTrip(actualTrip)}
                                                disabled={actualTrip.trips > 0}
                                            >Reset</button> */}
                                        </div>
                                    );
                                }
                            })()}
                        </div>
                    </div>

                    <DisplayTrailers
                        show={this.state.addTrailShow}
                        onHide={addTrailClose}
                        trailers={this.state.trailers}
                        deleteTrail={this.deleteTrailer}
                        displayEdit={actualTrip.lock ? false : true}
                    ></DisplayTrailers>
                   <DisplayCheckedTrip
                        show={this.state.checkedTripShow}
                        message = {this.state.vehicleMessage}
                        onHide={checkedTripClose}
                        onUpdate={this.drop}
                        enableOk={this.state.enableOk}
                    // onUpdate={checkedTripClose}
                    />
                    <DisplayAuthentication
                        show={this.state.authenticationShow}
                        onHide={authenticationClose}
                        updatePassword={this.updatePassword}
                        isValidPassword={this.state.isValidPassword}
                    >
                    </DisplayAuthentication>

                    <DisplayEquipments
                        show={this.state.addEquipmentShow}
                        onHide={addEquipmentClose}
                        handleChange={this.handleChange}
                        equipments={this.state.equipments}
                        quantities={this.props.quantities}
                        quantityMessage={this.state.quantityMessage}
                        onSaveEquipment={this.onSaveEquipment}
                        actualTrip={actualTrip}
                        displayEdit={actualTrip.lock ? false : true}
                        deleteEquip={this.deleteEquipment}
                    ></DisplayEquipments>

                    <Confirm
                        show={this.state.addConfirmShow}
                        onHide={addConfirmClose}
                        confirmTrip={this.onConfirmYes}
                        trip={this.state.currentTrip}
                        confirmMessage={this.state.confirmMessage}
                        warning={this.state.warning}
                        warningAlert={this.state.warningAlert}
                    ></Confirm>

                    <Alert
                        show={this.state.addAlertShow}
                        onHide={addAlertClose}
                        errorMessage={this.state.errorMessage}
                    ></Alert>

                    <ValidateConfirm
                        show={this.state.addvalidateconfirmShow}
                        onHide={this.onValidateNo}
                        validateConfirm={this.onValidateYes}
                        confirmMessage={this.state.confirmMessage}
                    ></ValidateConfirm>

                    <DisplayProducts
                        show={this.state.addProductShow}
                        onHide={addProductsClose}
                        products={this.state.products}
                        docNum={this.state.docNumber}
                        doctype = {this.state.doctype}
                    ></DisplayProducts>

                    <DisplayNotes
                        show={this.state.addNotesShow}
                        onHide={addNotesClose}
                        notes={actualTrip.notes}
                        onSaveNotes={this.onSaveNotes}
                        displayEdit={actualTrip.lock ? false : true}
                    ></DisplayNotes>


                </div>


                       </CardBody>
                         </Card>
        );
    }
}

export default withNamespaces()(AddUpdateTrip1);