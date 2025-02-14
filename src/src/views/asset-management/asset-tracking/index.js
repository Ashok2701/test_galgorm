// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { retrieveDropRequests, deleteDropRequest } from "../../../redux/actions/drop-request"

import Moment from 'react-moment'

import RequestDAta from './asset-track.json'

import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit, Trash2, X } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, Badge, FormGroup } from 'reactstrap'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link } from 'react-router-dom'
import moment from 'moment'

const mySwal = withReactContent(Swal)

const ToastContent = ({message}) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='toast-title font-weight-bold'>Succès !</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)

const DropRequestComponent = ({ data }) => {
  // ** State
  const [fromDate, setFromDate] = useState('')
  const [fromOneDayAfterDate, setOneDayAfterFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const dropRequests = useSelector(state => state.dropRequests)
  const dispatch = useDispatch()
  const userData = JSON.parse(localStorage.getItem('userData'))
  const refComp = useRef(null)

  useEffect(() => {
    if (userData) {
      dispatch(retrieveDropRequests(userData.X3SITE_0, userData.X3USER_0))
    }
  }, [])

  const onDeleteDropRequest = (id) => {
    return mySwal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-la !',
      cancelButtonText: 'Annuler',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        dispatch(deleteDropRequest(id))
          .then(data => {
            toast.success(
              <ToastContent message={data.message} />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
          })
          .catch(e => {
            console.log(e)
          })
      }
    })
  }

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = dropRequests && dropRequests.filter(dropRequest => {
        let isMatch = false
        Object.keys(dropRequest).forEach(key => {
          if (dropRequest[key] && dropRequest[key] !== " " && dropRequest[key].toString().toLowerCase().includes(value.toLowerCase())) {
            isMatch = true
          }
        })
        return isMatch
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  // ** Function to handle filter
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  const status = {
    0: { title: "En cours d'utilisation", color: 'light-info' },
    1: { title: 'Reporté', color: 'light-primary' },
    2: { title: 'En stock', color: 'light-dark' },
    3: { title: 'Terminé', color: 'light-success' },
    4: { title: 'Hors service', color: 'light-danger' }
  }

  const type = {
    0: { title: 'Garde-manger', color: 'light-info' },
    1: { title: 'Bloc A Aile Nord', color: 'light-danger' },
    2: { title: 'Parking', color: 'light-success' },
    3: { title: 'Escalier du bloc A', color: 'light-warning' },
    4: {title: 'Bloc - A Aile Est', color: 'light-primary'}
  }

  const columns = [
    {
      name: "ID de l'actif",
      selector: 'XDROPID_0',
      sortable: true,
      minWidth: '100px',
      cell: row => {
        return (
          <Link to={`/asset/list/${row.XDROPID_0}`}>
            {row.XDROPID_0}
          </Link>
        )
      }
    },
    {
          name: "Nom de l'actif",
          selector: 'XDROP_0',
          sortable: true,
          minWidth: '100px',
          cell: row => {
            return (
              <Link to={`/asset/list/${row.XDROP_0}`}>
                {row.XDROP_0}
              </Link>
            )
          }
        },
    {
      name: 'Catégorie',
      selector: 'CATEG_0',
      sortable: true,
      minWidth: '150px'

    },
     {
          name: 'Localisation',
          selector: 'XDROPTYP_0',
          sortable: true,
          minWidth: '220px',
            cell: row => {
                  return (
                    <Badge color={type[row.XDROPTYP_0] && type[row.XDROPTYP_0].color} pill>
                      {type[row.XDROPTYP_0] && type[row.XDROPTYP_0].title}
                    </Badge>
                  )
                }
        },
    {
      name: "Date d'installation",
      selector: 'date',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Moment format="MM/DD/YYYY">{row.ORDDAT_0}</Moment>
        )
      }
    },
      {
          name: 'Date du prochain service',
          selector: 'date',
          sortable: true,
          minWidth: '150px',
          cell: row => {
            return (
              <Moment format="MM/DD/YYYY">{row.ORDDAT_0}</Moment>
            )
          }
        },
    {
      name: 'numéro de série',
      selector: 'SERIAL_0',
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Condition',
      selector: 'XSOHFLG_0',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={status[row.XSOHFLG_0] && status[row.XSOHFLG_0].color} pill>
            {status[row.XSOHFLG_0] && status[row.XSOHFLG_0].title}
          </Badge>
        )
      }
    }
  ]

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={(searchValue.length || (fromDate && toDate)) ? filteredData.length / 10 : dropRequests.length / 10 || 1}
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

  const onDateChange = (date, type) => {
    if (type === 'from') {
      setFromDate(date[0])

      if (toDate) {
        let updatedData = []
        const startDate = moment(date[0]).format('YYYY-MM-DD')
        const endDate = moment(toDate).format('YYYY-MM-DD')
        updatedData = dropRequests && dropRequests.filter(item => moment(moment(item.ORDDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
                  let updatedData = []
                  const startDate = moment(date[0]).format('YYYY-MM-DD')
                    console.log("T11 to before =", updatedData)
                  updatedData = dropRequests && dropRequests.filter(item => moment(moment(item.ORDDAT_0).format('YYYY-MM-DD')).isSameOrAfter(startDate))
                    console.log("T11 to after =", updatedData)
                  setFilteredData(updatedData)

              }
            //   setOneDayAfterFromDate(date[0].setDate(date[0].getDate() + 1))
    } else {
      setToDate(date[0])
      if (fromDate) {
        let updatedData = []
        const startDate = moment(fromDate).format('YYYY-MM-DD')
        const endDate = moment(date[0]).format('YYYY-MM-DD')
        updatedData = dropRequests && dropRequests.filter(item => moment(moment(item.ORDDAT_0).format('YYYY-MM-DD')).isBetween(startDate, endDate, undefined, '[]'))
        setFilteredData(updatedData)
      } else {
                   let updatedData = []
                   const endDate = moment(date[0]).format('YYYY-MM-DD')
                   updatedData = dropRequests && dropRequests.filter(item => moment(moment(item.ORDDAT_0).format('YYYY-MM-DD')).isSameOrBefore(endDate))
                           setFilteredData(updatedData)

              }
    }
  }

  const clearDate = () => {
    refComp.current.flatpickr.clear()
    setFromDate('')
    setToDate('')
     setOneDayAfterFromDate('')
    setFilteredData(dropRequests)
  }

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Suivi des actifs</CardTitle>
            </CardHeader>
            <Row className='justify-content-between mx-0'>
              <Col md='4' lg='2' className='mt-1'>
                <FormGroup>
                  <Input
                    className='dataTable-filter mb-50'
                    type='text'
                    placeholder='Recherche'
                    id='search-input'
                    value={searchValue}
                    onChange={handleFilter}
                  />
                </FormGroup>
              </Col>
              <Col md='4' lg='4' className='mt-1 d-flex'>
                <Flatpickr
                  value={fromDate}
                  id='fromDate'
                  className='form-control mb-50 mr-1'
                  placeholder='Date de début'
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
                  placeholder='A ce jour'
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
                    <X size={16} />
                  </Button.Ripple>
                </div> : ''}
              </Col>
            </Row>
            <DataTable
              noHeader
              pagination
              data={(searchValue.length || fromDate || toDate) ? filteredData : RequestDAta}
              columns={columns}
              paginationPerPage={10}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationDefaultPage={currentPage + 1}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              paginationComponent={CustomPagination}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DropRequestComponent
