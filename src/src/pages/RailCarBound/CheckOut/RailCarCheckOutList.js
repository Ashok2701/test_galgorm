import React, { Component } from "react";
import { Card, CardBody, Container, Row, Col, Button, FormGroup, Input } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import Confirm from './Confirm';
import moment from 'moment';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Link } from "react-router-dom";
import SelectSite from "../Components/SelectSite";
import CheckOutBtnRenderer from './CheckOutBtnRenderer'
import Select from "../Components/Select";
import Grid from '@material-ui/core/Grid';
import "./checkOut.scss";
import {
    convertSecToHr,
    splitTime,
    formatHrMin,
    nullAndNanChecking,
    formatTime,
    convertHrToSec,
    convertMinToSec,
    convertMinToHr,
} from '../converterFunctions/converterFunctions';


class RailCarCheckOutList extends Component {
  constructor(props) {
    super(props);
  this.state = {

      selectedRailCar : '',
             confirmMessage : '',
             addConfirmShow : false,
    columnDefs: [
            {
              headerName: 'RAIL CAR',
              field: 'railcarid',
              width: 130,
            },
            {
              headerName: 'DESCRIPTION',
              field: 'des',
              width: 130,
            },
            {
              headerName: 'SITE',
              field: 'fcy',
              width: 130,
            },
            {
              headerName: 'EMPTIED DATE',
              field: 'date',
              width: 150,
            },
            {
              headerName: 'EMPTIED TIME',
              field: 'time',
              width: 150,
            },
            {
              headerName: 'Action',
              cellRenderer : CheckOutBtnRenderer,
              width : 150,
            },
          ],
  }
  }

  OnCheckoutClick = SelectedRailCar => {

     // 
      //this.props.OnCheckout(SelectedRailCar);
        this.setState({
                                confirmMessage: 'Are you sure to CheckOut the selected RailCar',
                                addConfirmShow: true,
                                selectedRailCar : SelectedRailCar
                            })
  }

   onConfirmNo = () => {
              this.setState({
                  addConfirmShow: false
              })
          }

          onConfirmYes = () => {
            this.props.OnCheckout(this.state.selectedRailCar);
              this.setState({
                  addConfirmShow: false
              })
          }

   SearchDrops = e => {
                      
                      this.props.updateSearchTerm(e);
                  }


  render() {
   

    let  rows =  this.props.CheckInList
    let column = this.state.columnDefs


    return (
              <Col xs="12">
                <Card >
                  <CardBody  >
                    <div className="page-title-box pb-0 d-flex align-items-center justify-content-b">
                      <h4 className="mb-0">RAILCAR CHECK OUT</h4>

                    </div>
                     <hr className="my-2" />
                    <div className="gap">
                    </div>
                    <div className="page-title-box pb-0 d-flex align-items-center justify-content-b">
                                          <h4 className="mb-0">LIST OF EMPTIED RAILCARS</h4>

                                        </div>
                                         <hr className="my-2" />
                    <Row className="my-2" style={{float:"right", width:"400px"}}>
                                        <Col>
                                          <FormGroup className="mb-0">
                                            <Input
                                              style={{height:"35px"}}
                                              bsSize="sm"
                                              type="search"
                                              placeholder="SearchCaption"
                                              className="form-control"
                                              onChange = {this.SearchDrops}
                                            />
                                          </FormGroup>
                                        </Col>
                    </Row>
                   <div class="reportlist-view2 tableCustomFixHead2">

                                  <table class= {"table table-lg table-bordered table-striped m-0"}>

                                      <thead >
                                          <tr >

                                                                          <th onClick={() => this.props.sortDrop('docnum', 0)}>
                                                                             Rail Car
                                                                          </th>
                                                                          <th>
                                                                             DESCRIPTION
                                                                          </th>
                                                                            <th>
                                                                              SITE
                                                                           </th>
                                                                          <th>
                                                                             EMPTIED DATE
                                                                           </th>

                                                                          <th>EMPTIED TIME</th>
                                                                          <th></th>
                                                                        </tr>
                                      </thead>
                                      <tbody>
                                          {(this.props.CheckInList && this.props.CheckInList || []).map((railcar, i) => {
                                              return (
                                                  <tr id={'railcar' + i}

                                                      key={'railcar' + i}
                                                  >
                                                      <td>
                                                          {railcar.railcarid}
                                                      </td>
                                                      <td>{railcar.des}</td>
                                                      <td>{railcar.fcy}</td>
                                                      <td>{railcar.lastemptd}</td>
                                                      <td>{splitTime(railcar.lastemptt)}</td>
                                                      <td >
                                                         <Button color="success"
                                                           onClick={() => this.OnCheckoutClick(railcar)}
                                                         >CHECK OUT</Button>
                                                      </td>
                                                                                                     </tr>
                                              )
                                          })}
                                      </tbody>
                                  </table>
                                  <Confirm
                                                                               show={this.state.addConfirmShow}
                                                                               onHide={this.onConfirmNo}
                                                                               lockConfirm={this.onConfirmYes}
                                                                               railcar={this.state.CurrentCheckinRailCar}
                                                                               confirmMessage={this.state.confirmMessage}

                                                                           ></Confirm>
                             </div>
                  </CardBody>
                </Card>
              </Col>
    );
  }
}

export default RailCarCheckOutList;
