import React from 'react';
import Confirm from './Confirm';
import Alert from './Alert';
import mockdate from './ActiveMockData.json';
import DisplayProducts from './DisplayProducts';
import DisplayNotes from './DisplayNotes';
import MessageIcon from '@material-ui/icons/Message';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import LockRounded from '@material-ui/icons/LockRounded';
import Checkbox from '@mui/material/Checkbox';
import Select from 'react-select';
import ValidateConfirm from './ValidateConfirm';
import { withNamespaces } from 'react-i18next';
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
                    vehicleObject: {},
                    trips: 0,
                    pickups: 0,
                    lock: false,
                    dropObject: [],
                    drops: 0,
                    stops: 0,
                    timelineInterval: [],
                    forceSeq: false,
                    currDropsPanel: {
                        drops: []

                    },
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
                    let dropRailCompatability = true;
                   console.log("inside Add- vehicle type",data);

 console.log("inside Add- vehicle panel trip",this.props.tripsPanel);
 console.log("inside Vehicle - updateseletedTrip ", this.props.updateSelectedTrip);
console.log("inside Vehicle -  selectedTripData", this.props.selectedTripData);




                    this.setState({ isValidPassword: '' })
                    if (currentTrip.length > 0) {
                        currentTrip = [];
                    }

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

                    trip.code = data.railcarid;

                  //  this.props.colourDivs(data.alldrivers, data.driverslist, data.trailerLink, data.trailerList);
                   var IsRailCarReady = true;
                   for (var j = 0; j < this.props.tripsPanel.length; j++) {
                      if (trip.code == this.props.tripsPanel[j].code) {
                          if(this.props.tripsPanel[j].optistatus === 'Railcar Emptied')
                          {

                          }
                          else {

                           status = false;
                           dropRailCompatability = false;
                          this.setState({
                                          errorMessage: 'Selected RailCar is in progress, with existing Trip',
                                          addAlertShow: true,
                                          error: true
                                      });
                           }
                     }
                   }
              if(dropRailCompatability) {
                     trip.timelineInterval = data.timelineInterval;
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

                    trip.capacities = data.cargrosswei;
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
                    if (currentTrip[0].currDropsPanel && this.props.currDropsPanel
                                        && this.props.trips && this.props.trips[0]) {
                                        currentTrip[0].currDropsPanel.drops = this.props.currDropsPanel.drops;
                                        currentTrip[0].drops = this.props.trips[0].drops;
                                        currentTrip[0].pickups = this.props.trips[0].pickups;
                                        currentTrip[0].stops = this.props.trips[0].stops;
                                        currentTrip[0].trips = this.props.trips[0].trips;
                                        currentTrip[0].driverName = this.props.trips[0].driverName;
                                        currentTrip[0].driverId = this.props.trips[0].driverId;
                                        currentTrip[0].dropObject = this.props.trips[0].dropObject;
                                        currentTrip[0].vehicleObject = this.props.trips[0].vehicleObject;
                                         currentTrip[0].notes = this.props.trips[0].notes;
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

       console.log("Add drop - currentTrip",currentTrip);
       console.log("Add drop - trip",trip);
       console.log("Add drop - data", data);

        if(trip.code === data.railcar) {

         }
         else{

          dropCompatability = false;
            error = "RailCar";
                                               this.setState({
                                                  errorType : 'RailCar'
                                                });
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

            if(error === 'RailCar') {
            this.setState({
                errorMessage: 'Selected Document RailCar is different with Route Rail Car',
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
                                                           errorMessage: 'Customer is not associated with current Vehicle',
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
                       errorMessage: 'Customer is not associated with current Vehicle',
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

         console.log("inside ConfirmClick",trip);
        this.setState({ isValidPassword: '' })
        var message = '';
            message = 'Are you sure you want to confirm the trip? ';
            let warn = false;
            let warningAlertTitle = '';
            if (trip.itemcode !== undefined && trip.dropObject.length <= 0) {
                message = "Drop are not attached to Route, Are you sure you want to Delete the Trip?";
                warn = false;
            }else if(trip.dropObject.length <= 0) {
             message = "Drops are empty, please add atleast one drop to create a Trip?";
                            warn = true;
            }
            trip.site = trip.vehicleObject.fcy;

            this.setState({
                addConfirmShow: true,
                confirmMessage: message,
                currentTrip: trip,
                warning: warn,
                warningAlert: warningAlertTitle,
            })
        }

    onConfirmNo = () => {
         console.log("inside confirm No");
        this.setState({
            addConfirmShow: false
        })
    }

    onConfirmYes = (trip) => {
       console.log("inside confirm YEs");
        this.props.confirmTrip(this.state.currentTrip);
        this.setState({
            addConfirmShow: false,
            quantities: 0,
            equipments: []
        })
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
                     </tr>
                 </table>
             );
         }
     }



    getTripsData = (count, timelineInterval) => {
        console.log("inside getTripData - count",timelineInterval.length)
        if (count + 1 === timelineInterval.length) {
            return "";
        }else{
                      return (
                             <div>
                                 <div class="_17G29n RSqBek" style={{ transitionDelay: '0s', marginLeft: '55px', marginTop: '10px' }}><span class="_3Qv1YL">{count + 1}</span></div>
                                 <div class="_3HKlvX" style={{ transitionDelay: '0s', marginLeft: '55px', backgroundColor: this.props.tripColor[count]  }} onClick={() => this.props.updateSelectedTrip(count)} >
                                 </div>
                                 <div class="_2QynGw">
                                     <div class="_1tBjl7" style={{ transitionDelay: '0s', transform: 'scaleX(1)', backgroundColor: this.props.tripbgColor[count]  }}>
                                     </div>
                                 </div>
                             </div>
                         );
        }
        /*
         else {
            return (
                <div>
                    <div class="_17G29n RSqBek" style={{ transitionDelay: '0s', marginLeft: '55px', marginTop: '10px' }}><span class="_3Qv1YL">{count + 1}</span></div>
                    <div class="_3HKlvX" style={{ transitionDelay: '0s', marginLeft: '55px', backgroundColor: '#7ace4c' }} onClick={() => this.props.updateSelectedTrip(count)} >
                    </div>
                    <div class="_2QynGw">
                        <div class="_1tBjl7" style={{ transitionDelay: '0s', transform: 'scaleX(1)', backgroundColor: this.props.tripbgColor[count]  }}>
                        </div>
                    </div>
                </div>
            );
        }
        */
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


    onDepSiteClick = () => {
        this.setState({ authenticationShow: true })
    }

    startDepo = (trip) => {
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

    startSiteDepo =(trip) => {
        if (trip.depSite && trip.depSite.length > 0) {
            return trip.depSite
        }
        else if (this.props.updatedArrSite && this.props.updatedArrSite.length > 0) {
            return this.props.updatedArrSite
        } else {
            return trip.vehicleObject.startdepotn
        }
    }

    handleSiteChange = (value, trip, type) => {
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

    render() {

        const menuPortalTarget = document.getElementById('root');
        let addTrailClose = () => this.setState({ addTrailShow: false });
        let authenticationClose = () => this.setState({ authenticationShow: false });
        let checkedTripClose = () => this.setState({ checkedTripShow: false });
        let addAlertClose = () => this.setState({ addAlertShow: false });
        let addEquipmentClose = () => this.setState({ addEquipmentShow: false });
        let addConfirmClose = () => this.setState({ addConfirmClose: false });
        let addProductsClose = () => this.setState({ addProductShow: false });
        let addNotesClose = () => this.setState({ addNotesShow: false });
        var currTrips = this.props.trips;
        console.log("inside render - add update",this.props.trips);
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
                <div class="middlesection">
                    <div class="reportlist-view">

                                        {(() => {
                                            if (currTrips.length <= 0) {
                                                return (
                                                    // <div class="col-md-12">
                                                    //     No trips are configured.
                                                    // </div>
                                                    <div class="col-md-12" style={{fontSize : "16px"}}>
                                                        {'Active RailCar'}
                                                    </div>
                                                );
                                            }
                                        })()}
                           <hr class="m-0 p-0" /><br/>
                        <div class="ctablheight">
                            <table class="table">
                                <thead>
                                    <tr >

                                        <th width="6%">{this.props.t('RailCar')}</th>
                                        <th width="6%">{this.props.t('RouteCode')}</th>

                                        <th width="3%">{this.props.t('Source Site')} </th>
                                        <th width="3%">{this.props.t('Destination Site')}</th>
                                        <th width="3%">{this.props.t('Count')}</th>
                                        <th width="3%">{this.props.t('Comments')}</th>
                                        <th>{this.props.t('Delivery Sequence')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(currTrips || []).map((trip, i) => {
                                        console.log("inside Addupdate return map",trip);
                                        actualTrip = trip;

                                        return (
                                            <tr key={i}>
                                                <td width="6%">{trip.code}</td>
                                                <td width="6%">{trip.itemCode}</td>

                                                <td width="6%">{trip.site}</td>
                                               <td width="6%">{trip.site}</td>

                                                <td width="3%"><span class="">{trip.stops}</span></td>
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
                                                                            <span>{timeLine.label}</span>
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


                   <DisplayCheckedTrip
                        show={this.state.checkedTripShow}
                        message = {this.state.vehicleMessage}
                        onHide={checkedTripClose}
                        onUpdate={this.drop}
                        enableOk={this.state.enableOk}
                    // onUpdate={checkedTripClose}
                    />


                    <Confirm
                        show={this.state.addConfirmShow}
                        onHide={this.onConfirmNo}
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