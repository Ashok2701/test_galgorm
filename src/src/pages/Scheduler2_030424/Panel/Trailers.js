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


class Trailers extends React.Component {
  constructor(props) {
    super(props);
    console.log("T22 inside Trailer  - conc",props);
    this.state = {
      addInfoShow: false,
      speciality: '',
       columnDefs: [
                    {
                      headerName: "Trailer",
                      field: "trailer",
                      width: 130,
                      rowDrag: true,
                    },
                    {
                      headerName: "Description",
                      field: "des",
                      width: 130,
                    },
                    {
                      headerName: "Site",
                      field: "fcy",
                      width: 90,
                    },
                    {
                      headerName: "Type",
                      field: "typ",
                      width: 100,
                    },
                    {
                      headerName: "Model",
                      field: "model",
                      width: 80,
                    },
                    {
                      headerName: "Capacity",
                      field: "maxloams",
                      width: 100,
                    },
                    {
                      headerName: "Volume",
                      field: "maxlovol",
                      width: 90,
                    },
                  ],
           getRowStyle : (params) => {
             console.log("T22 inside trailer cons= params",params);
             console.log("T22 inside trailer const= props", props);
  if(this.props.allAllowedTrailers === "Yes"){
       console.log("T22 inside const allAllowed");
      return { 'background-color' :'#feff99 !important' };
     }else{
  if (this.props.vehicleDropped) {
         if(this.props.allAllowedTrailers){
              return { 'background-color':'#feff99 !important' };
         }
         else {
            if (this.props.allowedTrailers && !this.props.allowedTrailers.includes(params.data.typ)) {
                  return { 'background-color':'white' };
            }
            else {
               return { 'background-color':'#feff99' };
            }
            }
}
else
           {
              console.log("T22 color else",params.data.color);
                  var myStr = params.data.color;
                 var subStr = myStr.match("background-color:(.*)");
                 var s = subStr[1];
                 return  { 'background-color': s };
             }
           }
    },
  }
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

    getBgcolor = (params) => {
  console.log("T22 inside bgcolo- props",this.props);
  console.log("T22 inside bgcoolor- patams", params)
    if(this.props.allAllowedTrailers === "Yes"){
      console.log("T22 inside allAllowed");
     return { background :'#feff99 !important' };
    }else{
           if (this.props.vehicleDropped) {

               if (this.props.allowedTrailers && !this.props.allowedTrailers.includes(params.data.typ)) {
                     console.log("T22 inside no match");
                     return { background:'white !important '};;
               }
               else {
                  console.log("T22 inside match found");
                  return { background:'#feff99 !important' };
               }
   }

   else {
            console.log("T22 color - default colours",params.data.color);
               var myStr = params.data.color;
              var subStr = myStr.match("background-color:(.*)");
              var s = subStr[1];
              return  { background: s  };
   }
           }
           }


  render(){
     const  defaultColDef = {sortable:true}
       const TrailerList = this.props.curTrails;
     const gridOptions = {
                      columnDefs: this.state.columnDefs,
                      rowData : TrailerList,
                      defaultColDef : defaultColDef,

                    };
       const onFilterTextChange = (e) => {
             console.log("search value",e.target.value);
            gridOptions.api.setQuickFilter(e.target.value);
          }





     function changeRowColor(params){



       console.log("T22 color else",params.data.color);
     var myStr = params.data.color;
    var subStr = myStr.match("background-color:(.*)");
    var s = subStr[1];
    return  { 'background-color': s };
     }

   function Capacityunits (params) {
       return params.data.maxloams + ' '+ params.data.xmaxloams;
   }

   function volumeunits (params) {
       return params.data.maxlovol + ' '+ params.data.xmaxlovol;
   }

  const onRowDrag = (params)  => {
  console.log("inside onRowDrag",params);
  var rowNode = params.rowNode;
  var e = params.dragEvent;
  console.log("inside onRowDrag - e",e);
   this.props.handleDragStart(e, rowNode.data, 'trailer',rowNode.rowIndex,rowNode.data.trailer );
 }



     return(
     <TabPane tabId="Trailers">
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

                                                         rowData = {TrailerList}
                                                         defaultColDef = {defaultColDef}
                                                         getRowStyle = {this.state.getRowStyle}
                                                         rowDragManaged={true}
                                                         rowSelection={'single'}
                                                         suppressRowClickSelection={true}
                                       >
                                        <AgGridColumn width='50'  dndSource={true} dndSourceOnRowDrag={onRowDrag}/>
                                        <AgGridColumn  headerName= {this.props.t("Trailer")}  width= '130'  field="trailer"/>
                                        <AgGridColumn  headerName= {this.props.t("Description")}  width= '130'  field="des"/>
                                        <AgGridColumn  headerName= {this.props.t("Site")}  width= '90'  field="fcy"/>
<AgGridColumn  headerName= {this.props.t("Type")}  width= '100'  field="typ"/>
<AgGridColumn  headerName= {this.props.t("Model")}  width= '80'  field="model"/>
<AgGridColumn  headerName= {this.props.t("Capacity")}  width= '100'  field="maxloams"
  valueFormatter= { Capacityunits }
/>
<AgGridColumn  headerName= {this.props.t("Volume")}  width= '90'  field="maxlovol"
valueFormatter= { volumeunits }
/>
                                       </AgGridReact>
                                     </div>
                                   </TabPane>
     );
  }

}

export default withNamespaces()(Trailers);