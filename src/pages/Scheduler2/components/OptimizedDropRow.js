
import React, { memo, useMemo, useCallback } from 'react';
import moment from 'moment';
import 'moment-timezone';
import { getDropStatus, getPriorityStyle, getRowBackgroundColor, extractBackgroundColor } from '../utils/dropStatusUtils';
import { formatTime, convertHrToSec, nullAndNanChecking } from '../converterFunctions/converterFunctions';

const x3Url = process.env.REACT_APP_X3_URL;

// Optimized individual drop row component
const OptimizedDropRow = memo(({ 
  drop, 
  index, 
  isSelected = false,
  onDragStart,
  onDocClick,
  onInfoClick,
  onCheckboxChange,
  t,
  lang = 'eng',
  itemHeight = 60,
  columnWidths
}) => {
  // Default column widths as fallback with increased sizes
  const defaultColumnWidths = useMemo(() => ({
    checkbox: '60px',
    icon: '80px',
    clientCode: '140px',
    client: '200px',
    routeCode: '160px',
    transactionNo: '160px',
    picker: '140px',
    date: '140px',
    priority: '120px',
    status: '140px',
    weight: '120px',
    lines: '100px',
    cases: '100px',
    carrier: '140px',
    type: '120px',
    city: '160px',
    site: '120px',
    prepList: '140px',
    vehicle: '140px',
    driver: '140px',
    tripNo: '100px',
    addCode: '120px',
    addDesc: '140px',
    info: '80px',
    serviceTime: '120px'
  }), []);

  // Use provided columnWidths or fallback to default
  const widths = columnWidths || defaultColumnWidths;

  // Create cell style generator
  const getCellStyle = useCallback((width, align = 'left') => ({
    width: width,
    minWidth: width,
    maxWidth: width,
    height: `${itemHeight}px`,
    maxHeight: `${itemHeight}px`,
    minHeight: `${itemHeight}px`,
    verticalAlign: 'middle',
    padding: '4px',
    borderBottom: '1px solid #dee2e6',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: align,
    fontSize: '12px'
  }), [itemHeight]);

  // Memoize calculations that don't change often
  const rowData = useMemo(() => {
    const docDate = moment.tz(drop.docdate, "").format("DD-MM-YYYY");
    const status = getDropStatus(drop, t);
    const priority = getPriorityStyle(drop.priorityOrder);
    const backgroundColor = getRowBackgroundColor(drop);
    const isDraggable = drop.type === "open" && (drop.dlvystatus === "0" || drop.dlvystatus === "8");
    
    // Calculate total quantity from products
    const totalQuantity = drop.products?.reduce(
      (total, product) => total + Number(product.quantity || 0),
      0
    ) || 0;

    // Prepare logistic details
    const logisticDetails = {
      loadBay: drop.loadBay,
      tailGate: drop.tailGate,
      waitingTime: drop.waitingTime && formatTime(drop.waitingTime),
      stackHeight: drop.stackHeight && nullAndNanChecking(drop.stackHeight),
      timings: drop.timings && nullAndNanChecking(drop.timings),
      packing: drop.packing,
      height: drop.height,
      loadingOrder: drop.loadingOrder,
      allDrivers: drop.allDrivers,
      driverList: drop.driverList,
      allVehClass: drop.allVehClass,
      vehClassList: drop.vehClassList,
      fromTime: drop.fromTime && drop.fromTime.length > 1 ? drop.fromTime.split(" ") : drop.fromTime,
      toTime: drop.toTime && drop.toTime.length > 1 ? drop.toTime.split(" ") : drop.toTime,
      availDays: drop.availDays
    };

    return {
      docDate,
      status,
      priority,
      backgroundColor,
      isDraggable,
      totalQuantity,
      logisticDetails
    };
  }, [drop, t]);

  // Memoized event handlers
  const handleDragStart = useCallback((event) => {
    if (onDragStart && rowData.isDraggable) {
      onDragStart(event, drop, "drops", index);
    }
  }, [onDragStart, drop, index, rowData.isDraggable]);

  const handleDocClick = useCallback(() => {
    if (onDocClick) {
      onDocClick(drop.products, drop.docnum, drop.doctype, drop.skills);
    }
  }, [onDocClick, drop.products, drop.docnum, drop.doctype, drop.skills]);

  const handleInfoClick = useCallback(() => {
    if (onInfoClick) {
      onInfoClick(rowData.logisticDetails, drop.docnum);
    }
  }, [onInfoClick, rowData.logisticDetails, drop.docnum]);

  const handleCheckboxClick = useCallback((e) => {
    if (onCheckboxChange) {
      onCheckboxChange(index, drop, e.target.checked);
    }
  }, [onCheckboxChange, index, drop]);

  // Render route tag with color
  const renderRouteTag = useCallback(() => {
    let defaultProp = ";font-style:normal;background-color:#92a8d1";
    if (!drop.routeColor) drop.routeColor = defaultProp;

    const bgColor = extractBackgroundColor(drop.routeColor);
    const routeText = lang === "fr" ? drop.routeTagFRA : drop.routeTag;

    return (
      <span
        className="badge text-uppercase"
        style={{ backgroundColor: bgColor, fontSize: "10px" }}
      >
        {routeText}
      </span>
    );
  }, [drop.routeColor, drop.routeTag, drop.routeTagFRA, lang]);

  // Render customer navigation link
  const renderCustomerLink = useCallback(() => {
    const isDraggableLink = rowData.isDraggable;

    if (drop.routeTag !== "INTER-PICK") {
      const url = `${x3Url}/$sessions?f=GESBPC/2//M/` + drop.bpcode;
      return (
        <a draggable={isDraggableLink} href={url} target="_blank" rel="noopener noreferrer">
          {drop.bpcode}
        </a>
      );
    } else {
      return (
        <a draggable={isDraggableLink} href="#" onClick={(e) => e.preventDefault()}>
          {drop.bpcode}
        </a>
      );
    }
  }, [drop.routeTag, drop.bpcode, rowData.isDraggable]);

  // Skip rendering if document is dragged
  if (drop.optistatus && drop.optistatus === "dragged") {
    return null;
  }

  return (
    <tr
      id={`drops${index}`}
      className={rowData.isDraggable ? "custom-enable" : "custom-disable"}
      draggable={rowData.isDraggable}
      style={{
        backgroundColor: isSelected ? '#e3f2fd' : rowData.backgroundColor,
        height: `${itemHeight}px`,
        maxHeight: `${itemHeight}px`,
        minHeight: `${itemHeight}px`,
      }}
      onDragStart={handleDragStart}
    >
      <td style={getCellStyle(widths.checkbox, 'center')}>
        <input
          type="checkbox"
          name="docsCheckBox"
          checked={isSelected}
          onChange={handleCheckboxClick}
          style={{
            width: '15px',
            height: '15px',
          }}
        />
      </td>
      <td style={getCellStyle(widths.icon, 'center')}>
        {drop.movtype === "DROP" ? (
          <img
            draggable={rowData.isDraggable}
            src="assets/img/drops.png"
            alt="drops"
            className="rounded-circle"
            width="25"
            height="25"
          />
        ) : drop.movtype === "PICK" ? (
          <img
            draggable={rowData.isDraggable}
            src="assets/img/pickup.png"
            alt="drops"
            className="rounded-circle"
            width="25"
            height="25"
          />
        ) : (
          <i
            draggable={rowData.isDraggable}
            className="fa fa-calendar"
            aria-hidden="true"
          />
        )}
      </td>
      <td style={getCellStyle(widths.clientCode)}>{renderCustomerLink()}</td>
      <td style={{...getCellStyle(widths.client), fontWeight: "bold"}}>
        <a
          href="#"
          style={{
            cursor: rowData.isDraggable ? "pointer" : "default",
            textDecoration: 'none'
          }}
          onClick={(e) => {
            e.preventDefault();
            handleInfoClick();
          }}
          draggable={rowData.isDraggable}
        >
          {drop.bpname}
        </a>
      </td>
      <td style={getCellStyle(widths.routeCode, 'center')}>
        {drop.routeCodeDesc && (
          <span
            className="badge text-uppercase"
            style={{ 
              backgroundColor: extractBackgroundColor(drop.routeColor), 
              fontSize: "10px" 
            }}
          >
            {drop.routeCodeDesc}
          </span>
        )}
      </td>
      <td style={getCellStyle(widths.transactionNo)}>
        <span 
          onClick={handleDocClick}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {drop.docnum}
        </span>
      </td>
      <td style={getCellStyle(widths.picker)}>{drop.picker}</td>
      <td style={getCellStyle(widths.date)}>{rowData.docDate}</td>
      <td style={getCellStyle(widths.priority, 'center')}>
        <span
          className={`badge text-uppercase ${rowData.priority.className}`}
          style={{ fontSize: "10px" }}
        >
          {rowData.priority.label}
        </span>
      </td>
      <td style={getCellStyle(widths.status, 'center')}>
        <span
          className={`badge text-uppercase ${rowData.status.className}`}
          style={{ fontSize: "10px" }}
        >
          {rowData.status.label}
          {rowData.status.isRescheduled && (
            <span className="badge badge-danger text-smallcase">
              (Rescheduled)
            </span>
          )}
        </span>
      </td>
      <td style={getCellStyle(widths.weight, 'right')}>
        {drop.netweight == 0 ? "" : `${drop.netweight} ${drop.weightunit || ''}`}
      </td>
      <td style={getCellStyle(widths.lines, 'center')}>{drop.products?.length || 0}</td>
      <td style={getCellStyle(widths.cases, 'center')}>{rowData.totalQuantity}</td>
      <td style={getCellStyle(widths.carrier, 'center')}>
        {drop.carrier && (
          <span
            className="badge text-uppercase"
            style={{ 
              backgroundColor: extractBackgroundColor(drop.carrierColor), 
              fontSize: "10px" 
            }}
          >
            {drop.carrier}
          </span>
        )}
      </td>
      <td style={getCellStyle(widths.type, 'center')}>{renderRouteTag()}</td>
      <td style={getCellStyle(widths.city)}>
        {drop.poscode}, {drop.city}
      </td>
      <td style={{...getCellStyle(widths.site), fontWeight: "bold"}}>
        {drop.site}
      </td>
      <td style={getCellStyle(widths.prepList)}>{drop.prelistCode}</td>
      <td style={getCellStyle(widths.vehicle)}>{drop.vehicleCode}</td>
      <td style={getCellStyle(widths.driver)}>{drop.drivercode}</td>
      <td style={getCellStyle(widths.tripNo, 'center')}>{drop.tripno === "0" ? "" : drop.tripno}</td>
      <td style={getCellStyle(widths.addCode)}>{drop.adrescode}</td>
      <td style={getCellStyle(widths.addDesc)}>{drop.adresname}</td>
      <td style={getCellStyle(widths.info, 'center')}>
        <a
          draggable={rowData.isDraggable}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleInfoClick();
          }}
        >
          <i className="fa fa-info-circle" aria-hidden="true" />
        </a>
      </td>
      <td style={getCellStyle(widths.serviceTime, 'center')}>{formatTime(convertHrToSec(drop.serviceTime))}</td>
    </tr>
  );
});

OptimizedDropRow.displayName = 'OptimizedDropRow';

export default OptimizedDropRow;
