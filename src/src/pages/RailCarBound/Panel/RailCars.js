import React from 'react';
import { convertHrToSec, formatTime, formatHHMM,splitTime, convertHrToMin } from '../converterFunctions/converterFunctions';
import DisplayInformationIconDetails from './DisplayInformationIconDetails';
import {withNamespaces} from 'react-i18next';
import mockData from './RailCarMockData.json';
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


class RailCars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInfoShow: false,
      speciality: '',
      sites : [],
      RailCarCheckInList: [],
      RailCarCheckoutList : [],
    };

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
    const vehiclesList = this.props.curRailcarList;
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
    <TabPane tabId="RailCars">
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
              <th></th>
              <th onClick={() => this.props.sortVehicles('railcar', 0)}>
                  {this.props.t("RailCar")} {this.props.vehOrder[0] === 1 ? "▼" : "▲"}
              </th>
              <th  onClick={() => this.props.sortVehicles('des', 1)}>
                  {this.props.t("Description")} {this.props.vehOrder[1] === 1 ? "▼" : "▲"}
              </th>
              <th onClick={() => this.props.sortVehicles('vehicleid', 2)}>
                   {this.props.t("VehicleID")}  {this.props.vehOrder[2] === 1 ? "▼" : "▲"}
              </th>
              <th onClick={() => this.props.sortVehicles('type', 3)}>
                 {this.props.t("Rail Car Type")} {this.props.vehOrder[3] === 1 ? "▼" : "▲"}
              </th>
              <th onClick={() => this.props.sortVehicles('capacities', 4)}>
                 {this.props.t("Car Gross Capacity")} {this.props.vehOrder[4] === 1 ? "▼" : "▲"}
              </th>
              <th onClick={() => this.props.sortVehicles('insulate', 5)}>
                  {this.props.t("Insulate")}  {this.props.vehOrder[5] === 1 ? "▼" : "▲"}
              </th>
              <th onClick={() => this.props.sortVehicles('liningtype', 6)}>
                  {this.props.t("Liningtype")} {this.props.vehOrder[6] === 1 ? "▼" : "▲"}
              </th>
               <th onClick={() => this.props.sortVehicles('coiltype', 7)}>
                                {this.props.t("coiltype")}  {this.props.vehOrder[7] === 1 ? "▼" : "▲"}
                            </th>
               <th onClick={() => this.props.sortVehicles('length', 8)}>
                        {this.props.t("Car Length")}   {this.props.vehOrder[8] === 1 ? "▼" : "▲"}
               </th>
                <th onClick={() => this.props.sortVehicles('width', 9)}>
                       {this.props.t("Car Width")}   {this.props.vehOrder[9] === 1 ? "▼" : "▲"}
                </th>
                            <th onClick={() => this.props.sortVehicles('heigth', 10)}>
                                 {this.props.t("Car Height")}  {this.props.vehOrder[10] === 1 ? "▼" : "▲"}
                            </th>
            </tr>
          </thead>
          <tbody>
            {(this.props.curRailcarList || []).map((railcar, i) => (
              <tr id={'railcar' + i}

                draggable="true"
                onDragStart={(event) =>
                  this.props.handleDragStart(event, railcar, 'vehicle', i)

                }
                key={'railcar' + i}
                style={{ backgroundColor: this.getColor(railcar.color) }}
              >
<td className="pl-2"><input type="checkbox" name="railcarCheckBox" onClick={() => this.props.railcarChecked_fn(i)} /></td>
                <td>{railcar.railcarid}</td>
                <td>{railcar.des}</td>
                <td>{railcar.vehid}</td>
                <td>{railcar.typ}</td>
                <td>{parseFloat(railcar.cargrosswei).toFixed(2)} {railcar.xweu}</td>
                <td>{railcar.insulate}</td>
                <td>{railcar.liningtype}</td>
                <td>{railcar.coiltype}</td>
                <td>{railcar.carlen}</td>
               <td>{railcar.carwdth} </td>
               <td>{railcar.carhgt} </td>
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

export default withNamespaces()(RailCars);