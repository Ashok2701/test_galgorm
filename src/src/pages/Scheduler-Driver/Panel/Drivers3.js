import React from 'react';
import {withNamespaces} from 'react-i18next';
import { convertHrToSec, splitTime, nullAndNanChecking } from '../converterFunctions/converterFunctions';
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


class Drivers3 extends React.Component {
    dragStyle = (type) => {
        if (type === 'open') {
            return ("custom-enable");
        }
        return ("custom-disable");
    }


    getLunctimeformat(x)
    {
       var lunchtime = x;
       var strLength = lunchtime.length;
       if(strLength == 0 || strLength == 1)
       {
          return "";
       }
       else if(strLength == 4){
          return  splitTime(lunchtime);
       }
     return  lunchtime;

    }


    getBgcolor(driverid , style) {

       if (this.props.vehicleDropped) {

        if (this.props.allowedDrivers && !this.props.allowedDrivers.includes(driverid)) {

                            return '';
        }
        else {
         return '#feff99';
        }
   }
   else {
          console.log("Driver id", driverid);
           var myStr = style;
                             var subStr = myStr.match("background-color:(.*)");
                             var s = subStr[1];
                             var s1 = s + ' !important';

                             console.log("driver color",s1)
                             return s;
   }
 }



       SearchDriver = e => {
                  console.log("search content= ",e.target.value);
                  this.props.updateDriverSearchTerm(e);
              }



    render() {
        return (
 <TabPane tabId="Drivers">
                                   <Row className="my-2">
                                     <Col md="4">
                                       <FormGroup className="mb-0">
                                         <Input
                                           bsSize="sm"
                                           type="search"
                                           placeholder={this.props.t("SearchCaption")}
                                           className="form-control"
                                            onChange = {this.SearchDriver}
                                         />
                                       </FormGroup>
                                     </Col>
                                   </Row>
            <div class="reportlist-view tableCustomFixHead1">
                <table class={this.props.allAllowedDrivers ===2 || this.props.allowedDrivers !='' ? 'table table-hover' : "table "}>
                    <thead class="custom-sort">
                        <tr>
                            <th onClick={() => this.props.sortDriver('driverid', 0)}>
                                                           {this.props.t("Driver code")} {this.props.diverOrder[0] === 1 ? "▼" : "▲"}
                                                        </th>
                                                        <th onClick={() => this.props.sortDriver('driver', 1)}>
                                                            {this.props.t("Driver Name")} {this.props.diverOrder[1] === 1 ? "▼" : "▲"}
                                                        </th>
                                                        <th onClick={() => this.props.sortDriver('fcy', 7)}>
                                                            {this.props.t("Site")} {this.props.diverOrder[7] === 1 ? "▼" : "▲"}
                                                        </th>
                                                        <th onClick={() => this.props.sortDriver('licenum', 2)}>
                                                            {this.props.t("Permit")}  {this.props.diverOrder[2] === 1 ? "▼" : "▲"}
                                                        </th>
                                                        {/* <th onClick = { () => this.props.sortDriver('licedat', 3)}>
                                                                    Date de permis {this.props.diverOrder[3] === 1 ? "▼" : "▲"}
                                                                </th> */}

                                                        <th onClick={() => this.props.sortDriver('poscod', 5)}>
                                                            {this.props.t("postal")}  {this.props.diverOrder[5] === 1 ? "▼" : "▲"}
                                                        </th>
                                                        <th onClick={() => this.props.sortDriver('cty', 4)}>
                                                            {this.props.t("City")}  {this.props.diverOrder[4] === 1 ? "▼" : "▲"}
                                                        </th>
                                                        <th onClick={() => this.props.sortDriver('cry', 6)}>
                                                           {this.props.t("Country")}   {this.props.diverOrder[6] === 1 ? "▼" : "▲"}
                                                        </th>
                                                        <th>
                                                           Max Trips (per day)
                                                        </th>
                            <th>{this.props.t("Lunch Time")} (HH:MM)</th>
                            <th>{this.props.t("Lunch Duration")} (Hrs)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.props.curDrivers || []).map((driver, i) => (
                            <tr id={'driver' + i}
                                className={this.dragStyle(driver.type)}
                                draggable={driver.type === 'open' ? "true" : "false"}
                                onDragStart={(event) =>
                                    this.props.handleDragStart(event, driver, 'driver', i)
                                }
                                style={{ backgroundColor: this.props.allAllowedDrivers == '2' ? '#feff99' :  this.getBgcolor(driver.driverid, driver.color) }}
                                key={'driver' + i}
                            >
                                <td>{driver.driverid}</td>
                                <td>{driver.driver}</td>
                                <td>{driver.fcy}</td>
                                <td>{driver.licenum}</td>
                                {/* <td>{ driver.licedat }
                                    </td>
                                     */}
                                <td>{driver.poscod}</td>
                                <td>{driver.cty}</td>
                                <td>{driver.cry}</td>
                                <td>{driver.maxtrips}</td>
                                <td>{this.getLunctimeformat(driver.lncstrtime)}</td>
                                <td>{this.getLunctimeformat(driver.lncduration)} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
</TabPane>
        );
    }
}

export default withNamespaces()(Drivers3) ;