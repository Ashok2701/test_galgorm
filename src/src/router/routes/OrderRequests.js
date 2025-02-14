import { lazy } from "react"
import { Redirect } from "react-router-dom/cjs/react-router-dom"

const AppRoutes = [
  {
    path: '/customer/order-requests/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/order-requests/shop'))
  },
  {
    path: '/customer/order-requests/wishlist',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/order-requests/wishlist'))
  },
  {
    path: '/customer/order-requests/product-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => <Redirect to='/customer/order-requests/product-detail/apple-i-phone-11-64-gb-black-26' />
  },
  {
    path: '/customer/order-requests/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/order-requests/detail')),
    meta: {
      navLink: '/order-requests/product-detail'
    }
  },
  {
    path: '/customer/order-requests/checkout',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/order-requests/checkout'))
  }
]

export default AppRoutes