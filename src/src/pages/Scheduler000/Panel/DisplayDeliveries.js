import React from 'react';
import moment from 'moment';
import mockData from './DeliveriesMockData.json';
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
class DisplayDeliveries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addProductShow: false,
            addInfoShow: false,
            showSeal : false,
             sealnumbers : [],
            products: [],
            docNumber: "",
            doctype:"",
            dlvyno: '',
            logisticDetails: '',
        };
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
               return ("custom-enable");
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
  onSealNumberClick = (dlvyno,sealnumbers) => {
           console.log("T7 inside trip click",dlvyno);
            console.log("T7 inside sealnumbers click",sealnumbers);
           var sealarray = sealnumbers.split(',');

           this.setState({
               showSeal : true,
               sealnumbers :sealarray,
               dlvyno : dlvyno
           })

        }



    // Added by BN 20200130
    displayDropStatus = (vStatus, x) => {
        const dropStatus = vStatus
        const dlvyStatus = x
        if (dropStatus == 'open'&& (dlvyStatus == '0' || dlvyStatus == '8') ) {
            return (
                <h6>
                    <span class='badge badge-warning text-uppercase'>ToPlan</span>
                </h6>
            );
        }
        if (dropStatus == 'open' && dlvyStatus == '1') {
                    return (
                        <h6>
                          <span class='badge badge-success text-uppercase'>Loaded</span>
                        </h6>
                    );
                }
        if (dropStatus == 'Allocated' && (dlvyStatus == '0' || dlvyStatus == '8')) {
            return (
                <h6>
                  <span class='badge badge-success text-uppercase'>Planned</span>
                </h6>
            );
        }
        if (dropStatus == 'selected' && (dlvyStatus == '0' || dlvyStatus == '8')) {
                    return (
                        <h6>
                        <span class='badge badge-success text-uppercase'>Planned</span>
                        </h6>
                    );
                }
        if(dlvyStatus == '1') {
          return (
                          <h6>
                             <span class='badge badge-success text-uppercase'>Planned</span>
                          </h6>
                      );
        }
         if(dlvyStatus == '2') {
                  return (
                                  <h6>
                                    <span class='badge badge-primary text-uppercase'>OntheWay</span>
                                  </h6>
                              );
                }
        if(dlvyStatus == '3') {
                  return (
                                  <h6>
                                     <span class='badge badge-warning text-uppercase'>InProgress</span>
                                  </h6>
                              );
                }
        if(dlvyStatus == '4') {
                          return (
                                          <h6>
                                             <span class='badge badge-success text-uppercase'>Completed</span>
                                          </h6>
                                      );
                        }
        if(dlvyStatus == '5') {
                          return (
                                          <h6>
                                           <span class='badge badge-danger text-uppercase'>Skipped</span>
                                          </h6>
                                      );
                        }
        if(dlvyStatus == '6') {
                                  return (
                                                  <h6>
                                                     <span class='badge badge-dark text-uppercase'>Rescheduled</span>
                                                  </h6>
                                              );
                                }
        if(dlvyStatus == '7') {
                                  return (
                                                  <h6>
                                                      <span class='badge badge-danger text-uppercase'>Canceled</span>
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
                    <span class='badge badge-primary text-uppercase'>PICK</span>
                </h6>
            );
        }
        if (dropMvt == 'DLV') {
            if (dropPairedDoc.length > 1) {
                return (
                    <h6>
                        <span class='badge badge-info style="font-size:2rem'>DLVEXCHANGE</span>
                    </h6>
                );
            }
            return (
                <h6>
                   <span class='badge badge-success style="font-size:4rem'>DLV</span>
                </h6>
            );
        }
        if (dropMvt == 'PRECEIPT') {
            return (
                <h6>
                    <span class='badge badge-danger text-uppercase'>PRECEIPT</span>
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
                      console.log("search content= ",e.target.value);
                      this.props.updateDropSearchTerm(e);
                  }


    render() {
        let addProductsClose = () => this.setState({ addProductShow: false });
        let addInfoIconClose = () => this.setState({ addInfoShow: false });
        let addSealClose = () => this.setState({ showSeal : false});
        let dropList = this.props.dropsList;

        console.log("inside dd docs =",this.props.docslist);


        return (
          <div  className='float-child'>
             <h4 align="left">Livraisons et enlevements </h4>

            <div class="reportlist-view tableCustomFixHead">
                {/* <table class="table table-striped m-0">  */}
                <table class= "table table-sm table-striped m-0">

                    <thead class="custom-sort">
                        <tr>
                                                       <th>MVT</th>
                                                       <th>
                                                                                        Date
                                                                                    </th>
                                                        <th>

                                                            Delivery Number
                                                        </th>
                                                        <th>Type</th>
                                                        <th>Status</th>
                                                        <th>Customer Code</th>
                                                        <th>
                                                        Customer
                                                        </th>

                                                        <th >
                                                            postal City
                                                        </th>
                                                        <th >
                                                            Site
                                                        </th>

                        </tr>
                    </thead>
                    <tbody>
   {(this.props.docslist && this.props.docslist || []).map((drops, i) => (

                                <tr id={'drops' + i}
                                    className={this.dragStyle(drops.type, drops.dlvystatus)}
                                    draggable= "true"
                                    style={{ backgroundColor: this.props.trailerDropped ? this.getBgcolor(drops.trailer,drops.docnum,drops.type) :'' }}
                                    onDragStart={(event) =>
                                        this.props.handleDragStart(event, drops, 'drops', i)
                                    }
                                    key={'drops' + i}
                                >
                                    <td>{drops.type === 'DLV' ? ">" : "<"}</td>
                                    <td>
                                        {moment(drops.docdate).format('YYYY-MM-DD')}
                                    </td>

                                    <td>
                                        {/* <span style= {{ cursor: 'pointer'}} onClick= {() => this.onDocClick(drops.products, drops.docnum)}>{drops.docnum}</span> */}
                                        <span style={{ cursor: 'pointer' }} onClick={() => this.onDocClick(drops.products, drops.docnum,drops.doctype)}>{drops.docnum}</span>
                                    </td>
                                    <td>{drops.type}</td>
                                      <td>
                                                                            {/* <span className= { this.colorStyle(drops.type) }>{drops.type}</span> */}
                                                                            <td width="3%">{this.displayDropStatus(drops.type,drops.dlvystatus)}</td>
                                                                         </td>

                                    <td>{drops.bpcode}</td>
                                    <td>{drops.bpname}</td>
                                    <td>{drops.poscode}, {drops.city}</td>
                                    <td>{drops.site}</td>

                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            </div>
        );
    }
}

// export default Drops;
export default DisplayDeliveries;