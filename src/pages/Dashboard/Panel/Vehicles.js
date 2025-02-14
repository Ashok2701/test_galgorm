import React from 'react';

import { AgGridReact } from "ag-grid-react";
import { convertHrToSec, formatTime, formatHHMM,splitTime, convertHrToMin } from '../converterFunctions/converterFunctions';
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


class Vehicles extends React.Component {
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
                   field: "starttime",
                   width: 150,
                   cellRendererFramework: function (params) {
                    console.log("at time ",params.data.starttime)
                    return  <span>splitTime(params.data.starttime)</span>;
                    },
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
       this.props.handleDragStart(event, event.node.data, 'vehicle',event.node.rowIndex);
    }


  onGridReady(params) {
        this.gridApi = params.Api;
        this.gridColumnApi = params.columnApi;
        var timeLineContainer = document.querySelector(".timeline-container");
        var dropZone = {
          getContainer: function () {
            return timeLineContainer;
          },
          onDragStop: function (params) {
            const el = document.querySelector(".timeline-data");
            el.classList.remove("d-none");
            // var el = document.createElement("div");
            // el.classList.add("tile");
            // el.innerHTML =
            //   '<div class="id">' + params.node.data.vehicle_code + "</div>";
            // timeLineContainer.appendChild(el);
          },
        };
        params.api.addRowDropZone(dropZone);
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



     return(
     <TabPane tabId="Vehicles">
                                     <Row className="my-2">
                                       <Col md="4">
                                         <FormGroup className="mb-0">
                                           <Input
                                             bsSize="sm"
                                             type="search"
                                             placeholder="Search"
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
                                              columnDefs=  {this.state.columnDefs}
                                                         rowData = {VehicleList}
                                                         defaultColDef = {defaultColDef}
                                                         getRowStyle = {changeRowColor}
                                                         onGridReady = {this.onGridReady}
                                                         onRowDragLeave = {this.rowDragLeavefunction}

                                       />
                                     </div>
                                   </TabPane>
     );
  }

}

export default Vehicles;