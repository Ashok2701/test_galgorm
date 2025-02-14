import React from 'react';
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { withNamespaces } from 'react-i18next';
import i18n from '../../../i18n';
import RouteInfoRenderer from "../RouteInfoRenderer";
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
import classnames from "classnames";
import SvgIcon from '@material-ui/core/SvgIcon';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import LockRounded from '@material-ui/icons/LockRounded';
import Alert from './Alert';
import LockConfirm from './LockConfirm';
import UnlockConfirm from './UnlockConfirm';
import DeleteConfirm from './DeleteConfirm';
import ValidateConfirm from './ValidateConfirm';
import DisplayLoaderNotes from './DisplayLoaderNotes'
import GroupValidateConfirm from './GroupValidateConfirm';
import DisplayEquipments from './DisplayEquipments';
import DisplayTripLogs from './DisplayTripLogs';
import DisplayTrailers from './DisplayTrailers';

class TripsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInfoShow: false,
         addConfirmShow: false,
                  addEquipmentShow: false,
                  showLogs : false,
                  addTrailShow: false,
                  addAlertShow: false,
                  errorMessage: '',
                  error: false,
                  index: -1,
                  docnum: '',
                  confirmMessage: '',
                  equipments: [],
                  logs:[],
                  trailers: [],
                  lockButton: false,
                  addunlockconfirmShow: false,
                  addvalidateconfirmShow: false,
                  addallvalidateconfirmShow : false,
                  addDeleteconfirmShow: false,
                  enableValidateAll: false,
                  anchorEl: null,
                  enableDocumnetMsgWindow: false,
                  Seletedtripindex: '',
                  loaderMessage: '',
      speciality: '',
       columnDefs: [
              {
                headerCheckboxSelection: true,
                checkboxSelection: true,
                width: 50,
              },
              {
                headerName: 'Details',
                field: "details",
                width: 75,
               // cellRendererFramework: RouteInfoRenderer
               cellRendererFramework : (params) => {
                return (  <a href="#"
                       onClick={() => this.onVRClick(params)}><i class="fa fa-info-circle" aria-hidden="true"></i>
                     </a>
               )}
              },
              {
                 headerName : "",
                 width: 50,
                 cellRendererFramework : (params) => {
                     console.log("inside delte header",params);
                    if(!params.data.lock) {
                   return(
                         <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"
                                                        onClick={() => this.onConfirmDeleteClick(params.node.rowIndex, params.data.itemCode)} disabled={params.data.lock}>
                                                        <i class="fa fa-trash"></i>
                                                    </button>

                   )
                   }
                   else {
                      return '';
                   }

                 }
              },
              {
                headerName: 'TripCode',
                field: "itemCode",
                width: 190,
              },
              {
                headerName: "Seq #",
                field: "trips",
                width: 70,
              },
              {
                              headerName: "Vehicle",
                              field: "code",
                              width: 110,
                              cellStyle: { fontSize: '14px', fontWeight : 'bold'}
               },
               {
                               headerName: "Status",
                               field: "optistatus",
                               width: 90,
                               cellStyle: { fontSize: '14px', fontWeight : 'bold'}
                             },
                             {
                               headerName: "Lock",
                               field: "lock",
                               width: 70,
                               cellRendererFramework: (params) => {
                                 console.log("inside delte header",params);
                                   let lock =params.data.lock;
                                       let i = params.node.rowIndex;
                                       let opti = params.data.opti;
                                             if (params.data.lock) {
                                                 return (
                                                     <span onClick={() => this.onConfirmClick(params)}>
                                                         <LockRounded style={{ fontSize: 22 }} />
                                                         <SvgIcon>
                                                             <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
                                                         </SvgIcon>
                                                     </span>
                                                     // <a href="#">
                                                     //     <svg
                                                     //     href="#"
                                                     //     class="svg-inline--fa fa-user-lock fa-w-14"
                                                     //     aria-hidden="true"
                                                     //     focusable="false"
                                                     //     data-prefix="fa"
                                                     //     data-icon="lock" role="img"
                                                     //     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                                     //     data-fa-i2svg="">
                                                     //         <path fill="currentColor"
                                                     //         d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
                                                     //     </svg>
                                                     // </a>
                                                 );
                                             } else {
                                                 return (
                                                     <span onClick={() => this.onConfirmClick(params)}>
                                                         <LockOpenRoundedIcon color="primary" style={{ fontSize: 22 }} />
                                                         <SvgIcon>
                                                             <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
                                                         </SvgIcon>
                                                     </span>
                                                     // <a href="#" onClick={() => this.onConfirmClick(i,opti)}>
                                                     //     <svg class="svg-inline--fa fa-user-unlock fa-w-14" id="lockId1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="unlock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg>
                                                     // </a>
                                                 );
                                             }
                                        },
                             },
                             {
                               headerName: "Validate",
                               field: "validate",
                               width: 120,
                               cellRendererFramework: (params) => {
                                let lock =params.data.lock;
                                let index = params.node.rowIndex;
                                let valid = params.data.tmsValidated;
                                 if (!valid && lock) {
                                           return (
                                               <a href="#"
                                                   onClick={() => this.CheckValiationStatus(index)}><i class="fas fa-check-circle" style={{ fontSize: 15 }} aria-hidden="true"></i>
                                               </a>
                                           );
                                       }
                                       else {
                                          return '';
                                       }
                               }
                             },
                             {
                               headerName: "TMS Validation",
                               field: "tmsValidated",
                               width: 150,
                             },

                             {
                               headerName: "Driver",
                               field: "driverName",
                               width: 130,
                             },
              {
                headerName: "Departure Site",
                field: "depSite",
                width: 130,
              },
              {
                headerName: "Arrival Site",
                field: "arrSite",
                width: 150,
              },

              {
                headerName: "Trailer",
                field: "trailer",
                width: 100,
              },
              {
                headerName: "Equipment",
                field: "equipment",
                width: 130,
              },
              {
                headerName: "Departure",
                field: "departure",
                width: 130,
              },
              {
                headerName: "Arrival",
                field: "arrival",
                width: 100,
              },
              {
                headerName: "Tot Weight",
                field: "totalWeight",
                width: 130,
              },
              {
                headerName: "Tot Volume",
                field: "totalVolume",
                width: 140,
              },
              {
                headerName: "% Weight",
                field: "weightPercentage",
                width: 140,
              },
              {
                headerName: "% Volume",
                field: "volumePercentage",
                width: 130,
              },
              {
                headerName: "Pickups",
                field: "pickups",
                width: 110,
              },
              {
                headerName: "Drops",
                field: "drops",
                width: 110,
              },
              {
                headerName: "Stops",
                field: "stops",
                width: 110,
              },
            ],
       frcolumnDefs: [
                     {
                       headerCheckboxSelection: true,
                       checkboxSelection: true,
                       width: 50,
                     },
                     {
                       headerName: 'Détails',
                       field: "details",
                       width: 75,
                      // cellRendererFramework: RouteInfoRenderer
                      cellRendererFramework : (params) => {
                       return (  <a href="#"
                              onClick={() => this.onVRClick(params)}><i class="fa fa-info-circle" aria-hidden="true"></i>
                            </a>
                      )}
                     },
                     {
                        headerName : "",
                        width: 50,
                        cellRendererFramework : (params) => {
                            console.log("inside delte header",params);
                           if(!params.data.lock) {
                          return(
                                <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"
                                                               onClick={() => this.onConfirmDeleteClick(params.node.rowIndex, params.data.itemCode)} disabled={params.data.lock}>
                                                               <i class="fa fa-trash"></i>
                                                           </button>

                          )
                          }
                          else {
                             return '';
                          }

                        }
                     },
                     {
                       headerName: 'Code Tournée',
                       field: "itemCode",
                       width: 190,
                     },
                     {
                       headerName: "Séq #",
                       field: "trips",
                       width: 70,
                     },
                     {
                                     headerName: "Véhicule",
                                     field: "code",
                                     width: 110,
                                     cellStyle: { fontSize: '14px', fontWeight : 'bold'}
                      },
                      {
                                      headerName: "Statut",
                                      field: "optistatus",
                                      width: 90,
                                      cellStyle: { fontSize: '14px', fontWeight : 'bold'}
                                    },
                                    {
                                      headerName: "Verrou",
                                      field: "lock",
                                      width: 70,
                                      cellRendererFramework: (params) => {
                                        console.log("inside delte header",params);
                                          let lock =params.data.lock;
                                              let i = params.node.rowIndex;
                                              let opti = params.data.opti;
                                                    if (params.data.lock) {
                                                        return (
                                                            <span onClick={() => this.onConfirmClick(params)}>
                                                                <LockRounded style={{ fontSize: 22 }} />
                                                                <SvgIcon>
                                                                    <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
                                                                </SvgIcon>
                                                            </span>
                                                            // <a href="#">
                                                            //     <svg
                                                            //     href="#"
                                                            //     class="svg-inline--fa fa-user-lock fa-w-14"
                                                            //     aria-hidden="true"
                                                            //     focusable="false"
                                                            //     data-prefix="fa"
                                                            //     data-icon="lock" role="img"
                                                            //     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                                            //     data-fa-i2svg="">
                                                            //         <path fill="currentColor"
                                                            //         d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
                                                            //     </svg>
                                                            // </a>
                                                        );
                                                    } else {
                                                        return (
                                                            <span onClick={() => this.onConfirmClick(params)}>
                                                                <LockOpenRoundedIcon color="primary" style={{ fontSize: 22 }} />
                                                                <SvgIcon>
                                                                    <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
                                                                </SvgIcon>
                                                            </span>
                                                            // <a href="#" onClick={() => this.onConfirmClick(i,opti)}>
                                                            //     <svg class="svg-inline--fa fa-user-unlock fa-w-14" id="lockId1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="unlock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg>
                                                            // </a>
                                                        );
                                                    }
                                               },
                                    },
                                    {
                                      headerName: "Valider",
                                      field: "validate",
                                      width: 120,
                                      cellRendererFramework: (params) => {
                                       let lock =params.data.lock;
                                       let index = params.node.rowIndex;
                                       let valid = params.data.tmsValidated;
                                        if (!valid && lock) {
                                                  return (
                                                      <a href="#"
                                                          onClick={() => this.CheckValiationStatus(index)}><i class="fas fa-check-circle" style={{ fontSize: 15 }} aria-hidden="true"></i>
                                                      </a>
                                                  );
                                              }
                                              else {
                                                 return '';
                                              }
                                      }
                                    },
                                    {
                                      headerName: "TMS Validation",
                                      field: "tmsValidated",
                                      width: 150,
                                    },

                                    {
                                      headerName: "Chauffeur",
                                      field: "driverName",
                                      width: 130,
                                    },
                     {
                       headerName: "Site Départ",
                       field: "depSite",
                       width: 130,
                     },
                     {
                       headerName: "Site Retour",
                       field: "arrSite",
                       width: 150,
                     },

                     {
                       headerName: "Remorque",
                       field: "trailer",
                       width: 100,
                     },
                     {
                       headerName: "Équipement",
                       field: "equipment",
                       width: 130,
                     },
                     {
                       headerName: "Depart",
                       field: "departure",
                       width: 130,
                     },
                     {
                       headerName: "Retour",
                       field: "arrival",
                       width: 100,
                     },
                     {
                       headerName: "Tot Poids",
                       field: "totalWeight",
                       width: 130,
                     },
                     {
                       headerName: "Tot Cap Volume	",
                       field: "totalVolume",
                       width: 140,
                     },
                     {
                       headerName: "% Poids",
                       field: "weightPercentage",
                       width: 140,
                     },
                     {
                       headerName: "% Cap Volume",
                       field: "volumePercentage",
                       width: 130,
                     },
                     {
                       headerName: "ENLV",
                       field: "pickups",
                       width: 110,
                     },
                     {
                       headerName: "LIV",
                       field: "drops",
                       width: 110,
                     },
                     {
                       headerName: "Arrêts",
                       field: "stops",
                       width: 110,
                     },
                   ],
    };

  }

onConfirmDeleteNo = () => {
        this.setState({
            addDeleteconfirmShow: false
        })
    }

    onConfirmDeleteYes = (index, docnum) => {
        this.props.onCompleteTripDelete(index, docnum);
        this.setState({
            addDeleteconfirmShow: false
        })
    }




 onVRClick = (clickeddata) => {

      console.log("inside Triplist details clicked",clickeddata);
      this.props.onVRClick(clickeddata.rowIndex , clickeddata.data.tmsValidated);
     }

    onConfirmClick = (params) => {
       console.log("inside lock click",params);
       let index = params.node.rowIndex;
       let opti = params.data.optistatus;
        if (params.data.lock) {
            var trips = this.props.tripsList;
            var clickedTrip = trips[index];

            if (clickedTrip.tmsValidated) {
                this.setState({
                    errorMessage: "Trip is already Validated, modifications are not allowed",
                    addAlertShow: true
                });
            }
            else {
                this.setState({
                    confirmMessage: "Do you want to confirm to unlock the trip?",
                    addunlockconfirmShow: true,
                    index: index,
                });
            }

        } else {
            if (opti === 'Optimized') {
                this.setState({
                    confirmMessage: "Do you want to confirm to lock the trip?",
                    addConfirmShow: true,
                    index: index,
                    lockButton: false,
                })
            } else {
                this.setState({
                    confirmMessage: "Trip is not optimized, please optimize it before locking it.",
                    lockButton: true,
                    addConfirmShow: true,
                    index: index

                })
            }
        }
    }

    onConfirmNo = () => {
        this.setState({
            addConfirmShow: false
        })
    }


    onConfirmYes = (index) => {
       console.log("inside after confirm yes");
        this.props.onLockRecord(index);
        this.setState({
            addConfirmShow: false
        })
    }

    CheckValiationStatus(index) {
        var vflag = true;
        var Trips = this.props.tripsList;
        Trips.map((trip, i) => {
            if (i <= index) {
                if (trip.code == Trips[index].code) {
                    if (trip.trips < Trips[index].trips && trip.tmsValidated == false) {
                        vflag = false;
                    }
                }
            }
        })
        if (vflag) {
            this.OnValidateTrip(index);
        }
        else {
            this.setState({
                errorMessage: 'Previous Trip of same vehicle is not validated',
                addAlertShow: true
            });
        }
    }


     OnValidateTrip = (index) => {
            this.setState({
                confirmMessage: 'Do you confirm the route validation?  It will not be possible to modify after route validation',
                addvalidateconfirmShow: true,
                index: index,
            });
        }

        onValidateNo = () => {
            this.setState({
                addvalidateconfirmShow: false
            })
        }

        onValidateYes = (index) => {
            this.props.validate(index);
            this.setState({
                addvalidateconfirmShow: false
            })
        }

      OnGroupValidateTrips = () => {
              this.setState({
                  confirmMessage: 'Confirm to Validate All the Selected Trips',
                  addvalidateconfirmShow: true,

              });
          }


     onGroupValidateNo = () => {
            this.setState({
                addvalidateconfirmShow: false
            })
        }

      onGroupValidateYes = () => {

          this.props.onValidateAll();
          console.log("GV - Yes confirm for group Valdiation");
            this.setState({
                addvalidateconfirmShow: false
            })
        }


    onUnlockNo = () => {
        this.setState({
            addunlockconfirmShow: false
        })
    }


    onUnlockYes = (index) => {
        var trips = this.props.tripsList;
        var clickedTrip = trips[index];
        this.props.UnlockConfirmTrip(clickedTrip);
        this.setState({
            addunlockconfirmShow: false
        })
    }

    getLockData = (params) => {
      let lock =params.data.lock;
      let i = params.rowNode.rowIndex;
      let opti = params.data.opti;
            if (lock) {

                return (
                    <a href="#" onClick={() => this.onConfirmClick(i, opti, lock)}>
                        <LockRounded style={{ fontSize: 22 }} />
                        <SvgIcon>
                            <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
                        </SvgIcon>
                    </a>
                    // <a href="#">
                    //     <svg
                    //     href="#"
                    //     class="svg-inline--fa fa-user-lock fa-w-14"
                    //     aria-hidden="true"
                    //     focusable="false"
                    //     data-prefix="fa"
                    //     data-icon="lock" role="img"
                    //     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                    //     data-fa-i2svg="">
                    //         <path fill="currentColor"
                    //         d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
                    //     </svg>
                    // </a>
                );
            } else {
                return (
                    <a href="#" onClick={() => this.onConfirmClick(i, opti, lock)}>
                        <LockOpenRoundedIcon color="primary" style={{ fontSize: 22 }} />
                        <SvgIcon>
                            <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
                        </SvgIcon>
                    </a>
                    // <a href="#" onClick={() => this.onConfirmClick(i,opti)}>
                    //     <svg class="svg-inline--fa fa-user-unlock fa-w-14" id="lockId1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="unlock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg>
                    // </a>
                );
            }
        }



  onConfirmDeleteClick = (index, tripcode) => {
     console.log("Inside Confirm Delte");
         this.setState({
             addDeleteconfirmShow: true,
             confirmMessage: 'Do you confirm the deletion of this tour?',
             index: index,
             tripcode: tripcode
         })
     }


  onRowSelected = event => {
     console.log("T02 inside onRowSelected",event);

     if(event.node.selected) {
     this.props.updateTripsGeoLocations(event.rowIndex ,event.node.selected);
     }

  };

  onSelectionChanged = event => {
     console.log("T02 inside onSelectionChanged",event);
  };


  render(){
  console.log("i18 -",i18n);
  console.log("i18 namespace -",withNamespaces);
  let ColumnLAngdef = this.state.columnDefs;
  const language = i18n.language;
  if(language === 'fr' ){
    ColumnLAngdef = this.state.frcolumnDefs;
  }
   let addEquipmentClose = () => this.setState({ addEquipmentShow: false });
        let addTrailClose = () => this.setState({ addTrailShow: false });
        let addAlertClose = () => this.setState({ addAlertShow: false });
        let addLogsClose = () => this.setState({showLogs : false});
        let addLoaderClose = () => this.setState({ enableloaderMsgWindow: false });
 const TripsList = this.props.tripsList;
   const  defaultColDef = {sortable:true}
   console.log("T21 inside TripsLIst",this.props.tripsList)
   const rowSelection = "single";
  function changeRowColor(params){
       console.log("T21 color",params.data.color);
     var myStr = params.data.vehicleObject.color;
    var subStr = myStr.match("background-color:(.*)");
    var s = subStr[1];
    return  { 'background-color': s };;

     }



     return(
      <>
      <Card className="mb-3">
                        <CardBody className="p-2">
                          <Row className="mb-2">
                            <Col md="4">
                              <FormGroup className="mb-0">
                                <Input
                                  bsSize="sm"
                                  type="search"
                                  placeholder={this.props.t("SearchCaption")}
                                  className="form-control"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <div className="ag-theme-balham" style={{ height: 220 }}>
                            <AgGridReact
                              columnDefs=  {ColumnLAngdef}
                                                                                      rowData = {TripsList}
                                                                                      defaultColDef = {defaultColDef}
                                                                                      getRowStyle = {changeRowColor}
                                                                                       rowSelection= {rowSelection}
                                                                                       onRowSelected = {this.onRowSelected}
                                                                                       onSelectionChanged = {this.onSelectionChanged}
                                                                                      />
                            <LockConfirm
                                               show={this.state.addConfirmShow}
                                               onHide={this.onConfirmNo}
                                               lockConfirm={this.onConfirmYes}
                                               index={this.state.index}
                                               confirmMessage={this.state.confirmMessage}
                                               lock={this.state.lockButton}
                                           ></LockConfirm>
                                           <UnlockConfirm
                                               show={this.state.addunlockconfirmShow}
                                               onHide={this.onUnlockNo}
                                               unlockConfirm={this.onUnlockYes}
                                               index={this.state.index}
                                               confirmMessage={this.state.confirmMessage}
                                           ></UnlockConfirm>
                                           <ValidateConfirm
                                               index={this.state.index}
                                               show={this.state.addvalidateconfirmShow}
                                               onHide={this.onValidateNo}
                                               validateConfirm={this.onValidateYes}
                                               confirmMessage={this.state.confirmMessage}
                                           ></ValidateConfirm>
                                           <GroupValidateConfirm

                                                               show={this.state.addallvalidateconfirmShow}
                                                               onHide={this.onGroupValidateNo}
                                                               onGroupValidate={this.onGroupValidateYes}
                                                               confirmMessage={this.state.confirmMessage}
                                                           ></GroupValidateConfirm>
                                           <DisplayEquipments
                                               show={this.state.addEquipmentShow}
                                               onHide={addEquipmentClose}
                                               equipments={this.state.equipments}
                                               displayEdit={false}
                                           ></DisplayEquipments>
                                           <DisplayTripLogs
                                                               show={this.state.showLogs}
                                                               onHide={addLogsClose}
                                                               totObjects ={this.state.logs}
                                                               displayEdit={false}
                                           ></DisplayTripLogs>
                                           <DisplayTrailers
                                               show={this.state.addTrailShow}
                                               onHide={addTrailClose}
                                               trailers={this.state.trailers}
                                           ></DisplayTrailers>
                                           <Alert
                                               show={this.state.addAlertShow}
                                               onHide={addAlertClose}
                                               errorMessage={this.state.errorMessage}
                                           ></Alert>
                                           <DeleteConfirm
                                               show={this.state.addDeleteconfirmShow}
                                               onHide={this.onConfirmDeleteNo}
                                               confirmDelete={this.onConfirmDeleteYes}
                                               index={this.state.index}
                                               tripcode={this.state.tripcode}
                                               confirmMessage={this.state.confirmMessage}
                                           ></DeleteConfirm>
                                            <DisplayLoaderNotes
                                                             show={this.state.enableloaderMsgWindow}
                                                             onHide={addLoaderClose}
                                                             notes={this.state.loaderMessage}
                                                             onSaveloaderNotes={this.onSaveloaderNotes}
                                                             displayEdit={true}
                                                           ></DisplayLoaderNotes>
                          </div>
                        </CardBody>
                      </Card>
      </>
     );
  }

}

export default withNamespaces()(TripsList);