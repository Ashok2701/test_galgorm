import React from 'react';
import DisplayProducts from './DisplayProducts';
import { AgGridReact } from "ag-grid-react";
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


class Drops extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInfoShow: false,
      speciality: '',
        addProductShow: false,
        addInfoShow: false,
        products: [],
        docNumber: "",
        doctype:"",
        logisticDetails: '',
       columnDefs: [
                           {
                             headerName: "Transacion No",
                             field: "docnum",
                             width: 210,
                             rowDrag: true,

                           },
                           {
                             headerName: "Paired Document",
                             field: "pairedDoc",
                             width: 150,
                           },
                           {
                             headerName: "Site",
                             field: "site",
                             width: 100,
                           },
                           {
                             headerName: "Vehicle",
                             field: "vehicleCode",
                             width: 110,
                           },
                           {
                              headerName: "Trailer",
                              field: "trailer",
                              width: 110,
                           },
                           {
                              headerName: "Carrier",
                              field: "carrier",
                              width: 110,
                           },
                           {
                              headerName: "Driver",
                              field: "drivercode",
                              width: 110,
                           },
                           {
                             headerName: "Trip #",
                             field: "tripno",
                             width: 110,
                           },
                           {
                             headerName: "Status",
                             field: "dlvystatus",
                             width: 120,
                             cellRendererFramework: function (params) {

                                const dropStatus = params.data.type;
                                const dlvyStatus = params.data.dlvystatus;
                               if (dropStatus == 'open'&& (dlvyStatus == '0' || dlvyStatus == '8') ) {
                                           return (
                                               <h6>
                                                   <td width="3%" class='priority'><span class='badge badge-warning text-uppercase'>ToPlan</span></td>
                                               </h6>
                                           );
                                       }
                                       if (dropStatus == 'open' && dlvyStatus == '1') {
                                                   return (
                                                       <h6>
                                                           <td width="3%" class='priority'><span class='badge badge-success text-uppercase'>Planned</span></td>
                                                       </h6>
                                                   );
                                               }
                                       if (dropStatus == 'Allocated' && (dlvyStatus == '0' || dlvyStatus == '8')) {
                                           return (
                                               <h6>
                                                   <td width="3%" class='priority'><span class='badge badge-success text-uppercase'>Planned</span></td>
                                               </h6>
                                           );
                                       }
                                       if (dropStatus == 'selected' && (dlvyStatus == '0' || dlvyStatus == '8')) {
                                                   return (
                                                       <h6>
                                                           <td width="3%" class='priority'><span class='badge badge-success text-uppercase'>Planned</span></td>
                                                       </h6>
                                                   );
                                               }
                                       if(dlvyStatus == '1') {
                                         return (
                                                         <h6>
                                                             <td width="3%" class='priority'><span class='badge badge-success text-uppercase'>Planned</span></td>
                                                         </h6>
                                                     );
                                       }
                                        if(dlvyStatus == '2') {
                                                 return (
                                                                 <h6>
                                                                     <td width="3%" class='priority'><span class='badge badge-primary text-uppercase'>OntheWay</span></td>
                                                                 </h6>
                                                             );
                                               }
                                       if(dlvyStatus == '3') {
                                                 return (
                                                                 <h6>
                                                                     <td width="3%" class='priority'><span class='badge badge-warning text-uppercase'>InProgress</span></td>
                                                                 </h6>
                                                             );
                                               }
                                       if(dlvyStatus == '4') {
                                                         return (
                                                                         <h6>
                                                                             <td width="3%" class='priority'><span class='badge badge-success text-uppercase'>Completed</span></td>
                                                                         </h6>
                                                                     );
                                                       }
                                       if(dlvyStatus == '5') {
                                                         return (
                                                                         <h6>
                                                                             <td width="3%" class='priority'><span class='badge badge-danger text-uppercase'>Skipped</span></td>
                                                                         </h6>
                                                                     );
                                                       }
                                       if(dlvyStatus == '6') {
                                                                 return (
                                                                                 <h6>
                                                                                     <td width="3%" class='priority'><span class='badge badge-dark text-uppercase'>Rescheduled</span></td>
                                                                                 </h6>
                                                                             );
                                                               }
                                       if(dlvyStatus == '7') {
                                                                 return (
                                                                                 <h6>
                                                                                     <td width="3%" class='priority'><span class='badge badge-danger text-uppercase'>Canceled</span></td>
                                                                                 </h6>
                                                                             );
                                                               }
                             },
                           },
                           {
                             headerName: "Client Code",
                             field: "bpcode",
                             width: 150,
                           },
                           {
                             headerName: "Client",
                             field: "bpname",
                             width: 200,
                           },
                           {
                             headerName: "Type",
                             field: "doctype",
                             width: 150,
                             cellRendererFramework: function (params) {
                                const dropMvt = params.data.doctype
                                        const dropPairedDoc = params.data.pairedDoc
                                        if (dropMvt == 'PICK') {
                                            return (
                                                <h6>
                                                    <td width="3%" class='priority'><span class='badge badge-primary text-uppercase'>PICK</span></td>
                                                </h6>
                                            );
                                        }
                                        if (dropMvt == 'DLV') {
                                            if (dropPairedDoc.length > 1) {
                                                return (
                                                    <h6>
                                                        <td width="3%" class='priority'><span class='badge badge-info style="font-size:2rem'>DLVEXCHANGE</span></td>
                                                    </h6>
                                                );
                                            }
                                            return (
                                                <h6>
                                                    <td width="3%" class='priority'><span class='badge badge-success style="font-size:2rem'>DLV</span></td>
                                                </h6>
                                            );
                                        }
                                        if (dropMvt == 'PRECEIPT') {
                                            return (
                                                <h6>
                                                    <td width="3%" class='priority'><span class='badge badge-danger text-uppercase'>PRECEIPT</span></td>
                                                </h6>
                                            );
                                        }
                             },
                           },
                           {
                             headerName: "Postal City",
                             field: "poscode",
                             width: 200,
                           },
                           {
                             headerName: "Info",
                             field: "info",
                             width: 100,
                             cellRendererFramework: function (params) {
                               return `<i class="ri-information-fill text-primary h5 mb-0"></i>`;
                             },
                           },
                           {
                             headerName: "Service Time",
                             field: "serviceTime",
                             width: 170,
                           },
                         ]
    };



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


  render(){
      const  defaultColDef = {sortable:true}
       const dropsList = this.props.dropsList;
    let addProductsClose = () => this.setState({ addProductShow: false });

     function customStyle(params){
         if (params.data.type === 'open' && (params.data.dlvystatus == '0' || params.data.dlvystatus == '8' )) {
             return 'custom-enable';
         }
            return 'custom-disable';
     }
     return(
    <TabPane tabId="Drops">
   <Row className="my-2">
                                <Col md="4">
                                  <FormGroup className="mb-0">
                                    <Input
                                      bsSize="sm"
                                      type="search"
                                      placeholder="Search"
                                      className="form-control"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <div className="ag-theme-balham" style={{ height: 220 }}>
                                <AgGridReact
                                 columnDefs = {this.state.columnDefs}
                                 defaultColDef = {defaultColDef}
                                 rowData = {dropsList}
                                 getRowClass = {customStyle}

                                />
                                 <DisplayProducts
                                                    show={this.state.addProductShow}
                                                    onHide={addProductsClose}
                                                    products={this.state.products}
                                                    docNum={this.state.docNumber}
                                                    doctype = {this.state.doctype}
                                                ></DisplayProducts>
                              </div>
      </TabPane>
     );
  }

}

export default Drops;