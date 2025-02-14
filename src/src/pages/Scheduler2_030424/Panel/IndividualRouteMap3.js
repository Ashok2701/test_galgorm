import React, { Component, createRef } from 'react'
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import DeleteConfirm from './DeleteConfirm';
import Box from '@material-ui/core/Box';
import DisplayMapInfo from "./DisplayMapInfo";
import DisplayProducts from './DisplayProducts';
import ProductsDetailList from './ProductsDetailList';
import { withNamespaces } from 'react-i18next';
import { convertHrToSec, formatTime } from '../converterFunctions/converterFunctions';
import DisplayNotes from './DisplayNotes';
import DisplayCarrierNotes from './DisplayCarrierNotes';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import '../dashboard.scss';
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



const options = [
    'Document Message'
];

const ITEM_HEIGHT = 48;

class IndividualRouteMap3 extends React.Component {
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

    }



    customControl = (controlDiv, map) => {
        const controlUI = document.createElement("div");
        controlUI.style.backgroundColor = "#fff";
        controlUI.style.border = "2px solid #fff";
        controlUI.style.borderRadius = "2px";
        controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
        controlUI.style.cursor = "pointer";
        //controlUI.style.marginBottom = "22px";
        controlUI.style.textAlign = "center";
        controlUI.title = "Click to recenter the map";
        controlDiv.appendChild(controlUI);
        // Set CSS for the control interior.
        const controlText = document.createElement("div");
        controlText.style.color = "rgb(25,25,25)";
        controlText.style.fontFamily = "Roboto,Arial,sans-serif";
        controlText.style.fontWeight = "bold";
        controlText.style.fontSize = "12px";
        controlText.style.lineHeight = "15px";
        controlText.style.paddingLeft = "2px";
        controlText.style.paddingRight = "2px";

    }

    buildContent = (place) => {

        // const url = "https://tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/BURV12PRD_BPRPROD/$sessions?f=GESSDH/2/M/" + place.docnum;
        const url = "https://tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/DEMOTMSFR/$sessions?f=GESSDH/2//M/" + place.docnum;
        return (
            <div id="content">
                <div id="siteNotice"></div>
                <div id="bodyContent">
                    {place.docnum && <a href={url}>{place.docnum}</a>}
                    {place.city}
                </div>
            </div>
        );
    }

    updateMap = () => {
        console.log("insdie updatemap of indiv map3")
        document.getElementById('google-map1').innerHTML = "";
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
            var map1 = new window.google.maps.Map(document.getElementById('google-map1'), mapOptions);
            var DepartureSite = "";
            var SiteCode = "";
            const centerControlDiv = document.createElement("div");
            this.customControl(centerControlDiv, map1);
            map1.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
            markerArray.map((place) => {
                console.log("inside map",place);
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
                        },
                        label: {
                            text: place.text
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
                /*else if (place.type === "arrival") {
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
                                */
                // const url = "http://125.18.84.158:8124/syracuse-main/html/main.html?url=/trans/x3/erp/BURV12PRD_BPRPROD/$sessions?f=GESSDH/2/M/" + place.docnum;
                var url = "";
                var content;
                if (place.doctype == 'PRECEIPT') {
                    url = "https://tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/DEMOTMSFR/$sessions?f=GESXX10CPTH/2//M/" + place.docnum;
                    content = `<DisplayMapInfo data={place} type={place.doctype}
                                  OncloseClick={OncloseClick} />`
                }
                else if (place.doctype == 'DLV') {
                    url = "https://tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/DEMOTMSFR/$sessions?f=GESSDH/2//M/" + place.docnum;
                    content = `<div id='content'>
                                <div id='siteNotice'></div>
                                 <div id = 'bodyContent'>
                                   <Box component="span" display="block" style={{ width: "100%", margin: '8px 0px 8px 8px' }} p={1} {...box1}>
                                      <div>
                              {place.docnum} -  {place.bpname}
                              &nbsp;&nbsp; &nbsp;
                              <span> <Box borderColor="#FFFF00"
                                {...numberProps} >  place.id ? place.id : this.props.num + 1
                              </Box> </span>
                            </div>
                        </Box>
                        {i === 0 && <CancelTwoToneIcon style={{ color: "#7ace4c", float: 'right', fontSize: 20 }}
                          onClick={() => this.props.OncloseClick(this.props.type, this.props.num)} />}
                      </div>
                      <Box component="span" display="block" m={1} p={1} {...box2}>
                        <div> <p style={{ color: 'white' }}>DETAILS</p>
                          <div>RouteName: <span style={{ color: '#FFFF00' }}>place.docnum</span></div>
                          <div> Stop: <span style={{ color: '#FFFF00' }}>{place.id ? place.id : this.props.num + 1}</span></div>
                          <div>ETA: <span style={{ color: '#FFFF00' }}>{date + ' ' + place.arrival}</span></div>
                          <div> ETD: <span style={{ color: '#FFFF00' }}>{date + ' ' + place.end}</span></div>
                          <div>City: <span style={{ color: '#FFFF00' }}>{place.city}</span></div>
                          <div>Type: <span style={{ color: '#FFFF00' }}>{place.doctype}</span></div>
                          <div>Order Reference: <span style={{ color: '#FFFF00' }}></span></div>
                          <div>Weight: <span style={{ color: '#FFFF00' }}>{place.netweight + ' KG'}</span></div>
                          <div>Volume: <span style={{ color: '#FFFF00' }}>{place.volume}</span></div>
                        </div>
                      </Box>                                 </div>
                               </div>`;

                }
                else if (place.doctype == 'PICK') {
                    url = "https://tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/DEMOTMSFR/$sessions?f=GESPRH2/2//M/" + place.docnum;
                    content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";

                }
                else {
                    url = "https://tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/DEMOTMSFR/$sessions?f=GESFCY/2//M/" + place.docnum;
                    content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + SiteCode + "," + place.docnum + "</a></br>" + place.city + "</div></div>";

                }
                var infowindow = new window.google.maps.InfoWindow({
                    content: content
                });
                marker.setMap(map1);
                marker.addListener('click', function () {
                    infowindow.open(map1, marker);
                });
            });
            this.props.updateMagChaged();
        } else {
            var myLatlng1 = new window.google.maps.LatLng(48.864716, 2.349014);
            var mapOptions = {
                zoom: 10,
                center: myLatlng1
            }
            var map1 = new window.google.maps.Map(document.getElementById('google-map1'), mapOptions);
        }
    }


    render() {
       console.log("inside addupdateTrip",this.props.geoData);
        let addProductsClose = () => this.setState({ addProductShow: false });
        let Productlist_win_Close = () => this.setState({ ShowDetailList: false });
        let addNotesClose = () => this.setState({ enableDocumnetMsgWindow: false });
         let addCarierNotesClose = () => this.setState({ enableCarrierMsgWindow: false });
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        if (this.props.mapChanged) {
            this.updateMap();
        }

        return (

            <div class="col-lg-6 pt-0 pb-0 pr-0 pl-0 routeMapOuter1" style={{'height':'36vh'}} >
                <div className="mapouter topsection">
                    <div class="gmap_canvas" style={{ display: this.state.isMap ? "block" : "none" }}>
                        <div
                            id="google-map1"
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>
                <DeleteConfirm
                    show={this.state.addConfirmShow}
                    onHide={this.onConfirmNo}
                    confirmDelete={this.onConfirmYes}
                    index={this.state.index}
                    docnum={this.state.docnum}
                    confirmMessage={this.state.confirmMessage}
                ></DeleteConfirm>
                <DisplayProducts
                    show={this.state.addProductShow}
                    onHide={addProductsClose}
                    products={this.state.products}
                    docNum={this.state.docNumber}
                    doctype={this.state.doctype}
                ></DisplayProducts>
                <ProductsDetailList
                    show={this.state.ShowDetailList}
                    onHide={Productlist_win_Close}
                    Datalist={this.state.Datalist}
                    vehiclePanel={this.props.vehiclePanel}
                ></ProductsDetailList>
                <DisplayNotes
                    show={this.state.enableDocumnetMsgWindow}
                    onHide={addNotesClose}
                    notes={this.state.noteMessage}
                    onSaveNotes={this.onSaveNotes}
                    displayEdit={true}
                ></DisplayNotes>
                <DisplayCarrierNotes
                  show={this.state.enableCarrierMsgWindow}
                  onHide={addCarierNotesClose}
                  notes={this.state.carrierMessage}
                  type = {this.state.instructionType}
                  onSaveCarrierNotes={this.onSaveCarrierNotes}
                  displayEdit={true}
                ></DisplayCarrierNotes>
            </div>

        );
    }
}

export default withNamespaces()(IndividualRouteMap3);