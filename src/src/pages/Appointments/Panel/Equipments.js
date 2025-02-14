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


class Equipments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInfoShow: false,
      speciality: '',
       columnDefs: [
                      {
                        headerName: "Equipment",
                        field: "xequipid",
                        width: 160,
                        rowDrag: true,
                      },
                      {
                        headerName: "Description",
                        field: "xdescript",
                        width: 150,
                      },
                      {
                        headerName: "Site",
                        field: "xfcy",
                        width: 110,
                      },
                      {
                        headerName: "Type",
                        field: "xequiptyp",
                        width: 120,
                      },
                      {
                        headerName: "Connexion",
                        field: "xcodeyve",
                        width: 120,
                      },
                    ]
    };

  }


   onGridReady(params) {
      this.gridApi = params.Api;
      this.gridColumnApi = params.columnApi;
}
  render(){
  const  defaultColDef = {sortable:true}
   const EquipmentList = this.props.curEquipments;
    const gridOptions = {
                         columnDefs: this.state.columnDefs,
                         rowData : EquipmentList,
                         defaultColDef : defaultColDef
                       };




  const onRowDrag = (params)  => {
  console.log("inside onRowDrag",params);
  var rowNode = params.rowNode;
  var e = params.dragEvent;
  console.log("inside onRowDrag - e",e);
   this.props.handleDragStart(e, rowNode.data, 'equipment',rowNode.rowIndex,rowNode.data.xequipid);
 }



     return(
     <TabPane tabId="Equipments">
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
                                       rowData = {EquipmentList}
                                       rowDragManaged={true}
                                       rowSelection={'single'}
                                       suppressRowClickSelection={true}
                                      >
                                      <AgGridColumn width='50'  dndSource={true} dndSourceOnRowDrag={onRowDrag}/>
                                      <AgGridColumn  headerName= {this.props.t("Equipment")}  width= '160'  field="xequipid"/>
                                      <AgGridColumn  headerName= {this.props.t("Description")}  width= '150'  field="xdescript"/>
                                      <AgGridColumn  headerName= {this.props.t("Site")}  width= '110'  field="xfcy"/>
                                      <AgGridColumn  headerName= {this.props.t("Type")}  width= '120'  field="xequiptyp"/>
                                      <AgGridColumn  headerName= {this.props.t("Connexion")}  width= '120'  field="xcodeyve"/>

                                      </AgGridReact>
                                    </div>
                                  </TabPane>
     );
  }

}

export default withNamespaces()(Equipments);