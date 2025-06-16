import {useState, useEffect, Fragment} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardText,
  MDBCardGroup,
  MDBCard,
  MDBCardFooter,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBCardTitle,
  MDBBtn,
  MDBRipple
} from "mdb-react-ui-kit"
import {  FormGroup, TabContent, Label, TabPane, Nav, NavItem, NavLink, CustomInput, Alert } from 'reactstrap'
import Select from 'react-select'

const ToastContent = ({header, message, color}) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>

      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)

function TripsCard(props) {

const [prodList, setProdList] = useState([])
const [prd_unit_price, setPrd_unit_price] = useState([])


  const handleFilter = (value) => {
            
             let updatedData = []
             if (value.length) {
               updatedData = props.productsPrice && props.productsPrice.filter(product => {
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
       } else if (props?.categoryValue?.length > 0) {
        handleFilter(props.categoryValue)
       } else {
         setProdList(props.productsPrice)
       }
     }, [props.searchValue, props.products, props.categoryValue, props.productsPrice])


  const encode = (input) => {
    input = new Uint8Array(input)
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    let output = ""
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4
    let i = 0

    while (i < input.length) {
        chr1 = input[i++]
        chr2 = i < input.length ? input[i++] : Number.NaN
        chr3 = i < input.length ? input[i++] : Number.NaN

        enc1 = chr1 >> 2
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
        enc4 = chr3 & 63

        if (isNaN(chr2)) {
            enc3 = enc4 = 64
        } else if (isNaN(chr3)) {
            enc4 = 64
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4)
    }
    return output
  }

/*
  const handleDecrement = (prd, i , tempQty) => {
       props.handleDecrement(prop)

  }

    const handleIncrement = (prd, i , tempQty) => {


    }
*/

  const getAddtoCart = () => {
     return (<div>
                  <MDBBtn className="AddtoCartBtn" rounded size='lg' color='secondary'>
                                                                    Add to Cart
                                                                  </MDBBtn>

                                                            </div>)
  }

  const getUnitsList = (prd, j) => {
      const unitsList = prd.O_XITMUNI.split(" ")
      const finalUnitList = []
      let i = 0
      while (i < unitsList.length) {
           let tempdata = {}
           tempdata = {value :  unitsList[i], label: unitsList[i] }
           finalUnitList.push(tempdata)
          i++
      }
      return finalUnitList
  }

  const getData = (prd, i) => {

      let mflag = false
      props.shoppingList.map((cart, i) => {
            
             
          if (cart.ITMREF_0 === prd.O_XITM) {
            mflag = true
          }
      })
       
     if (mflag) {
          

         const tindex = props.shoppingList.findIndex(item => item.ITMREF_0 === prd.O_XITM)
         
         const tempQty = props.shoppingList[tindex].QTY_0
        return (
          <MDBCol  md="5" className="mr-2 mb-lg-0">
       <div class="input-group">
                                                              <button type="button" disabled={tempQty < 2} onClick={() => props.handleDecrement(prd, i, tempQty)} className="increbtn input-group-text"> - </button>
                                                               <div className="form-control text-center">{tempQty}</div>
                                                              <button type="button"  onClick={() => props.handleIncrement(prd, i, tempQty)} className="increbtn input-group-text"> + </button>
                                                  </div>
      </MDBCol>
                                                                          )
        } else {
                                return (<div>
              <MDBBtn onClick={() => { props.addProducttoCart(prd) }} className="AddtoCartBtn" rounded size='lg' color='secondary'>
                                                                Add to Cart
                                                              </MDBBtn>

                                                        </div>)
                                                        }
  }

  return (<MDBContainer fluid className="my-2 text-center">
               <MDBRow>

               { props.tripsList  && props.tripsList.length > 0 ? props.tripsList.map((prd, i) => (
                 <MDBCol md="12" lg="3" className="mb-4">

                   <MDBCard className='cardmain h-100'>
                       <MDBCardTitle>
                       <a href={`/customer/order/product-detail/${prd.O_XITM}`} className="text-reset mt-2">
                              <h1 className="card-title " style={{fontSize : "20px"}}> {prd.itemCode}</h1>
                       </a>
                       <h4 className="card-title mb-0" style={{fontSize : "14px"}}>{prd.vehicleObject.codeyve}</h4>
                       </MDBCardTitle>
                       <MDBCardBody>

                       <div className="d-flex justify-content-around h-100">
                                                    <div className="prd-price">
                                                       { prd.O_XITMUNI && (prd.O_XITMUNI).split(" ").length > 1 ? '' : Number(prd.O_XPRICE).toFixed(2) }
                                                    </div>
                                                  </div>


                     </MDBCardBody>
                   </MDBCard>

                 </MDBCol>
)) :         <MDBCol md="12" lg="12" className="mb-4">

                           <MDBCard className='cardmain h-100'>
                               <MDBCardTitle>

                                 <h1 className="card-title " style={{fontSize : "18px", paddingTop : "20px"}}>No Trips to display</h1>

                               </MDBCardTitle>
                            </MDBCard>
                    </MDBCol>

 }
               </MDBRow>
             </MDBContainer>
           )

}
export default TripsCard