import React from 'react';
import { withNamespaces } from "react-i18next";
import { AgGridReact , AgGridColumn} from "ag-grid-react";
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


class Vehicles1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInfoShow: false,
      speciality: '',
       columnDefs: [
                 {
                   headerName: "Vehicle Code",
                   field: "codeyve",
                   width: 130,
                   rowDrag: true,
                   // headerCheckboxSelection: true,
                   // checkboxSelection: true,
                 },
                 {
                   headerName: "Vehicle No",
                   field: "name",
                   width: 110,
                 },
                 {
                   headerName: "Departure Site",
                   field: "startdepotn",
                   width: 130,
                 },
                 {
                   headerName: "Arrival Site",
                   field: "enddepotname",
                   width: 110,
                 },
                 {
                   headerName: "Driver Name",
                   field: "drivername",
                   width: 120,
                 },
                 {
                   headerName: "Side Operation",
                   field: "lateral",
                   width: 130,
                 },
                 {
                   headerName: "Trailer",
                   field: "trailer",
                   width: 80,
                 },
                 {
                   headerName: "Info",
                   field: "info",
                   width: 100,
                 },
                 {
                   headerName: "Category",
                   field: "catego",
                   width: 100,
                 },
                 {
                   headerName: "Earliest Start Time",
                   field: "",
                   width: 150,

                 },
                 {
                   headerName: "Latest Start Time",
                   field: "lateststarttime",
                   width: 150,
                 },
                 {
                   headerName: "Capacity",
                   field: "capacities",
                   width: 100,
                 },
                 {
                   headerName: "Volume",
                   field: "vol",
                   width: 90,
                 },
                 {
                   headerName: "Max Order Count",
                   field: "maxordercnt",
                   width: 140,
                 },
                 {
                   headerName: "Max Total Distance",
                   field: "maxtotaldist",
                   width: 150,
                 },
                 {
                   headerName: "Max Total Time",
                   field: "max_total_time",
                   width: 150,
                 },
                 {
                   headerName: "Max Total Travel Time",
                   field: "max_total_travel_time",
                   width: 170,
                 },
                 {
                   headerName: "Carrier",
                   field: "bptnum",
                   width: 140,
                 },
               ],
    };
    }




    rowDragLeavefunction = (event) => {
       console.log("4  inside rowdragging after leave",event);
       this.props.handleDragStart(event, event.node.data, 'vehicle',event.node.rowIndex,event.node.data.codeyve );
    }


  onGridReady(params) {

      }
  render(){
     const  defaultColDef = {sortable:true}
       const VehicleList = this.props.curVehicleList;
     const gridOptions = {
                      columnDefs: this.state.columnDefs,
                      rowData : VehicleList,
                      defaultColDef : defaultColDef
                    };
       const onFilterTextChange = (e) => {
             console.log("search value",e.target.value);
            gridOptions.api.setQuickFilter(e.target.value);
          }

     function changeRowColor(params){
       console.log("T21 color",params.data.color);
     var myStr = params.data.color;
    var subStr = myStr.match("background-color:(.*)");
    var s = subStr[1];
    return  { 'background-color': s };;

     }

   function Capacityunits (params) {
       return params.data.capacities + ' '+ params.data.xweu;
   }

   function volumeunits (params) {
       return params.data.vol + ' '+ params.data.xvol;
   }


  const onRowDrag = (params)  => {
  console.log("inside onRowDrag 1",params);
  var rowNode = params.rowNode;
  var e = params.dragEvent;
  console.log("inside onRowDrag - e",e);
   this.props.handleDragStart(e, rowNode.data, 'vehicle',rowNode.rowIndex, rowNode.data.codeyve);
 /*
  var jsonObject = {
    grid: 'GRID_001',
    operation: 'Drag on Column',
    rowId: rowNode.data.id,
    selected: rowNode.isSelected(),
  };
  var jsonData = JSON.stringify(jsonObject);
  var userAgent = window.navigator.userAgent;
  var isIE = userAgent.indexOf('Trident/') >= 0;
  if (isIE) {
    e.dataTransfer.setData('text', jsonData);
  } else {
    e.dataTransfer.setData('application/json', jsonData);
    e.dataTransfer.setData('text/plain', jsonData);
  }
  */
   console.log("inside onRowDrag - e",e);
}


     return(
     <TabPane tabId="Vehicles">
                                     <Row className="my-2">
                                       <Col md="4">
                                         <FormGroup className="mb-0">
                                           <Input
                                             bsSize="sm"
                                             type="search"
                                             placeholder={this.props.t("SearchCaption")}
                                             className="form-control"
                                             onChange = {onFilterTextChange}
                                           />
                                         </FormGroup>
                                       </Col>
                                     </Row>
                                     <div
                                       className="ag-theme-balham"
                                       style={{ height: 220 }}
                                     >
                                       <AgGridReact

                                                         rowData = {VehicleList}
                                                         defaultColDef = {defaultColDef}
                                                         getRowStyle = {changeRowColor}
                                                         onGridReady = {this.onGridReady}
                                                         rowDragManaged={true}
                                                         rowSelection={'single'}
                                                         suppressRowClickSelection={true}
                                       >
                                       <AgGridColumn
                                                      width='50'
                                                       dndSource={true}
                                                       dndSourceOnRowDrag={onRowDrag}
                                                     />
                                                     <AgGridColumn  headerName= {this.props.t('Code vehicle')}  width= '130'  field="codeyve"/>
                                                     <AgGridColumn field="name"  headerName= {this.props.t("Vehicle No")}  width= '130' />
                                                     <AgGridColumn field="startdepotn"  headerName= {this.props.t("Departure Site")}  width= '130' />
                                                     <AgGridColumn field="enddepotname"  headerName= {this.props.t("Arrival Site")}  width= '110' />
                                                     <AgGridColumn  headerName= {this.props.t("Driver Name")}  width= '120'  field="drivername"/>
                                                     <AgGridColumn field="lateral"  headerName= {this.props.t("SideOperation")}  width= '130' />
                                                     <AgGridColumn field="trailer"  headerName= {this.props.t("Trailer")}  width= '100' />
                                                     <AgGridColumn field="info"  headerName= {this.props.t("Info")}  width= '100' />
                                                     <AgGridColumn  headerName= {this.props.t("Category")}  width= '100'  field="catego"/>
                                                     <AgGridColumn field="starttime"  headerName= {this.props.t("Earliest Start Time")}  width= '150' valueFormatter= {(params) => splitTime(params.data.starttime)} />
                                                     <AgGridColumn field="lateststarttime"  headerName= {this.props.t("Latest Start Time")}  width= '150' valueFormatter= {(params) => splitTime(params.data.lateststarttime)} />
                                                     <AgGridColumn field="capacities"  headerName= {this.props.t("Capacity")}  width= '100'
                                                        valueFormatter= { Capacityunits }
                                                    />
                                                     <AgGridColumn  headerName= {this.props.t("Volume")}  width= '120'  field="vol"
                                                       valueFormatter= { volumeunits }
                                                    />
                                                     <AgGridColumn field="maxordercnt"  headerName= {this.props.t("Max Order Count")}  width= '170' />
                                                     <AgGridColumn field="maxtotaldist"  headerName= {this.props.t("Max Total Distance")}  width= '150' />
                                                     <AgGridColumn field="max_total_time"  headerName= {this.props.t("Max Total Time")}  width= '150' />
                                                     <AgGridColumn  headerName= {this.props.t("Max Total Travel Time")}  width= '170'  field="max_total_travel_time"/>
                                                     <AgGridColumn field="bptnum"  headerName= {this.props.t("Carrier")}  width= '140' />

                                       </AgGridReact>
                                     </div>
                                   </TabPane>
     );
  }

}

export default withNamespaces()(Vehicles1);