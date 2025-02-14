import React, { useState, useEffect } from 'react';
import { Table, Pagination, PaginationItem, PaginationLink, Input } from 'reactstrap';
import moment from 'moment';

const DataDetails = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
 const [selectedRows, setSelectedRows] = useState([]);

  console.log("data at table =", props.OpendocsList)

  let totalPages =  props.OpendocsList && Math.ceil(props.OpendocsList.length / 10);
  let startIndex = props.OpendocsList && (currentPage - 1) * 10;
  let endIndex = props.OpendocsList && startIndex + 10;
  let currentItems = props.OpendocsList &&  props.OpendocsList.slice(startIndex, endIndex);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };



  useEffect(() => {
      setCurrentPage(1);
    }, [props]);


  const  getStatus = ( docStatus) => {
          if(docStatus == "Open") {
               return <span class='badge badge-primary text-uppercase' style={{ fontSize: 14  }}>OPEN</span>;
          }
         else if(docStatus == "Optimized")  {
                        return <span class='badge badge-secondary text-uppercase' style={{ fontSize: 14  }} >OPTIMIZED</span>;

              }

          else if(docStatus == "Locked") {
               return <span class='badge badge-info text-uppercase' style={{ fontSize: 14  }} >LOCKED</span>;
          }
           else if(docStatus == "LVS Confirmed") {
                       return <span class='badge badge-dark text-uppercase' style={{ fontSize: 14  }} >LVS Confirmed</span>;
                  }
           else {
                 return <span class='badge badge-dark text-uppercase' style={{ fontSize: 14  }}>Open</span>;
           }

      }


  const  getDocStatus = ( docStatus) => {
          if(docStatus == "1") {
               return <span class='badge badge-success ' style={{ fontSize: 14  }}>Scheduled</span>;
          }
         else if(docStatus == "0")  {
                        return <span class='badge badge-secondary text-uppercase' style={{ fontSize: 14  }} >OPEN</span>;

              }

          else if(docStatus == "8") {
               return <span class='badge badge-info text-uppercase' style={{ fontSize: 14  }} >OPEN</span>;
          }
           else if(docStatus == "2") {
                       return <span class='badge badge-dark text-uppercase' style={{ fontSize: 14  }} >CANCELLED</span>;
                  }
           else {
                 return <span class='badge badge-dark text-uppercase' style={{ fontSize: 14  }}>To Plan</span>;
           }

      }




    const handleCheckboxChange = (item) => {
    /*
      const isSelected = this.props.selectedOpenDocs.includes(item.docnum);
        console.log(" selected item  - ", item )
         console.log("selected item doc  - ", item.docnum)
      if (isSelected) {
        setSelectedRows(selectedRows.filter((rowId) => rowId !== item.docnum));
      } else {
        setSelectedRows([...selectedRows, item.docnum]);
      }
*/

      props.DocumentSelectionProcess(item)

       console.log("selected rows are  - ", selectedRows)
    };


      const handleSelectAll = () => {
       /*
        const allSelected = currentItems.every((item) => selectedRows.includes(item));

        if (allSelected) {
          // If all are selected, unselect all
          setSelectedRows([]);
            console.log(" un select All - " )
        } else {
          // If not all are selected, select all
          const allIds = currentItems.map((item) => item.id);
          setSelectedRows(allIds);
          console.log("All Ids are selected  - ",allIds )
        }
        */
        props.handleSelectAll();
      };

  return (
    <div style={{ width : "100%"}}>
    <div style={{ width : "100%",dispaly : "flex"}}>
      <Table>
        <thead>
          <tr>
            <th style={{ background: '#3498db', color: 'white' }}>#</th>
            <th style={{ background: '#3498db', color: 'white', writingMode : 'vertical-rl' }}>
                          <Input
                            type="checkbox"
                            checked={currentItems && currentItems.length > 0 && currentItems.every((item) => props.selectedOpenDocs.includes(item.docnum))}
                            onChange={handleSelectAll}
                          />
                        </th>

            <th style={{ background: '#3498db', color: 'white' }}>Pick Ticket</th>
            <th style={{ background: '#3498db', color: 'white' }}>Date</th>
            <th style={{ background: '#3498db', color: 'white' }}>Route Number</th>
            <th style={{ background: '#3498db', color: 'white' }}>Route Status</th>
            <th style={{ background: '#3498db', color: 'white' }}>PickTikcet Status</th>
            <th style={{ background: '#3498db', color: 'white' }}>Vehicle</th>
            <th style={{ background: '#3498db', color: 'white' }}>Driver</th>
            <th style={{ background: '#3498db', color: 'white' }}>Customer Code</th>
            <th style={{ background: '#3498db', color: 'white' }}>Customer</th>
            <th style={{ background: '#3498db', color: 'white' }}>Address</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.length > 0 && currentItems.map((item, index) => (
            <tr key={index}>
              <th scope="row">{startIndex + index + 1}</th>
              <td>
                              <Input
                                type="checkbox"
                                checked={props.selectedOpenDocs.includes(item.docnum)}
                                onChange={() => handleCheckboxChange(item)}
                              />
                            </td>
              <td>{item.docnum}</td>
              <td>{moment.tz(item.docdate, '').format('MM-DD-YYYY')}</td>
              <td>{item.vrcode}</td>
              <td>{getStatus(item.routeStatus)}</td>
              <td>{getDocStatus(item.dlvystatus)}</td>
              <td>{item.vehicleCode}</td>
              <td>{item.drivercode}</td>
              <td>{item.bpcode}</td>
              <td>{item.bpname}</td>
              <td>{item.adresname}</td>
              {/* Add more table data as needed */}
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      <div style={{ display : "flex", justifyContent : "flex-end"}}>
      <Pagination aria-label="Page navigation example">
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink previous onClick={() => handlePageClick(currentPage - 1)} />
        </PaginationItem>
        {[...Array(totalPages).keys()].map((page) => (
          <PaginationItem key={page} active={page + 1 === currentPage}>
            <PaginationLink onClick={() => handlePageClick(page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink next onClick={() => handlePageClick(currentPage + 1)} />
        </PaginationItem>
      </Pagination>
      </div>
    </div>
  );
};

export default DataDetails;
