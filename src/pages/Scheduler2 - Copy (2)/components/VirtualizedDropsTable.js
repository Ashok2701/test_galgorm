
import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';
import OptimizedDropRow from './OptimizedDropRow';

// Virtual scrolling component for large tables
const VirtualizedDropsTable = memo(({ 
  drops, 
  itemHeight = 60, 
  containerHeight = 400,
  onDragStart,
  onDocClick,
  onInfoClick,
  updateDocsGeoLocations,
  sortDrop,
  dropOrder,
  t,
  lang,
  selectedDocs = [] // Add selectedDocs as prop to sync with parent
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  // Define consistent column widths with increased sizes - MOVED TO TOP
  const columnWidths = useMemo(() => ({
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
  
  // Get selected indices based on selectedDocs from parent
  const selectedDrops = useMemo(() => {
    if (!selectedDocs || !drops) return new Set();
    
    const selectedSet = new Set();
    drops.forEach((drop, index) => {
      // Check if this drop is in selectedDocs array
      const isSelected = selectedDocs.some(selectedDoc => 
        selectedDoc.docnum === drop.docnum && 
        selectedDoc.itemcode === drop.itemcode
      );
      if (isSelected) {
        selectedSet.add(index);
      }
    });
    
    return selectedSet;
  }, [selectedDocs, drops]);
  
  const visibleItems = useMemo(() => {
    if (!drops || drops.length === 0) {
      return { startIndex: 0, endIndex: 0, items: [] };
    }

    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 5, // Buffer items
      drops.length
    );
    
    return {
      startIndex,
      endIndex,
      items: drops.slice(startIndex, endIndex)
    };
  }, [drops, scrollTop, itemHeight, containerHeight]);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  // Create a wrapper for updateDocsGeoLocations that handles virtual checkbox state
  const wrappedUpdateDocsGeoLocations = useCallback((dropIndex, drop, isChecked) => {
    if (updateDocsGeoLocations) {
      console.log('Wrapping updateDocsGeoLocations call for:', drop.docnum, 'checked:', isChecked);
      
      // Get all existing checkboxes
      const existingCheckboxes = document.getElementsByName("docsCheckBox");
      const tempCheckboxes = [];
      
      // Create enough temporary checkboxes to ensure the index exists
      for (let i = 0; i <= dropIndex; i++) {
        if (!existingCheckboxes[i]) {
          const tempCheckbox = document.createElement('input');
          tempCheckbox.type = 'checkbox';
          tempCheckbox.name = 'docsCheckBox';
          tempCheckbox.checked = (i === dropIndex) ? isChecked : false;
          tempCheckbox.style.display = 'none';
          tempCheckbox.setAttribute('data-temp-index', i);
          document.body.appendChild(tempCheckbox);
          tempCheckboxes.push(tempCheckbox);
        }
      }
      
      // If the checkbox at the specific index exists, update its checked state
      const targetCheckbox = document.getElementsByName("docsCheckBox")[dropIndex];
      if (targetCheckbox) {
        const originalChecked = targetCheckbox.checked;
        targetCheckbox.checked = isChecked;
        
        try {
          // Call the original function
          updateDocsGeoLocations(dropIndex, drop, isChecked);
        } finally {
          // Restore original state if it wasn't a temp checkbox
          if (!targetCheckbox.hasAttribute('data-temp-index')) {
            targetCheckbox.checked = originalChecked;
          }
        }
      }
      
      // Clean up temporary checkboxes
      tempCheckboxes.forEach(checkbox => {
        document.body.removeChild(checkbox);
      });
    }
  }, [updateDocsGeoLocations]);

  // Handle individual checkbox selection
  const handleCheckboxChange = useCallback((dropIndex, drop, isChecked) => {
    console.log('handleCheckboxChange called:', { dropIndex, docnum: drop.docnum, isChecked });
    
    // Call the wrapped updateDocsGeoLocations function - this will update the parent's selectedDocs
    wrappedUpdateDocsGeoLocations(dropIndex, drop, isChecked);
  }, [wrappedUpdateDocsGeoLocations]);

  // Handle select all checkbox
  const handleSelectAll = useCallback((isChecked) => {
    console.log('handleSelectAll called:', isChecked);
    
    if (isChecked) {
      // Call updateDocsGeoLocations for all drops
      drops.forEach((drop, index) => {
        wrappedUpdateDocsGeoLocations(index, drop, true);
      });
    } else {
      // Call updateDocsGeoLocations to uncheck all drops
      drops.forEach((drop, index) => {
        wrappedUpdateDocsGeoLocations(index, drop, false);
      });
    }
  }, [drops, wrappedUpdateDocsGeoLocations]);

  // Handle bulk drag start for selected items
  const handleBulkDragStart = useCallback((event) => {
    if (selectedDrops.size > 0 && onDragStart) {
      const selectedDropsData = Array.from(selectedDrops).map(index => drops[index]);
      // Pass all selected drops to the drag handler
      onDragStart(event, selectedDropsData, "drops", Array.from(selectedDrops));
    }
  }, [selectedDrops, drops, onDragStart]);

  const totalHeight = (drops?.length || 0) * itemHeight;
  const offsetY = visibleItems.startIndex * itemHeight;

  const renderSortHeader = useCallback((field, index, label, width) => (
    <th 
      onClick={() => sortDrop && sortDrop(field, index)} 
      style={{ 
        cursor: 'pointer',
        width: width,
        minWidth: width,
        maxWidth: width,
        height: '50px',
        padding: '8px 4px',
        verticalAlign: 'middle',
        borderBottom: '2px solid #dee2e6',
        fontSize: '12px',
        fontWeight: 'bold',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      {label} {dropOrder && dropOrder[index] === 1 ? "▼" : "▲"}
    </th>
  ), [sortDrop, dropOrder]);

  const renderStaticHeader = useCallback((label, width) => (
    <th 
      style={{ 
        width: width,
        minWidth: width,
        maxWidth: width,
        height: '50px', 
        padding: '8px 4px', 
        verticalAlign: 'middle', 
        borderBottom: '2px solid #dee2e6',
        fontSize: '12px',
        fontWeight: 'bold',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      {label}
    </th>
  ), []);

  if (!drops || drops.length === 0) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: '#666',
        fontSize: '16px' 
      }}>
        No documents available
      </div>
    );
  }

  const isAllSelected = selectedDrops.size === drops.length && drops.length > 0;
  const isPartiallySelected = selectedDrops.size > 0 && selectedDrops.size < drops.length;

  return (
    <div className="reportlist-view tableCustomFixHead">
      {/* Bulk Actions Bar */}
      {selectedDrops.size > 0 && (
        <div style={{
          padding: '10px',
          backgroundColor: '#e3f2fd',
          border: '1px solid #bbdefb',
          marginBottom: '10px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontWeight: 'bold' }}>
            {selectedDrops.size} document(s) selected
          </span>
          <div
            draggable={true}
            onDragStart={handleBulkDragStart}
            style={{
              padding: '5px 10px',
              backgroundColor: '#1976d2',
              color: 'white',
              borderRadius: '4px',
              cursor: 'grab',
              fontSize: '12px'
            }}
          >
            Drag Selected Documents
          </div>
        </div>
      )}

      <div 
        style={{ 
          height: containerHeight, 
          overflowY: 'auto',
          overflowX: 'auto',
          border: '1px solid #dee2e6'
        }}
        onScroll={handleScroll}
      >
        <table
          className="table table-sm"
          style={{ 
            width: 'max-content',
            minWidth: '100%',
            tableLayout: 'fixed',
            borderCollapse: 'separate',
            borderSpacing: 0
          }}
        >
          <thead
            className="custom-sort"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "white",
            }}
          >
            <tr style={{ height: '50px' }}>
              <th style={{ 
                width: columnWidths.checkbox,
                minWidth: columnWidths.checkbox,
                maxWidth: columnWidths.checkbox,
                height: '50px', 
                padding: '8px 4px', 
                verticalAlign: 'middle', 
                borderBottom: '2px solid #dee2e6',
                fontSize: '12px',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={input => {
                    if (input) input.indeterminate = isPartiallySelected;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  style={{ width: '15px', height: '15px' }}
                />
              </th>
              {renderStaticHeader("", columnWidths.icon)}
              {renderSortHeader("bpcode", 1, "Client Code", columnWidths.clientCode)}
              {renderSortHeader("bpname", 2, t("Client"), columnWidths.client)}
              {renderSortHeader("routecode", 12, t("Route Code"), columnWidths.routeCode)}
              {renderSortHeader("docnum", 0, t("Transaction No"), columnWidths.transactionNo)}
              {renderStaticHeader("Picker", columnWidths.picker)}
              {renderSortHeader("docdate", 11, t("Date"), columnWidths.date)}
              {renderSortHeader("Priority", 13, t("Priority"), columnWidths.priority)}
              {renderSortHeader("type", 8, t("Status"), columnWidths.status)}
              {renderSortHeader("weight", 14, "Weight", columnWidths.weight)}
              {renderSortHeader("lines", 17, "No. of Lines", columnWidths.lines)}
              {renderSortHeader("quantity", 16, "Cases", columnWidths.cases)}
              {renderSortHeader("carrier", 15, t("Carrier"), columnWidths.carrier)}
              {renderSortHeader("doctype", 3, t("Type"), columnWidths.type)}
              {renderSortHeader("poscode", 4, t("City"), columnWidths.city)}
              {renderSortHeader("site", 9, t("Site"), columnWidths.site)}
              {renderStaticHeader("Preparation List", columnWidths.prepList)}
              {renderSortHeader("vehicleCode", 7, t("Vehicle"), columnWidths.vehicle)}
              {renderStaticHeader(t("Driver"), columnWidths.driver)}
              {renderStaticHeader(t("tripno"), columnWidths.tripNo)}
              {renderStaticHeader(t("Add Code"), columnWidths.addCode)}
              {renderStaticHeader(t("Add Desc"), columnWidths.addDesc)}
              {renderStaticHeader("Info", columnWidths.info)}
              {renderStaticHeader(t("ServiceTime"), columnWidths.serviceTime)}
            </tr>
          </thead>
          <tbody>
            {/* Spacer for items before visible range */}
            {offsetY > 0 && (
              <tr style={{ height: offsetY }}>
                <td colSpan="24" style={{ padding: 0, border: 'none' }}></td>
              </tr>
            )}
            
            {/* Visible items */}
            {visibleItems.items.map((drop, index) => (
              <OptimizedDropRow
                key={`${drop.docnum}-${drop.itemcode}-${visibleItems.startIndex + index}`}
                drop={drop}
                index={visibleItems.startIndex + index}
                isSelected={selectedDrops.has(visibleItems.startIndex + index)}
                onDragStart={onDragStart}
                onDocClick={onDocClick}
                onInfoClick={onInfoClick}
                onCheckboxChange={handleCheckboxChange}
                t={t}
                lang={lang}
                itemHeight={itemHeight}
                columnWidths={columnWidths}
              />
            ))}
            
            {/* Spacer for items after visible range */}
            {totalHeight - offsetY - (visibleItems.items.length * itemHeight) > 0 && (
              <tr style={{ height: totalHeight - offsetY - (visibleItems.items.length * itemHeight) }}>
                <td colSpan="24" style={{ padding: 0, border: 'none' }}></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

VirtualizedDropsTable.displayName = 'VirtualizedDropsTable';

export default VirtualizedDropsTable;
