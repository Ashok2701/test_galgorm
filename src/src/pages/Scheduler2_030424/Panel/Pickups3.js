import React from 'react';
import DisplayProducts from './DisplayProducts';
import { withNamespaces } from 'react-i18next';
import moment from 'moment';
import 'moment-timezone';
import DisplayInformationIconDetails from './DisplayInformationIconDetails';
import { convertHrToSec, formatTime, nullAndNanChecking } from '../converterFunctions/converterFunctions';
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
class Pickups3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addProductShow: false,
            addInfoShow: false,
            products: [],
            docNumber: "",
            doctype:"",
            logisticDetails: '',
        };
    }

     getBgcolor(type, docnum, doctype) {
                console.log("T1 inside bgcolor drop",this.props.trailerDropped +" ,"+type+" ,"+docnum);
               if (this.props.trailerDropped && type !==  '' && doctype === 'open') {
                   console.log("T1 drop if",this.props.trailerDropped);
                   if (this.props.droppedTrailers && !this.props.droppedTrailers.includes(type)) {
                          console.log("T1 inside if trailer doesn't exist drop");
                         return '';
                   }
                   else {
                      console.log("T1 inside if else - Trailer matched drop");
                      return '#feff99';
                   }
            }
            else {
              console.log("T1 drop no match else");
              return '';
            }
       }


    defaultColor(checked,dropdate , seldate){
        console.log("at drops-drop date",dropdate);
        console.log("at drops-sel date",seldate);
        console.log("at drops-checked",checked);

        var DAte1 = moment.tz(dropdate, '').format('YYYY-MM-DD');
        var SelectedDAte = moment.tz(seldate, '').format('YYYY-MM-DD');

 console.log("at drops-drop date",DAte1);
        console.log("at drops-sel date",SelectedDAte);

        var Dropd = new Date(DAte1);
        var Seld = new Date(SelectedDAte);

        if(Dropd == Seld){
             return '#FFFFB0';
        }
        else if(Dropd > Seld) {
           return '#D3FEFC';
        }
        else if(Dropd < Seld) {
          return '#FFE1E1';
        }
        else {
             return '#FFFFB0';
        }

          return '';
    }



    onDocClick = (product, docNum, doctype) => {

        const products = product;
        this.setState({
            addProductShow: true,
            products: products,
            docNumber: docNum,
            doctype : doctype
        });

    }

    dragStyle = (type, x) => {
        if (type === 'open'&& (x == '0' || x == '8' )) {
            return ("custom-enable");
        }
        return ("custom-disable");
    }

    colorStyle = (type, docnum) => {

        if (type === 'open') {
            return ("dot-green");
        }
        if (type === 'selected') {
            return ("dot-red");
        }
        return ("dot-blue");
    }


    displayPickStatus = (vStatus, x) => {

        const dropStatus = vStatus;
          const dlvyStatus = x
        if (dropStatus == 'open'&& (dlvyStatus == '0' || dlvyStatus == '8')) {
            return (
                <h6>
                    <span class='badge badge-warning text-uppercase'>{this.props.t('ToPlan')}</span>
                </h6>
            );
        }
         if (dropStatus == 'open' && dlvyStatus == '1') {
                            return (
                                <h6>
                                    <span class='badge badge-success text-uppercase'>{this.props.t('Planned')}</span>
                                </h6>
                            );
                        }
        if (dropStatus == 'Allocated' && (dlvyStatus == '0' || dlvyStatus == '8')) {
            return (
                <h6>
                  <span class='badge badge-success text-uppercase'>{this.props.t('Planned')}</span>
                </h6>
            );
        }
        if (dropStatus == 'selected' && (dlvyStatus == '0' || dlvyStatus == '8')) {
                    return (
                        <h6>
                            <span class='badge badge-success text-uppercase'>{this.props.t('Planned')}</span>
                        </h6>
                    );
                }
         if(dlvyStatus == '1') {
                  return (
                                  <h6>
                                      <span class='badge badge-success text-uppercase'>{this.props.t('Planned')}</span>
                                  </h6>
                              );
                }
                 if(dlvyStatus == '2') {
                          return (
                                          <h6>
                                              <span class='badge badge-primary text-uppercase'>{this.props.t('OntheWay')}</span>
                                          </h6>
                                      );
                        }
                if(dlvyStatus == '3') {
                          return (
                                          <h6>
                                              <span class='badge badge-warning text-uppercase'>{this.props.t('InProgress')}</span>
                                          </h6>
                                      );
                        }
                if(dlvyStatus == '4') {
                                  return (
                                                  <h6>
                                                      <span class='badge badge-success text-uppercase'>{this.props.t('Completed')}</span>
                                                  </h6>
                                              );
                                }
                if(dlvyStatus == '5') {
                                  return (
                                                  <h6>
                                                    <span class='badge badge-danger text-uppercase'>{this.props.t('Skipped')}</span>
                                                  </h6>
                                              );
                                }
                if(dlvyStatus == '6') {
                                          return (
                                                          <h6>
                                                              <span class='badge badge-dark text-uppercase'>{this.props.t('Rescheduled')}</span>
                                                          </h6>
                                                      );
                                        }
                if(dlvyStatus == '7') {
                                          return (
                                                          <h6>
                                                              <span class='badge badge-danger text-uppercase'>{this.props.t('Canceled')}</span>
                                                          </h6>
                                                      );
                                        }

    }




      displayCarrierColor = (carrier, color) =>
        {
          console.log("3 insdie carrier color");
           const carriername = carrier;
           var myStr = color;
           var subStr = myStr.match("background-color:(.*)");
           var s = subStr[1];
           console.log("3 insdie carrier colored",s);
           return (

                    <td> <span style={{ "backgroundColor": s }} >{carriername}</span></td>
                              );
        }


    displayPickupBadge = (typDoc) => {

        const pickupMvt = typDoc


        if (pickupMvt == 'PICK') {
            return (
                <h6>
                    <span class='badge badge-primary text-uppercase'>{this.props.t('PICK')}</span>
                </h6>
            );
        }
        if (pickupMvt == 'DLV') {
            return (
                <h6>
                    <span class='badge badge-success style="font-size:2rem'>{this.props.t('DLV')}</span>
                </h6>
            );
        }
        if (pickupMvt == 'PRECEIPT') {

            return (
                <h6>
                    <span class='badge badge-danger text-uppercase'>{this.props.t('PRECEIPT')}</span>
                </h6>
            );
        }
    }
    ascDescSymbol = (index) => {


        if (this.props.pickOrder[index] === 1) {
            return (
                "▼"
            );
        }
        if (this.props.pickOrder[index] === 0) {
            return (
                "▲"
            );
        }
    }
    onInfoClick = (logisticData, docNum) => {

        const logisticDetails = logisticData;
        this.setState({
            addInfoShow: true,
            logisticDetails: logisticDetails,
            docNumber: docNum
        });

    }

    addInfoClose = () => {
        this.setState({
            addInfoClose: false
        })
    }


       SearchPickups = e => {
                      console.log("search content= ",e.target.value);
                      this.props.updatePickupSearchTerm(e);
                  }




    render() {
     let addProductsClose = () => this.setState({ addProductShow: false });
     let addInfoIconClose = () => this.setState({addInfoShow : false});
     let pickupList = this.props.curPickupList;
        let selectedDate = this.props.currDate;
             if(this.props.checked){
                 pickupList = [];
                 if(this.props.curPickupList && this.props.curPickupList.length > 0){
                     this.props.curPickupList.map((pickup)=>{
                         if(pickup.type === "open" && (pickup.dlvystatus === '0' || pickup.dlvystatus === '8')){
                             pickupList.push(pickup)
                         }
                     })
                 }
     }



        return (
 <TabPane tabId="Pickups">
   <Row className="my-2">
                                <Col md="4">
                                  <FormGroup className="mb-0">
                                    <Input
                                      bsSize="sm"
                                      type="search"
                                      placeholder={this.props.t("SearchCaption")}
                                      className="form-control"
                                       onChange = {this.SearchPickups}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

            <div class="reportlist-view tableCustomFixHead">
                <table class= {"table table-sm "+ (this.props.trailerDropped ? " " : this.props.dayschecked ? " " : "table-striped m-0")}>

                    <thead class="custom-sort">
                        <tr>
                             <th>

                                                      </th>
                                                      <th onClick={() => this.props.sortPickup('docnum', 0)}>
                                                           {this.props.t('Transaction No')} {this.props.pickOrder[0] === 1 ? "▼" : "▲"}
                                                      </th>
                                                       {this.props.dayschecked &&
                                                       <th onClick={() => this.props.sortPickup('docdate', 11)}>
                                                                                                                  {this.props.t('Date')} {this.props.pickOrder[11] === 1 ? "▼" : "▲"}
                                                                                                             </th>

                                                                                                              }
                                                      <th>
                                                          {this.props.t('PairedDoc')}
                                                      </th>
                                                      <th onClick={() => this.props.sortPickup('doctype', 3)}>
                                                                                      {this.props.t('Type')}  {this.props.pickOrder[3] === 1 ? "▼" : "▲"}
                                                                                  </th>
                                                      <th onClick={() => this.props.sortPickup('bpcode', 1)}>
                                                                                     {this.props.t('Client Code')} {this.props.pickOrder[1] === 1 ? "▼" : "▲"}
                                                                                  </th>
                                                      <th onClick={() => this.props.sortPickup('bpname', 2)}>
                                                                                      {this.props.t('Client')} {this.props.pickOrder[2] === 1 ? "▼" : "▲"}
                                                      </th>
                                                      <th onClick={() => this.props.sortPickup('poscode', 4)}>
                                                          {this.props.t('postal')} {this.props.t('City')} {this.props.pickOrder[4] === 1 ? "▼" : "▲"}
                                                      </th>
                                                      <th  onClick={() => this.props.sortPickup('site', 9)}>
                                                           {this.props.t('Site')} {this.props.pickOrder[9] === 1 ? "▼" : "▲"}
                                                      </th>
                                                      <th onClick={() => this.props.sortPickup('vehicleCode', 7)}>
                                                           {this.props.t('Vehicle')} {this.props.pickOrder[7] === 1 ? "▼" : "▲"}
                                                      </th>
                                                      <th onClick={() => this.props.sortPickup('Trailer', 10)}>
                                                                                                                  {this.props.t('Trailer')} {this.props.pickOrder[10] === 1 ? "▼" : "▲"}
                                                                                  </th>
                                                       <th> {this.props.t("Carrier")} </th>
                                                      <th> {this.props.t("Driver")} </th>

                                                      <th>{this.props.t('tripno')} </th>
                                                      <th onClick={() => this.props.sortPickup('type', 8)}>
                                                           {this.props.t('Status')} {this.props.pickOrder[8] === 1 ? "▼" : "▲"}
                                                      </th>
                                                      <th>
                                                                                       {this.props.t('Add Code')}
                                                                                  </th>
                                                                                  <th>
                                                                                        {this.props.t('Add Desc')}
                                                                                   </th>


                                                      {/* <th onClick = { () => this.props.sortPickup('netweight', 5)}>
                                                                      Poids {this.props.pickOrder[5] === 1 ? "▼" : "▲"}
                                                                  </th> */}
                                                      {/* <th onClick = { () => this.props.sortPickup('volume', 6)}>
                                                                      Volume {this.props.pickOrder[6] === 1 ? "▼" : "▲"}
                                                                  </th> */}

                                                      <th>Info</th>
                                                      <th>{this.props.t('ServiceTime')}</th>
                                                                              </tr>
                    </thead>
                    <tbody>
                        {(pickupList || []).map((pickup, i) => {
                            let logisticDetails = {};
                            logisticDetails.loadBay = pickup.loadBay && pickup.loadBay;
                            logisticDetails.tailGate = pickup.tailGate && pickup.tailGate;
                            logisticDetails.waitingTime = pickup.waitingTime && formatTime(pickup.waitingTime);
                            logisticDetails.stackHeight = pickup.stackHeight && nullAndNanChecking(pickup.stackHeight);
                            logisticDetails.timings = pickup.timings && nullAndNanChecking(pickup.timings);
                            logisticDetails.packing = pickup.packing && pickup.packing;
                            logisticDetails.height = pickup.height && pickup.height;
                            logisticDetails.loadingOrder = pickup.loadingOrder && pickup.loadingOrder;
                        return (


                            <tr id={'pickup' + pickup.docnum}
                                className={this.dragStyle(pickup.type, pickup.dlvystatus)}
                                draggable={pickup.type === 'open' ? "true" : "false"}
                                style={{ backgroundColor: this.props.trailerDropped ? this.getBgcolor(pickup.trailer,pickup.docnum,pickup.type) :this.props.dayschecked ? this.defaultColor(this.props.dayschecked,pickup.docdate,selectedDate) : ''  }}
                                onDragStart={(event) =>
                                    this.props.handleDragStart(event, pickup, 'pickup', i)
                                }
                                key={'pickup' + i}
                            >
                                <td><img src="assets/img/pickup.png" alt="drops" class="rounded-circle" width="50"></img></td>
                                <td>
                                    <span style={{ cursor: 'pointer' }} onClick={() => this.onDocClick(pickup.products, pickup.docnum,pickup.doctype)}>{pickup.docnum}</span>
                                </td>
                                 {this.props.dayschecked &&
                                                                        <td>{moment.tz(pickup.docdate, '').format('YYYY-MM-DD')}</td>
                                                                                                                            }
                                <td>
                                    {pickup.pairedDoc}
                                </td>
                                <td>{this.displayPickupBadge(pickup.doctype)}</td>
                                <td>{pickup.bpcode}</td>
                                <td>{pickup.bpname}</td>
                                <td>{pickup.poscode}, {pickup.city}</td>
                                <td>{pickup.site}</td>
                                <td>{pickup.vehicleCode}</td>
                                <td>{pickup.trailer}</td>
                                 <td>
                                 {pickup.carrier && this.displayCarrierColor(pickup.carrier, pickup.carrierColor)}
                                 </td>
                                <td>{pickup.drivercode}</td>
                                <td>{pickup.tripno === "0" ? "" : pickup.tripno}</td>
                                <td>
                                    {/* // <span className= { this.colorStyle(pickup.type) }>{pickup.type}</span> */}
                                    <td width="3%">{this.displayPickStatus(pickup.type,pickup.dlvystatus)}</td>
                                </td>
                                 <td>{pickup.adrescode}</td>
                                <td>{pickup.adresname}</td>
                                {/* <td>{pickup.doctype ? pickup.doctype : pickup.movtype}</td> */}

                                {/* <td>{pickup.netweight} {pickup.weightunit}</td>
                                        <td>{pickup.volume} {pickup.volume_unit}</td> */}

                                <td data-toggle="tooltip" data-placement="top">
                                    <a href="#"
                                        onClick={() => this.onInfoClick(logisticDetails, pickup.docnum)}
                                    ><i class="fa fa-info-circle" aria-hidden="true"></i></a>
                                </td>
                                <td>
                                    {formatTime(convertHrToSec(pickup.serviceTime))}
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </table>

                <DisplayProducts
                    show={this.state.addProductShow}
                    onHide={addProductsClose}
                    products={this.state.products}
                    docNum={this.state.docNumber}
                    doctype = {this.state.doctype}
                ></DisplayProducts>

                <DisplayInformationIconDetails
                    show={this.state.addInfoShow}
                    onInfoIconHide = {addInfoIconClose}
                    data={this.state.logisticDetails}
                    dataType = "object"
                    docNum={this.state.docNumber}
                ></DisplayInformationIconDetails>
            </div>
</TabPane>




        );
    }
}

// export default Pickups;
export default withNamespaces()(Pickups3);