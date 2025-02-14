import React from 'react';
import { withNamespaces } from "react-i18next";
import { AgGridReact , AgGridColumn } from "ag-grid-react";
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


class Pickups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInfoShow: false,
      speciality: '',
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
                                   const pickupMvt = params.data.doctype;
                                  
                                  
                                          if (pickupMvt == 'PICK') {
                                              return (
                                                  <h6>
                                                      <td width="3%" class='priority'><span class='badge badge-primary text-uppercase'>PICK</span></td>
                                                  </h6>
                                              );
                                          }
                                          if (pickupMvt == 'DLV') {
                                              return (
                                                  <h6>
                                                      <td width="3%" class='priority'><span class='badge badge-success style="font-size:2rem'>DLV</span></td>
                                                  </h6>
                                              );
                                          }
                                          if (pickupMvt == 'PRECEIPT') {
                                  
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



  static dlvyStatusCss(params) {
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
                               }


 static  PickupTypeCss(params) {
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
                              }

 static PickupInfoCss (params) {
 return <i class="ri-information-fill text-primary h5 mb-0"></i>;
 }



  render(){
      const  defaultColDef = {sortable:true}
       const pickupList = this.props.curPickupList;
         function customStyle(params){
                if (params.data.type === 'open' && (params.data.dlvystatus == '0' || params.data.dlvystatus == '8' )) {
                    return 'custom-enable';
                }
                   return 'custom-disable';
            }

    const onRowDrag = (params)  => {
    console.log("inside onRowDrag",params);
    var rowNode = params.rowNode;
    var e = params.dragEvent;
    console.log("inside onRowDrag - e",e);
     this.props.handleDragStart(e, rowNode.data, 'drops',rowNode.rowIndex, rowNode.data.docnum);
     console.log("inside onRowDrag - e",e);
  }




     return(
    <TabPane tabId="Pickups">
   <Row className="my-2">
                                <Col md="4">
                                  <FormGroup className="mb-0">
                                    <Input
                                      bsSize="sm"
                                      type="search"
                                      placeholder={this.props.t("SearchCaption")}
                                      className="form-control"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <div className="ag-theme-balham" style={{ height: 220 }}>
                                <AgGridReact

                                 defaultColDef = {defaultColDef}
                                 rowData = {pickupList}
                                 getRowClass = {customStyle}
                                 rowDragManaged={true}
                                 rowSelection={'single'}
                                 suppressRowClickSelection={true}
                                >
                                <AgGridColumn
                                   width='50'
                                   dndSource={true}
                                   dndSourceOnRowDrag={onRowDrag}
                                />
                                 <AgGridColumn  headerName= {this.props.t("Transacion No")}  width= '150'  field="docnum"/>
                                                                   <AgGridColumn field="pairedDoc"  headerName= {this.props.t("PairedDoc")}  width= '170' />
                                                                    <AgGridColumn field="doctype"  headerName= {this.props.t("Type")}  width= '100' cellRendererFramework={Pickups.PickupTypeCss} />
                                                                    <AgGridColumn  headerName= {this.props.t("Status")}  width= '120'  field="dlvystatus" cellRendererFramework={Pickups.dlvyStatusCss}/>
                                                                   <AgGridColumn field="bpcode"  headerName= {this.props.t("Client Code")}  width= '150' />
                                                                   <AgGridColumn field="bpname"  headerName= {this.props.t("Client")}  width= '200' />
                                                                   <AgGridColumn field="Site"  headerName= {this.props.t("Site")}  width= '100' />
                                                                   <AgGridColumn field="vehicleCode"  headerName= {this.props.t("Vehicle")}  width= '110' />
                                                                   <AgGridColumn  headerName= {this.props.t("Trailer")}  width= '110'  field="trailer"/>
                                                                   <AgGridColumn field="carrier"  headerName= {this.props.t("Carrier")}  width= '110' />
                                                                   <AgGridColumn field="drivercode"  headerName= {this.props.t("Driver")}  width= '80' />
                                                                   <AgGridColumn field="tripno"  headerName= {this.props.t("Trip #")}  width= '80' />
                                                                   <AgGridColumn  headerName= {this.props.t("Postal City")}  width= '200'
                                                                   valueGetter = {(data) => {

                                                                                                          return `${data.data.poscode}, ${data.data.city}`
                                                                                                       }}
                                                                   field="poscode"/>
                                                                   <AgGridColumn field="Info"  headerName= {this.props.t("info")}  width= '100' cellRendererFramework={Pickups.PickupInfoCss} />
                                                                   <AgGridColumn field="serviceTime"  headerName= {this.props.t("ServiceTime")}  width= '170' />

                                </AgGridReact>
                              </div>
      </TabPane>
     );
  }

}

export default withNamespaces()(Pickups);