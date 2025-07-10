// import React from "react";
// import { withNamespaces } from "react-i18next";
// import {
//   nullAndNanChecking,
//   nullAndNanCheckingFloat,
//   nullAndTime,
// } from "../converterFunctions/converterFunctions";
// import {
//   Card,
//   CardBody,
//   CardSubtitle,
//   CardTitle,
//   Col,
//   Container,
//   Input,
//   Label,
//   Row,
//   Button,
// } from "reactstrap";
// class VrTotals extends React.Component {
//   render() {
//     let currency, distunts, massunit, volunits;
//     let c, d, m, v;
//     var wu, vu;
//     var lang = localStorage.getItem("lng");
//     /*   if (lang == "en") {
//             currency = "USD";
//             distunts = 'Miles';
//               wu = 'LB';
//               vu = 'GAL'
//         }
//         else {
//             currency = "EUR";
//             distunts = 'Kms';
//             wu = 'KG';
//             vu = 'L';
//         }
// */
//     var i,
//       ordercount = 0;
//     var tdropwei = 0,
//       tpickupwei = 0,
//       tdropvol = 0,
//       tpickupvol = 0;
//     var VrObject = this.props.vrdata;
//     var DetailObject = this.props.vedetail;
//     var trip = this.props.tripdetails;
//     var VehicleCapacity = parseFloat(VrObject.capacities);
//     var VehicleVolume = parseFloat(VrObject.volume); //20000
//     var avai_weight = 0,
//       avai_vol = 0,
//       weight_per = 0,
//       volume_per = 0;

//     this.props.sites &&
//       this.props.sites.map((site) => {
//         if (trip.depSite === site.id) {
//           wu = site.massunit;
//           vu = site.volunit;
//           distunts = site.distunit;
//           currency = site.cur;
//         }
//       });

//     if (trip.lock) {
//       for (i = 0; i < DetailObject.length; i++) {
//         var dropwei = 0.0,
//           pickupwei = 0.0,
//           dropvol = 0.0,
//           pickupvol = 0.0;
//         if (DetailObject[i].xdoctyp == 2) {
//           pickupwei = parseFloat(DetailObject[i].growei);
//           pickupvol = parseFloat(DetailObject[i].vol);
//         } else {
//           dropwei = parseFloat(DetailObject[i].growei);
//           dropvol = parseFloat(DetailObject[i].vol);
//         }
//         tdropwei = tdropwei + dropwei;
//         tpickupwei = tpickupwei + pickupwei;
//         tdropvol = tdropvol + dropvol;
//         tpickupvol = tpickupvol + pickupvol;
//       }
//     } else {
//       var selectedDocs = "";

//       if (
//         trip &&
//         trip.totalObject &&
//         trip.totalObject.selectedTripData.length > 0
//       ) {
//         selectedDocs = trip.totalObject.selectedTripData;
//       }
//       
//       for (i = 0; i < selectedDocs.length; i++) {
//         var dropwei = 0.0,
//           pickupwei = 0.0,
//           dropvol = 0.0,
//           pickupvol = 0.0;
//         if (selectedDocs[i].movtype == "PICK") {
//           pickupwei = parseFloat(selectedDocs[i].netweight);
//           pickupvol = parseFloat(selectedDocs[i].volume);
//         } else {
//           dropwei = parseFloat(selectedDocs[i].netweight);
//           dropvol = parseFloat(selectedDocs[i].volume);
//         }
//         tdropwei = tdropwei + dropwei;
//         tpickupwei = tpickupwei + pickupwei;
//         tdropvol = tdropvol + dropvol;
//         tpickupvol = tpickupvol + pickupvol;

//         
//         
//       }
//     }

//     avai_vol = VehicleVolume - tdropvol;
//     avai_weight = VehicleCapacity - tdropwei;
//     ordercount = i;
//     weight_per = parseFloat((tdropwei / VehicleCapacity) * 100);
//     weight_per = weight_per.toFixed(2);

//     volume_per = parseFloat((tdropvol / VehicleVolume) * 100);
//     volume_per = volume_per.toFixed(2);

//     var overtimecost = Math.round(trip.overtimeCost * 100) / 100;
//     // (Math.round(num * 100) / 100).toFixed(2);

//     
//     return (
//       <Card>
//         <CardBody>
//           <Row>
//             <div
//               class="col-md-12 pt-2 pb-0 pr-1 pl-1"
//               style={{ pointerEvents: "none" }}
//             >
//               <div class="middlesection">
//                 <div class="reportlist-view2">
//                   <form class="p-3 pt-1 floating-form row vehicle-formdtls">
//                     <div class="col-md-6">
//                       <h6
//                         class="mb-3"
//                         className="mb-0 text-primary"
//                         style={{ fontWeight: "bold", fontSize: "16px" }}
//                       >
//                         {this.props.t("TotalDrops")}
//                       </h6>
//                       <hr
//                         style={{
//                           backgroundColor: "rgb(102,178,255)",
//                           height: "1px",
//                         }}
//                       ></hr>
//                       <div class="row no-gutters">
//                         <div class="col-md-12 row no-gutters">
//                           <div class="col-lg-4">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("Weight")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {nullAndNanChecking(
//                                   parseFloat(tdropwei).toFixed(2),
//                                   "vrStops"
//                                 )}{" "}
//                                 {wu}
//                               </p>
//                             </div>
//                           </div>
//                           <div class="col-lg-4">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("Cap_Vehicule_Masse")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {trip.lock
//                                   ? nullAndNanChecking(
//                                       parseFloat(VehicleCapacity).toFixed(2),
//                                       "vrStops"
//                                     )
//                                   : parseFloat(trip.capacities).toFixed(2)}{" "}
//                                 {wu}{" "}
//                               </p>
//                             </div>
//                           </div>
//                           <div class="col-lg-4">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("Chargement_Masse")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {nullAndNanChecking(weight_per, "vrStops")}{" "}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div class="row no-gutters">
//                         <div class="col-md-12 row no-gutters">
//                           <div class="col-lg-4">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("Volume_livraison")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {nullAndNanChecking(tdropvol, "vrStops")} {vu}
//                               </p>
//                             </div>
//                           </div>
//                           <div class="col-lg-4">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("Cap_Vehicule_Volume")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {trip.lock ? VehicleVolume : 0} {vu}
//                               </p>
//                             </div>
//                           </div>
//                           <div class="col-lg-4">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("Chargement_Vol")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {nullAndNanChecking(volume_per, "vrStops")}{" "}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <h6
//                         class="mb-3"
//                         className="mt-3 text-primary"
//                         style={{ fontWeight: "bold", fontSize: "16px" }}
//                       >
//                         {this.props.t("TotalPickUps")}
//                       </h6>
//                       <hr
//                         style={{
//                           backgroundColor: "rgb(102,178,255)",
//                           height: "1px",
//                         }}
//                       ></hr>
//                       <div class="row no-gutters">
//                         <div class="col-md-12 row no-gutters">
//                           <div class="col-lg-4">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("PickupWeight")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {nullAndNanChecking(tpickupwei, "vrStops")} {wu}
//                               </p>
//                             </div>
//                           </div>
//                           <div class="col-lg-4">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("VehWeightAvail")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {trip.lock ? avai_weight : 0} {wu}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                         <div class="col-md-12 row no-gutters">
//                           <div class="col-lg-4">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("PickupVol")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {nullAndNanChecking(tpickupvol, "vrStops")} {vu}
//                               </p>
//                             </div>
//                           </div>
//                           <div class="col-lg-6">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("VehVolAvail")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {trip.lock ? avai_vol : 0} {vu}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div class="col-md-6">
//                       <h6
//                         class="mb-3"
//                         className="mb-0 text-primary"
//                         style={{ fontWeight: "bold", fontSize: "16px" }}
//                       >
//                         Totals
//                       </h6>
//                       <hr
//                         style={{
//                           backgroundColor: "rgb(102,178,255)",
//                           height: "1px",
//                         }}
//                       ></hr>
//                       <div class="row no-gutters">
//                         <div class="col-md-5 row no-gutters">
//                           <div class="col-lg-5 ml-2">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("TotDistance")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {trip.lock
//                                   ? parseFloat(
//                                       this.props.vrdata.totdistance
//                                     ).toFixed(2)
//                                   : nullAndNanChecking(trip.totalDistance)}{" "}
//                                 {distunts}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                         <div class="col-md-7 row no-gutters">
//                           <div class="col-lg-6">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("ActualDistance")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {trip.lock
//                                   ? parseFloat(
//                                       this.props.vrdata.totdistance
//                                     ).toFixed(2)
//                                   : nullAndNanChecking(trip.totalDistance)}{" "}
//                                 {distunts}
//                               </p>
//                             </div>
//                           </div>
//                           <div class="col-lg-5">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("DistanceCost")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {trip.lock
//                                   ? parseFloat(trip.distanceCost).toFixed(2)
//                                   : nullAndNanChecking(trip.distanceCost)}{" "}
//                                 {currency}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div class="row no-gutters">
//                         <div class="col-md-5 row no-gutters">
//                           <div class="col-lg-5 ml-2">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("TotalTime")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {trip.lock
//                                   ? parseFloat(
//                                       this.props.vrdata.tottime
//                                     ).toFixed(2)
//                                   : nullAndTime(trip.totalTime)}{" "}
//                                 Hours
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                         <div class="col-md-7 row no-gutters">
//                           <div class="col-lg-6">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("TravelTime")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {trip.lock
//                                   ? parseFloat(trip.travelTime).toFixed(2)
//                                   : nullAndNanChecking(trip.travelTime)}
//                               </p>
//                             </div>
//                           </div>
//                           <div class="col-lg-6">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("BreakTime")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               ></p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div class="row no-gutters">
//                         <div class="col-md-5 row no-gutters">
//                           <div class="col-lg-7 ml-2">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("TravelTimeCost")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {trip.lock
//                                   ? parseFloat(trip.regularCost).toFixed(2)
//                                   : trip.regularCost === "null"
//                                   ? 0
//                                   : parseFloat(
//                                       nullAndNanChecking(trip.regularCost)
//                                     ).toFixed(2)}{" "}
//                                 {currency}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                         <div class="col-md-7 row no-gutters">
//                           <div class="col-lg-6">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("OverTimeCost")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {trip.lock
//                                   ? parseFloat(overtimecost).toFixed(2)
//                                   : 0}{" "}
//                                 {currency}
//                               </p>
//                             </div>
//                           </div>
//                           <div class="col-lg-6">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("TotalCost")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {trip.lock
//                                   ? parseFloat(trip.totalCost).toFixed(2)
//                                   : nullAndNanChecking(trip.totalCost)}{" "}
//                                 {currency}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div class="row no-gutters">
//                         <div class="col-md-5 row no-gutters">
//                           <div class="col-lg-5 ml-2">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("OrderCount")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               >
//                                 {Math.round(ordercount)}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                         <div class="col-md-7 row no-gutters">
//                           <div class="col-lg-6">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("RenewalCount")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               ></p>
//                             </div>
//                           </div>
//                           <div class="col-lg-6">
//                             <div className="floating-label">
//                               <label style={{ fontSize: "16px" }}>
//                                 {this.props.t("Total_Renewal_Service_Time")}
//                               </label>{" "}
//                               <br />
//                               <p
//                                 className="mb-0 h6 text-primary"
//                                 style={{ display: "flex" }}
//                               ></p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </Row>
//         </CardBody>
//       </Card>
//     );
//   }
// }

// export default withNamespaces()(VrTotals);

import React from "react";
import { withNamespaces } from "react-i18next";
import {
  nullAndNanChecking,
  nullAndNanCheckingFloat,
  nullAndTime,
} from "../converterFunctions/converterFunctions";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  NavItem,
  NavLink,
  Nav,
  CardHeader,
  FormGroup,
} from "reactstrap";

import classnames from "classnames";

class VrTotals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "Drops", // Set the initial active tab
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tab) {
    
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
      
    }
  }

  render() {
    let currency, distunts, massunit, volunits;
    let c, d, m, v;
    var wu, vu;
    var lang = localStorage.getItem("lng");
    // 
    // 
    /*   if (lang == "en") {
            currency = "USD";
            distunts = 'Miles';
              wu = 'LB';
              vu = 'GAL'
        }
        else {
            currency = "EUR";
            distunts = 'Kms';
            wu = 'KG';
            vu = 'L';
        }
*/
    var i,
      ordercount = 0;
    var tdropwei = 0,
      tpickupwei = 0,
      tdropvol = 0,
      tpickupvol = 0;
    var VrObject = this.props.vrdata;
    var DetailObject = this.props.vedetail;

    
    var trip = this.props.tripdetails;
    var VehicleCapacity = parseFloat(VrObject.capacities);
    var VehicleVolume = parseFloat(VrObject.volume);
    var avai_weight = 0,
      avai_vol = 0,
      weight_per = 0,
      volume_per = 0;

    this.props.sites &&
      this.props.sites.length > 0 &&
      this.props.sites.map((site) => {
        if (trip.depSite === site.id) {
          wu = site.massunit;
          vu = site.volunit;
          distunts = site.distunit;
          currency = site.cur;
        }
      });

    if (trip.lock) {
      for (i = 0; i < DetailObject.length; i++) {
        var dropwei = 0,
          pickupwei = 0,
          dropvol = 0,
          pickupvol = 0;
    
        // 
        if (DetailObject[i].xdoctyp == 2 || DetailObject[i].xdoctyp == 4) {
        
          dropwei = parseFloat(DetailObject[i].growei);
          dropvol = parseFloat(DetailObject[i].vol);
        
          
        } else {
          pickupwei = parseFloat(DetailObject[i].growei);
          pickupvol = parseFloat(DetailObject[i].vol);
        
        }
        tdropwei = tdropwei + dropwei;
        tpickupwei = tpickupwei + pickupwei;
        tdropvol = tdropvol + dropvol;
        tpickupvol = tpickupvol + pickupvol;
      }
    } else {
      var selectedDocs = "";

      if (
        trip &&
        trip.totalObject &&
        trip.totalObject.selectedTripData.length > 0
      ) {
        selectedDocs = trip.totalObject.selectedTripData;
      }
      //   
      for (i = 0; i < selectedDocs.length; i++) {
        var dropwei = 0.0,
          pickupwei = 0.0,
          dropvol = 0.0,
          pickupvol = 0.0;
        if (selectedDocs[i].movtype == "PICK") {
          pickupwei = parseFloat(selectedDocs[i].netweight);
          pickupvol = parseFloat(selectedDocs[i].volume);
        } else {
          dropwei = parseFloat(selectedDocs[i].netweight);
          dropvol = parseFloat(selectedDocs[i].volume);
        }
        tdropwei = tdropwei + dropwei;
        tpickupwei = tpickupwei + pickupwei;
        tdropvol = tdropvol + dropvol;
        tpickupvol = tpickupvol + pickupvol;

        
        
      }
    }

    

    avai_vol = VehicleVolume - tdropvol;
    avai_weight = VehicleCapacity - tdropwei;
    ordercount = i;
    weight_per = parseFloat((tdropwei / VehicleCapacity) * 100);
    weight_per = weight_per.toFixed(2);

    volume_per = parseFloat((tdropvol / VehicleVolume) * 100);
    volume_per = volume_per.toFixed(2);

    var overtimecost = Math.round(trip.overtimeCost * 100) / 100;
    // (Math.round(num * 100) / 100).toFixed(2);

    // variables created for
    // this variable is created for getting actual weight
    let weight = nullAndNanChecking(parseFloat(tdropwei).toFixed(2), "vrStops");

    let vehicleMass = trip.lock
      ? nullAndNanChecking(parseFloat(VehicleCapacity).toFixed(2), "vrStops")
      : parseFloat(trip.capacities).toFixed(2);

    let veicleVolume = trip.lock ? VehicleVolume : 0;

    let loadingMass = nullAndNanChecking(weight_per, "vrStops");
    
    let pickupWeights = nullAndNanChecking(tpickupwei, "vrStops");

    let dropsVolume = nullAndNanChecking(tdropvol, "vrStops");

    let loadingVolume = nullAndNanChecking(volume_per, "vrStops");

    let pickupVolume = nullAndNanChecking(tpickupvol, "vrStops");

    let vehicleAvailableWeight = trip.lock ? parseFloat(avai_weight).toFixed(2) : 0;

    let vehicleAvailableVolume = trip.lock ? avai_vol : 0;

    let totalDistance = trip.lock
      ? parseFloat(this.props.vrdata.totdistance).toFixed(2)
      : nullAndNanChecking(trip.totalDistance, 'vrStops');

    let totalTime = trip.lock
      ? parseFloat(this.props.vrdata.tottime).toFixed(2)
      : nullAndTime(trip.totalTime);

    let travelTimeCost = 
       nullAndNanChecking(parseFloat(trip.regularCost).toFixed(2), 'vrStops')
   

    let travelTime = 
       nullAndNanChecking(parseFloat(trip.travelTime).toFixed(2), 'vrStops')
     

    let overTimeCost = 
       nullAndNanChecking(parseFloat(trip.overtimeCost).toFixed(2), 'vrStops')
     

    let distanceCost = 
       nullAndNanChecking(parseFloat(trip.distanceCost).toFixed(2),'vrStops')
    

    let totalCost = 
       nullAndNanChecking(parseFloat(trip.totalCost).toFixed(2), 'vrStops')
     
    return (
      <Card>
        <CardBody>
          <div
            class="col-md-12 pt-2 pb-0 pr-1 pl-1"
            style={{ pointerEvents: "none" }}
          >
            <div class="middlesection">
              <div class="reportlist-view2">
                <form class="p-3 pt-1 floating-form row vehicle-formdtls">
                  <div class="col-md-12 ">
                    <h6 class="mb-3" style={{ fontWeight: "bold" }}>
                      {this.props.t("TotalDrops")}
                    </h6>
                    <hr
                      style={{
                        backgroundColor: "rgb(102,178,255)",
                        height: "1px",
                      }}
                    ></hr>
                    {/* commented code for total drops with dynamic values */}

                    {/* <div class="row no-gutters bg-primary">
                  <div class="col-md-12 row no-gutters">
                    <div class="col-lg-4">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("Weight")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {nullAndNanChecking(
                            parseFloat(tdropwei).toFixed(2),
                            "vrStops"
                          )}{" "}
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          >
                            {wu}
                          </small>
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("Cap_Vehicule_Masse")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {trip.lock
                            ? nullAndNanChecking(
                                parseFloat(VehicleCapacity).toFixed(2),
                                "vrStops"
                              )
                            : parseFloat(trip.capacities).toFixed(2)}{" "}
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          >
                            {wu}
                          </small>
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("Chargement_Masse")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {nullAndNanChecking(weight_per, "vrStops")}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row no-gutters bg-danger">
                  <div class="col-md-12 row no-gutters">
                    <div class="col-lg-4">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("Volume_livraison")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {nullAndNanChecking(tdropvol, "vrStops")}{" "}
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          >
                            {vu}
                          </small>
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("Cap_Vehicule_Volume")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {trip.lock ? VehicleVolume : 0}{" "}
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          >
                            {vu}
                          </small>
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("Chargement_Vol")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {nullAndNanChecking(volume_per, "vrStops")}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}

                    {/* this is row and col format with input disabled format */}

                    <Row className="mt-2">
                      <Col className="">
                        <FormGroup row>
                          <Label sm="4">Weight</Label>
                          <Col sm="8">
                            <Input
                              // value={props.data.VehicleNumber}
                              // value= {nullAndNanChecking(
                              //   parseFloat(tdropwei).toFixed(2),
                              //   "vrStops"
                              // )}
                              value={weight + " " + wu}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm="4">Drops Volume</Label>
                          <Col sm="8">
                            <Input
                              // value={props.data.Class}
                              // value={"0 L"}
                              // value={}
                              value={dropsVolume + " " + vu}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup row>
                          <Label md="4">Vehicle Mass</Label>
                          <Col md="8">
                            <Input
                              // value={props.data.ArrivalSite}
                              value={vehicleMass + " " + wu}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label md="4">Vehicle Volume</Label>
                          <Col md="8">
                            <Input
                              // value={props.data.DepartureSite}
                              // value={"1400 L"}
                              value={veicleVolume + " " + vu}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                      </Col>

                      <Col>
                        <FormGroup row>
                          <Label md="4">Loading Mass(%)</Label>
                          <Col md="8">
                            <Input
                              // value={props.data.ArrivalSite}
                              // value={"57.60"}
                              value={loadingMass}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label md="4">Loading Vol(%)</Label>
                          <Col md="8">
                            <Input
                              // value={props.data.DepartureSite}
                              value={loadingVolume}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>

                    <h6 class="mb-3" style={{ fontWeight: "bold" }}>
                      {this.props.t("TotalPickUps")}
                    </h6>
                    <hr
                      style={{
                        backgroundColor: "rgb(102,178,255)",
                        height: "1px",
                      }}
                    ></hr>

                    {/* This code is for total pickups with dynamic values */}
                    {/* <div class="row no-gutters">
                  <div class="col-md-12 row no-gutters">
                    <div class="col-lg-4">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("PickupWeight")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {nullAndNanChecking(tpickupwei, "vrStops")}{" "}
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          >
                            {wu}
                          </small>
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("VehWeightAvail")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {trip.lock ? avai_weight : 0}{" "}
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          >
                            {wu}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 row no-gutters">
                    <div class="col-lg-4">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("PickupVol")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {nullAndNanChecking(tpickupvol, "vrStops")}{" "}
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          >
                            {vu}
                          </small>
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("VehVolAvail")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {trip.lock ? avai_vol : 0}{" "}
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          >
                            {vu}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}

                    {/* This is new code written by tejas for total pickups */}

                    <Row className="mt-2">
                      <Col>
                        <FormGroup row>
                          <Label sm="4">Pickup Weight</Label>
                          <Col sm="8">
                            <Input
                              // value={props.data.VehicleNumber}
                              // value={"0 KG"}
                              value={pickupWeights + " " + wu}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm="4">Pickup Volume</Label>
                          <Col sm="8">
                            <Input
                              // value={props.data.Class}
                              // value={"0 L"}
                              value={pickupVolume + " " + vu}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup row>
                          <Label md="4">Vehicle Avail Weight</Label>
                          <Col md="8">
                            <Input
                              // value={"10600 KG"}
                              value={vehicleAvailableWeight + " " + wu}
                              // value={props.data.ArrivalSite}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label md="4">Vehicle Avail Volume</Label>
                          <Col md="8">
                            <Input
                              // value={"1400 L"}
                              value={vehicleAvailableVolume + " " + vu}
                              // value={props.data.DepartureSite}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col></Col>
                    </Row>
                  </div>

                  <div class="col-md-12">
                    <h6 class="mb-3" style={{ fontWeight: "bold" }}>
                      Totals
                    </h6>
                    <hr
                      style={{
                        backgroundColor: "rgb(102,178,255)",
                        height: "1px",
                      }}
                    ></hr>

                    {/* This code is for totals with dynamic values */}
                    {/* <div class="row no-gutters">
                  <div class="col-md-5 row no-gutters">
                    <div class="col-lg-5 ml-2">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("TotDistance")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {trip.lock
                            ? parseFloat(this.props.vrdata.totdistance).toFixed(
                                2
                              )
                            : nullAndNanChecking(trip.totalDistance)}{" "}
                          <span style={{ marginTop: "0px", marginLeft: "5px" }}>
                            {distunts}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-7 row no-gutters">
                    <div class="col-lg-6">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("ActualDistance")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {" "}
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          ></small>
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-5">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("DistanceCost")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {trip.lock
                            ? parseFloat(trip.distanceCost).toFixed(2)
                            : nullAndNanChecking(trip.distanceCost)}{" "}
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          >
                            {currency}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row no-gutters">
                  <div class="col-md-5 row no-gutters">
                    <div class="col-lg-5 ml-2">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("TotalTime")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {trip.lock
                            ? parseFloat(this.props.vrdata.tottime).toFixed(2)
                            : nullAndTime(trip.totalTime)}{" "}
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          >
                            Hours
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-7 row no-gutters">
                    <div class="col-lg-6">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("TravelTime")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {trip.lock
                            ? parseFloat(trip.travelTime).toFixed(2)
                            : nullAndNanChecking(trip.travelTime)}
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("BreakTime")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          >
                            Hours
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row no-gutters">
                  <div class="col-md-5 row no-gutters">
                    <div class="col-lg-7 ml-2">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("TravelTimeCost")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {trip.lock
                            ? parseFloat(trip.regularCost).toFixed(2)
                            : nullAndNanChecking(trip.regularCost)}
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          >
                            {currency}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-7 row no-gutters">
                    <div class="col-lg-6">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("OverTimeCost")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {trip.lock ? parseFloat(overtimecost).toFixed(2) : 0}
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          >
                            {currency}
                          </small>
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("TotalCost")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {trip.lock
                            ? parseFloat(trip.totalCost).toFixed(2)
                            : nullAndNanChecking(trip.totalCost)}
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          >
                            {currency}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row no-gutters">
                  <div class="col-md-5 row no-gutters">
                    <div class="col-lg-5 ml-2">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("OrderCount")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          {Math.round(ordercount)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-7 row no-gutters">
                    <div class="col-lg-6">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("RenewalCount")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}></p>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div className="floating-label">
                        <label style={{ fontSize: "13px" }}>
                          {this.props.t("Total_Renewal_Service_Time")}
                        </label>{" "}
                        <br />
                        <p style={{ display: "flex" }}>
                          <small
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                          >
                            Hours
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}

                    {/* This is new code  written by tejas for totals */}

                    <Row className="mt-2">
                      <Col>
                        <FormGroup row>
                          <Label sm="4">Total Distance</Label>
                          <Col sm="8">
                            <Input
                              // value={props.data.VehicleNumber}
                              // value={"77.61 Kilometers"}
                              value={totalDistance + " " + distunts}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm="4">Total Time</Label>
                          <Col sm="8">
                            <Input
                              // value={"3.16 Hours"}
                              value={totalTime + " " + "Hours"}
                              // value={props.data.Class}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm="4">Travel Time Cost</Label>
                          <Col sm="8">
                            <Input
                              // value={props.data.Class}
                              // value={"7.95 GBP"}
                              value={travelTimeCost + " " + currency}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col>
                        {/* <FormGroup row>
                          <Label md="4">Actual Distance</Label>
                          <Col md="8">
                            <Input
                              // value={props.data.ArrivalSite}
                              // value={"-"}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup> */}
                        <FormGroup row>
                          <Label md="4">Travel Time</Label>
                          <Col md="8">
                            <Input
                              // value={props.data.DepartureSite}
                              // value={1.0}
                              value={travelTime + " " + "Hours"}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label md="4">OverTimeCost</Label>
                          <Col md="8">
                            <Input
                              // value={"0.00 DGP"}
                              value={overTimeCost + " " + currency}
                              // value={props.data.DepartureSite}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                      </Col>

                      <Col>
                        <FormGroup row>
                          <Label md="4">Order Count</Label>
                          <Col md="8">
                            <Input
                              // value={props.data.ArrivalSite}

                              // value={3}
                              value={Math.round(ordercount)}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label md="4">Distance Cost</Label>
                          <Col md="8">
                            <Input
                              // value={"117.00 GBP"}
                              value={distanceCost + " " + currency}
                              // value={props.data.DepartureSite}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Label md="4">Total Cost</Label>
                          <Col md="8">
                            <Input
                              // value={"174.95 GBP"}
                              value={totalCost + " " + currency}
                              // value={props.data.DepartureSite}
                              style={{ fontWeight: "bold" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default withNamespaces()(VrTotals);
