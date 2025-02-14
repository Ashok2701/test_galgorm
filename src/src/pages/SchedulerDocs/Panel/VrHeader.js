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
import moment from 'moment';
import { convertHrToSec, splitTime, nullAndNanChecking } from '../converterFunctions/converterFunctions';
import { withNamespaces } from 'react-i18next';
import classnames from "classnames";


class VrHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInfoShow: false,
      speciality: '',

    };
  }
    getlvsstatus = (x) => {
          switch (x) {
                     case 1: return ("To Load");
                     case 2: return ("To Load");
                     case 3: return ("Loaded");
                     case 4: return ("Confirmed");
                     case 5: return ("Trip_Completed");
                     case 6: return ("Unloading");
                     case 7: return ("Returned");
                     case 8: return ("ALL");
                     default: return ("ToLoad");
                 }
      }

      gettimeformat = (xtime) => {
          var temptime = xtime;
          var strLength = temptime.length;
          if (strLength == 0 || strLength == 1) {
              return "";
          }
          else if (strLength == 4) {
              return splitTime(temptime);
          }
          return temptime;
      }

      validateTrip = (i, type) => {
          console.log("inside valdiateTRip from header");
          this.props.validateonly(i, type)
      }



  render(){
     var trip = this.props.tripdetails;
          const op_status = this.props.vrdata.optimsta;
          console.log("op status =",op_status);
          const dis_status = this.props.vrdata.dispstat;
          console.log("dis_status =",dis_status);
          const TExecutionDate = moment(this.props.vrdata.datexec).format('YYYY-MM-DD');
          const ScheduledDate = moment(this.props.vrdata.datliv).format('YYYY-MM-DD');
          const Sch_Return_Date = moment(this.props.vrdata.datarr).format('YYYY-MM-DD');
          const ExecutionTime = moment(this.props.vrdata.heuexec).format('hh:mm');
          const Sch_DepartureTime = this.props.vrdata.heudep;
          const Sch_ReturnTime = this.props.vrdata.heuarr;
          var Act_DepartureTime = this.props.vrdata.aheudep;
          var Act_ReturnTime = this.props.vrdata.aheuarr;
          const dummyDate = moment(this.props.vrdata.adatliv).format('YYYY-MM-DD')
          const TempDate = moment(this.props.vrdata.adatarr).format('YYYY-MM-DD')
          const Temptype = this.props.vrdata.xvry;
          const vr_url = "https://tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/DEMOTMSFR/$sessions?f=GESXX10CPLC/2//M/" + this.props.vrdata.xnumpc;
          const loadvehstock_url = "https://tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/DEMOTMSFR/$sessions?f=GESXX10CS/2//M/" + this.props.loadvehstck.vcrnum;
          let lvs_number = "";
          if (this.props.loadvehstck.vcrnum == null) {
              lvs_number = '';
          }
          else {
              lvs_number = this.props.loadvehstck.vcrnum;
          }
          if (Act_DepartureTime == "" || Act_DepartureTime == 0 || Act_DepartureTime == " ") {
              Act_DepartureTime = "";
          }
          else {
              Act_DepartureTime = splitTime(Act_DepartureTime);
          }
          if (Act_ReturnTime == "" || Act_ReturnTime == 0 || Act_ReturnTime == " ") {
              Act_ReturnTime = '';
          }
          else {
              Act_ReturnTime = splitTime(Act_ReturnTime);
          }

          let Actual_Dep_Date, ReturnDate, vrtype, ExecutionDate, Actual_Retn_Date;

          if (TExecutionDate == '1899-12-31') {
              ExecutionDate = '';
          }
          else {
              ExecutionDate = TExecutionDate;
          }
          //scheduled return date
          if (dummyDate == '1752-12-31' || dummyDate == '1899-12-31' || dummyDate == '1900-01-01' || dummyDate == '1753-01-01') {
              Actual_Dep_Date = '';
          }
          else {
              Actual_Dep_Date = dummyDate;
          }
          if (TempDate == '1752-12-31' || TempDate == '1899-12-31' || TempDate == '1900-01-01' || dummyDate == '1753-01-01') {
              Actual_Retn_Date = '';
          }
          else {
              Actual_Retn_Date = TempDate;
          }

          switch (Temptype) {
              case 1: vrtype = 'Scheduled Sales';
              case 2: vrtype = 'Spot Sales';
              case 3: vrtype = 'Scheduled & Spot Sales';
              default: vrtype = 'Scheduled';
          }



     return(
     <Col xs="12">
                     <Card>
                       <CardBody>
                         <Row>
                           <Col md="6" className="d-flex align-items-center">
                             <CardTitle className="h4 mb-0 text-primary">
                               {this.props.t('RouteMgmt')}
                             </CardTitle>
                           </Col>
                           <Col md="6" className="text-right">
                            {trip.lock ?
                             <div style={{ pointerEvents: 'auto', float: 'right', marginRight: '15px', marginTop: '10px' }}>
                                                        {this.props.selectedVrValidated ?
                                                            <label style={{ 'backgroundColor': 'green', 'color': 'white', 'textAlign': 'center', 'fontSize': '14pt', 'height': '30px', 'width': '150px' }}>VALIDATED</label> :
                                                            <button color="primary"
                                                                onClick={() => this.validateTrip(this.props.selectedVrIndex, "vrHeader")}>VALIDATE</button>
                                                        }
                                                    </div>
                                                    :<></>}
                           </Col>

                         </Row>
                         <hr className="my-2" />
                         <Row className="my-3">
                           <Col lg="3" xl="2"
                           >
                             <p className="mb-1">{this.props.t('RouteNum')}</p>
                             <p className="h6 mb-0 text-primary">
                                <a target="_blank" href={vr_url}>{trip.lock ? this.props.vrdata.xnumpc : trip.itemCode} </a>
                             </p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                               <p className="mb-1">{this.props.t('VehLoadStockNumber')}</p>
                               <p className="h6 mb-0 text-primary">
                               <a target="_blank" href={loadvehstock_url}>{trip.lock ? lvs_number : ''} </a>
                               </p>
                               <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                                <p className="mb-1">{this.props.t('Status')}</p>
                                <p className="mb-0 h6">{trip.lock ? this.getlvsstatus(this.props.loadvehstck.xloadflg) : ''}</p>
                                <hr className="mt-1" />
                           </Col>

                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('DepartureSite')}</p>
                             <p className="mb-0 h6">{trip.lock ? this.props.vrdata.fcy : trip.depSite}</p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('ArrivalSite')}</p>
                             <p className="mb-0 h6">{trip.lock ? this.props.vrdata.xdesfcy : trip.arrSite}</p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('Carrier')}</p>
                             <p className="mb-0 h6">{trip.lock ? this.props.vrdata.bptnum : trip && trip.vehicleObject && trip.vehicleObject.bptnum && trip.vehicleObject.bptnum}</p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('Trailer')}</p>
                             <p className="mb-0 h6">{trip.lock ? this.props.vrdata.trailer : trip && trip.trialerObject && trip.trialerObject.trailer && trip.trialerObject.trailer}</p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('VehClass')}</p>
                             <p className="mb-0 h6">{trip.lock ? this.props.vrdata.vehclass : trip && trip.vehicleObject && trip.vehicleObject.className && trip.vehicleObject.className}</p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('Vehicle')}</p>
                             <p className="mb-0 h6">{trip.lock ? this.props.vrdata.codeyve : trip && trip.vehicleObject && trip.vehicleObject.codeyve && trip.vehicleObject.codeyve}</p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('RouteType')}</p>
                             <p className="mb-0 h6">{trip.lock ? vrtype : ''}</p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('DriverId')}</p>
                             <p className="mb-0 h6">{trip.lock ? this.props.vrdata.driverid : trip.driverId}</p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('Driver')}</p>
                             <p className="mb-0 h6">{trip.driverName}</p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('CreatedDate')}</p>
                             <p className="mb-0 h6">{trip.lock ? ExecutionDate : ''}</p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('CreatedTime')}</p>
                             <p className="mb-0 h6">{trip.lock ? this.props.vrdata.heuexec : trip.heuexec}</p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('Trip')}</p>
                             <p className="mb-0 h6">{trip.lock ? this.props.vrdata.xroutnbr : trip.trips}</p>
                             <hr className="mt-1" />
                           </Col>

                         </Row>
                         <Row>
                           <Col lg="6">
                             <CardTitle className="h4 text-primary">
                               Planning
                             </CardTitle>
                             <hr className="my-2" />
                             <Row className="mt-3">
                               <Col md="6" lg="3">
                                 <p className="mb-1">{this.props.t('DepartureDate')}</p>
                                 <p className="mb-0 h6">{trip.lock ? ScheduledDate : ''}</p>
                                 <hr className="mt-1" />
                               </Col>
                               <Col md="6" lg="3">
                                 <p className="mb-1">{this.props.t('DepartureTime')}</p>
                                 <p className="mb-0 h6">{trip.lock ? Sch_DepartureTime : ''}</p>
                                 <hr className="mt-1" />
                               </Col>
                               <Col md="6" lg="3">
                                 <p className="mb-1">{this.props.t('ReturnDate')}</p>
                                 <p className="mb-0 h6">{trip.lock ? Sch_Return_Date : ''}</p>
                                 <hr className="mt-1" />
                               </Col>
                               <Col md="6" lg="3">
                                 <p className="mb-1">{this.props.t('ReturnTime')}</p>
                                 <p className="mb-0 h6">{trip.lock ? Sch_ReturnTime : ''}</p>
                                 <hr className="mt-1" />
                               </Col>
                             </Row>
                             <CardTitle className="h4 text-primary">
                               Actual
                             </CardTitle>
                             <hr className="my-2" />
                             <Row className="mt-3">
                               <Col md="6" lg="3">
                                 <p className="mb-1">{this.props.t('DepartureDate')}</p>
                                 <p className="mb-0 h6">{trip.lock ? Actual_Dep_Date : ''}</p>
                                 <hr className="mt-1" />
                               </Col>
                               <Col md="6" lg="3">
                                 <p className="mb-1">{this.props.t('DepartureTime')}</p>
                                 <p className="mb-0 h6">{trip.lock ? Act_DepartureTime : ''}</p>
                                 <hr className="mt-1" />
                               </Col>
                               <Col md="6" lg="3">
                                 <p className="mb-1">{this.props.t('ReturnDate')}</p>
                                 <p className="mb-0 h6">{trip.lock ? Actual_Retn_Date : ''}</p>
                                 <hr className="mt-1" />
                               </Col>
                               <Col md="6" lg="3">
                                 <p className="mb-1">{this.props.t('ReturnTime')}</p>
                                 <p className="mb-0 h6">{trip.lock ? Act_ReturnTime : ''}</p>
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

export default withNamespaces()(VrHeader);