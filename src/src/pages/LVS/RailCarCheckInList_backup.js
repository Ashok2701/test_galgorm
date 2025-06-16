import React, { Component } from "react";
import {  CardBody, Container } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import SelectSite from "./Components/SelectSite";
import CheckInHeader  from './CheckInHeader';
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, Badge, Table, FormGroup } from 'reactstrap'

import { fetchRailCarAPI } from '../../service';

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
} from './converterFunctions/converterFunctions';

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
                   name: "LVS NUMBER",
                   selector: "lvsno",
                    sortable: true,
                         minWidth: '220px',
                         cell: row => {
                           return (
                             <Link to={`/operation/lvs/${row.lvsno}`}>
                               {row.lvsno}
                             </Link>
                           )
                         }

                 },
                   {
                      name: "SCHEDULED DATE",
                                    selector: "iptdate",
                                     cell: row => {
                                                                                                                      return (
                                                                                                                        moment(row.iptdate).format('DD-MM-YYYY')
                                                                                                                      )
                                                                                                                    }
                                  },
                   {
                                                                          name: "STATUS",
                                                                          selector: "loadflg",
                                                                           sortable: true,
                                                                                minWidth: '150px',


                                                                        },
                 {
                   name: "VR NUMBER",
                   selector: "vrno",

                 },
                 {
                   name: "SITE",
                   selector: "fcy",

                 },
                 {
                   name: "VR DATE",
                   selector: "vrdate",
                       cell: row => {
                                                                                                                                         return (
                                                                                                                                           moment(row.iptdate).format('DD-MM-YYYY')
                                                                                                                                         )
                                                                                                                                       }
                 },
                  {
                                    name: "VEHICLE",
                                    selector: "vehicle",

                                  },
                   {
                                     name: "DRIVER",
                                     selector: "driver",

                                   },
                    {
                                                        name: "VALIDATION",
                                                        selector: "valflg",

                                                      },


                 ],
    }


    }


/*
   status  = (sta) =>  {

        1: return { title: 'Scheduled', color: 'light-info' },
        2: return { title: 'On the way', color: 'light-primary' },
        3: return { title: 'In-Progress', color: 'light-primary' },
        4: return { title: 'Completed', color: 'light-success' },
        5: return { title: 'Skipped', color: 'light-warning' },
        6: return { title: 'Re-Scheduled', color: 'light-warning' },
        7: return { title: 'Cancelled', color: 'light-danger' },
        8: return { title: 'To-Plan', color: 'light-dark' }
      }
      */

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
      rows: this.props.lvsList
    };

    return (
                <Card>
                  <CardBody>
                    <CheckInHeader
                                         sites = {this.props.sites}
                                         handleSiteChange={this.handleSiteChange}
                                         OnCheckInClicked= {this.OnCheckInClicked}

                                       />

                                         <hr className="my-2" />

                    <DataTable
                                 noHeader
                                 pagination
                                 data={routeData.rows}
                                 columns={this.state.columns}
                                 paginationPerPage={10}
                                 className='react-dataTable'
                                  paginationRowsPerPageOptions={[10, 25, 50, 100]}
                               />
                  </CardBody>
                </Card>
    );
  }
}

export default RailCarCheckInList;
