import React, { Component } from 'react';
import {Box, Typography} from "@mui/material";
import moment from 'moment';
import UsersList from './Users';
import { Card, CardBody, Container, Row, Col, Button } from "reactstrap";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import images
import logodark from "../../assets/images/logo-dark.png";
import {mockData} from './mockdata';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : "",
            sites: [],
            users : [],
       }
       //end of state
             console.log("inside Auth/Login.js");
    }


    componentDidMount() {

    console.log("DAsh index-  this.props.location.state.date",this.props.location.state);

          var user = JSON.parse(localStorage.getItem("authUser"));
           const currDate = moment(new Date().toDateString().replace(/-/g, '\/')).format('YYYY-MM-DD');
            console.log("T11 component did mount", this.state.date);
           Promise.all([fetch('http://localhost:3001/api/v1/transport/usrsites?user='+ user.username),fetch('http://localhost:3001/api/v1/transport/userslist')])
          .then(([res1, res2]) => {
            return Promise.all([res1.json() , res2.json()])
          }).then(([res1 , res2]) => {
                    this.setState({
                       sites: res1,
                       users : res2
                    });
                  });

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
                     <div className="page-content">

                       <Container fluid>
                         <Row>
                           <Col xs="12">
                             <Card>
                               <CardBody>
                                  <UsersList
                                   users = {this.state.users}
                                  />
                          </CardBody>
                                        </Card>
                                      </Col>
                                    </Row>
                                  </Container>
                                </div>
                              </React.Fragment>

        )
    }
}
export default (Users);