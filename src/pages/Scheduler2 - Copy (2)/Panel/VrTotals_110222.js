import React, { Component } from "react";
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
} from "reactstrap";
import { withNamespaces } from 'react-i18next';
import { nullAndNanChecking } from '../converterFunctions/converterFunctions';

import classnames from "classnames";


class VrTotals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInfoShow: false,
      speciality: '',

    };
  }

  render(){

        let currency, distunts, massunit, volunits;
        var wu, vu;
        var lang = "en";
        if (lang == "en") {
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

        var i, ordercount = 0;
        var tdropwei = 0, tpickupwei = 0, tdropvol = 0, tpickupvol = 0;
        var VrObject = this.props.vrdata;
        var DetailObject = this.props.vedetail;
        var trip = this.props.tripdetails;
        var VehicleCapacity = parseFloat(VrObject.capacities);
        var VehicleVolume = parseFloat(VrObject.volume);
        var avai_weight = 0, avai_vol = 0, weight_per = 0, volume_per = 0;

        for (i = 0; i < DetailObject.length; i++) {
            var dropwei = 0.00, pickupwei = 0.00, dropvol = 0.00, pickupvol = 0.00;
            if (DetailObject[i].xdoctyp == 2) {
                pickupwei = parseFloat(DetailObject[i].growei);
                pickupvol = parseFloat(DetailObject[i].vol);
            }
            else {
                dropwei = parseFloat(DetailObject[i].growei);
                dropvol = parseFloat(DetailObject[i].vol);
            }
            tdropwei = tdropwei + dropwei;
            tpickupwei = tpickupwei + pickupwei;
            tdropvol = tdropvol + dropvol;
            tpickupvol = tpickupvol + pickupvol;
        }

        avai_vol = VehicleVolume - tdropvol;
        avai_weight = VehicleCapacity - tdropwei;
        ordercount = i;
        weight_per = parseFloat((tdropwei / VehicleCapacity) * 100);
        weight_per = (weight_per).toFixed(2);

        volume_per = parseFloat((tdropvol / VehicleVolume) * 100);
        volume_per = (volume_per).toFixed(2);

        var overtimecost = Math.round(trip.overtimeCost * 100) / 100;
        // (Math.round(num * 100) / 100).toFixed(2);



     return(
   <Col xs="12">
                   <Card>
                     <CardBody>
                       <Row>
                         <Col lg="6">
                           <CardTitle className="h4 text-primary">
                             {this.props.t('TotalDrops')}
                           </CardTitle>
                           <hr className="my-2" />
                           <Row>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('Weight')}</p>
                               <p className="h6 mb-0">{nullAndNanChecking(parseFloat(tdropwei).toFixed(2), 'vrStops')} <small style={{ marginTop: '5px', marginLeft: '5px' }}>{wu}</small></p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('Cap_Vehicule_Masse')}</p>
                               <p className="h6 mb-0">{trip.lock ? parseFloat(VehicleCapacity).toFixed(2) : parseFloat(trip.capacities).toFixed(2)} <small style={{ marginTop: '5px', marginLeft: '5px' }}>{wu}</small></p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('Chargement_Masse')}</p>
                               <p className="h6 mb-0">{nullAndNanChecking(weight_per, 'vrStops') }</p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('Volume_livraison')}</p>
                               <p className="h6 mb-0">{nullAndNanChecking(tdropvol, 'vrStops')} <small style={{ marginTop: '5px', marginLeft: '5px' }}>{vu}</small></p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('Cap_Vehicule_Volume')}</p>
                               <p className="h6 mb-0">{trip.lock ? VehicleVolume : 0} <small style={{ marginTop: '5px', marginLeft: '5px' }}>{vu}</small></p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1"> {this.props.t('Chargement_Vol')}</p>
                               <p className="h6 mb-0">{nullAndNanChecking(volume_per, 'vrStops')}</p>
                               <hr className="mt-1" />
                             </Col>
                           </Row>
                           <CardTitle className="h4 text-primary mt-3">
                            {this.props.t('TotalPickUps')}
                           </CardTitle>
                           <hr className="my-2" />
                           <Row>
                             <Col lg="6">
                               <p className="mb-1"> {this.props.t('PickupWeight')}</p>
                               <p className="h6 mb-0">{nullAndNanChecking(tpickupwei, 'vrStops')} <small style={{ marginTop: '5px', marginLeft: '5px' }}>{wu}</small></p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="6">
                               <p className="mb-1">
                                {this.props.t('VehWeightAvail')}
                               </p>
                               <p className="h6 mb-0">{trip.lock ? avai_weight : 0} <small style={{ marginTop: '5px', marginLeft: '5px' }}>{wu}</small></p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="6">
                               <p className="mb-1">{this.props.t('PickupVol')}</p>
                               <p className="h6 mb-0">{nullAndNanChecking(tpickupvol, 'vrStops')} <small style={{ marginTop: '5px', marginLeft: '5px' }}>{vu}</small></p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="6">
                               <p className="mb-1">{this.props.t('VehVolAvail')}</p>
                               <p className="h6 mb-0">{trip.lock ? avai_vol : 0} <small style={{ marginTop: '5px', marginLeft: '5px' }}>{vu}</small></p>
                               <hr className="mt-1" />
                             </Col>
                           </Row>
                         </Col>
                         <Col lg="6">
                           <CardTitle className="h4 text-primary">
                             Totals
                           </CardTitle>
                           <hr className="my-2" />
                           <Row>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('TotDistance')}</p>
                               <p className="h6 mb-0">{trip.lock ? parseFloat(this.props.vrdata.totdistance).toFixed(2) : nullAndNanChecking(trip.totalDistance)} <small style={{ marginTop: '5px', marginLeft: '5px' }}>{distunts}</small></p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('ActualDistance')}</p>
                               <p className="h6 mb-0"></p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('DistanceCost')}</p>
                               <p className="h6 mb-0">{trip.lock ?   parseFloat(trip.distanceCost).toFixed(2) : nullAndNanChecking(trip.distanceCost)} <small style={{ marginTop: '5px', marginLeft: '5px' }}>{currency}</small></p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('TotalTime')}</p>
                               <p className="h6 mb-0">{trip.lock ? parseFloat(this.props.vrdata.tottime).toFixed(2) : nullAndNanChecking(trip.totalTime)}</p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('TravelTime')}</p>
                               <p className="h6 mb-0">{trip.lock ? parseFloat(trip.travelTime).toFixed(2) : nullAndNanChecking(trip.travelTime)}</p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('BreakTime')}</p>
                               <p className="h6 mb-0">-</p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('TravelTimeCost')}</p>
                               <p className="h6 mb-0">{trip.lock ?   parseFloat(trip.regularCost).toFixed(2) : nullAndNanChecking(trip.regularCost)}<small style={{ marginTop: '5px', marginLeft: '5px' }}>{currency}</small></p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('OverTimeCost')}</p>
                               <p className="h6 mb-0">{trip.lock ?  parseFloat(overtimecost).toFixed(2) : 0 }<small style={{ marginTop: '5px', marginLeft: '5px' }}>{currency}</small></p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('TotalCost')}</p>
                               <p className="h6 mb-0">{trip.lock ? parseFloat(trip.totalCost).toFixed(2) : nullAndNanChecking(trip.totalCost)}<small style={{ marginTop: '5px', marginLeft: '5px' }}>{currency}</small></p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('OrderCount')}</p>
                               <p className="h6 mb-0">{Math.round(ordercount)}</p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('RenewalCount')}</p>
                               <p className="h6 mb-0">-</p>
                               <hr className="mt-1" />
                             </Col>
                             <Col lg="4">
                               <p className="mb-1">{this.props.t('Total_Renewal_Service_Time')}</p>
                               <p className="h6 mb-0">-</p>
                               <hr className="mt-1" />
                             </Col>

                           </Row>
                         </Col>
                       </Row>
                     </CardBody>
                   </Card>
                 </Col>
     );
  }

}

export default withNamespaces()(VrTotals);