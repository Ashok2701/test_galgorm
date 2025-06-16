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
import mockData from './VRMockData.json';
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
                     case '1': return ("RailCar CheckIn");
                     case '2': return ("RailCar ToLoad");
                     case '3': return ("RailCar Loaded");
                     case '4': return ("RailCar Departed");
                     case '5': return ("RailCar Arrived");
                     case '6': return ("RailCar Emptied");
                     case '7': return ("RailCar CheckedOut");
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
          

          this.props.validateonly(i, type)
      }

      railCarStatus_Update = (code, status) => {

            this.props.railcarStatus_Change(code,status);
      }

      switchView = (routingCode,status) => {

          switch(status)
          {
            case "3":   return(
            <>
            <div className="h4 ml-4">{this.props.t('Next Status')}</div>
            <div style={{ pointerEvents: 'auto', float: 'right', marginRight: '1px', marginTop: '10px' }}>

                                                                                           <Button color="danger"  type="button" size="lg" className="waves-effect waves-light mr-1"
                                                                                               onClick={() => this.railCarStatus_Update(routingCode,status)}>RAILCAR DEPARTURE</Button>

                                                                                   </div></>);
            case "4":   return (
            <>
            <div className="h4 ml-4">{this.props.t('Next Status')}</div>
            <div style={{ pointerEvents: 'auto', float: 'right', marginRight: '1px', marginTop: '10px' }}>

                                                                                            <Button color="warning" type="button" size="lg" className="waves-effect waves-light mr-1"
                                                                                                onClick={() => this.railCarStatus_Update(routingCode,status)}>RAILCAR ARRIVED</Button>

                                                                                    </div></>);
            case "5":   return (<>
            <div className="h4 ml-4">{this.props.t('Next Status')}</div>
            <div style={{ pointerEvents: 'auto', float: 'right', marginRight: '1px', marginTop: '10px' }}>

                                                                                            <Button color="success" type="button" size="lg" className="waves-effect waves-light mr-1"
                                                                                                onClick={() => this.railCarStatus_Update(routingCode,status)}>RAILCAR EMPTIED</Button>

                                                                                    </div></>);

          }
        }



  render(){
     var trip = this.props.tripdetails;
     
          const op_status = this.props.vrdata.optimsta;
          
          const dis_status = mockData.dispstat;
          
          const TExecutionDate = moment(trip.credattim).format('YYYY-MM-DD');
           const xExecutionDate = moment(this.props.vrdata.credattim).format('YYYY-MM-DD');
          const ScheduledDate = moment(trip.datliv).format('YYYY-MM-DD');
          const Sch_Return_Date = moment(mockData.datarr).format('YYYY-MM-DD');
          const ExecutionTime = moment(mockData.heuexec).format('hh:mm');
          const Sch_DepartureTime = mockData.heudep;
          const Sch_ReturnTime = mockData.heuarr;
          var Act_DepartureTime = mockData.aheudep;
          var Act_ReturnTime = mockData.aheuarr;
          const dummyDate = moment(mockData.adatliv).format('YYYY-MM-DD')
          const TempDate = moment(mockData.adatarr).format('YYYY-MM-DD')
          const Temptype = mockData.xvry;
          const vr_url = "https://tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/DEMOTMSFR/$sessions?f=GESXX10CPLC/2//M/" + mockData.xnumpc;
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

          let Actual_Dep_Date, ReturnDate, vrtype,RealExecutionDate, ExecutionDate, Actual_Retn_Date;


 if (xExecutionDate == '1899-12-31') {
              RealExecutionDate = '';
          }
          else {
              RealExecutionDate = xExecutionDate;
          }


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
                             <CardTitle className="h3 mb-0 text-primary">
                               {this.props.t('RailCar Route Details')}
                             </CardTitle>
                           </Col>

                            <Col md="6" pr="2" className="text-right">
                                                       {trip.lock ?
                                                               this.switchView(this.props.vrdata.xrouteid,this.props.vrdata.xstatus)                   :<></>}
                                                      {trip.lock ?
                                                          <div style={{ pointerEvents: 'auto', float: 'right', marginRight: '10px', marginTop: '10px' }}>

                                                               <Button color="primary" type="button" size="lg" className="waves-effect waves-light mr-1"
                                                                 onClick={() => this.props.refreshVRScreens(this.props.vrdata.xrouteid)}>Refresh</Button>
                                                          </div> :<></>}





                                                      </Col>
                         </Row>
                         <hr className="my-2" />
                         <Row className="my-3">
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('RailRouteCode')}</p>

                             <p className="h6 mb-0 text-primary">
                                <a target="_blank" href={vr_url}>{trip.lock ? this.props.vrdata.xrouteid : trip.itemCode}</a>
                             </p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                               <p className="mb-1">{this.props.t('RailCar')}</p>
                               <p className="h6 mb-0 text-primary">
                               <a target="_blank" href={loadvehstock_url}>{trip.lock ? this.props.vrdata.railcode : trip && trip.vehicleObject && trip.vehicleObject.railcarid && trip.vehicleObject.railcarid}</a>
                               </p>
                               <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                                <p className="mb-1">{this.props.t('Current Status')}</p>
                                <p className="mb-0 h6" style={{fontSize:'20px'}}>{trip.lock ? this.getlvsstatus(this.props.vrdata.xstatus) : trip.optistatus} </p>
                                <hr className="mt-1" />
                           </Col>

                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('Source Site')}</p>
                             <p className="mb-0 h6">{trip.lock ? this.props.vrdata.fcy : trip.site}</p>
                             <hr className="mt-1" />
                           </Col>

                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('Destination Site')}</p>
                             <p className="mb-0 h6">{trip.lock ? this.props.vrdata.fcy : trip.site}</p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('')}</p>
                             <p className="mb-0 h6"></p>

                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('CreatedDate')}</p>
                             <p className="mb-0 h6">{trip.lock ? RealExecutionDate : ExecutionDate}</p>
                             <hr className="mt-1" />
                           </Col>
                           <Col lg="3" xl="2">
                             <p className="mb-1">{this.props.t('CreatedTime')}</p>
                             <p className="mb-0 h6">{trip.lock ? trip.heuexec : trip.heuexec}</p>
                             <hr className="mt-1" />
                           </Col>
                         </Row>

                       </CardBody>
                     </Card>
                   </Col>
     );
  }

}

export default withNamespaces()(VrHeader);