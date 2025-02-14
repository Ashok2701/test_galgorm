import React from 'react';
import DisplayProducts from './DisplayProducts';
import { withNamespaces } from 'react-i18next';
import moment from 'moment';
import 'moment-timezone';
import DisplayInformationIconDetails from './DisplayInformationIconDetails';
import { convertHrToSec, formatTime, nullAndNanChecking } from '../converterFunctions/converterFunctions';
import "../dashboard.scss";
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
class Drops3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addProductShow: false,
            addInfoShow: false,
            products: [],
            docNumber: "",
            skills : "",
            doctype:"",
            logisticDetails: '',
        };
    }


   groupingColor(color) {
           console.log("3 insdie grouping color");

                  var myStr = color;
                  if(myStr?.myStr.length > 0) {
                  var subStr = myStr.match("background-color:(.*)");
                  var s = subStr[1];
                  return s;
                  }
                  else {
                    return '#FFF';
                  }
   }


    defaultColor(checked,dropdate , seldate){

        var DAte1 = moment.tz(dropdate, '').format('YYYY-MM-DD');
        var SelectedDAte = moment.tz(seldate, '').format('YYYY-MM-DD');


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


   getBgcolor(type, docnum, doctype) {
            console.log("T1 inside bgcolor drop",this.props.trailerDropped +" ,"+type+" ,"+docnum+", "+doctype);
           if (this.props.trailerDropped && type !==  '' && doctype === 'open' ) {
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


    onDocClick = (product, docNum, doctype, skills) => {
        const products = product;
       // setTomTomNotification(true)
        this.setState({
            addProductShow: true,
            products: products,
            docNumber: docNum,
            skills : skills,
            doctype : 'DLV'
        });
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

    dragStyle = (type, x) => {
        if (type === 'open' && (x == '0' || x == '8' )) {
            return ("custom-enable");
        }
        return ("custom-disable");
    }
    colorStyle = (type) => {
        if (type === 'open') {
            return ("dot-green");
        }
        if (type === 'selected') {
            return ("dot-red");
        }
        return ("dot-blue");
    }

    //add carrier color
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



  //add Rotuecode color
    displayRouteCodeColor = (routeCodeDesc, color) =>
    {
      console.log("3 insdie carrier color");
       const RoutcodeDesc = routeCodeDesc;
       var myStr = color;
       var subStr = myStr.match("background-color:(.*)");
       var s = subStr[1];
       console.log("3 insdie carrier colored",s);
       return (

                <td> <h6> <span style={{ "backgroundColor": s }} >{RoutcodeDesc}</span> </h6></td>
                          );
    }






    // Added by BN 20200130
    displayDropStatus = (vStatus, x) => {
        const dropStatus = vStatus
        const dlvyStatus = x
        if (dropStatus == 'open'&& (dlvyStatus == '0' || dlvyStatus == '8') ) {
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
                                             <span class='badge badge-danger text-uppercase'>{this.props.t('Completed')}</span>
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

      GetDeliveryStatus = (x) => {


            switch (x) {
                case '1':
                    return ("Scheduled");
                case '2':
                    return ("On the Way");
                case '3':
                    return ("In-progress");
                case '4':
                    return ("Completed");
                case '5':
                    return ("Skipped");
                case '6':
                    return ("Re-Scheduled");
                case '7':
                    return ("Cancelled");
                case '8':
                    return ("To-Plan");
                default:
                    return ("To-Plan");
            }

        }



    displayTypeDocBadge = (typDoc, pDropPairedDoc) => {
        const dropMvt = typDoc
        const dropPairedDoc = pDropPairedDoc
        if (dropMvt == 'PICK') {
            return (
                <h6>
                    <span class='badge badge-primary text-uppercase'>{this.props.t('PICK')}</span>
                </h6>
            );
        }
        if (dropMvt == 'DLV') {

            return (
                <h6>
                   <span class='badge badge-success style="font-size:4rem'>{this.props.t('DLV')}</span>
                </h6>
            );
        }
        if (dropMvt == 'PRECEIPT') {
            return (
                <h6>
                    <span class='badge badge-danger text-uppercase'>{this.props.t('PRECEIPT')}</span>
                </h6>
            );
        }
    }

    displayRouteTagBadge = (typDoc) => {
            const dropMvt = typDoc
            if (dropMvt == 'EQUIP DLV') {
                return (
                    <h6>
                        <span class='badge badge-primary text-uppercase'>{dropMvt}</span>
                    </h6>
                );
            }
            if (dropMvt == 'DLV') {

                return (
                    <h6>
                       <span class='badge badge-success style="font-size:4rem'>{dropMvt}</span>
                    </h6>
                );
            }
            if (dropMvt == 'PICKTKT') {
                            return (
                                <h6>
                                    <span class='badge badge-warning text-uppercase'>{dropMvt}</span>
                                </h6>
                            );
                        }
                        if (dropMvt == 'PREP EXP') {

                            return (
                                <h6>
                                   <span class='badge badge-success style="font-size:4rem'>{dropMvt}</span>
                                </h6>
                            );
                        }
            if (dropMvt == 'LIV REP') {
                            return (
                                <h6>
                                    <span class='badge badge-danger text-uppercase'>{dropMvt}</span>
                                </h6>
                            );
                        }
            if (dropMvt == 'ENLV') {

                            return (
                                <h6>
                                   <span class='badge badge-info style="font-size:4rem'>{dropMvt}</span>
                                </h6>
                            );
                        }
             if (dropMvt == 'REC REP') {

                                        return (
                                            <h6>
                                               <span class='badge badge-secondary style="font-size:4rem'>{dropMvt}</span>
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

    displayRouteTag = (drop , lang) => {
              console.log("T888 language =",lang);
              console.log("T888 drop =",drop);
              let defaulprop = ";font-style:normal;background-color:#92a8d1";

            if(!('routeColor' in drop)) drop.routeColor = defaulprop;

              if(lang == 'eng') {
 var myStr = drop.routeColor;
                     var subStr = myStr.match("background-color:(.*)");
                     var s = subStr[1];
                 return (
                                 <h6>
                                     <span style={{backgroundColor: s}} >{drop.routeTag}</span>
                                 </h6>
                             );
              }
              else if(lang == 'fr'){
               var myStr = drop.routeColor;
                                   var subStr = myStr.match("background-color:(.*)");
                                   var s = subStr[1];
                       return (
                                        <h6>
                                            <span style={{backgroundColor: s}} >{drop.routeTagFRA}</span>
                                        </h6>
                                    );
              }
              else {
                   return "";
              }

            }



       SearchDrops = e => {
                      console.log("search content= ",e.target.value);
                      this.props.updateDropSearchTerm(e);
                  }


    render() {
        let addProductsClose = () => this.setState({ addProductShow: false });
        let lang = localStorage.getItem("i18nextLng");
        let addInfoIconClose = () => this.setState({ addInfoShow: false });
        let dropList = this.props.dropsList;
        let selectedDate = this.props.currDate;
        console.log("Drop list",dropList)


        return (
           <TabPane className="tripstab" tabId="Documents">
            <div class="reportlist-view tableCustomFixHead">
                {/* <table class="table table-striped m-0">  */}
                <table class= {"table table-sm "+ (this.props.trailerDropped ? " " : this.props.dayschecked ? " " : " ")}>

                    <thead class="custom-sort">
                        <tr>
                              <th>

                                                        </th>
                                                        <th></th>
                                                        <th onClick={() => this.props.sortDrop('docnum', 0)}>
                                                            {this.props.t('Service Request No')} {this.props.dropOrder[0] === 1 ? "▼" : "▲"}
                                                        </th>
                                                        <th>Skills</th>
                                                        <th>Technician</th>
                                                        <th>Response No</th>

                                                        <th onClick={() => this.props.sortDrop('docdate', 11)}>
                                                         {this.props.t('Date')} {this.props.dropOrder[11] === 1 ? "▼" : "▲"}</th>
                                                        <th onClick={() => this.props.sortDrop('type', 8)}>
                                                                                                                    {this.props.t('Status')} {this.props.dropOrder[8] === 1 ? "▼" : "▲"}
                                                                                                                </th>

                                                        <th >Client</th>
                                                        <th>City</th>
                                                        <th>Poscode</th>

                                                        <th>Trip No</th>


                        </tr>
                    </thead>
                    <tbody>
                        {(dropList || []).map((drops, i) => {
                            let logisticDetails = {};
                           console.log("T000 drops",drops);
                            if(drops.optistatus && drops.optistatus == "dragged") {
                               return '';
                            }

                            else {
                            return (
                                <tr id={'drops' + i}
                                    className={this.dragStyle(drops.type, drops.dlvystatus)}
                                    draggable={drops.type === 'open' && (drops.dlvystatus == '0' || drops.dlvystatus == '8' ) ? "true" : "false"}
                                    style={{ backgroundColor: this.groupingColor(drops.groupingColor)}}
                                    onDragStart={(event) =>
                                        this.props.handleDragStart(event, drops, 'drops', i)
                                    }
                                    key={'drops' + i}
                                >
                                  <td className="pl-2"><input type="checkbox" name="docsCheckBox" onClick={() => this.props.updateDocsGeoLocations(i, drops.docnum)} /></td>
                                    <td>
                                      <img src="assets/img/ser_req.png" alt="drops" class="rounded-circle" width="50"></img>
                                      </td>
                                    <td>
                                        {/* <span style= {{ cursor: 'pointer'}} onClick= {() => this.onDocClick(drops.products, drops.docnum)}>{drops.docnum}</span> */}
                                        <span style={{ cursor: 'pointer' }} onClick={() => this.onDocClick(drops.products, drops.docnum,'DLV', drops.skillreq)}>{drops.docnum}</span>
                                    </td>
                                    <td>{drops.skillreq} </td>
                                      <td>{drops.techId}</td>
                                    <td>{drops.reqNum}</td>


                                        <td>{moment.tz(drops.docdate, '').format('DD-MM-YYYY')}</td>
                                   <td>
                                                                           {/* <span className= { this.colorStyle(drops.type) }>{drops.type}</span> */}
                                                                           <td width="3%">{this.displayDropStatus(drops.type,drops.dlvystatus, drops.docnum)}</td>
                                                                        </td>
                                   <td>{drops.bpname}</td>
                                   <td>{drops.city}</td>
                                   <td>{drops.poscode}</td>

                                   <td>{drops && drops.tripno && drops.tripno === "0" ? '' : drops.tripno}</td>


                                </tr>
                            )
                            }
                        })}
                    </tbody>
                </table>

                <DisplayProducts
                    show={this.state.addProductShow}
                    onHide={addProductsClose}
                    products={this.state.products}
                    docNum={this.state.docNumber}
                    skills = {this.state.skills}
                    doctype = {this.state.doctype}
                ></DisplayProducts>

                <DisplayInformationIconDetails
                    show={this.state.addInfoShow}
                    onInfoIconHide={addInfoIconClose}
                    data={this.state.logisticDetails}
                    dataType="object"
                    docNum={this.state.docNumber}
                ></DisplayInformationIconDetails>
            </div>
            </TabPane>
        );
    }
}

// export default Drops;
export default withNamespaces()(Drops3);