import React, { Component } from "react";
import {  CardBody, Container } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import SelectSite from "./Components/SelectSite";
import CheckInHeader  from './CheckInHeader';
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, Badge, Table, FormGroup } from 'reactstrap'

import Select from 'react-select'
import { fetchRailCarAPI } from '../../service';

import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import "./trackinv.scss";
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
                   name: "LOCATION",
                   selector: "location",

                 },
                 {
                                    name: "LICENCE PLATE NUMBER ",
                                    selector: "licplatenumber",

                                  },
                 {
                      name: "LOC TYPE",
                      selector: "loctype",

                                  },
                  {
                       name: "LOC CATEGORY",
                       selector: "loccateg",

                     },
                   {
                           name: "STORAGE LOCATION",
                           selector: "storateLocation",

                       },
                   {
                                              name: "PRODUCT",
                                              selector: "product",

                         },
                   {
                       name: "DESCRIPTION",
                       selector: "proddesc",

                                            },
                   {
                        name: "UN",
                        selector: "unit",

                     },
                    {
                       name: "PAC QUANTITY",
                       selector: "pacunit",
                        cell: row => {
                                                   return (

                                                       parseInt(row.pacunit)

                                                   )
                                                 }
                                        },
                    {
                                           name: "PAC-STK CONV ",
                                           selector: "pacstk",
                                           cell: row => {
                                                 return (  parseFloat(row.pacstk).toFixed(2)

                                                              )
                                                                                                                                     }

                                                            },
                  {
                                         name: "STK QUANTITY ",
                                         selector: "stkqty",
                                          cell: row => {
                                                                                            return (

                                                                                                parseInt(row.stkqty)

                                                                                            )
                                                                                          }

                                                          },
                   {
                                          name: "STK UNIT ",
                                          selector: "unit",

                           },
                     {
                            name: "STATUS",
                            selector: "status",

                        }

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
    console.log("inside dateformater",cell +'---'+row)
    ( <span>{moment(cell).format("DD-MM-YYYY")}</span> )
 }


 TimeFormatter = (cell, row)  =>
 { return
    console.log("inside time formater",cell +'---'+row)
    ( <span>{splitTime(cell)}</span> )
 }






  render() {

   console.log("inside RailcarcheckI list,",this.props.lvsList);
    const routeData = {
      columns : this.state.columns,
      rows: this.props.lvsList
    };

    const customStyles =  {
       headCells: {
         style: {
           color: 'green',
         },
       },
       cells: {
         style: {
           color: 'darkgrey',
         },
       },
     };


    return (
                <Card>
                  <CardBody>
                    <CheckInHeader
                                         sites = {this.props.sites}
                                         handleSiteChange={this.props.handleSiteChange}
                                         OnCheckInClicked= {this.OnCheckInClicked}
                                         loctype = {this.props.loctype}
                                         selectedLoctype = {this.props.selectedLoctype}
                                         changeLocationType = {this.props.changeLocationType}
                                         handleFilter = {this.props.handleFilter}
                                         searchValue = {this.props.searchValue}
                                         emptyflg = {this.props.emptyflg}
                                         fullflg = {this.props.fullflg}
                                         occupiedflg = {this.props.occupiedflg}
                                         handleEmptyChange = {this.props.handleEmptyChange}
                                         handleOccupiedChange = {this.props.handleOccupiedChange}
                                         handleFullChange = {this.props.handleFullChange}

                                       />

                                         <hr className="my-2" />

                    <DataTable
                                 noHeader
                                 pagination
                                 data={routeData.rows}
                                 columns={this.state.columns}
                                 customHeaders={[
                                     {
                                       style: {
                                         backgroundColor: "green",
                                         color: "#000"
                                       }
                                       }
                                   ]}
                                 paginationPerPage={15}
                                 className='react-dataTable'
                                  paginationRowsPerPageOptions={[15, 25, 50, 100]}
                               />
                  </CardBody>
                </Card>
    );
  }
}

export default RailCarCheckInList;
