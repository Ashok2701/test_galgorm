import React from "react";
import moment from "moment";
import {
  convertHrToSec,
  formatTime,
  nullAndNanChecking,
} from "../converterFunctions/converterFunctions";

const DropRow = React.memo(({ drops, index, propsFromParent, onDocClick, onInfoClick, getColor, dragStyle }) => {
  const logisticDetails = {
    loadBay: drops.loadBay,
    tailGate: drops.tailGate,
    waitingTime: drops.waitingTime && formatTime(drops.waitingTime),
    stackHeight: nullAndNanChecking(drops.stackHeight),
    timings: nullAndNanChecking(drops.timings),
    packing: drops.packing,
    height: drops.height,
    loadingOrder: drops.loadingOrder,
    allDrivers: drops.allDrivers,
    driverList: drops.driverList,
    allVehClass: drops.allVehClass,
    vehClassList: drops.vehClassList,
    fromTime: drops.fromTime?.split(" ") || drops.fromTime,
    toTime: drops.toTime?.split(" ") || drops.toTime,
    availDays: drops.availDays,
  };

  if (drops.optistatus === "dragged") return null;

  return (
    <tr
      id={`drops${index}`}
      className={dragStyle(drops.type, drops.dlvystatus)}
      draggable={drops.type === "open" && (drops.dlvystatus === "0" || drops.dlvystatus === "8")}
      style={{ backgroundColor: getColor(drops), padding: "10px", margin: "5px 0", borderRadius: "5px" }}
      onDragStart={(event) => propsFromParent.handleDragStart(event, drops, "drops", index)}
    >
      <td><input type="checkbox" name="docsCheckBox" onClick={() => propsFromParent.updateDocsGeoLocations(index, drops)} /></td>
      <td>{drops.movtype === "DROP" ? <img src="assets/img/drops.png" width="50" alt="drop" /> : <i className="fa fa-calendar fa-2x" />}</td>
      <td>{drops.bpcode}</td>
      <td>
        <a href="#" onClick={() => onInfoClick(logisticDetails, drops.docnum)}>{drops.bpname}</a>
      </td>
      <td>{drops.routeCodeDesc}</td>
      <td>
        <span onClick={() => onDocClick(drops.products, drops.docnum, drops.doctype, drops.skills)}>
          {drops.docnum}
        </span>
      </td>
      <td>{drops.picker}</td>
      <td>{moment(drops.docdate).format("DD-MM-YYYY")}</td>
      <td>{drops.priorityOrder}</td>
      <td>{drops.type}</td>
      <td>{drops.netweight} {drops.weightunit}</td>
      <td>{drops.products?.length}</td>
      <td>{drops.products?.reduce((total, product) => total + Number(product.quantity), 0)}</td>
      <td>{drops.carrier}</td>
      <td>{drops.doctype}</td>
      <td>{drops.poscode}, {drops.city}</td>
      <td>{drops.site}</td>
      <td>{drops.prelistCode}</td>
      <td>{drops.vehicleCode}</td>
      <td>{drops.drivercode}</td>
      <td>{drops.tripno === "0" ? "" : drops.tripno}</td>
      <td>{drops.adrescode}</td>
      <td>{drops.adresname}</td>
      <td>
        <a href="#" onClick={() => onInfoClick(logisticDetails, drops.docnum)}>
          <i className="fa fa-info-circle" />
        </a>
      </td>
      <td>{formatTime(convertHrToSec(drops.serviceTime))}</td>
    </tr>
  );
});

export default DropRow;
