
import React, { memo, useMemo, useCallback, useState } from 'react';
import { TabPane } from "reactstrap";
import { withNamespaces } from "react-i18next";
import VirtualizedDropsTable from '../components/VirtualizedDropsTable';
import DisplayProducts from "./DisplayProducts";
import DisplayInformationIconDetails2 from "./DisplayInformationIconDetails2";

// Main optimized component - converted to functional component
const Drops3_galgorm_optimized = memo(({
  dropsList = [],
  handleDragStart,
  updateDocsGeoLocations,
  currDate,
  sortDrop,
  dropOrder,
  updateDropSearchTerm,
  dayschecked,
  trailerDropped,
  droppedTrailers,
  routeCodes,
  currDropsPanel,
  pickersList,
  fetchDocumentPanelDateChange,
  documentPanel_date,
  selectedDocs,
  t
}) => {
  // Component state
  const [addProductShow, setAddProductShow] = useState(false);
  const [addInfoShow, setAddInfoShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [docNumber, setDocNumber] = useState("");
  const [skills, setSkills] = useState("");
  const [doctype, setDoctype] = useState("");
  const [logisticDetails, setLogisticDetails] = useState({});

  // Get language from localStorage
  const lang = useMemo(() => localStorage.getItem("i18nextLng") || 'eng', []);

  // Filter drops for INTERNAL carrier and memoize the result
  const filteredDrops = useMemo(() => {
    if (!dropsList) return [];
    return dropsList.filter((doc) => doc.carrier === "INTERNAL");
  }, [dropsList]);

  // Memoized event handlers
  const handleDocClick = useCallback((productsList, docNum, docType, skillsList) => {
    setProducts(productsList);
    setDocNumber(docNum);
    setSkills(skillsList);
    setDoctype(docType);
    setAddProductShow(true);
  }, []);

  const handleInfoClick = useCallback((logisticData, docNum) => {
    setLogisticDetails(logisticData);
    setDocNumber(docNum);
    setAddInfoShow(true);
  }, []);

  const handleProductsClose = useCallback(() => {
    setAddProductShow(false);
  }, []);

  const handleInfoClose = useCallback(() => {
    setAddInfoShow(false);
  }, []);

  // Memoize summary statistics
  const summaryStats = useMemo(() => {
    if (!filteredDrops.length) return { totalCount: 0, totalWeight: 0, totalLines: 0 };
    
    return filteredDrops.reduce((acc, drop) => ({
      totalCount: acc.totalCount + 1,
      totalWeight: acc.totalWeight + (drop.netweight || 0),
      totalLines: acc.totalLines + (drop.products?.length || 0)
    }), { totalCount: 0, totalWeight: 0, totalLines: 0 });
  }, [filteredDrops]);

  if (!filteredDrops.length) {
    return (
      <TabPane tabId="Documents">
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          color: '#666',
          fontSize: '16px' 
        }}>
          No internal documents available
        </div>
      </TabPane>
    );
  }

  return (
    <TabPane
      className="tripstab"
      tabId="Documents"
      style={{ height: "550px", overflowX: "auto", overflowY: "auto" }}
    >
      {/* Summary Header */}
      <div style={{ 
        padding: '10px', 
        backgroundColor: '#f8f9fa', 
        border: '1px solid #dee2e6',
        marginBottom: '10px',
        borderRadius: '4px'
      }}>
        <strong>Summary: </strong>
        {summaryStats.totalCount} documents | 
        Weight: {summaryStats.totalWeight.toFixed(2)}kg | 
        Lines: {summaryStats.totalLines}
      </div>

      {/* Virtualized Table */}
     <VirtualizedDropsTable
        drops={filteredDrops}
        itemHeight={60}
        containerHeight={520}
        onDragStart={handleDragStart}
        onDocClick={handleDocClick}
        onInfoClick={handleInfoClick}
        updateDocsGeoLocations={updateDocsGeoLocations}
        sortDrop={sortDrop}
        dropOrder={dropOrder}
        selectedDocs={selectedDocs}
        t={t}
        lang={lang}
      />

      {/* Product Display Modal */}
      <DisplayProducts
        routeCodes={routeCodes}
        currDropsPanel={currDropsPanel}
        pickersList={pickersList}
        show={addProductShow}
        onHide={handleProductsClose}
        products={products}
        docNum={docNumber}
        skills={skills}
        doctype={doctype}
        fetchDocumentPanelDateChange={fetchDocumentPanelDateChange}
        documentPanel_date={documentPanel_date}
        viewMode="documentpanel"
        selectedDocs={selectedDocs}
      />

      {/* Information Display Modal */}
      <DisplayInformationIconDetails2
        show={addInfoShow}
        onInfoIconHide={handleInfoClose}
        data={logisticDetails}
        dataType="object"
        docNum={docNumber}
      />
    </TabPane>
  );
});

Drops3_galgorm_optimized.displayName = 'Drops3_galgorm_optimized';

export default withNamespaces()(Drops3_galgorm_optimized);
