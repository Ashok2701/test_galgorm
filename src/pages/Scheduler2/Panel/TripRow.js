import React from "react";
import moment from "moment";
import InfoIcon from "@mui/icons-material/Info";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import RouteIcon from "@mui/icons-material/Route";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import WarningIcon from "@mui/icons-material/Warning";
import Tooltip from "@mui/material/Tooltip";

const cellStyle = (width) => ({
  width,
  padding: "8px",
  fontSize: "14px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const rowStyle = (style, bgColor) => ({
  ...style,
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #e0e0e0",
  padding: "0 5px",
  backgroundColor: bgColor,
  boxSizing: "border-box",
});

const getBgcolor = (vehicleCode, status, vehicles) => {
 // if (status === "Open") return "cornsilk";

  for (let i = 0; i < vehicles.length; i++) {
    const vehicle = vehicles[i];
    if (vehicle.codeyve === vehicleCode) {
      const match = vehicle.color?.match(/background-color:(.*)/);
      if (match && match[1]) return match[1].trim();
    }
  }
  return "#fff";
};

const TripRow = ({
  trip,
  index,
  style,
  t,
  vehiclePanel,
  onTriplogClick,
  onConfirmDeleteClick,
  onWaringAlertClick,
  getVRdetailBtnClick,
  onConfirmClick,
  onOptimiseConfirm,
  onDisputeValidateTrip,
  CheckValiationStatus,
}) => {
  const isOptimized = trip.optistatus?.toLowerCase() === "optimized";

  const getStatusBadge = () => {
    if (trip.optistatus === "Open" && !trip.lock && !trip.tmsValidated)
      return t("OPEN");
    if (isOptimized && !trip.lock)
      return ["AutoScheduler", "AutoOpScheduler"].includes(trip.generatedBy)
        ? t("AUTO-OPTIMIZED")
        : t("OPTIMIZED");
    if (trip.lock && !trip.tmsValidated) return t("LOCKED");
    if (trip.lock && trip.tmsValidated && !trip.lvsValidated)
      return t("TO_LOAD");
    if (trip.lock && trip.tmsValidated && trip.lvsValidated) {
      if ([5, 6, 7, 10].includes(trip.lvsStatus)) return t("COMPLETED");
      return t("LOAD_CONFIRMED");
    }
    return t("OPEN");
  };

  const getTripStatusIcon = () => {
    if (trip.lock && trip.tmsValidated && trip.lvsValidated) {
      if ([5, 6, 7, 10].includes(trip.lvsStatus))
        return <ThumbUpAltIcon color="primary" style={{ fontSize: 26 }} />;
      if (trip.lvsStatus === 9)
        return <LocalShippingIcon color="primary" style={{ fontSize: 26 }} />;
    }
    return null;
  };

  const casesCount = (deliveries = [], pickups = []) => {
    let total = 0;
    const count = (items) =>
      items.forEach((item) =>
        item.products?.forEach((p) => {
          const qty = parseFloat(p.quantity);
          if (!isNaN(qty)) total += qty;
        })
      );
    count(deliveries);
    count(pickups);
    return Math.round(total);
  };

  const bgColor = getBgcolor(trip.vehicleObject.code, trip.optistatus, vehiclePanel?.vehicles);

  return (
    <div style={rowStyle(style, bgColor)}>
      <div style={cellStyle("40px")}>
        <input type="checkbox" />
      </div>
      <div style={cellStyle("40px")}>
        {!trip.lock && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onConfirmDeleteClick(index, trip.itemCode)}
          >
            <i className="fa fa-trash" />
          </button>
        )}
      </div>
      <div style={cellStyle("100px")}>
        {moment(trip.docdate).format("DD-MM-YYYY")}
      </div>
      <div style={cellStyle("60px")}>
        <a
          href="#"
          onClick={() => getVRdetailBtnClick(trip.lock, index, trip.tmsValidated)}
        >
          <InfoIcon color="primary" />
        </a>
      </div>
      <div style={cellStyle("100px")}>{trip.vehicleObject.name}</div>
      <div style={cellStyle("100px")}>{trip.driverName}</div>
      <div style={cellStyle("100px")}>
        {trip.allocatedRouteCodes?.split(",")[0]}
      </div>

      <div style={{ ...cellStyle("220px"), display: "flex", gap: "10px" }}>
        <span onClick={() => onOptimiseConfirm(trip, index, trip.optistatus, trip.lock)}>
          <RouteIcon
            color={isOptimized ? "primary" : "disabled"}
            style={{ fontSize: 26 }}
          />
        </span>
        <span onClick={() => onConfirmClick(trip, index, trip.optistatus, trip.lock)}>
          {trip.lock ? (
            <LockIcon color="primary" style={{ fontSize: 26 }} />
          ) : (
            <LockOpenIcon color="disabled" style={{ fontSize: 26 }} />
          )}
        </span>
        <span>
          {trip.tmsValidated && trip.lock && !trip.lvsValidated ? (
            <ListAltIcon
              color="action"
              onClick={() => onDisputeValidateTrip(index)}
              style={{ fontSize: 26 }}
            />
          ) : !trip.tmsValidated && trip.lock ? (
            <ListAltIcon
              color="primary"
              onClick={() => CheckValiationStatus(index)}
              style={{ fontSize: 26 }}
            />
          ) : trip.tmsValidated && trip.lock && trip.lvsValidated ? (
            <PlaylistAddCheckCircleIcon color="primary" style={{ fontSize: 26 }} />
          ) : (
            <ListAltIcon color="disabled" style={{ fontSize: 26 }} />
          )}
        </span>
        {getTripStatusIcon()}
        {trip.lock && (
          <Tooltip
            title={
              <table>
                <tbody>
                  {(trip.docDetails || []).map((doc, i) => (
                    <tr key={i}>
                      <td>{doc.documentNo}</td>
                      <td>{doc.documentStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          >
            <PlagiarismIcon color="primary" style={{ fontSize: 26 }} />
          </Tooltip>
        )}
      </div>

      <div style={cellStyle("100px")}>{getStatusBadge()}</div>
      <div style={cellStyle("100px")}>{trip.itemCode}</div>
      <div style={cellStyle("80px")}>
        {trip.totalWeight} {trip.vehicleObject.xweu}
      </div>
      <div style={cellStyle("80px")}>{trip.weightPercentage}</div>
      <div style={cellStyle("60px")}>
        {casesCount(trip.dropObject, trip.pickupObject)}
      </div>
      <div style={cellStyle("80px")}>{trip.totalVolume}</div>
      <div style={cellStyle("80px")}>{trip.volumePercentage}</div>
      <div style={cellStyle("50px")}>{trip.drops}</div>
      <div style={cellStyle("50px")}>{trip.pickups}</div>
      <div style={cellStyle("50px")}>{trip.stops}</div>
      <div style={cellStyle("50px")}>
        <a href="#" onClick={() => onTriplogClick(trip.totalObject)}>
          <i className="fa fa-info-circle" />
        </a>
      </div>
      <div style={cellStyle("100px")}>{trip.depSite}</div>
      <div style={cellStyle("100px")}>{trip.arrSite}</div>
      <div style={cellStyle("70px")}>{trip.startTime}</div>
      <div style={cellStyle("70px")}>{isOptimized ? trip.endTime : ""}</div>
      <div style={cellStyle("40px")}>{trip.trips}</div>
      <div style={cellStyle("50px")}>
        {trip.alertFlg === 1 && (
          <span
            onClick={() =>
              onWaringAlertClick(trip.itemCode, index, trip.warningNotes)
            }
          >
            <WarningIcon color="warning" style={{ fontSize: 26 }} />
          </span>
        )}
      </div>
    </div>
  );
};

export default React.memo(TripRow);
