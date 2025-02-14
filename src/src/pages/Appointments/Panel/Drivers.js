import React from 'react';
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
import { convertHrToSec, formatTime, formatHHMM,splitTime,splitTimefromParams_start, convertHrToMin } from '../converterFunctions/converterFunctions';



class Drivers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInfoShow: false,
      speciality: '',
       columnDefs: [
                      {
                        headerName: "Driver Code",
                        field: "driverid",
                        width: 140,
                        rowDrag: true,
                      },
                      {
                        headerName: "Driver Name",
                        field: "driver",
                        width: 130,
                      },
                      {
                        headerName: "Site",
                        field: "fcy",
                        width: 110,
                      },
                      {
                        headerName: "Permit",
                        field: "licenum",
                        width: 110,
                      },
                      {
                        headerName: "Postal",
                        field: "poscod",
                        width: 110,
                      },
                      {
                        headerName: "City",
                        field: "cty",
                        width: 130,
                      },
                      {
                        headerName: "Country",
                        field: "cry",
                        width: 110,
                      },
                      {
                        headerName: "Lunch Time (HH:MM)",
                        field: "lncstrtime",
                        width: 180,
                      },
                      {
                        headerName: "Lunch Duration",
                        field: "lncduration",
                        width: 150,
                      },
                    ]
    };

  }
  render(){
      const  defaultColDef = {sortable:true}
       const DriversList = this.props.curDrivers;

     function changeRowColor(params){
              console.log("T21 color",params.data.color);
            var myStr = params.data.color;
           var subStr = myStr.match("background-color:(.*)");
           var s = subStr[1];
           return  { 'background-color': s };;

            }

     const onRowDrag = (params)  => {
     console.log("inside onRowDrag",params);
     var rowNode = params.rowNode;
     var e = params.dragEvent;
     console.log("inside onRowDrag - e",e);
      this.props.handleDragStart(e, rowNode.data, 'driver',rowNode.rowIndex , rowNode.data.driverid);
    }


     return(
   <TabPane tabId="Drivers">
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
                                   <div
                                     className="ag-theme-balham"
                                     style={{ height: 220 }}
                                   >
                                     <AgGridReact

                                         defaultColDef = {defaultColDef}
                                         rowData = {DriversList}
                                         getRowStyle = {changeRowColor}
                                          rowDragManaged={true}
                                         rowSelection={'single'}
                                         suppressRowClickSelection={true}

                                     >
                                      <AgGridColumn width='50'  dndSource={true} dndSourceOnRowDrag={onRowDrag}/>
                                                                           <AgGridColumn  headerName= {this.props.t("Driver Code")}  width= '140'  field="driverid"/>
                                                                           <AgGridColumn  headerName= {this.props.t("Driver Name")}  width= '130'  field="driver"/>
                                                                           <AgGridColumn  headerName= {this.props.t("Site")}  width= '110'  field="fcy"/>
                                                                           <AgGridColumn  headerName= {this.props.t("Permit")}  width= '110'  field="licenum"/>
                                                                           <AgGridColumn  headerName= {this.props.t("postal")}  width= '110'  field="poscod"/>
                                                                           <AgGridColumn  headerName= {this.props.t("City")}  width= '130'  field="cty"/>
                                                                           <AgGridColumn  headerName= {this.props.t("Country")}  width= '110'  field="cry"/>
                                                                           <AgGridColumn  headerName= {this.props.t("Lunch Time")}  width= '180'  field="lncstrtime" valueFormatter= {(params) => splitTime(params.data.lncstrtime)}/>
                                                                           <AgGridColumn  headerName= {this.props.t("Lunch Duration")}   width= '150'  field="lncduration" valueFormatter= {(params) => splitTime(params.data.lncduration)}/>


                                     </AgGridReact>
                                   </div>
                                 </TabPane>
     );
  }

}

export default withNamespaces()(Drivers);