import React, { Component } from "react";
import { Card, CardBody, Container, Row, Col, Button } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import SelectSite from "./Components/SelectSite";
import { fetchLvsList } from '../../service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import RailCarCheckInList  from './RailCarCheckInList_backup';
import "./checkIn.scss";

class LVS extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sites : [],
        selectedSite : '',
        CheckInList : [],
        CheckOutList : [],
        CheckAvailList : [],

    };
  }


   componentDidMount() {
     
      var user = JSON.parse(localStorage.getItem("authUser"));
       Promise.all([fetch('http://tmsportal.tema-systems.com:8082/api/v1/transport/usrsites?user='+ user.username)])
      .then(([res1]) => {
        return Promise.all([res1.json()])
      }).then(([res1]) => {
                this.setState({
                   sites: res1
                });
              });
    this.ReloadData();
}


   setCurrentSite = selectedOption => {

      this.setState({
        selectedSite: selectedOption
      });
    }


    OnCheckInClicked = selectedRailCar => {

      
      fetch('http://tmsportal.tema-systems.com:8082/api/v1/rail/Checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedRailCar)
      }).then((response) => {
        
       this.handleErrors(response);
      }).then(function (response) {

      }).then(() => {
         
        this.ReloadData();
      }).then(() => {
        this.notifySucess("RailCar Checked-In Sucessfully");
      }).catch(error => {

        this.notifyError("Failed to CheckIn");
      });

    }

      handleErrors = (response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        }



    ReloadData = () => {
   //  
    fetchLvsList()
             .then(([res1]) => {
               this.setState({
                 CheckInList: res1,

               });
             }).then(() => {

             }).catch(error => {

             });
    }




  handleSiteChange = selectedOption => {
        
        
        this.setCurrentSite(selectedOption);
       fetchLvsList(selectedOption)
         .then(([res1, res2, res3]) => {
           this.setState({
             CheckInList: res1,
           });
         }).then(() => {

         }).catch(error => {

         });
     };

 notifySucess = (message) => toast.success(message, { autoClose: 3000 });

 notifyError = (message) => toast.error(message, { autoClose: 3000 });

  render() {
    const routeData = {
      columns: [
        {
          label: "LVS NO",
          field: "lvsno",
          width: 130,
        },
        {
          label: "LVS Date",
          field: "iptdate",
          width: 130,
        },
        {
          label: "SITE",
          field: "site",
          width: 130,
        },
        {
                  label: "VR NO",
                  field: "vrno",
                  width: 130,
                },
        {
          label: "VR DATE",
          field: "vrdate",
          width: 150,
        },
        {
          label: "CHECKED-IN TIME",
          field: "time",
          width: 150,
        }
      ],
      rows: [
        {
           railcar : "ACFX 78674",
           desc : "",
           site : "STCA1",
           date :   "10-02-2022",
           time :  "10:00"
        },
        {
           railcar : "GATX008841",
                     desc : "",
                     site : "STCA1",
                     date :   "10-02-2022",
                     time :  "11:00"
        },
         {
                   railcar : "GATX008842",
                             desc : "",
                             site : "STCA1",
                             date :   "10-02-2022",
                             time :  "09:00"
                },
          {
                    railcar : "GATX008843",
                              desc :  "",
                              site : "STCA1",
                              date :   "10-02-2022",
                              time :  "10:40"
                 },
           {
                     railcar : "GATX008844",
                               desc :  "",
                               site : "STCA1",
                               date :   "10-02-2022",
                               time :  "14:00"
                  },
      ],
    };
    return (
      <React.Fragment>
        <div className="page-content">
         <ToastContainer />
          <Container fluid>
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>


                    <RailCarCheckInList
                    lvsList = {this.state.CheckInList}
                    sites = {this.state.sites}

                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default LVS;
