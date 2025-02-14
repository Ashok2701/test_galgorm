import React from 'react';
import moment from 'moment';
import Alert from './Alert';
import LockConfirm from './LockConfirm';
import UnlockConfirm from './UnlockConfirm';
import DeleteConfirm from './DeleteConfirm';
import ValidateConfirm from './ValidateConfirm';
import DisplayLoaderNotes from './DisplayLoaderNotes'
import GroupValidateConfirm from './GroupValidateConfirm';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import Checkbox from "@material-ui/core/Checkbox";
import LockRounded from '@material-ui/icons/LockRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import DisplayEquipments from './DisplayEquipments';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DisplayTripLogs from './DisplayTripLogs';
import DisplayTrailers from './DisplayTrailers';
import { withNamespaces } from 'react-i18next';
import SvgIcon from '@material-ui/core/SvgIcon';
import { convertHrToSec, convertMinToSec, formatTime, nullAndNanChecking, splitTime } from '../converterFunctions/converterFunctions';
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
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

class TripsList3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            addDeleteconfirmShow: false,
            enableValidateAll: false,
            anchorEl: null,
            enableDocumnetMsgWindow: false,
            Seletedtripindex: '',
            loaderMessage: '',


        };
    }


    OnValidateTrip = (index) => {
        this.setState({
            confirmMessage: this.props.t('Validconfirm'),
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
        this.props.validate(index)
        this.setState({
            addvalidateconfirmShow: false
        })
    }

  OnGroupValidateTrips = () => {
          this.setState({
              confirmMessage: this.props.t('AllValidate'),
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




    onConfirmClick = (trip,index, opti, lock) => {
        if (lock) {
            var trips = this.props.tripsList;
            var clickedTrip = trips[index];

            if (clickedTrip.tmsValidated) {
                this.setState({
                    errorMessage: this.props.t('validatedTrip'),
                    addAlertShow: true
                });
            }
            else {
                this.setState({
                    confirmMessage: this.props.t('unlockTrip'),
                    addunlockconfirmShow: true,
                    index: index,
                });
            }

        } else {
           console.log("Passed Trip =",trip);

            if (opti === 'Optimized') {

                let previousLockTripsCheck = [];
                let tripsCollection = this.props.tripsList;
                 console.log("Collection Trips are =",tripsCollection);
                tripsCollection.map((t) => {
                                               if (t.code === trip.code && t.docdate === trip.docdate) {
                                                   if (t.trips === trip.trips - 1) {
                                                       previousLockTripsCheck.push(t)
                                                   }
                                               }
                                           })

                  let LockStatus = false;
                                             if (previousLockTripsCheck.length > 0) {
                                              console.log("prev lock trip =",previousLockTripsCheck)
                                                 if (previousLockTripsCheck[0].lock) {
                                                     LockStatus = false;
                                                 } else {
                                                     LockStatus = true;
                                                 }
                                             }

                if(LockStatus) {
                    this.setState({
                                      errorMessage: 'Please lock Previous Trips',
                                      addAlertShow: true
                                  });
                }
                else {
                this.setState({
                    confirmMessage: this.props.t('lockTrip'),
                    addConfirmShow: true,
                    index: index,
                    lockButton: false,
                })
                }
            } else {
                this.setState({
                    confirmMessage: this.props.t('optimizelocking'),
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
        this.props.onLockRecord(index);
        this.setState({
            addConfirmShow: false
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

    onEquipmentClick = (equipment) => {
        this.setState({
            addEquipmentShow: true,
            equipments: equipment
        })
    }


    onTriplogClick = (totobject) => {
       console.log("T7 inside trip click",totobject);
       this.setState({
           showLogs : true,
           logs :totobject
       })

    }

    onTrailerClick = (trailer) => {
        this.setState({
            addTrailShow: true,
            trailers: trailer
        })
    }

    getVRNumber = (count, currDate, site) => {
        var number = count > 9 ? '0' + (count + 1) : '00' + (count + 1);
        return 'WVR-' + currDate + "-" + site + "-" + number;
    }

    getLockData = (trip,lock, i, opti) => {

        if (lock) {

            return (
                <span onClick={() => this.onConfirmClick(trip,i, opti, lock)}>
                    <LockRounded style={{ fontSize: 22 }} />
                    <SvgIcon>
                        <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
                    </SvgIcon>
                </span>

            );
        } else {
            return (
                <span onClick={() => this.onConfirmClick(trip,i, opti, lock)}>
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
    }


    getVRdetailBtnClick(lock,i,tmsValidated) {
        if(lock){
             console.log("Trip is locked");
            this.props.onVRClick(i, tmsValidated);
        }
        else{
            console.log("Trip is unlocked");
             this.props.updateTripsGeolocationbeforelock(i);
        }
    }



    getVrDetailsLink(x, i, tmsValidated) {
       // if (x == 1) {
            return (
                <a href="#"
                    onClick={() => this.getVRdetailBtnClick(x,i, tmsValidated)}><i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
                </a>
            );
       // }
    }

 getPOExchangeinfo(freqtrue,poprocessed,index, code) {
        if (!poprocessed && freqtrue) {
            return (
                <a href="#"
                    onClick={() => this.props.getPOandPreREceiptfromFreq(index, code)}><i class="fas fa-check-circle" aria-hidden="true"></i>
                </a>
            );
        }
        else {
        }
    }



	 ListofDlv = (DocList) => {
      return (
            <table>
              <tbody>
              </tbody>
               {DocList && DocList.map((doc, i) => (
                     <tr  key={i}>
                        <td>{doc.documentNo}</td>
                        <td>{doc.documentStatus}</td>
                     </tr>
                                                  )) }
            </table>
      )
    }



    getValidatebtn(trip,valid, lock, index, docStatus) {
        if (!valid && lock) {
            return (
                <a href="#"
                    onClick={() => this.CheckDocumentStatuForValidation(index, docStatus)}><i class="fas fa-check-circle" aria-hidden="true"></i>
                </a>
            );
        }
        else {
        }
    }


    CheckDocumentStatuForValidation = (index, docStatus) => {

    if(docStatus === 'Deliverable') {
            this.CheckValiationStatus(index)
    }
    else {
     this.CheckValiationStatus(index)
    /*
     this.setState({
                    errorMessage: 'Documents in Trips are not in Deliverable Status',
                    addAlertShow: true
                });
                */
    }
    }


    onConfirmDeleteClick = (index, tripcode) => {
        this.setState({
            addDeleteconfirmShow: true,
            confirmMessage: this.props.t('DeleteTrip'),
            index: index,
            tripcode: tripcode
        })
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


    CheckValiationStatus(index) {
        var vflag = true;
        var Trips = this.props.tripsList;
        Trips.map((trip, i) => {
            if (i <= index) {
                if (trip.code == Trips[index].code && trip.docdate == Trips[index].docdate) {
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

    getBgcolor(t, status) {


        let color = '';
        if(status === 'Open') {
          color = 'cornsilk';
        }
        else {
        let breakCondition = false;
        this.props.vehiclePanel.vehicles.map((vehicle) => {

            if (vehicle.codeyve === t && !breakCondition) {
                var myStr = vehicle.color;
                var subStr = myStr.match("background-color:(.*)");
                color = subStr[1];
                breakCondition = true;
            }
        });
        }
        return color;
    }

    displayEquipments = (trip) => {
        let equpQuantity = 0;
        if (trip.equipmentObject.length > 0) {
            equpQuantity = trip.equipmentObject.map(item => item.quantity).reduce((prev, next) => Number(prev) + Number(next));
        }
        return equpQuantity;
    }

    selectAllTripsPanel =() =>{
        this.props.selectAllTripsPanel();
        this.setState({enableValidateAll : !this.state.enableValidateAll})
    }


    ForcedSequnce = (i,event) => {
        console.log("inside forced",i+"-"+event);
        //this.props.ForcedSequnce(i);
    }

    checkForceSeq = (index,check) => {
           let updatedflg;
            console.log("inside checkForceSeq",check);
            if(check){
              console.log("inside checkForceSeq true");
              updatedflg = false;

            }
            else {
              console.log("inside checkForceSeq false");
              updatedflg = true;
            }
           //
             console.log("inside checkForceSeq updatedflg", updatedflg);
          //  this.props.onForceseq(this.state.Seletedtripindex, updatedflg);
    }


    displayLoaderMessage = (index, msg) => {

            this.setState({
                enableloaderMsgWindow: true,
                Seletedtripindex: index,
                  loaderMessage : msg,

                anchorEl: null
            })
        }

     onSaveloaderNotes = (note) => {
            console.log("inside onsaveloadernotes");
            this.props.onloaderMsg(this.state.Seletedtripindex, note);
            this.setState({ enableloaderMsgWindow: false })
        }



    setStartTime(trip) {
        if ((trip.optistatus === "Optimized" || trip.optistatus === "optimized")) {
            return splitTime(trip.startTime);
        } else {
            let sameTrips = [];
            let loadHrs;
            if (this.props.tripsList && this.props.tripsList.length > 0) {
                this.props.tripsList.map((allTrips) => {
                    if (allTrips.code === trip.code) {
                        if (allTrips.optistatus === "Optimized") {
                            loadHrs = trip.vehicleObject.enddepotserv + trip.vehicleObject.startdepots;
                            sameTrips.push(allTrips)
                        }
                    }
                });
                if (sameTrips.length > 0) {
                    let timeHr = sameTrips[sameTrips.length - 1].endTime.split(':')[0];
                    let timeMin = sameTrips[sameTrips.length - 1].endTime.split(':')[1];
                    let time = convertHrToSec(timeHr) + convertMinToSec(timeMin) + convertHrToSec(loadHrs);
                    return formatTime(time)
                } else {
                    return splitTime(trip.vehicleObject.starttime);
                }
            } else {
                return trip.vehicleObject.starttime
            }
        }
    }
    /*
    getOptistatus = (data) => {
       let result =  nullAndNanChecking(trip.optistatus, 'status')
       if(result == 'Optimized'){
         return  {this.props.t('Optimized')}
        }
       else {
        return result;
      }
    }
    */

       SearchTrips = e => {
                          console.log("search content= ",e.target.value);
                          this.props.updateTripsSearchTerm(e);
                      }



    render() {

     console.log("T6 data in trips",this.props.tripsList);
        const currDate = moment(this.props.date).format('YYMMDD');
        let addEquipmentClose = () => this.setState({ addEquipmentShow: false });
        let addTrailClose = () => this.setState({ addTrailShow: false });
        let addAlertClose = () => this.setState({ addAlertShow: false });
        let addLogsClose = () => this.setState({showLogs : false});
        let addLoaderClose = () => this.setState({ enableloaderMsgWindow: false });
        return (

             <TabPane tabId="Trips">

                        <div className="reportlist-view tableCustomFixHead">
                            <table className="table m-0">
                                <thead>
                                    <tr className="">
                                        <th></th>
                                        <th  className="pl-2">
                                            <input type="checkbox" id="tripsCheckBoxAll" onClick={() => this.selectAllTripsPanel()} /></th>
                                        <th></th>

                                        <th> {this.props.t('VR Date')}</th>
                                        <th> {this.props.t('Details')}</th>
                                        <th > {this.props.t('TripCode')}</th>
                                        <th> Document Status </th>
                                        <th width="4%"> {this.props.t('Seq')} #</th>
                                         <th width="6%"> {this.props.t('Vehicle')}</th>
                                        <th width="4%"> {this.props.t('Status')}</th>
                                        <th width="3%"> {this.props.t('Lock')}</th>
                                        <th width="6%"> {this.props.t('Validate')}</th>
                                        <th width="6%"> {this.props.t('Validation')}</th>
                                         <th width="6%"> {this.props.t('Driver')}</th>
                                        <th> {this.props.t('DepartureSite')}</th>
                                        <th> {this.props.t('ArrivalSite')}</th>
                                        <th width="1%"> {this.props.t('Trailer')}</th>
                                        <th width="1%"> {this.props.t('Equipment')}</th>
                                        <th width="2%"> {this.props.t('Departure')}</th>
                                        <th width="2%"> {this.props.t('Arrival')}</th>
                                        <th width="6%"> Tot {this.props.t('Weight')}</th>
                                        <th width="6%"> Tot {this.props.t('Volume')}</th>
                                        <th width="6%">%  {this.props.t('Weight')} </th>
                                        <th width="6%">%  {this.props.t('Volume')}</th>
                                        <th width="6%"> {this.props.t('ENLV')}</th>
                                        <th width="6%"> {this.props.t('LIV')}</th>
                                        <th width="6%"> {this.props.t('Stops')}</th>
                                        <th width="6%"> Log </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(this.props.tripsList && this.props.tripsList || []).map((trip, i) => (

                                        <tr className="bg-blue" style={{ backgroundColor: this.getBgcolor(trip.code, trip.optistatus) }} key={i}>
                                               <td>
                                               <PopupState variant="popover" popupId="demo-popup-menu"
                                               >
                                                       {(popupState) => (
                                                         <React.Fragment>
                                                           <IconButton size="small">
                                                           <MoreVertIcon
                                                             variant="contained"
                                                             {...bindTrigger(popupState)}
                                                           ></MoreVertIcon>
                                                           </IconButton>
                                                           <Menu
                                                               {...bindMenu(popupState)}

                                                           anchorOrigin={{ vertical: 'bottom', horizontal: 'right'  }}
                                                            transformOrigin={{ vertical: 'top',horizontal: 'left'}}
                                                            >
                                                             <MenuItem onClick={() => this.onTriplogClick(trip.totalObject)} >Logs</MenuItem>
                                                           </Menu>
                                                         </React.Fragment>
                                                       )}
                                                     </PopupState>

                                            </td>
                                            <td className="pl-2"><input type="checkbox" name="tripsCheckBox" onClick={() => this.props.updateTripsGeoLocations(i)} /></td>
                                            <td>
                                                {trip.lock ? '' :
                                                    <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"
                                                        onClick={() => this.onConfirmDeleteClick(i, trip.docnum)} disabled={trip.lock}>
                                                        <i class="fa fa-trash"></i>
                                                    </button>}
                                            </td>
                                            <td><b>{moment.tz(trip.docdate, '').format('DD-MM-YYYY')}</b>
                                            </td>
                                            <td>
                                                {this.getVrDetailsLink(trip.lock, i, trip.tmsValidated)}
                                            </td>
                                            <td ><span className="vid">{trip.itemCode}</span></td>
                                             <td>
                                                                                        {trip.lock ? <div>{trip.pendingDocStatus} <Tooltip title={this.ListofDlv(trip.docDetails)}>
                                                                                                                                  <IconButton>
                                                                                                                                     <InfoOutlinedIcon color='blue' />
                                                                                                                                  </IconButton>
                                                                                                                                  </Tooltip> </div> : ''

                                                                                        }
                                                                                        </td>
                                            <td ><span className="vtrips">{trip.trips}</span></td>
                                            <td width="6%"><b>{trip.code}</b></td>
                                            <td width="4%"><span style={{ fontSize: '12pt'}} >{trip.optistatus ? trip.optistatus == "Optimized" ? this.props.t('Optimized') : nullAndNanChecking(trip.optistatus, 'status') : 'Open'}</span></td>
  <td width="3%">
                                                                                            {
                                                                                                this.getLockData(trip,trip.lock, i, trip.optistatus || 'open')
                                                                                            }
                                                                                        </td>
                                                                                        <td width="4%">
                                                                                            {this.getValidatebtn(trip,trip.tmsValidated, trip.lock, i,trip.pendingDocStatus)}
                                                                                        </td>
                                             <td width="6%"><span style={{ fontSize: '12pt'}}>
                                                                                             {(() => {
                                                                                                 if (trip.tmsValidated) {
                                                                                                     return (
                                                                                                         this.props.t('Validated')
                                                                                                     );
                                                                                                 } else {
                                                                                                     return (
                                                                                                         this.props.t('Non Validated')
                                                                                                     );
                                                                                                 }
                                                                                             })()}
                                                                                        </span> </td>
                                            <td width="6%">{trip.driverName}</td>
                                            <td>{trip.depSite}</td>
                                            <td>{trip.arrSite}</td>


                                            <td width="1%"><a className="custom-anchor" href="#" onClick={() => this.onTrailerClick(trip.trialerObject)}>{trip.trialerObject && trip.trialerObject.length > 0 ? trip.trialerObject.length : 0}</a></td>
                                            <td width="1%"><a className="custom-anchor" href="#" onClick={() => this.onEquipmentClick(trip.equipmentObject)}>{this.displayEquipments(trip)}</a></td>
                                            <td width="2%">{this.setStartTime((trip))}</td>
                                            <td width="2%">{(trip.optistatus === "Open" || trip.optistatus === "open") ? '' : nullAndNanChecking(trip.endTime, 'time')}</td>
                                            <td width="2%">{trip.totalWeight}</td>
                                            <td width="6%">{trip.totalVolume}</td>
                                            <td width="6%">{trip.weightPercentage}</td>
                                            <td width="6%">{trip.volumePercentage}</td>

                                            <td width="2%">{trip.pickups}</td>
                                            <td width="2%">{trip.drops}</td>
                                            <td width="6%"><span className="">{trip.stops}</span></td>
                                            <td data-toggle="tooltip" data-placement="top">
                                             <a href="#"
                                                                                         onClick={() => this.onTriplogClick(trip.totalObject)}
                                                                                     ><i class="fa fa-info-circle" aria-hidden="true"></i></a>
                                              </td>
                                            {/* <td width="2%"><a href="#" onClick = {() => this.props.onVRClick(trip) }><i class="fa fa-info-circle"
                                            aria-hidden="true"></i></a></td> */}
                                            {/* <td width="2%"><a href="#" onClick = {() => this.props.onVRClick(i)}><i class="fa fa-info-circle"
                                        aria-hidden="true"></i></a></td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

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

                                    show={this.state.addvalidateconfirmShow}
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


            </TabPane>
        );
    }
}

export default withNamespaces()(TripsList3);