import React from 'react';
import Drops3 from './Drops3';
import Pickups3 from './Pickups3';
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
      activeTab: "Drops",
      ToPlanchecked: false,
      Todeliverablechecked: false,
      ToInprocesschecked: false,
      Todayschecked: false
    }
    this.toggleTab = this.toggleTab.bind(this);
  }


  checkBoxChange = () => {
    this.setState({ ToPlanchecked: !this.state.ToPlanchecked });
    this.props.checkedToPlan(!this.state.ToPlanchecked)
  }

  DeliverablecheckBoxChange = () => {
    this.setState({ Todeliverablechecked: !this.state.Todeliverablechecked });
    this.props.checkedDeliverables(!this.state.Todeliverablechecked)
  }


  InProcesscheckBoxChange = () => {
    this.setState({ ToInprocesschecked: !this.state.ToInprocesschecked });
    this.props.checkedInProcess(!this.state.ToInprocesschecked)
  }


  dayscheckBoxChange = () => {
    console.log("T222 docpanel - dayscheckbox change");
    this.setState({ Todayschecked: !this.props.daysCheckedIn });
    this.props.checked5days(!this.props.daysCheckedIn)

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
    const site = this.props.deliverySite;
    console.log("T21 inside doc panel");
    //const currDate = moment(this.props.selectedDate).format('YYYY-MM-DD');

    const currDate = moment(this.props.selectedDate).format('YYYY-MM-DD');
    console.log("T444 inside doc panel - propsdate", this.props.selectedDate);
    console.log("T444 inside doc panel - currdate", currDate);
    let filterDrops;
    let filterPickups;
    if (this.props.dropsPanel && (this.props.dropsPanel.drops || this.props.dropsPanel.pickUps)) {
      filterDrops = this.props.dropsPanel.drops.filter(
        (drop) => {
          if (this.state.ToPlanchecked) {

            if (this.state.ToInprocesschecked && !this.state.Todeliverablechecked) {

              return ((drop.type === 'open') && (drop.dlvystatus === '0' || drop.dlvystatus === '8') && drop.dlvflg === '1');
            }

            if (this.state.Todeliverablechecked && !this.state.ToInprocesschecked) {

              return ((drop.type === 'open') && (drop.dlvystatus === '0' || drop.dlvystatus === '8') && drop.dlvflg === '2');
            }

            if (this.state.Todeliverablechecked && this.state.ToInprocesschecked) {

              return ((drop.type === 'open') && (drop.dlvystatus === '0' || drop.dlvystatus === '8') && (drop.dlvflg === '1' || drop.dlvflg === '2'));
            }
            else {

              return ((drop.type === 'open') && (drop.dlvystatus === '0' || drop.dlvystatus === '8'));
            }

          }
          else {
            if (this.state.ToInprocesschecked && !this.state.Todeliverablechecked) {

              return (drop.dlvflg === '1');
            }
            if (this.state.Todeliverablechecked && !this.state.ToInprocesschecked) {

              return ((drop.dlvflg === '2'));
            }

            if (this.state.Todeliverablechecked && this.state.ToInprocesschecked) {

              return ((drop.dlvflg === '2' || drop.dlvflg === '1'));
            }
          }


          if (site === "") {
            return ((drop.docnum.toLowerCase().indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (drop.bpcode.toLowerCase().indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (drop.bpname.toLowerCase().indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (drop.doctype.toLowerCase().indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (drop.prelistCode.toLowerCase().indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (drop.poscode.toLowerCase().indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (String(drop.netweight).indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (String(drop.volume).indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (drop.type.toLowerCase().indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1));

          }
          else {
            return (((drop.docnum.toLowerCase().indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (drop.bpcode.toLowerCase().indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (drop.bpname.toLowerCase().indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (drop.doctype.toLowerCase().indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (drop.prelistCode.toLowerCase().indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (drop.poscode.toLowerCase().indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (String(drop.netweight).indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (String(drop.volume).indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1) || (drop.type.toLowerCase().indexOf(
              this.props.searchDrp.toLowerCase()
            ) !== -1)) && (drop.site === site));

          }
        }
      );

      if (this.props.selectedRouteCodeArr.length > 0) {
        let SelectedRouteCodes = this.props.selectedRouteCodeArr;
        filterDrops = filterDrops.filter(
          (drop) => {
            return (SelectedRouteCodes.includes(drop.routeCode));
          }
        );
      }


      filterPickups = this.props.dropsPanel.pickUps.filter(
        (pickup) => {
          if (this.state.ToPlanchecked) {

            return ((pickup.type === 'open') && (pickup.dlvystatus === '0' || pickup.dlvystatus === '8'));
          }
          if (site == '') {
            return ((pickup.docnum.indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1) || (pickup.bpcode.toLowerCase().indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1) || (pickup.bpname.toLowerCase().indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1) || (pickup.doctype.toLowerCase().indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1) || (pickup.poscode.toLowerCase().indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1) || (String(pickup.netweight).indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1) || (String(pickup.volume).indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1) || (pickup.type.toLowerCase().indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1));
          }
          else {
            return (((pickup.docnum.indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1) || (pickup.bpcode.toLowerCase().indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1) || (pickup.bpname.toLowerCase().indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1) || (pickup.doctype.toLowerCase().indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1) || (pickup.poscode.toLowerCase().indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1) || (String(pickup.netweight).indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1) || (String(pickup.volume).indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1) || (pickup.type.toLowerCase().indexOf(
              this.props.searchPck.toLowerCase()
            ) !== -1)) && (pickup.site === site));
          }
        }
      );
    }


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
                      active: this.state.activeTab === "Drops",
                    })}
                    onClick={() => {
                      this.toggleTab("Drops");
                    }}
                  >
                    <span>{this.props.t('Drops')}</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: this.state.activeTab === "Pickups",
                    })}
                    onClick={() => {
                      this.toggleTab("Pickups");
                    }}
                  >
                    <span>{this.props.t('Pickups')}</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <div className="d-flex align-items-center">
                <div className="custom-control mb-0 mr-4">
                  <Checkbox color="primary"
                    onChange={this.dayscheckBoxChange}
                    checked={this.props.daysCheckedIn} />
                  <Label

                    onClick={() => {
                      this.setState({
                        Todayschecked: !this.state.Todayschecked,
                      });
                    }}
                  >
                    {this.props.t('+/- 5days')}
                  </Label>
                </div>
                <div className="d-inline-block" style={{ paddingRight: '40px', alignSelf: 'center' }} >
                  <button style={{ fontSize: '12px', fontWeight: 'bold', marginRight: '20%', marginLeft: '20%' }}
                    onClick={() => this.props.changeDate(0, '', 'buttons')}
                  >
                    {this.props.t('Refresh')}
                  </button>
                </div>
                <div className="custom-control custom-checkbox mb-2 mr-3">
                  <Input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={() => this.DeliverablecheckBoxChange()}
                    checked={this.state.Todeliverablechecked}
                  />
                  <Label
                    className="custom-control-label"
                    onClick={() => {
                      this.setState({
                        Todeliverablechecked: !this.state.Todeliverablechecked,
                      });
                    }}
                  >
                    {this.props.t('Deliverables')}
                  </Label>
                </div>
                <div className="custom-control custom-checkbox mb-2 mr-3">
                  <Input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={() => this.InProcesscheckBoxChange()}
                    checked={this.state.ToInprocesschecked}
                  />
                  <Label
                    className="custom-control-label"
                    onClick={() => {
                      this.setState({
                        ToInprocesschecked: !this.state.ToInprocesschecked,
                      });
                    }}
                  >
                    {this.props.t('Not Deliverable')}
                  </Label>
                </div>
                <div className="custom-control custom-checkbox mb-2 mr-3">
                  <Input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={() => this.checkBoxChange()}
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
                <div className="d-inline-block">
                  <ButtonGroup className="mb-2">
                    <Button
                      size="sm"
                      color="primary"
                      active
                      type="button"
                      onClick={() => this.props.changeDate(-1, '', 'buttons')}
                    >
                      <i className="ri-arrow-left-s-line"></i>
                    </Button>
                    <Button
                      size="sm"
                      color="light"
                      outline
                      type="button"
                    >
                      {currDate}
                    </Button>
                    <Button
                      size="sm"
                      color="primary"
                      active
                      type="button"
                      onClick={() => this.props.changeDate(1, '', 'buttons')}
                    >
                      <i className="ri-arrow-right-s-line"></i>
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
            <hr className="my-0" />
            <TabContent activeTab={this.state.activeTab}>
              <Drops3
                dropsList={filterDrops}
                dayschecked={this.props.daysCheckedIn}
                updateDropSearchTerm={this.props.updateDropSearchTerm}
                sortDrop={this.props.sortDrop}
                currDate={this.props.selectedDate}
                dropOrder={this.props.dropOrder}
                dayschecked={this.props.daysCheckedIn}
                handleDragStart={this.props.handleDragStart} />
              <Pickups3
                curPickupList={filterPickups}
                dayschecked={this.props.daysCheckedIn}
                currDate={this.props.selectedDate}
                updatePickupSearchTerm={this.props.updatePickupSearchTerm}
                dayschecked={this.props.daysCheckedIn}
                sortPickup={this.props.sortPickup}
                pickOrder={this.props.pickOrder}
                handleDragStart={this.props.handleDragStart} />
            </TabContent>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default withNamespaces()(DocumentsPanel);