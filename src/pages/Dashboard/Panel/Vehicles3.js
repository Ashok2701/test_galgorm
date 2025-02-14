import React from 'react';
import { convertHrToSec, formatTime, formatHHMM,splitTime, convertHrToMin } from '../converterFunctions/converterFunctions';
import DisplayInformationIconDetails from './DisplayInformationIconDetails';
import {withNamespaces} from 'react-i18next';
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


class Vehicles3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInfoShow: false,
      speciality: '',
    };

  }

  dragStyle = (type) => {
    if (type === 'open') {
      return ("custom-enable");
    }
    return ("custom-disable");
  }

  getColor(style) {
    var myStr = style;
    var subStr = myStr.match("background-color:(.*)");
    var s = subStr[1];
    return s;
  }
  onInfoClick = (data) => {
    var lng = localStorage.getItem("lng");
    let costunits , distunits;
    if(lng == "en"){
      costunits = '$';
      distunits = 'Miles'
    }
    else{
       costunits = '€';
       distunits = 'Kms'

    }
    let length = data.length && (data.length+"cm, ");
    let width = data.width && data.width+"cm, ";
    let heigth = data.heigth && data.heigth + "cm";
    const vehicleDetails = {};
    vehicleDetails.Tailgate = data.tailGate && data.tailGate;
    vehicleDetails.Loadbay = data.loadBay && data.loadBay;
    vehicleDetails.Dimensions  = length + width+ heigth;
    vehicleDetails.OverTimeStart = data.overtimestar && formatTime(convertHrToSec(data.overtimestar)) + ' Hrs';
    vehicleDetails.LoadingTime= data.startdepots && convertHrToMin(data.startdepots) + ' Mins';
    vehicleDetails.OffLoadingTime = data.enddepotserv && convertHrToMin(data.enddepotserv) + ' Mins';
    vehicleDetails.MaxSpeed = data.maxspeed && data.maxspeed + ' '+distunits+'/Hr';
    vehicleDetails.FixedCost = data.fixedcost && data.fixedcost + ' '+costunits;
    vehicleDetails.CostPerUnitTime = data.costperunitt && data.costperunitt + ' '+costunits;
    vehicleDetails.CostPerUnitDistance = data.costperunitd && data.costperunitd + ' '+costunits;
    vehicleDetails.CostPerUnitOverTime =  data.costperunito && data.costperunito+' '+costunits;
    this.setState({
      addInfoShow: true,
      speciality: vehicleDetails,
    });
  }

  SearchVehicle = e => {
      console.log("search content= ",e.target.value);
      this.props.updateVehSearchTerm(e);
  }



  render() {
    const vehiclesList = this.props.curVehicleList;
    let addInfoIconClose = () => this.setState({ addInfoShow: false });
    var lang = localStorage.getItem("lng");
        let distunts;
        if(lang == "en"){
          distunts = 'Miles';
        }
        else{
           distunts = 'Kms';

        }



    return (
    <TabPane tabId="Vehicles">
                                         <Row className="my-2">
                                           <Col md="4">
                                             <FormGroup className="mb-0">
                                               <Input
                                                 bsSize="sm"
                                                 type="search"
                                                 placeholder={this.props.t("SearchCaption")}
                                                 className="form-control"
                                                 onChange = {this.SearchVehicle}
                                               />
                                             </FormGroup>
                                           </Col>
                                         </Row>
      <div class="reportlist-view tableCustomFixHead1">
        <table class="table m-0">
          <thead class="custom-sort">
            <tr>
              <th onClick={() => this.props.sortVehicles('codeyve', 0)}>
                  {this.props.t("Code vehicle")} {this.props.vehOrder[0] === 1 ? "▼" : "▲"}
              </th>
              <th  onClick={() => this.props.sortVehicles('name', 1)}>
                  {this.props.t("Vehicle No")} {this.props.vehOrder[1] === 1 ? "▼" : "▲"}
              </th>
              <th onClick={() => this.props.sortVehicles('startdepotn', 2)}>
                   {this.props.t("Departure Site")}  {this.props.vehOrder[2] === 1 ? "▼" : "▲"}
              </th>
              <th onClick={() => this.props.sortVehicles('enddepotname', 3)}>
                 {this.props.t("Arrival Site")} {this.props.vehOrder[3] === 1 ? "▼" : "▲"}
              </th>
              <th onClick={() => this.props.sortVehicles('drivername', 4)}>
                 {this.props.t("Driver Name")} {this.props.vehOrder[4] === 1 ? "▼" : "▲"}
              </th>
              <th onClick={() => this.props.sortVehicles('lateral', 5)}>
                  {this.props.t("SideOperation")}  {this.props.vehOrder[5] === 1 ? "▼" : "▲"}
              </th>
              <th onClick={() => this.props.sortVehicles('trailer', 6)}>
                  {this.props.t("Trailer")} {this.props.vehOrder[6] === 1 ? "▼" : "▲"}
              </th>
              <th>
                  Info
              </th>
               <th onClick={() => this.props.sortVehicles('catego', 7)}>
                                {this.props.t("Category")}  {this.props.vehOrder[7] === 1 ? "▼" : "▲"}
                            </th>
                            <th onClick={() => this.props.sortVehicles('starttime', 8)}>
                                 {this.props.t("Earliest<br/>Start Time")}   {this.props.vehOrder[8] === 1 ? "▼" : "▲"}
                            </th>
                            <th onClick={() => this.props.sortVehicles('lateststarttime', 9)}>
                                {this.props.t("Latest<br/>Start Time")}   {this.props.vehOrder[9] === 1 ? "▼" : "▲"}
                            </th>
                            <th onClick={() => this.props.sortVehicles('capacities', 10)}>
                                 {this.props.t("Capacity")}  {this.props.vehOrder[10] === 1 ? "▼" : "▲"}
                            </th>
                            <th onClick={() => this.props.sortVehicles('vol', 11)}>
                                {this.props.t("Volume")}    {this.props.vehOrder[11] === 1 ? "▼" : "▲"}
                            </th>
                            <th onClick={() => this.props.sortVehicles('maxordercnt', 12)}>
                                 {this.props.t("Max Order<br/>Count")}   {this.props.vehOrder[12] === 1 ? "▼" : "▲"}
                            </th>
                            <th onClick={() => this.props.sortVehicles('maxtotaldist', 13)}>
                                {this.props.t("Max Total<br/>Distance")}  {this.props.vehOrder[13] === 1 ? "▼" : "▲"}
                            </th>
                            <th onClick={() => this.props.sortVehicles('maxtotaltime', 14)}>
                                 {this.props.t("Max Total<br/>Time")}    {this.props.vehOrder[14] === 1 ? "▼" : "▲"}
                            </th>
                            <th onClick={() => this.props.sortVehicles('maxtotaltrvtime', 15)}>
                                 {this.props.t("Max Total<br/>Travel Time")}   {this.props.vehOrder[15] === 1 ? "▼" : "▲"}
                            </th>
                            <th onClick={() => this.props.sortVehicles('bptnum', 16)}>
                                {this.props.t("Carrier")}   {this.props.vehOrder[16] === 1 ? "▼" : "▲"}
                            </th>
            </tr>
          </thead>
          <tbody>
            {(this.props.curVehicleList || []).map((vehicle, i) => (
              <tr id={'vehicle' + i}
                className={this.dragStyle(vehicle.type)}
                draggable={vehicle.type === 'open' ? "true" : "false"}
                onDragStart={(event) =>
                  this.props.handleDragStart(event, vehicle, 'vehicle', i)

                }
                key={'vehicle' + i}
                style={{ backgroundColor: this.getColor(vehicle.color) }}
              >
                <td>{vehicle.codeyve}</td>
                <td>{vehicle.name}</td>
                <td>{vehicle.startdepotn}</td>
                <td>{vehicle.enddepotname}</td>
                <td>{vehicle.drivername}</td>
                <td>{vehicle.lateral}</td>
                <td>{vehicle.trailer}</td>
                <td data-toggle="tooltip" data-placement="top">
                  <a href="#" onClick={() => this.onInfoClick(vehicle)}>
                  <i class="fa fa-info-circle" aria-hidden="true"></i></a>
                </td>
                <td>{vehicle.catego}</td>
                <td>{splitTime(vehicle.starttime)}</td>
                <td>{splitTime(vehicle.lateststarttime)}</td>
                <td>{vehicle.capacities} {vehicle.xweu}</td>
                <td>{vehicle.vol} {vehicle.xvol}</td>
                <td>{vehicle.maxordercnt}</td>
                <td>{vehicle.maxtotaldist} {distunts}</td>
                <td>{formatTime(convertHrToSec(vehicle.maxtotaltime))} Hrs</td>
                <td>{formatTime(convertHrToSec(vehicle.maxtotaltrvtime))} Hrs</td>
                <td>{vehicle.bptnum}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <DisplayInformationIconDetails
          show={this.state.addInfoShow}
          onInfoIconHide={addInfoIconClose}
          data={this.state.speciality}
          dataName="vinfo"
          dataType="object"
        >
        </DisplayInformationIconDetails>
      </div>
      </TabPane>
    );
  }
}

export default withNamespaces()(Vehicles3);