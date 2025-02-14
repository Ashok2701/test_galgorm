// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'
// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Heart, Plus, Minus } from 'react-feather'
import { Card, CardBody, CardText, Button, Badge, Row, Col, Table, InputGroup, InputGroupAddon, Input } from 'reactstrap'


const ProductCards = props => {
  // ** Props
  const {
    store,
    products,
    activeView,
    addToCart,
    dispatch,
    getProducts,
    getCartItems,
    addToWishlist,
    deleteWishlistItem
  } = props

const [prodList, setProdList] = useState([])
  // ** Handle Move/Add to cart
  const handleCartBtn = (val) => {

      props.addProducttoCart(val)

  }


  const handleInputChange = (event, i, prd) => {

    console.log("inside Qty onChange =", event)
    console.log("inside Qty value  =", Number(event.target.value))
    props.handleInputChange(event.target.value, i, prd)
  }


  // ** Handle Wishlist item toggle
  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id))
    } else {
      dispatch(addToWishlist(id))
    }
    dispatch(getProducts(store.params))
  }



   const getData = (prd, i) => {
        let mflag = false
        props.shoppingList.map((cart, i) => {
            if (cart.ITMREF_0 === prd.O_XITM) {
              mflag = true
            }
        })
          const CartBtnTag = mflag ? Link : 'button'
       if (mflag) {
           const tindex = props.shoppingList.findIndex(item => item.ITMREF_0 === prd.O_XITM)
          return (
             <div  style= {{ backgroundColor : "#28c76f", width : "160px", float : "right"}}>
                        <InputGroup

                             >
                              <InputGroupAddon addonType='prepend' onClick={() => { props.handleDecrement(props.shoppingList[tindex], tindex) }}>
                                <Button
                                  className='btn-icon'
                                  color='transparent'
                                >
                                 <Minus size={14} />
                                </Button>
                              </InputGroupAddon>
                              <Input

                                type='number'
                                value={props.shoppingList[tindex].QTY_0}
                                onChange={() => { handleInputChange(event, tindex, props.shoppingList[tindex]) }}
                                />
                              <InputGroupAddon addonType='append' onClick={() => { props.handleIncrement(props.shoppingList[tindex], tindex) }}>
                                <Button
                                  className='btn-icon'
                                  color='transparent'
                                >
                                  <Plus size={14} />
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>
                         </div>
                                                                            )
          } else {
                                  return (
                <Button
                                color='primary'
                                tag = {CartBtnTag}
                                className='btn-cart move-cart'
                                onClick={() => handleCartBtn(prd)}
                              >
                                <ShoppingCart className='mr-50' size={14} />
                                <span>Add To Cart</span>
                              </Button>
                            )
                                                          }
    }



   const handleFilter = (value) => {
               let updatedData = []
               if (value && value.length > 0) {
                 updatedData = props.products && props.products.filter(product => {
                   let isMatch = false
                   Object.keys(product).forEach(key => {
                     if (product[key] && product[key] !== " " && product[key].toString().toLowerCase().includes(value.toLowerCase())) {
                       isMatch = true
                     }
                   })
                   return isMatch
                 })
                 setProdList(updatedData)
                }
             }




   useEffect(() => {
       if (props?.searchValue?.length > 0) {
         handleFilter(props.searchValue)
         } else if (props?.selectPrdCateg?.length > 0) {
                  handleFilter(props.selectPrdCateg)
         } else {
           setProdList(props.products)
         }
       }, [props.searchValue, props.products, props.categoryValue, props.selectPrdCateg])



  // ** Renders products
  const renderProducts = () => {
    if (prodList.length) {
      console.log("prod list =", prodList)
      return prodList.map((item, i) => {
        return (
          <Card className='ecommerce-card order-requests' key={i}>
            {/* <div className='item-img text-center mx-auto'>
              <Link to={`/customer/order-requests/product-detail/${item.O_XITM}`}>
                <img className='img-fluid card-img-top' src={`data:image/jpeg;base64,${item.O_XITMIMG}`} alt={item.name} />
              </Link>
            </div> */}
            <CardBody className="py-0">
              <Table responsive className="w-100">
                <tbody>
                  <tr>
                    <td width={'10%'}>{item.O_XCITM}</td>
                    <td width={'30%'}>
                      <h4 className='item-name'>
                        <Link className='text-body' to={`/customer/order-requests/product-detail/${item.O_XITM}`}>
                          {item.O_XCITMDES}
                        </Link>
                      </h4>
                    </td>
                    <td width={'20%'}>
                      <CardText tag='span' className='item-company'>
                        By{' '}
                        <a className='company-name' href='/' onClick={e => e.preventDefault()}>
                          {item.O_XITMCATDES}
                        </a>
                      </CardText>
                    </td>
                    <td width={'20%'}>
                      <h4>${item.O_XPRICE}</h4>
                    </td>
                    <td >
                                          <h4>{item.O_XITMUNI}</h4>
                                        </td>
                    <td width={'13%'} className='text-right'>
                      {getData(item)}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        )
      })
    }
  }

  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  )
}

export default ProductCards
