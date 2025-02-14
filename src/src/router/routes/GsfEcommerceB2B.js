import { lazy } from "react"
import { Redirect } from "react-router-dom/cjs/react-router-dom"

const AppRoutes = [
  {
    path: '/customer/gsfecommerceB2B/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/gsf-ecommerce-B2B/shop'))
  },
  {
    path: '/customer/gsfecommerceB2B/wishlist',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/gsf-ecommerce-B2B/wishlist'))
  },
  {
    path: '/customer/gsfecommerceB2B/product-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => <Redirect to='/customer/gsf-ecommerce-B2B/product-detail/apple-i-phone-11-64-gb-black-26' />
  },
  {
    path: '/customer/gsfecommerceB2B/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/gsf-ecommerce-B2B/detail')),
    meta: {
      navLink: '/gsf-ecommerce-B2B/product-detail'
    }
  },
  {
    path: '/customer/gsfecommerceB2B/checkout',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/gsf-ecommerce-B2B/checkout'))
  }
]

export default AppRoutes