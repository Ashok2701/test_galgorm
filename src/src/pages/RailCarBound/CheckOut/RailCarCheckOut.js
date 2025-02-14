import React, { Component } from "react";
import { Card, CardBody, Container, Row, Col, Button } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";
import SelectSite from "../Components/SelectSite";
import CheckOutBtnRenderer from './CheckOutBtnRenderer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RailCarCheckOutList from './RailCarCheckOutList';
import Select from "../Components/Select";
import Grid from '@material-ui/core/Grid';
import "./checkOut.scss";

class RailCarCheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
    CheckInListRailCar : [],
    searchString : '',
  }
  }

   componentDidMount() {

        var user = JSON.parse(localStorage.getItem("authUser"));

         Promise.all([fetch('http://tmsportal.tema-systems.com:8082//api/v1/rail/railEmptyList')])
        .then(([res1]) => {
          return Promise.all([res1.json()])
        }).then(([res1]) => {
                  this.setState({
                     CheckInListRailCar: res1,
                     searchString : '',
                  });
                });
  }



  OnRailCarCheckOut = selectedRailCar => {
      console.log("onCheckInClikced",selectedRailCar);
      fetch('http://tmsportal.tema-systems.com:8082//api/v1/rail/Checkout/railcar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedRailCar)
      }).then((response) => {
        console.log("inside after Railcarcheckin - response",response);
       this.handleErrors(response);
      }).then(function (response) {

      }).then(() => {

        this.ReloadData();
      }).then(() => {
        this.notifySucess("RailCar CheckOut Sucessfully");
      }).catch(error => {

        this.notifyError("Failed to CheckOut");
      });
  }


     handleErrors = (response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response;
          }


 updateSearchTerm = (event) => {
         this.setState({ searchString: event.target.value });
       }


     ReloadData =() => {
         Promise.all([fetch('http://tmsportal.tema-systems.com:8082//api/v1/rail/railEmptyList')])
              .then(([res1]) => {
                return Promise.all([res1.json()])
              }).then(([res1]) => {
                        this.setState({
                           CheckInListRailCar: res1
                        });
                      });
     }




 notifySucess = (message) => toast.success(message, { autoClose: 3000 });

 notifyError = (message) => toast.error(message, { autoClose: 3000 });


  render() {
   let filterCheckOutList;
      if(this.state.CheckInListRailCar){
                  filterCheckOutList = this.state.CheckInListRailCar.filter(
                      (drop) => {
                       return (((drop.railcarid.toLowerCase().indexOf(
                                                                     this.state.searchString.toLowerCase()
                                                                 ) !== -1) || (drop.des.toLowerCase().indexOf(
                                                                     this.state.searchString.toLowerCase()
                                                                 ) !== -1) || (drop.fcy.toLowerCase().indexOf(
                                                                     this.state.searchString.toLowerCase()
                                                                 ) !== -1) || (drop.lastemptd.toLowerCase().indexOf(
                                                                     this.state.searchString.toLowerCase()
                                                                 ) !== -1) || (drop.lastemptt.toLowerCase().indexOf(
                                                                     this.state.searchString.toLowerCase()
                                                                      ) !== -1)));

                                          });
                                          }

    return (
      <React.Fragment>
        <div className="page-content">
         <ToastContainer />
          <Container fluid>
            <Row>
              <RailCarCheckOutList
               CheckInList = {filterCheckOutList}
               OnCheckout = {this.OnRailCarCheckOut}
                updateSearchTerm = {this.updateSearchTerm}
              />
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default RailCarCheckOut;
