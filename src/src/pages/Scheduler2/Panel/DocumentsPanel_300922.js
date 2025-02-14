import React from 'react';
import Drops3 from './Drops3';
import TripList3 from './TripsList3';
import moment from 'moment';
import 'moment-timezone';
import { withNamespaces } from 'react-i18next';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { AgGridReact } from "ag-grid-react";
import Checkbox from '@mui/material/Checkbox';
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
class DocumentsPanel extends React.Component {

 constructor(props) {

        super(props);
         this.state = {
              activeTab: "Documents",
              ToPlanchecked : false,
              Todropchecked : false,
              ToPickchecked : false,
              Todayschecked : false,
               To5dayschecked : false,
              openRecords : false,
              ToShowinMap :false,
              OptimisedRecords : false,
              LockedRecords : false,
              ValidateRecords : false,
              }
          this.toggleTab = this.toggleTab.bind(this);
    }




      checkBoxChange = () => {
       console.log("T222 docpanel - to plan change");
                  this.setState({ ToPlanchecked: !this.state.ToPlanchecked });
                  this.props.checkedToPlan(!this.state.ToPlanchecked)
              }

       LockcheckBoxChange = () => {
              console.log("T222 docpanel - LockcheckBoxChange");
                         this.setState({ LockedRecords: !this.state.LockedRecords });
                         this.props.OnCheckedToLock(!this.state.LockedRecords)
                     }

       ValidatecheckBoxChange = () => {
              console.log("T222 docpanel - ValidatecheckBoxChange");
                         this.setState({ ValidateRecords: !this.state.ValidateRecords });
                         this.props.OnCheckedToValidate(!this.state.ValidateRecords)
                     }


       OnShowMapcheckBoxChange = () => {

                        console.log("T222 docpanel - Showin Map");
                         this.setState({ ToShowinMap: !this.state.ToShowinMap });
                        this.props.OnCheckedToShowoverMap(!this.state.ToShowinMap)

       }

      OpencheckBoxChange = () => {
             console.log("T222 docpanel - OpencheckBoxChange");
                        this.setState({ openRecords: !this.state.openRecords });
                        this.props.OnCheckedToOpen(!this.state.openRecords)
                    }

      OptimisecheckBoxChange = () => {
             console.log("T222 docpanel - OptimisecheckBoxChange");
                        this.setState({ OptimisedRecords: !this.state.OptimisedRecords });
                        this.props.OnCheckedToOptimise(!this.state.OptimisedRecords)
                    }

      OnDropscheckBoxChange = () => {
             console.log("T222 docpanel - to plan change");
                        this.setState({ Todropchecked: !this.state.Todropchecked });
                        this.props.OncheckedTodropList(!this.state.Todropchecked)
                    }

    OnPickupscheckBoxChange = () => {
             console.log("T222 docpanel - to plan change");
                        this.setState({ ToPickchecked: !this.state.ToPickchecked });
                        this.props.OncheckedToPickupList(!this.state.ToPickchecked)
                    }


  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
          Todayschecked : false
      });
    }
  }

    dayscheckBoxChange = () => {
         console.log("T222 docpanel - dayscheckbox change");
         this.setState({ Todayschecked: !this.props.documentPanel_5dayscheck });
         this.props.checked5daysfromDocumentPanel(!this.props.documentPanel_5dayscheck)

      }


    onDateselection = (date) => {
       console.log("T11 inside dateselection",date);
       const Seldate = moment(date[0]).format('YYYY-MM-DD');
       console.log("T11 inside dateselection",Seldate);
           this.props.documentPanelDateChange(Seldate);
      }



  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    var timeLineContainer = document.querySelector(".timeline-container");
    var dropZone = {
      getContainer: function () {
        return timeLineContainer;
      },
      onDragStop: function (params) {
        const el = document.querySelector(".timeline-data");
        el.classList.remove("d-none");
        // var el = document.createElement("div");
        // el.classList.add("tile");
        // el.innerHTML =
        //   '<div class="id">' + params.node.data.vehicle_code + "</div>";
        // timeLineContainer.appendChild(el);
      },
    };
    params.api.addRowDropZone(dropZone);
  }

toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }


   SearchDrops = e => {
                        console.log("search content= ",e.target.value);
                        this.props.updateDropSearchTerm(e);
                    }


       SearchTrips = e => {
                          console.log("search content= ",e.target.value);
                          this.props.updateTripsSearchTerm(e);
                      }




    render() {
     const site = '';
    console.log("T6 inside docpanel - flag",this.props.daysCheckedIn)
 //const currDate = moment(this.props.selectedDate).format('YYYY-MM-DD');
 const currDate = moment.tz(this.props.selectedDate, '').format('YYYY-MM-DD');
 let SelectedDate = "";
 if(this.props.documentPanel_dateflg){
   SelectedDate = this.props.documentPanel_date;
 }





 let filterTrips;

 if(this.props.tripsList) {
       console.log("T11 inside triplist",this.props.tripsList);
       filterTrips = this.props.tripsList.filter(
        (trip) => {
            console.log("T11 inside trip",trip);
             console.log("T11 state of open ",this.state.openRecords);
            if(this.state.openRecords && this.state.LockedRecords && this.state.ValidateRecords && this.state.OptimisedRecords) {
                 console.log("T11 inside triplist - openRecrods");
               return  (trip.optistatus === "Open" || trip.optistatus === "Optimized" || trip.lock === true || trip.tmsValidated === true );
            }
            if(!this.state.openRecords && this.state.LockedRecords && this.state.ValidateRecords && this.state.OptimisedRecords) {
                             console.log("T11 inside triplist - openRecrods");
                           return  (trip.optistatus === "Optimized" || trip.lock === true || trip.tmsValidated === true );
                        }
            if(this.state.openRecords && !this.state.LockedRecords && this.state.ValidateRecords && this.state.OptimisedRecords) {
                             console.log("T11 inside triplist - openRecrods");
                           return  (trip.optistatus === "Open" || trip.optistatus === "Optimized" || trip.tmsValidated === true );
                        }
            if(this.state.openRecords && this.state.LockedRecords && !this.state.ValidateRecords && this.state.OptimisedRecords) {
                             console.log("T11 inside triplist - openRecrods");
                           return  (trip.optistatus === "Open" || trip.optistatus === "Optimized" || trip.lock === true);
                        }
            if(this.state.openRecords && this.state.LockedRecords && this.state.ValidateRecords && !this.state.OptimisedRecords) {
                                         console.log("T11 inside triplist - openRecrods");
                                       return  (trip.optistatus === "Open" || trip.lock === true  || trip.tmsValidated === true);
                                    }
              // 2 elements
            if(this.state.openRecords && this.state.LockedRecords && !this.state.ValidateRecords && !this.state.OptimisedRecords) {
                             console.log("T11 inside triplist - openRecrods");
                           return  (trip.optistatus === "Open"  || trip.lock === true);
                        }
            if(this.state.openRecords && !this.state.LockedRecords && this.state.ValidateRecords && !this.state.OptimisedRecords) {
                             console.log("T11 inside triplist - openRecrods");
                           return  (trip.optistatus === "Open"  || trip.tmsValidated === true );
                        }
            if(this.state.openRecords && !this.state.LockedRecords && !this.state.ValidateRecords && this.state.OptimisedRecords) {
                                         console.log("T11 inside triplist - openRecrods");
                                       return  (trip.optistatus === "Open" || trip.optistatus === "Optimized");
                                    }
            if(!this.state.openRecords && this.state.LockedRecords && this.state.ValidateRecords && !this.state.OptimisedRecords) {
                                         console.log("T11 inside triplist - openRecrods");
                                       return  (trip.lock === true || trip.tmsValidated === true );
                                    }
            if(!this.state.openRecords && this.state.LockedRecords && !this.state.ValidateRecords && this.state.OptimisedRecords) {
                                         console.log("T11 inside triplist - openRecrods");
                                       return  (trip.optistatus === "Optimized" || trip.lock === true );
                                    }
            if(!this.state.openRecords && !this.state.LockedRecords && this.state.ValidateRecords && this.state.OptimisedRecords) {
                                         console.log("T11 inside triplist - openRecrods");
                                       return  (trip.optistatus === "Optimized" ||  trip.tmsValidated === true );
                                    }

             //1 element
             if(this.state.openRecords && !this.state.LockedRecords && !this.state.ValidateRecords && !this.state.OptimisedRecords) {
                              console.log("T11 inside triplist - openRecrods");
                            return  (trip.optistatus === "Open");
                         }
             if(!this.state.openRecords && this.state.LockedRecords && !this.state.ValidateRecords && !this.state.OptimisedRecords) {
                              console.log("T11 inside triplist - openRecrods");
                            return  (trip.lock === true);
                         }
             if(!this.state.openRecords && !this.state.LockedRecords && this.state.ValidateRecords && !this.state.OptimisedRecords) {
                              console.log("T11 inside triplist - openRecrods");
                            return  (trip.tmsValidated === true );
                         }
             if(!this.state.openRecords && !this.state.LockedRecords && !this.state.ValidateRecords && this.state.OptimisedRecords) {
                              console.log("T11 inside triplist - openRecrods");
                            return  (trip.optistatus === "Optimized");
                         }
            else {
                console.log("T11 inside else - openRecrods");
                return (trip);
            }

        }
       );
       if(this.props.searchTrip.length > 1) {
                   filterTrips = filterTrips.filter(
                    (trip) => {

                    return ((trip.itemCode.toLowerCase().indexOf(
                                                                               this.props.searchTrip.toLowerCase()
                                                                           ) !== -1) || (trip.code.toLowerCase().indexOf(
                                                                               this.props.searchTrip.toLowerCase()
                                                                           ) !== -1) || (trip.driverName.toLowerCase().indexOf(
                                                                               this.props.searchTrip.toLowerCase()
                                                                           ) !== -1)) ;


                     console.log("inside search and filter trips",trip);
            }
)
     }

 }


     let filterDrops;
     let filterPickups;
 if(this.props.dropsPanel){
            filterDrops = this.props.dropsPanel.filter(
                (drop) => {
                 if(this.state.ToPlanchecked && !this.state.Todropchecked && !this.state.ToPickchecked)
                 {

                      return ((drop.type === 'open') && (drop.dlvystatus === '0' || drop.dlvystatus === '8'));
                    }
                 else if(!this.state.ToPlanchecked && this.state.Todropchecked && !this.state.ToPickchecked){
                     return (drop.movtype === 'DROP');
                 }
                  else if(!this.state.ToPlanchecked && !this.state.Todropchecked && this.state.ToPickchecked){
                                      return (drop.movtype === 'PICK');
                                  }
                 else if(this.state.ToPlanchecked && this.state.Todropchecked && !this.state.ToPickchecked)
                                  {

                                       return (((drop.type === 'open') && (drop.dlvystatus === '0' || drop.dlvystatus === '8') && drop.movtype === 'DROP'));
                                     }
                 else if(this.state.ToPlanchecked && !this.state.Todropchecked && this.state.ToPickchecked)
                                  {

                                       return (((drop.type === 'open') && (drop.dlvystatus === '0' || drop.dlvystatus === '8') && drop.movtype === 'PICK'));
                                     }
                   else {
                       return drop;
                   }


                  /*
                    if(site === ""){
                      return ((drop.docnum.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (drop.bpcode.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (drop.bpname.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (drop.doctype.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (drop.poscode.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (String(drop.netweight).indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1) || (String(drop.volume).indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1)  || (drop.type.toLowerCase().indexOf(
                                              this.props.searchDrp.toLowerCase()
                                          ) !== -1));

                    }
                    else {
                       return (((drop.docnum.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (drop.bpcode.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (drop.bpname.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (drop.doctype.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (drop.poscode.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (String(drop.netweight).indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1) || (String(drop.volume).indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1)  || (drop.type.toLowerCase().indexOf(
                                               this.props.searchDrp.toLowerCase()
                                           ) !== -1)) && (drop.site === site));
                    }
                    */
                }
            );



			        if(this.props.selectedRouteCodeArr.length > 0) {
               let SelectedRouteCodes = this.props.selectedRouteCodeArr;
                 filterDrops = filterDrops.filter(
                         (drop) =>  {
             return ( SelectedRouteCodes.includes(drop.routeCode));
                                  }
                                           );
                    }




            if(this.props.searchDrp.length > 1) {
            filterDrops = filterDrops.filter(
             (drop) => {
             if(site === ""){
                                  return ((drop.docnum.toLowerCase().indexOf(
                                                          this.props.searchDrp.toLowerCase()
                                                      ) !== -1) || (drop.bpcode.toLowerCase().indexOf(
                                                          this.props.searchDrp.toLowerCase()
                                                      ) !== -1) || (drop.bpname.toLowerCase().indexOf(
                                                          this.props.searchDrp.toLowerCase()
                                                      ) !== -1) || (drop.doctype.toLowerCase().indexOf(
                                                          this.props.searchDrp.toLowerCase()
                                                      ) !== -1) || (drop.poscode.toLowerCase().indexOf(
                                                          this.props.searchDrp.toLowerCase()
                                                      ) !== -1) || (String(drop.netweight).indexOf(
                                                          this.props.searchDrp.toLowerCase()
                                                      ) !== -1) || (String(drop.volume).indexOf(
                                                          this.props.searchDrp.toLowerCase()
                                                      ) !== -1)  || (drop.type.toLowerCase().indexOf(
                                                          this.props.searchDrp.toLowerCase()
                                                      ) !== -1));

                                }
                                else {
                                   return (((drop.docnum.toLowerCase().indexOf(
                                                           this.props.searchDrp.toLowerCase()
                                                       ) !== -1) || (drop.bpcode.toLowerCase().indexOf(
                                                           this.props.searchDrp.toLowerCase()
                                                       ) !== -1) || (drop.bpname.toLowerCase().indexOf(
                                                           this.props.searchDrp.toLowerCase()
                                                       ) !== -1) || (drop.doctype.toLowerCase().indexOf(
                                                           this.props.searchDrp.toLowerCase()
                                                       ) !== -1) || (drop.poscode.toLowerCase().indexOf(
                                                           this.props.searchDrp.toLowerCase()
                                                       ) !== -1) || (String(drop.netweight).indexOf(
                                                           this.props.searchDrp.toLowerCase()
                                                       ) !== -1) || (String(drop.volume).indexOf(
                                                           this.props.searchDrp.toLowerCase()
                                                       ) !== -1)  || (drop.type.toLowerCase().indexOf(
                                                           this.props.searchDrp.toLowerCase()
                                                       ) !== -1)) && (drop.site === site));
                                }
                                });
        }
}



        return (
        <>
       <div class="documentPanel">
                <div className="d-flex justify-content-between align-items-center">
                             <Nav tabs className="nav-tabs-custom nav-justified">
                                                           <NavItem>
                                                             <NavLink
                                                               style={{ cursor: "pointer" }}
                                                               className={classnames({
                                                                 active: this.state.activeTab === "Documents",
                                                               })}
                                                               onClick={() => {
                                                                 this.toggleTab("Documents");
                                                               }}
                                                             >
                                                               <span>{this.props.t('Documents')}</span>
                                                             </NavLink>
                                                           </NavItem>
                                                           <NavItem>
                                                              <NavLink
                                                                                                                          style={{ cursor: "pointer" }}
                                                                                                                          className={classnames({
                                                                                                                            active: this.state.activeTab === "Trips",
                                                                                                                          })}
                                                                                                                          onClick={() => {
                                                                                                                            this.toggleTab("Trips");
                                                                                                                          }}
                                                                                                                        >
                                                                                                                          <span>{this.props.t('Trips')}</span>
                                                                                                                        </NavLink>
                                                                                                                      </NavItem>
                                                         </Nav>
                             {this.state.activeTab === 'Documents' ?
                             <div className="d-flex align-items-center">

                             <FormGroup className="mb-2 mr-3">
                                               <span>Date </span>
                                                             <Flatpickr
                                                               className="form-control"
                                                               dateformat= "Y-m-d"
                                                               value={SelectedDate}
                                                               onChange={this.onDateselection}
                                                             />
                                                           </FormGroup>
                                 { this.props.documentPanel_dateflg &&
                              <div className="custom-control mb-0 mr-4">
                                                             <Checkbox  color="primary"
                                                                onChange = {this.dayscheckBoxChange}
                                                                checked = {this.props.documentPanel_5dayscheck}/>
                                                             <Label

                                                                onClick={() => {
                                                                                                                                    this.setState({
                                                                                                                                      Todayschecked: !this.state.Todayschecked,
                                                                                                                                    });
                                                                                                                                  }}
                                                                                                                                >
                                                                                                                                  {this.props.t('+/- 5days')}
                                                              </Label>
                                                              </div>
                                                              }
                             <FormGroup className="mb-0 mr-4">
                                                                         <Input
                                                                           bsSize="md"
                                                                           type="search"
                                                                           placeholder={this.props.t("SearchCaption")}
                                                                           className="form-control"
                                                                           onChange = {this.SearchDrops}
                                                                         />
                                                                       </FormGroup>

                             <div className="custom-control custom-checkbox mb-2 mr-3">
                                                              <Input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                onChange = {()=>this.OnDropscheckBoxChange()}
                                                                checked={this.state.Todropchecked}
                                                              />
                                                              <Label
                                                                className="custom-control-label"
                                                                onClick={() => {
                                                                  this.setState({
                                                                    Todropchecked: !this.state.Todropchecked,
                                                                  });
                                                                }}
                                                              >
                                                                {this.props.t('Outbound')}
                                                              </Label>
                                                            </div>


<div className="custom-control custom-checkbox mb-2 mr-3">
                                 <Input
                                   type="checkbox"
                                   className="custom-control-input"
                                   onChange = {()=>this.OnPickupscheckBoxChange()}
                                   checked={this.state.ToPickchecked}
                                 />
                                 <Label
                                   className="custom-control-label"
                                   onClick={() => {
                                     this.setState({
                                       ToPickchecked: !this.state.ToPickchecked,
                                     });
                                   }}
                                 >
                                   {this.props.t('Inbound')}
                                 </Label>
                               </div>


                               <div className="d-inline-block"  style ={{paddingRight: '40px' ,alignSelf: 'center'}} >
                               <button style={{ fontSize: '12px', fontWeight: 'bold', marginRight: '20%', marginLeft: '20%' }}
                                    onClick = {() => this.props.refreshDocspanel()}
                                                                  >
                                                                   {this.props.t('Update')}
                               </button>
                               </div>


                               <div className="custom-control custom-checkbox mb-2 mr-3">
                                 <Input
                                   type="checkbox"
                                   className="custom-control-input"
                                   onChange = {()=>this.checkBoxChange()}
                                   checked={this.state.ToPlanchecked}
                                 />
                                 <Label
                                   className="custom-control-label"
                                   onClick={() => {
                                     this.setState({
                                       ToPlanchecked: !this.state.ToPlanchecked,
                                     });
                                   }}
                                 >
                                   {this.props.t('ToPlan')}
                                 </Label>
                               </div>

                             </div>
 :
 <div className="d-flex align-items-center">

<FormGroup className="mb-2 mr-3">
                                               <span>Date </span>
                                                             <Flatpickr
                                                               className="form-control"
                                                               dateformat= "Y-m-d"
                                                               value={SelectedDate}
                                                               onChange={this.onDateselection}
                                                             />
                                                           </FormGroup>
                              { /* this.props.documentPanel_dateflg &&
                              <div className="custom-control mb-0 mr-4">
                                                             <Checkbox  color="primary"
                                                                onChange = {this.dayscheckBoxChange}
                                                                checked = {this.props.documentPanel_5dayscheck}/>
                                                             <Label

                                                                onClick={() => {
                                                                                                                                    this.setState({
                                                                                                                                      Todayschecked: !this.state.Todayschecked,
                                                                                                                                    });
                                                                                                                                  }}
                                                                                                                                >
                                                                                                                                  {this.props.t('+/- 5days')}
                                                              </Label>
                                                              </div>
                                                              */ }
 <FormGroup className="mb-0 mr-4">
                                            <Input
                                              bsSize="md"
                                              type="search"
                                              placeholder={this.props.t("SearchCaption")}
                                              className="form-control"
                                              onChange = {this.SearchTrips}
                                            />
                                          </FormGroup>
                                <div className="custom-control custom-checkbox mb-2 mr-3">
                                                                   <Input
                                                                     type="checkbox"
                                                                     className="custom-control-input"
                                                                     onChange = {()=>this.OpencheckBoxChange()}
                                                                     checked={this.state.openRecords}
                                                                   />
                                                                   <Label
                                                                     className="custom-control-label"
                                                                     onClick={() => {
                                                                       this.setState({
                                                                         openRecords: !this.state.openRecords,
                                                                       });
                                                                     }}
                                                                   >
                                                                     {this.props.t('Open')}
                                                                   </Label>
                                                                 </div>
                                 <div className="custom-control custom-checkbox mb-2 mr-3">
                                   <Input
                                     type="checkbox"
                                     className="custom-control-input"
                                     onChange = {()=>this.OptimisecheckBoxChange()}
                                     checked={this.state.OptimisedRecords}
                                   />
                                   <Label
                                     className="custom-control-label"
                                     onClick={() => {
                                       this.setState({
                                         OptimisedRecords: !this.state.OptimisedRecords,
                                       });
                                     }}
                                   >
                                     {this.props.t('Optimised')}
                                   </Label>
                                 </div>

                                <div className="custom-control custom-checkbox mb-2 mr-3">
                                  <Input
                                    type="checkbox"
                                    className="custom-control-input"
                                    onChange = {()=>this.LockcheckBoxChange()}
                                    checked={this.state.LockedRecords}
                                  />
                                  <Label
                                    className="custom-control-label"
                                    onClick={() => {
                                      this.setState({
                                        LockedRecords: !this.state.LockedRecords,
                                      });
                                    }}
                                  >
                                    {this.props.t('Locked')}
                                  </Label>
                                </div>
                                <div className="custom-control custom-checkbox mb-2 mr-3">
                                                                  <Input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    onChange = {()=>this.ValidatecheckBoxChange()}
                                                                    checked={this.state.ValidateRecords}
                                                                  />
                                                                  <Label
                                                                    className="custom-control-label"
                                                                    onClick={() => {
                                                                      this.setState({
                                                                        ValidateRecords: !this.state.ValidateRecords,
                                                                      });
                                                                    }}
                                                                  >
                                                                    {this.props.t('Validated')}
                                                                  </Label>
                                                                </div>

                              </div>
 }
                           </div>

                           <hr className="my-0" />
                            <TabContent className="xl-tabcontent1" activeTab={this.state.activeTab}>
                             <Drops3
                              updateDropSearchTerm= {this.props.updateDropSearchTerm}
                              sortDrop= {this.props.sortDrop}
                              dropOrder = {this.props.dropOrder}
                             dropsList={filterDrops}
                             dayschecked = {this.props.daysCheckedIn}
                             currDate = {this.props.selectedDate}
                             handleDragStart = {this.props.handleDragStart}
                             updateDocsGeoLocations = {this.props.updateDocsGeoLocations}

                             />
                             <TripList3
                              tripsList = {filterTrips}
                              updateTripsSearchTerm = {this.props.updateTripsSearchTerm}
                              vehiclePanel = {this.props.vehiclePanel}
                              updateTripsGeoLocations={this.props.updateTripsGeoLocations}
                              onVRClick={this.props.onVRClick}
                              updateTripsGeolocationbeforelock = {this.props.updateTripsGeolocationbeforelock}
                              onLockRecord={this.props.onLockRecord}
                              validate={this.props.validate}
                              onCompleteTripDelete={this.props.onCompleteTripDelete}
                              onLockRecord={this.props.onLockRecord}
                              date={this.props.date}
                                                 selectAllTripsPanel={this.props.selectAllTripsPanel}
                                                 routeSchedulerData={this.props.routeSchedulerTime}
                                                 UnlockConfirmTrip={this.props.UnlockConfirmTrip}
                                                 onValidateAll={this.props.onValidateAll}
                                                 onloaderMsg = {this.props.onLoadermessage}
                                                 onForceseq = {this.props.onForcesequnceCheck}
                                                 getPOandPreREceiptfromFreq = {this.props.getPOandPreREceiptfromFreq}

                                                          />

                            </TabContent>

                       </div>
             </>
        );
    }
}

export default withNamespaces()(DocumentsPanel);