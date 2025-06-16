import React from 'react';
import Drops3 from './Drops3';
import TripList3 from './TripsList3';
import RouteMap1 from './RouteMap1';
import Alert from './Alert';
import moment from 'moment';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import 'moment-timezone';
import { withNamespaces } from 'react-i18next';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { AgGridReact } from "ag-grid-react";
import Checkbox from '@mui/material/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  ButtonGroup,
  Button,
  Input,
  Label,
  FormGroup,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import "../dashboard.scss";
import classnames from "classnames";
import LVSToAllocationDetailTab from './LVS_ToAllocation_DetailTab';
import LVSToAllocationGlobalTab from './LVS_ToAllocation_GlobalTab';

class LVSToAllocationTabs extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      activeTab: "Detailed",
      alert: false,
      errorMessage: '',
      allocatedStatus: 1,
      applyclicked: 0,
      addAlertShow: false,

    }
    this.toggleTab = this.toggleTab.bind(this);
  }


  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab

      });
    }
  }


  // group by product for Global allocation
  groupAndSumData = (Arraytempglobaldoc) => {
    let groupedData = Arraytempglobaldoc.reduce((result, item) => {
      let index = result.findIndex((group) => group.prod === item.prod);

      if (index === -1) {
        // If the group doesn't exist, create a new one.
        result.push({
          prod: item.prod,
          prodDesc: item.prodDesc,
          toallqty: item.toallqty,
          availqty: item.availqty,
          shortqty: item.shortqty,
          allqty: item.allqty,
          unit: item.unit,
          lotflg: item.lotflg,
          bcount: item.bcount,
          allstatus: item.allstatus,


        });
      } else {
        // If the group exists, add the quantity to it.
        result[index].toallqty += item.toallqty;
      }

      return result;
    }, []);


  }


  getDatabyStaggingLocations = () => {

    if (this.props.StaggingFromLoc && this.props.StaggingFromLoc.length > 0) {

      this.props.getDatabyStaggingLocations(this.props.vrdata.xnumpc);
      this.setState({
        applyclicked: 1
      })
    }
    else {

      this.setState({

        errorMessage: 'Please select From Location Type',
        addAlertShow: true,
      })
    }
  }



  CloseAllocations = () => {

    this.props.onHideToPickLVSShow();
    this.setState({
      applyclicked: 0
    })



  }


  AllocateData = () => {

    if (this.state.applyclicked > 0) {
      this.props.SubmitforAllocation(this.props.vrdata.fcy, this.props.vrdata.xnumpc)
    }
    else {
      this.setState({

        errorMessage: 'Please Click on Apply Button before Allocation',
        addAlertShow: true,
      })
    }

  }


  getLotDetailsbyProdSite = (prod) => {
    
    this.props.getLotDetailsbyProdSite(this.props.vrdata.fcy, prod, this.props.vrdata.xnumpc)
  }


  changedAllocationStatus = (event, newvalue) => {
    
    

    var selectedOption = document.getElementById("mySelect").value;
    
    this.setState({
      allocatedStatus: selectedOption
    })

  }

  OnStaggingFromLocChanged = (event, newValue) => {
    
    //   
    
    let index = -1;

    //  this.props.toStaggingLocationList && this.props.toStaggingLocationList
    if (this.props.toStaggingLocationList) {

      this.props.toStaggingLocationList && this.props.toStaggingLocationList.length > 0 && this.props.toStaggingLocationList.map((docs, i) => {

        if (newValue === docs.children[0].value) {
          index = i;
        }
      })
    }
    // const index = this.props.toStaggingLocationList.indexOf(newValue);

    if (newValue == null) {
    }
    else {

      this.props.OnChangeFromStagginLocation(newValue, this.props.vrdata.fcy, index);
    }

    // this.props.handleSiteChange(newValue.id);

  };


  OnStaggingFromLocChanged2 = (event, newValue) => {
    //

    let index = -1;

    //  this.props.toStaggingLocationList && this.props.toStaggingLocationList
    if (this.props.toStaggingLocationList2) {

      this.props.toStaggingLocationList2 && this.props.toStaggingLocationList2.length > 0 && this.props.toStaggingLocationList2.map((docs, i) => {

        if (newValue === docs.children[0].value) {
          index = i;
        }
      })
    }


    if (newValue == null) {
    }
    else {

      this.props.OnChangeFromStagginLocation2(newValue, this.props.vrdata.fcy, index);
    }

    // this.props.handleSiteChange(newValue.id);

  };

  OnStaggingToLocChanged = (event, newValue) => {


    let index = -1;

    //  this.props.toStaggingLocationList && this.props.toStaggingLocationList
    if (this.props.toStaggingLocationList) {

      this.props.toStaggingLocationList && this.props.toStaggingLocationList.length > 0 && this.props.toStaggingLocationList.map((docs, i) => {

        if (newValue === docs.children[0].value) {
          index = i;
        }
      })
    }

    
    if (newValue == null) {
    }
    else {

      this.props.OnChangeToStagginLocation(newValue, this.props.vrdata.fcy, index);
    }

    // this.props.handleSiteChange(newValue.id);
  };


  OnStaggingToLocChanged2 = (event, newValue) => {
    

    let index = -1;

    //  this.props.toStaggingLocationList && this.props.toStaggingLocationList
    if (this.props.toStaggingLocationList2) {

      this.props.toStaggingLocationList2 && this.props.toStaggingLocationList2.length > 0 && this.props.toStaggingLocationList2.map((docs, i) => {

        if (newValue === docs.children[0].value) {
          index = i;
        }
      })
    }


    if (newValue == null) {
    }
    else {

      this.props.OnChangeToStagginLocation2(newValue, this.props.vrdata.fcy, index);
    }

    // this.props.handleSiteChange(newValue.id);
  };


  getAllocationStatusColor = (data) => {
    
    let Astatus = 1, dcount = 0, gcount = 0;
    const statusCounts = {};
    data.forEach(item => {
      // Get the status from each object
      const status = item.children[9].value;

      if (status === 'Detailed') {
        dcount = dcount + 1;
      }
      else {
        gcount = gcount + 1;
      }

      // If the status is not in the statusCounts object, initialize it to 1, otherwise, increment the count
      if (!statusCounts[status]) {
        statusCounts[status] = 1;
      } else {
        statusCounts[status]++;
      }
    });

    
    if (gcount > 0 && dcount === 0) {
      return '#ffb09c'
    }
    else if (gcount > 0 && dcount > 0) {
      return '#FFD966'
    }
    else {
      return '#80a65f'
    }
  }


  getAllocationStatus = (data) => {
    
    let Astatus = 1, dcount = 0, gcount = 0, shortageQtyFlg = 0;
    const statusCounts = {};
    data.forEach(item => {
      // Get the status from each object
      const status = item.children[9].value;
      const shotqty = parseFloat(item.children[8].value);


      if (shortageQtyFlg === 0) {
        if (shotqty > 0) {
          shortageQtyFlg = 1;
        }

      }

      if (status === 'Detailed') {
        dcount = dcount + 1;
      }
      else {
        gcount = gcount + 1;
      }

      // If the status is not in the statusCounts object, initialize it to 1, otherwise, increment the count
      if (!statusCounts[status]) {
        statusCounts[status] = 1;
      } else {
        statusCounts[status]++;
      }
    });


    if (data.length > 0) {
      
      if (gcount > 0 && dcount === 0) {
        return 'NOT ALLOCATED'
      }
      else if (gcount > 0 && dcount > 0) {
        return 'PARTIALLY ALLOCATED'
      }
      else if (dcount > 0 && shortageQtyFlg > 0) {
        return 'PARTIALLY ALLOCATED'
      }
      else {
        return 'FULLY ALLOCATED'
      }

    }
    else {
      return '-'
    }
  }


  addAlertClose = () => {

    this.props.CloseLotdetails();
    this.setState({ addAlertShow: false });

  }


  render() {
    

    let filterDetailedProd;
    let filterGlobalProd;
    let filterStaggingFromLoc = [];
    let filterStaggingToLoc = [];
    let filterStaggingFromLoc2 = [];
    let filterStaggingToLoc2 = [];
    //let addAlertClose = () => this.setState({ addAlertShow: false });

    if (this.props.toPickDataList) {
      // 
      filterDetailedProd = this.props.toPickDataList.filter(
        (docs) => {
          
          
          // 
          

          if (this.state.allocatedStatus === '2') {
            
            return (docs.children[9].value === "Detailed");
          }
          else if (this.state.allocatedStatus === '3') {
            
            return (docs.children[9].value === "Global");
          }
          else {
            
            return (docs.children[9].value === "Detailed" || docs.children[9].value === "Global");
          }

        })
    }


    if (this.props.toStaggingLocationList) {

      this.props.toStaggingLocationList && this.props.toStaggingLocationList.length > 0 && this.props.toStaggingLocationList.map((docs, i) => {
        let templist = {};
        templist.id = docs.children[0].value;
        templist.ii = i;
        filterStaggingFromLoc.push(docs.children[0].value);
      })
    }


    if (this.props.StaggingFromLoc && this.props.StaggingFromLoc.length > 0) {

      if (this.props.toStaggingLocationList) {

        this.props.toStaggingLocationList && this.props.toStaggingLocationList.length > 0 && this.props.toStaggingLocationList.map((docs, i) => {

          if (i >= this.props.StaggingFromLocIndex) {
            let templist = {};
            templist.id = docs.children[0].value;
            templist.ii = i;
            filterStaggingToLoc.push(docs.children[0].value);
          }
        })
      }
    }

    if (this.props.toStaggingLocationList2) {

      this.props.toStaggingLocationList2 && this.props.toStaggingLocationList2.length > 0 && this.props.toStaggingLocationList2.map((docs, i) => {
        let templist = {};
        templist.id = docs.children[0].value;
        templist.ii = i;
        filterStaggingFromLoc2.push(docs.children[0].value);
      })
    }


    if (this.props.StaggingFromLoc2 && this.props.StaggingFromLoc2.length > 0) {

      if (this.props.toStaggingLocationList2) {

        this.props.toStaggingLocationList2 && this.props.toStaggingLocationList2.length > 0 && this.props.toStaggingLocationList2.map((docs, i) => {

          if (i >= this.props.StaggingFromLoc2Index) {
            let templist = {};
            templist.id = docs.children[0].value;
            templist.ii = i;
            filterStaggingToLoc2.push(docs.children[0].value);
          }
        })
      }
    }




    let Arraytempglobaldoc = [];


    if (this.props.toPickDataList) {
      // 
      this.props.toPickDataList && this.props.toPickDataList.length > 0 && this.props.toPickDataList.map((docs) => {
        
        let tempglobaldoc = {};
        
        // 


        tempglobaldoc.prod = docs.children[3].value;
        tempglobaldoc.prodDesc = docs.children[4].value;
        tempglobaldoc.toallqty = docs.children[5].value;
        tempglobaldoc.availqty = docs.children[6].value;
        tempglobaldoc.shortqty = docs.children[8].value;
        tempglobaldoc.allqty = docs.children[7].value;
        tempglobaldoc.allstatus = docs.children[9].value;
        tempglobaldoc.currloc = docs.children[11].value;
        tempglobaldoc.unit = docs.children[13].value;
        tempglobaldoc.lotflg = docs.children[14].value;
        tempglobaldoc.bcount = docs.children[15].value;
        

        if (this.state.allocatedStatus === '3') {

          if (tempglobaldoc.allstatus === 'Global') {
            Arraytempglobaldoc.push(tempglobaldoc);
          }
        }
        else if (this.state.allocatedStatus === '2') {

          if (tempglobaldoc.allstatus === 'Detailed') {
            Arraytempglobaldoc.push(tempglobaldoc);
          }
        }
        else {

          Arraytempglobaldoc.push(tempglobaldoc);
        }

      })
      
      // filterGlobalProd = this.groupAndSumData(Arraytempglobaldoc);
      
    }

    if (Arraytempglobaldoc) {
      let groupedData = Arraytempglobaldoc.reduce((result, item) => {
        let index = result.findIndex((group) => group.prod === item.prod);

        if (index === -1) {
          // If the group doesn't exist, create a new one.
          result.push({
            prod: item.prod,
            prodDesc: item.prodDesc,
            toallqty: parseInt(item.toallqty),
            availqty: item.availqty,
            shortqty: parseFloat(item.shortqty),
            allqty: parseInt(item.allqty),
            allstatus: item.allstatus,
            unit: item.unit,
            lotflg: item.lotflg,
            bcount: item.bcount,
            currloc: item.currloc


          });
        } else {
          // If the group exists, add the quantity to it.
          result[index].toallqty += parseInt(item.toallqty);
          result[index].allqty += parseInt(item.allqty);
          result[index].shortqty += parseFloat(item.shortqty);
        }

        return result;
      }, []);



      filterGlobalProd = groupedData;
    }






    return (
      <>
        <div class="Detailed">
          <Col sm='12'>
            <Form >
              <Card>
                <CardBody className="pt-1">
                  <Row style={{ backgroundColor: "currentcolor", height: "50px" }}>
                    <Col md="6" className="d-flex align-items-center">
                      <CardTitle className="h1 mb-0 " style={{ color: "white" }}>
                        Allocation
                      </CardTitle>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "15px" }}>
                    <Col md='2' sm='12'>
                      <FormGroup>
                        <Label >Vehicle Routing</Label>
                        <Input
                          name='concode'
                          id='concode'
                          value={this.props.vrdata && this.props.vrdata.xnumpc}
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                    <Col md='1' sm='12'>
                      <FormGroup>
                        <Label>Delivery Date</Label>
                        <Input
                          name='concode'
                          id='concode'
                          value={this.props.vrdata && moment(this.props.vrdata.datliv).format('MM/DD/YYYY')}
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                    <Col md='2' sm='12'>
                      <FormGroup>
                        <Label>Site</Label>
                        <Input
                          name='concode'
                          id='concode'
                          value={this.props.vrdata && this.props.vrdata.fcy + "-" + this.props.vrdata.siteName}
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                    <Col md='2' sm='12'>
                      <FormGroup>
                        <Label >Vehicle</Label>
                        <Input
                          name='concode'
                          id='concode'
                          value={this.props.vrdata && this.props.vrdata.codeyve + "-" + this.props.vrdata.vehicleName}
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                    <Col md='2' sm='12'>
                      <FormGroup>
                        <Label >Allocation Status</Label>
                        <Input
                          name='concode'
                          id='concode'
                          style={{ backgroundColor: this.getAllocationStatusColor(filterDetailedProd) }}

                          value={this.getAllocationStatus(filterDetailedProd)}
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                    <Col md='3' >
                      <FormGroup>
                        <Label >Filter By Allocation Status</Label>

                        <select id="mySelect" className="form-control"
                          onChange={this.changedAllocationStatus}
                        >
                          <option value="1">ALL</option>
                          <option value="2">Allocated</option>
                          <option value="3">Not Allocated</option>
                        </select>
                      </FormGroup>

                    </Col>

                  </Row>
                  <Row style={{ marginTop: "10px" }}>
                    <Col md='3'>
                      <Autocomplete
                        onChange={this.OnStaggingFromLocChanged}

                        id="Selectsite"
                        //sx={{ width: 200 }}
                        options={filterStaggingFromLoc}
                        // autoHighlight
                        value={this.props.StaggingFromLoc}
                        getOptionLabel={(option) => option}
                        /*  renderInput={(props, option) => (
                            <Box component="li"  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                                          {...props}>
                              {option.id}
                            </Box>
                          )}
                          */

                        renderInput={(params) =>
                          <TextField id="siteid"
                            {...params}
                            label="Location Type From"

                          />
                        }
                      />

                    </Col>
                    <Col md='3'>
                      <Autocomplete
                        onChange={this.OnStaggingToLocChanged}

                        id="Selectsite"
                        //sx={{ width: 200 }}
                        options={filterStaggingToLoc}
                        value={this.props.StaggingToLoc}
                        // autoHighlight
                        getOptionLabel={(option) => option}
                        /* renderInput={(props, option) => (
                           <Box component="li"  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                                         {...props}>
                             {option.id}
                           </Box>
                         )}
                         */
                        renderInput={(params) =>
                          <TextField id="siteid"
                            {...params}
                            label="Location Type To"

                          />
                        }
                      />

                    </Col>

                    <Col md='3'>
                      <Autocomplete
                        onChange={this.OnStaggingFromLocChanged2}

                        id="Selectsite"
                        //sx={{ width: 200 }}
                        options={filterStaggingFromLoc2}
                        value={this.props.StaggingFromLoc2}
                        autoHighlight
                        getOptionLabel={(option) => option}
                        /*  renderInput={(props, option) => (
                            <Box component="li"  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                                          {...props}>
                              {option.id}
                            </Box>
                          )} */
                        renderInput={(params) =>
                          <TextField id="siteid"
                            {...params}
                            label="Location From"

                          />
                        }
                      />

                    </Col>
                    <Col md='3' >
                      <Autocomplete
                        onChange={this.OnStaggingToLocChanged2}

                        id="Selectrailcar"
                        //sx={{ width: 200 }}
                        options={filterStaggingToLoc2}
                        autoHighlight
                        value={this.props.StaggingToLoc2}
                        getOptionLabel={(option) => option}
                        /*     renderInput={(props, option) => (
                               <Box component="li"  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                                             {...props}>
                                 {option.id}
                               </Box>
                             )}
                             */
                        renderInput={(params) =>
                          <TextField id="railcar"
                            {...params}
                            label="Location To "

                          />
                        }
                      />


                    </Col>
                  </Row>
                  <Row style={{ marginTop: "10px" }}>

                    <Col md='12' sm='12'>
                      <Button
                        color="primary"
                        type="button"
                        className="waves-effect waves-light mr-1"
                        style={{ float: 'right' }}
                        onClick={this.getDatabyStaggingLocations}
                      >
                        Apply
                      </Button>


                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col>
                      <div className="d-flex justify-content-between align-items-center">
                        <Nav tabs className="nav-tabs-custom nav-justified">
                          <NavItem>


                            <Button style={{ cursor: "pointer", textWrap: 'nowrap', backgroundColor: this.state.activeTab === 'Detailed' ? 'darkgreen' : 'darkseagreen', marginRight: "10px" }}
                              className={classnames({
                                active: this.state.activeTab === "Detailed",
                              })}
                              onClick={() => this.toggleTab('Detailed')}
                            >
                              Pick Ticket Details
                            </Button>


                          </NavItem>
                          <NavItem style={{ paddingRight: "10px" }}>
                            <Button style={{ cursor: "pointer", textWrap: 'nowrap', backgroundColor: this.state.activeTab === 'Global' ? 'darkgreen' : 'darkseagreen', marginRight: "10px" }}
                              className={classnames({
                                active: this.state.activeTab === "Global",
                              })}
                              onClick={() => this.toggleTab('Global')}
                            >
                              Item Summary
                            </Button>
                          </NavItem>
                        </Nav>

                      </div>

                      <hr className="my-0" />
                      <TabContent className="xl-tabcontent1" activeTab={this.state.activeTab}>
                        <LVSToAllocationDetailTab
                          toPickDataList={filterDetailedProd}
                          vrdata={this.props.vrlist}
                        />
                        <LVSToAllocationGlobalTab
                          toPickDataList={filterGlobalProd}
                          vrdata={this.props.vrlist}
                          getLotDetailsbyProdSite={this.getLotDetailsbyProdSite}
                          toLogDataList={this.props.toLogDataList}
                        />
                      </TabContent>
                    </Col>
                  </Row>
                  <Row style={{ textAlign: "right", marginRight: "20px" }}>
                    <Col>
                      <div>
                        {this.props.vrdata.allocationflg === 2 ? '' :
                          <Button onClick={this.AllocateData} style={{ marginRight: "10px" }}>Allocate</Button>
                        }

                        <Button onClick={this.CloseAllocations} style={{ marginLeft: "10px" }}>Close</Button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <Alert
                  show={this.state.addAlertShow}
                  onHide={this.addAlertClose}
                  errorMessage={this.state.errorMessage}
                ></Alert>
              </Card>
            </Form >
          </Col>
        </div>
      </>
    );
  }
}

export default withNamespaces()(LVSToAllocationTabs);