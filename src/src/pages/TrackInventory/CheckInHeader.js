import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import Alert from './Alert';
import { Link } from "react-router-dom";
import SelectSite from "./Components/SelectSite";
import { fetchRailCarAPI } from '../../service';
import Select1 from "./Components/Select";

import Select from 'react-select'
import Confirm from './Confirm';
import { ToastContainer, toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Row, Col, Label, Container,Card, Input, Badge, CardHeader, CardTitle, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Button, FormGroup, CustomInput  } from 'reactstrap'

import Flatpickr from 'react-flatpickr'
import "flatpickr/dist/themes/material_green.css"
import "./trackinv.scss";

class CheckInHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sites : [],
        selectedSite : '',
        selectedRailCar : '',
        selectedLocType : {},
        confirmMessage : '',
        addConfirmShow : false,
        addAlertShow: false,
        errorMessage: '',
        error: false,
        CheckInList : [],
        CheckOutList : [],
        CheckAvailList : [],
        selectedSite : '',
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


      OnChangeLocationType = (event) => {
              console.log("newvalue =", event);
              this.props.changeLocationType(event);
              this.setState({
                 selectedLocType : event
              })
            }


       emptyFilter = (event) => {
           console.log("is cleared", event)

       }



  render() {

   let addAlertClose = () => this.setState({ addAlertShow: false });
  console.log("Seleted Loc Type", this.props.selectedLoctype)

  const dynamicdata = [];



    return (
  <div className="w-100">
        <Row>
          <Col sm='12'>
            <Card>
              <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                <CardTitle tag='h4'>Track Vehicle Inventory</CardTitle>

              </CardHeader>
              <Row className='justify-content-between mx-0'>

                 <FormGroup>
                                   <Select1
                                     id='deliverymode'
                                     classNamePrefix='select'
                                     placeholder='Select Site'
                                     data={this.props.sites}
                                     isClearable
                                     value={this.props.sites.filter((d) => d.value === this.state.selectedSite)}
                                     onModeChange={this.props.handleSiteChange}

                                   />
                                 </FormGroup>


               <FormGroup style={{width : "250px"}}>
                                     <Select
                                       id='x3user'
                                       classNamePrefix='select'
                                       name='location'
                                       options = {this.props.loctype}
                                       value={this.state.selectedLoctype}
                                       onChange={this.OnChangeLocationType}
                                       placeholder='Select Location Type'
                                       isClearable = {this.emptyFilter}
                                       style={{width : "250px"}}
                                        />
                                   </FormGroup>



                <Col md='5' lg='3' className='mt-1'>
                               <FormGroup>
                                 <Input
                                   className='dataTable-filter mb-50'
                                   type='text'
                                   placeholder='Search'
                                   id='search-input'
                                   value={this.props.searchValue}
                                   onChange={this.props.handleFilter}
                                 />
                               </FormGroup>
                             </Col>
                 <Col md='2' lg='2' className='mt-1 d-flex'>
                 <FormGroup>
                                            <CustomInput
                                                                       inline
                                                                       type='checkbox'
                                                                       id='empty'
                                                                       name="empty"
                                                                       label='Empty'
                                                                       style={{height: "30px", width: "40px"}}
                                                                       checked = {this.props.emptyflg}
                                                                       onChange = {this.props.handleEmptyChange}

                                                                     />
                                                </FormGroup>
                                 <FormGroup>
                                                             <CustomInput
                                                                                        inline
                                                                                        type='checkbox'
                                                                                        id='occupied'
                                                                                        name="occupied"
                                                                                        label='Occupied'
                                                                                         style={{height: "30px", width: "40px"}}
                                                                                        checked = {this.props.occupiedflg}
                                                                                        onChange = {this.props.handleOccupiedChange}

                                                                                      />
                                                                </FormGroup>
                               <FormGroup>
                                                             <CustomInput
                                                                                        inline
                                                                                        type='checkbox'
                                                                                        id='full'
                                                                                        name="full"
                                                                                        label='Full'
                                                                                         style={{height: "30px", width: "40px"}}
                                                                                        checked = {this.props.fullflg}
                                                                                        onChange = {this.props.handleFullChange}

                                                                                      />  </FormGroup>

                     </Col>

              </Row>
            </Card>
            </Col>
          </Row>
       </div>

    );
  }
}
export default CheckInHeader;
