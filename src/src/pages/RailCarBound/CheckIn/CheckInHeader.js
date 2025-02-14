import React, { Component } from "react";
import { Card, CardBody, Container, Row, Col, Button } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import Alert from '../Panel/Alert';
import { Link } from "react-router-dom";
import SelectSite from "../Components/SelectSite";
import { fetchRailCarAPI } from '../../../service';
import Select from "../Components/Select";
import Confirm from './Confirm';
import { ToastContainer, toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import "./checkIn.scss";

class CheckInHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sites : [],
        selectedSite : '',
        selectedRailCar : '',
        confirmMessage : '',
        addConfirmShow : false,
        addAlertShow: false,
        errorMessage: '',
        error: false,
        CheckInList : [],
        CheckOutList : [],
        CheckAvailList : [],
        CurrentCheckinRailCar : {},

    };
  }


   setCurrentRailCar = selectedOption => {
     var currentCheckin = {};
     this.props.railcarAvaillist && this.props.railcarAvaillist.map(activeRailcar => {
         if(activeRailcar.railcarid == selectedOption){

         currentCheckin = activeRailcar;
            console.log("matched railcar",activeRailcar);
            console.log("matched selectedoption",selectedOption);
         }

     });
      this.setState({
        selectedRailCar: selectedOption,
        CurrentCheckinRailCar : currentCheckin
      });
    }

    handleRailCarChange = selectedOption => {
          console.log("Trrr selected Railcar change",selectedOption);
          this.setCurrentRailCar(selectedOption);

       }

     onConfirmNo = () => {
            this.setState({
                addConfirmShow: false
            })
        }

        onConfirmYes = () => {
           this.props.OnCheckInClicked(this.state.CurrentCheckinRailCar);
            this.setState({
                addConfirmShow: false
            })
        }



    onCheckIn = () => {
        console.log("Trrr site value =",this.state.selectedSite);
        console.log("Trrr railcar value =",this.state.selectedRailCar);
       if(this.state.selectedRailCar === '') {
         this.setState({
                                 errorMessage: 'Please Select the RailCar, before CheckIn',
                                 addAlertShow: true,
                                 error: true
                             });
       }
       else {

        this.setState({
                          confirmMessage: 'Are you sure to CheckIN , selected RailCar',
                          addConfirmShow: true,

                      })

       }

    }


     OnSiteChanged = (event, newValue) => {
        console.log("newvalue =", newValue);
        if (newValue == null) {
           }
         else
         this.props.handleSiteChange(newValue.id);
         this.setState({
            selectedSite : newValue.id
         })
      };


      OnRailCarChanged = (event, newValue) => {
              console.log("newvalue =", newValue);
              if (newValue == null) {
                 }
               else {
               this.handleRailCarChange(newValue.railcarid);
               }
            }



  render() {

   let addAlertClose = () => this.setState({ addAlertShow: false });


    return (
     <>
                    <div className="page-title-box pb-0 d-flex align-items-center justify-content-b">
                      <h4 className="mb-0">RAILCAR CHECK IN</h4>

                    </div>
                     <hr className="my-2" />
                    <div className="panel1">
                       <Grid item className="Sitegrid">
                                <span className="Selectsite">
                                 <Autocomplete
                                       onChange={this.OnSiteChanged}

                                       id="Selectsite"
                                       sx={{ width: 200 }}
                                       options={this.props.sites}
                                       autoHighlight
                                       getOptionLabel={(option) => option.id}
                                       renderInput={(props, option) => (
                                         <Box component="li"  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                                                       {...props}>
                                           {option.id}
                                         </Box>
                                       )}
                                       renderInput={(params) =>
                                         <TextField id="siteid"
                                           {...params}
                                           label="Choose a site"

                                         />
                                       }
                                     />
                                   </span>
                                       <span className="Select">
                                     <Autocomplete
                                                                            onChange={this.OnRailCarChanged}

                                                                            id="Selectrailcar"
                                                                            sx={{ width: 200 }}
                                                                            options={this.props.railcarAvaillist}
                                                                            autoHighlight
                                                                            getOptionLabel={(option) => option.railcarid}
                                                                            renderInput={(props, option) => (
                                                                              <Box component="li"  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                                                                                            {...props}>
                                                                                {option.railcarid}
                                                                              </Box>
                                                                            )}
                                                                            renderInput={(params) =>
                                                                              <TextField id="railcar"
                                                                                {...params}
                                                                                label="Choose a RailCar"

                                                                              />
                                                                            }
                                                                          />

                                                                          </span>


                                    <Button
                                                           color="primary"
                                                           type="button"
                                                           className="waves-effect waves-light mr-1"
                                                           style={{float : 'right'}}
                                                           onClick = {this.onCheckIn}
                                                         >
                                                           Check In
                                                         </Button>
                                                </Grid>
                         <Alert
                                                                   show={this.state.addAlertShow}
                                                                   onHide={addAlertClose}
                                                                   errorMessage={this.state.errorMessage}
                                                               ></Alert>
                           <Confirm
                                             show={this.state.addConfirmShow}
                                             onHide={this.onConfirmNo}
                                             lockConfirm={this.onConfirmYes}
                                             railcar={this.state.CurrentCheckinRailCar}
                                             confirmMessage={this.state.confirmMessage}

                                         ></Confirm>
                    </div>

              </>
    );
  }
}
export default CheckInHeader;
