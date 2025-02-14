import React from 'react';
import Drops from './Drops';
import moment from 'moment';
import 'moment-timezone';
import { withNamespaces } from 'react-i18next';
import { AgGridReact } from "ag-grid-react";
import Checkbox from '@mui/material/Checkbox';
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
class DocumentsPanel extends React.Component {

 constructor(props) {
        super(props);
         this.state = {
              activeTab: "Documents",
              ToPlanchecked : false,
              Todayschecked : false
              }
          this.toggleTab = this.toggleTab.bind(this);
    }




      checkBoxChange = () => {
       console.log("T222 docpanel - to plan change");
                  this.setState({ ToPlanchecked: !this.state.ToPlanchecked });
                  this.props.checkedToPlan(!this.state.ToPlanchecked)
              }


  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }


  onGridReady(params) {
    this.gridApi = params.api;
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

toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

    render() {
     const site = '';
    console.log("T6 inside docpanel - flag",this.props.daysCheckedIn)
 //const currDate = moment(this.props.selectedDate).format('YYYY-MM-DD');
 const currDate = moment.tz(this.props.selectedDate, '').format('YYYY-MM-DD');


        return (
        <>
       <Card className="mb-3">
                         <CardBody className="p-2">
                           <div className="d-flex justify-content-between align-items-center">
                             <Nav tabs className="nav-tabs-custom nav-justified">
                                                           <NavItem>
                                                             <NavLink
                                                               style={{ cursor: "pointer" }}
                                                               className={classnames({
                                                                 active: this.state.activeTab === "Documents",
                                                               })}
                                                               onClick={() => {
                                                                 this.toggleTab("Documents");
                                                               }}
                                                             >
                                                               <span>{this.props.t('Documents')}</span>
                                                             </NavLink>
                                                           </NavItem>
                                                         </Nav>
                             <div className="d-flex align-items-center">

                               <div className="d-inline-block"  style ={{paddingRight: '40px' ,alignSelf: 'center'}} >
                               <button style={{ fontSize: '12px', fontWeight: 'bold', marginRight: '20%', marginLeft: '20%' }}
                                    onClick = {() => this.props.changeDate(0,'','buttons')}
                                                                  >
                                                                   {this.props.t('Update')}
                               </button>
                               </div>

                               <div className="custom-control custom-checkbox mb-2 mr-3">
                                 <Input
                                   type="checkbox"
                                   className="custom-control-input"
                                   onChange = {()=>this.checkBoxChange()}
                                   checked={this.state.ToPlanchecked}
                                 />
                                 <Label
                                   className="custom-control-label"
                                   onClick={() => {
                                     this.setState({
                                       ToPlanchecked: !this.state.ToPlanchecked,
                                     });
                                   }}
                                 >
                                   {this.props.t('ToPlan')}
                                 </Label>
                               </div>

                             </div>
                           </div>
                           <hr className="my-0" />
                            <TabContent activeTab={this.state.activeTab}>
                             <Drops
                             dropsList={this.props.dropsPanel}
                             dayschecked = {this.props.daysCheckedIn}
                             currDate = {this.props.selectedDate}
                             handleDragStart = {this.props.handleDragStart}/>

                            </TabContent>
                         </CardBody>
                       </Card>
             </>
        );
    }
}

export default withNamespaces()(DocumentsPanel);