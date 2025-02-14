import * as React from 'react';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { withNamespaces } from "react-i18next";
import 'moment-timezone';
import Switch from '@mui/material/Switch';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import SvgIcon from '@material-ui/core/SvgIcon';
import LockRounded from '@material-ui/icons/LockRounded';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Nav,

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

import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

class EditorTemp extends React.PureComponent {
  constructor(props) {
    super(props);
  }


   getVrDetailsLink(x,tmsValidated) {
         // if (x == 1) {
              return (
                  <a href="#"
                      ><i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
                  </a>
              );
         // }
      }


    getLockData = (lock,  opti) => {

        if (lock) {

            return (
                <span >
                    <LockRounded style={{ fontSize: 22 }} />
                    <SvgIcon>
                        <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
                    </SvgIcon>
                </span>

            );
        } else {
            return (
                <span >
                    <LockOpenRoundedIcon color="primary" style={{ fontSize: 22 }} />
                    <SvgIcon>
                        <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
                    </SvgIcon>
                </span>
                // <a href="#" onClick={() => this.onConfirmClick(i,opti)}>
                //     <svg class="svg-inline--fa fa-user-unlock fa-w-14" id="lockId1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="unlock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg>
                // </a>
            );
        }
    }





      getValidatebtn(valid, lock) {
              if (!valid && lock) {
                  return (
                      <a href="#"
                          ><i class="fas fa-check-circle" aria-hidden="true"></i>
                      </a>
                  );
              }
              else {
              }
          }
  render() {
   var tripData = this.props.SelectedDocData;
       console.log("data inside edtiort = ",this.props.SelectedTripData);

    return (

      <div className="EditTemp-main">
<div className="detail-sidebar-header p-2">

                    <div className="table-responsive">
                      <Table className="mb-0">
                        <tbody>
                          <tr>
                            <th scope="row">Document Number</th>
                            <td>{tripData.docnum}</td>
                          </tr>

                          <tr>
                                                      <th scope="row">Client </th>
                                                      <td>{tripData.docnum}</td>
                                                    </tr>
                        <tr>
                                                    <th scope="row">Client Name</th>
                                                    <td>{tripData.docnum}</td>
                                                  </tr>
                          <tr>
                              <th scope="row">Address</th>
                              <td>{tripData.city} - {tripData.poscode}</td>
                          </tr>
                          <tr>
                            <th scope="row">Driver</th>
                            <td>{tripData.drivercode}</td>
                          </tr>
                          <tr>
                              <th scope="row">Vehicle</th>
                              <td>{tripData.vehiclecode}</td>
                                                    </tr>
                          <tr>
                              <th scope="row">Status</th>
                              <td>{tripData.dlvystatus}</td>
                                                                              </tr>
                          <tr>
                            <th scope="row">StartTime</th>
                            <td>
                               <DateTimePickerComponent
                                                 id="StartTime"
                                                 format="hh:mm a"
                                                 value = {tripData.arvtime}
                                                 data-name="StartTime"
                                                 className="e-field"
                                               />
                          </td>
                          </tr>
                          <tr>
                            <th scope="row">EndTime</th>
                            <td>{tripData.deptime === "null" ? '' :
                                                                tripData.deptime}</td>
                          </tr>
                          <tr>
                            <th scope="row">Stops</th>
                            <td>{tripData.stops}</td>
                          </tr>

                        </tbody>
                      </Table>
                    </div>
                <div>

                </div>
        <div>
        <Button className="btn-save" onClick={this.props.onSave}>Save</Button>

        <Button className="btn-close" onClick={this.props.onClose}>Close</Button>
        </div>
     </div>
     </div>

    );
  }
}
export default EditorTemp;