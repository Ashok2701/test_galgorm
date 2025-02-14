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
               alert : false,
                   errorMessage: '',
                 addAlertShow : false,
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
              prodDesc : item.prodDesc,
              toallqty : item.toallqty,
              availqty : item.availqty,
              shortqty : item.shortqty,
              allqty :  item.allqty,
              unit : item.unit,
              lotflg : item.lotflg,
              bcount : item.bcount,
              allstatus : item.allstatus,


            });
          } else {
            // If the group exists, add the quantity to it.
            result[index].toallqty += item.toallqty;
          }

          return result;
        }, []);


        }


   getDatabyStaggingLocations = () => {

    if(this.props.StaggingFromLoc && this.props.StaggingFromLoc.length > 0) {

        this.props.getDatabyStaggingLocations(this.props.vrdata.xnumpc);
    }
    else {

           this.setState({

                                                                                                                                   errorMessage: 'Please select From Location Type',
                                                                                                                                   addAlertShow: true,
                                                                                                                                    })
    }
   }

   AllocateData = () => {

    this.props.SubmitforAllocation(this.props.vrdata.fcy, this.props.vrdata.xnumpc)
   }


   getLotDetailsbyProdSite = (prod) => {
     console.log("inside to Allication tab");
      this.props.getLotDetailsbyProdSite(this.props.vrdata.fcy,prod, this.props.vrdata.xnumpc)
   }



     OnStaggingFromLocChanged = (event, newValue) => {
       console.log("stagging event =", event);
     //   console.log("stagging index =", index);
        console.log("stagging newvalue =", newValue);
        let index = -1;

      //  this.props.toStaggingLocationList && this.props.toStaggingLocationList
 if(this.props.toStaggingLocationList) {

        this.props.toStaggingLocationList && this.props.toStaggingLocationList.length > 0 && this.props.toStaggingLocationList.map((docs, i) => {

             if(newValue === docs.children[0].value) {
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
        //console.log("stagging newvalue =", newValue);

   let index = -1;

      //  this.props.toStaggingLocationList && this.props.toStaggingLocationList
 if(this.props.toStaggingLocationList2) {

        this.props.toStaggingLocationList2 && this.props.toStaggingLocationList2.length > 0 && this.props.toStaggingLocationList2.map((docs, i) => {

             if(newValue === docs.children[0].value) {
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

OnStaggingToLocChanged  = (event, newValue) => {


      let index = -1;

           //  this.props.toStaggingLocationList && this.props.toStaggingLocationList
      if(this.props.toStaggingLocationList) {

            this.props.toStaggingLocationList && this.props.toStaggingLocationList.length > 0 && this.props.toStaggingLocationList.map((docs, i) => {

                  if(newValue === docs.children[0].value) {
                     index = i;
                  }
          })
          }

                                  console.log("stagging newvalue =", newValue);
                                  if (newValue == null) {
                                     }
                                   else {

                                      this.props.OnChangeToStagginLocation(newValue, this.props.vrdata.fcy, index);
                                   }

                                  // this.props.handleSiteChange(newValue.id);
  };


  OnStaggingToLocChanged2  = (event, newValue) => {
                                    console.log("stagging newvalue =", newValue);

   let index = -1;

      //  this.props.toStaggingLocationList && this.props.toStaggingLocationList
 if(this.props.toStaggingLocationList2) {

        this.props.toStaggingLocationList2 && this.props.toStaggingLocationList2.length > 0 && this.props.toStaggingLocationList2.map((docs, i) => {

             if(newValue === docs.children[0].value) {
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


    addAlertClose  = () => {

       this.props.CloseLotdetails();
       this.setState({ addAlertShow: false });

    }


    render() {
    console.log("allocation stagging location", this.props.toStaggingLocationList);

    let filterDetailedProd;
    let filterGlobalProd;
    let filterStaggingFromLoc = [];
    let filterStaggingToLoc = [];
     let filterStaggingFromLoc2 = [];
        let filterStaggingToLoc2 = [];
 //let addAlertClose = () => this.setState({ addAlertShow: false });

    if(this.props.toPickDataList) {
           // console.log("T11 inside triplist",this.props.tripsList);
           filterDetailedProd = this.props.toPickDataList.filter(
            (docs) => {
                 console.log("T222 inside docs",docs);
                 console.log("T11 state of docs ",docs.children[9].value);
                     // console.log("T11 inside triplist - openRecrods");
                   return  (docs.children[9].value === "Detailed" || docs.children[9].value === "Global");

     })
     }


     if(this.props.toStaggingLocationList) {

        this.props.toStaggingLocationList && this.props.toStaggingLocationList.length > 0 && this.props.toStaggingLocationList.map((docs, i) => {
             let templist = {};
             templist.id = docs.children[0].value;
             templist.ii = i;
            filterStaggingFromLoc.push(docs.children[0].value);
     })
     }


     if(this.props.StaggingFromLoc && this.props.StaggingFromLoc.length > 0) {

         if(this.props.toStaggingLocationList) {

                this.props.toStaggingLocationList && this.props.toStaggingLocationList.length > 0 && this.props.toStaggingLocationList.map((docs, i) => {

                    if(i >= this.props.StaggingFromLocIndex ) {
                     let templist = {};
                     templist.id = docs.children[0].value;
                     templist.ii = i;
                    filterStaggingToLoc.push(docs.children[0].value);
                    }
             })
             }
     }

          if(this.props.toStaggingLocationList2) {

             this.props.toStaggingLocationList2 && this.props.toStaggingLocationList2.length > 0 && this.props.toStaggingLocationList2.map((docs, i) => {
                  let templist = {};
                  templist.id = docs.children[0].value;
                  templist.ii = i;
                 filterStaggingFromLoc2.push(docs.children[0].value);
          })
          }


          if(this.props.StaggingFromLoc2 && this.props.StaggingFromLoc2.length > 0) {

              if(this.props.toStaggingLocationList2) {

                     this.props.toStaggingLocationList2 && this.props.toStaggingLocationList2.length > 0 && this.props.toStaggingLocationList2.map((docs, i) => {

                         if(i >= this.props.StaggingFromLoc2Index ) {
                          let templist = {};
                          templist.id = docs.children[0].value;
                          templist.ii = i;
                         filterStaggingToLoc2.push(docs.children[0].value);
                         }
                  })
                  }
          }




       let Arraytempglobaldoc = [];


      if(this.props.toPickDataList) {
                // console.log("T11 inside triplist",this.props.tripsList);
             this.props.toPickDataList && this.props.toPickDataList.length > 0 && this.props.toPickDataList.map((docs) => {
                      console.log("T222 inside docs",docs);
                      let tempglobaldoc = {};
                      console.log("T11 state of docs ",docs.children[9].value);
                          // console.log("T11 inside triplist - openRecrods");


                             tempglobaldoc.prod =  docs.children[3].value;
                             tempglobaldoc.prodDesc =   docs.children[4].value;
                             tempglobaldoc.toallqty =   docs.children[5].value;
                             tempglobaldoc.availqty =   docs.children[6].value;
                             tempglobaldoc.shortqty =   docs.children[8].value;
                              tempglobaldoc.allqty =  docs.children[7].value;
                              tempglobaldoc.allstatus =  docs.children[9].value;
                               tempglobaldoc.currloc =  docs.children[11].value;
                                tempglobaldoc.unit =  docs.children[13].value;
                                 tempglobaldoc.lotflg =  docs.children[14].value;
                                   tempglobaldoc.bcount =  docs.children[15].value;
                        console.log("global temp", tempglobaldoc)
                        Arraytempglobaldoc.push(tempglobaldoc);

          })
            console.log("global temparray", Arraytempglobaldoc)
               // filterGlobalProd = this.groupAndSumData(Arraytempglobaldoc);
                  console.log("global temparray fitler ", filterGlobalProd)
          }

     if(Arraytempglobaldoc) {
    let groupedData = Arraytempglobaldoc.reduce((result, item) => {
          let index = result.findIndex((group) => group.prod === item.prod);

          if (index === -1) {
            // If the group doesn't exist, create a new one.
            result.push({
              prod: item.prod,
              prodDesc : item.prodDesc,
              toallqty : parseInt(item.toallqty),
              availqty : item.availqty,
              shortqty : parseInt(item.shortqty),
              allqty :  parseInt(item.allqty),
              allstatus : item.allstatus,
              unit : item.unit,
              lotflg : item.lotflg,
               bcount : item.bcount,
              currloc  : item.currloc


            });
          } else {
            // If the group exists, add the quantity to it.
            result[index].toallqty += parseInt(item.toallqty);
            result[index].allqty += parseInt(item.allqty);
             result[index].shortqty += parseInt(item.shortqty);
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
                                     <Row style={{backgroundColor : "currentcolor", height : "50px"}}>
                                                               <Col md="6" className="d-flex align-items-center">
                                                                 <CardTitle className="h1 mb-0 " style={{color : "white"}}>
                                                                   Allocation
                                                                 </CardTitle>
                                                               </Col>
                                     </Row>
                                                    <Row style={{marginTop : "15px"}}>
                                                      <Col md='3' sm='12'>
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
                                                      <Col md='3' sm='12'>
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
                                                      <Col md='3' sm='12'>
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
                                                      <Col md='3' sm='12'>
                                                        <FormGroup>
                                                          <Label >Vehicle</Label>
                                                          <Input
                                                            name='concode'
                                                            id='concode'
                                                             value={this.props.vrdata && this.props.vrdata.codeyve  + "-" + this.props.vrdata.vehicleName}
                                                            disabled={true}
                                                          />
                                                        </FormGroup>
                                                      </Col>
                                                    </Row>
             <Row style={{marginTop : "10px"}}>
                                                 <Col md='3'>
                                                                                                   <Autocomplete
                                                                                                         onChange={this.OnStaggingFromLocChanged}

                                                                                                         id="Selectsite"
                                                                                                         //sx={{ width: 200 }}
                                                                                                         options={filterStaggingFromLoc}
                                                                                                        // autoHighlight
                                                                                                         value = {this.props.StaggingFromLoc}
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
                                                                                                                                                          value = {this.props.StaggingToLoc}
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
                                                           value = {this.props.StaggingFromLoc2}
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
                                                                                                value = {this.props.StaggingToLoc2}
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
                                                        <Row style={{marginTop : "10px"}}>

                                                      <Col md='12' sm='12'>
                                                       <Button
                                                                              color="primary"
                                                                              type="button"
                                                                              className="waves-effect waves-light mr-1"
                                                                              style={{float : 'right'}}
                                                                              onClick = {this.getDatabyStaggingLocations}
                                                                            >
                                                                              Apply
                                                                            </Button>


                </Col>
             </Row>
      <Row style={{ marginTop : "20px"}}>
      <Col>
                <div className="d-flex justify-content-between align-items-center">
                             <Nav tabs className="nav-tabs-custom nav-justified">
                                                              <NavItem>


                                                                                                                         <Button   style={{ cursor: "pointer", textWrap : 'nowrap', backgroundColor : this.state.activeTab === 'Detailed' ? 'darkgreen' : 'darkseagreen' , marginRight : "10px"}}
                                                                                                                                                                                                className={classnames({
                                                                                                                                                                                                  active: this.state.activeTab === "Detailed",
                                                                                                                                                                                                })}
                                                                                                                                       onClick={() => this.toggleTab('Detailed')}
                                                                                                                                     >
                                                                                                                                       Pick Ticket Details
                                                                                                                                     </Button>


                                                                                                                     </NavItem>
                                                                                                                     <NavItem style={{ paddingRight : "10px"}}>
                                                                                                                               <Button   style={{ cursor: "pointer", textWrap : 'nowrap', backgroundColor : this.state.activeTab === 'Global' ? 'darkgreen' : 'darkseagreen' , marginRight : "10px" }}
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
                                toPickDataList = {filterDetailedProd}
                                vrdata={this.props.vrlist}
                             />
                             <LVSToAllocationGlobalTab
                               toPickDataList = {filterGlobalProd}
                               vrdata={this.props.vrlist}
                               getLotDetailsbyProdSite = {this.getLotDetailsbyProdSite}
                               toLogDataList = {this.props.toLogDataList}
                             />
                            </TabContent>
            </Col>
                       </Row>
             <Row style={{textAlign : "right", marginRight : "20px"}}>
             <Col>
              <div>
                        {this.props.vrdata.allocationflg === 2 ? '' :
                                    <Button onClick={this.AllocateData} style={{marginRight : "10px"}}>Allocate</Button>
                                    }

                                     <Button onClick={this.props.onHideToPickLVSShow} style={{marginLeft : "10px"}}>Close</Button>
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