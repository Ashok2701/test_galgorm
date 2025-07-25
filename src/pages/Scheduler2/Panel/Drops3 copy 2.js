import React from "react";
import DisplayProducts from "./DisplayProducts";
import { withNamespaces } from "react-i18next";
import { FixedSizeList } from "react-window";
import moment from "moment";
import "moment-timezone";
import DropRow from "./DropRow";
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
      <td style={{ minWidth: 120 }}>
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
      <td style={{ minWidth: 120 }}>
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
  displayDropStatus = (vStatus, x, reschFlg) => {
    const dropStatus = vStatus;
    const dlvyStatus = x;
    if (dropStatus == "open" && (dlvyStatus == "0" || dlvyStatus == "8")) {
      return (
        <h6>
          <span
            class="badge badge-warning text-uppercase"
            style={{ fontSize: "14px" }}
          >
            {this.props.t("ToPlan")} <span class="badge badge-danger text-smallcase">{reschFlg == 2 ? "(Rescheduled)" : ""}</span>
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
            {this.props.t("Planned")} <span class="badge badge-danger text-smallcase">{reschFlg == 2 ? "(Rescheduled)" : ""}</span>
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
            {this.props.t("Planned")} <span class="badge badge-danger text-smallcase">{reschFlg == 2 ? "(Rescheduled)" : ""}</span>
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
            {this.props.t("Planned")} <span class="badge badge-danger text-smallcase">{reschFlg == 2 ? "(Rescheduled)" : ""}</span>
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
            {this.props.t("Planned")} <span class="badge badge-danger text-smallcase">{reschFlg == 2 ? "(Rescheduled)" : ""}</span>
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
            {this.props.t("OntheWay")} <span class="badge badge-danger text-smallcase">{reschFlg == 2 ? "(Rescheduled)" : ""}</span>
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
            {this.props.t("InProgress")} <span class="badge badge-danger text-smallcase">{reschFlg == 2 ? "(Rescheduled)" : ""}</span>
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
            {this.props.t("Completed")} <span class="badge badge-danger text-smallcase">{reschFlg == 2 ? "(Rescheduled)" : ""}</span>
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
            {this.props.t("Skipped")} <span class="badge badge-danger text-smallcase">{reschFlg == 2 ? "(Rescheduled)" : ""}</span>
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
            {this.props.t("Canceled")} <span class="badge badge-danger text-smallcase">{reschFlg == 2 ? "(Rescheduled)" : ""}</span>
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
  //   
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


  buildLogisticDetails = (drops) => {
  return {
    loadBay: drops.loadBay || "",
    tailGate: drops.tailGate || "",
    waitingTime: drops.waitingTime ? formatTime(drops.waitingTime) : "",
    stackHeight: nullAndNanChecking(drops.stackHeight),
    timings: nullAndNanChecking(drops.timings),
    packing: drops.packing || "",
    height: drops.height || "",
    loadingOrder: drops.loadingOrder || "",
    allDrivers: drops.allDrivers || "",
    driverList: drops.driverList || "",
    allVehClass: drops.allVehClass || "",
    vehClassList: drops.vehClassList || "",
    fromTime:
      drops.fromTime && drops.fromTime.length > 1
        ? drops.fromTime.split(" ")
        : drops.fromTime,
    toTime:
      drops.toTime && drops.toTime.length > 1
        ? drops.toTime.split(" ")
        : drops.toTime,
    availDays: drops.availDays || "",
  };
};


  render() {
    let addProductsClose = () => this.setState({ addProductShow: false });
    let lang = localStorage.getItem("i18nextLng");
    let addInfoIconClose = () => this.setState({ addInfoShow: false });
    let dropList = this.props.dropsList;
    let selectedDate = this.props.currDate;

    // 

    

// console.log(dropList ,"this is drop lists 637");
    let filteredDrops = dropList?.filter((doc)=>doc.carrier=="INTERNAL");

     console.log(filteredDrops ,"internal documents checking here 640");
    return (
      <TabPane
        className="tripstab"
        tabId="Documents"
        style={{ height: "550px", overflowX: "auto", overflowYL: "auto" }}
      >
        <div
  style={{
    height: "550px",
    overflowX: "auto",
    overflowY: "auto",
   
    border: "1px solid #ccc",
  }}
>
  <div style={{ minWidth: "2800px" }}> {/* sets total table width */}
  <table className="table table-sm" style={{ tableLayout: "fixed", width: "100%" }}>
    <thead
      style={{
        position: "sticky",
        top: 0,
        background: "white",
        zIndex: 2,
      }}
    >
      <tr>
        {/* your <th style={{ width: 120 }}> headers here */}
        <th style={{ width: 30 }}></th>
        <th style={{ width: 80 }}></th>
        <th style={{ width: 120 }}>Client Code</th>
        <th style={{ width: 220 }}>Client</th>
        <th style={{ width: 180 }}>Route Code</th>
        <th style={{ width: 220 }}>Transaction No</th>
        <th style={{ width: 120 }}>Picker</th>
        <th style={{ width: 120 }}>Date</th>
        <th style={{ width: 120 }}>Priority</th>
        <th style={{ width: 120 }}>Status</th>
        <th style={{ width: 120 }}>Weight</th>
        <th style={{ width: 60 }}>No. of Lines</th>
        <th style={{ width: 60 }}>Cases</th>
        <th style={{ width: 120 }}>Carrier</th>
        <th style={{ width: 120 }}>Type</th>
        <th style={{ width: 120 }}>City</th>
        <th style={{ width: 90 }}>Site</th>
        <th style={{ width: 120 }}>Preparation List</th>
        <th style={{ width: 90 }}>Vehicle</th>
        <th style={{ width: 90 }}>Driver</th>
        <th style={{ width: 60 }}>Trip No</th>
        <th style={{ width: 120 }}>Add Code</th>
        <th style={{ width: 120 }}>Add Desc</th>
        <th style={{ width: 90 }}>Info</th>
        <th style={{ width: 90 }}>Service Time</th>
      </tr>
    </thead>
  </table>

  <FixedSizeList
    height={500}
    itemCount={filteredDrops.length}
    itemSize={60}
    width={"100%"}
  >
    {({ index, style }) => {
      const drops = filteredDrops[index];
      const logisticDetails = this.buildLogisticDetails(drops);
      if (drops.optistatus === "dragged") return null;

      return (
        <table
          className="table table-sm"
          style={{
            ...style,
            tableLayout: "fixed",
            width: "100%",
          }}
        >
          <tbody>
            <tr
              key={"drops" + index}
              style={{
                backgroundColor: this.getColor(drops),
                padding: "10px",
                margin: "5px 0",
                borderRadius: "5px",
              }}
              className={this.dragStyle(drops.type, drops.dlvystatus)}
              draggable={
                drops.type === "open" &&
                (drops.dlvystatus === "0" || drops.dlvystatus === "8")
              }
              onDragStart={(event) =>
                this.props.handleDragStart(event, drops, "drops", index)
              }
            >
              <td style={{ width: 30 }}>
                <input
                  type="checkbox"
                  onClick={() =>
                    this.props.updateDocsGeoLocations(index, drops)
                  }
                  style={{ width: "17px", height: "17px" }}
                />
              </td>
               <td style={{ width: 80 }}>
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
              <td style={{ width: 120 }}>{this.navigateToCustomer(drops)}</td>
              <td style={{ fontSize: "14px", fontWeight: "bold" ,width: 220 }}>
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
              <td style={{ width: 180 }}> {drops.routeCodeDesc &&
                          this.displayRouteCodeColor(
                            drops.routeCodeDesc,
                            drops.routeColor
                          )}</td>
              <td style={{ width: 220 }}>
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
              <td style={{ width: 120 }}>{drops.picker}</td>
              <td style={{ width: 120 }}>{moment.tz(drops.docdate, "").format("DD-MM-YYYY")}</td>
              <td style={{ width: 120 }}>{this.displayPriority(drops)}</td>
              <td style={{ width: 120 }}>
                {this.displayDropStatus(drops.type, drops.dlvystatus, drops.reschFlg)}
              </td>
              <td style={{ width: 120 }}>
                {drops.netweight === 0 ? "" : drops.netweight}{" "}
                {drops.netweight === 0 ? "" : drops.weightunit}
              </td>
              <td className="text-center" style={{ width: 60 }}>{drops.products?.length}</td>
              <td className="text-center" style={{ width: 60 }}>
                {this.getproductsTotalQuantity(drops.products)}
              </td>
              <td style={{ width: 120 }}>
                {drops.carrier &&
                  this.displayCarrierColor(drops.carrier, drops.carrierColor)}
              </td>
              <td style={{ width: 120 }}>{this.displayRouteTag(drops, localStorage.getItem("i18nextLng"))}</td>
              <td style={{ width: 120 }}>{drops.poscode}, {drops.city}</td>
              <td style={{ width: 90 }}>{drops.site}</td>
              <td style={{ width: 120 }}>{drops.prelistCode}</td>
              <td style={{ width: 90 }}>{drops.vehicleCode}</td>
              <td style={{ width: 90 }}>{drops.drivercode}</td>
              <td style={{ width: 60 }}>{drops.tripno === "0" ? "" : drops.tripno}</td>
              <td style={{ width: 120 }}>{drops.adrescode}</td>
              <td style={{ width: 120 }}>{drops.adresname}</td>
              <td style={{ width: 90 }}>
                <a
                  href="#"
                  onClick={() =>
                    this.onInfoClick(logisticDetails, drops.docnum)
                  }
                >
                  <i className="fa fa-info-circle" />
                </a>
              </td>
              <td style={{ width: 90 }}>{formatTime(convertHrToSec(drops.serviceTime))}</td>
            </tr>
          </tbody>
        </table>
      );
    }}
  </FixedSizeList>
</div>
</div>
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
       
      </TabPane>
    );
  }
}

// export default Drops;
export default withNamespaces()(Drops3);
