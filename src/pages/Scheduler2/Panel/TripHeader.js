import React from "react";

const cellStyle = (width) => ({
  width,
  padding: "8px",
  fontSize: "14px",
  fontWeight: "bold",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  borderBottom: "2px solid #ccc",
});

const TripHeader = () => (
  <div style={{ display: "flex", background: "#f6f8fa", position: "sticky", top: 0, zIndex: 2 }}>
    <div style={cellStyle("40px")}>
      <input type="checkbox" />
    </div>
    <div style={cellStyle("40px")} />
    <div style={cellStyle("100px")}>VR Date</div>
    <div style={cellStyle("60px")}>VR Details</div>
    <div style={cellStyle("100px")}>Vehicle</div>
    <div style={cellStyle("100px")}>Driver</div>
    <div style={cellStyle("100px")}>Route Code</div>
    <div style={cellStyle("220px")}>Actions</div>
    <div style={cellStyle("100px")}>Status</div>
    <div style={cellStyle("100px")}>Route Number</div>
    <div style={cellStyle("80px")}>Tot Weight</div>
    <div style={cellStyle("80px")}>% Weight</div>
    <div style={cellStyle("60px")}>Cases</div>
    <div style={cellStyle("80px")}>Tot Volume</div>
    <div style={cellStyle("80px")}>% Volume</div>
    <div style={cellStyle("50px")}>Drops</div>
    <div style={cellStyle("50px")}>Pickups</div>
    <div style={cellStyle("50px")}>Stops</div>
    <div style={cellStyle("50px")}>Log</div>
    <div style={cellStyle("100px")}>Departure Site</div>
    <div style={cellStyle("100px")}>Arrival Site</div>
    <div style={cellStyle("70px")}>Departure</div>
    <div style={cellStyle("70px")}>Arrival</div>
    <div style={cellStyle("40px")}>#</div>
    <div style={cellStyle("50px")}>Alert</div>
  </div>
);

export default TripHeader;
