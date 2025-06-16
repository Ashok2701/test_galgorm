import React, { Component } from "react";
import { Card, CardBody, Container, Row, Col, Button } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import SelectSite from "../Components/SelectSite";
import { fetchRailCarAPI } from '../../../service';
import Select from "../Components/Select";
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import "./checkIn.scss";
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

class RailCarCheckInList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sites : [],
        selectedSite : '',
        CheckInList : [],
        CheckOutList : [],
        CheckAvailList : [],
         columns: [
                 {
                   label: "RAIL CAR",
                   field: "railcarid",
                   width: 130,
                 },
                 {
                   label: "DESCRIPTION",
                   field: "des",
                   width: 160,
                 },
                 {
                   label: "SITE",
                   field: "fcy",
                   width: 100,
                 },
                 {
                   label: "CHECKED-IN DATE",
                   field: "lastchkind",
                   width: 150,
                   format: value => this.dateFormatter(value),
                 },
                 {
                   label: "CHECKED-IN TIME",
                   field: "lastchkint",
                   width: 150,
                   format : value => this.TimeFormatter(value),
                 },

                 ],
    }


    }

 dateFormatter = (cell, row)  =>
 { return
    
    ( <span>{moment(cell).format("DD-MM-YYYY")}</span> )
 }


 TimeFormatter = (cell, row)  =>
 { return
    
    ( <span>{splitTime(cell)}</span> )
 }


  render() {

   
    const routeData = {
      columns : this.state.columns,
      rows: this.props.railcarChecedInlist
    };

    return (
                <Card>
                  <CardBody>
                    <div className="gap">
                    </div>
                    <div className="page-title-box pb-0 d-flex align-items-center justify-content-b">
                                          <h4 className="mb-0">LIST OF CHECKED-IN RAILCARS</h4>

                                        </div>
                                         <hr className="my-2" />

                    <MDBDataTable striped bordered
                      paging= {false}
                      maxHeight="370px"
                      scrollY
                      data={routeData}
                      entriesLabel=""
                      info={false}
                      className = 'railcarList'
                    />
                  </CardBody>
                </Card>
    );
  }
}

export default RailCarCheckInList;
