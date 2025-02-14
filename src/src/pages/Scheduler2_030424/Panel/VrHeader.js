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
                     case 1: return ("Route Generated");
                     case 2: return ("Submitted to Technician");
                     case 3: return ("In Progress");
                     case 4: return ("On the Way");
                     case 5: return ("Skipped");
                     case 6: return ("Delivered");
                     case 7: return ("Cancelled");
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

      validateTrip = (code, type) => {

          this.props.validateonly(code)
      }



  render(){
     var trip = this.props.tripdetails;
          const op_status = this.props.vrdata.optimsta;
          const dis_status = this.props.vrdata.dispstat;
          const TExecTime = this.props.vrdata.heuexec;
          const TExecutionDate = moment(this.props.vrdata.credat).format('YYYY-MM-DD');
          const ScheduledDate = moment(this.props.vrdata.xsetdd).format('YYYY-MM-DD');
          const Sch_Return_Date = moment(this.props.vrdata.xsetrd).format('YYYY-MM-DD');
          const ExecutionTime = moment(this.props.vrdata.heuexec).format('hh:mm');
          const Sch_DepartureTime = this.props.vrdata.xsetdt;
          const Sch_ReturnTime = this.props.vrdata.xsetrt;
          var Act_DepartureTime = this.props.vrdata.xaetdt;
          var Act_ReturnTime = this.props.vrdata.xaetrt;
          const dummyDate = moment(this.props.vrdata.xaetdd).format('YYYY-MM-DD')
          const TempDate = moment(this.props.vrdata.xaetrd).format('YYYY-MM-DD')
          const Temptype = this.props.vrdata.xvry;
          const vr_url = "https://tmsx3.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSDEVN/$sessions?f=GESX10AFSM/2//M/" + this.props.vrdata.xnumpc;
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

          let Actual_Dep_Date, ReturnDate, vrtype, ExecutionDate,execTime, Actual_Retn_Date;

          if (TExecutionDate == '1899-12-31') {
              ExecutionDate = '';
          }
          else {
              ExecutionDate = TExecutionDate;
          }
if (TExecTime == null) {
              execTime = '00:00';
          }
          else {
              execTime = this.props.loadvehstck.vcrnum;
          }

          //scheduled return date
          if (dummyDate == '1752-12-31' || dummyDate == '1899-12-31' || dummyDate == '1900-01-01' || dummyDate == '1753-01-01') {
              Actual_Dep_Date = '';
          }
          else {
              Actual_Dep_Date = dummyDate;
          }
          if (TempDate == '1752-12-31' || TempDate == '1899-12-31' || TempDate == '1900-01-01' || TempDate == '1753-01-01') {
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
                               {this.props.t('Field Service Management')}
                             </CardTitle>
                           </Col>
                           <Col md="6" className="text-right">

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
                                <p className="mb-1">{this.props.t('Status')}</p>
                                <p className="mb-0 h6 text-primary">{trip.lock ? this.getlvsstatus(this.props.vrdata.routeStatus) : ''}</p>
                                <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('Technician ID')}</p>
                             <p className="mb-0 h5 text-success"><b>{trip.lock ? this.props.vrdata.techId : trip.techId}</b></p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('Technician')}</p>
                             <p className="mb-0 h5 text-success"><b>{this.props.vrdata.techName}</b></p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('CreatedDate')}</p>
                             <p className="mb-0 h6 text-primary">{trip.lock ? ExecutionDate : ''}</p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('CreatedBy')}</p>
                             <p className="mb-0 h6 text-primary">{this.props.vrdata.byUser}</p>
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
                                 <p class='mb-0 h5 text-success'><b>{trip.lock ? ScheduledDate : ''}</b></p>
                                 <hr className="mt-1" />
                               </Col>
                               <Col md="6" lg="3">
                                 <p className="mb-1">{this.props.t('DepartureTime')}</p>
                                 <p class='mb-0 h5 text-success'><b>{trip.lock ? Sch_DepartureTime : ''}</b></p>
                                 <hr className="mt-1" />
                               </Col>
                               <Col md="6" lg="3">
                                 <p className="mb-1">{this.props.t('ReturnDate')}</p>
                                 <p class='mb-0 h5 text-warning'><b>{trip.lock ? Sch_Return_Date : ''}</b></p>
                                 <hr className="mt-1" />
                               </Col>
                               <Col md="6" lg="3">
                                 <p className="mb-1">{this.props.t('ReturnTime')}</p>
                                 <p class='mb-0 h5 text-warning'><b>{trip.lock ? Sch_ReturnTime : ''}</b></p>
                                 <hr className="mt-1" />
                               </Col>
                             </Row>
                             <CardTitle className="h4 text-primary">
                               {this.props.t('Actual')}
                             </CardTitle>
                             <hr className="my-2" />
                             <Row className="mt-3">
                               <Col md="6" lg="3">
                                 <p className="mb-1">{this.props.t('DepartureDate')}</p>
                                 <p class='mb-0 h5 text-success'><b>{trip.lock ? Actual_Dep_Date : ''}</b></p>
                                 <hr className="mt-1" />
                               </Col>
                               <Col md="6" lg="3">
                                 <p className="mb-1">{this.props.t('DepartureTime')}</p>
                                 <p class='mb-0 h5 text-success'><b>{trip.lock ? Act_DepartureTime : ''}</b></p>
                                 <hr className="mt-1" />
                               </Col>
                               <Col md="6" lg="3">
                                 <p className="mb-1">{this.props.t('ReturnDate')}</p>
                                 <p class='mb-0 h5 text-warning'><b>{trip.lock ? Actual_Retn_Date : ''}</b></p>
                                 <hr className="mt-1" />
                               </Col>
                               <Col md="6" lg="3">
                                 <p className="mb-1">{this.props.t('ReturnTime')}</p>
                                 <p class='mb-0 h5 text-warning'><b>{trip.lock ? Act_ReturnTime : ''}</b></p>
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