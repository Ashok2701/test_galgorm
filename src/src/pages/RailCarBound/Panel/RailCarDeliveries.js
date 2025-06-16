import React from 'react';
import DisplayProducts from './DisplayProducts';
import { withNamespaces } from 'react-i18next';
import   DisplaySealNumbers from './DisplaySealNumbers';
import moment from 'moment';
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import mockData from './RailDeliveriesMockData.json';
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
class RailCarDeliveries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addProductShow: false,
            addInfoShow: false,
            showSeal : false,
            products: [],
            sealnumbers : ['','','','','',''],
            docNumber: "",
            doctype:"",
            dlvyno: '',
            logisticDetails: '',
        };
    }


   getBgcolor(type, docnum, doctype) {
            
           if (this.props.trailerDropped && type !==  '' && doctype === 'open' ) {
               
               if (this.props.droppedTrailers && !this.props.droppedTrailers.includes(type)) {
                      
                     return '';
               }
               else {
                  
                  return '#feff99';
               }
        }
        else {
          
          return '';
        }
   }


    onDocClick = (product, docNum, doctype) => {
        const products = product;
       // setTomTomNotification(true)
        this.setState({
            addProductShow: true,
            products: products,
            docNumber: docNum,
            doctype : doctype
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
      
       const carriername = carrier;
       var myStr = color;
       var subStr = myStr.match("background-color:(.*)");
       var s = subStr[1];
       
       return (

                <td> <span style={{ "backgroundColor": s }} >{carriername}</span></td>
                          );
    }

       onSealNumberClick = (dlvyno,sealnumbers) => {
           
            

           var sealarray = sealnumbers.split(',');

           this.setState({
               showSeal : true,
               sealnumbers :sealarray,
               dlvyno : dlvyno
           })

        }

           onSaveSealnumbers = (sealnumbers , dlvno) => {
                
                this.props.saveSealnumber(sealnumbers,dlvno);
                this.setState({
                    showSeal: false
                });
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
                          <span class='badge badge-success text-uppercase'>{this.props.t('Loaded')}</span>
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
            if (dropPairedDoc.length > 1) {
                return (
                    <h6>
                        <span class='badge badge-info style="font-size:2rem'>{this.props.t('DLVEXCHANGE')}</span>
                    </h6>
                );
            }
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


       SearchDrops = e => {
                      
                      this.props.updateDropSearchTerm(e);
                  }


    render() {
        let addProductsClose = () => this.setState({ addProductShow: false });
        let addInfoIconClose = () => this.setState({ addInfoShow: false });
        let addSealClose = () => this.setState({ showSeal : false});
        let dropList = this.props.dropsList;


        return (
           <TabPane tabId="RailCarDeliveries">
           <Row className="my-2">
                                        <Col md="2">
                                          <FormGroup className="mb-0">
                                            <Input
                                              bsSize="sm"
                                              type="search"
                                              placeholder={this.props.t("SearchCaption")}
                                              className="form-control"
                                              onChange = {this.SearchDrops}
                                            />
                                          </FormGroup>
                                        </Col>
             </Row>
            <div class="reportlist-view tableCustomFixHead">
                {/* <table class="table table-striped m-0">  */}
                <table class= "table table-sm table-striped m-0">

                    <thead class="custom-sort">
                        <tr>
                                                       <th></th>
                                                        <th onClick={() => this.props.sortDrop('docnum', 0)}>
                                                            {this.props.t('Delivery Number')} {this.props.dropOrder[0] === 1 ? "▼" : "▲"}
                                                        </th>
                                                        <th>
                                                            {this.props.t('Status')}
                                                        </th>
                                                        <th onClick={() => this.props.sortDrop('Date', 3)}>
                                                                                        {this.props.t('Date')} {this.props.dropOrder[3] === 1 ? "▼" : "▲"}
                                                                                    </th>
                                                         <th onClick={() => this.props.sortDrop('bpcode', 1)}>
                                                                                        {this.props.t('Customer Code')} {this.props.dropOrder[1] === 1 ? "▼" : "▲"}
                                                                                    </th>
                                                         <th onClick={() => this.props.sortDrop('bpname', 2)}>
                                                                                        {this.props.t('Customer')} {this.props.dropOrder[2] === 1 ? "▼" : "▲"}
                                                         </th>

                                                        <th onClick={() => this.props.sortDrop('poscode', 4)}>
                                                            {this.props.t('postal')} {this.props.t('City')} {this.props.dropOrder[4] === 1 ? "▼" : "▲"}
                                                        </th>

                                                        <th onClick={() => this.props.sortDrop('Site', 9)}>
                                                            {this.props.t('Site')} {this.props.dropOrder[9] === 1 ? "▼" : "▲"}
                                                        </th>
                                                        <th onClick={() => this.props.sortDrop('RailCar', 7)}>
                                                            {this.props.t('RailCar')} {this.props.dropOrder[7] === 1 ? "▼" : "▲"}
                                                        </th>
                                                          <th>
                                                         {this.props.t("RouteCode")}
                                                         </th>
                        </tr>
                    </thead>
                    <tbody>
   {(dropList || []).map((drops, i) => (

                                <tr id={'drops' + i}
                                    className={this.dragStyle(drops.type, drops.dlvystatus)}
                                    draggable= "true"
                                    style={{ backgroundColor: this.props.trailerDropped ? this.getBgcolor(drops.trailer,drops.docnum,drops.type) :'' }}
                                    onDragStart={(event) =>
                                        this.props.handleDragStart(event, drops, 'drops', i)
                                    }
                                    key={'drops' + i}
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
                                                                                         <MenuItem onClick={() => this.onSealNumberClick(drops.docnum,drops.sealnumbers)} >Seal Numbers</MenuItem>
                                                                                       </Menu>
                                                                                     </React.Fragment>
                                                                                   )}
                                                                                 </PopupState>
                                                                                 </td>
                                    <td>
                                        {/* <span style= {{ cursor: 'pointer'}} onClick= {() => this.onDocClick(drops.products, drops.docnum)}>{drops.docnum}</span> */}
                                        <span style={{ cursor: 'pointer' }} onClick={() => this.onDocClick(drops.products, drops.docnum,drops.doctype)}>{drops.docnum}</span>
                                    </td>
                                      <td>
                                                                            {/* <span className= { this.colorStyle(drops.type) }>{drops.type}</span> */}
                                                                            <td width="3%">{this.displayDropStatus(drops.type,drops.dlvystatus)}</td>
                                                                         </td>
                                    <td>
                                        {moment(drops.docdate).format('YYYY-MM-DD')}
                                    </td>
                                    <td>{drops.bpcode}</td>
                                    <td>{drops.bpname}</td>
                                    <td>{drops.poscode}, {drops.city}</td>
                                    <td>{drops.site}</td>
                                    <td>{drops.railcar}</td>
                                    <td>{drops.routecode}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>


            </div>
            <DisplayProducts
                                show={this.state.addProductShow}
                                onHide={addProductsClose}
                                products={this.state.products}
                                docNum={this.state.docNumber}
                                doctype = {this.state.doctype}
                            ></DisplayProducts>
                            <DisplaySealNumbers
                                                    show={this.state.showSeal}
                                                    onHide={addSealClose}
                                                     sealnumbers ={this.state.sealnumbers}
                                                    onSaveSealnumbers={this.onSaveSealnumbers}
                                                    dlvyno = {this.state.dlvyno}

                             ></DisplaySealNumbers>

                            <DisplayInformationIconDetails
                                show={this.state.addInfoShow}
                                onInfoIconHide={addInfoIconClose}
                                data={this.state.logisticDetails}
                                dataType="object"
                                docNum={this.state.docNumber}
                            ></DisplayInformationIconDetails>
            </TabPane>
        );
    }
}

// export default Drops;
export default withNamespaces()(RailCarDeliveries);