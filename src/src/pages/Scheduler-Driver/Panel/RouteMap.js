import React from 'react';
import Select from "react-select";
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import { AgGridReact } from "ag-grid-react";
import RouteInfoRenderer from "../RouteInfoRenderer";
import Button from '@material-ui/core/Button';

import { convertHrToSec, formatTime } from '../converterFunctions/converterFunctions';
import DisplayNotes from './DisplayNotes';
import DisplayCarrierNotes from './DisplayCarrierNotes';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
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


function renumber_table(tableID) {
    $(tableID + " tr").each(function () {
        let data = $(this).find('.type')[0];
        if (data) {
            var classCss;
            if (data.innerText === 'PICK' || data.innerText === 'PREP EXP') {
                classCss = 'badge-primary'
            } else if (data.innerText === 'PRECEIPT' || data.innerText === 'ENLV') {
                classCss = 'badge-warning'

            } else {
                //LIV-->DLV
                classCss = 'badge-success'
            }
            var count = $(this).parent().children().index($(this)) + 1;
            var innerHTML = `<span class='badge ${classCss}  text-uppercase'>` + count + "</span>";
            $(this).find('.priority').html(innerHTML);
        }
    });
}


class RouteMap extends React.Component {
 constructor(props) {
         super(props);
         this.state = {
             isMap: true,
             isList: false,
             index: -1,
             docnum: '',
             addConfirmShow: false,
             confirmMessage: '',
             addProductShow: false,
             products: [],
             docNumber: "",
             doctype: "",
             sortable: false,
             groData: this.props.geoData || [],
             vehicleCode: '',
             enableDocumnetMsgWindow: false,
             enableCarrierMsgWindow : false,
             selectedDocNumber: '',
             noteMessage: '',
             noteMessageflg : false,
             carrierMessage:'',
             instructionType : '',
             anchorEl: null
         }
     }

     componentDidMount() {
         this.updateMap();
         //Make diagnosis table sortable
         $("#diagnosis_list tbody").sortable({
             stop: function (e, ui) {
                 let lock = ui.item[0].innerHTML;
                 if (lock.includes('unlock')) {
                     renumber_table('#diagnosis_list')
                 } else {
                     $(this).sortable('cancel');
                     $(ui.sender).sortable('cancel');
                 }
             }
         });
     }

     updateMap = () => {
             if (this.props.markers !== undefined && this.props.markers.length > 0) {
                 var centerLocation = this.props.markers[0];
                 var mapOptions = {
                     zoom: 10,
                     center: {
                         lat: centerLocation.lat,
                         lng: centerLocation.lng
                     }
                 }
                 var markerArray;
                 markerArray = this.props.markers;
                 if (this.props.selectedTrips && this.props.selectedTrips[0]) {
                     if (this.props.selectedTrips[0].depSite) {
                         let depatureSite = {};
                         if (this.props.sites && this.props.sites.length > 0) {
                             this.props.sites.map((site) => {
                                 if (site.id === this.props.selectedTrips[0].depSite) {
                                     depatureSite.city = site.value;
                                     depatureSite.docnum = site.value;
                                     depatureSite.id = site.id;
                                     depatureSite.lat = site.lat;
                                     depatureSite.lng = site.lng;
                                     depatureSite.value = site.value;
                                 }
                             });
                             markerArray.shift();
                             markerArray.unshift(depatureSite);
                         }
                     }

                     if (this.props.selectedTrips[0].arrSite) {
                         let arrivalSite = {};
                         this.props.sites.map((site) => {
                             if (site.id === this.props.selectedTrips[0].arrSite) {
                                 arrivalSite.city = site.value;
                                 arrivalSite.docnum = site.value;
                                 arrivalSite.idd = site.id;
                                 arrivalSite.lat = site.lat;
                                 arrivalSite.lng = site.lng;
                                 arrivalSite.value = site.value;
                                 arrivalSite.arrivalCheck = "arrival";
                             }
                         });
                         markerArray.push(arrivalSite);
                     }
                 }
                 //var map = new window.google.maps.Map(document.getElementById('google-map'), mapOptions);
                 var DepartureSite = "";
                 var SiteCode = "";
          //       const centerControlDiv = document.createElement("div");
            //     this.customControl(centerControlDiv, map);
              //   map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
                 markerArray.map((place) => {
                     var marker = null;
                     if (place.id !== undefined) {
                         DepartureSite = place.id;
                         SiteCode = place.id;
                         place.docnum = place.value;
                         place.city = place.value;
                         marker = new window.google.maps.Marker({
                             position: { lat: place.lat, lng: place.lng },
                             title: place.value,
                             icon: {
                                 url: '/assets/img/address.png'
                             }
                         });
                     } else if (place.panelType && place.panelType === 'pickup') {
                         marker = new window.google.maps.Marker({
                             position: { lat: place.lat, lng: place.lng },
                             title: place.city,
                             icon: {
                                 url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                             }
                         });
                     } else if (place.panelType && place.panelType === 'drop') {
                         marker = new window.google.maps.Marker({
                             position: { lat: place.lat, lng: place.lng },
                             title: place.city,
                             icon: {
                                 url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                             }
                         });
                     }
                     else if (place.arrivalCheck === "arrival") {
                         var ArrIcon = '';
                         SiteCode = place.idd;
                         if (DepartureSite != place.idd) {
                             ArrIcon = '/assets/img/home36.png';
                         }
                         else {
                             ArrIcon = '/assets/img/address.png';
                         }
                         marker = new window.google.maps.Marker({
                             position: { lat: place.lat, lng: place.lng },
                             title: place.city,
                             icon: {
                                 url: ArrIcon
                             }
                         });
                     }
                     else if (place.type === "arrival") {
                                         var ArrIcon = '';
                                          SiteCode = place.idd;
                                         if(DepartureSite != place.idd){
                                            ArrIcon = '/assets/img/home36.png';
                                         }
                                         else{
                                            ArrIcon = '/assets/img/address.png';
                                         }
                                         marker = new window.google.maps.Marker({
                                             position: { lat: place.lat, lng: place.lng },
                                             title: place.city,
                                             icon: {
                                                 url: ArrIcon
                                             }
                                         });
                                     }

                     // const url = "http://125.18.84.158:8124/syracuse-main/html/main.html?url=/trans/x3/erp/BURV12PRD_BPRPROD/$sessions?f=GESSDH/2/M/" + place.docnum;
                     var url = "";
                     var content;
                     if (place.doctype == 'PRECEIPT') {
                         url = "https://mileschemical.mycloudatwork.com/syracuse-main/html/main.html?url=/trans/x3/erp/MILESPILOT/$sessions?f=GESXX10CPTH/2//M/" + place.docnum;
                         content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";

                     }
                     else if (place.doctype == 'DLV') {
                         url = "https://mileschemical.mycloudatwork.com/syracuse-main/html/main.html?url=/trans/x3/erp/MILESPILOT/$sessions?f=GESSDH/2//M/" + place.docnum;
                         content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";

                     }
                     else if (place.doctype == 'PICK') {
                         url = "https://mileschemical.mycloudatwork.com/syracuse-main/html/main.html?url=/trans/x3/erp/MILESPILOT/$sessions?f=GESPRH2/2//M/" + place.docnum;
                         content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";

                     }
                     else {
                         url = "https://mileschemical.mycloudatwork.com/syracuse-main/html/main.html?url=/trans/x3/erp/MILESPILOT/$sessions?f=GESFCY/2//M/" + place.docnum;
                         content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + SiteCode + "," + place.docnum + "</a></br>" + place.city + "</div></div>";

                     }
                     var infowindow = new window.google.maps.InfoWindow({
                         content: content
                     });
                     //marker.setMap(map);
                     marker.addListener('click', function () {
                    //     infowindow.open(map, marker);
                     });
                 });
                 this.props.updateMagChaged();
             } else {
                 var myLatlng1 = new window.google.maps.LatLng(48.864716, 2.349014);
                 var mapOptions = {
                     zoom: 10,
                     center: myLatlng1
                 }
                 //var map = new window.google.maps.Map(document.getElementById('google-map'), mapOptions);
             }
         }


 showMap = () => {
        this.setState({
            isMap: true,
            isList: false
        });
    }

    showList = () => {
        this.setState({
            isMap: false,
            isList: true
        });
    }

  render(){
     return(
      <>
      <Card className="mb-3">
                        <CardBody className="p-2">
                        <div class="reportlist-view" style={{ display: this.state.isList ? "block" : "none" }}>
                                                <button type="button" class="btn btn-secondary btn-sm" onClick={this.props.updateTimeLine}>{'Updatebtn'}</button>
                                                &nbsp; &nbsp;
                                                <button type="button" class="btn btn-secondary btn-sm" onClick={this.onDetailList}>{'DetailList'}</button>
                                                &nbsp; &nbsp;
                                                <button type="button" class="btn btn-secondary btn-sm" onClick={this.showMap}>{'Map'}</button>

                                                {/* <table class="table" id="diagnosis_list"> */}
                                                <table class="table table-sm " id="diagnosis_list">
                                                    <thead style={{ textAlign: 'left' }}>
                                                        <tr>
                                                            <th></th>
                                                            <th width="3%" class="pl-2">{'Seq'} #</th>
                                                            <th width="6%">{'Vehicle'}</th>
                                                            <th width="6%">Document #</th>
                                                            <th width="6%">{'Type'}</th>
                                                            <th width="6%">{'Site'}</th>
                                                            <th width="6%">{'Client Code'}</th>
                                                            <th width="6%">{'Client'}</th>
                                                            <th width="6%">{'postal'} {'City'}</th>
                                                            <th width="6%">{'Weight'}</th>
                                                            <th width="6%">{'Volume'}</th>
                                                            <th width="6%">{'Arrival'}</th>
                                                            <th width="6%">{'Departure'}</th>
                                                            <th width="6%">{'ServiceTime'}</th>
                                                            <th width="6%">{'WaitingTime'}</th>
                                                            <th width="0%" class="pairedDoc" style={{ display: 'none' }}>{'PairedDoc'}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(this.props.geoData && this.props.geoData || []).map((geoData, i) => {
                                                            let data = geoData;
                                                            this.props.markers.map((marker, index) => {
                                                                if (data.docnum === marker.docnum) {
                                                                    data.lock = marker.lock;
                                                                }
                                                            })
                                                            return (
                                                                <tr key={i} id={data.docnum}
                                                                    style={{ backgroundColor: data.qtyflag ? this.getBgcolor(data.qtyflag) : '' }}
                                                                >
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
                                                                                     <MenuItem onClick={() => this.displayDocumentMessage(data.docnum, data.noteMessage)}>Document Instructions</MenuItem>
                                                                                    {data.doctype && data.doctype === 'DLV' ?
                                                                                    <MenuItem onClick={() => this.displayCarrierMessage(data.docnum, data.CarrierMessage , 'carrier')}>Carrier Instructions</MenuItem>
                                                                                     :'' }
                                                                                     {data.doctype && data.doctype === 'DLV' || data.doctype === 'PICK' ?
                                                                                       <MenuItem onClick={() => this.displayCarrierMessage(data.docnum, data.loaderMessage , 'loader')}>Loader Instructions</MenuItem>
                                                                                     :'' }
                                                                                   </Menu>
                                                                                 </React.Fragment>
                                                                               )}
                                                                             </PopupState>

                                                                    </td>
                                                                    <td width="3%">{this.displayBadge(data.doctype, i)}</td>
                                                                    <td width="6%" name="itemCode">{data.vehicleCode}</td>
                                                                    <td width="6%" name="docNum" class="docnum">
                                                                        <a href="#" onClick={() => this.onDocClick(data.products, data.docnum, data.doctype)}>{data.docnum}</a>
                                                                    </td>
                                                                    <td width="6%" class="type" >
                                                                        {data.doctype ? this.displayRouteTypeDocBadge(data.doctype, data.pairedDoc)
                                                                            : this.displayRouteTypeDocBadge(data.movtype, data.pairedDoc)}
                                                                    </td>
                                                                    <td width="6%">{data.site}</td>
                                                                    <td width="6%">{data.bpcode}</td>
                                                                    <td width="6%">{data.bpname}</td>
                                                                    <td width="6%">{data.poscode} , {data.city}</td>
                                                                    <td width="6%">{data.netweight} {data.weightunit}</td>
                                                                    <td width="6%">{data.volume} {data.volume_unit}</td>
                                                                    <td width="6%">{data.arrival && data.arrival}</td>
                                                                    <td width="6%">{data.end && data.end}</td>
                                                                    <td width="6%">{formatTime(convertHrToSec(data.serviceTime))}</td>
                                                                    <td width="6%">{formatTime(convertHrToSec(data.waitingTime))}</td>

                                                                    <td width="3%">
                                                                        {data.lock || (this.props.trips && this.props.trips[0] && this.props.trips[0].lock) ? '' :
                                                                            <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"
                                                                                onClick={() => this.onConfirmClick(i, data.docnum, data.vehicleCode)} disabled={data.lock}>
                                                                                <i class="fa fa-trash"></i>
                                                                            </button>}
                                                                    </td>
                                                                    <td width="0%" class="pairedDoc" style={{ display: 'none' }}>{data.pairedDoc}</td>
                                                                    {(data.lock || (this.props.trips && this.props.trips[0] && this.props.trips[0].lock)) ? <td width="0%" class="lock" style={{ display: 'none' }}>lock</td> :
                                                                        <td width="0%" class="lock" style={{ display: 'none' }}>unlock</td>}
                                                                    {/* <td width="0%" class="lock" style={{ display: 'none' }}>
                                                                        {data.lock}
                                                                    </td> */}
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                        <div class="gmap_canvas" style={{ display: this.state.isMap ? "block" : "none" }}>
                          <div
                            id="gmaps-markers"
                            className="gmaps"
                            style={{ position: "relative" }}
                          >
                          <div><Button size="small" onClick={this.showList}> ListView </Button> </div>
                            <Map
                              google={this.props.google}
                              style={{ width: "100%", height: "100%" }}
                              zoom={14}
                            >
                            <div>list inside view</div>
                              <Marker onClick={this.onMarkerClick} />
                              <InfoWindow>
                                <div>
                                  <h1>sameple test</h1>
                                </div>
                              </InfoWindow>
                            </Map>
                          </div>
                          </div>
                        </CardBody>
                      </Card>
      </>
     );
  }
}
export default GoogleApiWrapper({
                 apiKey: "AIzaSyAQb-7NDLDsJh-l3siJQ_1gEw2lBgWKYlU",
                 v: "3",
               })(RouteMap);

