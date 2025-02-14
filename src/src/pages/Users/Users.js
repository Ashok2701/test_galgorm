import React, { Component } from 'react';
import {Box, Typography} from "@mui/material";
import moment from 'moment';
import { Card, CardBody, Container, Row, Col, Button } from "reactstrap";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
// import images
import logodark from "../../assets/images/KuehneLogo200.jpg";
import {mockData} from './mockdata';

class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : "",
            sites: null,
            users : null,
       }
       //end of state
             console.log("inside Auth/Login.js");
    }


   render() {

    const routeData = {
     columns : [
     {field : "rowid", headerName : "ID"},
     {field : "xlogin", headerName : "Login ID" , flex : 1},
      {field : "xusrname", headerName : "User Name" , flex : 1},
       {field : "xact", headerName : "Active" , flex : 1},
     {field : "email", headerName : "Email " , flex : 1},
  {field : "lngmain", headerName : "Primany Lang" , flex : 1},
   {field : "lansec", headerName : "Secondary Lang" , flex : 1}
     ]
     };
     return (
        <React.Fragment>
                        <div style={{display : "flex" , justifyContent : "space-between" }}>
                                <h3>Users Management</h3>

                                    <Link
                                                          to="/Users/create"

                                                        >
                                                           <button type="button" style={{ backgroundColor : "#55a098", border : "none",padding : "2px" ,color : "#fff"}}  onClick={() => this.OnGroupLockingTrips()}>Create User</button>

                                                        </Link>

                                </div>
                                <Box m="40px 0 0 0" height="69vh"
                                sx = {{
                                   "& .MuiDataGrid-root" : {
                                       border : "none"
                                   },
                                   "& .MuiDataGrid-cell" : {
                                       borderBottom : "none"
                                                                      },
                                 "& .name-column--cell" : {
                                     color : "#fffff"
                                        },
                                  "& .MuiDataGrid-columnHeaders" : {
                                     backgroundColor : "#55a098",
                                     color : "#fff",
                                     borderBottom : "none"
                                                                                                       },
                                  "& .MuiDataGrid-footerContainer" : {
                                     backgroundColor : "#55a098",
                                     color : "#fff",
                                     borderTop : "none"
                                                                                                       },
                                   "& .MuiTablePagination-root" : {
                                        color : "#fff",
                                   },
                                 "& .MuiDataGrid-toolbarContainer .MuiButton-text" : {
                                         color : "#8c8989"
                                     },
                                }}
                                >
                                <DataGrid
                                  rows = {this.props.users &&  this.props.users}
                                  columns = {routeData.columns}
                                  getRowId={(row: any) =>  row.rowid}
                                  components = {{Toolbar : GridToolbar}}
                                />
                                </Box>
                              </React.Fragment>

        )
    }
}
export default (UsersList);