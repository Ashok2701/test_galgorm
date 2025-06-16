import React from 'react';
import moment from 'moment';
import mockData from './TripListMockData.json';
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

class TripList extends React.Component {

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
            confirmMessage: 'Validconfirm',
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
              confirmMessage: 'AllValidate',
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
      
        this.setState({
            addvalidateconfirmShow: false
        })
    }




    onConfirmClick = (index, opti, lock) => {
        if (lock) {
            var trips = this.props.tripsList;
            var clickedTrip = trips[index];

                this.setState({
                    confirmMessage: 'unlockTrip',
                    addunlockconfirmShow: true,
                    index: index,
                });
            }

         else {
                this.setState({
                    confirmMessage: 'lockTrip',
                    addConfirmShow: true,
                    index: index,
                    lockButton: false,
                })
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


    getVRdetailBtnClick(lock,i) {
             if(lock){
                        
                       this.props.onVRClick(i, false);
                   }
                   else{
                       
                        this.props.updateTripsGeolocationbeforelock(i);
                   }

        }






    onConfirmDeleteClick = (index, tripcode) => {
        this.setState({
            addDeleteconfirmShow: true,
            confirmMessage: 'DeleteTrip',
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

    getBgcolor(t) {
        let color = '#fff';

        let breakCondition = false;
      this.props.curRailcarList &&  this.props.curRailcarList.map((railcar) => {

            if (railcar.railcarid === t && !breakCondition) {
                var myStr = railcar.color;
                var subStr = myStr.match("background-color:(.*)");
                color = subStr[1];
                breakCondition = true;
            }
        });

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
        
        //this.props.ForcedSequnce(i);
    }

    checkForceSeq = (index,check) => {
           let updatedflg;
            
            if(check){
              
              updatedflg = false;

            }
            else {
              
              updatedflg = true;
            }
           //
             
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
            
            this.props.onloaderMsg(this.state.Seletedtripindex, note);
            this.setState({ enableloaderMsgWindow: false })
        }




    render() {

     
        const currDate = moment(this.props.date).format('YYMMDD');

        return (


                        <div className='float-child'>
                            <h4 align="left">Trips List </h4>
                            <div class="reportlist-view">
                            <table class="table table-striped tripsList">
                                <thead>
                                    <tr className="">
                                        <th  className="pl-2">
                                            <input type="checkbox" id="tripsCheckBoxAll" onClick={() => this.selectAllTripsPanel()} /></th>
                                        <th></th>

                                        <th > Trip Code</th>
                                        <th> Trip </th>
                                        <th width="6%"> Vehicle</th>
                                        <th width="4%"> Status</th>
                                        <th width="3%"> Lock</th>
                                        <th width="3%"> Type</th>
                                         <th width="6%">Stops</th>
                                        <th> StartLocation</th>
                                        <th> Destination</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {(this.props.tripsList && this.props.tripsList || []).map((trip, i) => (

                                        <tr className="bg-blue" style={{ backgroundColor: this.getBgcolor(trip.code) }} key={i}>

                                            <td className="pl-2"><input type="checkbox" name="tripsCheckBox1" onClick={() => this.props.updateTripsGeoLocations(i)} /></td>

                                            <td>

                                            </td>
                                            <td ><span className="vid">{trip.itemCode}</span></td>
                                            <td ><span className="vtrips">{trip.trips}</span></td>
                                            <td ><b>{trip.code}</b></td>
                                            <td ><span style={{ fontSize: '12pt'}} >{trip.optistatus ? trip.optistatus == "Optimized" ? 'Optimized' : trip.optistatus : 'Open'}</span></td>
                                             <td>

                                                                                                                                    </td>
                                            <td >{trip.driverName}</td>
                                              <td><span className="">{trip.stops}</span></td>

                                            <td>{trip.site}</td>
                                            <td>{trip.site}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>

        );
    }
}

export default TripList;
