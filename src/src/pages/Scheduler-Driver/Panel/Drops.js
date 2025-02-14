import React,{ useState }  from 'react';
import DisplayProducts from './DisplayProducts';
import { withNamespaces } from "react-i18next";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
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
                               return <i class="ri-information-fill text-primary h5 mb-0"></i>;
                             },
                           },
                           {
                             headerName: "Service Time",
                             field: "serviceTime",
                             width: 170,
                           },
                         ],

        rowClassRules : {
           "custom-enable" : function (params) {
               return (params.data.type === 'open'  && (params.data.dlvystatus == '0' || params.data.dlvystatus == '8' ));
           },
           "custom-disable" : function (params) {
               return (params.data.type !== 'open');
           }
        }
    };
this.onDocClick = this.onDocClick.bind(this)

  }

 onDocClick = (params) => {
        console.log("inside onDocClick",params);
        const products = params.data.products;
        const docNum = params.data.docnum;
        const doctype= params.data.doctype;
        this.setState({
            addProductShow: true,
            products: products,
            docNumber: docNum,
            doctype : doctype
        });
    }


  static Doclink (params) {
     console.log("params =",params);
     const docnum = params.data.docnum;
     const products = params.data.products;
     const doctype= params.data.doctype;
     // onDocClick(params);
  }


  static clicked (params) {
    console.log("doc clicked",params);
      const products = params.data.products;
            const docNum = params.data.docnum;
            const doctype= params.data.doctype;
            this.setState({
                addProductShow: true,
                products: products,
                docNumber: docNum,
                doctype : doctype
            });
  }


  static dlvyStatusCss(params) {
  console.log("T31 inside drop- dlvystatus ",params);
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

 static onCellClicked(params ) {
  console.log('Cell was clicked');
  const products = params.data.product;
  const docNum = params.data.docNum;
  const doctype = params.data.doctype;

   this.setState({
              addProductShow: true,
              products: products,
              docNumber: docNum,
              doctype : doctype
          });
  }


 static  DropTypeCss(params) {
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


 static DropInfoCss (params) {
 return <i class="ri-information-fill text-primary h5 mb-0"></i>;
 }


  render(){
      const  defaultColDef = {sortable:true}
       const dropsList = this.props.dropsList;
    let addProductsClose = () => this.setState({ addProductShow: false });

     function customStyle(params){
        console.log("T31 inside customStyle", params);
         if (params.data.type === 'open'  && (params.data.dlvystatus == '0' || params.data.dlvystatus == '8' )) {
             return 'custom-enable';
         }
            return 'custom-disable';
     }


     const  onRowID = (params) => {
        console.log("T31 inside RowID",params);
        //console.log("T31 inside Api",api);
         return  'drops'+params.rowNode;
     }



  const onRowDrag = (params)  => {

  console.log("inside onRowDrag",params);
  var rowNode = params.rowNode;
  var e = params.dragEvent;
  console.log("inside onRowDrag - e",e);
   this.props.handleDragStart(e, rowNode.data, 'drops',rowNode.rowIndex);
   console.log("inside onRowDrag - e",e);
}






     return(
    <TabPane tabId="Drops">
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

                                 rowData = {dropsList}
                                 getRowClass = {customStyle}
                                 rowDragManaged={true}
                                 rowSelection={'single'}

                                 suppressRowClickSelection={true}

                                >
                                <AgGridColumn
                                   width='30'
                                   dndSource={true}
                                   dndSourceOnRowDrag={onRowDrag}
                                />
                                   <AgGridColumn  headerName= {this.props.t("Transacion No")}  width= '170'  field="docnum"
                                   onCellClicked={Drops.Doclink}

                                   />
                                   <AgGridColumn field="pairedDoc" headerName= {this.props.t("PairedDoc")}  width= '150' />
                                   <AgGridColumn field="doctype"  headerName= {this.props.t("Type")}  width= '100' cellRendererFramework={Drops.DropTypeCss} />
                                   <AgGridColumn  headerName= {this.props.t("Status")}  width= '120'  field="dlvystatus" cellRendererFramework={Drops.dlvyStatusCss}/>
                                   <AgGridColumn field="bpcode"  headerName= {this.props.t("Client Code")}  width= '150' />
                                   <AgGridColumn field="bpname"  headerName= {this.props.t("Client")}  width= '200' />
                                   <AgGridColumn  headerName= {this.props.t("Postal City")}  width= '200'
                                    valueGetter = {(data) => {
                                      console.log("insdie drop - data",data);
                                       return `${data.data.poscode}, ${data.data.city}`
                                    }}
                                   />
                                   <AgGridColumn field="site"  headerName= {this.props.t("Site")}  width= '100' />
                                   <AgGridColumn field="vehicleCode"  headerName= {this.props.t("Vehicle")}  width= '110' />
                                   <AgGridColumn  headerName= {this.props.t("Trailer")}  width= '110'  field="trailer"/>
                                   <AgGridColumn field="carrier"  headerName= {this.props.t("Carrier")}  width= '110' />
                                   <AgGridColumn field="drivercode"  headerName= {this.props.t("Driver")}  width= '80' />
                                   <AgGridColumn field="tripno"  headerName= {this.props.t("Trip #")}  width= '80' />

                                   <AgGridColumn field="Info"  headerName= {this.props.t("info")}  width= '100' cellRendererFramework={Drops.DropInfoCss} />
                                   <AgGridColumn field="serviceTime"  headerName= {this.props.t("ServiceTime")}  width= '170' />

                                </AgGridReact>
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

export default withNamespaces()(Drops);