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
        return ("custom-enable");
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
 <TabPane tabId="SalesRep">
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
                <table class='table table-striped m-0'>
                    <thead class="custom-sort">
                        <tr>
                            <th width="13%" onClick={() => this.props.sortDriver('driverid', 0)}>
                                                           {this.props.t("SalesRep code")} {this.props.diverOrder[0] === 1 ? "▼" : "▲"}
                                                        </th>
                                                        <th width="13%" onClick={() => this.props.sortDriver('driver', 1)}>
                                                            {this.props.t("SalesRep Name")} {this.props.diverOrder[1] === 1 ? "▼" : "▲"}
                                                        </th>

                        </tr>
                    </thead>
                    <tbody>
                        {(this.props.curDrivers || []).map((driver, i) => (
                            <tr id={'driver' + i}
                                className={this.dragStyle(driver.type)}
                                draggable={driver.type === 'open' ? "true" : "true"}
                                onDragStart={(event) =>
                                    this.props.handleDragStart(event, driver, 'vehicle', i)
                                }
                              //  style={{ backgroundColor: this.props.allAllowedDrivers == '2' ? '#feff99' :  this.getBgcolor(driver.driverid, driver.color) }}
                                key={'driver' + i}
                            >
                                <td width="13%">{driver.repId}</td>
                                <td width="13%">{driver.repName}</td>

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