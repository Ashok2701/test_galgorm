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

import CustomizedSteppers from './LVS-workflow';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

// x3 link from .env
const x3Url = process.env.REACT_APP_X3_URL;

class VrHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInfoShow: false,
      speciality: '',

    };
  }
  getlvsstatus = (x) => {

    console.log(x ,"this is switch case based on that reurning status")
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

    this.props.validateonly(this.props.selectedVrIndex, "vrHeader")
  }

  confirmLVS = (lvscode) => {
    console.log("T444 inside VR header - LVS");
    this.props.confirmLVSbyCode(this.props.loadvehstck.vcrnum, this.props.selectedVrIndex, 'vrHeader')
  }


  ToPickData = () => {
    this.props.ToPickDatafromVR(this.props.vrdata.xnumpc);

  }



  displayVehicleName  = (code) => {
     let vehcode = code, vehName = '';

console.log("data insdie vehname =", vehcode)
 if (this.props.vehiclePanel && this.props.vehiclePanel.vehicles  && this.props.vehiclePanel.vehicles.length > 0) {
       console.log("data insdie vehname if=")
            this.props.vehiclePanel.vehicles.map((veh) => {
               console.log("data insdie vehname if=", veh)
              if (veh.codeyve === vehcode) {
                 vehName = veh.name;
                  console.log("data insdie vehname matched", vehName)
              }
            });
  }
  return vehName;
}


  ToAllocationGetData = () => {
    this.props.ToAllocationGetDatafromVR(this.props.vrdata.xnumpc, this.props.vrdata.fcy);

  }


  SubmitforAllocation = () => {
    this.props.SubmitforAllocation(this.props.vrdata.fcy, this.props.vrdata.xnumpc);
  }



  render() {
    var trip = this.props.tripdetails;
    const op_status = this.props.vrdata.optimsta;
    const dis_status = this.props.vrdata.dispstat;
    const TExecTime = this.props.vrdata.heuexec;
    const TExecutionDate = moment(this.props.vrdata.datexec).format('DD-MM-YYYY');
    const ScheduledDate = moment(this.props.vrdata.datliv).format('DD-MM-YYYY');
    const Sch_Return_Date = moment(this.props.vrdata.datarr).format('DD-MM-YYYY');
    const ExecutionTime = moment(this.props.vrdata.heuexec).format('hh:mm');
    const Sch_DepartureTime = this.props.vrdata.heudep;
    const Sch_ReturnTime = this.props.vrdata.heuarr;
    var Act_DepartureTime = this.props.vrdata.aheudep;
    var Act_ReturnTime = this.props.vrdata.aheuarr;
    const dummyDate = moment(this.props.vrdata.adatliv).format('DD-MM-YYYY')
    const TempDate = moment(this.props.vrdata.adatarr).format('DD-MM-YYYY')
    const Temptype = this.props.vrdata.xvry;
    // const vr_url =  `${x3Url}/$sessions?f=GESXX10CPLC/2//M/` + this.props.vrdata.xnumpc;
    // const loadvehstock_url =`${x3Url}/$sessions?f=GESXX10CS/2//M/` + this.props.loadvehstck.vcrnum;

    // Constructing the URL for vr_url
let vr_url = `${x3Url}/$sessions?f=GESXX10CPLC/2//M/${this.props.vrdata.xnumpc}`;

// Constructing the URL for loadvehstock_url
let loadvehstock_url = `${x3Url}/$sessions?f=GESXX10CS/2//M/${this.props.loadvehstck.vcrnum}`

    console.log(this.props.vrdata.xnumpc  , "vr_url")
    let lvs_number = "";
    let confirmlvsflg = 0;
    if (this.props.loadvehstck.vcrnum == null) {
      lvs_number = '';
    }
    else {
      lvs_number = this.props.loadvehstck.vcrnum;
    }
    if (this.props.loadvehstck.xvalflg == 2) {
      confirmlvsflg = 2;
    }
    else if (this.props.loadvehstck.xvalflg == 1) {
      confirmlvsflg = 1;
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

    let Actual_Dep_Date, ReturnDate, vrtype, ExecutionDate, execTime, Actual_Retn_Date;

    if (TExecutionDate == '31-12-1899') {
      ExecutionDate = '';
    }
    else {
      ExecutionDate = TExecutionDate;
    }
    if (TExecTime == null) {
      execTime = '00:00';
    }
    else {
      execTime = TExecTime;
    }

    //scheduled return date
    if (dummyDate == '31-12-1752' || dummyDate == '31-12-1899' || dummyDate == '01-01-1900' || dummyDate == '01-01-1753') {
      Actual_Dep_Date = '';
    }
    else {
      Actual_Dep_Date = dummyDate;
    }
    if (TempDate == '31-12-1752' || TempDate == '31-12-1899' || TempDate == '01-01-1900' || TempDate == '01-01-1753') {
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



    return (
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
                {trip.lock &&
                  <div >
                    <CustomizedSteppers
                      vrdata={this.props.vrdata}
                      lvsData={this.props.loadvehstck}
                      createLVS={this.validateTrip}
                      ToPickData={this.ToPickData}
                      onlyReceiptflg={this.props.onlyReceiptflg}
                      pickTicketflg={this.props.pickTicketflg}
                      toPickDataList={this.props.toPickDataList}
                      ToAllocationData={this.ToAllocationGetData}
                      toAllocationDataList={this.props.toAllocationDataList}
                      SubmitforAllocation={this.SubmitforAllocation}
                      selectedVrValidated={this.props.selectedVrValidated}
                      confirmLVS={this.confirmLVS}
                    />
                  </div>
                }
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
                <p className="mb-0 h5 text-success">{trip.lock ? this.getlvsstatus(this.props.loadvehstck.xloadflg) : trip.generatedBy === 'AutoScheduler' ? 'AUTO-OPTIMIZED' : trip.optistatus}</p>
                <hr className="mt-1" />
              </Col>

              <Col lg="3" xl="2">
                <p className="mb-1">{this.props.t('DepartureSite')}</p>
                <p className="mb-0 h6 text-primary">{trip.lock ? this.props.vrdata.fcy : trip.depSite}</p>
                <hr className="mt-1" />
              </Col>
              <Col lg="3" xl="2">
                <p className="mb-1">{this.props.t('ArrivalSite')}</p>
                <p className="mb-0 h6 text-primary">{trip.lock ? this.props.vrdata.xdesfcy : trip.arrSite}</p>
                <hr className="mt-1" />
              </Col>
              <Col lg="3" xl="2">
                <p className="mb-1">{this.props.t('Carrier')}</p>
                <p className="mb-0 h6 text-primary">{trip.lock ? this.props.vrdata.bptnum : trip && trip.vehicleObject && trip.vehicleObject.bptnum && trip.vehicleObject.bptnum}</p>
                <hr className="mt-1" />
              </Col>
              {/* <Col lg="3" xl="2">
                <p className="mb-1">{this.props.t('Trailer')}</p>
                <p className="mb-0 h6 text-primary">{trip.lock ? this.props.vrdata.trailer : trip && trip.trialerObject && trip.trialerObject.length ? trip.trialerObject[0].trailer : '-'}</p>
                <hr className="mt-1" />
              </Col> */}
              <Col lg="3" xl="2">
                <p className="mb-1">{this.props.t('VehClass')}</p>
                <p className="mb-0 h6 text-primary">{trip.lock ? this.props.vrdata.vehclass : trip && trip.vehicleObject && trip.vehicleObject.className && trip.vehicleObject.className}</p>
                <hr className="mt-1" />
              </Col>
              <Col lg="3" xl="2">
                <p className="mb-1">{this.props.t('Vehicle')}</p>
                <p className="mb-0 h5 text-success"><b>{trip.lock ? this.displayVehicleName(this.props.vrdata.codeyve) : trip && trip.vehicleObject && trip.vehicleObject.codeyve && this.displayVehicleName(trip.vehicleObject.codeyve)}</b></p>
                <hr className="mt-1" />
              </Col>
              <Col lg="3" xl="2">
                <p className="mb-1">{this.props.t('RouteType')}</p>
                <p className="mb-0 h6 text-primary">{trip.lock ? vrtype : 'Not Confirmed'}</p>
                <hr className="mt-1" />
              </Col>
              <Col lg="3" xl="2">
                <p className="mb-1">{this.props.t('DriverId')}</p>
                <p className="mb-0 h5 text-success"><b>{trip.lock ? this.props.vrdata.driverid : trip.driverId}</b></p>
                <hr className="mt-1" />
              </Col>
              <Col lg="3" xl="2">
                <p className="mb-1">{this.props.t('Driver')}</p>
                <p className="mb-0 h5 text-success"><b>{trip.lock ? this.props.vrdata.driver : trip.driverName}</b></p>
                <hr className="mt-1" />
              </Col>
              <Col lg="3" xl="2">
                <p className="mb-1">{this.props.t('CreatedDate')}</p>
                <p className="mb-0 h6 text-primary">{trip.lock ? ExecutionDate : moment(trip.credattim).format('DD-MM-YYYY')}</p>
                <hr className="mt-1" />
              </Col>
              <Col lg="2" xl="2">
                <p className="mb-1">{this.props.t('CreatedTime')}</p>
                <p className="mb-0 h6 text-primary">{trip.lock ? execTime : trip.heuexec === "null" ? '00:00' : trip.heuexec}</p>
                <hr className="mt-1" />
              </Col>
              <Col lg="2" xl="1">
                              <p className="mb-1">{this.props.t('CreatedBy')}</p>
                              <p className="mb-0 h6 text-primary">{trip.xusrcode === "" ? "-" : trip.xusrcode}</p>
                              <hr className="mt-1" />
                            </Col>
              <Col lg="2" xl="1">
                <p className="mb-1">{this.props.t('Trip')}</p>
                <p className="mb-0 h6 text-primary">{trip.lock ? this.props.vrdata.xroutnbr : trip.trips}</p>
                <hr className="mt-1" />
              </Col>
              <Col lg="6">

                <div style={{ display: "flex", justifyContent: "space-evenly" }}>

                  <div class="polaroid">
                    <img style={{ height: "150px", width: "350px" }} className='img-fluid card-img-top' src={`data:image/jpeg;base64,${trip.lock ? this.props.vrdata.vehImage : trip.vehImage && trip.vehImage}`} alt={this.props.vrdata.codeyve} />
                    <div class="Imgcontainer">
                      <p><strong>Vehicle : {trip.lock ? this.props.vrdata.codeyve : trip.code} </strong></p>
                    </div>
                  </div>
                  <div class="polaroid">
                    <img style={{ height: "150px", width: "350px" }} className='img-fluid card-img-top' src={`data:image/jpeg;base64,${trip.lock ? this.props.vrdata.driverImage : trip.driverImage && trip.driverImage}`} alt={this.props.vrdata.driverid} />
                    <div class="Imgcontainer">
                      <p><strong>Driver : {trip.lock ? this.props.vrdata.driverid : trip.driverId}</strong></p>
                    </div>
                  </div>
                </div>

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
                    <p class='mb-0 h5 text-success'><b>{trip.lock ? ScheduledDate : trip.optistatus === "Optimized" ? moment(trip.docdate).format("DD-MM-YYYY") : '-'}</b></p>
                    <hr className="mt-1" />
                  </Col>
                  <Col md="6" lg="3">
                    <p className="mb-1">{this.props.t('DepartureTime')}</p>
                    <p class='mb-0 h5 text-success'><b>{trip.lock ? Sch_DepartureTime : trip.optistatus === "Optimized" ? trip.startTime : '-'}</b></p>
                    <hr className="mt-1" />
                  </Col>
                  <Col md="6" lg="3">
                    <p className="mb-1">{this.props.t('ReturnDate')}</p>
                    <p class='mb-0 h5 text-warning'><b>{trip.lock ? Sch_Return_Date : trip.optistatus === "Optimized" ? moment(trip.endDate).format("DD-MM-YYYY") : '-'}</b></p>
                    <hr className="mt-1" />
                  </Col>
                  <Col md="6" lg="3">
                    <p className="mb-1">{this.props.t('ReturnTime')}</p>
                    <p class='mb-0 h5 text-warning'><b>{trip.lock ? Sch_ReturnTime : trip.optistatus === "Optimized" ? trip.endTime : '-'}</b></p>
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
                    <p class='mb-0 h5 text-success'><b>{trip.lock ? Actual_Dep_Date : '-'}</b></p>
                    <hr className="mt-1" />
                  </Col>
                  <Col md="6" lg="3">
                    <p className="mb-1">{this.props.t('DepartureTime')}</p>
                    <p class='mb-0 h5 text-success'><b>{trip.lock ? Act_DepartureTime : '-'}</b></p>
                    <hr className="mt-1" />
                  </Col>
                  <Col md="6" lg="3">
                    <p className="mb-1">{this.props.t('ReturnDate')}</p>
                    <p class='mb-0 h5 text-warning'><b>{trip.lock ? Actual_Retn_Date : '-'}</b></p>
                    <hr className="mt-1" />
                  </Col>
                  <Col md="6" lg="3">
                    <p className="mb-1">{this.props.t('ReturnTime')}</p>
                    <p class='mb-0 h5 text-warning'><b>{trip.lock ? Act_ReturnTime : '-'}</b></p>
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