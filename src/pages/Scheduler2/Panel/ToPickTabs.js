import React from "react";
import Drops3 from "./Drops3";
import TripList3 from "./TripsList3";
import RouteMap1 from "./RouteMap1";
import moment from "moment";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "moment-timezone";
import { withNamespaces } from "react-i18next";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { AgGridReact } from "ag-grid-react";
import Checkbox from "@mui/material/Checkbox";
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
import "../dashboard.scss";
import classnames from "classnames";
import LVSToPickDetailTab from "./LVS_ToPick_DetailTab";
import LVSToPickGlobalTab from "./LVS_ToPick_GlobalTab";

class LVSToPickTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "Detailed",
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  // group by product for Global allocation
  groupAndSumData = (Arraytempglobaldoc) => {
    let groupedData = Arraytempglobaldoc.reduce((result, item) => {
      let index = result.findIndex((group) => group.prod === item.prod);

      if (index === -1) {
        // If the group doesn't exist, create a new one.
        result.push({
          prod: item.prod,
          prodDesc: item.prodDesc,
          toallqty: item.toallqty,
          availqty: item.availqty,
          shortqty: item.shortqty,
          allqty: item.allqty,
          unit: item.unit,
          currloc: item.currloc,
          bcount: item.bcount,
          allstatus: item.allstatus,
        });
      } else {
        // If the group exists, add the quantity to it.
        result[index].toallqty += item.toallqty;
      }

      return result;
    }, []);
  };

  render() {
    let filterDetailedProd;
    let filterGlobalProd;

    if (this.props.toPickDataList) {
      // console.log("T11 inside triplist",this.props.tripsList);
      filterDetailedProd = this.props.toPickDataList.filter((docs) => {
        console.log("T222 inside docs", docs);
        console.log("T11 state of docs ", docs.children[8].value);
        // console.log("T11 inside triplist - openRecrods");
        return (
          docs.children[8].value === "Detailed" ||
          docs.children[8].value === "Global"
        );
      });
    }

    let Arraytempglobaldoc = [];

    if (this.props.toPickDataList) {
      // console.log("T11 inside triplist",this.props.tripsList);
      this.props.toPickDataList &&
        this.props.toPickDataList.length > 0 &&
        this.props.toPickDataList.map((docs) => {
          console.log("T222 inside docs", docs);
          let tempglobaldoc = {};
          console.log("T11 state of docs ", docs.children[8].value);
          // console.log("T11 inside triplist - openRecrods");

          tempglobaldoc.prod = docs.children[2].value;
          tempglobaldoc.prodDesc = docs.children[3].value;
          tempglobaldoc.toallqty = docs.children[4].value;
          tempglobaldoc.availqty = docs.children[5].value;
          tempglobaldoc.shortqty = docs.children[7].value;
          tempglobaldoc.allqty = docs.children[6].value;
          tempglobaldoc.allstatus = docs.children[8].value;
          tempglobaldoc.unit = docs.children[10].value;
          tempglobaldoc.bcount = docs.children[11].value;
          tempglobaldoc.currloc = docs.children[12].value;
          console.log("global temp", tempglobaldoc);
          Arraytempglobaldoc.push(tempglobaldoc);
        });
      console.log("global temparray", Arraytempglobaldoc);
      // filterGlobalProd = this.groupAndSumData(Arraytempglobaldoc);
      console.log("global temparray fitler ", filterGlobalProd);
    }

    if (Arraytempglobaldoc) {
      let groupedData = Arraytempglobaldoc.reduce((result, item) => {
        let index = result.findIndex((group) => group.prod === item.prod);

        if (index === -1) {
          // If the group doesn't exist, create a new one.
          result.push({
            prod: item.prod,
            prodDesc: item.prodDesc,
            toallqty: parseInt(item.toallqty),
            availqty: item.availqty,
            shortqty: parseInt(item.shortqty),
            allqty: parseInt(item.allqty),
            unit: item.unit,
            bcount: item.bcount,
            currloc: item.currloc,
            allstatus: item.allstatus,
          });
        } else {
          // If the group exists, add the quantity to it.
          result[index].toallqty += parseInt(item.toallqty);
          result[index].allqty += parseInt(item.allqty);
          result[index].shortqty += parseInt(item.shortqty);
        }

        return result;
      }, []);

      filterGlobalProd = groupedData;
    }

    return (
      <>
        <div class="Detailed">
          <Col sm="12">
            <Form>
              <Card>
                <CardBody className="pt-1">
                  <Row
                    style={{ backgroundColor: "currentcolor", height: "50px" }}
                  >
                    <Col md="6" className="d-flex align-items-center">
                      <CardTitle
                        className="h1 mb-0 "
                        style={{ color: "white" }}
                      >
                        Picking By Route
                      </CardTitle>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "15px" }}>
                    <Col md="3" sm="12">
                      <FormGroup>
                        <Label>Vehicle Routing</Label>
                        <Input
                          name="concode"
                          id="concode"
                          value={this.props.vrdata && this.props.vrdata.xnumpc}
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3" sm="12">
                      <FormGroup>
                        <Label>Delivery Date</Label>
                        <Input
                          name="concode"
                          id="concode"
                          value={
                            this.props.vrdata &&
                            moment(this.props.vrdata.datliv).format(
                              "MM/DD/YYYY"
                            )
                          }
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3" sm="12">
                      <FormGroup>
                        <Label>Site</Label>
                        <Input
                          name="concode"
                          id="concode"
                          value={
                            this.props.vrdata &&
                            this.props.vrdata.fcy +
                              "-" +
                              this.props.vrdata.siteName
                          }
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3" sm="12">
                      <FormGroup>
                        <Label>Vehicle</Label>
                        <Input
                          name="concode"
                          id="concode"
                          value={
                            this.props.vrdata &&
                            this.props.vrdata.codeyve +
                              "-" +
                              this.props.vrdata.vehicleName
                          }
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="d-flex justify-content-between align-items-center">
                        <Nav tabs className="nav-tabs-custom nav-justified">
                          <NavItem>
                            <Button
                              style={{
                                cursor: "pointer",
                                textWrap: "nowrap",
                                backgroundColor:
                                  this.state.activeTab === "Detailed"
                                    ? "darkgreen"
                                    : "darkseagreen",
                                marginRight: "10px",
                              }}
                              className={classnames({
                                active: this.state.activeTab === "Detailed",
                              })}
                              onClick={() => this.toggleTab("Detailed")}
                            >
                              Pick Ticket Details
                            </Button>
                          </NavItem>
                          <NavItem style={{ paddingRight: "10px" }}>
                            <Button
                              style={{
                                cursor: "pointer",
                                textWrap: "nowrap",
                                backgroundColor:
                                  this.state.activeTab === "Global"
                                    ? "darkgreen"
                                    : "darkseagreen",
                                marginRight: "10px",
                              }}
                              className={classnames({
                                active: this.state.activeTab === "Global",
                              })}
                              onClick={() => this.toggleTab("Global")}
                            >
                              Item Summary
                            </Button>
                          </NavItem>
                        </Nav>
                      </div>

                      <TabContent
                        className="xl-tabcontent1"
                        activeTab={this.state.activeTab}
                      >
                        <LVSToPickDetailTab
                          toPickDataList={filterDetailedProd}
                          vrdata={this.props.vrlist}
                        />
                        <LVSToPickGlobalTab
                          toPickDataList={filterGlobalProd}
                          vrdata={this.props.vrlist}
                        />
                      </TabContent>
                    </Col>
                  </Row>
                  <Row style={{ textAlign: "right", marginRight: "20px" }}>
                    <Col>
                      <Button onClick={this.props.onHideToPickLVSShow}>
                        Close
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Form>
          </Col>
        </div>
      </>
    );
  }
}

export default withNamespaces()(LVSToPickTabs);
