// ** React Imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { retrieveDocuments, deleteDocument } from "./../../redux/actions/document"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit, Eye, Trash2} from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Card, Input, CardHeader, CardTitle, Button, Label } from 'reactstrap'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Moment from 'react-moment'

const mySwal = withReactContent(Swal)

const DocumentComponent = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const documents = useSelector(state => state.documents)
  const dispatch = useDispatch()
  const userData = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    dispatch(retrieveDocuments(userData.X3ROLE_0, userData.X3USER_0))
  }, [])

  const onDelete = (id) => {
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
        dispatch(deleteDocument(id))
          .then(data => {
            toast.success(
              <ToastContent message='Suppression réussie' />,
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
      updatedData = documents && documents.filter(order => {
        let isMatch = false
        Object.keys(order).forEach(key => {
          if (order[key] && order[key] !== " " && order[key].toString().toLowerCase().includes(value.toLowerCase())) {
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

  const columns = [
    {
      name: 'N° Sr.',
      selector: 'ROWID',
      sortable: true,
      minWidth: '120px'
    },
    {
      name: 'Partenaire commercial',
      selector: 'X10CBP_0',
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Type de document',
      selector: 'X10CDOCTYP_0',
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Description',
      selector: 'X10CDOCDES_0',
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Créé à',
      sortable: true,
      minWidth: '180px',
      selector: row => {
        return <Moment format="MM/DD/YYYY hh:mm A">{row.X10CCREDAT_0}</Moment>
      }
    },
    {
      name: 'Créé par',
      sortable: true,
      minWidth: '170px',
      selector: 'CREUSR_0'
    },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: row => {
        return (
          <div className='d-flex'>
            <a className='btn btn-icon rounded-circle' target={'_blank'} href={`${process.env.REACT_APP_API_HOST}/uploads/${row.X10CDOCID_0}`}><Eye size={16} /></a>
            {userData.X3ROLE_0 === 4 ? (
            <Button.Ripple className='btn-icon rounded-circle' onClick={() => onDelete(row.ROWID)} color='flat-danger'>
              <Trash2 size={16} />
            </Button.Ripple>
            ) : '' }
          </div>
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
      pageCount={(searchValue.length) ? filteredData.length / 10 : documents.length / 10 || 1}
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

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Documents</CardTitle>
            </CardHeader>
            <Row className='justify-content-between mx-0'>
              <Col xl='6' className='d-flex align-items-center justify-content-start mt-1 mb-2'>
                <Label className='mr-1' for='search-input'>
                 Recherche
                </Label>
                <Input
                  className='dataTable-filter mb-50'
                  type='text'
                  bsSize='sm'
                  id='search-input'
                  value={searchValue}
                  onChange={handleFilter}
                />
              </Col>
              <Col xl='6' className='d-flex align-items-center justify-content-end mt-1 mb-2'>
                {userData.X3ROLE_0 === 4 ? (
              <Button.Ripple color='primary' tag={Link} to='/admin/document/create'>
                Créer un document
              </Button.Ripple>
              ) : ''}
              </Col>
            </Row>
            <DataTable
              noHeader
              pagination
              data={(searchValue.length) ? filteredData : documents}
              columns={columns}
              paginationPerPage={10}
              expandOnRowClicked
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

export default DocumentComponent
