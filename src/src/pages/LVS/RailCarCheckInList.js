// ** React Imports
import { useEffect, useRef, useState } from 'react'

import moment from 'moment'

import Select from 'react-select'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import "flatpickr/dist/themes/material_green.css"
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Card, Input, Badge, CardHeader, CardTitle, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Button, FormGroup } from 'reactstrap'

import { Link } from 'react-router-dom'

const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <Table bordered className="child-table">
        <thead>
          <tr>
            {/* <th>Line Number</th> */}
            <th>Product Code</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Weight</th>
            <th>Volume</th>
            {/* <th>Vehicle</th>
            <th>Driver</th>
            <th>Delivery Method</th>
            <th>VR</th>
            <th>LVS</th> */}
          </tr>
        </thead>
        <tbody>
          { data.SORDERQ.map((item, index) => {
            return (
              <tr key={index}>
                {/* <td>{item.SDDLIN_0}</td> */}
                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                <td>{item.ITMDES_0}</td>
                <td>{item.QTYSTU_0} {item.STU_0}</td>
                <td>{item.DSPLINWEI_0} {item.DSPWEU_0}</td>
                <td>{item.DSPLINVOL_0} {item.DSPVOU_0}</td>
                {/* <td>{`${item.XCODEYVE_0} (${item.NAME_0})`}</td>
                <td>{`${item.DRIVERID_0} (${item.DRIVER_0})`}</td>
                <td>{item.MDL_0} ({item.MDL_DESC})</td>
                <td>{item.XVRSEL_0}</td>
                <td>{item.VCRNUM_0}</td> */}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

const RailCarCheckInList = (props) => {
  // ** State

  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [selectedSite, setselectedSite] = useState('')
  const [selectedStatus, setStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
 const refComp = useRef(null)

  useEffect(() => {

  }, [])

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = props.lvsList && props.lvsList.filter(delivery => {
        let isMatch = false
        Object.keys(delivery).forEach(key => {
          if (delivery[key] && delivery[key] !== " " && delivery[key].toString().toLowerCase().includes(value.toLowerCase())) {
            isMatch = true
          }
        })
        return isMatch
      })
      setFilteredData(updatedData)
    }
  }

  // ** Function to handle filter
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  const status = {
    1: { title: 'Scheduled', color: 'light-info' },
    2: { title: 'On the way', color: 'light-primary' },
    3: { title: 'In-Progress', color: 'light-primary' },
    4: { title: 'Completed', color: 'light-success' },
    5: { title: 'Skipped', color: 'light-warning' },
    6: { title: 'Re-Scheduled', color: 'light-warning' },
    7: { title: 'Cancelled', color: 'light-danger' },
    8: { title: 'To-Plan', color: 'light-dark' }
  }

  const statusOptions = []
  Object.keys(status).forEach(key => {
    statusOptions.push({value: key, label: `${status[key].title}`})
  })

   const columns = [
                  {
                    name: "LVS NUMBER",
                    selector: "lvsno",
                     sortable: true,
                          minWidth: '220px',
                          cell: row => {
                            return (
                              <Link to={`/customer/creditnote/${row.NUM_0}`}>
                                {row.lvsno}
                              </Link>
                            )
                          }

                  },
                    {
                       name: "SCHEDULED DATE",
                                     selector: "iptdate",
                                    cell: row => {
                                                              return (
                                                                moment(row.iptdate).format('DD-MM-YYYY')
                                                              )
                                                            }
                                   },
                    {
                                                                           name: "STATUS",
                                                                           selector: "loadflg",
                                                                            sortable: true,
                                                                                 minWidth: '150px',


                                                                         },
                  {
                    name: "VR NUMBER",
                    selector: "vrno",

                  },
                  {
                    name: "SITE",
                    selector: "fcy",

                  },
                  {
                    name: "VR DATE",
                    selector: "vrdate",
                     cell: row => {
                                                                                   return (
                                                                                     moment(row.vrdate).format('DD-MM-YYYY')
                                                                                   )
                                                                                 }
                  },
                   {
                                     name: "VEHICLE",
                                     selector: "vehicle",

                                   },
                    {
                                      name: "DRIVER",
                                      selector: "driver",

                                    },
                     {
                                                         name: "VALIDATION",
                                                         selector: "valflg",

                                                       },


                  ]

  /* Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={(searchValue.length || (fromDate && toDate) || selectedSite || selectedStatus) ? filteredData.length / 10 : props.lvsList.length / 10 || 1}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName={'active'}
      pageClassName={'page-item'}
      nextLinkClassName={'page-link'}
      nextClassName={'page-item next'}
      previousClassName={'page-item prev'}
      previousLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1'}
    />
  )
*/
  const onDateChange = (date, type) => {
    if (type === 'from') {
      setFromDate(date[0])
      if (toDate) {
        let updatedData = []
        const startDate = moment(date[0]).format('YYYY-MM-DD')
        const endDate = moment(toDate).format('YYYY-MM-DD')
        updatedData = props.lvsList && props.lvsList.filter(item => moment(moment(item.DLVDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
           let updatedData = []
                              const startDate = moment(date[0]).format('YYYY-MM-DD')
                                console.log("T11 to before =", updatedData)
                                  console.log("T11 start DAte =", startDate)
                              updatedData = props.lvsList && props.lvsList.filter(item => moment(moment(item.DLVDAT_0).format('YYYY-MM-DD')).isSameOrAfter(startDate))
                                console.log("T11 to after =", updatedData)
                              setFilteredData(updatedData)

      }
    } else {
      setToDate(date[0])
      if (fromDate) {
        let updatedData = []
        const startDate = moment(fromDate).format('YYYY-MM-DD')
        const endDate = moment(date[0]).format('YYYY-MM-DD')
        updatedData = props.lvsList && props.lvsList.filter(item => moment(moment(item.DLVDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {

             let updatedData = []
                           const endDate = moment(date[0]).format('YYYY-MM-DD')
                           updatedData = props.lvsList && props.lvsList.filter(item => moment(moment(item.DLVDAT_0).format('YYYY-MM-DD')).isSameOrBefore(endDate))
                                   setFilteredData(updatedData)


      }
    }
  }

  const onModeChange = event => {
    if (event && event.value) {
      setselectedSite(event.value)
      let updatedData = []
      updatedData = props.lvsList && props.lvsList.filter(item => item.fcy === event.value)
      setFilteredData(updatedData)
    } else {
      setselectedSite('')
      setFilteredData(props.lvsList)
    }
  }

  const onStatusChange = event => {
    if (event && event.value) {
      setStatus(event.value)
      let updatedData = []
      updatedData = props.lvsList && props.lvsList.filter(item => Number(item.XDLV_STATUS_0) === Number(event.value))
      setFilteredData(updatedData)
    } else {
      setStatus('')
      setFilteredData(props.lvsList)
    }
  }

  const clearDate = () => {
    refComp.current.flatpickr.clear()
    setFromDate('')
    setToDate('')
    setFilteredData(props.lvsList)
  }

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(props.lvsList[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Load/UnLoad Vehicle Stock</CardTitle>
              {/* <div className='d-flex mt-md-0 mt-1'>
                <UncontrolledButtonDropdown>
                  <DropdownToggle color='secondary' caret outline>
                    <Share size={15} />
                    <span className='align-middle ml-50'>Export</span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className='w-100' onClick={() => downloadCSV(deliveries)}>
                      <FileText size={15} />
                      <span className='align-middle ml-50'>CSV</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div> */}
            </CardHeader>
            <Row className='justify-content-between mx-0'>
              <Col md='4' lg='2' className='mt-1'>
                <FormGroup>
                  <Input
                    className='dataTable-filter mb-50'
                    type='text'
                    placeholder='Search'
                    id='search-input'
                    value=  {searchValue}
                    onChange={handleFilter}
                  />
                </FormGroup>
              </Col>
              <Col md='4' lg='3' className='mt-1'>
                <FormGroup>
                  <Select
                    id='deliverymode'
                    classNamePrefix='select'
                    placeholder='Site'
                    options={props.sites}
                    isClearable
                    value={props.sites.filter((d) => d.value === selectedSite)}
                    onChange={onModeChange}
                  />
                </FormGroup>
              </Col>
              <Col md='4' lg='4' className='mt-1 d-flex'>
                <Flatpickr
                  value={fromDate}
                  id='fromDate'
                  className='form-control mb-50 mr-1'
                  placeholder='From Date'
                  onChange={date => onDateChange(date, 'from')}
                  ref={refComp}
                  options={{
                    dateFormat: 'm-d-Y',
                    maxDate: toDate ? toDate : new Date()
                  }}
                />
                <Flatpickr
                  value={toDate}
                  id='toDate'
                  className='form-control mb-50 mr-1'
                  placeholder='To Date'
                  onChange={date => onDateChange(date, 'to')}
                  ref={refComp}
                  options={{
                    dateFormat: 'm-d-Y',
                    minDate: fromDate,
                    maxDate: new Date()
                  }}
                />
                { (fromDate || toDate) ? <div>
                  <Button.Ripple className='btn-icon mb-50' color='flat-danger' onClick={() => clearDate()}>
                    close
                  </Button.Ripple>
                </div> : ''}
              </Col>
            </Row>
            <DataTable
              noHeader
              pagination
              data={(searchValue.length || fromDate || toDate || selectedSite || selectedStatus) ? filteredData : props.lvsList}
              expandableRows
              columns={columns}
              paginationPerPage={10}
              expandOnRowClicked
              className='react-dataTable'
               paginationDefaultPage={currentPage + 1}
              expandableRowsComponent={<ExpandableTable />}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}

            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default RailCarCheckInList
