import React from "react";
import DisplayProducts from "./DisplayProducts";
import { withNamespaces } from "react-i18next";
import moment from "moment";
import "moment-timezone";
import DisplayInformationIconDetails2 from "./DisplayInformationIconDetails2";
import {
  convertHrToSec,
  formatTime,
  nullAndNanChecking,
} from "../converterFunctions/converterFunctions";

import "../dashboard.scss";
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

const x3Url = process.env.REACT_APP_X3_URL;

class Drops3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addProductShow: false,
      addInfoShow: false,
      products: [],
      docNumber: "",
      skills: "",
      doctype: "",
      logisticDetails: "",
    };
  }

  groupingColor(color) {
  

    var myStr = color;
    var subStr = myStr.match("background-color:(.*)");
    var s = subStr[1];
    return s;
  }

  defaultColor(checked, dropdate, seldate) {
    var DAte1 = moment.tz(dropdate, "").format("YYYY-MM-DD");
    var SelectedDAte = moment.tz(seldate, "").format("YYYY-MM-DD");

    var Dropd = new Date(DAte1);
    var Seld = new Date(SelectedDAte);

    if (Dropd == Seld) {
      return "#FFFFB0";
    } else if (Dropd > Seld) {
      return "#D3FEFC";
    } else if (Dropd < Seld) {
      return "#FFE1E1";
    } else {
      return "#FFFFB0";
    }

    return "";
  }

  getBgcolor(type, docnum, doctype) {
  
    if (this.props.trailerDropped && type !== "" && doctype === "open") {
    
      if (
        this.props.droppedTrailers &&
        !this.props.droppedTrailers.includes(type)
      ) {
        
        return "";
      } else {
        
        return "#feff99";
      }
    } else {
   
      return "";
    }
  }

  onDocClick = (product, docNum, doctype, skills) => {
    const products = product;
    // setTomTomNotification(true)

    this.setState({
      addProductShow: true,
      products: products,
      docNumber: docNum,
      skills: skills,
      doctype: doctype,
    });
  };
  onInfoClick = (logisticData, docNum) => {
    const logisticDetails = logisticData;
    this.setState({
      addInfoShow: true,
      logisticDetails: logisticDetails,
      docNumber: docNum,
    });
  };

  addInfoClose = () => {
    this.setState({
      addInfoClose: false,
    });
  };

  dragStyle = (type, x) => {
    if (type === "open" && (x == "0" || x == "8")) {
      return "custom-enable";
    }
    return "custom-disable";
  };
  colorStyle = (type) => {
    if (type === "open") {
      return "dot-green";
    }
    if (type === "selected") {
      return "dot-red";
    }
    return "dot-blue";
  };

  //add carrier color
  displayCarrierColor = (carrier, color) => {
 
    const carriername = carrier;
    var myStr = color;
    var subStr = myStr.match("background-color:(.*)");
    var s = subStr[1];
  
    return (
      <td>
        {" "}
        <span
          className="badge text-uppercase"
          style={{ backgroundColor: s, fontSize: "14px" }}
        >
          {carriername}
        </span>
      </td>
    );
  };

  //add Rotuecode color
  displayRouteCodeColor = (routeCodeDesc, color) => {

    const RoutcodeDesc = routeCodeDesc;
    var myStr = color;
    var subStr = myStr.match("background-color:(.*)");
    var s = subStr[1];
  
    return (
      <td>
        {" "}
        <h6>
          {" "}
          <span
            className="badge text-uppercase"
            style={{ backgroundColor: s, fontSize: "14px" }}
          >
            {RoutcodeDesc}
          </span>{" "}
        </h6>
      </td>
    );
  };

  // Added by BN 20200130
  displayDropStatus = (vStatus, x) => {
    const dropStatus = vStatus;
    const dlvyStatus = x;
    if (dropStatus == "open" && (dlvyStatus == "0" || dlvyStatus == "8")) {
      return (
        <h6>
          <span
            class="badge badge-warning text-uppercase"
            style={{ fontSize: "14px" }}
          >
            {this.props.t("ToPlan")}
          </span>
        </h6>
      );
    }
    if (dropStatus == "open" && dlvyStatus == "1") {
      return (
        <h6>
          <span
            class="badge badge-success text-uppercase"
            style={{ fontSize: "14px" }}
          >
            {this.props.t("Planned")}
          </span>
        </h6>
      );
    }
    if (dropStatus == "Allocated" && (dlvyStatus == "0" || dlvyStatus == "8")) {
      return (
        <h6>
          <span
            class="badge badge-success text-uppercase"
            style={{ fontSize: "14px" }}
          >
            {this.props.t("Planned")}
          </span>
        </h6>
      );
    }
    if (dropStatus == "selected" && (dlvyStatus == "0" || dlvyStatus == "8")) {
      return (
        <h6>
          <span
            class="badge badge-success text-uppercase"
            style={{ fontSize: "14px" }}
          >
            {this.props.t("Planned")}
          </span>
        </h6>
      );
    }
    if (dlvyStatus == "1") {
      return (
        <h6>
          <span
            class="badge badge-success text-uppercase"
            style={{ fontSize: "14px" }}
          >
            {this.props.t("Planned")}
          </span>
        </h6>
      );
    }
    if (dlvyStatus == "2") {
      return (
        <h6>
          <span
            class="badge badge-primary text-uppercase"
            style={{ fontSize: "14px" }}
          >
            {this.props.t("OntheWay")}
          </span>
        </h6>
      );
    }
    if (dlvyStatus == "3") {
      return (
        <h6>
          <span
            class="badge badge-warning text-uppercase"
            style={{ fontSize: "14px" }}
          >
            {this.props.t("InProgress")}
          </span>
        </h6>
      );
    }
    if (dlvyStatus == "4") {
      return (
        <h6>
          <span
            class="badge badge-danger text-uppercase"
            style={{ fontSize: "14px" }}
          >
            {this.props.t("Completed")}
          </span>
        </h6>
      );
    }
    if (dlvyStatus == "5") {
      return (
        <h6>
          <span
            class="badge badge-danger text-uppercase"
            style={{ fontSize: "14px" }}
          >
            {this.props.t("Skipped")}
          </span>
        </h6>
      );
    }
    if (dlvyStatus == "6") {
      return (
        <h6>
          <span
            class="badge badge-dark text-uppercase"
            style={{ fontSize: "14px" }}
          >
            {this.props.t("Rescheduled")}
          </span>
        </h6>
      );
    }
    if (dlvyStatus == "7") {
      return (
        <h6>
          <span
            class="badge badge-danger text-uppercase"
            style={{ fontSize: "14px" }}
          >
            {this.props.t("Canceled")}
          </span>
        </h6>
      );
    }
  };

  GetDeliveryStatus = (x) => {
    switch (x) {
      case "1":
        return "Scheduled";
      case "2":
        return "On the Way";
      case "3":
        return "In-progress";
      case "4":
        return "Completed";
      case "5":
        return "Skipped";
      case "6":
        return "Re-Scheduled";
      case "7":
        return "Cancelled";
      case "8":
        return "To-Plan";
      default:
        return "To-Plan";
    }
  };

  displayPriority = (drop) => {
    if (drop.priorityOrder === "1") {
      return (
        <h6>
          <span
            class="badge badge-primary text-uppercase"
            style={{ fontSize: "14px" }}
          >
            Normal
          </span>
        </h6>
      );
    } else if (drop.priorityOrder === "2") {
      return (
        <h6>
          <span
            class="badge badge-success text-uppercase"
            style={{ fontSize: "14px" }}
          >
            Urgent
          </span>
        </h6>
      );
    } else if (drop.priorityOrder === "3") {
      return (
        <h6>
          <span
            class="badge badge-danger text-uppercase"
            style={{ fontSize: "14px" }}
          >
            Critical
          </span>
        </h6>
      );
    } else {
      return (
        <h6>
          <span
            class="badge badge-primary text-uppercase"
            style={{ fontSize: "14px" }}
          >
            Normal
          </span>
        </h6>
      );
    }
  };

  displayTypeDocBadge = (typDoc, pDropPairedDoc) => {
    const dropMvt = typDoc;
    const dropPairedDoc = pDropPairedDoc;
    if (dropMvt == "PICK") {
      return (
        <h6>
          <span class="badge badge-primary text-uppercase">
            {this.props.t("PICK")}
          </span>
        </h6>
      );
    }
    if (dropMvt == "DLV") {
      return (
        <h6>
          <span class='badge badge-success style="font-size:4rem'>
            {this.props.t("DLV")}
          </span>
        </h6>
      );
    }
    if (dropMvt == "PRECEIPT") {
      return (
        <h6>
          <span class="badge badge-danger text-uppercase">
            {this.props.t("PRECEIPT")}
          </span>
        </h6>
      );
    }
  };

  displayRouteTagBadge = (typDoc) => {
    const dropMvt = typDoc;
    if (dropMvt == "EQUIP DLV") {
      return (
        <h6>
          <span class="badge badge-primary text-uppercase">{dropMvt}</span>
        </h6>
      );
    }
    if (dropMvt == "DLV") {
      return (
        <h6>
          <span class='badge badge-success style="font-size:4rem'>
            {dropMvt}
          </span>
        </h6>
      );
    }
    if (dropMvt == "PICKTKT") {
      return (
        <h6>
          <span class="badge badge-warning text-uppercase">{dropMvt}</span>
        </h6>
      );
    }
    if (dropMvt == "PREP EXP") {
      return (
        <h6>
          <span class='badge badge-success style="font-size:4rem'>
            {dropMvt}
          </span>
        </h6>
      );
    }
    if (dropMvt == "LIV REP") {
      return (
        <h6>
          <span class="badge badge-danger text-uppercase">{dropMvt}</span>
        </h6>
      );
    }
    if (dropMvt == "ENLV") {
      return (
        <h6>
          <span class='badge badge-info style="font-size:4rem'>{dropMvt}</span>
        </h6>
      );
    }
    if (dropMvt == "REC REP") {
      return (
        <h6>
          <span class='badge badge-secondary style="font-size:4rem'>
            {dropMvt}
          </span>
        </h6>
      );
    }
  };

  ascDescSymbol = (index) => {
    if (this.props.pickOrder[index] === 1) {
      return "▼";
    }
    if (this.props.pickOrder[index] === 0) {
      return "▲";
    }
  };

  displayRouteTag = (drop, lang) => {

    let defaulprop = ";font-style:normal;background-color:#92a8d1";

    if (!("routeColor" in drop)) drop.routeColor = defaulprop;

    if (lang == "eng") {
      var myStr = drop.routeColor;
      var subStr = myStr.match("background-color:(.*)");
      var s = subStr[1];
      return (
        <h6>
          <span
            class="badge text-uppercase"
            style={{ backgroundColor: s, fontSize: "14px" }}
          >
            {drop.routeTag}
          </span>
        </h6>
      );
    } else if (lang == "fr") {
      var myStr = drop.routeColor;
      var subStr = myStr.match("background-color:(.*)");
      var s = subStr[1];
      return (
        <h6>
          <span
            class="badge  text-uppercase"
            style={{ backgroundColor: s, ontSize: "14px" }}
          >
            {drop.routeTagFRA}
          </span>
        </h6>
      );
    } else {
      return "";
    }
  };

  SearchDrops = (e) => {

    this.props.updateDropSearchTerm(e);
  };

  getproductsTotalQuantity = (products) => {
    return products.reduce(
      (total, product) => total + Number(product.quantity),
      0
    );
  };

  // based on creation date we are displaying color code

  // getColor = (doc) => {
  //   console.log(doc, "this is doccc, in getcolor")
  //   const today = new Date();
  //   const createdDate = new Date(doc.docdate);
  //   const differenceInDays = Math.floor((today - createdDate) / (1000 * 3600 * 24));

  //   if(doc.doctype == "PICK"){
  //     return differenceInDays === 0 ? '#90EE90' // Green
  //     : differenceInDays <= 3 ? '#FCE77D' // Light Orange
  //     : '#EEA47F';  // Light Red
  //   }else{
  //     // for other documents it will show light blue
  //     return "#ADD8E6"
  //   }

  // };

  getColor = (doc) => {
    const today = new Date();
    const createdDate = new Date(doc.docdate);

    // Check if the document date is in the future
    if (createdDate > today) {
      return "#D3D3D3";
    }

    const differenceInDays = Math.floor(
      (today - createdDate) / (1000 * 3600 * 24)
    );

    if (doc.doctype === "PICK") {
      return differenceInDays === 0
        ? "#90EE90" // Green
        : differenceInDays <= 3
        ? "#FCE77D" // Light Orange
        : "#EEA47F"; // Light Red
    } else {
      // For other documents, show light blue
      return "#ADD8E6";
    }
  };

  navigateToCustomer = (drops) => {
    let url;

    if (drops.routeTag != "INTER-PICK") {
      url = `${x3Url}/$sessions?f=GESBPC/2//M/` + drops.bpcode;
      return (
        <a  draggable={
          drops.type === "open" &&
          (drops.dlvystatus === "0" ||
            drops.dlvystatus === "8")
        }
         href={url} target="_blank">
          {drops.bpcode}{" "}
        </a>
      );
    } else {
      return (
        <a 
        draggable={
          drops.type === "open" &&
          (drops.dlvystatus === "0" ||
            drops.dlvystatus === "8")
        }
        href="#">
          {drops.bpcode}{" "}
        </a>
      );
    }
  };

  render() {
    let addProductsClose = () => this.setState({ addProductShow: false });
    let lang = localStorage.getItem("i18nextLng");
    let addInfoIconClose = () => this.setState({ addInfoShow: false });
    let dropList = this.props.dropsList;
    let selectedDate = this.props.currDate;

    // console.log("products show state inside render", this.props.selectedDocs);

    console.log(dropList, "this is droplist checking")


    let filteredDrops = dropList?.filter((doc)=>doc.carrier!="EXTERNAL")
    return (
      <TabPane
        className="tripstab"
        tabId="Documents"
        style={{ height: "550px", overflowX: "auto", overflowYL: "auto" }}
      >
        <div class="reportlist-view tableCustomFixHead">
          {/* <table class="table table-striped m-0">  */}
          <table
            class={
              "table table-sm " +
              (this.props.trailerDropped
                ? " "
                : this.props.dayschecked
                ? " "
                : " ")
            }
          >
            <thead
              class="custom-sort"
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                background: "white",
              }}
            >
              <tr>
                <th></th>
                <th></th>
                <th onClick={() => this.props.sortDrop("bpcode", 1)}>
                  Client Code
                  {this.props.dropOrder[1] === 1 ? "▼" : "▲"}
                </th>
                <th onClick={() => this.props.sortDrop("bpname", 2)}>
                  {this.props.t("Client")}{" "}
                  {this.props.dropOrder[2] === 1 ? "▼" : "▲"}
                </th>
                <th onClick={() => this.props.sortDrop("routecode", 12)}>
                  {this.props.t("Route Code")}{" "}
                  {this.props.dropOrder[12] === 1 ? "▼" : "▲"}
                </th>

                <th onClick={() => this.props.sortDrop("docnum", 0)}>
                  {this.props.t("Transaction No")}{" "}
                  {this.props.dropOrder[0] === 1 ? "▼" : "▲"}
                </th>

                <th>Picker</th>

                <th onClick={() => this.props.sortDrop("docdate", 11)}>
                  {this.props.t("Date")}{" "}
                  {this.props.dropOrder[11] === 1 ? "▼" : "▲"}
                </th>
                <th onClick={() => this.props.sortDrop("Priority", 13)}>
                  {this.props.t("Priority")}{" "}
                  {this.props.dropOrder[13] === 1 ? "▼" : "▲"}
                </th>
                <th onClick={() => this.props.sortDrop("type", 8)}>
                  {this.props.t("Status")}{" "}
                  {this.props.dropOrder[8] === 1 ? "▼" : "▲"}
                </th>
                <th onClick={() => this.props.sortDrop("weight", 14)}>
                  Weight
                  {this.props.dropOrder[14] === 1 ? "▼" : "▲"}
                </th>
                <th onClick={() => this.props.sortDrop("quantity", 16)}>
                  Cases
                  {this.props.dropOrder[16] === 1 ? "▼" : "▲"}
                </th>

                <th onClick={() => this.props.sortDrop("carrier", 15)}>
                  {this.props.t("Carrier")}
                  {this.props.dropOrder[15] === 1 ? "▼" : "▲"}
                </th>
                <th onClick={() => this.props.sortDrop("doctype", 3)}>
                  {this.props.t("Type")}{" "}
                  {this.props.dropOrder[3] === 1 ? "▼" : "▲"}
                </th>
                <th onClick={() => this.props.sortDrop("poscode", 4)}>
                {this.props.t("City")}{" "}
                  {this.props.dropOrder[4] === 1 ? "▼" : "▲"}
                </th>
                <th onClick={() => this.props.sortDrop("site", 9)}>
                  {this.props.t("Site")}{" "}
                  {this.props.dropOrder[9] === 1 ? "▼" : "▲"}
                </th>
                <th>Preparation List</th>
                <th onClick={() => this.props.sortDrop("vehicleCode", 7)}>
                  {this.props.t("Vehicle")}{" "}
                  {this.props.dropOrder[7] === 1 ? "▼" : "▲"}
                </th>
                <th onClick={() => this.props.sortDrop("Trailer", 10)}>
                  {this.props.t("Trailer")}{" "}
                  {this.props.dropOrder[10] === 1 ? "▼" : "▲"}
                </th>

                <th>{this.props.t("Driver")}</th>

                <th>{this.props.t("tripno")} </th>

                <th>{this.props.t("Add Code")}</th>
                <th>{this.props.t("Add Desc")}</th>

                {/* <th onClick = { () => this.props.sortDrop('netweight', 5)}>
                                                                        Mass {this.props.dropOrder[5] === 1 ? "▼" : "▲"}
                                                                    </th> */}
                {/* <th onClick = { () => this.props.sortDrop('volume', 6)}>
                                                                        Volume {this.props.dropOrder[6] === 1 ? "▼" : "▲"}
                                                                    </th> */}
                <th>Info</th>

                <th>{this.props.t("ServiceTime")}</th>
              </tr>
            </thead>
            <tbody>
              {(filteredDrops || []).map((drops, i) => {
                let logisticDetails = {};
                logisticDetails.loadBay = drops.loadBay && drops.loadBay;
                logisticDetails.tailGate = drops.tailGate && drops.tailGate;
                logisticDetails.waitingTime =
                  drops.waitingTime && formatTime(drops.waitingTime);
                logisticDetails.stackHeight =
                  drops.stackHeight && nullAndNanChecking(drops.stackHeight);
                logisticDetails.timings =
                  drops.timings && nullAndNanChecking(drops.timings);
                logisticDetails.packing = drops.packing && drops.packing;
                logisticDetails.height = drops.height && drops.height;
                logisticDetails.loadingOrder =
                  drops.loadingOrder && drops.loadingOrder;
                logisticDetails.allDrivers =
                  drops.allDrivers && drops.allDrivers;
                logisticDetails.driverList =
                  drops.driverList && drops.driverList;
                logisticDetails.allVehClass =
                  drops.allVehClass && drops.allVehClass;
                logisticDetails.vehClassList =
                  drops.vehClassList && drops.vehClassList;
                logisticDetails.fromTime =
                  drops.fromTime && drops.fromTime.length > 1
                    ? drops.fromTime.split(" ")
                    : drops.fromTime;
                logisticDetails.toTime =
                  drops.toTime && drops.toTime.length > 1
                    ? drops.toTime.split(" ")
                    : drops.toTime;
                logisticDetails.availDays = drops.availDays && drops.availDays;

                if (drops.optistatus && drops.optistatus == "dragged") {
                  return "";
                } else {
                  return (
                    <tr
                      id={"drops" + i}
                      className={this.dragStyle(drops.type, drops.dlvystatus)}
                      draggable={
                        drops.type === "open" &&
                        (drops.dlvystatus == "0" || drops.dlvystatus == "8")
                          ? "true"
                          : "false"
                      }
                      style={{
                        backgroundColor: this.getColor(drops),
                        padding: "10px",
                        margin: "5px 0",
                        borderRadius: "5px",
                      }}
                      onDragStart={(event) =>
                        this.props.handleDragStart(event, drops, "drops", i)
                      }
                      key={"drops" + i}
                    >
                      <td className="pl-2">
                        <input
                    
                          type="checkbox"
                          name="docsCheckBox"
                          onClick={() =>
                            this.props.updateDocsGeoLocations(i, drops)
                          }
                          style={{
                            width: '17px',
                            height: '17px',
                          }}
                        />
                      </td>
                      <td>
                        {drops.movtype === "DROP" ? (
                          <img
                            draggable={
                              drops.type === "open" &&
                              (drops.dlvystatus === "0" ||
                                drops.dlvystatus === "8")
                            }
                            src="assets/img/drops.png"
                            alt="drops"
                            class="rounded-circle"
                            width="50"
                          ></img>
                        ) : drops.movtype === "PICK" ? (
                          <img
                            draggable={
                              drops.type === "open" &&
                              (drops.dlvystatus === "0" ||
                                drops.dlvystatus === "8")
                            }
                            src="assets/img/pickup.png"
                            alt="drops"
                            class="rounded-circle"
                            width="50"
                          ></img>
                        ) : (
                          <i
                            draggable={
                              drops.type === "open" &&
                              (drops.dlvystatus === "0" ||
                                drops.dlvystatus === "8")
                            }
                            class="fa fa-calendar fa-2x"
                            aria-hidden="true"
                          ></i>
                        )}
                      </td>
                      <td> {this.navigateToCustomer(drops)}</td>

                      {/* <td style={{ fontSize: "14px", fontWeight: "bold" }}>
                        {" "}
                        <a
                          href="#"
                          style={{
                            cursor:
                              drops.type === "open" && (drops.dlvystatus === "0" || drops.dlvystatus === "8")
                                ? "pointer"
                                : "default",
                          }}

                          
                  
                          onClick={() =>
                            this.onInfoClick(logisticDetails, drops.docnum)
                          }
                        >
                          {drops.bpname}{" "}
                        </a>
                      </td> */}
                      <td style={{ fontSize: "14px", fontWeight: "bold" }}>
                        <a
                          href="#"
                          style={{
                            cursor:
                              drops.type === "open" &&
                              (drops.dlvystatus === "0" ||
                                drops.dlvystatus === "8")
                                ? "pointer"
                                : "default",
                          }}
                          onClick={() =>
                            this.onInfoClick(logisticDetails, drops.docnum)
                          }
                          draggable={
                            drops.type === "open" &&
                            (drops.dlvystatus === "0" ||
                              drops.dlvystatus === "8")
                          }
                        >
                          {drops.bpname}{" "}
                        </a>
                      </td>

                      <td>
                        {drops.routeCodeDesc &&
                          this.displayRouteCodeColor(
                            drops.routeCodeDesc,
                            drops.routeColor
                          )}
                      </td>
                      <td>
                        {/* <span style= {{ cursor: 'pointer'}} onClick= {() => this.onDocClick(drops.products, drops.docnum)}>{drops.docnum}</span> */}
                        <span
                          onClick={() =>
                            this.onDocClick(
                              drops.products,
                              drops.docnum,
                              drops.doctype,
                              drops.skills
                            )
                          }
                        >
                          {drops.docnum}
                        </span>
                      </td>
                      <td>{drops.picker}</td>
                      <td width="5%">
                        {moment.tz(drops.docdate, "").format("DD-MM-YYYY")}
                      </td>
                      <td width="5%">{this.displayPriority(drops)}</td>
                      <td>
                        {/* <span className= { this.colorStyle(drops.type) }>{drops.type}</span> */}
                        <td width="3%">
                          {this.displayDropStatus(drops.type, drops.dlvystatus)}
                        </td>
                      </td>
                      <td>
                        {drops.netweight == 0 ? "" : drops.netweight}{" "}
                        {drops.netweight == 0 ? "" : drops.weightunit}
                      </td>
                      <td>{this.getproductsTotalQuantity(drops.products)}</td>
                      <td>
                        {" "}
                        {drops.carrier &&
                          this.displayCarrierColor(
                            drops.carrier,
                            drops.carrierColor
                          )}
                      </td>
                      <td width="3%">{this.displayRouteTag(drops, lang)}</td>
                      <td>
                        {drops.poscode}, {drops.city}
                      </td>

                      <td style={{ fontSize: "14px", fontWeight: "bold" }}>
                        {drops.site}
                      </td>
                      <td>{drops.prelistCode}</td>

                      <td>{drops.vehicleCode}</td>
                      <td>{drops.trailer}</td>

                      <td>{drops.drivercode}</td>

                      <td>{drops.tripno === "0" ? "" : drops.tripno}</td>

                      <td>{drops.adrescode}</td>
                      <td>{drops.adresname}</td>
                      {/* <td>{drops.doctype ? drops.doctype : drops.movtype}</td> */}

                      {/* <td>{drops.netweight} {drops.weightunit}</td>
                                            <td>{drops.volume} {drops.volume_unit}</td> */}
                      <td data-toggle="tooltip" data-placement="top">
                        <a
                          draggable={
                            drops.type === "open" &&
                            (drops.dlvystatus === "0" ||
                              drops.dlvystatus === "8")
                          }
                          href="#"
                          onClick={() =>
                            this.onInfoClick(logisticDetails, drops.docnum)
                          }
                        >
                          <i class="fa fa-info-circle" aria-hidden="true"></i>
                        </a>
                      </td>

                      <td>{formatTime(convertHrToSec(drops.serviceTime))}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>

          <DisplayProducts
            routeCodes={this.props.routeCodes}
            currDropsPanel={this.props.currDropsPanel}
            pickersList={this.props.pickersList}
            show={this.state.addProductShow}
            onHide={addProductsClose}
            products={this.state.products}
            docNum={this.state.docNumber}
            skills={this.state.skills}
            doctype={this.state.doctype}
            fetchDocumentPanelDateChange={
              this.props.fetchDocumentPanelDateChange
            }
            documentPanel_date={this.props.documentPanel_date}
            viewMode={"documentpanel"}
            selectedDocs={this.props.selectedDocs}
          ></DisplayProducts>

          <DisplayInformationIconDetails2
            show={this.state.addInfoShow}
            onInfoIconHide={addInfoIconClose}
            data={this.state.logisticDetails}
            dataType="object"
            docNum={this.state.docNumber}
          ></DisplayInformationIconDetails2>
        </div>
      </TabPane>
    );
  }
}

// export default Drops;
export default withNamespaces()(Drops3);
