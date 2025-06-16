import React, { Component, createRef } from 'react'
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import DeleteConfirm from './DeleteConfirm';
import DisplayProducts from './DisplayProducts';
import ProductsDetailList from './ProductsDetailList';
import { withNamespaces } from 'react-i18next';
import { convertHrToSec, formatTime } from '../converterFunctions/converterFunctions';
import DisplayNotes from './DisplayNotes';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import mockData from './RailRoutingDeliveriesMockData.json';
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

const options = [
    'Document Message'
];

const ITEM_HEIGHT = 48;

class RouteMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMap: false,
            isList: true,
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
     //   this.updateMap();
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
        controlText.innerHTML =this.props.t('listview');
        controlUI.appendChild(controlText);
        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener("click", () => {
            this.showList();
        });
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


    onConfirmClick = (index, docnum, vehicleCode) => {
       
       
       
        this.setState({
            addConfirmShow: true,
            confirmMessage: 'Are you sure you want to Delete?',
            index: index,
            docnum: docnum,
            vehicleCode: vehicleCode
        })
    }

    displayRouteTypeDocBadge = (typDoc, pDropPairedDoc) => {
        const RouteMvt = typDoc;
        const dropPairedDoc = pDropPairedDoc
        if (RouteMvt == 'PICK') {
            return (
                <h5>
                    <td width="3%" ><span class='badge badge-primary text-uppercase'>{'PICK'}</span></td>
                </h5>
            );
        }
        if (RouteMvt == 'DLV') {
            if (dropPairedDoc.length > 1) {
                return (
                    <h5>
                        <td width="3%"><span class='badge badge-info style="font-size:2rem'>{'DLVEXCHANGE'}</span></td>
                    </h5>
                );
            }
            return (
                <h5>
                    <td width="3%" ><span class='badge badge-success style="font-size:2rem'>{'DLV'}</span></td>
                </h5>
            );
        }
        if (RouteMvt == 'PRECEIPT') {
            return (
                <h5>
                    <td width="3%" ><span class='badge badge-danger text-uppercase'>{'PRECEIPT'}</span></td>
                </h5>
            );
        }
    }

    onDetailList = () => {
        this.setState({
            ShowDetailList: true,
            Datalist: this.props.geoData
        });
    }

    displayDocumentMessage = (docNum, msg) => {

        this.setState({
            enableDocumnetMsgWindow: true,

            selectedDocNumber: docNum,
              noteMessage : msg,
            anchorEl: null
        })
    }
  displayCarrierMessage = (docNum, msg ,type) => {

        this.setState({
            enableCarrierMsgWindow: true,
            instructionType : type,
            selectedDocNumber: docNum,
              carrierMessage : msg,
            anchorEl: null
        })
    }

    displayBadge = (typeMvt, iSeq) => {
        const docmvt = typeMvt
        const Seq = iSeq + 1;
        if (docmvt == 'PICK') {
            return (
                <h5>
                    <td width="3%" class='priority'><span class='badge badge-primary text-uppercase'>{Seq}</span></td>
                </h5>
            );
        }
        if (docmvt == 'DLV') {
            return (
                <h5>
                    <td width="3%" class='priority'><span class='badge badge-success '>{Seq}</span></td>
                </h5>
            );
        }
        if (docmvt == 'PRECEIPT') {
            return (
                <h5>
                    <td width="3%" class='priority'><span class='badge badge-warning text-uppercase'>{Seq}</span></td>
                </h5>
            );
        }
    }

    onConfirmNo = () => {
        this.setState({
            addConfirmShow: false
        })
    }

    onConfirmYes = (index, docnum) => {
        let type;
          
        if (this.state.confirmMessage.includes("Delete")) {
            type = "Delete";
             
            this.props.onTripDelete(index, docnum, type, this.state.vehicleCode);
        } else {
         
            this.props.onTripDelete(index, docnum);
        }

        this.setState({
            addConfirmShow: false
        })
    }

    onDocClick = (product, docNum, doctype) => {
        const products = product;
        this.setState({
            addProductShow: true,
            products: products,
            docNumber: docNum,
            doctype: doctype
        });
    }

    getBgcolor(qtyflage) {

        if (qtyflage === true) {
            return '#feff99';
        }
        else {
            return '';
        }
    }

    onSaveNotes = (note) => {
        
        this.props.onDocMsg(this.state.selectedDocNumber, note,'doc');
        this.setState({ enableDocumnetMsgWindow: false })
    }

onSaveCarrierNotes = (note , type) => {
         

      if(type === 'carrier') {
        this.props.onDocMsg(this.state.selectedDocNumber, note,'carrier');
        }
       else {
        this.props.onDocMsg(this.state.selectedDocNumber, note,'loader');
       }
        this.setState({ enableCarrierMsgWindow: false })
}
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
       
        let addProductsClose = () => this.setState({ addProductShow: false });
        let Productlist_win_Close = () => this.setState({ ShowDetailList: false });
        let addNotesClose = () => this.setState({ enableDocumnetMsgWindow: false });
         let addCarierNotesClose = () => this.setState({ enableCarrierMsgWindow: false });
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);


        return (

            <div class="col-md-6 pt-0 pb-0 pr-0 pl-0 routeMapOuter" >
                <div className="mapouter topsection">
                    <div class="reportlist-view" style={{ display: this.state.isList ? "block" : "none" }}>
                        <button type="button" class="btn btn-secondary btn-sm" onClick={this.props.updateTimeLine}>{this.props.t('Updatebtn')}</button>
                        &nbsp; &nbsp;
                        <button type="button" class="btn btn-secondary btn-sm" onClick={this.onDetailList}>{this.props.t('DetailList')}</button>

                        {/* <table class="table" id="diagnosis_list"> */}
                        <table class="table table-sm " id="diagnosis_list">
                            <thead style={{ textAlign: 'left' }}>
                                <tr>
                                    <th></th>
                                    <th width="3%" class="pl-2">{this.props.t('Seq')} #</th>
                                    <th width="6%">{this.props.t('Vehicle')}</th>
                                    <th width="6%">Document #</th>
                                    <th width="6%">{this.props.t('Site')}</th>
                                    <th width="6%">{this.props.t('Client Code')}</th>
                                    <th width="6%">{this.props.t('Client')}</th>
                                    <th width="6%">{this.props.t('postal City')}</th>
                                    <th width="6%">{this.props.t('Weight')}</th>
                                    <th width="6%">{this.props.t('Volume')}</th>

                                    <th width="6%">{this.props.t('ServiceTime')}</th>
                                    <th width="6%">{this.props.t('WaitingTime')}</th>
                                    <th width="0%" class="pairedDoc" style={{ display: 'none' }}>{this.props.t('PairedDoc')}</th>
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

                                            <td width="6%">{data.site}</td>
                                            <td width="6%">{data.bpcode}</td>
                                            <td width="6%">{data.bpname}</td>
                                            <td width="6%">{data.poscode} , {data.city}</td>
                                            <td width="6%">{data.netweight} {data.weightunit}</td>
                                            <td width="6%">{data.volume} {data.volume_unit}</td>

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

            </div>
            </div>

        );
    }
}

export default withNamespaces()(RouteMap);