// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Products'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'


// API calls
import getAllPrice from '../../../services/ProductPriceService'
import { retrieveProducts } from "../../../redux/actions/product"
import { retrieveProductPrice } from "../../../redux/actions/product-price"
import { retrieveDropRequests, deleteDropRequest, createSOCartRequest, deleteSOCartRequest, retrievesSOCartRequests } from "../../../redux/actions/drop-request"
import { retrieveProductCategories } from "../../../redux/actions/product-categories"

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  getProducts,
  getCartItems,
  addToWishlist,
  deleteCartItem,
  deleteWishlistItem
} from '../store/actions'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'

import { ChevronDown, Edit, Trash2, X, Check } from 'react-feather'
const ToastContent = ({ message }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='toast-title font-weight-bold'>Success!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)


const Shop = () => {
  // ** States
  const [activeView, setActiveView] = useState('list')
  const [sidebarOpen, setSidebarOpen] = useState(false)
const [searchValue, setSearchValue] = useState('')
const [selectPrdCateg, setSelectPrdCateg] = useState('')
  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // API

  const user = JSON.parse(localStorage.getItem('userData'))
  const products = useSelector(state => state.products)
   // const [tempprdoucts , setTempproducts] = useState()
    const shoppingList = useSelector(state => state.soCart)
    const productsPrice = useSelector(state => state.productsPrice)
    const productCategories = useSelector(state => state.productCategories)

 const callAPIs = () => {

    dispatch(retrieveProducts(user.X3SITE_0))
    dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
    dispatch(retrieveProductCategories(user.X3SITE_0))
    dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
  //    dispatch(retrieveProductPrice(user.X3SITE_0, '', user.X3USER_0, '', ''))

  }

   const handleInputChange = (e, i, prd) => {
      console.log("index handleinput change ", e)
      const updatedQty = e
            const params = {...prd, usersite: user.X3SITE_0, loginuser: user.X3USER_0, qty : updatedQty}
                dispatch(createSOCartRequest(params))
                            .then(data => {
                                 dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
                              toast.success(

                                <ToastContent header='Success' message={`${prd.ITMREF_0} quantity is updated`} color='success' />,
                                { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                              )
                              setIsDecremented(true)
                            //  dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
                            })
                            .catch(e => {
                              console.log(e)
                            })

   }


  const handleDecrement = (prd, i) => {
      const updatedQty = Number(prd.QTY_0) - 1

      console.log("updated qty is ", updatedQty)

      if (updatedQty > 0) {
      const params = {...prd, usersite: user.X3SITE_0, loginuser: user.X3USER_0, qty : updatedQty}
          dispatch(createSOCartRequest(params))
                      .then(data => {
                           dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
                        toast.success(

                          <ToastContent header='Success' message={`${prd.ITMREF_0} quantity is updated`} color='success' />,
                          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                        )
                        setIsDecremented(true)
                      //  dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
                      })
                      .catch(e => {
                        console.log(e)
                      })
      }  else {

       toast.error(

                                          <ToastContent header='Alert' message={`${prd.ITMREF_0} quantity cannot be updated lessthan 0`} color='danger' />,
                                          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                                        )
      }


  }

  const handleIncrement = (prd, i) => {
            const updatedQty = Number(prd.QTY_0) + 1
                const params = {...prd, usersite: user.X3SITE_0, loginuser: user.X3USER_0, qty : updatedQty}
                    dispatch(createSOCartRequest(params))
                                .then(data => {
                                 dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
                                  toast.success(

                                    <ToastContent header='Success' message={`${prd.ITMREF_0} quantity is updated`} color='success' />,
                                    { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                                  )

                                })
                                .catch(e => {
                                  console.log(e)
                                })


    }





  const addProducttoCart = (item) => {
    const params = { ...item, usersite: user.X3SITE_0, loginuser: user.X3USER_0, qty: 1, ITMREF_0 : item.O_XITM, ITMDES_0: item.O_XITMREF, BASPRI_0 : item.O_XPRICE }
    dispatch(createSOCartRequest(params))
      .then(data => {
           callAPIs()
        toast.success(
          <ToastContent header='Success' message={`${item.O_XITMREF} Product added to Cart`} color='success' />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      })
      .catch(e => {
        console.log(e)
      })

   // message.success(`${props.item.ITMREF_0} has been added to Cart`)

  }

  useEffect(() => {

    callAPIs()
   // getAllPrice(user.X3SITE_0, '', user.X3USER_0)
    dispatch(retrieveProductPrice(user.X3SITE_0, '', user.X3USER_0, '', ''))
    /*
     getDummyProducts().then(res => {
       setProductsData(res.products)
     })
 */
  }, [])


  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        perPage: 9,
        page: 1
      })
    )
  }, [dispatch])


  const handleFilter = e => {
    const value = e.target.value
    // let updatedData = []
    if (value.length > 0) {
      setSearchValue(value)
    }
  }

  const handleFilterProdCateg = e => {
    setSelectPrdCateg(e)
  }

  const handleClearFilter = () => {
      setSelectPrdCateg('')
    }



  return (
    <Fragment>
      <Products
        store={store}
        dispatch={dispatch}
        addToCart={addToCart}
        activeView={activeView}
        ProdcutCateg = {productCategories}
        shoppingList = {shoppingList}
        getProducts={getProducts}
        ProductsList={products}
        productsPrice = {productsPrice}
        sidebarOpen={sidebarOpen}
        getCartItems={getCartItems}
        setActiveView={setActiveView}
        addToWishlist={addToWishlist}
        setSidebarOpen={setSidebarOpen}
        deleteCartItem={deleteCartItem}
        deleteWishlistItem={deleteWishlistItem}
        onSearch={handleFilter}
        searchValue={searchValue}
        categoryValue = {productCategories}
        selectPrdCateg = {selectPrdCateg}
        addProducttoCart = {addProducttoCart}
        handleIncrement = {handleIncrement}
        handleDecrement = {handleDecrement}
        handleInputChange = {handleInputChange}
      />
      <Sidebar sidebarOpen={sidebarOpen}
      ProdcutCateg = {productCategories}
      onProdCategChange = {handleFilterProdCateg}
      selectPrdCateg = {selectPrdCateg}
      handleClearFilter = {handleClearFilter}
                 />
    </Fragment>
  )
}
export default Shop
